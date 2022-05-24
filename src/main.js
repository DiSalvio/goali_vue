import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk, faUserPen, faTrash, faRectangleXmark, faBackwardStep, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import store from "@/store/index.js"

library.add(faFloppyDisk, faUserPen, faTrash, faRectangleXmark, faBackwardStep, faDoorOpen)

const goaliApp = createApp(App)
const requireComponent = require.context("@/components", true, /App[A-Z]\w+\.vue$/)

goaliApp.use(router)

requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  goaliApp.component(baseComponentName, baseComponentConfig)
})
goaliApp.component("font-awesome-icon", FontAwesomeIcon)

goaliApp.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

goaliApp.use(store)
goaliApp.mount('#app')
