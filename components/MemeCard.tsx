'use client'

import type { MemeImage } from '@/lib/images'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Zoom from 'react-medium-image-zoom'

interface MemeCardProps {
	image: MemeImage
	index?: number
	isDark?: boolean
}
const FILENAME_REGEX = /[^a-z0-9]/gi

export default function MemeCard({ image, index = 0, isDark = false }: MemeCardProps) {
	const [ratio, setRatio] = useState(1)
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el)
			return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					obs.disconnect()
				}
			},
			{ threshold: 0.05 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	const delay = Math.min(index * 60, 400)

	return (
		<div
			ref={ref}
			className="overflow-hidden rounded-md"
			style={{
				viewTransitionName: `meme-${image.filename.replace(FILENAME_REGEX, '-')}`,
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : 'translateY(16px)',
				transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
				boxShadow: isDark
					? '0 0.125rem 1rem rgba(255,255,255,0.06), 0 0.125rem 2rem rgba(255,255,255,0.08)'
					: '0 0.125rem 1rem rgba(27,40,50,0.04), 0 0.125rem 2rem rgba(27,40,50,0.08), 0 0 0 0.0625rem rgba(27,40,50,0.024)',
			}}
		>
			<div className="px-5 pt-[50px]">
				<Zoom>
					<div
						className="relative w-full"
						style={{ paddingBottom: `${ratio * 100}%` }}
					>
						<Image
							src={image.src}
							alt={image.title}
							fill
							sizes="(max-width: 640px) 50vw, 33vw"
							loading="lazy"
							className="object-cover"
							onLoad={(e) => {
								const img = e.currentTarget
								if (img.naturalWidth > 0)
									setRatio(img.naturalHeight / img.naturalWidth)
							}}
						/>
					</div>
				</Zoom>
			</div>
			<div className="flex h-[50px] items-center justify-center px-5">
				<p className="truncate text-center text-sm text-neutral-600 dark:text-neutral-300">
					#
					{image.title}
				</p>
			</div>
		</div>
	)
}
