import axios from 'axios'
import { scraperConfig } from './scraperConfig'

/**
 * 暫停執行指定毫秒數
 * @param ms - 等待毫秒數
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 以指數退避（Exponential Backoff）策略發送 GET 請求
 * 當請求失敗時，等待時間會逐次增加，避免同時大量重試衝擊伺服器
 *
 * @param url - 目標網址
 * @param attempt - 目前嘗試次數（內部遞迴使用）
 * @returns 回傳原始 HTML 字串
 */
export async function fetchHTML(url: string, attempt: number = 1): Promise<string> {
  try {
    // ── 步驟 1：設定請求標頭，模擬真實瀏覽器行為 ──
    const headers = {
      'User-Agent': scraperConfig.USER_AGENT,
      // 告知伺服器接受繁體中文，提升資料正確性
      'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      // 偽裝成從 histock 首頁連過來，避免直接請求被擋
      'Referer': 'https://histock.tw/',
    }

    // ── 步驟 2：發送 GET 請求，取得 HTML 內容 ──
    console.log(`[Request] 嘗試第 ${attempt} 次：${url}`)
    const response = await axios.get(url, {
      headers,
      timeout: scraperConfig.REQUEST_TIMEOUT_MS,
      // 讓編碼自動偵測（避免中文亂碼）
      responseType: 'arraybuffer',
    })

    // ── 步驟 3：解碼回應（網站使用 UTF-8）──
    const html = new TextDecoder('utf-8').decode(response.data)
    console.log(`[Request] 成功取得頁面（${html.length} 字元）`)
    return html

  } catch (error: any) {
    // ── 步驟 4：錯誤處理與自動重試 ──
    const statusCode = error.response ? error.response.status : '(無回應)'
    console.error(`[Request] 第 ${attempt} 次失敗，狀態碼: ${statusCode}，原因: ${error.message}`)

    if (attempt < scraperConfig.MAX_RETRIES) {
      // 計算下次重試等待時間（指數退避：基礎時間 × 1.5^(次數-1)）
      const delay = Math.round(scraperConfig.RETRY_DELAY_BASE_MS * Math.pow(1.5, attempt - 1))
      console.log(`[Request] 等待 ${delay}ms 後進行第 ${attempt + 1} 次重試...`)
      await sleep(delay)
      return fetchHTML(url, attempt + 1)
    }

    // 超過最大重試次數，拋出錯誤中斷程式
    throw new Error(`[Request] 已達最大重試次數 (${scraperConfig.MAX_RETRIES})，放棄請求：${url}`)
  }
}
