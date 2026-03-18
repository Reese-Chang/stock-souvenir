import type { Config } from 'tailwindcss'

// Tailwind CSS 設定檔
export default {
  // 掃描這些路徑下的所有 Vue 和 TS 檔案
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 自訂字型
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      // 自訂顏色（台股紅綠配色）
      colors: {
        brand: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        stock: {
          red: '#e8000b',    // 台股上漲紅
          green: '#00b050',  // 台股下跌綠
        }
      },
    },
  },
  plugins: [],
} satisfies Config
