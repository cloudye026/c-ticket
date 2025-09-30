/**
 * React应用程序的主入口文件
 * 负责初始化和渲染根组件到DOM节点
 */
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 移除加载屏幕的函数
const removeLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    // 添加淡出效果
    loadingScreen.classList.add('fade-out')
    // 等待动画完成后移除元素
    setTimeout(() => {
      loadingScreen.remove()
    }, 500)
  }
}

// 包装App组件，添加加载完成逻辑
const AppWithLoading = () => {
  useEffect(() => {
    // React应用挂载完成后移除加载屏幕
    removeLoadingScreen()
  }, [])

  return <App />
}

// 获取DOM中的root元素并创建React根实例，然后渲染App组件
// 使用StrictMode包装可以在开发模式下检测潜在问题
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithLoading />
  </StrictMode>,
)
