import { findById, activeOnly, completedOnly, inProgressOnly } from '@/helpers/index.js'

const goalModule = {
  state () {
    return {
    }
  },
  getters: {
    goal (state, getters, rootState) {
      return (goalId) => findById(rootState.goals, goalId) 
    },
    activeGoals (state, getters, rootState) {
      return activeOnly(rootState.goals)
    },
    activeCompletedGoals (state, getters) {
      return completedOnly(getters.activeGoals)
    },
    activeInProgressGoals (state, getters) {
      return inProgressOnly(getters.activeGoals)
    }
  },
  actions: {
  },
  mutations: {
  }
}

export default goalModule
