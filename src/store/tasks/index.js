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
    async fetchTask ({ dispatch, rootState }, { goalId, taskId }) {
      return await axios.get(urlHelper({ ids: [ goalId, taskId ] }),
        authHeader(rootState.userModule.token)
      )
      .then((response) => {
        dispatch('upsertTask', response.data)
        return true
      })
      .catch((e) => {
        console.log(e)
        return false
      })
    },
    async fetchGoalTasks ({ commit, rootState }, { goalId }) {
      return await axios.get(urlHelper({ resource: 'tasks', ids: [ goalId ] }),
        authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('setTasks', response.data)
      })
      .catch((e) => {
        console.log(e)
      })
    },
    async createTask ({ commit, rootState }, { newTask }) {
      return await axios.post(urlHelper({ resource: 'tasks', ids:  [ newTask.goal ]  }), {
        ...newTask,
        completed: false,
        removed: false
      }, 
        authHeader(rootState.userModule.token)
      )
        .then((response) => {
          commit('pushTask',  response.data)
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async saveEditedTask ({ commit, rootState }, { editedTask }) {
      return await axios.put(urlHelper({ ids: [editedTask.goal, editedTask.id] }), {
        ...editedTask,
      },
        authHeader(rootState.userModule.token)
      )
        .then((response) => {
          commit('updateTask', { item: response.data })
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    upsertTask ({ state, commit }, task) {
      if (findById(state.tasks, task)) {
        commit('updateTask', { item: task })
      } else {
        commit('pushTask', task)
      }
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
