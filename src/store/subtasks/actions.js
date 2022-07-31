import { 
  findById,
  urlHelper,
  authHeader
} from '@/helpers/index.js'
import axios from 'axios'

export default {
  async fetchSubTask({ dispatch, rootState }, { goalId, taskId, subTaskId }) {
    return await axios.get(urlHelper({ ids: [ goalId, taskId, subTaskId ] }),
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        dispatch('upsertSubTask', response.data)
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  },
  async fetchTaskSubTasks({ commit, rootState }, { goalId, taskId }) {
    return await axios.get(urlHelper({ resource: 'subtasks', ids: [ goalId, taskId ] }),
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('setSubTasks', response.data)
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  },
  async createSubTask({ commit, rootState }, { newSubTask }) {
    return await axios.post(
      urlHelper({ resource: 'subtasks', ids: [ newSubTask.goal, newSubTask.task ]}),
      {
        ...newSubTask,
        completed: false,
        removed: false
      },
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('pushSubTask', response.data)
        return true
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async saveEditedSubTask({ commit, rootState }, { editedSubTask }) {
    return await axios.put(
      urlHelper({ ids: [ editedSubTask.goal, editedSubTask.task, editedSubTask.id ] }),
      {
        ...editedSubTask
      },
      authHeader(rootState.userModule.token)
    )
      .then((response) => {
        commit('updateSubTask', { item: response.data })
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  },
  upsertSubTask ({ state, commit }, subTask) {
    if (findById(state.subTasks, subTask.id)) {
      commit('updateSubTask', { item: subTask })
    } else {
      commit('pushSubTask', subTask)
    }
  }
}
