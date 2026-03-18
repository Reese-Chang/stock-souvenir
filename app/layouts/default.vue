<template>
  <!-- 全域版面配置：包含 Header、主要內容區、Footer -->
  <div class="min-h-screen flex flex-col bg-gray-50">

    <!-- ===== Header 導覽列 ===== -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <!-- Logo 品牌名稱 -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <!-- 禮物盒 Emoji 當作 Logo 圖示 -->
          <span class="text-2xl">🎁</span>
          <div class="leading-tight">
            <p class="text-base font-black text-gray-900 group-hover:text-red-600 transition-colors">股紀念</p>
            <p class="text-xs text-gray-400 font-medium">股東會紀念品查詢</p>
          </div>
        </NuxtLink>

        <!-- 桌機版導覽選單 -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            active-class="text-red-600 font-bold"
          >
            首頁查詢
          </NuxtLink>
          <NuxtLink
            to="/guide"
            class="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            active-class="text-red-600 font-bold"
          >
            新手懶人包
          </NuxtLink>
        </nav>

        <!-- 行動版漢堡選單（簡易版本） -->
        <div class="md:hidden">
          <NuxtLink
            to="/guide"
            class="text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            新手懶人包
          </NuxtLink>
        </div>

      </div>
    </header>

    <!-- ===== 主要內容區域（由各頁面填充） ===== -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- ===== Footer 頁尾 ===== -->
    <footer class="bg-gray-800 text-gray-400 py-10">
      <div class="max-w-6xl mx-auto px-4 text-center space-y-2">
        <p class="text-white font-bold text-lg">🎁 股紀念</p>
        <p class="text-sm">本站資料僅供參考，請以公司公告及股務代理之正式資料為準。</p>
        <p class="text-xs mt-4">© 2026 股紀念 GuJiNian. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>
