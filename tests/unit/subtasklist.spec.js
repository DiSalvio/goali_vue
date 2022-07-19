import { shallowMount, mount } from '@vue/test-utils'
import SubTaskList from '@/components/SubTaskList.vue'

describe('SubTaskList.vue', () => {
  describe('methods', () => {
    it('editingThisSubTask correctly returns false if no sub-task is being edited', () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
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
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingSubTaskId).toBe(null)
      expect(wrapper.vm.editingThisSubTask(1)).toBe(false)
    })

    it('editingThisSubTask correctly returns false if different sub-task is being edited', async () => {
      const wrapper = shallowMount(SubTaskList, {
        data () {
          return {
            editingSubTaskId: 2
          }
        },
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
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
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingThisSubTask(1)).toBe(false)
    })

    it('finishingEditingSubTask correctly sets editingSubTaskId', async () => {
      const wrapper = shallowMount(SubTaskList, {
          data () {
            return {
              editingSubTaskId: 2
            }
          },
          props: {
            subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
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
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingSubTaskId).toBe(2)
      await wrapper.vm.finishEditingSubTask()
      expect(wrapper.vm.editingSubTaskId).toBe(null)
    })


    it('editSubTask sets editing sub-task id correctly', async () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
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
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingSubTaskId).toBe(null)
      await wrapper.vm.editSubTask({subTaskId: 2})
      expect(wrapper.vm.editingSubTaskId).toBe(2)
    })

    it('saveEditedSubTask emits event data correctly', async () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      const editedSubTask = {
        "name":"an edited sub-task",
        "description":"an edited description"
      }
      await wrapper.vm.saveEditedSubTask({editedSubTask: editedSubTask})
      const emittedEditedSubTask = wrapper.emitted().saveEditedSubTask[0][0].editedSubTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedSubTask')
      expect(emittedEditedSubTask.name).toBe('an edited sub-task')
      expect(emittedEditedSubTask.description).toBe('an edited description')
    })


    it('toggleSubTaskCompletion emits event data correctly', async () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      await wrapper.vm.toggleSubTaskCompletion({subTask:wrapper.vm.subTasks[0]})
      const emittedEditedSubTask = wrapper.emitted().saveEditedSubTask[0][0].editedSubTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedSubTask')
      expect(emittedEditedSubTask.completed).toBe(false)
    })


    it('removeSubTask emits event data correctly', async () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.subTasks[0].removed).toBe(false)
      await wrapper.vm.removeSubTask({subTask:wrapper.vm.subTasks[0]})
      const emittedEditedSubTask = wrapper.emitted().saveEditedSubTask[0][0].editedSubTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedSubTask')
      expect(emittedEditedSubTask.removed).toBe(true)
    })

  })

  describe('DOM', () => {
    it('renders SubTaskCompleted component with completed sub-task', () => {
      const wrapper = shallowMount(SubTaskList, {
          props: {
            subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      const completedSubTask = wrapper.findComponent('sub-task-completed-stub')
      expect(completedSubTask.isVisible()).toBe(true)
    })

    it('renders SubTaskInProgress component with incomplete sub-task', () => {
      const wrapper = shallowMount(SubTaskList, {
          props: {
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
            }
          ]
        }
      })
      const inProgressSubTask = wrapper.findComponent('sub-task-in-progress-stub')
      expect(inProgressSubTask.isVisible()).toBe(true)
    })

    it('renders both completed and in progress sub-task when provided', () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: [
            {
              "id":1,
              "name":"sub-task 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
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
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "goal":1,
              "user":6
            }
          ]
        }
      })
      const completedSubTask = wrapper.findComponent('sub-task-completed-stub')
      expect(completedSubTask.isVisible()).toBe(true)
      const inProgressSubTask = wrapper.findComponent('sub-task-in-progress-stub')
      expect(inProgressSubTask.isVisible()).toBe(true)
    })

    it('renders no SubTask component with no sub-tasks', () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
          subTasks: []
        }
      })
      const inProgressSubTask = wrapper.findComponent('sub-task-in-progress-stub')
      const completedSubTask = wrapper.findComponent('sub-task-completed-stub')
      expect(inProgressSubTask.exists()).toBe(false)
      expect(completedSubTask.exists()).toBe(false)
    })

    it('renders sub-task editor component when editingSubTaskId is set', () => {
      const wrapper = shallowMount(SubTaskList, {
        props: {
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
            }
          ]
        },
        data () {
          return {
            editingSubTaskId: 1
          }
        }
      })
      const inProgressSubTask = wrapper.findComponent('sub-task-in-progress-stub')
      const subTaskEditor = wrapper.findComponent('sub-task-editor-stub')
      expect(inProgressSubTask.exists()).toBe(false)
      expect(subTaskEditor.isVisible()).toBe(true)
    })

  })
})
