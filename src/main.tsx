/**
 * React应用程序的主入口文件
 * 负责初始化和渲染根组件到DOM节点
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 获取DOM中的root元素并创建React根实例，然后渲染App组件
// 使用StrictMode包装可以在开发模式下检测潜在问题
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
