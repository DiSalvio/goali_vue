import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

const goalModule = {
  state () {
    return {
      goals: []
    }
  },
  getters,
  actions,
  mutations 
}

export default goalModule
