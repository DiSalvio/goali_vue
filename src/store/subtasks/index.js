import getters from '@/store/subtasks/getters.js'
import actions from '@/store/subtasks/actions.js'
import mutations from '@/store/subtasks/mutations.js'

const subTaskModule = {
  state () {
    return {
      subTasks: []
    }
  },
  getters,
  actions,
  mutations
}

export default subTaskModule
