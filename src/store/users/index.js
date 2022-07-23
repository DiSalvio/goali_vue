import actions from './actions.js'
import mutations from './mutations.js'

const userModule = {
  state () {
    return {
      token: null
    }
  },
  actions,
  mutations
}

export default userModule
