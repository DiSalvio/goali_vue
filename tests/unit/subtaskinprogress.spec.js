import { mount, shallowMount } from '@vue/test-utils'
import SubTaskInProgress from '@/components/SubTaskInProgress.vue'

describe('SubTaskInProgress.vue', () => {
  describe('methods', () => {
    it('editSubTask correctly emits event', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.editSubTask(1)
      expect(wrapper.emitted()).toHaveProperty('editSubTask')
      const editSubTaskId = wrapper.emitted().editSubTask[0][0].subTaskId
      expect(editSubTaskId).toBe(1)
    })

    it('removeSubTask correctly emits event', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.removeSubTask(wrapper.vm.subTask)
      expect(wrapper.emitted()).toHaveProperty('removeSubTask')
      const removeSubTask = wrapper.emitted().removeSubTask[0][0].subTask
      expect(removeSubTask.id).toBe(1)
    })

    it('toggleSubTaskCompletion correctly emits event', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.toggleSubTaskCompletion(wrapper.vm.subTask)
      expect(wrapper.emitted()).toHaveProperty('toggleSubTaskCompletion')
      const toggledSubTask = wrapper.emitted().toggleSubTaskCompletion[0][0].subTask
      expect(toggledSubTask.id).toBe(1)
    })
  })


  describe('DOM', () => {
    it('shows sub-task name', () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const subTaskName = wrapper.find("#sub-task-name-in-progress")
      expect(subTaskName.isVisible()).toBe(true)
      expect(subTaskName.text()).toBe("sub-task 1")
    })

    it('shows sub-task description', () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const taskDescription = wrapper.find("#sub-task-description-in-progress")
      expect(taskDescription.isVisible()).toBe(true)
      expect(taskDescription.text()).toBe("description 1")
    })

    it('shows edit sub-task button', () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editSubTaskButton = wrapper.find("#edit-sub-task-in-progress")
      expect(editSubTaskButton.isVisible()).toBe(true)
    })

    it('shows remove sub-task button', () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeSubTaskButton = wrapper.find("#remove-sub-task-in-progress")
      expect(removeSubTaskButton.isVisible()).toBe(true)
    })

    it('shows toggle sub-task completion button', () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleSubTaskButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      expect(toggleSubTaskButton.isVisible()).toBe(true)
      expect(toggleSubTaskButton.text()).toBe("In Progress")
    })

    it('pressing Edit SubTask Button runs editSubTask method', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editSubTaskButton = wrapper.find("#edit-sub-task-in-progress")
      const editSubTaskSpy = jest.spyOn(wrapper.vm, 'editSubTask')
      await editSubTaskButton.trigger('click')
      expect(editSubTaskSpy).toHaveBeenCalled()
    })

    it('pressing remove sub-task button runs removeSubTask method', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeSubTaskButton = wrapper.find("#remove-sub-task-in-progress")
      const removeSubTaskSpy = jest.spyOn(wrapper.vm, 'removeSubTask')
      await removeSubTaskButton.trigger('click')
      expect(removeSubTaskSpy).toHaveBeenCalled()
    })

    it('pressing toggle sub-task completion button runs toggleSubTaskCompletion method', async () => {
      const wrapper = mount(SubTaskInProgress, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleSubTaskButton = wrapper.find("#toggle-sub-task-completion-in-progress")
      const toggleSubTaskSpy = jest.spyOn(wrapper.vm, 'toggleSubTaskCompletion')
      await toggleSubTaskButton.trigger('click')
      expect(toggleSubTaskSpy).toHaveBeenCalled()
    })
  })
})
