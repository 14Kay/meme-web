import { notFound } from 'next/navigation'
import MasonryGridClient from '@/components/MasonryGridClient'
import { getHashFolders, getHashMeta, getImagesInFolder } from '@/lib/images'

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
	if (images.length === 0)
		notFound()

	const meta = getHashMeta(hash)
	const name = meta?.name ?? hash

	return (
		<div className="min-h-screen bg-white dark:bg-neutral-950">
			<main className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="py-14 pb-10 sm:py-24 sm:pb-16">
					<h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-[2.5rem]">
						{name}
						{' '}
						<span style={{ color: '#6430d6' }}>梗图</span>
					</h1>
				</div>
				<MasonryGridClient images={images} name={name} />
				<div className="h-12" />
			</main>
		</div>
	)
}
