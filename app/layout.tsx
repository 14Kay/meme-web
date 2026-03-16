import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
	variable: '--font-geist',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Meme Gallery — 表情包图库',
	description: '高质量表情包图库，搜索、收藏你喜欢的 meme',
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon.ico' },
		],
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark')}catch(e){}`,
					}}
				/>
			</head>
			<body className={`${geist.variable} font-sans antialiased`}>
				{children}
			</body>
		</html>
	)
}
