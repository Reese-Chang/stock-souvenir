import * as cheerio from 'cheerio'
import type { Element } from 'domhandler'
import { scraperConfig } from './scraperConfig'

/**
 * 清理字串：去除多餘空白與換行符號
 */
function cleanText(text: string | undefined): string {
  return (text || '').replace(/\s+/g, ' ').trim()
}

/**
 * 將日期格式統一為 YYYY/MM/DD
 * 若為 MM/DD（HiStock 無年份），直接補上今年年份
 * （lastBuyDate 最終以 Stockgift 的為主，所以這裡不需要猜年份）
 */
function normalizeDate(dateStr: string): string {
  if (!dateStr) return dateStr
  const parts = dateStr.split('/')
  // 已有完整年份（如 2026/04/28）
  if (parts.length === 3 && parts[0] && parts[0].length === 4) return dateStr
  // 只有 MM/DD，補上今年年份
  if (parts.length === 2) {
    const currentYear = new Date().getFullYear()
    return `${currentYear}/${parts[0]}/${parts[1]}`
  }
  return dateStr
}

/**
 * 從單一 <tr> 資料列中，擷取所有欄位並組成結構化物件
 */
function parseRow($: cheerio.CheerioAPI, row: Element) {
  const cells = $(row).find('td')
  if (cells.length < 11) return null

  const stockCode = cleanText($(cells[0]).text())
  const companyName = cleanText($(cells[1]).find('a').text() || $(cells[1]).text())
  const stockPrice = cleanText($(cells[2]).text())
  const lastBuyDate = normalizeDate(cleanText($(cells[3]).text()))
  const meetingDate = normalizeDate(cleanText($(cells[4]).text()))
  const meetingType = cleanText($(cells[5]).text())
  
  const locationCell = $(cells[6])
  const locationLink = locationCell.find('a')
  const locationFull = cleanText(locationLink.attr('title') || locationLink.text() || locationCell.text())
  
  const souvenirCell = $(cells[7])
  souvenirCell.find('a').remove()
  const souvenirName = cleanText(souvenirCell.text())
  const registryAgent = cleanText($(cells[9]).text())
  const registryPhone = cleanText($(cells[10]).text())

  if (!stockCode || isNaN(Number(stockCode))) return null

  return {
    stockCode,       // 股票代號
    companyName,     // 公司名稱
    stockPrice,      // 股價（僅供參考，非即時）
    lastBuyDate,     // 最後買進日
    meetingDate,     // 股東會日期
    meetingType,     // 性質（常會/臨時會）
    location: locationFull,       // 開會地點（完整地址）
    souvenirName,                 // 股東會紀念品名稱
    registryAgent,   // 股務代理機構
    registryPhone,   // 股代電話
  }
}

/**
 * 解析指定 table ID 內的所有資料列
 */
function parseTable($: cheerio.CheerioAPI, tableId: string) {
  const results: any[] = []
  const table = $(`#${tableId}`)

  if (table.length === 0) {
    console.log(`[Parser] 找不到表格 #${tableId}，可能當前無資料，略過。`)
    return results
  }

  const rows = table.find('tbody tr')
  console.log(`[Parser] 表格 #${tableId} 找到 ${rows.length} 筆資料列`)

  rows.each((index, row) => {
    const parsed = parseRow($, row)
    if (parsed) {
      results.push(parsed)
    }
  })

  return results
}

/**
 * 主解析函數：對所有三張表格進行解析並合併結果
 */
export function parseHiStockHTML(html: string) {
  const $ = cheerio.load(html)

  const todayData = parseTable($, scraperConfig.TABLE_IDS.today)
  const currentData = parseTable($, scraperConfig.TABLE_IDS.current)
  const oldData = parseTable($, scraperConfig.TABLE_IDS.old)

  const all = [...todayData, ...currentData, ...oldData]
  console.log(`[Parser] 解析完成：today=${todayData.length}、current=${currentData.length}、old=${oldData.length}，共 ${all.length} 筆`)

  return all
}
