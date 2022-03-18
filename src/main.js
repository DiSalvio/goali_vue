import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'

const goaliApp = createApp(App)

goaliApp
  .use(router)
  .mount('#app')
