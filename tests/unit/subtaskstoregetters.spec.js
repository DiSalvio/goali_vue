import getters from '@/store/subtasks/getters.js'

describe('sub-task store getters', () => {
  it('subTask getter retrieves sub-task with matching ID if it exists', () => {
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
          "task":1,
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
          "task":1,
          "user":6
        }
      ]
    }
    expect(getters.subTask(state)(2)).toEqual(expect.objectContaining({
      "id":2,
      "name":"sub-task 2",
      "description":"description 2",
      "timestamp":"2022-04-15T06:58:03.382281Z",
      "completed":true,
      "updated":"2022-04-15T07:25:23.269770Z",
      "removed":false,
      "goal":1,
      "task":1,
      "user":6
    }))

  })

  it('subTask getter returns undefined if sub-task with ID does not exist', () => {
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
          "task":1,
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
          "task":1,
          "user":6
        }
      ]
    }
    expect(getters.subTask(state)(3)).toBe(undefined)

  })

  it('taskSubTasks returns all subtasks', () => {
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
          "task":1,
          "user":1
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":3,
          "name":"sub-task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":4,
          "name":"sub-task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":1
        }
      ]
    }
    expect(getters.taskSubTasks(state)(1)).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":2,
        "name":"sub-task 2",
        "description":"description 2",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":true,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":3,
        "name":"sub-task 3",
        "description":"description 3",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":true,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":4,
        "name":"sub-task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]))
  })

  it('activeTaskSubTasks returns only subtasks with removed false', () => {
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
          "task":1,
          "user":1
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":3,
          "name":"sub-task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":4,
          "name":"sub-task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":1
        }
      ]
    }
    expect(getters.activeTaskSubTasks()(state.subTasks)).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":4,
        "name":"sub-task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]))
  })

  it('activeCompletedTaskSubTasks returns only sub-tasks with removed false and completed true', () => {
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
          "task":1,
          "user":1
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":3,
          "name":"sub-task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":4,
          "name":"sub-task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":1
        }
      ]
    }
    getters.activeTaskSubTasks = [
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":4,
        "name":"sub-task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]
    expect(getters.activeCompletedTaskSubTasks()(getters.activeTaskSubTasks)).toEqual(expect.arrayContaining([
      {
        "id":4,
        "name":"sub-task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]))
  })

  it('activeInProgressTaskSubTasks returns only subtasks with removed false and completed false', () => {
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
          "task":1,
          "user":1
        },
        {
          "id":2,
          "name":"sub-task 2",
          "description":"description 2",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":3,
          "name":"sub-task 3",
          "description":"description 3",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":false,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":true,
          "goal":1,
          "task":1,
          "user":1
        },
        {
          "id":4,
          "name":"sub-task 4",
          "description":"description 4",
          "timestamp":"2022-04-15T06:58:03.382281Z",
          "completed":true,
          "updated":"2022-04-15T07:25:23.269770Z",
          "removed":false,
          "goal":1,
          "task":1,
          "user":1
        }
      ]
    }
    getters.activeTaskSubTasks = [
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      },
      {
        "id":4,
        "name":"sub-task 4",
        "description":"description 4",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":true,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]
    expect(getters.activeInProgressTaskSubTasks()(getters.activeTaskSubTasks)).toEqual(expect.arrayContaining([
      {
        "id":1,
        "name":"sub-task 1",
        "description":"description 1",
        "timestamp":"2022-04-15T06:58:03.382281Z",
        "completed":false,
        "updated":"2022-04-15T07:25:23.269770Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":1
      }
    ]))
  })

})
