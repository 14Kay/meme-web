'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('theme')
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		const dark = saved === 'dark' || (!saved && prefersDark)
		setIsDark(dark)
		document.documentElement.classList.toggle('dark', dark)
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
			className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
			aria-label="切换主题"
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}
