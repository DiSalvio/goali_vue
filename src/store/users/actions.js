import { urlHelper } from '@/helpers/index.js'
import axios from 'axios'

export default {
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
      email: user.email,
      username: user.username,
      password: user.password,
      confirm_password: user.confirmPassword,
      first_name: user.firstName,
      last_name: user.lastName
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
  async refreshTokenState({ commit }, token) {
    return await axios.post(urlHelper({ resource: 'token' }), {
      token
    })
      .then((response) => {
        commit('setTokenState', response.data.token)
        return response.data.token
      })
      .catch(() => {
        commit('removeToken', token)
        return false
      })
  }
}
