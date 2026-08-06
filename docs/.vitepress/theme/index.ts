import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PreviewImage from '../components/preview-image.vue'
import InVersion from '../components/in-version.vue'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('PreviewImage', PreviewImage)
    ctx.app.component('InVersion', InVersion)
  },
} satisfies Theme
