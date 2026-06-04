import { defineConfig } from 'vitepress'
import en from './locales/en'

export default defineConfig({
  base: '/waffle/',
  title: 'Waffle',
  head: [
    ['link', { rel: 'icon', href: '/waffle_logo_round.ico' }],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },

    logo: {
      src: '/waffle_logo_round.svg',
      innerWidth: 50,
      height: 50,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/danielvici/waffle' },
    ],

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  ignoreDeadLinks: [
    (url) => {
      return !url.toLowerCase().includes('_parts')
    },
  ],

  locales: {
    root: { label: 'English', ...en },
  },
})
