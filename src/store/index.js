import { createStore } from 'vuex'
import userModule from './users/index.js'
import goalModule from './goals/index.js'
import taskModule from './tasks/index.js'
import subTaskModule from './subtasks/index.js'
import sourceData from '@/data.json'

const store = createStore({
  state: {
    users: sourceData.users,
    goals: sourceData.goals,
    tasks: sourceData.tasks,
    subTasks: sourceData.subTasks
  },
  modules: {
    userModule,
    goalModule,
    taskModule,
    subTaskModule
  }
})

export default store
