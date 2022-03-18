import Home from '@/views/Home.vue'
import PageGoalShow from '@/views/PageGoalShow.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

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
    props: true,
    beforeEnter (to, from, next){
      const goalExists = sourceData.goals.find(goal => goal.id === parseInt(to.params.id))
      if (goalExists) {
        next()
      } else {
        next({
          name: 'PageNotFound',
          params: { resource: 'goal', pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
    props: true
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
