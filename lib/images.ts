import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export interface MemeImage {
	filename: string
	src: string
	title: string
}

export interface HashMeta {
	name: string
	createdAt: string
	updatedAt: string
}

const memesDir = path.join(process.cwd(), 'public', 'memes')

export function getHashFolders(): string[] {
	if (!fs.existsSync(memesDir))
		return []
	return fs
		.readdirSync(memesDir, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name)
}

export function getImagesInFolder(hash: string): MemeImage[] {
	const folderPath = path.join(memesDir, hash)
	if (!fs.existsSync(folderPath))
		return []

	const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'])
	return fs
		.readdirSync(folderPath)
		.filter(f => exts.has(path.extname(f).toLowerCase()))
		.map(filename => ({
			filename,
			src: `/memes/${hash}/${filename}`,
			title: path.basename(filename, path.extname(filename)),
		}))
}

export function getHashMeta(hash: string): HashMeta | null {
	const metaPath = path.join(memesDir, 'meta.json')
	if (!fs.existsSync(metaPath))
		return null
	try {
		const data = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
		return data[hash] ?? null
	} catch {
		return null
	}
}
