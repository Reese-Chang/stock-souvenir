export const scraperConfig = {
  // ── 目標網站 ──────────────────────────────────────────────
  // HiStock 股東會紀念品查詢頁面（單頁包含所有資料，無分頁）
  TARGET_URL: 'https://histock.tw/stock/gift.aspx',

  // ── 請求設定 ──────────────────────────────────────────────
  // 模擬瀏覽器的 User-Agent，降低被網站封鎖的機率
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/123.0.0.0 Safari/537.36',

  // 每次請求逾時時間（毫秒）
  REQUEST_TIMEOUT_MS: 15000,

  // 若請求失敗，最多重試幾次
  MAX_RETRIES: 3,

  // 重試之前等待的基礎時間（毫秒），每次重試會乘以 1.5 倍
  RETRY_DELAY_BASE_MS: 2000,

  // ── 資料表 ID 對照 ────────────────────────────────────────
  // 網頁共有三張表，依「最後買進日」狀態分類
  TABLE_IDS: {
    today:   'CPHB1_gvToday', // 今日最新公告
    current: 'CPHB1_gv',     // 一般清單（買進日未到期）
    old:     'CPHB1_gvOld',  // 最後買進日已到期
  },
}
