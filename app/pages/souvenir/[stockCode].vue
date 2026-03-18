<template>
  <!--
    pages/souvenir/[id].vue - 紀念品詳情頁
    展示完整的領取步驟、股務代理資訊、禮品介紹與圖片
  -->
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50">

      <!-- ===== 找不到資料 ===== -->
      <div v-if="!souvenir" class="max-w-2xl mx-auto px-4 py-24 text-center">
        <p class="text-6xl mb-4">😕</p>
        <h1 class="text-2xl font-black text-gray-900 mb-2">找不到這筆紀念品</h1>
        <p class="text-gray-500 mb-8">請確認網址是否正確，或回到首頁重新查詢。</p>
        <NuxtLink to="/" class="btn-primary inline-flex">← 回到首頁</NuxtLink>
      </div>

      <!-- ===== 詳情頁主體 ===== -->
      <template v-else>

        <!-- ===================================================
             Hero Section - 封面圖 + 基本資訊
        =================================================== -->
        <section class="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white">
          <div class="max-w-4xl mx-auto px-4 py-10 md:py-14">

            <!-- 麵包屑導覽 -->
            <nav class="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
              <NuxtLink to="/" class="hover:text-white transition-colors">首頁</NuxtLink>
              <span>/</span>
              <span class="text-gray-300">{{ souvenir.stockCode }} {{ souvenir.companyName }}</span>
            </nav>

            <div class="flex flex-col md:flex-row gap-8 items-start">

              <!-- 紀念品圖片 -->
              <div class="w-full md:w-64 flex-shrink-0">
                <div class="aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <!-- Fallback：無圖片時顯示 emoji -->
                  <div class="text-center p-6">
                    <p class="text-7xl">{{ categoryEmoji }}</p>
                    <p class="text-white/60 text-xs mt-3">示意圖</p>
                  </div>
                </div>
              </div>

              <!-- 右側文字資訊 -->
              <div class="flex-1 space-y-4">

                <!-- 股票標籤 + 類別 -->
                <div class="flex flex-wrap items-center gap-2">
                  <span class="bg-white text-gray-900 text-sm font-black px-3 py-1 rounded-lg tracking-wider">
                    {{ souvenir.stockCode }}
                  </span>
                  <span class="text-white/70 text-sm font-bold">{{ souvenir.companyName }}</span>
                </div>

                <!-- 紀念品名稱 -->
                <h1 class="text-2xl md:text-3xl font-black leading-snug">
                  {{ souvenir.souvenirName }}
                </h1>

              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================
             重要日期時間軸
        =================================================== -->
        <section class="bg-white border-b border-gray-100">
          <div class="max-w-4xl mx-auto px-4 py-6">
            <div class="grid grid-cols-2 gap-4 md:gap-8">

              <!-- 最後買進日 -->
              <div
                class="border rounded-2xl p-4 text-center"
                :class="countdownDays === 0 ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-100'"
              >
                <p class="text-xs text-gray-500 mb-1">📅 最後買進日</p>
                <p
                  class="text-xl md:text-2xl font-black"
                  :class="countdownDays === 0 ? 'text-gray-500' : 'text-red-600'"
                >
                  {{ formatApiDate(souvenir.lastBuyDate) }}
                </p>
                <p
                  class="text-sm font-bold mt-1"
                  :class="countdownDays === 0 ? 'text-gray-500' : (countdownDays <= 7 ? 'text-red-700 animate-pulse' : 'text-orange-500')"
                >
                  <template v-if="countdownDays === 0">已過期</template>
                  <template v-else>⏰ 倒數 {{ countdownDays }} 天</template>
                </p>
              </div>

              <!-- 股東會日期 -->
              <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <p class="text-xs text-gray-500 mb-1">🏛️ 股東會日期</p>
                <p class="text-xl md:text-2xl font-black text-gray-800">{{ formatApiDate(souvenir.meetingDate) }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ souvenir.meetingType || '年度股東會' }}</p>
              </div>

            </div>
          </div>
        </section>

        <!-- ===================================================
             主要內容區塊（三欄式在桌機、單欄在手機）
        =================================================== -->
        <div class="max-w-4xl mx-auto px-4 py-10 space-y-8">

          <!-- ========== 股務代理聯絡資訊 ========== -->
          <section class="card p-6 md:p-8">
            <h2 class="section-title mb-5">
              🏦 股務代理聯絡資訊
            </h2>

            <div class="space-y-4">

              <!-- 銀行名稱 -->
              <div class="flex items-start gap-3">
                <span class="text-xl flex-shrink-0">🏛️</span>
                <div>
                  <p class="text-xs text-gray-500 mb-0.5">股務代理機構</p>
                  <p class="font-bold text-gray-900">{{ souvenir.registryAgent || '尚未公告' }}</p>
                </div>
              </div>

              <!-- 地址 -->
              <div class="flex items-start gap-3">
                <span class="text-xl flex-shrink-0">📍</span>
                <div>
                  <p class="text-xs text-gray-500 mb-0.5">開會地點 / 地庫</p>
                  <p class="font-medium text-gray-900">{{ souvenir.location || '尚未公告' }}</p>
                  <!-- Google Maps 連結 -->
                  <a v-if="souvenir.location"
                    :href="`https://maps.google.com/?q=${encodeURIComponent(souvenir.location)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1 underline underline-offset-2"
                  >
                    在 Google Maps 中開啟 ↗
                  </a>
                </div>
              </div>

              <!-- 電話 -->
              <div class="flex items-start gap-3">
                <span class="text-xl flex-shrink-0">📞</span>
                <div>
                  <p class="text-xs text-gray-500 mb-0.5">聯絡電話</p>
                  <a v-if="souvenir.registryPhone"
                    :href="`tel:${souvenir.registryPhone.replace(/[^0-9]/g, '')}`"
                    class="font-bold text-gray-900 hover:text-red-600 transition-colors"
                  >
                    {{ souvenir.registryPhone }}
                  </a>
                  <p v-else class="text-gray-900">尚未公告</p>
                </div>
              </div>

            </div>
          </section>

          <!-- ========== 操作列 CTA ========== -->
          <div class="flex flex-col sm:flex-row gap-3">

            <!-- 加入行事曆（主要 CTA） -->
            <button
              @click="addToCalendar"
              class="btn-primary flex-1 justify-center py-3.5 text-base"
            >
              <span>📆</span>
              <span>將最後買進日加入行事曆</span>
            </button>

            <!-- 分享 -->
            <button
              @click="shareCard"
              class="btn-secondary px-5 py-3.5 flex items-center gap-2 justify-center text-base"
            >
              <span>🔗 分享</span>
            </button>

            <!-- 返回 -->
            <NuxtLink
              to="/"
              class="btn-secondary px-5 py-3.5 flex items-center gap-2 justify-center text-base"
            >
              <span>← 返回</span>
            </NuxtLink>

          </div>

        </div>
      </template>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Souvenir } from '~/data/souvenirs'

// ===== 根據路由 stockCode 找到對應紀念品 =====
const route = useRoute()
const stockCode = route.params.stockCode as string

const { data, pending, error } = await useFetch<{ data: Souvenir[] }>('/api/souvenirs')


const souvenir = computed(() => {
  if (!data.value?.data) return null
  return data.value.data.find((s: Souvenir) => s.stockCode === stockCode) ?? null
})


// ===== SEO Meta（動態設定）=====
useSeoMeta({
  title: () => souvenir.value
    ? `${souvenir.value.souvenirName} - ${souvenir.value.stockCode} ${souvenir.value.companyName} | 股東會紀念品查詢`
    : '找不到紀念品 | 股東會紀念品查詢',
  description: () => souvenir.value
    ? `${souvenir.value.companyName} 股東會紀念品「${souvenir.value.souvenirName}」，最後買進日 ${formatApiDate(souvenir.value.lastBuyDate)}。即刻查看！`
    : '找不到指定的紀念品資料，請回到首頁重新查詢。',
})

// ===== 計算屬性 =====

/** 距離最後買進日的倒數天數 */
const countdownDays = computed(() => {
  if (!souvenir.value) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDateStr = getFullDateFromApi(souvenir.value.lastBuyDate)
  if (!targetDateStr) return 0
  const targetDate = new Date(targetDateStr)
  targetDate.setHours(0, 0, 0, 0)
  const diffMs = targetDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
})

/** 依類別顯示不同 fallback emoji */
const categoryEmoji = computed(() => {
  return '🎁'
})

// ===== 工具函式 =====

function getFullDateFromApi(dateStr: string | undefined): string {
  if (!dateStr || dateStr.includes('—')) return ''
  // 後端應輸出 YYYY/MM/DD，直接用
  if (dateStr.split('/').length === 3) return dateStr
  // Fallback：MM/DD（舊快取），補上今年
  if (dateStr.split('/').length === 2) {
    const year = new Date().getFullYear()
    const [month, day] = dateStr.split('/')
    return `${year}/${month}/${day}`
  }
  return dateStr
}

function formatApiDate(dateStr: string | undefined): string {
  return getFullDateFromApi(dateStr) || '尚未公告'
}

function addToCalendar() {
  if (!souvenir.value) return
  const fullDate = formatApiDate(souvenir.value.lastBuyDate)
  const dateStr = fullDate.replace(/\//g, '')
  const title = encodeURIComponent(`【最後買進日】${souvenir.value.stockCode} ${souvenir.value.companyName} - ${souvenir.value.souvenirName}`)
  const details = encodeURIComponent(`今天是領取「${souvenir.value.souvenirName}」的最後買進日！`)
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`
  window.open(url, '_blank')
}

async function shareCard() {
  if (!souvenir.value) return
  const fullDate = formatApiDate(souvenir.value.lastBuyDate)
  const shareText = `【${souvenir.value.stockCode} ${souvenir.value.companyName}】股東會紀念品：${souvenir.value.souvenirName}，最後買進日 ${fullDate}。更多詳情：${window.location.href}`
  if (navigator.share) {
    await navigator.share({ title: '股紀念', text: shareText, url: window.location.href })
  } else {
    await navigator.clipboard.writeText(shareText)
    alert('已複製分享文字到剪貼簿！')
  }
}
</script>

<style scoped>
.section-title {
  @apply text-xl md:text-2xl font-black text-gray-900;
}

.btn-primary {
  @apply bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-6 py-3 rounded-xl transition-all gap-2 items-center inline-flex;
}

.btn-secondary {
  @apply bg-white hover:bg-gray-50 active:scale-95 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-all border border-gray-200 gap-2 items-center inline-flex;
}

.card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-100;
}
</style>
