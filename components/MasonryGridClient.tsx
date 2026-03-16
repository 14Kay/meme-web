'use client'

import type { MemeImage } from '@/lib/images'
import { Moon, Shuffle, Sun } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MasonryGrid = dynamic(() => import('./MasonryGrid'), { ssr: false })

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

export default function MasonryGridClient({ images, name }: { images: MemeImage[], name: string }) {
	const [list, setList] = useState(images)
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const update = () => setIsDark(document.documentElement.classList.contains('dark'))
		update()
		const obs = new MutationObserver(update)
		obs.observe(document.documentElement, { attributeFilter: ['class'] })
		return () => obs.disconnect()
	}, [])

	const handleShuffle = () => {
		const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
		const next = shuffle(list)
		if (doc.startViewTransition) {
			doc.startViewTransition(() => setList(next))
		} else {
			setList(next)
		}
	}

	const toggleTheme = () => {
		const next = !isDark
		setIsDark(next)
		document.documentElement.classList.toggle('dark', next)
		localStorage.setItem('theme', next ? 'dark' : 'light')
	}

	return (
		<>
			{/* 工具栏 */}
			<div className="mb-8 flex items-center gap-2">
				<p className="flex-1 text-lg font-semibold text-neutral-700 dark:text-neutral-200">
					{`${name} 群大佬们的日常，目前已有 `}
					<span style={{ color: '#6430d6' }}>{images.length}</span>
					{` 张。`}
				</p>
				<button
					onClick={handleShuffle}
					className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
				>
					<Shuffle size={14} />
					随机
				</button>
				<button
					onClick={toggleTheme}
					className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
					aria-label="切换主题"
				>
					{isDark ? <Sun size={16} /> : <Moon size={16} />}
				</button>
			</div>
			<MasonryGrid images={list} isDark={isDark} />
		</>
	)
}
