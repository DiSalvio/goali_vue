import { 
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray
} from '@/helpers/index.js'
import sourceData from '@/data.json'

const subTaskModule = {
  state () {
    return {
      subTasks: sourceData.subTasks
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
    async createSubTask({ commit, state }, subTask) {
      const newSubTask = {
        ...subTask,
        completed: false,
        id: state.subTasks[state.subTasks.length - 1].id + 1,
        timestamp: new Date(Date.now()).toISOString(),
        updated: new Date(Date.now()).toISOString(),
        removed: false
      }
      commit('pushSubTask', newSubTask)
    },
    async saveEditedSubTask({ commit }, editedSubTask) {
      const updatedSubTask = {
        ...editedSubTask,
        updated: new Date(Date.now()).toISOString()
      }
      commit('updateSubTask', { item: updatedSubTask })
    }
  },
  mutations: {
    pushSubTask(state, newSubTask) {
      state.subTasks.push(newSubTask)
    },
    updateSubTask: updateItemInArray({ resource: 'subTasks' })
  }
}

export default subTaskModule
