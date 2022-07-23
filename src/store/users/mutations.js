export default {
  setToken (state, token) {
    localStorage.setItem('token', token)
  },
  setTokenState (state, token) {
    state.token = token
  },
  removeToken (state) {
    localStorage.removeItem('token')
    state.token = null
  }
}
