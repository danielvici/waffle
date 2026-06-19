<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $settings } = useNuxtApp()
const colorMode = useColorMode()
const { locale } = useI18n()

locale.value = $settings.lang

const i18nHead = useLocaleHead({})

useHead({
  title: $settings.title,
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir as 'ltr' | 'rtl' | 'auto',
  },
  bodyAttrs: {
    class: 'relative',
  },
})

onMounted(() => {
  const theme = ($settings.theme || 'system').toLowerCase()

  colorMode.unknown = false
  colorMode.preference = theme

  if (theme !== 'system') {
    const el = document.documentElement
    const themes = ['light', 'dark', 'deep', 'sepia', 'bluer']
    
    // Force immediate correct state
    themes.forEach(t => el.classList.remove(t))
    el.classList.add(theme)
    
    // Aggressively prevent nuxt-color-mode or tailwind from ruining the class
    const observer = new MutationObserver(() => {
      if (!el.classList.contains(theme)) {
        el.classList.add(theme)
      }
      themes.filter(t => t !== theme).forEach(t => {
        if (el.classList.contains(t)) {
          el.classList.remove(t)
        }
      })
    })
    
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
  }
})
</script>
