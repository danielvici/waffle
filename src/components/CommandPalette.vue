<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('commandPalette.title')"
          @keydown.esc="close"
        >
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
            @click="close"
          />
          <div
            class="relative w-full max-w-xl rounded-2xl bg-background/70 backdrop-blur-2xl backdrop-saturate-150 shadow-2xl border border-fg/15 overflow-hidden"
          >
            <div class="flex items-center gap-3 px-4 py-3 border-b border-fg/10">
              <Icon name="mdi:magnify" class="w-5 h-5 text-fg/60" />
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                autocomplete="off"
                spellcheck="false"
                class="flex-1 bg-transparent outline-none text-fg placeholder:text-fg/40"
                :placeholder="$t('commandPalette.placeholder')"
                :aria-label="$t('commandPalette.placeholder')"
                @keydown.down.prevent="move(1)"
                @keydown.up.prevent="move(-1)"
                @keydown.enter.prevent="activate()"
                @keydown.esc.prevent="close"
              >
              <kbd class="hidden sm:inline text-xs text-fg/50 border border-fg/20 rounded px-1.5 py-0.5">
                Esc
              </kbd>
            </div>

            <ul
              v-if="results.length"
              ref="listRef"
              class="command-palette-scroll max-h-[60vh] overflow-y-auto py-1"
              role="listbox"
            >
              <li
                v-for="(entry, index) in results"
                :id="`command-palette-item-${index}`"
                :key="entry.id"
                role="option"
                :aria-selected="index === activeIndex"
                class="flex items-center gap-3 px-4 py-2 cursor-pointer"
                :class="index === activeIndex ? 'bg-fg/10' : 'hover:bg-fg/5'"
                @mouseenter="activeIndex = index"
                @click="activate(entry)"
              >
                <CommandPaletteItem
                  :item="entry.raw"
                  :group-title="entry.group"
                  :fallback-title="entry.title"
                  :fallback-icon="fallbackIconFor(entry.type)"
                />
                <Icon
                  v-if="index === activeIndex && entry.link"
                  name="mdi:keyboard-return"
                  class="w-4 h-4 text-fg/40 flex-shrink-0"
                />
              </li>
            </ul>
            <div v-else class="px-4 py-6 text-center text-sm text-fg/50">
              {{ $t('commandPalette.empty') }}
            </div>

            <div
              v-if="query.trim()"
              class="flex items-center gap-2 px-4 py-2 border-t border-fg/10 flex-wrap"
            >
              <span class="text-xs text-fg/50">
                {{ $t('commandPalette.searchWeb') }}
              </span>
              <a
                v-for="provider in webSearchProviders"
                :key="provider.id"
                :href="provider.url(query)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-fg/15 hover:bg-fg/5 text-xs text-fg"
                @click="close"
              >
                <Icon :name="provider.icon" class="w-3.5 h-3.5" />
                {{ provider.label }}
              </a>
            </div>

            <div class="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-fg/10 text-xs text-fg/50">
              <span class="flex items-center gap-1">
                <kbd class="border border-fg/20 rounded px-1">↑</kbd>
                <kbd class="border border-fg/20 rounded px-1">↓</kbd>
                {{ $t('commandPalette.hints.navigate') }}
              </span>
              <span class="flex items-center gap-1">
                <kbd class="border border-fg/20 rounded px-1">↵</kbd>
                {{ $t('commandPalette.hints.open') }}
              </span>
              <span class="flex items-center gap-1">
                <kbd class="border border-fg/20 rounded px-1">Esc</kbd>
                {{ $t('commandPalette.hints.close') }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { CommandPaletteEntry } from '~/composables/useCommandPalette'
import type { CompleteConfig, ServicesGroup } from '~/types'

const TYPE_ICONS: Record<string, string> = {
  'date-and-time': 'solar:calendar-linear',
  'ip-api': 'mdi:ip-network-outline',
  'openweathermap': 'mdi:weather-partly-cloudy',
}

const TYPE_TITLES: Record<string, string> = {
  'date-and-time': 'Date and Time',
  'ip-api': 'IP Address',
  'openweathermap': 'Weather',
}

const DEFAULT_ICON = 'mdi:application-outline'

const webSearchProviders = [
  {
    id: 'google',
    label: 'Google',
    icon: 'mdi:google',
    url: (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: 'brave',
    label: 'Brave Search',
    icon: 'simple-icons:brave',
    url: (q: string) => `https://search.brave.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: 'duckduckgo',
    label: 'DuckDuckGo',
    icon: 'simple-icons:duckduckgo',
    url: (q: string) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  },
] as const

const { isOpen, open, close } = useCommandPalette()
const { $services, $settings } = useNuxtApp() as unknown as {
  $services: ServicesGroup[]
  $settings: CompleteConfig
}

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLUListElement | null>(null)

function fallbackIconFor(type?: string): string {
  return (type && TYPE_ICONS[type]) || DEFAULT_ICON
}

const entries = computed<CommandPaletteEntry[]>(() => {
  const list: CommandPaletteEntry[] = []
  for (const group of $services) {
    for (const item of group.items) {
      const type = item.type
      const title = item.title || (type ? TYPE_TITLES[type] : undefined) || type || ''
      if (!title) {
        continue
      }
      list.push({
        id: item.id,
        title,
        description: item.description,
        link: item.link,
        target: item.target,
        group: group.title,
        tags: (item.tags ?? []).map((tag) => (typeof tag === 'string' ? tag : tag.name)),
        type,
        raw: item,
      })
    }
  }
  return list
})

const results = computed(() => filterEntries(entries.value, query.value))

watch(query, () => {
  activeIndex.value = 0
})

watch(isOpen, async (value: boolean) => {
  if (value) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

function move(delta: number) {
  if (!results.value.length) {
    return
  }
  const next = (activeIndex.value + delta + results.value.length) % results.value.length
  activeIndex.value = next
  nextTick(() => {
    const el = listRef.value?.querySelector<HTMLElement>(`#command-palette-item-${next}`)
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function activate(entry?: CommandPaletteEntry) {
  const target = entry ?? results.value[activeIndex.value]
  if (!target?.link) {
    return
  }
  const linkTarget = target.target ?? $settings.behaviour?.target ?? '_blank'
  if (linkTarget === '_self') {
    window.location.href = target.link
  } else {
    window.open(target.link, linkTarget)
  }
  close()
}

if (import.meta.client) {
  onKeyStroke(
    (event) => (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k',
    (event) => {
      event.preventDefault()
      if (isOpen.value) {
        close()
      } else {
        open()
      }
    },
  )
}
</script>

<style scoped>
.command-palette-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--fg) / 0.25) transparent;
}

.command-palette-scroll::-webkit-scrollbar {
  width: 8px;
}

.command-palette-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.command-palette-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(var(--fg) / 0.2);
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.command-palette-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--fg) / 0.35);
  background-clip: padding-box;
}
</style>
