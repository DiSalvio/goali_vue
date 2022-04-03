import { createStore } from 'vuex'
import goalModule from './goals/index.js'
import taskModule from './tasks/index.js'
import subTaskModule from './subtasks/index.js'

const store = createStore({
  modules: {
    goalModule,
    taskModule,
    subTaskModule
  }
})

export default store
