import store from '@/store'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import PageGoalShow from '@/views/PageGoalShow.vue'
import { nextTick } from 'vue'

describe('PageGoalShow.vue', () => {

  describe('matches previous html snapshots', () => {

    it('when there is a goal with no tasks', async () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                    "id":1,
                    "name":"goal #1",
                    "description":"description #1",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":false,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                }),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '1'
        },
        data () {
          return {
            editingGoal: false,
            goal: {
              "id":2,
              "name":"Goal #2",
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
    it('when there is a goal with multiple tasks', async () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                    "id":2,
                    "name":"goal #2",
                    "description":"description #2",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":false,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":2,"user":6
                  },
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":2,
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
                    "goal":2,
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
                    "goal":2,
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
                    "goal":2,
                    "user":6
                  }
                ]),
                'activeGoalTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":2,"user":6
                  },
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":2,
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
                    "goal":2,
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
                    "goal":2,
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
                    "goal":2,
                    "user":6
                  }
                ]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([
                  {
                    "id":9,
                    "name":"Add browser tests",
                    "description":"add em",
                    "timestamp":"2022-04-15T07:21:11.342684Z",
                    "completed":false,
                    "updated":"2022-04-15T07:21:11.342709Z",
                    "removed":false,
                    "goal":2,
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
                    "goal":2,
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
                    "goal":2,
                    "user":6
                  }
                ]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([
                  {
                    "id":5,
                    "name":"goali_vue tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T07:02:53.672745Z",
                    "completed":true,
                    "updated":"2022-05-01T04:58:58.062133Z",
                    "removed":false,
                    "goal":2,"user":6
                  },
                  {
                    "id":2,
                    "name":"goali_api tests run on commit push",
                    "description":"every github commit runs tests remotely",
                    "timestamp":"2022-04-15T06:59:44.701041Z",
                    "completed":true,
                    "updated":"2022-04-24T05:39:29.752105Z",
                    "removed":false,
                    "goal":2,
                    "user":6
                  }
                ])
              }
            }
          }
        },
        propsData: {
          goalId: '2'
        },
        data () {
          return {
            editingGoal: false,
            goal: {
              "id":2,
              "name":"Goal #2",
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
    it('dispatches fetchGoalTasks on created', async () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                    "id":3,
                    "name":"goal #3",
                    "description":"description #3",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":false,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                }),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '3'
        },
        data () {
          return {
            editingGoal: false,
            goal: {
              "id":3,
              "name":"Goal #3",
              "description":"Description #3",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('fetchGoalTasks', {
        goalId: "3"
      })
    })
  })

  describe('computed properties', () => {
    it('are all accessible', async () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          plugins: [store]
        },
        data () {
          return {
            goal: {
              "id":4,
              "name":"Goal #4",
              "description":"Description #4",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(vm).toEqual(
        expect.objectContaining({
          'goal': expect.any(Object),
          'goalTasks': expect.any(Array),
          'activeGoalTasks': expect.any(Array),
          'activeInProgressGoalTasks': expect.any(Array),
          'activeCompletedGoalTasks': expect.any(Array)
        })
      )
    })
  })

  describe('methods', () => {
    it('editGoal sets editingGoal to true', async () => {
      const { vm } = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":5,
                  "name":"Goal #5",
                  "description":"Description #5",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '5'
        },
        data () {
          return {
            goal: {
              "id":5,
              "name":"Goal #5",
              "description":"Description #5",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(vm.editingGoal).toBe(false)
      vm.editGoal()
      expect(vm.editingGoal).toBe(true)
    })

    it('finishEditingGoal correctly sets editingGoal to false', () => {
      const { vm } = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":5,
                  "name":"Goal #5",
                  "description":"Description #5",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '5'
        },
        data () {
          return {
            goal: {
              "id":5,
              "name":"Goal #5",
              "description":"Description #5",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            editingGoal: true
          }
        }
      })
      vm.finishEditingGoal()
      expect(vm.editingGoal).toBe(false)
    })

    it('saveEditedGoal correctly dispatches saveEditedGoal action with correct params', () => {
      const { vm } = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":7,
                  "name":"Goal #7",
                  "description":"Description #7",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '7'
        },
        data () {
          return {
            goal: {
              "id":7,
              "name":"Goal #7",
              "description":"Description #7",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            editingGoal: true
          }
        }
      })
      const editedGoal = {
        ...vm.goal,
        "name":"Goal #7",
        "description":"Description #7",
      }
      vm.saveEditedGoal({ editedGoal })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', { editedGoal })
    })

    it('toggleGoalCompletion dispatches saveEditedGoal with flipped completed param', () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":8,
                  "name":"Goal #8",
                  "description":"Description #8",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '8'
        },
        data () {
          return {
            goal: {
              "id":8,
              "name":"Goal #8",
              "description":"Description #8",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      vm.toggleGoalCompletion(vm.goal)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...vm.goal,
          completed: true
        }
      })
    })

    it('removeGoal dispatches saveEditedGoal with flipped removed param and redirects', async () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":8,
                  "name":"Goal #8",
                  "description":"Description #8",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '8'
        },
        data () {
          return {
            goal: {
              "id":8,
              "name":"Goal #8",
              "description":"Description #8",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      await vm.removeGoal(vm.goal)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...vm.goal,
          removed: true
        }
      })
      expect(vm.$router.push).toHaveBeenCalledWith({ name: 'PageHome' })
    })

    it('addTask dispatches createTask action with current goalId', () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":9,
                  "name":"Goal #9",
                  "description":"Description #9",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '9'
        },
        data () {
          return {
            goal: {
              "id":9,
              "name":"Goal #9",
              "description":"Description #9",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const newTask = {
        "name":"Test Vue Components",
        "description":"test em all",
      }
      vm.addTask({ newTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('createTask', {
        newTask: {
          ...newTask,
          goal: 9
        }
      })
     })

    it('saveEditedTask', () => {
      const { vm } = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":19,
                  "name":"Goal #19",
                  "description":"Description #19",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '19'
        },
        data () {
          return {
            goal: {
              "id":19,
              "name":"Goal #19",
              "description":"Description #19",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const editedTask = {
        "id":9,
        "name":"Add browser tests",
        "description":"run them on a test server automatically after deployments",
        "timestamp":"2022-04-15T07:21:11.342684Z",
        "completed":false,
        "updated":"2022-04-15T07:21:11.342709Z",
        "removed":false,
        "goal":19,
        "user":6
      }
      vm.saveEditedTask({ editedTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedTask', {
        editedTask: {
          ...editedTask,
        }
      })
    })
  })

  describe('DOM', () => {

    it('active goal shows goal name, description, edit, delete, and in progress buttons', () => {
      const wrapper = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":12,
                  "name":"Goal #12",
                  "description":"Description #12",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '12'
        },
        data () {
          return {
            goal: {
              "id":12,
              "name":"Goal #12",
              "description":"Description #12",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const goalName = wrapper.find("#goal-name")
      const goalDescription = wrapper.find("#goal-description")
      const goalEditButton = wrapper.find("#edit-goal")
      const goalRemoveButton = wrapper.find("#remove-goal")
      const goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      const goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      expect(goalName.text()).toBe("Goal #12")
      expect(goalDescription.text()).toBe("Description #12")
      expect(goalEditButton.exists()).toBe(true)
      expect(goalRemoveButton.exists()).toBe(true)
      expect(goalDoneButton.exists()).toBe(false)
      expect(goalInProgressButton.exists()).toBe(true)
    })

    it('completed goal shows goal name, description, edit, delete, and done buttons', () => {
      const wrapper = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":13,
                  "name":"Goal #13",
                  "description":"Description #13",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '13'
        },
        data () {
          return {
            goal: {
              "id":13,
              "name":"Goal #13",
              "description":"Description #13",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const goalName = wrapper.find("#goal-name")
      const goalDescription = wrapper.find("#goal-description")
      const goalEditButton = wrapper.find("#edit-goal")
      const goalRemoveButton = wrapper.find("#remove-goal")
      const goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      const goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      expect(goalName.text()).toBe("Goal #13")
      expect(goalDescription.text()).toBe("Description #13")
      expect(goalEditButton.exists()).toBe(true)
      expect(goalRemoveButton.exists()).toBe(true)
      expect(goalDoneButton.exists()).toBe(true)
      expect(goalInProgressButton.exists()).toBe(false)
    })

    it('add task component is shown', () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":14,
                  "name":"Goal #14",
                  "description":"Description #14",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockResolvedValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '14'
        },
        data () {
          return {
            goal: {
              "id":14,
              "name":"Goal #14",
              "description":"Description #14",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(wrapper.findAllComponents('task-add-stub').length).toBe(1)
    })

    it('Tasks header and list not shown when goal has no tasks', () => {
      const wrapper = mount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":15,
                  "name":"Goal #15",
                  "description":"Description #15",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '15'
        },
        data () {
          return {
            goal: {
              "id":15,
              "name":"Goal #15",
              "description":"Description #15",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(wrapper.find('#tasks-header').exists()).toBe(false)
      expect(wrapper.findAllComponents('task-list-stub').length).toBe(0)
    })

    it('Tasks header and list is shown when goal has tasks', () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":16,
                  "name":"Goal #16",
                  "description":"Description #16",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([
                  {
                    "id":52,
                    "name":"Clean up Kitchen",
                    "description":"dishes",
                    "timestamp":"2022-06-09T01:53:32.424458Z",
                    "completed":false,
                    "updated":"2022-06-11T03:45:49.837281Z",
                    "removed":true,
                    "goal":9,
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
                    "goal":9,
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
                    "goal":9,
                    "user":6
                  }
                ]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '16'
        },
        data () {
          return {
            goal: {
              "id":16,
              "name":"Goal #16",
              "description":"Description #16",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(wrapper.find('#tasks-header').exists()).toBe(true)
      expect(wrapper.find('#tasks-header').text()).toBe('Tasks')
      expect(wrapper.findAllComponents('task-list-stub').length).toBe(2)
    })

  it('Task editor is not shown by default', () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":17,
                  "name":"Goal #17",
                  "description":"Description #17",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '17'
        },
        data () {
          return {
            goal: {
              "id":17,
              "name":"Goal #17",
              "description":"Description #17",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      expect(wrapper.findComponent('goal-editor-stub').exists()).toBe(false)
    })

    it('Task editor is shown when editingGoal is true', () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":18,
                  "name":"Goal #18",
                  "description":"Description #18",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '18'
        },
        data () {
          return {
            goal: {
              "id":18,
              "name":"Goal #18",
              "description":"Description #18",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            },
            editingGoal: true
          }
        }
      })
      expect(wrapper.findComponent('goal-editor-stub').exists()).toBe(true)
      const goalName = wrapper.find("#goal-name")
      const goalDescription = wrapper.find("#goal-description")
      const goalEditButton = wrapper.find("#edit-goal")
      const goalRemoveButton = wrapper.find("#remove-goal")
      const goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      const goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      expect(goalName.exists()).toBe(false)
      expect(goalDescription.exists()).toBe(false)
      expect(goalEditButton.exists()).toBe(false)
      expect(goalRemoveButton.exists()).toBe(false)
      expect(goalDoneButton.exists()).toBe(false)
      expect(goalInProgressButton.exists()).toBe(false)
    })

    it('pushing edit button displays editor component correctly', async () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":18,
                  "name":"Goal #18",
                  "description":"Description #18",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '18'
        },
        data () {
          return {
            goal: {
              "id":18,
              "name":"Goal #18",
              "description":"Description #18",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const goalEditButton = wrapper.find("#edit-goal")
      expect(wrapper.findComponent('goal-editor-stub').exists()).toBe(false)
      await goalEditButton.trigger('click')
      expect(wrapper.findComponent('goal-editor-stub').exists()).toBe(true)
    })

    it('pushing toggle completion button changes completion status', async () => {
      const wrapper = shallowMount(PageGoalShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":18,
                  "name":"Goal #18",
                  "description":"Description #18",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '18'
        },
        data () {
          return {
            goal: {
              "id":18,
              "name":"Goal #18",
              "description":"Description #18",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const toggleGoalCompletionSpy = jest.spyOn(wrapper.vm, 'toggleGoalCompletion')
      let goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      let goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      expect(goalDoneButton.exists()).toBe(false)
      expect(goalInProgressButton.exists()).toBe(true)
      await goalInProgressButton.trigger("click")
      expect(toggleGoalCompletionSpy).toHaveBeenCalledWith({
        "id":18,
        "name":"Goal #18",
        "description":"Description #18",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":false,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...wrapper.vm.goal,
          completed: !wrapper.vm.goal.completed
        }
      })
      await wrapper.setData({ goal: {
          ...wrapper.vm.goal,
          completed: !wrapper.vm.goal.completed
        }
      })
      goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      expect(goalDoneButton.exists()).toBe(true)
      expect(goalInProgressButton.exists()).toBe(false)
      await goalDoneButton.trigger("click")
      expect(toggleGoalCompletionSpy).toHaveBeenCalledWith({
        "id":18,
        "name":"Goal #18",
        "description":"Description #18",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":true,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...wrapper.vm.goal,
          completed: !wrapper.vm.goal.completed
        }
      })
      await wrapper.setData({ goal: {
          ...wrapper.vm.goal,
          completed: !wrapper.vm.goal.completed
        }
      })
      goalInProgressButton = wrapper.find("#toggle-goal-completion-in-progress")
      goalDoneButton = wrapper.find("#toggle-goal-completion-done")
      expect(goalDoneButton.exists()).toBe(false)
      expect(goalInProgressButton.exists()).toBe(true)
    })

    it('pushing remove button sets goal removed to true and redirects if action completes successfully', async () => {
      const wrapper = mount(PageGoalShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":20,
                  "name":"Goal #20",
                  "description":"Description #20",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '20'
        },
        data () {
          return {
            goal: {
              "id":20,
              "name":"Goal #20",
              "description":"Description #20",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const removeGoalSpy = jest.spyOn(wrapper.vm, 'removeGoal')
      const removeGoalButton = wrapper.find("#remove-goal")
      await removeGoalButton.trigger('click')
      expect(removeGoalSpy).toHaveBeenCalledWith(wrapper.vm.goal)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...wrapper.vm.goal,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'PageHome' })
    })

    it('pushing remove button does not redirect if action fails', async () => {
      const wrapper = mount(PageGoalShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(false),
              getters: {
                'goal': jest.fn().mockResolvedValue({
                  "id":21,
                  "name":"Goal #21",
                  "description":"Description #21",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "user":6
                }),
                'goalTasks': jest.fn().mockResolvedValue([]),
                'activeGoalTasks': jest.fn().mockReturnValue([]),
                'activeInProgressGoalTasks': jest.fn().mockResolvedValue([]),
                'activeCompletedGoalTasks': jest.fn().mockResolvedValue([])
              }
            }
          }
        },
        propsData: {
          goalId: '21'
        },
        data () {
          return {
            goal: {
              "id":21,
              "name":"Goal #21",
              "description":"Description #21",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "user":6
            }
          }
        }
      })
      const removeGoalSpy = jest.spyOn(wrapper.vm, 'removeGoal')
      const removeGoalButton = wrapper.find("#remove-goal")
      await removeGoalButton.trigger('click')
      expect(removeGoalSpy).toHaveBeenCalledWith(wrapper.vm.goal)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal: {
          ...wrapper.vm.goal,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith({ name: 'PageHome' })
    })


  })

})
