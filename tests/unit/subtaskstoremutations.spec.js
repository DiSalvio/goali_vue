import mutations from '@/store/subtasks/mutations.js'

describe('sub-task store mutations', () => {
  afterEach(() => {
    /* localStorage.clear() */
  })

  it('setSubTasks saves tasks to vuex state, overwriting past tasks', () => {
    let state = { 
      subTasks: [
        {
          "id":1,
          "name":"sub-task 1",
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
          "name":"sub-task 2",
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
    mutations.setSubTasks(state, [
      {
        "id":7,
        "name":"sub-task 7",
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
        "name":"sub-task 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ])
    expect(state.subTasks).toEqual(expect.arrayContaining([
      {
        "id":7,
        "name":"sub-task 7",
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
        "name":"sub-task 8",
        "description":"description 8",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))

    expect(state.subTasks).not.toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"sub-task 1",
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
        "name":"sub-task 2",
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

  it('pushSubTask adds tasks to vuex state, keeping past tasks', () => {
    let state = { 
      subTasks: [
        {
          "id":1,
          "name":"sub-task 1",
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
          "name":"sub-task 2",
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
    mutations.pushSubTask(state, {
      "id":3,
      "name":"sub-task 3",
      "description":"description 3",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "user":1
    })
    expect(state.subTasks).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"sub-task 1",
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
        "name":"sub-task 2",
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
        "name":"sub-task 3",
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

  it('updateSubTask replaces single sub-task in vuex state', () => {
    let state = { 
      subTasks: [
        {
          "id":1,
          "name":"sub-task 1",
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
          "name":"sub-task 2",
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
    mutations.updateSubTask(state, { item: {
      "id":2,
      "name":"updated sub-task 2",
      "description":"updated description 2",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":false,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "user":1
    }})
    expect(state.subTasks[0]).toEqual(expect.objectContaining(
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ))
      expect(state.subTasks[1]).toEqual(expect.objectContaining(
        {
          "id":2,
          "name":"updated sub-task 2",
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
