<template>
  <!--
    pages/index.vue - 首頁
    核心查詢與探索入口：
    1. Hero Section + 巨大 SearchBar
    2. 「2026 絕版倒數 Top」排行榜
    3. 「網友激推高 CP 值」排行榜
  -->
  <NuxtLayout>
    <div>

      <!-- ===================================================
           Hero Section - 視覺焦點與搜尋入口
      =================================================== -->
      <section class="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white py-16 md:py-24">
        <div class="max-w-3xl mx-auto px-4 text-center space-y-6">

          <!-- 頁面主標題 -->
          <div class="space-y-2">
            <p class="text-red-400 text-sm font-bold tracking-widest uppercase">2026 股東會紀念品</p>
            <h1 class="text-3xl md:text-5xl font-black leading-tight">
              找到最划算的<br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                股東小禮物
              </span>
            </h1>
            <p class="text-gray-400 text-sm md:text-base mt-2">
              即時查詢最後買進日 · 零股領取資格
            </p>
          </div>

          <!-- ===== 核心搜尋框 ===== -->
          <form @submit.prevent="handleSearch" class="relative max-w-2xl mx-auto mt-8">
            <!-- 搜尋輸入框 -->
            <input
              v-model="searchQuery"
              type="search"
              id="main-search"
              name="q"
              autocomplete="off"
              placeholder="請輸入股票代號、公司名稱或紀念品關鍵字"
              class="search"
            />
            <!-- 搜尋按鈕 -->
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm md:text-base"
            >
              🔍 搜尋
            </button>
          </form>

          <!-- 熱門快速搜尋標籤 -->
          <div class="flex flex-wrap justify-center gap-2 mt-4">
            <p class="text-gray-500 text-xs w-full mb-1">熱門搜尋：</p>
            <button
              v-for="tag in hotTags"
              :key="tag"
              @click="searchQuery = tag; handleSearch()"
              class="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full transition-all border border-white/20"
            >
              {{ tag }}
            </button>
          </div>

        </div>
      </section>

      <!-- ===================================================
           搜尋結果區域（有搜尋關鍵字時才顯示）
      =================================================== -->
      <section v-if="searchResults.length > 0" class="max-w-6xl mx-auto px-4 py-10">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title">
            🔎 搜尋「{{ searchQuery }}」的結果
          </h2>
          <!-- 清除搜尋 -->
          <button @click="clearSearch" class="text-sm text-gray-400 hover:text-gray-600 underline">
            清除搜尋
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SouvenirCard
            v-for="souvenir in searchResults"
            :key="souvenir.stockCode"
            :souvenir="souvenir"
          />
        </div>
      </section>

      <!-- ===================================================
           排行榜區域（無搜尋時才顯示）
      =================================================== -->
      <div v-else class="max-w-6xl mx-auto px-4 py-10 space-y-14">

        <!-- ========== 狀態：載入中/錯誤 ========== -->
        <div v-if="pending" class="text-center py-20 animate-pulse">
          <p class="text-gray-500">正在努力載入最新紀念品情報...</p>
        </div>
        <div v-else-if="error" class="text-center py-20">
          <p class="text-red-500 font-bold mb-4">資料載入失敗</p>
          <button @click="() => refresh()" class="btn-secondary">重新嘗試</button>
        </div>

        <template v-else>
          <!-- ========== 排行榜 1：絕版倒數 Top ========== -->
          <section>
            <!-- 區塊標題列 -->
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <h2 class="section-title">
                ⏳ 絕版倒數 Top
              </h2>
              <!-- 展開/收合切換按鈕 -->
              <button
                @click="showCountdown = !showCountdown"
                class="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                {{ showCountdown ? '▲ 收合' : '▼ 展開全部' }}
              </button>
            </div>

            <!-- 說明文字 -->
            <p class="text-sm text-gray-500 mb-5 -mt-3">
              📌 最後買進日快到了！錯過就要等明年，把握最後機會。
            </p>

            <!-- 倒數排行榜卡片網格，點擊「展開」後顯示 -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-show="showCountdown">
                <div v-if="countdownList.length" class="space-y-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <SouvenirCard
                      v-for="souvenir in countdownList"
                      :key="souvenir.stockCode"
                      :souvenir="souvenir"
                    />
                  </div>
                  <!-- 載入更多按鈕 -->
                  <div v-if="countdownList.length < totalCountdownCount" class="text-center">
                    <button
                      @click="loadMoreCountdown"
                      class="bg-white hover:bg-red-50 text-red-600 font-bold py-3 px-8 rounded-xl transition-all inline-block border-2 border-red-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 btn-attract"
                    >
                      向下展開更多 (剩餘 {{ Math.max(0, totalCountdownCount - countdownList.length) }} 筆)
                    </button>
                  </div>
                </div>
                <div v-else class="text-center py-10 bg-gray-50 border border-gray-100 rounded-2xl">
                  <p class="text-gray-500">目前沒有即將絕版的紀念品</p>
                </div>
              </div>
            </Transition>
          </section>

          <!-- ========== 排行榜 2：最新情報 ========== -->
          <section>
            <!-- 區塊標題列 -->
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <h2 class="section-title">
                👑 最新情報
              </h2>
              <!-- 展開/收合切換按鈕 -->
              <button
                @click="showHighCp = !showHighCp"
                class="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                {{ showHighCp ? '▲ 收合' : '▼ 展開全部' }}
              </button>
            </div>

            <!-- 說明文字 -->
            <p class="text-sm text-gray-500 mb-5 -mt-3">
              💡 這是近期剛公布的股東會紀念品名單。
            </p>

            <!-- 最新情報卡片網格 -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div v-show="showHighCp">
                <div v-if="latestTop6.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <SouvenirCard
                    v-for="souvenir in latestTop6"
                    :key="souvenir.stockCode"
                    :souvenir="souvenir"
                  />
                </div>
                <div v-else class="text-center py-10 bg-gray-50 border border-gray-100 rounded-2xl">
                  <p class="text-gray-500">目前沒有近期情報</p>
                </div>
              </div>
            </Transition>
          </section>
        </template>

        <!-- ========== 導引區塊：新手教學 ========== -->
        <section class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-6 md:p-8 text-center">
          <p class="text-2xl mb-3">📖</p>
          <h2 class="text-xl font-black text-gray-900 mb-2">第一次領紀念品？</h2>
          <p class="text-gray-500 text-sm mb-5">
            從「最後買進日怎麼看」到「零股如何電子投票」，一篇搞定！
          </p>
          <NuxtLink to="/guide" class="btn-primary inline-flex">
            <span>📚</span>
            <span>查看新手領取懶人包</span>
          </NuxtLink>
        </section>

      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Souvenir } from '~/data/souvenirs'

// ===== SEO Meta 設定 =====
useSeoMeta({
  title: '股東會紀念品查詢 - 2026 最完整 CP 值排行',
  description: '查詢台股股東會紀念品、最後買進日、零股資格，一鍵加入行事曆，不再錯過任何小禮物！',
  ogTitle: '股東會紀念品查詢 🎁',
  ogDescription: '2026 最新股東會紀念品 CP 值排行榜，一鍵加入行事曆！',
})

// ===== 資料獲取 Fetching =====
const { data, pending, error, refresh } = await useFetch<{ data: Souvenir[] }>('/api/souvenirs')

// 把來源變為實際資料
const allSouvenirs = computed<Souvenir[]>(() => data.value?.data || [])

function getTimestamp(dateStr: string | undefined): number {
  if (!dateStr || dateStr.includes('—')) return 0

  // 後端應輸出 YYYY/MM/DD，直接解析
  if (dateStr.split('/').length === 3) {
    return new Date(dateStr).getTime()
  }

  // Fallback：舊快取資料為 MM/DD，直接補今年（Stockgift 已透過 merge 覆蓋正確年份）
  if (dateStr.split('/').length === 2) {
    const year = new Date().getFullYear()
    const [month, day] = dateStr.split('/')
    return new Date(`${year}/${month}/${day}`).getTime()
  }

  return 0
}

// 絕版倒數目前顯示的數量，預設 6 筆
const countdownLimit = ref(6)

// 所有符合「未過期」條件的絕版倒數資料（用於計算總數與過濾）
const allCountdownData = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTime = today.getTime()

  return [...allSouvenirs.value]
    .filter(s => {
      const ts = getTimestamp(s.lastBuyDate)
      return ts > 0 && ts > todayTime
    })
    .sort((a, b) => getTimestamp(a.lastBuyDate) - getTimestamp(b.lastBuyDate))
})

// 總共符合條件的筆數
const totalCountdownCount = computed(() => allCountdownData.value.length)

// 畫面上實際呈現的絕版倒數資料 (依照 limit 擷取)
const countdownList = computed(() => {
  return allCountdownData.value.slice(0, countdownLimit.value)
})

// 載入更多函式
function loadMoreCountdown() {
  countdownLimit.value += 24
}


// 最新情報前 6 名
const latestTop6 = computed(() => {
  return [...allSouvenirs.value]
    .filter(s => getTimestamp(s.lastBuyDate) > 0)
    .sort((a, b) => getTimestamp(b.lastBuyDate) - getTimestamp(a.lastBuyDate))
    .slice(0, 6)
})

// ===== 搜尋功能狀態 =====

// 搜尋關鍵字（雙向綁定）
const searchQuery = ref('')

// 搜尋結果
const searchResults = ref<Souvenir[]>([])

// 熱門搜尋標籤
const hotTags = ['保溫杯', '商品卡', '米', '禮券', '香皂', '咖啡']

/**
 * 執行搜尋 - 在全量資料中過濾符合關鍵字的紀念品
 */
function handleSearch() {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) {
    searchResults.value = []
    return
  }
  // 比對股票代號、公司名稱、紀念品名稱
  searchResults.value = allSouvenirs.value.filter((s: Souvenir) =>
    s.stockCode.includes(q) ||
    s.companyName.toLowerCase().includes(q) ||
    (s.souvenirName && s.souvenirName.toLowerCase().includes(q))
  )
}

/**
 * 清除搜尋，回到排行榜畫面
 */
function clearSearch() {
  searchQuery.value = ''
  searchResults.value = []
}

// ===== 排行榜展開/收合狀態 =====

// 預設展開兩個排行榜
const showCountdown = ref(true)
const showHighCp = ref(true)
</script>

<style scoped>
/* 搜尋框輸入框 - 移除預設邊框，改用 Tailwind + focus 樣式 */
.search {
  @apply w-full h-14 md:h-16 pl-6 pr-[110px] text-base md:text-lg rounded-2xl bg-white text-gray-900 placeholder-gray-400 shadow-2xl outline-none border-2 border-transparent focus:border-red-500 transition-all;
}

/* 吸引點擊的擺動動畫 (大概擺動 3 下後暫停，循環播放) */
@keyframes wobble-3 {
  0%, 100% { transform: translateX(0) rotate(0); }
  5%  { transform: translateX(-4px) rotate(-3deg); }
  10% { transform: translateX(4px) rotate(3deg); }
  15% { transform: translateX(-4px) rotate(-3deg); }
  20% { transform: translateX(4px) rotate(3deg); }
  25% { transform: translateX(-4px) rotate(-3deg); }
  30% { transform: translateX(4px) rotate(3deg); }
  35% { transform: translateX(0) rotate(0); }
}
.btn-attract {
  animation: wobble-3 3s infinite ease-in-out;
}
</style>