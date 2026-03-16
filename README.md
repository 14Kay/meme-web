# Meme Gallery

一个简洁高大上的梗图展示网站，支持按群聊分组、瀑布流浏览、点击放大，部署在 Vercel。

## 特性

- 简洁高大上的 UI，支持深色 / 浅色模式
- 瀑布流图片展示，流畅的加载与交互动画
- 按群聊分组，每个群聊独享专属链接
- 基于文件系统，无需数据库，维护成本极低
- SSG 静态生成，部署到 Vercel 零配置、极速访问

## 目录结构

```
public/memes/
  meta.json          # 各分组的名称、时间等元数据
  <hash>/            # 每个群聊对应一个文件夹
    image1.jpg
    image2.png
    ...
```

## meta.json 格式

```json
{
  "<hash>": {
    "name": "群名",
    "createdAt": "2024-01-01",
    "updatedAt": "2024-03-16"
  }
}
```

## 使用方式

1. 将图片放入 `public/memes/<hash>/` 文件夹
2. 在 `public/memes/meta.json` 中添加对应配置
3. 推送到 GitHub，Vercel 自动构建部署
4. 将链接 `https://your-domain.com/<hash>` 发送给对应群聊

支持的图片格式：`jpg`、`jpeg`、`png`、`gif`、`webp`、`avif`

## 本地开发

```bash
pnpm install
pnpm dev
```

## 部署

将项目推送到 GitHub 后，在 [Vercel](https://vercel.com) 导入仓库即可，无需任何额外配置。

每次新增图片文件夹后，重新触发构建即可更新。

## 技术栈

- [Next.js 16](https://nextjs.org) — App Router + SSG
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)
- [react-medium-image-zoom](https://github.com/rpearce/react-medium-image-zoom)

## 致谢

UI 设计参考了 [NoneMeme](https://github.com/NoneMeme/NoneMeme)，感谢他们的开源项目带来的灵感。
