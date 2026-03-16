import { notFound } from 'next/navigation'
import { getHashFolders, getImagesInFolder, getHashMeta } from '@/lib/images'
import MasonryGrid from '@/components/MasonryGrid'

export async function generateStaticParams() {
	return getHashFolders().map(hash => ({ hash }))
}

export default async function HashPage({
	params,
}: {
	params: Promise<{ hash: string }>
}) {
	const { hash } = await params
	const images = getImagesInFolder(hash)
	if (images.length === 0) notFound()

	const meta = getHashMeta(hash)
	const name = meta?.name ?? hash
	const description = meta
		? `${meta.description}，目前已有 ${images.length} 张。`
		: `目前已有 ${images.length} 张。`

	return (
		<div className="min-h-screen bg-white dark:bg-neutral-950">
			<main className="mx-auto max-w-7xl px-4 sm:px-6">
				<div className="py-10 sm:py-14">
					<h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
						{name} <span className="text-neutral-400 dark:text-neutral-500">梗</span>
					</h1>
					<p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
						{description}
					</p>
				</div>
				<MasonryGrid images={images} />
				<div className="h-12" />
			</main>
		</div>
	)
}
