import store from '@/store'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import PageSubTaskShow from '@/views/PageSubTaskShow.vue'

describe('PageSubTaskShow.vue', () => {

  describe('matches previous html snapshots', () => {

    it('when there is just a sub-task being shown', async () => {
      const wrapper = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":1,
                  "name":"sub-task #1",
                  "description":"sub-task description #1",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '1'
        },
        data () {
          return {
            subTask: {
              "id":1,
              "name":"sub-task #1",
              "description":"sub-task description #1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal": 1,
              "task":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper).toMatchSnapshot()
    })

  })

  describe('computed properties', () => {
    it('are all accessible', async () => {
      const { vm } = mount(PageSubTaskShow, {
        global: {
          plugins: [store]
        },
        data () {
          return {
            subTask: {
              "id":2,
              "name":"sub-task #2",
              "description":"sub-task description #2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal": 1,
              "task":1,
              "user":6
            }
          }
        }
      })
      expect(vm).toEqual(
        expect.objectContaining({
          'subTask': expect.any(Object),
        })
      )
    })
  })

  describe('methods', () => {
    it('editSubTask sets editingSubTask to true', async () => {
      const { vm } = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":3,
                  "name":"sub-task #3",
                  "description":"sub-task description #3",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal": 1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '3'
        },
        data () {
          return {
            subTask: {
              "id":3,
              "name":"sub-task #3",
              "description":"sub-task description #3",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      expect(vm.editingSubTask).toBe(false)
      vm.editSubTask()
      expect(vm.editingSubTask).toBe(true)
    })

    it('finishEditingSubTask correctly sets editingSubTask to false', () => {
      const { vm } = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":4,
                  "name":"sub-task #4",
                  "description":"sub-task description #4",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '4'
        },
        data () {
          return {
            subTask: {
              "id":4,
              "name":"sub-task #4",
              "description":"sub-task description #4",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            },
            editingSubTask: true
          }
        }
      })
      expect(vm.editingSubTask).toBe(true)
      vm.finishEditingSubTask()
      expect(vm.editingSubTask).toBe(false)
    })

    it('saveEditedSubTask correctly dispatches saveEditedSubTask action with correct params', () => {
      const { vm } = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":5,
                  "name":"sub-task #5",
                  "description":"sub-task description #5",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T07:25:23.269770Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '5'
        },
        data () {
          return {
            subTask: {
              "id":5,
              "name":"sub-task #5",
              "description":"sub-task description #5",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            },
            editingSubTask: true
          }
        }
      })
      const editedSubTask = {
        ...vm.subTask,
        "name":"Edited Sub-Task #5",
        "description":"Edited Sub-Task Description #5",
      }
      vm.saveEditedSubTask({ editedSubTask })
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', { editedSubTask })
    })

    it('toggleSubTaskCompletion dispatches saveEditedSubTask with flipped completed param', () => {
      const { vm } = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":6,
                  "name":"sub-task #6",
                  "description":"Description #6",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '6'
        },
        data () {
          return {
            subTask: {
              "id":6,
              "name":"sub-task #6",
              "description":"Description #6",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      vm.toggleSubTaskCompletion(vm.subTask)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...vm.subTask,
          completed: true
        }
      })
    })

    it('removeSubTask dispatches saveEditedSubTask with flipped removed param and redirects', async () => {
      const { vm } = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":7,
                  "name":"sub-task #7",
                  "description":"sub-task description #9",
                  "timestamp":"2022-04-15T06:58:03.382281Z",
                  "completed":false,
                  "updated":"2022-04-15T08:25:23.269880Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '7'
        },
        data () {
          return {
            subTask: {
              "id":7,
              "name":"sub-task #7",
              "description":"Description #7",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T08:25:23.269880Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      await vm.removeSubTask(vm.subTask)
      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...vm.subTask,
          removed: true
        }
      })
      expect(vm.$router.push).toHaveBeenCalledWith({ 
        name: 'PageTaskShow',
        params: {
          "goalId":vm.goalId,
          "taskId":vm.taskId
        }
      })
    })

  })

  describe('DOM', () => {

    it('active sub-task shows sub-task name, description, edit, delete, and in progress buttons', () => {
      const wrapper = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":8,
                  "name":"sub-task #8",
                  "description":"sub-task description #8",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '8'
        },
        data () {
          return {
            subTask: {
              "id":8,
              "name":"sub-task #8",
              "description":"sub-task description #8",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const subTaskName = wrapper.find("#sub-task-name")
      const subTaskDescription = wrapper.find("#sub-task-description")
      const subTaskEditButton = wrapper.find("#edit-sub-task")
      const subTaskRemoveButton = wrapper.find("#remove-sub-task")
      const subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      const subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      expect(subTaskName.text()).toBe("sub-task #8")
      expect(subTaskDescription.text()).toBe("sub-task description #8")
      expect(subTaskEditButton.exists()).toBe(true)
      expect(subTaskRemoveButton.exists()).toBe(true)
      expect(subTaskDoneButton.exists()).toBe(false)
      expect(subTaskInProgressButton.exists()).toBe(true)
    })

    it('completed sub-task shows sub-task name, description, edit, delete, and done buttons', () => {
      const wrapper = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":9,
                  "name":"sub-task #9",
                  "description":"sub-task description #9",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '9'
        },
        data () {
          return {
            subTask: {
              "id":9,
              "name":"sub-task #9",
              "description":"sub-task description #9",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const subTaskName = wrapper.find("#sub-task-name")
      const subTaskDescription = wrapper.find("#sub-task-description")
      const subTaskEditButton = wrapper.find("#edit-sub-task")
      const subTaskRemoveButton = wrapper.find("#remove-sub-task")
      const subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      const subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      expect(subTaskName.text()).toBe("sub-task #9")
      expect(subTaskDescription.text()).toBe("sub-task description #9")
      expect(subTaskEditButton.exists()).toBe(true)
      expect(subTaskRemoveButton.exists()).toBe(true)
      expect(subTaskDoneButton.exists()).toBe(true)
      expect(subTaskInProgressButton.exists()).toBe(false)
    })


  it('Sub task editor is not shown by default', () => {
      const wrapper = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":10,
                  "name":"sub-task #10",
                  "description":"sub-task description #10",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '10'
        },
        data () {
          return {
            subTask: {
              "id":10,
              "name":"sub-task #10",
              "description":"sub-task description #10",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      expect(wrapper.findComponent('sub-task-editor-stub').exists()).toBe(false)
    })

    it('Sub-Task editor is shown when editingSubTask is true', () => {
      const wrapper = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":11,
                  "name":"sub-task #11",
                  "description":"sub-task description #11",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId:'1',
          subTaskId: '11'
        },
        data () {
          return {
            subTask: {
              "id":11,
              "name":"sub-task #11",
              "description":"sub-task description #11",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            },
            editingSubTask: true
          }
        }
      })
      expect(wrapper.findComponent('sub-task-editor-stub').exists()).toBe(true)
      const subTaskName = wrapper.find("#sub-task-name")
      const subTaskDescription = wrapper.find("#sub-task-description")
      const subTaskEditButton = wrapper.find("#edit-sub-task")
      const subTaskRemoveButton = wrapper.find("#remove-sub-task")
      const subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      const subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      expect(subTaskName.exists()).toBe(false)
      expect(subTaskDescription.exists()).toBe(false)
      expect(subTaskEditButton.exists()).toBe(false)
      expect(subTaskRemoveButton.exists()).toBe(false)
      expect(subTaskDoneButton.exists()).toBe(false)
      expect(subTaskInProgressButton.exists()).toBe(false)
    })

    it('pushing edit button displays editor component correctly', async () => {
      const wrapper = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":12,
                  "name":"sub-task #12",
                  "description":"sub-task description #12",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":true,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '12'
        },
        data () {
          return {
            subTask: {
              "id":12,
              "name":"sub-task #12",
              "description":"sub-task description #12",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":true,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const subTaskEditButton = wrapper.find("#edit-sub-task")
      expect(wrapper.findComponent('sub-task-editor-stub').exists()).toBe(false)
      await subTaskEditButton.trigger('click')
      expect(wrapper.findComponent('sub-task-editor-stub').exists()).toBe(true)
    })

    it('pushing toggle completion button changes completion status', async () => {
      const wrapper = shallowMount(PageSubTaskShow, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":13,
                  "name":"sub-task #13",
                  "description":"Description #13",
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
          taskId: '1',
          subTaskId: '13'
        },
        data () {
          return {
            subTask: {
              "id":13,
              "name":"sub-task #13",
              "description":"sub-task description #13",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const toggleSubTaskCompletionSpy = jest.spyOn(wrapper.vm, 'toggleSubTaskCompletion')
      let subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      let subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      expect(subTaskDoneButton.exists()).toBe(false)
      expect(subTaskInProgressButton.exists()).toBe(true)
      await subTaskInProgressButton.trigger("click")
      expect(toggleSubTaskCompletionSpy).toHaveBeenCalledWith({
        "id":13,
        "name":"sub-task #13",
        "description":"sub-task description #13",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":false,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...wrapper.vm.subTask,
          completed: !wrapper.vm.subTask.completed
        }
      })
      await wrapper.setData({ subTask: {
          ...wrapper.vm.subTask,
          completed: !wrapper.vm.subTask.completed
        }
      })
      subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      expect(subTaskDoneButton.exists()).toBe(true)
      expect(subTaskInProgressButton.exists()).toBe(false)
      await subTaskDoneButton.trigger("click")
      expect(toggleSubTaskCompletionSpy).toHaveBeenCalledWith({
        "id":13,
        "name":"sub-task #13",
        "description":"sub-task description #13",
        "timestamp":"2022-04-15T06:59:03.392291Z",
        "completed":true,
        "updated":"2022-04-15T09:25:23.269990Z",
        "removed":false,
        "goal":1,
        "task":1,
        "user":6
      })
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...wrapper.vm.subTask,
          completed: !wrapper.vm.subTask.completed
        }
      })
      await wrapper.setData({ subTask: {
          ...wrapper.vm.subTask,
          completed: !wrapper.vm.subTask.completed
        }
      })
      subTaskInProgressButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      subTaskDoneButton = wrapper.find("#toggle-sub-task-completion-done")
      expect(subTaskDoneButton.exists()).toBe(false)
      expect(subTaskInProgressButton.exists()).toBe(true)
    })

    it('pushing remove button sets sub-task removed to true and redirects if action completes successfully', async () => {
      const wrapper = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":14,
                  "name":"sub-task #14",
                  "description":"sub-task description #14",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '14'
        },
        data () {
          return {
            subTask: {
              "id":14,
              "name":"sub-task #14",
              "description":"sub-task description #14",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const removeSubTaskSpy = jest.spyOn(wrapper.vm, 'removeSubTask')
      const removeSubTaskButton = wrapper.find("#remove-sub-task")
      await removeSubTaskButton.trigger('click')
      expect(removeSubTaskSpy).toHaveBeenCalledWith(wrapper.vm.subTask)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...wrapper.vm.subTask,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: 'PageTaskShow',
        params: {
          "goalId": "1",
          "taskId": "1"
        }
      })
    })

    it('pushing remove button does not redirect if action fails', async () => {
      const wrapper = mount(PageSubTaskShow, {
        global: {
          mocks: {
            $router: {
              push: jest.fn().mockResolvedValue(true)
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(false),
              getters: {
                'subTask': jest.fn().mockResolvedValue({
                  "id":15,
                  "name":"sub-task #15",
                  "description":"Description #15",
                  "timestamp":"2022-04-15T06:59:03.392291Z",
                  "completed":false,
                  "updated":"2022-04-15T09:25:23.269990Z",
                  "removed":false,
                  "goal":1,
                  "task":1,
                  "user":6
                })
              }
            }
          }
        },
        propsData: {
          goalId: '1',
          taskId: '1',
          subTaskId: '15'
        },
        data () {
          return {
            subTask: {
              "id":15,
              "name":"sub-task #15",
              "description":"Description #15",
              "timestamp":"2022-04-15T06:59:03.392291Z",
              "completed":false,
              "updated":"2022-04-15T09:25:23.269990Z",
              "removed":false,
              "goal":1,
              "task":1,
              "user":6
            }
          }
        }
      })
      const removeSubTaskSpy = jest.spyOn(wrapper.vm, 'removeSubTask')
      const removeSubTaskButton = wrapper.find("#remove-sub-task")
      await removeSubTaskButton.trigger('click')
      expect(removeSubTaskSpy).toHaveBeenCalledWith(wrapper.vm.subTask)
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('saveEditedSubTask', {
        editedSubTask: {
          ...wrapper.vm.subTask,
          removed: true
        }
      })
      expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith({
        name: 'PageTaskShow',
        params: {
          "goalId": "1",
          "taskId": "1",
          "subTaskId": "21"
        }
      })
    })


  })

})
