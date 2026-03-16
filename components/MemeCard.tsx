'use client'

import Image from 'next/image'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { MemeImage } from '@/lib/images'

export default function MemeCard({ image }: { image: MemeImage }) {
	const [ratio, setRatio] = useState(1)

	return (
	<div
		className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900"
		style={{ viewTransitionName: `meme-${image.filename.replace(/[^a-zA-Z0-9]/g, '-')}` }}
	>
			<Zoom>
				<div
					className="relative w-full cursor-zoom-in"
					style={{ paddingBottom: `${ratio * 100}%` }}
				>
					<Image
						src={image.src}
						alt={image.title}
						fill
						sizes="(max-width: 640px) 50vw, 33vw"
						loading="lazy"
						className="object-cover"
						onLoad={e => {
							const img = e.currentTarget
							if (img.naturalWidth > 0)
								setRatio(img.naturalHeight / img.naturalWidth)
						}}
					/>
				</div>
			</Zoom>
			<div className="px-2.5 py-2">
				<p className="truncate text-xs text-neutral-400 dark:text-neutral-500">{image.title}</p>
			</div>
		</div>
	)
}
