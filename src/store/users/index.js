import { urlHelper } from '@/helpers/index.js'
import axios from 'axios'

const userModule = {
  state () {
    return {
      token: null
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      return await axios.post(urlHelper({ resource: 'login' }), {
        username: username,
        password: password
      })
        .then((response) => {
          commit('setToken', response.data.token)
          commit('setTokenState', response.data.token)
          return true
      })
        .catch((e) => {
          console.log(e)
          return false
      })
    },
    async signUp (context, user) {
      return await axios.post(urlHelper({ resource: 'signup' }), {
        ...user
      })
        .then(() => {
          return true
      })
        .catch(() => {
          return false
      })
    },
    async logOut ({ commit }, token) {
      return await axios.post(urlHelper({ resource: 'logout' }), {
        token
      })
        .then(() => {
          commit('removeToken')
          return true
        })
        .catch(() => {
          return false
        })
    },
    refreshTokenState({ commit }, token) {
      commit('setTokenState', token)
    }
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)
    },
    setTokenState (state, token) {
      state.token = token
    },
    removeToken (state) {
      localStorage.removeItem('token')
      state.token = ''
    }
  }
}

export default userModule
