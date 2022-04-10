import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray,
  urlHelper,
  authHeader
} from '@/helpers/index.js'
import axios from 'axios'

const goalModule = {
  state () {
    return {
      goals: []
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
    async fetchGoals ({ commit }, token) {
      return await axios.get(urlHelper({ resource: 'goals' }), authHeader(token))
        .then((response) => {
          commit('setGoals', response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async createGoal ({ commit }, { name, description, token }) {
      return await axios.post(urlHelper({ resource: 'goals' }), {
        name,
        description,
        completed: false,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
        removed: false
      }, 
        authHeader(token)
      )
        .then((response) => {
          commit('pushGoal',  response.data)
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async saveEditedGoal ({ commit }, { editedGoal, token }) {
      return await axios.put(urlHelper({ ids: [editedGoal.id] }), {
        ...editedGoal,
        updated: new Date(Date.now()).toISOString()
      },
        authHeader(token)
      )
        .then((response) => {
          commit('updateGoal', { item: response.data })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    setGoals (state, goals) {
      state.goals = goals
    },
    pushGoal (state, newGoal) {
      state.goals.push(newGoal)
    },
    updateGoal: updateItemInArray({ resource: 'goals' })
  }
}

export default goalModule
