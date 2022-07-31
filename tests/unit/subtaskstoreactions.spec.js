import actions from '@/store/subtasks/actions.js'
import axios from 'axios'

jest.mock('axios')
process.env.VUE_APP_API_URL = 'https://example.com'
const commit = jest.fn()
const dispatch = jest.fn()
const rootState = {
  userModule: {
    token: '1234'
  }
}

describe('sub-task store actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchTaskSubTasks', () => {
    it('calls get task sub-tasks API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      const response = await actions.fetchTaskSubTasks({ commit, rootState }, { goalId: 1, taskId: 1 })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/1/tasks/1/subtasks/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('commits task sub-tasks to state if API call succeeds', async () => {
      axios.get.mockResolvedValue({data: [
        {
          "id":1,
          "name":"sub-task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        }
      ]})
      const response = await actions.fetchTaskSubTasks({ commit, rootState }, { goalId: 1, taskId: 1 })
      expect(commit).toHaveBeenCalledWith('setSubTasks', [
        {
          "id":1,
          "name":"sub-task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        }
      ])
      expect(response).toBe(true)
    })

    it('does not commit sub-tasks to state if API call fails', async () => {
      axios.get.mockRejectedValue({ 'error': 'Invalid Token' })
      const response = await actions.fetchTaskSubTasks({ commit, rootState }, { goalId: 1, taskId: 1 })
      expect(commit).not.toHaveBeenCalledWith('setSubTasks')
      expect(response).toBe(false)
    })
  })

  describe('fetchSubTask', () => {
    it('calls get sub-task API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      await actions.fetchSubTask({ dispatch, rootState }, { goalId: 1, taskId: 1, subTaskId: 1 })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/1/tasks/1/subtasks/1/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('returns true if API call succeeds', async () => {
      axios.get.mockResolvedValue({
        data: {
          "id":1,
          "name":"sub-task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "task":1,
          "goal":1,
          "user":6
        }
      })
      const response = await actions.fetchSubTask({ dispatch, rootState }, { goalId: 1, taskId: 1, subTaskId: 1 })
      expect(response).toEqual(true)
    })

    it('returns false if API does not return sub-task with that ID', async () => {
      axios.get.mockRejectedValue({ 'res': 'Object with sub-task id does not exist' })
      const response = await actions.fetchSubTask({ dispatch, rootState }, { goalId: 1, taskId: 1, subTaskId: 1 })
      expect(response).toBe(false)
    })
  })

  describe('createSubTask', () => {
    it('calls post sub-task API correctly', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":9,
          "name":"new sub-task",
          "description":"new sub-task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":2,
          "task":1,
          "user":6
        }
      })
      await actions.createSubTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newSubTask: {
            name: 'new sub-task', 
            description: 'new sub-task description',
            goal: 2,
            task: 1
          }
        }
      )
      expect(axios.post).toHaveBeenCalledWith('https://example.com/goals/2/tasks/1/subtasks/', 
        {
          "name": "new sub-task",
          "description": "new sub-task description",
          "goal": 2,
          "task":1,
          "completed": false,
          "removed": false,
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits pushSubTask action if API call succeeds', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":19,
          "name":"new sub-task",
          "description":"new sub-task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":5,
          "task":2,
          "user":3
        }
      })
      const response = await actions.createSubTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newSubTask: {
            name: 'new sub-task', 
            description: 'new sub-task description',
            goal: 5,
            task: 2
          }
        }
      )
      expect(commit).toHaveBeenCalledWith('pushSubTask', 
        {
          "id":19,
          "name":"new sub-task",
          "description":"new sub-task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":5,
          "task":2,
          "user":3
        }
      )
      expect(response).toBe(true)
    })

    it('returns undefined if createSubTask API call fails', async () => {
      axios.post.mockRejectedValue({ 'name': 'This field may not be blank' })
      const response = await actions.createSubTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newSubTask: {
            name: '', 
            description: 'new description',
            goal: 8,
            task: 1
          }
        }
      )
      expect(commit).not.toHaveBeenCalledWith('pushSubTask')
      expect(response).toBe(undefined)
    })
  })

  describe('saveEditedSubTask', () => {
    it('calls put sub-task API correctly', async () => {
      axios.put.mockResolvedValue({
        data: {
          "id":27,
          "name":"edited sub-task 27",
          "description":"edited sub-task description 27",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal": 11,
          "task": 14,
          "user":6
        }
      })
      await actions.saveEditedSubTask(
        { 
          commit, 
          rootState 
        }, 
        {
          editedSubTask: {
            "id":27,
            "name":"edited sub-task 27",
            "description":"edited sub-task description 27",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":11,
            "task":14,
            "user":6
          }
        }
      )
      expect(axios.put).toHaveBeenCalledWith('https://example.com/goals/11/tasks/14/subtasks/27/', 
        {
          "id":27,
          "name":"edited sub-task 27",
          "description":"edited sub-task description 27",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":11,
          "task":14,
          "user":6
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits updateSubTask action if API call succeeds', async () => {
      axios.put.mockResolvedValue({
        data: {
          "id":33,
          "name":"edited sub-task 33",
          "description":"edited description 33",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":18,
          "task": 17,
          "user":6
        }
      })
      const response = await actions.saveEditedSubTask(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedSubTask": {
            "id":33,
            "name":"edited sub-task 33",
            "description":"edited description 33",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":18,
            "task":17,
            "user":6
          }
        }
      )
      expect(commit).toHaveBeenCalledWith('updateSubTask', {
        item: {
          "id":33,
          "name":"edited sub-task 33",
          "description":"edited description 33",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":18,
          "task":17,
          "user":6
        }
      })
      expect(response).toBe(true)
    })

    it('returns false if saveEditedSubTask API call fails', async () => {
      axios.put.mockRejectedValue({ 'res': 'Object with sub-task id does not exist' })
      const response = await actions.saveEditedSubTask(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedSubTask": {
            "id":117,
            "name":"sub-task 117",
            "description":"description 117",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":77,
            "task":55,
            "user":6
          }
        }
      )
      expect(commit).not.toHaveBeenCalledWith('updateSubTask')
      expect(response).toBe(false)
    })
  })

  describe('upsertSubTask', () => {
    it('commits updateSubTask if sub-task already exists', async () => {
      const state = {
        subTasks: [ 
          {
            "id":8,
            "name":"sub-task 8",
            "description":"description 8",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":1,
            "task":1,
            "user":6
          }
        ]
      }
      actions.upsertSubTask(
        { 
          state, 
          commit 
        }, 
        {
          "id":8,
          "name":"sub-task 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('updateSubTask', {
        item: {
          "id":8,
          "name":"sub-task 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        }
      })
    })

    it('commits pushSubTask if sub-task does not already exist', async () => {
      const state = {
        subTasks: [ 
          {
            "id":9,
            "name":"sub-task 9",
            "description":"description 9",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":1,
            "task":1,
            "user":6
          }
        ]
      }
      await actions.upsertSubTask(
        { 
          state, 
          commit 
        }, 
        {
          "id":18,
          "name":"sub-task 18",
          "description":"description 18",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('pushSubTask', {
        "id":18,
        "name":"sub-task 18",
        "description":"description 18",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":6
      })
    })
  })
})
