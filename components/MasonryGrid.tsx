'use client'

import type { MemeImage } from '@/lib/images'
import { useEffect, useRef, useState } from 'react'
import MemeCard from './MemeCard'

const PAGE_SIZE = 12

function getCols() {
	if (typeof window === 'undefined')
		return 3
	return window.innerWidth < 640 ? 2 : 3
}

export default function MasonryGrid({ images, isDark = false }: { images: MemeImage[], isDark?: boolean }) {
	const [visible, setVisible] = useState(PAGE_SIZE)
	const [cols, setCols] = useState(3)
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const update = () => setCols(getCols())
		update()
		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
	}, [])

	useEffect(() => {
		setVisible(PAGE_SIZE)
	}, [images])

	useEffect(() => {
		const el = sentinelRef.current
		if (!el)
			return
		const obs = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting)
					setVisible(v => Math.min(v + PAGE_SIZE, images.length))
			},
			{ rootMargin: '300px' },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [images.length])

	const columns: { img: MemeImage, index: number }[][] = []
	for (let i = 0; i < cols; i++) columns.push([])
	images.slice(0, visible).forEach((img, i) => {
		columns[i % cols].push({ img, index: i })
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
			<div className="flex gap-2">
				{columns.map((col, ci) => (
					<div key={ci} className="flex flex-1 flex-col gap-2">
						{col.map(({ img, index }) => (
							<MemeCard key={img.filename} image={img} index={index} isDark={isDark} />
						))}
					</div>
				))}
			</div>
			<div ref={sentinelRef} className="h-1" />
			{visible >= images.length && images.length > 0 && (
				<p className="py-12 text-center text-xs text-neutral-300 dark:text-neutral-600">· · ·</p>
			)}
		</>
	)
}
