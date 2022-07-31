import getters from '@/store/tasks/getters.js'
import actions from '@/store/tasks/actions.js'
import mutations from '@/store/tasks/mutations.js'

const taskModule = {
  state () {
    return {
      tasks: []
    }
  },
  getters,
  actions,
  mutations 
}

export default taskModule
