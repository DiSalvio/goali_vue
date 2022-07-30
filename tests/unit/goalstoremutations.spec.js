import mutations from '@/store/goals/mutations.js'

beforeEach(() => {
})

describe('goal store mutations', () => {
  afterEach(() => {
    /* localStorage.clear() */
  })

  it('setGoals saves goals to vuex state, overwriting past goals', () => {
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
    mutations.setGoals(state, [
      {
        "id":7,
        "name":"goal 7",
        "description":"description 7",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      },
      {
        "id":8,
        "name":"goal 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ])
    expect(state.goals).toEqual(expect.arrayContaining([
      {
        "id":7,
        "name":"goal 7",
        "description":"description 7",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      },
      {
        "id":8,
        "name":"goal 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]))

    expect(state.goals).not.toEqual(expect.arrayContaining([
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
    ]))
  })

  it('pushGoal adds goals to vuex state, keeping past goals', () => {
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
          "removed":false,
          "user":1
        }
      ]
    }
    mutations.pushGoal(state, {
      "id":3,
      "name":"goal 3",
      "description":"description 3",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "user":1
    })
    expect(state.goals).toEqual(expect.arrayContaining([
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
        "removed":false,
        "user":1
      },
      {
        "id":3,
        "name":"goal 3",
        "description":"description 3",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "user":1
      }
    ]))
  })

  it('updateGoal replaces single goal in vuex state', () => {
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
          "removed":false,
          "user":1
        }
      ]
    }
    mutations.updateGoal(state, { item: {
      "id":2,
      "name":"updated goal 2",
      "description":"updated description 2",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "user":1
    }})
    expect(state.goals[0]).toEqual(expect.objectContaining(
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
    ))
      expect(state.goals[1]).toEqual(expect.objectContaining(
        {
          "id":2,
          "name":"updated goal 2",
          "description":"updated description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "user":1
        }
    ))
  })

})
