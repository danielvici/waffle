<template>
  <div class="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-fg/5">
    <img
      v-if="iconUrl"
      :src="iconUrl"
      alt=""
      class="w-5 h-5"
    >
    <Icon
      v-else
      :name="iconName"
      class="w-5 h-5"
      :style="iconColor ? { color: iconColor } : undefined"
    />
  </div>
  <div class="min-w-0 flex-1">
    <div class="text-sm text-fg truncate">
      {{ title }}
    </div>
    <div v-if="description || groupTitle" class="text-xs text-fg/50 truncate">
      <span v-if="groupTitle">{{ groupTitle }}</span>
      <span v-if="groupTitle && description"> · </span>
      <span v-if="description">{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types'

const props = defineProps<{
  item: Service
  groupTitle?: string
  fallbackTitle: string
  fallbackIcon: string
}>()

const { locale } = useI18n()

const isWidget = computed(() =>
  props.item.type === 'ip-api'
  || props.item.type === 'openweathermap'
  || props.item.type === 'date-and-time',
)

const shouldFetch = computed(() => isWidget.value)

const service = shouldFetch.value
  ? useServiceData(props.item, { immediate: true })
  : { data: ref(null) }

const data = service.data as Ref<any>

const iconUrl = computed(() => props.item.icon?.url)
const iconColor = computed(() => props.item.icon?.color)

const iconName = computed(() => {
  if (props.item.icon?.name) {
    return props.item.icon.name
  }
  const country = data.value?.data?.country
  if (props.item.type === 'ip-api' && country) {
    return `flag:${country}-1x1`
  }
  const owmIcon = data.value?.data?.iconId
  if (props.item.type === 'openweathermap' && owmIcon) {
    return `wi:owm-${owmIcon}`
  }
  return props.fallbackIcon
})

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.item.type === 'date-and-time') {
    timer = setInterval(() => {
      now.value = new Date()
    }, 1000)
  }
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const dateTimeParts = computed(() => {
  if (props.item.type !== 'date-and-time') {
    return null
  }
  const tz = (props.item.options as any)?.timezone
    || data.value?.data?.timezone
    || Intl.DateTimeFormat().resolvedOptions().timeZone
  try {
    const time = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now.value)
    const date = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now.value)
    return { time, date, tz }
  } catch {
    return { time: now.value.toLocaleTimeString(), date: '', tz }
  }
})

const weatherUnit = computed(() => {
  if ((props.item.options as any)?.units === 'imperial') {
    return '°F'
  }
  return '°C'
})

const title = computed(() => {
  if (props.item.type === 'ip-api') {
    return data.value?.data?.ip || props.item.title || props.fallbackTitle
  }
  if (props.item.type === 'openweathermap') {
    const temp = data.value?.data?.temp
    if (typeof temp === 'number') {
      return `${temp.toFixed(1)} ${weatherUnit.value}`
    }
    return props.item.title || props.fallbackTitle
  }
  if (props.item.type === 'date-and-time') {
    return dateTimeParts.value?.time || props.item.title || props.fallbackTitle
  }
  return props.item.title || props.fallbackTitle
})

const description = computed(() => {
  if (props.item.description) {
    return props.item.description
  }
  if (props.item.type === 'ip-api') {
    return data.value?.data?.place
  }
  if (props.item.type === 'openweathermap') {
    const d = data.value?.data
    if (d?.place && d?.description) {
      return `${d.place}, ${d.description}`
    }
    return d?.place || d?.description
  }
  if (props.item.type === 'date-and-time') {
    return dateTimeParts.value?.date
  }
  return undefined
})
</script>
