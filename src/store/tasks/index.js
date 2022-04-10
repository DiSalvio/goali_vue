import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray,
  urlHelper,
  authHeader
} from '@/helpers/index.js'
import axios from 'axios'

const taskModule = {
  state () {
    return {
      tasks: []
    }
  },
  getters: {
    task (state) {
      return (taskId) => findById(state.tasks, taskId)
    },
    goalTasks (state) {
      return state.tasks
    },
    activeGoalTasks () {
      return (goalTasks) => activeOnly(goalTasks)
    },
    activeCompletedGoalTasks () {
      return (activeGoalTasks) => completedOnly(activeGoalTasks)
    },
    activeInProgressGoalTasks () {
      return (activeGoalTasks) => inProgressOnly(activeGoalTasks)
    }
  },
  actions: {
    async fetchGoalTasks ({ commit }, { goalId, token }) {
      return await axios.get(urlHelper({ resource: 'tasks', ids: [ goalId ] }),
        authHeader(token)
    )
      .then((response) => {
        commit('setTasks', response.data)
      })
      .catch((e) => {
        console.log(e)
      })
    },
    async createTask ({ commit }, { newTask, token }) {
      return await axios.post(urlHelper({ resource: 'tasks', ids:  [ newTask.goal ]  }), {
        ...newTask,
        completed: false,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
        removed: false
      }, 
        authHeader(token)
      )
        .then((response) => {
          commit('pushTask',  response.data)
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async saveEditedTask ({ commit }, { editedTask, token }) {
      return await axios.put(urlHelper({ ids: [editedTask.goal, editedTask.id] }), {
        ...editedTask,
        updated: new Date(Date.now()).toISOString()
      },
        authHeader(token)
      )
        .then((response) => {
          commit('updateTask', { item: response.data })
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    }
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    pushTask (state, newTask) {
      state.tasks.push(newTask)
    },
    updateTask: updateItemInArray({ resource: 'tasks' })
  }
}

export default taskModule
