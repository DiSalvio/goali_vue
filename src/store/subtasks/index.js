import { 
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly
} from '@/helpers/index.js'

const subTaskModule = {
  state () {
    return {
    }
  },
  getters: {
    subTask (state, getters, rootState) {
      return (subTaskId) => findById(rootState.subTasks, subTaskId)
    },
    taskSubTasks (state, getters, rootState) {
      return (taskId) => filterChildrenById(rootState.subTasks, 'task', taskId)
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
  },
  mutations: {
  }
}

export default subTaskModule
