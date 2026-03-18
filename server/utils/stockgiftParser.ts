import * as cheerio from 'cheerio'
import type { Element } from 'domhandler'

export function parseStockgiftHtml(html: string) {
  const $ = cheerio.load(html)
  const results: any[] = []

  // 清理股名
  const cleanName = (str: string) => {
    let s = str.replace(/\s*\d+$/, '').trim()
    return s.split(/\s+/)[0]
  }

  // 處理日期格式：
  // 3 段 "26/04/28" => "2026/04/28"（年後兩碼 / 月 / 日）←「有年份」，直接解析
  // 2 段 "12/19"    => 補上今年年份（Stockgift 無年份的資料不多，以 3 段為主）
  const cleanDate = (str: string | undefined) => {
    if (!str) return null
    const s = str.trim()
    const parts = s.split('/')

    if (parts.length === 3) {
      // 三段：年後兩碼 / 月 / 日
      const year = 2000 + parseInt(parts[0] ?? '0', 10) // "26" → 2026, "25" → 2025
      return `${year}/${parts[1]}/${parts[2]}`
    }

    if (parts.length === 2) {
      // 兩段：無年份，補上今年
      const currentYear = new Date().getFullYear()
      return `${currentYear}/${parts[0]}/${parts[1]}`
    }

    return s
  }

  // Table 1: 已公告
  $('#hadEntrustdatatable tbody tr').each((_: number, tr: Element) => {
    const tds = $(tr).find('td')
    if (tds.length < 8) return

    const stockCode = $(tds[1]).text().trim()
    const companyName = cleanName($(tds[2]).text())
    const stockPrice = $(tds[3]).text().trim()
    const lastBuyDate = cleanDate($(tds[4]).text())
    const meetingDate = cleanDate($(tds[5]).text())
    const souvenirName = $(tds[7]).text().trim() || '尚未公布'

    if (stockCode && !isNaN(Number(stockCode))) {
      results.push({
        stockCode,
        companyName,
        stockPrice,
        lastBuyDate,
        meetingDate,
        meetingType: null,
        location: null,
        souvenirName,
        registryAgent: null,
        registryPhone: null,
        source: 'stockgift',
        giftAnnounced: true
      })
    }
  })

  // Table 2: 未公告
  $('#hadEntrustdatatable2 tbody tr').each((_: number, tr: Element) => {
    const tds = $(tr).find('td')
    if (tds.length < 10) return

    const td1Html = $(tds[1]).html() || ''
    let stockCode = ''
    const codeMatch = td1Html.match(/Detail\/(\d{4})/)
    if (codeMatch && codeMatch[1]) {
      stockCode = codeMatch[1]
    } else {
      const text = $(tds[1]).text()
      const m = text.match(/\((\d{4})\)/)
      if (m && m[1]) stockCode = m[1]
    }

    const companyName = cleanName($(tds[2]).text())
    const stockPrice = $(tds[3]).text().trim()
    const lastBuyDate = cleanDate($(tds[4]).text())
    const meetingDate = cleanDate($(tds[5]).text())
    const meetingType = $(tds[6]).text().trim()
    const souvenirName = $(tds[8]).text().trim()
    const referenceGift = $(tds[9]).text().trim()

    if (stockCode && !isNaN(Number(stockCode))) {
      results.push({
        stockCode,
        companyName,
        stockPrice,
        lastBuyDate,
        meetingDate,
        meetingType,
        location: null,
        souvenirName: souvenirName === '尚未公告' ? `尚未公告 (去年:${referenceGift})` : souvenirName,
        registryAgent: null,
        registryPhone: null,
        source: 'stockgift',
        giftAnnounced: false
      })
    }
  })

  return results
}
