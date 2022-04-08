import {
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly
} from '@/helpers/index.js'

const taskModule = {
  state () {
    return {
    }
  },
  getters: {
    task (state, getters, rootState) {
      return (taskId) => findById(rootState.tasks, taskId)
    },
    goalTasks (state, getters, rootState) {
      return (goalId) => filterChildrenById(rootState.tasks, 'goal', goalId)
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
  },
  mutations: {
  }
}

export default taskModule
