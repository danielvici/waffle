<template>
  <img :src="image" alt="" class="preview">
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const props = withDefaults(
  defineProps<{ name: string, darkModeChange?: boolean }>(),
  { darkModeChange: true }
)
const { isDark } = useData()
const image = computed(() => {
  if (props.darkModeChange){
    return withBase(`/${props.name}${isDark.value ? '-dark' : ''}.png`)
  } else {
    return  withBase(`/${props.name}.png`)
  }
})
</script>

<style scoped>
.preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
}
</style>
