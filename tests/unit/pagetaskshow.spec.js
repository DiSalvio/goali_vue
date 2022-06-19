import store from '@/store'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import PageTaskShow from '@/views/PageTaskShow.vue'

describe('PageTaskShow.vue', () => {

  describe('matches previous html snapshots', () => {

    it('when there is a task with no sub-tasks', async () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":1,
                  "name":"task #1",
                  "description":"description #1",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1'
        },
        data () {
          return {
            task: {
              "id":1,
              "name":"task #1",
              "description":"Description #1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal": 1,
              "user":6
            }
          }
        }
      })
      expect(wrapper).toMatchSnapshot()
    })

    it('when there is a goal with multiple tasks', async () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":2,
                  "name":"task #2",
                  "description":"description #2",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":1,
                    "task": 2,
                    "user":6
                  },
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":1,
                    "task": 2,
                    "user":6
                  },
                  {
                    "id":2,
                    "name":"goali_api tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T06:59:44.701041Z",
                    "completed":true,
                    "updated":"2022-04-24T05:39:29.752105Z",
                    "removed":false,
                    "goal":1,
                    "task": 2,
                    "user":6
                  },
                  {
                    "id":31,
                    "name":"Create pipeline with test promotion",
                    "description":"API frontend unit integration browser tested",
                    "timestamp":"2022-04-24T05:40:35.413245Z",
                    "completed":false,
                    "updated":"2022-04-24T05:40:35.413276Z",
                    "removed":false,
                    "goal":1,
                    "task": 2,
                    "user":6
                  },
                  {
                    "id":38,
                    "name":"Set up and write Goali Vue Tests",
                    "description":"create tests for Goali Vue",
                    "timestamp":"2022-05-10T09:08:54.361797Z",
                    "completed":false,
                    "updated":"2022-05-10T09:08:54.361859Z",
                    "removed":false,
                    "goal":1,
                    "task": 2,
                    "user":6
                  }
                ]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":2,
                    "name":"goali_api tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T06:59:44.701041Z",
                    "completed":true,
                    "updated":"2022-04-24T05:39:29.752105Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":31,
                    "name":"Create pipeline with test promotion",
                    "description":"API frontend unit integration browser tested",
                    "timestamp":"2022-04-24T05:40:35.413245Z",
                    "completed":false,
                    "updated":"2022-04-24T05:40:35.413276Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":38,
                    "name":"Set up and write Goali Vue Tests",
                    "description":"create tests for Goali Vue",
                    "timestamp":"2022-05-10T09:08:54.361797Z",
                    "completed":false,
                    "updated":"2022-05-10T09:08:54.361859Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  }
                ]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":31,
                    "name":"Create pipeline with test promotion",
                    "description":"API frontend unit integration browser tested",
                    "timestamp":"2022-04-24T05:40:35.413245Z",
                    "completed":false,
                    "updated":"2022-04-24T05:40:35.413276Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":38,
                    "name":"Set up and write Goali Vue Tests",
                    "description":"create tests for Goali Vue",
                    "timestamp":"2022-05-10T09:08:54.361797Z",
                    "completed":false,
                    "updated":"2022-05-10T09:08:54.361859Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  }
                ]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  },
                  {
                    "id":2,
                    "name":"goali_api tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T06:59:44.701041Z",
                    "completed":true,
                    "updated":"2022-04-24T05:39:29.752105Z",
                    "removed":false,
                    "goal":1,
                    "task":2,
                    "user":6
                  }
                ])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '2'
        },
        data () {
          return {
            editingGoal: false,
            task: {
              "id":2,
              "name":"Task #2",
              "description":"Description #2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('component hooks', () => {
    it('dispatches fetchTaskSubTasks on created', async () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":3,
                  "name":"task #3",
                  "description":"description #3",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '3'
        },
        data () {
          return {
            task: {
              "id":3,
              "name":"task #3",
              "description":"Description #3",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('fetchTaskSubTasks', {
        goalId: "1",
        taskId: "3"
      })
    })
  })

  describe('computed properties', () => {
    it('are all accessible', async () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          plugins: [store]
        },
        data () {
          return {
            task: {
              "id":4,
              "name":"task #4",
              "description":"Description #4",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal": 1,
              "user":6
            }
          }
        }
      })
      expect(vm).toEqual(
        expect.objectContaining({
          'task': expect.any(Object),
          'taskSubTasks': expect.any(Array),
          'activeTaskSubTasks': expect.any(Array),
          'activeInProgressTaskSubTasks': expect.any(Array),
          'activeCompletedTaskSubTasks': expect.any(Array)
        })
      )
    })
  })

  describe('methods', () => {
    it('editTask sets editingTask to true', async () => {
      const { vm } = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":5,
                  "name":"task #5",
                  "description":"Description #5",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal": 1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '5'
        },
        data () {
          return {
            task: {
              "id":5,
              "name":"task #5",
              "description":"Description #5",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(vm.editingTask).toBe(false)
      vm.editTask()
      expect(vm.editingTask).toBe(true)
    })

    it('finishEditingTask correctly sets editingTask to false', () => {
      const { vm } = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":6,
                  "name":"task #6",
                  "description":"Description #6",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '6'
        },
        data () {
          return {
            task: {
              "id":6,
              "name":"task #6",
              "description":"Description #6",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            },
            editingTask: true
          }
        }
      })
      vm.finishEditingTask()
      expect(vm.editingTask).toBe(false)
    })

    it('saveEditedTask correctly dispatches saveEditedTask action with correct params', () => {
      const { vm } = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":7,
                  "name":"task #7",
                  "description":"Description #7",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '7'
        },
        data () {
          return {
            task: {
              "id":7,
              "name":"task #7",
              "description":"Description #7",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            },
            editingTask: true
          }
        }
      })
      const editedTask = {
        ...vm.task,
        "name":"Edited Task #7",
        "description":"Edited Description #7",
      }
      vm.saveEditedTask({ editedTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', { editedTask })
    })

    it('toggleTaskCompletion dispatches saveEditedTask with flipped completed param', () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":8,
                  "name":"task #8",
                  "description":"Description #8",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '8'
        },
        data () {
          return {
            task: {
              "id":8,
              "name":"task #8",
              "description":"Description #8",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      vm.toggleTaskCompletion(vm.task)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...vm.task,
          completed: true
        }
      })
    })

    it('removeTask dispatches saveEditedTask with flipped removed param and redirects', async () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":9,
                  "name":"task #9",
                  "description":"Description #8",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '9'
        },
        data () {
          return {
            task: {
              "id":9,
              "name":"task #9",
              "description":"Description #9",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      await vm.removeTask(vm.task)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...vm.task,
          removed: true
        }
      })
      expect(vm.$router.push).toHaveBeenCalledWith({ 
        name: 'PageGoalShow',
        params: {
          "goalId": "1",
        }
      })
    })

    it('addSubTask dispatches createSubTask action with current taskId and goalId', () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":10,
                  "name":"task #10",
                  "description":"Description #10",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '10'
        },
        data () {
          return {
            task: {
              "id":10,
              "name":"task #10",
              "description":"Description #10",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const newSubTask = {
        "name":"Test Vue Components",
        "description":"test em all",
      }
      vm.addSubTask({ newSubTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('createSubTask', {
        newSubTask: {
          ...newSubTask,
          goal: 1,
          task: 10
        }
      })
    })

    it('saveEditedSubTask', () => {
      const { vm } = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":11,
                  "name":"task #11",
                  "description":"Description #11",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '11'
        },
        data () {
          return {
            task: {
              "id":11,
              "name":"task #11",
              "description":"Description #11",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const editedSubTask = {
        "id":1,
        "name":"Add browser tests",
        "description":"run them on a test server automatically after deployments",
        "timestamp":"2022-04-15T07:21:11.342684Z",
        "completed":false,
        "updated":"2022-04-15T07:21:11.342709Z",
        "removed":false,
        "goal":1,
        "task":11,
        "user":6
      }
      vm.saveEditedSubTask({ editedSubTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...editedSubTask,
        }
      })
    })
  })

  describe('DOM', () => {

    it('active task shows task name, description, edit, delete, and in progress buttons', () => {
      const wrapper = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":12,
                  "name":"task #12",
                  "description":"Description #12",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '12'
        },
        data () {
          return {
            task: {
              "id":12,
              "name":"task #12",
              "description":"Description #12",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const taskName = wrapper.find("#task-name")
      const taskDescription = wrapper.find("#task-description")
      const taskEditButton = wrapper.find("#edit-task")
      const taskRemoveButton = wrapper.find("#remove-task")
      const taskDoneButton = wrapper.find("#toggle-task-completion-done")
      const taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      expect(taskName.text()).toBe("task #12")
      expect(taskDescription.text()).toBe("Description #12")
      expect(taskEditButton.exists()).toBe(true)
      expect(taskRemoveButton.exists()).toBe(true)
      expect(taskDoneButton.exists()).toBe(false)
      expect(taskInProgressButton.exists()).toBe(true)
    })

    it('completed task shows task name, description, edit, delete, and done buttons', () => {
      const wrapper = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":13,
                  "name":"task #13",
                  "description":"Description #13",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '13'
        },
        data () {
          return {
            task: {
              "id":13,
              "name":"task #13",
              "description":"Description #13",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const taskName = wrapper.find("#task-name")
      const taskDescription = wrapper.find("#task-description")
      const taskEditButton = wrapper.find("#edit-task")
      const taskRemoveButton = wrapper.find("#remove-task")
      const taskDoneButton = wrapper.find("#toggle-task-completion-done")
      const taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      expect(taskName.text()).toBe("task #13")
      expect(taskDescription.text()).toBe("Description #13")
      expect(taskEditButton.exists()).toBe(true)
      expect(taskRemoveButton.exists()).toBe(true)
      expect(taskDoneButton.exists()).toBe(true)
      expect(taskInProgressButton.exists()).toBe(false)
    })

    it('add sub-task component is shown', () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":14,
                  "name":"task #14",
                  "description":"Description #14",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '14'
        },
        data () {
          return {
            task: {
              "id":14,
              "name":"task #14",
              "description":"Description #14",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper.findAllComponents('sub-task-add-stub').length).toBe(1)
    })

    it('SubTasks header and list not shown when task has no sub-tasks', () => {
      const wrapper = mount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":15,
                  "name":"task #15",
                  "description":"Description #15",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '15'
        },
        data () {
          return {
            task: {
              "id":15,
              "name":"task #15",
              "description":"Description #15",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper.find('#sub-tasks-header').exists()).toBe(false)
      expect(wrapper.findAllComponents('sub-task-list-stub').length).toBe(0)
    })

    it('SubTasks header and list is shown when task has sub-tasks', () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":16,
                  "name":"task #16",
                  "description":"Description #16",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([
                  {
                    "id":52,
                    "name":"Clean up Kitchen",
                    "description":"dishes",
                    "timestamp":"2022-06-09T01:53:32.424458Z",
                    "completed":false,
                    "updated":"2022-06-11T03:45:49.837281Z",
                    "removed":true,
                    "goal":1,
                    "task":16,
                    "user":6
                  },
                  {
                    "id":97,
                    "name":"laundry",
                    "description":"all clean and start pairing down into luggage",
                    "timestamp":"2022-06-11T03:45:28.773901Z",
                    "completed":true,
                    "updated":"2022-06-13T04:40:37.130029Z",
                    "removed":false,
                    "goal":1,
                    "task":16,
                    "user":6
                  },
                  {
                    "id":102,
                    "name":"vaccuum house and tidy and pack a bit",
                    "description":"yes'm",
                    "timestamp":"2022-06-15T02:57:41.039502Z",
                    "completed":true,
                    "updated":"2022-06-15T06:02:03.624320Z",
                    "removed":false,
                    "goal":1,
                    "task":16,
                    "user":6
                  }
                ]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '16'
        },
        data () {
          return {
            task: {
              "id":16,
              "name":"task #16",
              "description":"Description #16",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper.find('#sub-tasks-header').exists()).toBe(true)
      expect(wrapper.find('#sub-tasks-header').text()).toBe('Sub-tasks')
      expect(wrapper.findAllComponents('sub-task-list-stub').length).toBe(2)
    })

  it('Task editor is not shown by default', () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":17,
                  "name":"task #17",
                  "description":"Description #17",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '17'
        },
        data () {
          return {
            task: {
              "id":17,
              "name":"task #17",
              "description":"Description #17",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper.findComponent('task-editor-stub').exists()).toBe(false)
    })

    it('Task editor is shown when editingTask is true', () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":18,
                  "name":"task #18",
                  "description":"Description #18",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId:'18'
        },
        data () {
          return {
            task: {
              "id":18,
              "name":"task #18",
              "description":"Description #18",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            },
            editingTask: true
          }
        }
      })
      expect(wrapper.findComponent('task-editor-stub').exists()).toBe(true)
      const taskName = wrapper.find("#task-name")
      const taskDescription = wrapper.find("#task-description")
      const taskEditButton = wrapper.find("#edit-task")
      const taskRemoveButton = wrapper.find("#remove-task")
      const taskDoneButton = wrapper.find("#toggle-task-completion-done")
      const taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      expect(taskName.exists()).toBe(false)
      expect(taskDescription.exists()).toBe(false)
      expect(taskEditButton.exists()).toBe(false)
      expect(taskRemoveButton.exists()).toBe(false)
      expect(taskDoneButton.exists()).toBe(false)
      expect(taskInProgressButton.exists()).toBe(false)
    })

    it('pushing edit button displays editor component correctly', async () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":19,
                  "name":"task #19",
                  "description":"Description #19",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '19'
        },
        data () {
          return {
            task: {
              "id":18,
              "name":"task #18",
              "description":"Description #18",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const taskEditButton = wrapper.find("#edit-task")
      expect(wrapper.findComponent('task-editor-stub').exists()).toBe(false)
      await taskEditButton.trigger('click')
      expect(wrapper.findComponent('task-editor-stub').exists()).toBe(true)
    })

    it('pushing toggle completion button changes completion status', async () => {
      const wrapper = shallowMount(PageTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":20,
                  "name":"task #20",
                  "description":"Description #20",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '20'
        },
        data () {
          return {
            task: {
              "id":20,
              "name":"task #20",
              "description":"Description #20",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const toggleTaskCompletionSpy = jest.spyOn(wrapper.vm, 'toggleTaskCompletion')
      let taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      let taskDoneButton = wrapper.find("#toggle-task-completion-done")
      expect(taskDoneButton.exists()).toBe(false)
      expect(taskInProgressButton.exists()).toBe(true)
      await taskInProgressButton.trigger("click")
      expect(toggleTaskCompletionSpy).toHaveBeenCalledWith({
        "id":20,
        "name":"task #20",
        "description":"Description #20",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":false,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "goal":1,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...wrapper.vm.task,
          completed: !wrapper.vm.task.completed
        }
      })
      await wrapper.setData({ task: {
          ...wrapper.vm.task,
          completed: !wrapper.vm.task.completed
        }
      })
      taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      taskDoneButton = wrapper.find("#toggle-task-completion-done")
      expect(taskDoneButton.exists()).toBe(true)
      expect(taskInProgressButton.exists()).toBe(false)
      await taskDoneButton.trigger("click")
      expect(toggleTaskCompletionSpy).toHaveBeenCalledWith({
        "id":20,
        "name":"task #20",
        "description":"Description #20",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":true,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "goal":1,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...wrapper.vm.task,
          completed: !wrapper.vm.task.completed
        }
      })
      await wrapper.setData({ task: {
          ...wrapper.vm.task,
          completed: !wrapper.vm.task.completed
        }
      })
      taskInProgressButton = wrapper.find("#toggle-task-completion-in-progress")
      taskDoneButton = wrapper.find("#toggle-task-completion-done")
      expect(taskDoneButton.exists()).toBe(false)
      expect(taskInProgressButton.exists()).toBe(true)
    })

    it('pushing remove button sets task removed to true and redirects if action completes successfully', async () => {
      const wrapper = mount(PageTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":21,
                  "name":"task #21",
                  "description":"Description #21",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '21'
        },
        data () {
          return {
            task: {
              "id":21,
              "name":"task #21",
              "description":"Description #21",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const removeTaskSpy = jest.spyOn(wrapper.vm, 'removeTask')
      const removeTaskButton = wrapper.find("#remove-task")
      await removeTaskButton.trigger('click')
      expect(removeTaskSpy).toHaveBeenCalledWith(wrapper.vm.task)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...wrapper.vm.task,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: 'PageGoalShow',
        params: {
          "goalId": "1"
        }
      })
    })

    it('pushing remove button does not redirect if action fails', async () => {
      const wrapper = mount(PageTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(false),
              getters: {
                'task': jest.fn().mockResolvedValue({
                  "id":21,
                  "name":"task #21",
                  "description":"Description #21",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "user":6
                }),
                'taskSubTasks': jest.fn().mockResolvedValue([]),
                'activeTaskSubTasks': jest.fn().mockReturnValue([]),
                'activeInProgressTaskSubTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedTaskSubTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '21'
        },
        data () {
          return {
            task: {
              "id":21,
              "name":"task #21",
              "description":"Description #21",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          }
        }
      })
      const removeTaskSpy = jest.spyOn(wrapper.vm, 'removeTask')
      const removeTaskButton = wrapper.find("#remove-task")
      await removeTaskButton.trigger('click')
      expect(removeTaskSpy).toHaveBeenCalledWith(wrapper.vm.task)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...wrapper.vm.task,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith({
        name: 'PageGoalShow',
        params: {
          "goalId": "1"
        }
      })
    })


  })

})
