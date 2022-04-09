import {
  findById,
  activeOnly,
  completedOnly,
  inProgressOnly,
  updateItemInArray
} from '@/helpers/index.js'
import sourceData from '@/data.json'
import axios from 'axios'

const goalModule = {
  state () {
    return {
      goals: [],
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
    async fetchGoals ({ commit }, token) {
      console.log('fetch')
      console.log(token)
      console.log(process.env)
      return await axios.get(process.env.VUE_APP_API_URL + "goals/", {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then((response) => {
          commit('setGoals', response.data)
      })
        .catch((e) => {
          console.log(e)
      })
    },
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
