import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray
} from '@/helpers/index.js'
import sourceData from '@/data.json'

const goalModule = {
  state () {
    return {
      goals: sourceData.goals,
      tasks: sourceData.tasks
    }
  },
  getters: {
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
  },
  actions: {
    async createGoal ({ commit, state }, { name, description }) {
      const newGoal = {
        name,
        description,
        id: state.goals[state.goals.length - 1].id + 1,
        completed: false,
        user: 1,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
        removed: false
      }
      commit('pushGoal',  newGoal)
    },
    async saveEditedGoal ({ commit }, editedGoal) {
      const updatedGoal = {
        ...editedGoal,
        updated: new Date(Date.now()).toISOString()
      }
      commit('updateGoal', { item: updatedGoal })
    }
  },
  mutations: {
    pushGoal (state, newGoal) {
      state.goals.push(newGoal)
    },
    updateGoal: updateItemInArray({ resource: 'goals' })
  }
}

export default goalModule
