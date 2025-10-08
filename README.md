# C-Ticket 电子机票生成器

基于 React + TypeScript + Vite 构建的现代化电子机票生成应用。

## ✨ 特性

- 🎨 现代化 UI 设计（基于 Ant Design）
- 📄 PDF 生成和导出（@react-pdf/renderer）
- ⚡️ 快速开发体验（Vite + HMR）
- 🔧 TypeScript 支持
- 📦 代码分割优化

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

### 预览

```bash
pnpm run preview
```

## 📦 一键部署

本项目支持多种部署方式，详见 [部署指南](./DEPLOYMENT.md)

### 快速部署命令

```bash
# Vercel 部署
pnpm run deploy:vercel

# Netlify 部署
pnpm run deploy:netlify

# Docker 本地部署
pnpm run deploy:docker

# 或使用交互式部署脚本
chmod +x deploy.sh && ./deploy.sh
```

### 支持的部署平台

- ✅ **Vercel** - 推荐，零配置
- ✅ **Netlify** - 简单易用
- ✅ **GitHub Pages** - 免费托管
- ✅ **Docker** - 自建服务器

详细部署教程请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📚 技术栈

- **框架**: React 19
- **构建工具**: Vite 7
- **语言**: TypeScript 5.8
- **UI 库**: Ant Design 5
- **PDF 生成**: @react-pdf/renderer 4
- **日期处理**: Day.js 1.11

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
