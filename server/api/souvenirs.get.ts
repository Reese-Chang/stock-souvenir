

function convertDate(dateStr: string) {
  if (!dateStr) return null
  const match = dateStr.match(/(\d+)月(\d+)日/)
  if (!match) return dateStr.trim()
  const currentYear = new Date().getFullYear()
  const month = String(match[1]).padStart(2, '0')
  const day = String(match[2]).padStart(2, '0')
  return `${currentYear}/${month}/${day}`
}

async function loadETtodayCSV(): Promise<any[]> {
  // Use Nitro's useStorage to read bundled assets
  const raw = await useStorage('assets:server').getItem('ettoday.csv') as string | null
  if (!raw) return []

  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean)
  const dataLines = lines.slice(1)
  const results = []

  for (const line of dataLines) {
    const parts = line.split(',')
    if (parts.length < 6) continue
    
    const oddLot = parts[parts.length - 1]!.trim()
    const meetingRaw = parts[parts.length - 2]!.trim()
    const buyRaw = parts[parts.length - 3]!.trim()
    const stockField = parts[0]!.trim()
    const stockPriceRaw = parts[1]!.trim()
    const souvenirName = parts.slice(2, parts.length - 3).join(',').trim()

    const codeMatch = stockField.match(/[（(](\d+)[）)]/)
    if (!codeMatch) continue

    const stockCode = codeMatch[1]!
    const companyName = stockField.replace(/[（(]\d+[）)]/, '').trim()

    results.push({
      stockCode, companyName,
      stockPrice: stockPriceRaw || null,
      lastBuyDate: convertDate(buyRaw),
      meetingDate: convertDate(meetingRaw),
      meetingType: null, location: null,
      souvenirName,
      registryAgent: null, registryPhone: null,
      giftAnnounced: true
    })
  }
  return results
}

async function loadStockgift(): Promise<any[]> {
  try {
    const html = await fetchHTML('https://stockgift.tw/STOCK/Stock/Info')
    return parseStockgiftHtml(html)
  } catch (err: any) {
    console.error(`[API Merge] 無法取得 Stockgift 資料: ${err.message}`)
    return []
  }
}

async function loadHiStock(): Promise<any[]> {
  try {
    const html = await fetchHTML(scraperConfig.TARGET_URL)
    return parseHiStockHTML(html)
  } catch (err: any) {
    console.error(`[API Merge] 無法取得 HiStock 資料: ${err.message}`)
    return []
  }
}

function mergeData(hiStockData: any[], ettodayData: any[], stockgiftData: any[]) {
  const mergedMap = new Map()

  const addData = (item: any, sourceName: string) => {
    const clonedItem = { ...item }
    delete clonedItem.sourceUrl
    if (!mergedMap.has(clonedItem.stockCode)) {
      mergedMap.set(clonedItem.stockCode, {
        ...clonedItem,
        source: [sourceName]
      })
    } else {
      const existing = mergedMap.get(item.stockCode)
      if (!existing.source.includes(sourceName)) {
        existing.source.push(sourceName)
      }
      
      // 覆蓋邏輯（依優先權）
      if (sourceName === 'HiStock') {
        existing.companyName = item.companyName || existing.companyName
        existing.location = item.location || existing.location
        existing.registryAgent = item.registryAgent || existing.registryAgent
        existing.registryPhone = item.registryPhone || existing.registryPhone
      }
      if (sourceName === 'stockgift') {
         existing.giftAnnounced = existing.giftAnnounced !== undefined ? existing.giftAnnounced : item.giftAnnounced
         existing.meetingType = item.meetingType || existing.meetingType
         // Stockgift 的 lastBuyDate 帶有明確年份（原始格式 YY/MM/DD），以它為主覆蓋 HiStock 的推斷值
         if (item.lastBuyDate) existing.lastBuyDate = item.lastBuyDate
      }
      
      // 更新紀念品名稱
      if (item.souvenirName !== existing.souvenirName && item.souvenirName !== '尚未公布' && item.souvenirName !== '尚未公告') {
         if (existing.souvenirName === '尚未公告' || existing.souvenirName === '尚未公布' || !existing.souvenirName) {
            existing.souvenirName = item.souvenirName
         }
      }

      existing.stockPrice = existing.stockPrice || item.stockPrice
      existing.lastBuyDate = existing.lastBuyDate || item.lastBuyDate
      existing.meetingDate = existing.meetingDate || item.meetingDate
      existing.giftAnnounced = existing.giftAnnounced !== undefined ? existing.giftAnnounced : item.giftAnnounced
    }
  }

  hiStockData.forEach(item => addData(item, 'HiStock'))
  stockgiftData.forEach(item => addData(item, 'stockgift'))
  ettodayData.forEach(item => addData(item, 'ETtoday'))

  const merged = Array.from(mergedMap.values()).map(item => {
    if (item.source.length === 1) {
      item.source = item.source[0]
    }
    return item
  })

  return merged
}

// 由於爬蟲每次需時 5~10 秒，設定 defineCachedEventHandler 將爬蟲結果快取 12 小時 (43200 秒)
export default defineCachedEventHandler(async (event) => {
  console.log('[API] 觸發爬蟲與資料合併程序...')
  
  // 並行抓取資料來源，節省時間
  const [hiStockData, ettodayData, stockgiftData] = await Promise.all([
    loadHiStock(),
    loadETtodayCSV(),
    loadStockgift()
  ])

  const merged = mergeData(hiStockData, ettodayData, stockgiftData)

  console.log(`[API] 爬蟲完成，共取得 ${merged.length} 筆資料，已被 Vercel CDN 快取。`)

  return {
    scrapedAt: new Date().toISOString(),
    totalCount: merged.length,
    data: merged
  }
}, {
  maxAge: 60 * 60 * 12, // 快取 12 小時
  name: 'souvenirs-data', // 用於 Vercel 的快取存儲鍵名
})
