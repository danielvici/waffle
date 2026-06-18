<template>
  <ServiceBase v-bind="props">
    <template #icon>
      <ServiceBaseIcon
        :name="iconName"
        v-bind="iconProps"
      />
    </template>
    <template #title>
      {{ formattedDate }}
    </template>
    <template #description>
      {{ props.description || timezoneName }}
    </template>
  </ServiceBase>
</template>

<script setup lang="ts">
import type { DateAndTimeService, ServiceClient } from '~/types'

const props = defineProps<ServiceClient<DateAndTimeService>>()
const { locale } = useI18n()

const { data } = useServiceData(props)

const currentTime = ref(new Date())
let timer: any = null

const updateInterval = computed(() => props.options?.interval || 1000)
const timezone = computed(
  () =>
    props.options?.timezone
    || data.value?.data?.timezone
    || Intl.DateTimeFormat().resolvedOptions().timeZone,
)
const format = computed(
  () => props.options?.format || 'HH:mm:ss, dddd, DD.MM.YYYY',
)

const timezoneName = computed(() => {
  try {
    const date = currentTime.value
    const tz = timezone.value
    const parts = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      timeZoneName: 'long',
    }).formatToParts(date)
    const longName = parts.find((p) => p.type === 'timeZoneName')?.value
    const shortName = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value

    if (longName && shortName && longName !== shortName) {
      return `${longName} (${shortName})`
    }
    return longName || shortName || tz
  } catch {
    return timezone.value
  }
})

function formatDateTime(date: Date, formatStr: string, tz: string) {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }

    const formatter = new Intl.DateTimeFormat('en-US', options)
    const parts = formatter.formatToParts(date)
    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || ''

    const YYYY = getPart('year')
    const YY = YYYY.slice(-2)
    const MM = getPart('month')
    const M = Number.parseInt(MM).toString()
    const DD = getPart('day')
    const D = Number.parseInt(DD).toString()
    const HH = getPart('hour')
    const H = Number.parseInt(HH).toString()
    const mm = getPart('minute')
    const m = Number.parseInt(mm).toString()
    const ss = getPart('second')
    const s = Number.parseInt(ss).toString()

    const dddd = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      weekday: 'long',
    }).format(date)
    const ddd = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      weekday: 'short',
    }).format(date)
    const MMMM = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      month: 'long',
    }).format(date)
    const MMM = new Intl.DateTimeFormat(locale.value, {
      timeZone: tz,
      month: 'short',
    }).format(date)

    const tokens: Record<string, string> = {
      YYYY,
      YY,
      MMMM,
      MMM,
      MM,
      M,
      DD,
      D,
      HH,
      H,
      mm,
      m,
      ss,
      s,
      dddd,
      ddd,
    }

    return formatStr.replace(
      /YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|mm|m|ss|s|dddd|ddd/g,
      (match) => tokens[match],
    )
  } catch {
    return date.toLocaleString()
  }
}

const formattedDate = computed(() => {
  return formatDateTime(currentTime.value, format.value, timezone.value)
})

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, updateInterval.value)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(updateInterval, () => {
  startTimer()
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})

const iconName = computed(() => {
  if (props.icon?.name) {
    return props.icon.name
  }
  if (props.icon?.url) {
    return undefined
  }
  return 'solar:calendar-linear'
})

const iconProps = computed(() => {
  if (!props.icon) {
    return {}
  }
  const { name: _, ...p } = props.icon
  return p
})
</script>
