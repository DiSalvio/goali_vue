import actions from '@/store/tasks/actions.js'
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

describe('task store actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchGoalTasks', () => {
    it('calls get goal tasks API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      const response = await actions.fetchGoalTasks({ commit, rootState }, { goalId: 1 })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/1/tasks/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('commits goal tasks to state if API call succeeds', async () => {
      axios.get.mockResolvedValue({data: [
        {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        },
        {
          "id":2,
          "name":"task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      ]})
      const response = await actions.fetchGoalTasks({ commit, rootState }, { goalId: 1 })
      expect(commit).toHaveBeenCalledWith('setTasks', [
        {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        },
        {
          "id":2,
          "name":"task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      ])
    })

    it('does not commit tasks to state if API call fails', async () => {
      axios.get.mockRejectedValue({ 'error': 'Invalid Token' })
      const response = await actions.fetchGoalTasks({ commit, rootState }, { goalId: 1 })
      expect(commit).not.toHaveBeenCalledWith('setTasks')
    })
  })

  describe('fetchTask', () => {
    it('calls get task API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      await actions.fetchTask({ dispatch, rootState }, { goalId: 7, taskId: 1 })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/7/tasks/1/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('returns true if API call succeeds', async () => {
      axios.get.mockResolvedValue({
        data: {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":7,
          "user":6
        }
      })
      const response = await actions.fetchTask({ dispatch, rootState }, { goalId: 7, taskId: 1 })
      expect(response).toEqual(true)
    })

    it('returns false if API does not return task with that ID', async () => {
      axios.get.mockRejectedValue({ 'res': 'Object with task id does not exist' })
      const response = await actions.fetchTask({ dispatch, rootState }, { goalId: 7, taskId: 1 })
      expect(response).toBe(false)
    })
  })

  describe('createTask', () => {
    it('calls post task API correctly', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":9,
          "name":"new task",
          "description":"new task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":2,
          "user":6
        }
      })
      await actions.createTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newTask: {
            name: 'new task', 
            description: 'new task description',
            goal: 2
          }
        }
      )
      expect(axios.post).toHaveBeenCalledWith('https://example.com/goals/2/tasks/', 
        {
          "name": "new task",
          "description": "new task description",
          "goal": 2,
          "completed": false,
          "removed": false,
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits pushGoal action if API call succeeds', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":19,
          "name":"new task",
          "description":"new task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":5,
          "user":3
        }
      })
      const response = await actions.createTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newTask: {
            name: 'new task', 
            description: 'new task description',
            goal: 5
          }
        }
      )
      expect(commit).toHaveBeenCalledWith('pushTask', 
        {
          "id":19,
          "name":"new task",
          "description":"new task description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":5,
          "user":3
        }
      )
      expect(response).toEqual(expect.objectContaining({
        "id":19,
        "name":"new task",
        "description":"new task description",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":5,
        "user":3
      }))
    })

    it('returns undefined if createTask API call fails', async () => {
      axios.post.mockRejectedValue({ 'name': 'This field may not be blank' })
      const response = await actions.createTask(
        { 
          commit, 
          rootState 
        }, 
        { 
          newTask: {
            name: '', 
            description: 'new description',
            goal: 8
          }
        }
      )
      expect(commit).not.toHaveBeenCalledWith('pushTask')
      expect(response).toBe(undefined)
    })
  })

  describe('saveEditedTask', () => {
    it('calls put task API correctly', async () => {
      axios.put.mockResolvedValue({
        data: {
          "id":27,
          "name":"edited task 27",
          "description":"edited task description 27",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal": 11,
          "user":6
        }
      })
      await actions.saveEditedTask(
        { 
          commit, 
          rootState 
        }, 
        {
          editedTask: {
            "id":27,
            "name":"edited task 27",
            "description":"edited task description 27",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":11,
            "user":6
          }
        }
      )
      expect(axios.put).toHaveBeenCalledWith('https://example.com/goals/11/tasks/27/', 
        {
          "id":27,
          "name":"edited task 27",
          "description":"edited task description 27",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":11,
          "user":6
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits updateTask action if API call succeeds', async () => {
      axios.put.mockResolvedValue({
        data: {
          "id":33,
          "name":"edited task 33",
          "description":"edited description 33",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":18,
          "user":6
        }
      })
      const response = await actions.saveEditedTask(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedTask": {
            "id":33,
            "name":"edited task 33",
            "description":"edited description 33",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":18,
            "user":6
          }
        }
      )
      expect(commit).toHaveBeenCalledWith('updateTask', {
        item: {
          "id":33,
          "name":"edited task 33",
          "description":"edited description 33",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":18,
          "user":6
        }
      })
      expect(response).toBe(true)
    })

    it('returns false if saveEditedTask API call fails', async () => {
      axios.put.mockRejectedValue({ 'res': 'Object with goal id does not exist' })
      const response = await actions.saveEditedTask(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedTask": {
            "id":117,
            "name":"task 117",
            "description":"description 117",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal": 77,
            "user":6
          }
        }
      )
      expect(commit).not.toHaveBeenCalledWith('updateTask')
      expect(response).toBe(false)
    })
  })

  describe('upsertTask', () => {
    it('commits updateTask if task already exists', async () => {
      const state = {
        tasks: [ 
          {
            "id":8,
            "name":"task 8",
            "description":"description 8",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":1,
            "user":6
          }
        ]
      }
      actions.upsertTask(
        { 
          state, 
          commit 
        }, 
        {
          "id":8,
          "name":"task 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('updateTask', {
        item: {
          "id":8,
          "name":"task 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      })
    })

    it('commits pushTask if task does not already exist', async () => {
      const state = {
        tasks: [ 
          {
            "id":9,
            "name":"task 9",
            "description":"description 9",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "goal":1,
            "user":6
          }
        ]
      }
      await actions.upsertTask(
        { 
          state, 
          commit 
        }, 
        {
          "id":18,
          "name":"task 18",
          "description":"description 18",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('pushTask', {
        "id":18,
        "name":"task 18",
        "description":"description 18",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":6
      })
    })
  })
})
