import { createApp } from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import PageGoalShow from './views/PageGoalShow.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [ 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/goal/:id',
    name: 'PageGoalShow',
    component: PageGoalShow,
    props: true
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
