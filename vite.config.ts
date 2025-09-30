import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将React相关库分离
          'react-vendor': ['react', 'react-dom'],
          // 将Ant Design分离（包含大部分UI组件）
          'antd-vendor': ['antd', 'dayjs'],
          // 将PDF相关库分离（最大的库，单独缓存）
          'pdf-vendor': ['@react-pdf/renderer'],
        },
      },
    },
    // 提高chunk大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  // 预加载优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd'],
  },
})
