import getters from '@/store/tasks/getters.js'

describe('task store getters', () => {
  it('task getter retrieves task with matching ID if it exists', () => {
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
    expect(getters.task(state)(2)).toEqual(expect.objectContaining({
      "id":2,
      "name":"task 2",
      "description":"description 2",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":true,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "user":6
    }))

  })

  it('task getter returns undefined if task with ID does not exist', () => {
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
    expect(getters.task(state)(3)).toBe(undefined)

  })

  it('goalTasks returns all tasks', () => {
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
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    expect(getters.goalTasks(state)).toEqual(expect.arrayContaining([
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
        "removed":true,
        "user":1
      },
      {
        "id":3,
        "name":"task 3",
        "description":"description 3",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":true,
        "user":1
      },
      {
        "id":4,
        "name":"task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))
  })

  it('activeGoalTasks returns only tasks with removed false', () => {
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
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    expect(getters.activeGoalTasks()(state.tasks)).toEqual(expect.arrayContaining([
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
        "id":4,
        "name":"task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))
  })

  it('activeCompletedGoalTasks returns only tasks with removed false and completed true', () => {
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
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    getters.activeGoalTasks = [
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
        "id":4,
        "name":"task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]
    expect(getters.activeCompletedGoalTasks()(getters.activeGoalTasks)).toEqual(expect.arrayContaining([
      {
        "id":4,
        "name":"task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]))
  })

  it('activeInProgressGoalTasks returns only tasks with removed false and completed false', () => {
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
          "removed":true,
          "user":1
        },
        {
          "id":3,
          "name":"task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "user":1
        },
        {
          "id":4,
          "name":"task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "user":1
        }
      ]
    }
    getters.activeGoalTasks = [
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
        "id":4,
        "name":"task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "user":1
      }
    ]
    expect(getters.activeInProgressGoalTasks()(getters.activeGoalTasks)).toEqual(expect.arrayContaining([
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
    ]))
  })

})
