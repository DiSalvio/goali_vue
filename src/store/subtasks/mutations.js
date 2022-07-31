import { updateItemInArray } from '@/helpers/index.js'

export default {
  setSubTasks (state, subTasks) {
    state.subTasks = subTasks
  },
  pushSubTask(state, newSubTask) {
    state.subTasks.push(newSubTask)
  },
  updateSubTask: updateItemInArray({ resource: 'subTasks' })
}
