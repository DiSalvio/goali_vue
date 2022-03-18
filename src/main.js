import { createApp } from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [ 
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const goaliApp = createApp(App)

goaliApp
  .use(router)
  .mount('#app')
