#!/bin/bash

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    C-Ticket 一键部署脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否安装了必要的工具
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}错误: 未找到 $1 命令${NC}"
        return 1
    fi
    return 0
}

# 部署选项菜单
show_menu() {
    echo "请选择部署方式："
    echo "1) Vercel 部署"
    echo "2) Netlify 部署"
    echo "3) Docker 本地部署"
    echo "4) 仅构建（生成 dist 目录）"
    echo "5) 退出"
    echo ""
    read -p "请输入选项 (1-5): " choice
    
    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_docker
            ;;
        4)
            build_only
            ;;
        5)
            echo -e "${GREEN}退出部署脚本${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}无效选项，请重新选择${NC}"
            show_menu
            ;;
    esac
}

# Vercel 部署
deploy_vercel() {
    echo -e "${YELLOW}开始 Vercel 部署...${NC}"
    
    if ! check_command "vercel"; then
        echo -e "${YELLOW}正在安装 Vercel CLI...${NC}"
        npm install -g vercel
    fi
    
    echo -e "${GREEN}运行 Vercel 部署...${NC}"
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Vercel 部署成功！${NC}"
    else
        echo -e "${RED}✗ Vercel 部署失败${NC}"
    fi
}

# Netlify 部署
deploy_netlify() {
    echo -e "${YELLOW}开始 Netlify 部署...${NC}"
    
    if ! check_command "netlify"; then
        echo -e "${YELLOW}正在安装 Netlify CLI...${NC}"
        npm install -g netlify-cli
    fi
    
    # 先构建
    echo -e "${YELLOW}正在构建项目...${NC}"
    pnpm install && pnpm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 构建成功${NC}"
        echo -e "${GREEN}运行 Netlify 部署...${NC}"
        netlify deploy --prod --dir=dist
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Netlify 部署成功！${NC}"
        else
            echo -e "${RED}✗ Netlify 部署失败${NC}"
        fi
    else
        echo -e "${RED}✗ 构建失败${NC}"
    fi
}

# Docker 部署
deploy_docker() {
    echo -e "${YELLOW}开始 Docker 部署...${NC}"
    
    if ! check_command "docker"; then
        echo -e "${RED}错误: 请先安装 Docker${NC}"
        return 1
    fi
    
    # 停止并删除旧容器
    echo -e "${YELLOW}清理旧容器...${NC}"
    docker-compose down 2>/dev/null
    
    # 构建并启动
    echo -e "${YELLOW}构建 Docker 镜像...${NC}"
    docker-compose build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Docker 镜像构建成功${NC}"
        echo -e "${YELLOW}启动容器...${NC}"
        docker-compose up -d
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Docker 容器启动成功！${NC}"
            echo -e "${GREEN}访问地址: http://localhost:3000${NC}"
        else
            echo -e "${RED}✗ Docker 容器启动失败${NC}"
        fi
    else
        echo -e "${RED}✗ Docker 镜像构建失败${NC}"
    fi
}

# 仅构建
build_only() {
    echo -e "${YELLOW}开始构建项目...${NC}"
    
    # 安装依赖
    echo -e "${YELLOW}安装依赖...${NC}"
    pnpm install
    
    # 构建
    echo -e "${YELLOW}执行构建...${NC}"
    pnpm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 构建成功！${NC}"
        echo -e "${GREEN}构建产物位于 dist/ 目录${NC}"
        echo ""
        echo -e "${YELLOW}你可以使用以下方式预览：${NC}"
        echo "  pnpm run preview"
        echo ""
        echo -e "${YELLOW}或者使用任何静态服务器部署 dist/ 目录${NC}"
    else
        echo -e "${RED}✗ 构建失败${NC}"
    fi
}

# 主程序
main() {
    # 检查是否在项目根目录
    if [ ! -f "package.json" ]; then
        echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
        exit 1
    fi
    
    # 显示菜单
    show_menu
}

# 运行主程序
main
