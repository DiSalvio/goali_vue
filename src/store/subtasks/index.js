import { 
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray,
  urlHelper,
  authHeader
} from '@/helpers/index.js'
import axios from 'axios'

const subTaskModule = {
  state () {
    return {
      subTasks: []
    }
  },
  getters: {
    subTask (state) {
      return (subTaskId) => findById(state.subTasks, subTaskId)
    },
    taskSubTasks (state) {
      return (taskId) => filterChildrenById(state.subTasks, 'task', taskId)
    },
    activeTaskSubTasks () {
      return (taskSubTasks) => activeOnly(taskSubTasks)
    },
    activeCompletedTaskSubTasks () {
      return (activeTaskSubTasks) => completedOnly(activeTaskSubTasks)
    },
    activeInProgressTaskSubTasks () {
      return (activeTaskSubTasks) => inProgressOnly(activeTaskSubTasks)
    }
  },
  actions: {
    async fetchSubTask({ dispatch }, { goalId, taskId, subTaskId, token }) {
      return await axios.get(urlHelper({ ids: [ goalId, taskId, subTaskId ] }),
        authHeader(token)
      )
        .then((response) => {
          dispatch('upsertSubTask', response.data)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async fetchTaskSubTasks({ commit }, { goalId, taskId, token }) {
      return await axios.get(urlHelper({ resource: 'subtasks', ids: [ goalId, taskId ] }),
        authHeader(token)
      )
        .then((response) => {
          commit('setSubTasks', response.data)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async createSubTask({ commit }, { newSubTask, token }) {
      return await axios.post(
        urlHelper({ resource: 'subtasks', ids: [ newSubTask.goal, newSubTask.task ]}),
        {
          ...newSubTask,
          completed: false,
          timestamp: new Date(Date.now()).toISOString(),
          updated: new Date(Date.now()).toISOString(),
          removed: false
        },
        authHeader(token)
      )
        .then((response) => {
          commit('pushSubTask', response.data)
          return true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async saveEditedSubTask({ commit }, { editedSubTask, token }) {
      return await axios.put(
        urlHelper({ ids: [ editedSubTask.goal, editedSubTask.task, editedSubTask.id ] }),
        {
          ...editedSubTask
        },
        authHeader(token)
      )
        .then((response) => {
          commit('updateSubTask', { item: response.data })
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    upsertSubTask ({ state, commit }, subTask) {
      if (findById(state.subTasks, subTask.id)) {
        commit('updateSubTask', { item: subTask })
      } else {
        commit('pushSubTask', subTask)
      }
    }
  },
  mutations: {
    setSubTasks (state, subTasks) {
      state.subTasks = subTasks
    },
    pushSubTask(state, newSubTask) {
      state.subTasks.push(newSubTask)
    },
    updateSubTask: updateItemInArray({ resource: 'subTasks' })
  }
}

export default subTaskModule
