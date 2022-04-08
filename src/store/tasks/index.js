import {
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray
} from '@/helpers/index.js'
import sourceData from '@/data.json'

const taskModule = {
  state () {
    return {
      tasks: sourceData.tasks
    }
  },
  getters: {
    task (state) {
      return (taskId) => findById(state.tasks, taskId)
    },
    goalTasks (state) {
      return (goalId) => filterChildrenById(state.tasks, 'goal', goalId)
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
    async createTask({ commit, state }, task) {
      const newTask = {
        ...task,
        completed: false,
        id: state.tasks[state.tasks.length - 1].id + 1,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
        removed: false
      }
      commit('pushTask', newTask)
    },
    async saveEditedTask({ commit }, editedTask) {
      const updatedTask = {
        ...editedTask,
        updated: new Date(Date.now()).toISOString()
      }
      commit('updateTask', { item: updatedTask })
    }
  },
  mutations: {
    pushTask (state, newTask) {
      state.tasks.push(newTask)
    },
    updateTask: updateItemInArray({ resource: 'tasks' })
  }
}

export default taskModule
