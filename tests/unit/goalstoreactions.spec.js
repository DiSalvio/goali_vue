import actions from '@/store/goals/actions.js'
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

describe('goal store actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchGoals', () => {
    it('calls get goals API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      const response = await actions.fetchGoals({ commit, rootState })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('commits goals to state if API call succeeds', async () => {
      axios.get.mockResolvedValue({data: [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      ]})
      const response = await actions.fetchGoals({ commit, rootState })
      expect(commit).toHaveBeenCalledWith('setGoals', [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      ])
    })

    it('does not commit to state if API call fails', async () => {
      axios.get.mockRejectedValue({ 'error': 'Invalid Token' })
      const response = await actions.fetchGoals({ commit, rootState })
      expect(commit).not.toHaveBeenCalledWith('setGoals')
    })
  })

  describe('fetchGoal', () => {
    it('calls get goal API correctly', async () => {
      axios.get.mockResolvedValue({data: []})
      await actions.fetchGoal({ dispatch, rootState }, { goalId: 7 })
      expect(axios.get).toHaveBeenCalledWith('https://example.com/goals/7/', 
        {
          "headers": {"Authorization": "Token 1234"}
        }
      )
    })

    it('returns goal if API call succeeds', async () => {
      axios.get.mockResolvedValue({
        data: {
          "id":7,
          "name":"goal 7",
          "description":"description 7",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      const response = await actions.fetchGoal({ dispatch, rootState }, { goalId: 7 })
      expect(response).toEqual(expect.objectContaining({
        "id":7,
        "name":"goal 7",
        "description":"description 7",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":6
      }))
    })

    it('returns null if API does not return goal with that ID', async () => {
      axios.get.mockRejectedValue({ 'res': 'Object with goal id does not exist' })
      const response = await actions.fetchGoal({ dispatch, rootState }, { goalId: 7 })
      expect(response).toBe(null)
    })
  })

  describe('createGoal', () => {
    it('calls post goal API correctly', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":7,
          "name":"new goal",
          "description":"new description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      await actions.createGoal(
        { 
          commit, 
          rootState 
        }, 
        { 
          name: 'new goal', 
          description: 'new description'
        }
      )
      expect(axios.post).toHaveBeenCalledWith('https://example.com/goals/', 
        {
          "name": "new goal",
          "description": "new description",
          "completed": false,
          "removed": false,
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits pushGoal action if API call succeeds', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":7,
          "name":"new goal",
          "description":"new description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      const response = await actions.createGoal(
        { 
          commit, 
          rootState 
        }, 
        { 
          name: 'new goal', 
          description: 'new description'
        }
      )
      expect(commit).toHaveBeenCalledWith('pushGoal', 
        {
          "id":7,
          "name":"new goal",
          "description":"new description",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      )
      expect(response).toEqual(expect.objectContaining({
        "id":7,
        "name":"new goal",
        "description":"new description",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":6
      }))
    })

    it('returns undefined if createGoal API call fails', async () => {
      axios.post.mockRejectedValue({ 'name': 'This field may not be blank' })
      const response = await actions.createGoal(
        { 
          commit, 
          rootState 
        }, 
        { 
          name: '', 
          description: 'new description'
        }
      )
      expect(commit).not.toHaveBeenCalledWith('pushGoal')
      expect(response).toBe(undefined)
    })
  })

  describe('saveEditedGoal', () => {
    it('calls put goal API correctly', async () => {
      axios.put.mockResolvedValue({
        data: {
          "id":7,
          "name":"edited goal 7",
          "description":"edited description 7",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      await actions.saveEditedGoal(
        { 
          commit, 
          rootState 
        }, 
        {
          editedGoal: {
            "id":7,
            "name":"edited goal 7",
            "description":"edited description 7",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      )
      expect(axios.put).toHaveBeenCalledWith('https://example.com/goals/7/', 
        {
          "id":7,
          "name":"edited goal 7",
          "description":"edited description 7",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        },
        {"headers": {"Authorization": "Token 1234"}}
      )
    })

    it('commits updatedGoal action if API call succeeds', async () => {
      axios.post.mockResolvedValue({
        data: {
          "id":7,
          "name":"edited goal 7",
          "description":"edited description 7",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      const response = await actions.saveEditedGoal(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedGoal": {
            "id":7,
            "name":"edited goal 7",
            "description":"edited description 7",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      )
      expect(commit).toHaveBeenCalledWith('updateGoal', {
        item: {
          "id":7,
          "name":"edited goal 7",
          "description":"edited description 7",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      expect(response).toBe(true)
    })

    it('returns false if saveEditedGoal API call fails', async () => {
      axios.put.mockRejectedValue({ 'res': 'Object with goal id does not exist' })
      const response = await actions.saveEditedGoal(
        { 
          commit, 
          rootState 
        }, 
        {
          "editedGoal": {
            "id":117,
            "name":"goal 117",
            "description":"description 117",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      )
      expect(commit).not.toHaveBeenCalledWith('updateGoal')
      expect(response).toBe(false)
    })
  })

  describe('upsertGoal', () => {
    it('commits updateGoal if goal already exists', async () => {
      const state = {
        goals: [ 
          {
            "id":8,
            "name":"goal 8",
            "description":"description 8",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        ]
      }
      actions.upsertGoal(
        { 
          state, 
          commit 
        }, 
        {
          "id":8,
          "name":"goal 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('updateGoal', {
        item: {
          "id":8,
          "name":"goal 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
    })

    it('commits pushGoal if goal does not already exist', async () => {
      const state = {
        goals: [ 
          {
            "id":9,
            "name":"goal 9",
            "description":"description 9",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        ]
      }
      await actions.upsertGoal(
        { 
          state, 
          commit 
        }, 
        {
          "id":8,
          "name":"goal 8",
          "description":"description 8",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      )
      expect(commit).toHaveBeenCalledWith('pushGoal', {
        "id":8,
        "name":"goal 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":6
      })
    })
  })
})
