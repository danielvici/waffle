import type { Service } from '~/types'

export interface CommandPaletteEntry {
  id: string
  title: string
  description?: string
  link?: string
  target?: Service['target']
  group?: string
  tags: string[]
  type?: string
  raw: Service
}

const isOpen = ref(false)

export function useCommandPalette() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen: readonly(isOpen),
    open,
    close,
    toggle,
  }
}

function normalize(value: string): string {
  return value.toLowerCase().trim()
}

function score(entry: CommandPaletteEntry, query: string): number {
  const q = normalize(query)
  if (!q) {
    return 0
  }

  const title = normalize(entry.title)
  const description = normalize(entry.description ?? '')
  const group = normalize(entry.group ?? '')
  const tags = entry.tags.map(normalize)

  if (title === q) {
    return 1000
  }
  if (title.startsWith(q)) {
    return 500
  }
  if (tags.includes(q)) {
    return 400
  }
  if (title.includes(q)) {
    return 300
  }
  if (tags.some((tag) => tag.includes(q))) {
    return 200
  }
  if (group.includes(q)) {
    return 150
  }
  if (description.includes(q)) {
    return 100
  }
  return 0
}

export function filterEntries(
  entries: CommandPaletteEntry[],
  query: string,
  limit = 20,
): CommandPaletteEntry[] {
  if (!query.trim()) {
    return entries.slice(0, limit)
  }

  return entries
    .map((entry) => ({ entry, score: score(entry, query) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.entry)
}
