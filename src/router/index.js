import Home from '@/views/Home.vue'
import PageGoalShow from '@/views/PageGoalShow.vue'
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

export default createRouter({
  history: createWebHistory(),
  routes
})
