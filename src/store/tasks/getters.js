import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly
} from '@/helpers/index.js'

export default {
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
}
