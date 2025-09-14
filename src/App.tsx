/**
 * App.tsx - React应用程序的根组件
 * 主要作用：作为应用程序的入口组件，渲染主要的ETicketGenerator组件
 */
import ETicketGenerator from "./components/ETicketGenerator";
import "./App.css";

/**
 * 应用程序的主组件
 * @returns JSX元素 - 包含ETicketGenerator组件的应用程序结构
 */
function App() {
  return (
    <div className="App">
      {/* 渲染电子客票生成器组件 */}
      <ETicketGenerator />
    </div>
  );
}

export default App;
