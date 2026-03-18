<template>
  <!--
    pages/guide.vue - 新手領取懶人包
    SEO 友善的靜態圖文排版頁面，教學新手如何領取股東會紀念品。
  -->
  <NuxtLayout>
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-14">

      <!-- ===== 頁面頂部 Hero ===== -->
      <div class="text-center mb-10">
        <span class="text-5xl">📖</span>
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-3">
          新手領取懶人包
        </h1>
        <p class="text-gray-500 text-base leading-relaxed">
          第一次想領股東會紀念品？<br />
          這篇帶你從零開始，5 分鐘搞懂所有眉角！
        </p>
      </div>

      <!-- ===== 目錄（快速跳轉） ===== -->
      <nav class="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-10">
        <p class="text-xs font-bold text-orange-700 mb-3 tracking-widest">📋 文章目錄</p>
        <ol class="space-y-2 text-sm text-orange-800">
          <li>
            <a href="#section-last-buy-date" class="hover:underline flex items-center gap-2">
              <span class="bg-orange-200 text-orange-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
              最後買進日怎麼看？
            </a>
          </li>
          <li>
            <a href="#section-fractional" class="hover:underline flex items-center gap-2">
              <span class="bg-orange-200 text-orange-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
              零股電子投票教學
            </a>
          </li>
          <li>
            <a href="#section-agent-bank" class="hover:underline flex items-center gap-2">
              <span class="bg-orange-200 text-orange-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
              如何查詢股務代理？
            </a>
          </li>
          <li>
            <a href="#section-pick-up" class="hover:underline flex items-center gap-2">
              <span class="bg-orange-200 text-orange-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">4</span>
              紀念品領取方式說明
            </a>
          </li>
          <li>
            <a href="#section-faq" class="hover:underline flex items-center gap-2">
              <span class="bg-orange-200 text-orange-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">5</span>
              常見問題 FAQ
            </a>
          </li>
        </ol>
      </nav>

      <!-- ===== 主要內容區塊 ===== -->
      <div class="space-y-12">

        <!-- ───────────────────────────────── -->
        <!-- 區塊 1：最後買進日怎麼看 -->
        <section id="section-last-buy-date">
          <!-- 區塊標題 -->
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-red-600 text-white text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">1</span>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">最後買進日怎麼看？</h2>
          </div>

          <div class="prose-style space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              「最後買進日」是指你必須在這一天的<strong class="text-gray-900">收盤時間（下午 1:30）前</strong>完成買股，才能擁有出席股東會、領取紀念品的資格。
            </p>

            <!-- 重點提醒卡 -->
            <div class="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 space-y-1">
              <p class="text-red-700 font-bold text-sm">⚠️ 重要觀念</p>
              <p class="text-red-600 text-sm">
                台股採「T+2」交割制度：今天買股，要<strong>後天才會真正登記為股東</strong>。所以最後買進日通常是股東名冊截止日的前兩個交易日。
              </p>
            </div>

            <p>
              舉例來說，如果股東名冊截止日是 <strong>4/17（週四）</strong>，那麼最後買進日就是 <strong>4/15（週二）</strong>，必須在 4/15 收盤前買入。
            </p>

            <div class="bg-gray-100 rounded-xl p-4">
              <p class="text-xs text-gray-500 font-bold mb-2">📅 查詢最後買進日的方式：</p>
              <ul class="text-sm space-y-1 text-gray-700 list-disc list-inside">
                <li>台灣證券交易所官網（TWSE）公告</li>
                <li>各券商 App（例如：富果、玉山 e 指發）</li>
                <li>本站首頁直接搜尋股票代號 🎁</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ───────────────────────────────── -->
        <!-- 區塊 2：零股電子投票教學 -->
        <section id="section-fractional">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-red-600 text-white text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">2</span>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">零股電子投票教學</h2>
          </div>

          <div class="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              只持有<strong class="text-gray-900">零股（不足 1,000 股整股）</strong>也可以參加股東會！但必須透過<strong class="text-gray-900">電子投票</strong>方式行使投票權，才能具備領取紀念品的資格（部分公司規定不同）。
            </p>

            <!-- 步驟卡片 -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-gray-500 tracking-widest">📋 零股電子投票步驟：</p>
              <div v-for="step in fractionalSteps" :key="step.step" class="flex gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <span class="text-red-600 font-black text-lg flex-shrink-0">{{ step.step }}.</span>
                <div>
                  <p class="font-bold text-gray-800 text-sm">{{ step.title }}</p>
                  <p class="text-gray-500 text-xs mt-0.5">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4">
              <p class="text-green-700 font-bold text-sm">✅ 小提醒</p>
              <p class="text-green-600 text-sm mt-1">
                電子投票截止時間通常是股東會前一天的午夜，建議提前操作，勿等到最後一刻！
              </p>
            </div>
          </div>
        </section>

        <!-- ───────────────────────────────── -->
        <!-- 區塊 3：股務代理查詢 -->
        <section id="section-agent-bank">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-red-600 text-white text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">3</span>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">如何查詢股務代理？</h2>
          </div>

          <div class="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              股務代理是負責辦理股票過戶、股東名冊、股東會等事務的機構，也是你寄出書面委託書、領取實體紀念品的地方。
            </p>

            <!-- 常見股務代理商一覽表 -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-gray-800 text-white">
                    <th class="text-left p-3 rounded-tl-xl">股務代理機構</th>
                    <th class="text-left p-3">官方網站</th>
                    <th class="text-left p-3 rounded-tr-xl">特色</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="bank in agentBanks" :key="bank.name" class="hover:bg-gray-50">
                    <td class="p-3 font-medium text-gray-800">{{ bank.name }}</td>
                    <td class="p-3 text-blue-600">{{ bank.url }}</td>
                    <td class="p-3 text-gray-500">{{ bank.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-xs text-gray-400">
              💡 查詢方式：前往台灣證券交易所官網 → 上市公司 → 輸入股票代號即可查到該公司的股務代理資訊。
            </p>
          </div>
        </section>

        <!-- ───────────────────────────────── -->
        <!-- 區塊 4：紀念品領取方式 -->
        <section id="section-pick-up">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-red-600 text-white text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">4</span>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">紀念品領取方式說明</h2>
          </div>

          <div class="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>股東會紀念品的領取方式通常有以下幾種，各公司規定不同：</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="method in pickupMethods" :key="method.title" class="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p class="text-2xl mb-2">{{ method.icon }}</p>
                <p class="font-bold text-gray-800 text-sm mb-1">{{ method.title }}</p>
                <p class="text-xs text-gray-500">{{ method.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ───────────────────────────────── -->
        <!-- 區塊 5：常見問題 FAQ -->
        <section id="section-faq">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-red-600 text-white text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">5</span>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">常見問題 FAQ</h2>
          </div>

          <div class="space-y-3">
            <div
              v-for="faq in faqs"
              :key="faq.q"
              class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
            >
              <!-- FAQ 問題標題（點擊展開） -->
              <button
                @click="faq.open = !faq.open"
                class="w-full text-left px-5 py-4 flex items-center justify-between gap-2"
              >
                <span class="font-bold text-gray-800 text-sm">❓ {{ faq.q }}</span>
                <span class="text-gray-400 text-lg flex-shrink-0">{{ faq.open ? '▲' : '▼' }}</span>
              </button>
              <!-- FAQ 答案（展開時顯示） -->
              <div v-show="faq.open" class="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- ===== 文章底部 CTA - 引導回首頁 ===== -->
      <div class="mt-14 bg-gradient-to-r from-gray-900 to-red-950 text-white rounded-2xl p-8 text-center">
        <p class="text-3xl mb-3">🎁</p>
        <h2 class="text-xl font-black mb-2">準備好了嗎？</h2>
        <p class="text-gray-400 text-sm mb-6">
          現在就去查詢今年有哪些超值的股東會紀念品！
        </p>
        <NuxtLink to="/" class="btn-primary inline-flex">
          <span>🔥</span>
          <span>查看熱門紀念品排行榜</span>
        </NuxtLink>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// ===== SEO Meta 設定 =====
useSeoMeta({
  title: '新手領取懶人包 - 股東會紀念品怎麼領？完整教學',
  description: '最後買進日怎麼看、零股電子投票教學、股務代理查詢一次搞懂！5 分鐘成為股東會紀念品達人。',
})

// ===== 零股電子投票步驟資料 =====
const fractionalSteps = [
  { step: 1, title: '確認有持股（哪怕只有 1 股零股）', desc: '在最後買進日前買入，待 T+2 交割後即具備資格。' },
  { step: 2, title: '前往股務代理官網', desc: '用自然人憑證或健保 IC 卡登入電子投票平台。' },
  { step: 3, title: '找到該公司的股東會議程', desc: '搜尋公司名稱或股票代號，找到對應年度的議案。' },
  { step: 4, title: '完成電子投票', desc: '對各議案進行贊成/反對的表決，儲存送出即完成。' },
  { step: 5, title: '靜待紀念品寄達', desc: '部分公司採郵寄方式，請確認地址是否正確。' },
]

// ===== 股務代理機構資料 =====
const agentBanks = [
  { name: '中國信託', url: 'stockservice.ctbcbank.com', note: '台積電、大立光等大型股' },
  { name: '玉山銀行', url: 'stock.esunbank.com', note: '聯發科、聯電等科技股' },
  { name: '台新銀行', url: 'www.taishinbank.com.tw', note: '鴻海、日月光等' },
  { name: '元大銀行', url: 'stock.yuanta.com.tw', note: '元大系 ETF、多家金融股' },
  { name: '第一銀行', url: 'www.firstbank.com.tw', note: '台塑四寶、傳統產業' },
]

// ===== 紀念品領取方式 =====
const pickupMethods = [
  { icon: '📮', title: '郵寄到府', desc: '最方便！資料確認後直接寄到股東登記地址，約 1～3 個月後收到。' },
  { icon: '🏢', title: '現場領取', desc: '親自出席股東會或指定通路（股務代理辦公室、門市）領取。' },
  { icon: '🏪', title: '超商取貨', desc: '部分公司合作 7-11、全家等，憑兌換碼領取，更方便！' },
  { icon: '🎟️', title: '電子禮券', desc: '直接發送到 Email 或 App，無需實體領取，立即使用。' },
]

// ===== FAQ 資料（reactive 以支援展開/收合） =====
const faqs = reactive([
  {
    q: '持有零股也能領紀念品嗎？',
    a: '視公司規定而定！部分公司規定持有零股的股東需完成電子投票才能領取，部分公司則不開放零股股東領取。本站每張卡片都有標示零股是否可領。',
    open: false,
  },
  {
    q: '一個人可以同時持有多家公司的股票，全部都能領嗎？',
    a: '可以！只要你在各家公司的最後買進日前持有股票，就可以分別領取各家的紀念品。同時持有幾十家公司是很常見的「紀念品集郵族」玩法。',
    open: false,
  },
  {
    q: '買一股就能領了嗎？',
    a: '不一定。多數公司以「單張」（1,000 股）為基本領取資格，但也有公司開放零股（哪怕只有 1 股）股東參加電子投票後領取。',
    open: false,
  },
  {
    q: '忘記在最後買進日買股，還有其他辦法嗎？',
    a: '很遺憾，一旦錯過最後買進日就無法補救，只能等明年度的股東會了。本站提供「加入行事曆」功能，幫你提前設定提醒！',
    open: false,
  },
  {
    q: '紀念品多久會寄到？',
    a: '通常是股東會結束後的 1～4 個月內陸續寄出，實際時間依各公司安排。若超過半年仍未收到，可聯繫股務代理詢問。',
    open: false,
  },
])
</script>
