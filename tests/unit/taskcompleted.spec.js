import { mount, shallowMount } from '@vue/test-utils'
import TaskCompleted from '@/components/TaskCompleted.vue'

describe('TaskCompleted.vue', () => {
  describe('methods', () => {
    it('editTask correctly emits event', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.editTask(1)
      expect(wrapper.emitted()).toHaveProperty('editTask')
      const editTaskId = wrapper.emitted().editTask[0][0].taskId
      expect(editTaskId).toBe(1)
    })

    it('removeTask correctly emits event', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.removeTask(wrapper.vm.task)
      expect(wrapper.emitted()).toHaveProperty('removeTask')
      const removeTask = wrapper.emitted().removeTask[0][0].task
      expect(removeTask.id).toBe(1)
    })

    it('toggleTaskCompletion correctly emits event', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.toggleTaskCompletion(wrapper.vm.task)
      expect(wrapper.emitted()).toHaveProperty('toggleTaskCompletion')
      const toggledTask = wrapper.emitted().toggleTaskCompletion[0][0].task
      expect(toggledTask.id).toBe(1)
    })
  })


  describe('DOM', () => {
    it('shows task name', () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const taskName = wrapper.find("#task-name-completed")
      expect(taskName.isVisible()).toBe(true)
      expect(taskName.text()).toBe("task 1")
    })

    it('shows edit task button', () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editTaskButton = wrapper.find("#edit-task-completed")
      expect(editTaskButton.isVisible()).toBe(true)
    })

    it('shows remove task button', () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeTaskButton = wrapper.find("#remove-task-completed")
      expect(removeTaskButton.isVisible()).toBe(true)
    })

    it('shows toggle task completion button', () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleTaskButton = wrapper.find("#toggle-task-completion-done")
      expect(toggleTaskButton.isVisible()).toBe(true)
    })

    it('pressing Edit Task Button runs editTask method', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editTaskButton = wrapper.find("#edit-task-completed")
      const editTaskSpy = jest.spyOn(wrapper.vm, 'editTask')
      await editTaskButton.trigger('click')
      expect(editTaskSpy).toHaveBeenCalled()
    })

    it('pressing remove task button runs removeTask method', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeTaskButton = wrapper.find("#remove-task-completed")
      const removeTaskSpy = jest.spyOn(wrapper.vm, 'removeTask')
      await removeTaskButton.trigger('click')
      expect(removeTaskSpy).toHaveBeenCalled()
    })

    it('pressing toggle task completion button runs toggleTaskCompletion method', async () => {
      const wrapper = mount(TaskCompleted, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleTaskButton = wrapper.find("#toggle-task-completion-done")
      const toggleTaskSpy = jest.spyOn(wrapper.vm, 'toggleTaskCompletion')
      await toggleTaskButton.trigger('click')
      expect(toggleTaskSpy).toHaveBeenCalled()
    })
  })
})
