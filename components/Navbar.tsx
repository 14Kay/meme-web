import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ title }: { title?: string }) {
	return (
		<header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-neutral-950/80">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="flex items-center gap-2.5 group">
					<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
						<span className="text-sm font-bold leading-none">M</span>
					</div>
					{title ? (
						<span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
							{title}
						</span>
					) : (
						<span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Meme</span>
					)}
				</Link>
				<ThemeToggle />
			</div>
		</header>
	)
}
