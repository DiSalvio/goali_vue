import mutations from '@/store/tasks/mutations.js'

describe('task store mutations', () => {
  afterEach(() => {
    /* localStorage.clear() */
  })

  it('setTasks saves tasks to vuex state, overwriting past tasks', () => {
    let state = { 
      tasks: [
        {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
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
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":6
        }
      ]
    }
    mutations.setTasks(state, [
      {
        "id":7,
        "name":"task 7",
        "description":"description 7",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      },
      {
        "id":8,
        "name":"task 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ])
    expect(state.tasks).toEqual(expect.arrayContaining([
      {
        "id":7,
        "name":"task 7",
        "description":"description 7",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      },
      {
        "id":8,
        "name":"task 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))

    expect(state.tasks).not.toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
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
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":6
      }
    ]))
  })

  it('pushTask adds tasks to vuex state, keeping past tasks', () => {
    let state = { 
      tasks: [
        {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        },
        {
          "id":2,
          "name":"task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    mutations.pushTask(state, {
      "id":3,
      "name":"task 3",
      "description":"description 3",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "user":1
    })
    expect(state.tasks).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      },
      {
        "id":2,
        "name":"task 2",
        "description":"description 2",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      },
      {
        "id":3,
        "name":"task 3",
        "description":"description 3",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))
  })

  it('updateTask replaces single task in vuex state', () => {
    let state = { 
      tasks: [
        {
          "id":1,
          "name":"task 1",
          "description":"description 1",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        },
        {
          "id":2,
          "name":"task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    mutations.updateTask(state, { item: {
      "id":2,
      "name":"updated task 2",
      "description":"updated description 2",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "user":1
    }})
    expect(state.tasks[0]).toEqual(expect.objectContaining(
      {
        "id":1,
        "name":"task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ))
      expect(state.tasks[1]).toEqual(expect.objectContaining(
        {
          "id":2,
          "name":"updated task 2",
          "description":"updated description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
    ))
  })

})
