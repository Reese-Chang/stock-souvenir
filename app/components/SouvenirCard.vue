<template>
  <!--
    SouvenirCard.vue - 紀念品詳情卡片元件
    這是一個可重複使用的獨立元件，用於展示一筆股東會紀念品的完整資訊。
    Props: souvenir (Souvenir 型別物件)
  -->
  <article class="card p-5 flex flex-col gap-4">

    <!-- ===== 卡片頂部：股票資訊 + CP 值徽章 ===== -->
    <div class="flex items-start justify-between gap-2">

      <!-- 股票代號與公司名稱 -->
      <div>
        <div class="flex items-center gap-2 flex-wrap">
          <!-- 股票代號標籤 -->
          <span class="bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-md tracking-wider">
            {{ souvenir.stockCode }}
          </span>
          <!-- 公司名稱 -->
          <h3 class="text-base font-bold text-gray-900">{{ souvenir.companyName }}</h3>
        </div>
      </div>

    </div>

    <!-- ===== 紀念品名稱 ===== -->
    <div>
      <p class="text-xs text-gray-500 mb-0.5">紀念品</p>
      <p class="text-lg font-bold text-gray-800 leading-snug">{{ souvenir.souvenirName }}</p>
    </div>

    <!-- ===== 重要資訊區塊（最後買進日 + 零股資格） ===== -->
    <div
      class="border rounded-xl p-3 space-y-2"
      :class="countdownDays === 0 ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-100'"
    >

      <!-- 最後買進日：用醒目紅色 + 倒數天數 -->
      <div class="flex items-center justify-between flex-wrap gap-1">
        <div class="flex items-center gap-1.5">
          <!-- 日曆圖示 -->
          <span class="text-base">📅</span>
          <span class="text-xs text-gray-600 font-medium">最後買進日</span>
        </div>
        <div class="text-right">
          <!-- 日期（紅色/灰色粗體） -->
          <p
            class="font-black text-sm"
            :class="countdownDays === 0 ? 'text-gray-500' : 'text-red-600'"
          >
            {{ formatDate(souvenir.lastBuyDate) }}
          </p>
          <!-- 倒數天數 -->
          <p
            class="text-xs font-bold mt-0.5"
            :class="countdownDays === 0 ? 'text-gray-500' : (countdownDays <= 7 ? 'text-red-700 animate-pulse' : 'text-orange-500')"
          >
            <template v-if="countdownDays === 0">已過期</template>
            <template v-else>⏰ 倒數 {{ countdownDays }} 天</template>
          </p>
        </div>
      </div>

    </div>

    <!-- ===== 股務代理資訊 ===== -->
    <p class="text-xs text-gray-400 -mt-1">
      股務代理機構：<span class="text-gray-600">{{ souvenir.registryAgent || '尚未公告' }}</span>
    </p>

    <!-- ===== 卡片底部 CTA 按鈕 ===== -->
    <div class="flex flex-col gap-2 mt-auto pt-1">

      <!-- 上排：加入行事曆 + 分享 -->
      <div class="flex gap-2">
        <!-- 加入行事曆按鈕（主要 CTA） -->
        <button
          @click="addToCalendar"
          class="flex-1 btn-primary justify-center text-sm py-2.5"
          title="將最後買進日加入行事曆"
        >
          <span>📆</span>
          <span>加入行事曆</span>
        </button>

        <!-- 分享按鈕（次要） -->
        <button
          @click="shareCard"
          class="btn-secondary px-3 py-2.5 text-sm"
          title="分享這筆紀念品"
        >
          <span>🔗</span>
        </button>
      </div>

      <!-- 下排：查看詳情連結 -->
      <NuxtLink
        :to="`/souvenir/${souvenir.stockCode}`"
        class="w-full text-center text-sm font-bold text-red-600 hover:text-red-700 border border-red-200 hover:border-red-400 hover:bg-red-50 rounded-xl py-2.5 transition-all"
      >
        查看領取詳情 →
      </NuxtLink>

    </div>

  </article>
</template>

<script setup lang="ts">
import type { Souvenir } from '~/data/souvenirs'

// ===== Props 定義 =====
const props = defineProps<{
  souvenir: Souvenir
}>()

// ===== 計算屬性 =====

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

/**
 * 計算距離最後買進日的倒數天數
 */
const countdownDays = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const targetDateStr = getFullDateFromApi(props.souvenir.lastBuyDate)
  if (!targetDateStr) return 0
  
  const targetDate = new Date(targetDateStr)
  targetDate.setHours(0, 0, 0, 0)
  const diffMs = targetDate.getTime() - today.getTime()
  // 若已過期則回傳 0
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
})



// ===== 工具函式 =====

/**
 * 格式化日期，輸出中文格式 YYYY/MM/DD
 */
function formatDate(dateStr: string | undefined): string {
  return getFullDateFromApi(dateStr) || '尚未公告'
}

/**
 * 加入行事曆 - 產生 Google Calendar 連結並開新分頁
 */
function addToCalendar() {
  const { souvenir } = props
  const fullDate = formatDate(souvenir.lastBuyDate)
  const dateStr = fullDate.replace(/\//g, '')
  const title = encodeURIComponent(`【最後買進日】${souvenir.stockCode} ${souvenir.companyName} - ${souvenir.souvenirName}`)
  const details = encodeURIComponent(`今天是領取「${souvenir.souvenirName}」的最後買進日！`)
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`
  window.open(url, '_blank')
}

/**
 * 分享卡片 - 使用 Web Share API 或回退至複製連結
 */
async function shareCard() {
  const { souvenir } = props
  const shareText = `【${souvenir.stockCode} ${souvenir.companyName}】股東會紀念品：${souvenir.souvenirName}，最後買進日 ${formatDate(souvenir.lastBuyDate)}，快來查詢！`

  if (navigator.share) {
    // 支援 Web Share API（iOS Safari、Android Chrome）
    await navigator.share({ title: '股紀念', text: shareText, url: window.location.href })
  } else {
    // 回退：複製到剪貼簿
    await navigator.clipboard.writeText(shareText)
    alert('已複製分享文字到剪貼簿！')
  }
}
</script>
