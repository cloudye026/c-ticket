# C-Ticket 部署指南

本项目提供多种一键部署方案，可根据需求选择合适的部署平台。

## 📦 部署方式概览

| 方式 | 难度 | 速度 | 成本 | 推荐指数 |
|------|------|------|------|----------|
| Vercel | ⭐ | 极快 | 免费 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐ | 极快 | 免费 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ⭐⭐ | 快 | 免费 | ⭐⭐⭐⭐ |
| Docker | ⭐⭐⭐ | 中 | 看服务器 | ⭐⭐⭐ |

---

## 🚀 方案一：Vercel 部署（推荐）

### 特点
- ✅ 零配置，自动构建
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 每次 push 自动部署

### 部署步骤

#### 方式 1: 通过 Vercel 网站（最简单）

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Import Project"
3. 导入此 GitHub 仓库
4. Vercel 会自动检测 Vite 项目并配置
5. 点击 "Deploy" - 完成！

#### 方式 2: 通过命令行

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署（首次会询问配置）
vercel

# 4. 生产环境部署
vercel --prod
```

### 配置说明
项目已包含 `vercel.json` 配置文件，Vercel 会自动识别。

---

## 🔷 方案二：Netlify 部署

### 特点
- ✅ 简单易用
- ✅ 免费额度充足
- ✅ 表单处理、函数支持
- ✅ 持续部署

### 部署步骤

#### 方式 1: 通过 Netlify 网站

1. 访问 [Netlify](https://www.netlify.com)
2. 点击 "Add new site" > "Import an existing project"
3. 连接 GitHub 并选择仓库
4. 构建设置会自动识别（或手动填写）：
   - Build command: `pnpm install && pnpm run build`
   - Publish directory: `dist`
5. 点击 "Deploy site" - 完成！

#### 方式 2: 通过命令行

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 初始化（首次）
netlify init

# 4. 部署
netlify deploy --prod
```

### 配置说明
项目已包含 `netlify.toml` 配置文件。

---

## 📄 方案三：GitHub Pages 部署

### 特点
- ✅ 完全免费
- ✅ GitHub 原生支持
- ✅ 适合开源项目
- ⚠️ 仅支持静态站点

### 部署步骤

1. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **访问网站**
   - 部署完成后访问：`https://<username>.github.io/<repo-name>/`

### 自定义域名（可选）
1. 在 GitHub Pages 设置中添加自定义域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `<username>.github.io`

### 注意事项
- 如果部署到子路径，需要修改 `vite.config.ts`：
  ```ts
  export default defineConfig({
    base: '/<repo-name>/',
    // ...其他配置
  })
  ```

---

## 🐳 方案四：Docker 部署

### 特点
- ✅ 环境一致性强
- ✅ 便于扩展和迁移
- ✅ 适合自建服务器
- ⚠️ 需要基础 Docker 知识

### 部署步骤

#### 快速启动

```bash
# 1. 构建并启动容器
docker-compose up -d

# 2. 访问应用
# 浏览器打开: http://localhost:3000

# 3. 查看日志
docker-compose logs -f

# 4. 停止容器
docker-compose down
```

#### 手动 Docker 命令

```bash
# 1. 构建镜像
docker build -t c-ticket:latest .

# 2. 运行容器
docker run -d -p 3000:80 --name c-ticket c-ticket:latest

# 3. 停止容器
docker stop c-ticket

# 4. 删除容器
docker rm c-ticket
```

### 配置说明
- `Dockerfile`: 多阶段构建，优化镜像大小
- `nginx.conf`: Nginx 配置，支持 SPA 路由
- `docker-compose.yml`: 编排配置

---

## 🛠️ 一键部署脚本

项目提供了交互式部署脚本 `deploy.sh`：

```bash
# 1. 添加执行权限
chmod +x deploy.sh

# 2. 运行脚本
./deploy.sh
```

脚本提供以下选项：
1. Vercel 部署
2. Netlify 部署
3. Docker 本地部署
4. 仅构建（生成 dist）
5. 退出

---

## 🔧 手动构建部署

如果要部署到其他平台（如阿里云 OSS、腾讯云 COS 等）：

```bash
# 1. 安装依赖
pnpm install

# 2. 构建
pnpm run build

# 3. dist 目录即为构建产物
# 将 dist 目录上传到静态服务器即可
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🌐 环境变量配置（如需要）

如果项目需要环境变量，在不同平台配置方式：

### Vercel
Settings > Environment Variables

### Netlify
Site settings > Build & deploy > Environment

### Docker
修改 `docker-compose.yml` 中的 `environment` 部分

### 本地开发
创建 `.env` 文件：
```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=C-Ticket
```

---

## 📊 性能优化建议

项目已内置以下优化：
- ✅ 代码分割（React、Ant Design、PDF 库分离）
- ✅ 静态资源长期缓存
- ✅ Gzip 压缩
- ✅ 依赖预加载

部署后可进一步优化：
- 启用 CDN
- 配置合适的缓存策略
- 使用 HTTP/2
- 启用 Brotli 压缩

---

## 🐛 常见问题

### 1. 构建失败：内存不足
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max_old_space_size=4096 pnpm run build
```

### 2. 路由 404 问题
确保服务器配置了 SPA 路由回退到 `index.html`

### 3. 静态资源 404
检查 `vite.config.ts` 中的 `base` 配置是否正确

### 4. Docker 端口冲突
修改 `docker-compose.yml` 中的端口映射：
```yaml
ports:
  - "8080:80"  # 改为其他端口
```

---

## 📝 更新部署

### Vercel/Netlify
推送代码到 GitHub 即可自动部署：
```bash
git add .
git commit -m "Update"
git push
```

### Docker
```bash
# 重新构建并重启
docker-compose up -d --build
```

---

## 💡 推荐方案总结

- **个人项目/演示**: Vercel 或 Netlify（免费、快速）
- **开源项目**: GitHub Pages（免费、与仓库集成）
- **企业自建**: Docker + 自有服务器（可控性强）
- **快速测试**: `pnpm run build && pnpm run preview`

---

## 📞 需要帮助？

- 查看项目 Issues
- 参考各平台官方文档
- 运行 `./deploy.sh` 使用自动化脚本

---

**祝部署顺利！🎉**
