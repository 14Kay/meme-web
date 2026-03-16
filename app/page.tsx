export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
			<div className="text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 dark:bg-white">
					<span className="text-2xl font-black text-white dark:text-neutral-900">M</span>
				</div>
				<h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
					Meme Gallery
				</h1>
				<p className="mt-3 text-sm text-neutral-400">
					通过专属链接访问你的图集
				</p>
			</div>
		</div>
	)
}
