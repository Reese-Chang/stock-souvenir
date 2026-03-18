export interface Souvenir {
  stockCode: string             // 股票代號
  companyName: string           // 公司名稱
  stockPrice: string            // 股價
  lastBuyDate: string           // 最後買進日 (例如: "03/19")
  meetingDate: string           // 股東會日期 (例如: "05/22")
  meetingType: string           // 會議類型 (例如: "常會")
  location: string | null       // 開會地點
  souvenirName: string          // 紀念品名稱
  registryAgent: string | null  // 股務代理
  registryPhone: string | null  // 股務代理電話
  source: string | string[]     // 來源
  giftAnnounced: boolean        // 是否已公布紀念品
}

// ============================================================
// 舊有假資料保留區 (Mock Data Archive)
// 保留供參考用，前端已切換為 /api/souvenirs 實際呼叫
// ============================================================

export interface MockSouvenir {
  id: number
  stockCode: string
  stockName: string
  souvenirName: string
  lastBuyDate: string           // YYYY-MM-DD
  meetingDate: string           // YYYY-MM-DD
  eligibleFractional: boolean
  imageUrl?: string
  agentBank: string
  agentBankAddress: string
  agentBankPhone: string
  description: string
  detailDescription: string
  claimSteps: string[]
}

export const mockSouvenirs: MockSouvenir[] = [
  {
    id: 1,
    stockCode: '2330',
    stockName: '台積電',
    souvenirName: '不鏽鋼質感保溫杯',
    lastBuyDate: '2026-04-15',
    meetingDate: '2026-06-15',
    eligibleFractional: true,
    imageUrl: '/images/souvenirs/tsmc-tumbler.jpg',
    agentBank: '中國信託商業銀行代理部',
    agentBankAddress: '台北市中正區重慶南路一段83號5樓',
    agentBankPhone: '(02) 6636-5566',
    description: '科技感銀色不鏽鋼保溫杯，實用度滿分，每年必搶人氣項目。',
    detailDescription: '這款保溫杯是專為 2026 年台積電股東設計的專屬紀念品。採用 316 醫療級不鏽鋼製造，具備優異的保溫與保冷效果。外觀採用霧面鈦銀色噴砂處理，雷雕台積電 TSMC 標誌，簡約而具科技感。杯蓋設計有防漏矽膠圈及單手彈蓋設計，無論是辦公室還是日常出行都非常實用。容量約 500ml，適合裝水或咖啡。',
    claimSteps: [
      '確認最後買進日：2026年4月15日前買進並持有台積電股票。',
      '收到開會通知書：大約在股東會前一個月，會寄發股東會開會通知書至您的通訊地址。',
      '電子投票（零股必備）：如果您持有的是零股（不到 1000 股），必須在指定期限內透過「股東e票通」或證券 APP 完成電子投票。',
      '前往領取：攜帶「開會通知書」的第一聯（已簽名或蓋章），前往指定的股務代理機構或徵求場所領取。',
      '代領注意事項：若本人無法前往，可填寫開會通知書上的委託書，由親友代為領取。部分代領點可能會酌收代領費（約 20-30 元）。'
    ]
  },
  {
    id: 2,
    stockCode: '2002',
    stockName: '中鋼',
    souvenirName: '鈦金屬戶外露營餐具組',
    lastBuyDate: '2026-04-10',
    meetingDate: '2026-06-10',
    eligibleFractional: true,
    agentBank: '兆豐證券股務代理部',
    agentBankAddress: '台北市中正區忠孝東路二段95號1樓',
    agentBankPhone: '(02) 3393-0898',
    description: '中鋼自製高品質鈦金屬，輕量耐用，露營愛好者必收藏。',
    detailDescription: '中鋼的股東會紀念品一直都是全台股民關注的焦點。2026 年強勢推出「鈦金屬戶外露營餐具組」。中鋼運用其卓越的材料技術，打造出極致輕量且抗菌的鈦金屬餐具，包含筷子、湯匙與叉子。不僅適合戶外露營、登山使用，日常帶便當也非常環保。外盒包裝採用環保紙材，並印有台灣特有種動物圖騰，極具收藏價值。',
    claimSteps: [
      '買進期限：請於 2026-04-10 前完成交割。',
      '零股東注意：中鋼歷年來對零股東都十分友善，只要參與電子投票即可領取。',
      '電子投票：請於收到通知書後，使用手機 APP 進入「股東e服務」完成投票。',
      '領取地點：中鋼通常會委託各地的全家便利商店或指定通路作為徵求點，領取非常方便。請留意通知書上的通路名單。'
    ]
  },
  {
    id: 3,
    stockCode: '2884',
    stockName: '玉山金',
    souvenirName: '全家超商 500 元購物金',
    lastBuyDate: '2026-04-20',
    meetingDate: '2026-06-25',
    eligibleFractional: false,
    agentBank: '玉山證券股務代理部',
    agentBankAddress: '台北市松山區敦化北路315號B1',
    agentBankPhone: '(02) 2718-3666',
    description: '最實用的禮券，無使用期限，全台全家皆可使用。此項目限整股領取。',
    detailDescription: '玉山金控 2026 年為感念股東支持，贈送全家便利商店 500 元商品禮物卡。禮物卡無使用期限，可用於購買店內多數商品（菸品、代收繳費除外）。卡面設計融合玉山銀行的品牌形象與在地風景，具備一定的紀念意義。',
    claimSteps: [
      '重要資格確認：玉山金此次紀念品「限整股（1000股以上）」股東領取，零股東無法領取。',
      '買進最後日：請於 2026-04-20 買進。',
      '領取方式：攜帶開會通知書至全台指定的徵求場所，或親赴玉山證券股務代理部領取。'
    ]
  },
  {
    id: 4,
    stockCode: '2317',
    stockName: '鴻海',
    souvenirName: 'Model T 原尺吋模型車',
    lastBuyDate: '2026-03-25',
    meetingDate: '2026-05-25',
    eligibleFractional: true,
    agentBank: '福邦證券股務代理部',
    agentBankAddress: '台北市中正區忠孝西路一段6號6樓',
    agentBankPhone: '(02) 2371-1658',
    description: '鴻海自主研發電動巴士精緻模型，極具未來感與收藏價值。',
    detailDescription: '展現鴻海在電動車佈局的決心，2026 年紀念品特別推出 1:43 比例的 Model T 電動巴士精緻模型車。車身採用合金材質，細節還原度極高，車燈甚至可以透過底部開關點亮。不僅是小朋友的精緻玩具，更是大人桌上的質感擺飾。',
    claimSteps: [
      '買進期限：這檔最後買進日較早，需在 2026-03-25 前買進。',
      '電子投票：零股東請記得完成電子投票步驟。',
      '領取須知：由於模型車體積較大且脆弱，建議親自前往股務代理或指定的徵求地點領取，避免代領運送過程中損壞。'
    ]
  },
  {
    id: 5,
    stockCode: '1101',
    stockName: '台泥',
    souvenirName: '環保水泥盆栽組',
    lastBuyDate: '2026-03-10',
    meetingDate: '2026-05-15',
    eligibleFractional: true,
    agentBank: '永豐金證券股務代理部',
    agentBankAddress: '台北市中正區博愛路17號3樓',
    agentBankPhone: '(02) 2381-6288',
    description: '呼應綠能減碳，台泥低碳水泥搭配療癒多肉植物。',
    detailDescription: '台泥積極轉型綠能與環保，今年的紀念品是「低碳環保水泥盆栽組」。盆器採用台泥獨家研發的低碳水泥製作，造型簡約質樸。套組內含一盆易於照顧的台灣原生多肉植物，以及一小包特殊配方的環保土壤。放在辦公桌上不僅療癒，更傳遞了永續地球的理念。',
    claimSteps: [
      '買進期限：請於 2026-03-10 前完成買進。',
      '活體植物注意：由於包含活體植物，請務必在通知書上標示的領取期間盡早前往領取。',
      '領取地點：請至永豐金證券股務代理部或指定的徵求據點領取。'
    ]
  },
  {
    id: 6,
    stockCode: '1216',
    stockName: '統一',
    souvenirName: '統一生機健康禮盒',
    lastBuyDate: '2026-04-18',
    meetingDate: '2026-06-20',
    eligibleFractional: true,
    agentBank: '統一綜合證券股務代理部',
    agentBankAddress: '台北市松山區東興路8號B1',
    agentBankPhone: '(02) 2746-3797',
    description: '包含燕麥飲、堅果等有機食品組合，照顧股東健康。',
    detailDescription: '統一企業向來重視食安與健康，今年特別準備了「統一生機健康大禮盒」。內含熱銷的有機燕麥飲三罐、綜合無調味堅果一罐，以及海藻多醣體凍飲。包裝採用喜氣的紅色系，無論是自用還是送禮都非常大方。',
    claimSteps: [
      '買進期限：請於 2026-04-18 前買進。',
      '領取資格：零股東參加電子投票後即可領取。',
      '領取重量：禮盒具有一定重量（約1.5公斤），前往領取時建議自備環保袋。'
    ]
  },
  {
    id: 7,
    stockCode: '2603',
    stockName: '長榮',
    souvenirName: '全球航線世界地圖滑鼠墊',
    lastBuyDate: '2026-03-28',
    meetingDate: '2026-05-28',
    eligibleFractional: true,
    agentBank: '凱基證券股務代理部',
    agentBankAddress: '台北市中正區重慶南路一段2號5樓',
    agentBankPhone: '(02) 2389-2999',
    description: '超大張電競級滑鼠墊，印有長榮海運全球航線圖。',
    detailDescription: '辦公實用好物！長榮海運推出長 80 公分、寬 40 公分的超大尺寸滑鼠墊。表面採用細緻防潑水布面，滑鼠定位精準；底部採用防滑橡膠。滑鼠墊上印製了長榮海運的全球貨幣航線圖，設計十分霸氣。',
    claimSteps: [
      '買進期限：請於 2026-03-28 前買進。',
      '電子投票：零股東請完成電子投票。',
      '領取方式：由於是軟性捲筒包裝，領取攜帶十分方便。'
    ]
  },
  { // 故意放一個過期的資料，用於測試過期狀態
    id: 8,
    stockCode: '0050',
    stockName: '元大台灣50',
    souvenirName: '理財規劃手冊與精美書籤',
    lastBuyDate: '2025-12-30',
    meetingDate: '2026-02-28',
    eligibleFractional: true,
    agentBank: '元大證券股務代理部',
    agentBankAddress: '台北市大同區承德路三段210號B1',
    agentBankPhone: '(02) 2586-5859',
    description: '已經過了最後買進日，只能等明年囉。',
    detailDescription: '元大投信為鼓勵投資人長期理財，特別編製了 2026 投資展望與理財規劃手冊，並附贈一枚金屬幾何造型的精緻書籤。',
    claimSteps: [
      '本年度最後買進日已過。',
      '若您已具備股東資格，請留意開會通知書進行領取。'
    ]
  }
]
