import axios from 'axios'

const userModule = {
  state () {
    return {
      token: ''
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      return await axios.post("http://127.0.0.1:8000/login/", {
        username: username,
        password: password
      })
        .then((response) => {
          commit('setToken', response.data.token)
          return true
      })
        .catch(() => {
          return false
      })
    },
    async signUp (context, user) {
      return await axios.post("http://127.0.0.1:8000/signup/", {
        ...user
      })
        .then(() => {
          return true
      })
        .catch(() => {
          return false
      })
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  }
}

export default userModule
