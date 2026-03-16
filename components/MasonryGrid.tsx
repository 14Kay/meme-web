'use client'

import { Shuffle, Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MemeImage } from '@/lib/images'
import MemeCard from './MemeCard'

const PAGE_SIZE = 12
const COLS = 3

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

function ThemeToggle() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains('dark'))
	}, [])

	const toggle = () => {
		const next = !isDark
		setIsDark(next)
		document.documentElement.classList.toggle('dark', next)
		localStorage.setItem('theme', next ? 'dark' : 'light')
	}

	return (
		<button
			onClick={toggle}
			className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
			aria-label="切换主题"
		>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	)
}

export default function MasonryGrid({ images }: { images: MemeImage[] }) {
	const [list, setList] = useState(() => shuffle(images))
	const [visible, setVisible] = useState(PAGE_SIZE)
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = sentinelRef.current
		if (!el) return
		const obs = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting)
					setVisible(v => Math.min(v + PAGE_SIZE, list.length))
			},
			{ rootMargin: '300px' },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [list.length])

	const handleShuffle = () => {
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setList(shuffle(images))
				setVisible(PAGE_SIZE)
			})
		} else {
			setList(shuffle(images))
			setVisible(PAGE_SIZE)
		}
	}

	const columns: MemeImage[][] = Array.from({ length: COLS }, () => [])
	list.slice(0, visible).forEach((img, i) => {
		columns[i % COLS].push(img)
	})

	if (images.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-40">
				<p className="text-sm text-neutral-400">暂无图片</p>
			</div>
		)
	}

	return (
		<>
			{/* 工具栏 */}
			<div className="mb-4 flex items-center justify-between">
				<p className="text-xs text-neutral-400">{list.length} 张</p>
				<div className="flex items-center gap-1">
					<button
						onClick={handleShuffle}
						className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
					>
						<Shuffle size={13} />
						随机排序
					</button>
					<ThemeToggle />
				</div>
			</div>

			{/* 瀑布流 */}
			<div className="flex gap-3 sm:gap-4">
				{columns.map((col, ci) => (
					<div key={ci} className="flex flex-1 flex-col gap-3 sm:gap-4">
						{col.map(img => (
							<MemeCard key={img.filename} image={img} />
						))}
					</div>
				))}
			</div>
			<div ref={sentinelRef} className="h-1" />
			{visible >= list.length && list.length > 0 && (
				<p className="py-12 text-center text-xs text-neutral-300 dark:text-neutral-600">· · ·</p>
			)}
		</>
	)
}
