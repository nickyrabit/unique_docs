import {defineUserConfig, viteBundler} from 'vuepress'
import {defaultTheme} from '@vuepress/theme-default'
import * as path from 'path'
import {navbar} from "./configs/navbar";
import {sidebar} from "./configs/sidebar";
import {searchPlugin} from "@vuepress/plugin-search"
import {clipboardPlugin} from 'vuepress-plugin-clipboard'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import { codeSwitcherPlugin } from '../vuepress-plugin-code-switcher-main/src/node/codeSwitcherPlugin'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Unique docs',
  description: 'Unique network documentation portal',
  head: [['link', {rel: 'icon', href: '/favicon.svg'}]],

  port: 3000,

  dest: `./dist`,
  public: './public',

  alias: {
    '_utils': path.resolve(__dirname, './utils'),
    '_components': path.resolve(__dirname, './components'),
  },

  // theme and its config
  theme: defaultTheme({
    logo: '/images/logo/unique.svg',
    contributors: false,
    locales: {
      '/': {
        navbar: navbar.en,
        sidebar: sidebar.en,
      }
    },
  }),
  // extendsMarkdown: (md: any) => {md.set({breaks: true})},
  plugins: [
    registerComponentsPlugin({componentsDir: path.resolve(__dirname, './components')}),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        }
      },
    }),
    clipboardPlugin({
      staticIcon: true
    }),
    codeSwitcherPlugin(
      {
        groups: {
          packageManager: {
            yarn: 'YARN',
            npm: 'NPM',
          },
          keyring: {
            keyring: 'Keyring',
            keyringLocal: 'Keyring Local',
            polkadotExtension: 'Polkadot Extension',
            metamaskExtension: 'Metamask Extension'
          }
        },
        fullNames: {
          sdk: 'SDK',
          rest: 'REST',
          substrateClient: 'Substrate Client',
          yarn: 'YARN',
          npm: 'NPM',
          keyring: 'Keyring',
          keyringLocal: 'Keyring Local',
          polkadotExtension: 'Polkadot Extension',
          metamaskExtension: 'Metamask Extension',
          js: 'JavaScript',
          ts: 'TypeScript',
        }
      }
    )
  ],


  bundler: viteBundler({
    viteOptions: {
      build: {
        sourcemap: true,
        target: 'es2020',
      },
      ssr: {
        noExternal: ['vue-toastification']
      }
    }
  })
})
