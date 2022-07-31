import { 
  findById,
  filterChildrenById,
  activeOnly,
  completedOnly,
  inProgressOnly
} from '@/helpers/index.js'

export default {
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
}
