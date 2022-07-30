import getters from '@/store/goals/getters.js'

describe('goal store getters', () => {
  it('goal getter retrieves goal with matching ID if it exists', () => {
    let state = { 
      goals: [
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
    }
    expect(getters.goal(state)(2)).toEqual(expect.objectContaining({
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

  it('goal getter returns undefined if goal with ID does not exist', () => {
    let state = { 
      goals: [
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
    }
    expect(getters.goal(state)(3)).toBe(undefined)

  })

  it('activeGoals returns only goals with removed false', () => {
    let state = { 
      goals: [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"goal 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"goal 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        }
      ]
    }
    expect(getters.activeGoals(state)).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"goal 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      },
      {
        "id":4,
        "name":"goal 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]))
  })

  it('activeCompletedGoals returns only goals with removed false and completed true', () => {
    let state = { 
      goals: [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"goal 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"goal 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        }
      ]
    }
    getters.activeGoals = [
      {
        "id":1,
        "name":"goal 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      },
      {
        "id":4,
        "name":"goal 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]
    expect(getters.activeCompletedGoals(state, getters)).toEqual(expect.arrayContaining([
      {
        "id":4,
        "name":"goal 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]))
  })

  it('activeInProgressGoals returns only goals with removed false and completed false', () => {
    let state = { 
      goals: [
        {
          "id":1,
          "name":"goal 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        },
        {
          "id":2,
          "name":"goal 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"goal 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"goal 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        }
      ]
    }
    getters.activeGoals = [
      {
        "id":1,
        "name":"goal 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      },
      {
        "id":4,
        "name":"goal 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]
    expect(getters.activeInProgressGoals(state, getters)).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"goal 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]))
  })

})
