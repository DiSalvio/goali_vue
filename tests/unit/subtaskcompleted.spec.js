import { mount, shallowMount } from '@vue/test-utils'
import SubTaskCompleted from '@/components/SubTaskCompleted.vue'

describe('SubTaskCompleted.vue', () => {
  describe('methods', () => {
    it('editSubTask correctly emits event', async () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
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
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
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
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
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
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const subTaskName = wrapper.find("#sub-task-name-completed")
      expect(subTaskName.isVisible()).toBe(true)
      expect(subTaskName.text()).toBe("sub-task 1")
    })

    it('shows edit sub-task button', () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editSubTaskButton = wrapper.find("#edit-sub-task-completed")
      expect(editSubTaskButton.isVisible()).toBe(true)
    })

    it('shows remove sub-task button', () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeSubTaskButton = wrapper.find("#remove-sub-task-completed")
      expect(removeSubTaskButton.isVisible()).toBe(true)
    })

    it('shows toggle sub-task completion button', () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleSubTaskButton = wrapper.find("#toggle-sub-task-completion-done")
      expect(toggleSubTaskButton.isVisible()).toBe(true)
    })

    it('pressing Edit SubTask Button runs editSubTask method', async () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editSubTaskButton = wrapper.find("#edit-sub-task-completed")
      const editSubTaskSpy = jest.spyOn(wrapper.vm, 'editSubTask')
      await editSubTaskButton.trigger('click')
      expect(editSubTaskSpy).toHaveBeenCalled()
    })

    it('pressing remove sub-task button runs removeSubTask method', async () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeSubTaskButton = wrapper.find("#remove-sub-task-completed")
      const removeSubTaskSpy = jest.spyOn(wrapper.vm, 'removeSubTask')
      await removeSubTaskButton.trigger('click')
      expect(removeSubTaskSpy).toHaveBeenCalled()
    })

    it('pressing toggle sub-task completion button runs toggleSubTaskCompletion method', async () => {
      const wrapper = mount(SubTaskCompleted, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleSubTaskButton = wrapper.find("#toggle-sub-task-completion-done")
      const toggleSubTaskSpy = jest.spyOn(wrapper.vm, 'toggleSubTaskCompletion')
      await toggleSubTaskButton.trigger('click')
      expect(toggleSubTaskSpy).toHaveBeenCalled()
    })
  })
})
