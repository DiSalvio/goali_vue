import { createStore } from 'vuex'
import userModule from './users/index.js'
import goalModule from './goals/index.js'
import taskModule from './tasks/index.js'
import subTaskModule from './subtasks/index.js'

const store = createStore({
  state: {
  },
  modules: {
    userModule,
    goalModule,
    taskModule,
    subTaskModule
  }
})

export default store
