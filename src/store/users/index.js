import axios from 'axios'

const userModule = {
  state () {
    return {
      token: ''
    }
  },
  getters: {
    token (state) {
      return state.token
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      return await axios.post(process.env.VUE_APP_API_URL + "login/", {
        username: username,
        password: password
      })
        .then((response) => {
          commit('setToken', response.data.token)
          return true
      })
        .catch((e) => {
          console.log(e)
          return false
      })
    },
    async signUp (context, user) {
      return await axios.post(process.env.VUE_APP_API_URL + "signup/", {
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
      return await axios.post(process.env.VUE_APP_API_URL + "logout/", {
        token
      })
        .then(() => {
          commit('removeToken')
          return true
        })
        .catch(() => {
          return false
        })
    }
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    removeToken (state) {
      localStorage.removeItem('token')
      state.token = ''
    }
  }
}

export default userModule
