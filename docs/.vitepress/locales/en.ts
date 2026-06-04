import { defineConfig } from 'vitepress'
import { getVersion } from '../utils'

export default defineConfig({
  description: 'Intuitive service for organizing your homepage',
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Configuration', link: '/reference/configuration' },
      { text: 'Showcase', link: '/community/showcase' },
      {
        text: getVersion(),
        items: [
          { text: 'Changelog', link: '/other/changelog' },
          { text: 'Contributing', link: '/community/contributing' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        base: '/introduction',
        items: [
          { text: 'What is Waffle?', link: '/what-is' },
          { text: 'Getting Started', link: '/getting-started' },
          // { text: 'Deployment', link: '/deployment' },
        ],
      },
      {
        text: 'Reference',
        collapsed: false,
        base: '/reference',
        items: [
          { text: 'Configuration', link: '/configuration' },
          { text: 'Icons', link: '/icons' },
          { text: 'Tags', link: '/tags' },
          { text: 'Favicons', link: '/favicons' },
        ],
      },
      {
        text: 'Services',
        collapsed: false,
        base: '/services',
        items: [
          { text: 'Base', link: '/base' },
          { text: 'IP API', link: '/ip-api' },
          { text: 'Weather', link: '/openweathermap' },
        ],
      },
      {
        text: 'Community',
        collapsed: false,
        base: '/community',
        collapsed: true,
        items: [
          { text: 'Showcase', link: '/showcase' },
          { text: 'Development', link: '/development' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
      {
        text: 'Other',
        collapsed: false,
        base: '/other',
        collapsed: true,
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'License', link: '/license' },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/danielvici/waffle/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
  },
})
