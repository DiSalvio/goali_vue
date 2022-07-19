import { shallowMount, mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'

describe('TaskList.vue', () => {
  describe('methods', () => {
    it('editingThisTask correctly returns false if no task is being edited', () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
              "name":"task 2",
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
      expect(wrapper.vm.editingTaskId).toBe(null)
      expect(wrapper.vm.editingThisTask(1)).toBe(false)
    })

    it('editingThisTask correctly returns false if different task is being edited', async () => {
      const wrapper = shallowMount(TaskList, {
        data () {
          return {
            editingTaskId: 2
          }
        },
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
              "name":"task 2",
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
      expect(wrapper.vm.editingThisTask(1)).toBe(false)
    })

    it('finishingEditingTask correctly sets editingTaskId', async () => {
      const wrapper = shallowMount(TaskList, {
          data () {
            return {
              editingTaskId: 2
            }
          },
          props: {
            tasks: [
            {
              "id":1,
              "name":"task 1",
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
              "name":"task 2",
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
      expect(wrapper.vm.editingTaskId).toBe(2)
      await wrapper.vm.finishEditingTask()
      expect(wrapper.vm.editingTaskId).toBe(null)
    })


    it('editTask sets editing task id correctly', async () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
              "name":"task 2",
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
      expect(wrapper.vm.editingTaskId).toBe(null)
      await wrapper.vm.editTask({taskId: 2})
      expect(wrapper.vm.editingTaskId).toBe(2)
    })

    it('saveEditedTask emits event data correctly', async () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
      const editedTask = {
        "name":"an edited task",
        "description":"an edited description"
      }
      await wrapper.vm.saveEditedTask({editedTask: editedTask})
      const emittedEditedTask = wrapper.emitted().saveEditedTask[0][0].editedTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedTask')
      expect(emittedEditedTask.name).toBe('an edited task')
      expect(emittedEditedTask.description).toBe('an edited description')
    })


    it('toggleTaskCompletion emits event data correctly', async () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
      await wrapper.vm.toggleTaskCompletion({task:wrapper.vm.tasks[0]})
      const emittedEditedTask = wrapper.emitted().saveEditedTask[0][0].editedTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedTask')
      expect(emittedEditedTask.completed).toBe(false)
    })


    it('removeTask emits event data correctly', async () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
      expect(wrapper.vm.tasks[0].removed).toBe(false)
      await wrapper.vm.removeTask({task:wrapper.vm.tasks[0]})
      const emittedEditedTask = wrapper.emitted().saveEditedTask[0][0].editedTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedTask')
      expect(emittedEditedTask.removed).toBe(true)
    })

  })

  describe('DOM', () => {
    it('renders TaskCompleted component with completed task', () => {
      const wrapper = shallowMount(TaskList, {
          props: {
            tasks: [
            {
              "id":1,
              "name":"task 1",
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
      const completedTask = wrapper.findComponent('task-completed-stub')
      expect(completedTask.isVisible()).toBe(true)
    })

    it('renders TaskInProgress component with incomplete task', () => {
      const wrapper = shallowMount(TaskList, {
          props: {
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
            }
          ]
        }
      })
      const inProgressTask = wrapper.findComponent('task-in-progress-stub')
      expect(inProgressTask.isVisible()).toBe(true)
    })

    it('renders both completed and in progress task when provided', () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: [
            {
              "id":1,
              "name":"task 1",
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
              "name":"task 2",
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
      const completedTask = wrapper.findComponent('task-completed-stub')
      expect(completedTask.isVisible()).toBe(true)
      const inProgressTask = wrapper.findComponent('task-in-progress-stub')
      expect(inProgressTask.isVisible()).toBe(true)
    })

    it('renders no Task component with no tasks', () => {
      const wrapper = shallowMount(TaskList, {
        props: {
          tasks: []
        }
      })
      const inProgressTask = wrapper.findComponent('task-in-progress-stub')
      const completedTask = wrapper.findComponent('task-completed-stub')
      expect(inProgressTask.exists()).toBe(false)
      expect(completedTask.exists()).toBe(false)
    })

    it('renders task editor component when editingTaskId is set', () => {
      const wrapper = shallowMount(TaskList, {
        props: {
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
            }
          ]
        },
        data () {
          return {
            editingTaskId: 1
          }
        }
      })
      const inProgressTask = wrapper.findComponent('task-in-progress-stub')
      const taskEditor = wrapper.findComponent('task-editor-stub')
      expect(inProgressTask.exists()).toBe(false)
      expect(taskEditor.isVisible()).toBe(true)
    })

  })
})
