import { authHeader, urlHelper, updateItemInArray, findById } from '@/helpers/index.js'

describe('helper functions', () => {
  describe('urlHelper functions', () => {
    process.env.VUE_APP_API_URL = 'https://example.com'

    it('generates url for resource when only resource name input', () => {
      expect(urlHelper({ resource: 'login' })).toBe('https://example.com/login/')
    })

    it('generates url for goals when only one id input', () => {
      expect(urlHelper({ ids: [1] })).toBe('https://example.com/goals/1/')
    })

    it('generates url for tasks when resource and one id input', () => {
      expect(urlHelper({ resource: 'tasks', ids: [1] })).toBe('https://example.com/goals/1/tasks/')
    })

    it('generates url for task page when two nested ids input', () => {
      expect(urlHelper({ ids: [1, 4] })).toBe('https://example.com/goals/1/tasks/4/')
    })

    it('generates url for subtasks page when resource name and two nested ids input', () => {
      expect(urlHelper({ resource: 'subtasks', ids: [1, 4] })).toBe('https://example.com/goals/1/tasks/4/subtasks/')
    })

    it('generates url for subtask page when 3 nested resource ids', () => {
      expect(urlHelper({ ids: [1, 4, 7] })).toBe('https://example.com/goals/1/tasks/4/subtasks/7/')
    })
  })

  describe('updateItemInArray', () => {
    it('replaces an item at the correct index', () => {
      let state = {}
      state['goals'] = [
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
      ]
      updateItemInArray({ resource: 'goals' })(state, { item: {
          "id":2,
          "name":"goal 2 updated",
          "description":"description 2 updated",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      })
      expect(state['goals'][1].name).toBe('goal 2 updated')
      expect(state['goals'][1].description).toBe('description 2 updated')
      expect(state['goals'][1].completed).toBe(true)
    })
  })

  describe('authHeader', () => {
    it('produces correct token authorization header', () => {
      expect(authHeader('1t2o3k4n5')).toEqual(expect.objectContaining({ headers: { 'Authorization': 'Token 1t2o3k4n5' }}))
    })
  })

  describe('findById', () => {
    it('returns item in resource if it matches passed id', () => {
      const testGoals = [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      ]
      expect(findById(testGoals, 2)).toEqual(expect.objectContaining({
        "id":2,
        "name":"goal 2",
        "description":"description 2",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":6
      }))
    })

    it('returns undefined resource does not contain passed id', () => {
      const testGoals = [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":6
        }
      ]
      expect(findById(testGoals, 3)).toEqual(undefined)
    })
  })
})
