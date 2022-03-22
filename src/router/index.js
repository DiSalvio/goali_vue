import PageHome from '@/views/PageHome.vue'
import PageGoalShow from '@/views/PageGoalShow.vue'
import PageTaskShow from '@/views/PageTaskShow.vue'
import PageSubTaskShow from '@/views/PageSubTaskShow.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [ 
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/goal/:goalId',
    name: 'PageGoalShow',
    component: PageGoalShow,
    props: true,
    beforeEnter (to, from, next){
      const goalExists = sourceData.goals.find(goal => goal.id === parseInt(to.params.goalId))
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
    path: '/goal/:goalId/task/:taskId',
    name: 'PageTaskShow',
    component: PageTaskShow,
    props: true,
    beforeEnter (to, from, next){
      const taskExists = sourceData.tasks
        .filter(task => task.goal === parseInt(to.params.goalId))
        .find(task => task.id === parseInt(to.params.taskId))
      if (taskExists) {
        next()
      } else {
        next({
          name: 'PageNotFound',
          params: { resource: 'task', pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/goal/:goalId/task/:taskId/subtask/:subTaskId',
    name: 'PageSubTaskShow',
    component: PageSubTaskShow,
    props: true,
    beforeEnter (to, from, next){
      const subTaskExists = sourceData.subTasks
        .filter(subTask => subTask.goal === parseInt(to.params.goalId))
        .filter(subTask => subTask.task === parseInt(to.params.taskId))
        .find(subTask => subTask.id === parseInt(to.params.subTaskId))
      if (subTaskExists) {
        next()
      } else {
        next({
          name: 'PageNotFound',
          params: { resource: 'sub-task', pathMatch: to.path.substring(1).split('/') },
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
