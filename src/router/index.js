import PageSignUp from '@/views/PageSignUp.vue'
import PageLogin from '@/views/PageLogin.vue'
import PageHome from '@/views/PageHome.vue'
import PageGoalShow from '@/views/PageGoalShow.vue'
import PageTaskShow from '@/views/PageTaskShow.vue'
import PageSubTaskShow from '@/views/PageSubTaskShow.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import { findById, filterChildrenById } from '@/helpers/index.js'

const routes = [ 
  {
    path: '/login',
    name: 'PageLogin',
    component: PageLogin,
    props: true,
    meta: {
      noAuthOnly: true
    }
  },
  {
    path: '/signup',
    name: 'PageSignUp',
    component: PageSignUp,
    meta: {
      noAuthOnly: true
    }
  },
  {
    path: '/',
    name: 'PageHome',
    component: PageHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goal/:goalId',
    name: 'PageGoalShow',
    component: PageGoalShow,
    props: true,
    meta: {
      requiresAuth: true
    },
    async beforeEnter (to, from, next){
      const goalExists = await store.dispatch('fetchGoal', { 
        goalId: to.params.goalId,
        token: localStorage.getItem('token')
      })
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
    meta: {
      requiresAuth: true
    },
    beforeEnter (to, from, next){
      const taskExists = findById(
        filterChildrenById(
          store._state.data.taskModule.tasks,
          'goal',
          to.params.goalId
        ),
        to.params.taskId
      )
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
    meta: {
      requiresAuth: true
    },
    beforeEnter (to, from, next){
      const subTaskExists = findById(
        filterChildrenById(
          filterChildrenById(
            store._state.data.subTaskModule.subTasks,
            'goal',
            to.params.goalId),
          'task',
          to.params.taskId
        ),
        to.params.subTaskId
      )
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return {
      name: 'PageLogin'
    }
  } else if (to.meta.noAuthOnly && localStorage.getItem('token')) {
    return {
      name: 'PageHome'
    }
  }
})


export default router
