import { updateItemInArray } from '@/helpers/index.js'

export default {
  setTasks (state, tasks) {
    state.tasks = tasks
  },
  pushTask (state, newTask) {
    state.tasks.push(newTask)
  },
  updateTask: updateItemInArray({ resource: 'tasks' })
}
