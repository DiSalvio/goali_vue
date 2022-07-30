import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly
} from '@/helpers/index.js'

export default {
  goal (state) {
    return (goalId) => findById(state.goals, goalId)
  },
  activeGoals (state) {
    return activeOnly(state.goals)
  },
  activeCompletedGoals (state, getters) {
    return completedOnly(getters.activeGoals)
  },
  activeInProgressGoals (state, getters) {
    return inProgressOnly(getters.activeGoals)
  }
}
