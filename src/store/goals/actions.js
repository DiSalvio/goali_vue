import {
  findById,
  urlHelper,
  authHeader
} from '@/helpers/index.js'
import axios from 'axios'

export default {
  async fetchGoals ({ commit, rootState }) {
    return await axios.get(
      urlHelper({ resource: 'goals' }),
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('setGoals', response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  async fetchGoal ({ dispatch, rootState }, { goalId }) {
    return await axios.get(urlHelper({ ids: [ goalId ]}),
      authHeader(rootState.userModule.token))
      .then((response) => {
        dispatch('upsertGoal', response.data)
        return response.data
      })
      .catch((e) => {
        console.log(e)
        return null
      })
  },
  async createGoal ({ commit, rootState }, { name, description }) {
    return await axios.post(urlHelper({ resource: 'goals' }), {
      name,
      description,
      completed: false,
      removed: false
    }, 
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('pushGoal',  response.data)
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async saveEditedGoal ({ commit, rootState }, { editedGoal }) {
    return await axios.put(urlHelper({ ids: [editedGoal.id] }), {
      ...editedGoal
    },
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('updateGoal', { item: response.data })
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  },
  upsertGoal ({ state, commit }, goal) {
    if (findById(state.goals, goal.id)) {
      commit('updateGoal', { item: goal })
    } else {
      commit('pushGoal', goal)
    }
  }
}
