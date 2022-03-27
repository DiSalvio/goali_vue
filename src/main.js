import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'

const goaliApp = createApp(App)
const requireComponent = require.context("@/components", true, /App[A-Z]\w+\.vue$/)

goaliApp.use(router)

requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  goaliApp.component(baseComponentName, baseComponentConfig)
})

goaliApp.mount('#app')
