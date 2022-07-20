import { shallowMount, mount } from '@vue/test-utils'
import TaskEditor from '@/components/TaskEditor.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

describe('TaskEditor.vue', () => {
  describe('set up', () => {
    it('editName and editDescription are correctly set to task name and description at set up', () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      expect(wrapper.vm.editName).toBe("task 1")
      expect(wrapper.vm.editDescription).toBe("description 1")
    })
  })

  describe('methods', () => {
    it('saveTask correctly emits saveEditedTask and finishEditingTask', async () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      wrapper.setData({
        editName: 'new task name',
        editDescription: 'new task description'
      })
      await wrapper.vm.saveTask()
      const editedTask = wrapper.emitted().saveEditedTask[0][0].editedTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingTask')
      expect(editedTask.name).toBe('new task name')
      expect(editedTask.description).toBe('new task description')
      expect(editedTask.completed).toBe(false)
      expect(editedTask.removed).toBe(false)
      expect(editedTask.user).toBe(6)
    })

    it('cancelEdit correctly emits finishEditingTask', async () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      wrapper.setData({
        editName: 'new task name',
        editDescription: 'new task description'
      })
      await wrapper.vm.cancelEdit()
      expect(wrapper.emitted()).not.toHaveProperty('saveEditedTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingTask')
    })
  })

  describe('DOM', () => {
    it('can edit task through form', async () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      const saveTaskSpy = jest.spyOn(wrapper.vm, 'saveTask')

      const editTaskForm = wrapper.find('#edit-task-form')
      const editTaskName = wrapper.find('#edit-task-name-input')
      const editTaskDescription = wrapper.find('#edit-task-description-input')

      editTaskName.setValue('new task name')
      editTaskDescription.setValue('new task description')
      await editTaskForm.trigger('submit')
      expect(saveTaskSpy).toHaveBeenCalled()

      const editedTask = wrapper.emitted().saveEditedTask[0][0].editedTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingTask')
      expect(editedTask.name).toBe('new task name')
      expect(editedTask.description).toBe('new task description')
      expect(editedTask.completed).toBe(false)
      expect(editedTask.removed).toBe(false)
      expect(editedTask.user).toBe(6)
    })


    it('pressing cancel edit button does not call saveTask method', async () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      const saveTaskSpy = jest.spyOn(wrapper.vm, 'saveTask')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editTaskName = wrapper.find('#edit-task-name-input')
      const editTaskDescription = wrapper.find('#edit-task-description-input')
      const cancelEditButton = wrapper.find('#cancel-edit-task-button')

      editTaskName.setValue('new task name')
      editTaskDescription.setValue('new task description')
      await cancelEditButton.trigger('click')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveTaskSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingTask')
    })


    it('pressing esc button also cancels editing and does not save changes', async () => {
      const wrapper = shallowMount(TaskEditor, {
        props: {
          task: {
            "id":1,
            "name":"task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        },
        global: {
          components: {
            FontAwesomeIcon
          },
          directives: {
            focus: jest.fn()
          }
        }
      })
      const saveTaskSpy = jest.spyOn(wrapper.vm, 'saveTask')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editTaskForm = wrapper.find('#edit-task-form')
      const editTaskName = wrapper.find('#edit-task-name-input')
      const editTaskDescription = wrapper.find('#edit-task-description-input')

      editTaskName.setValue('new task name')
      editTaskDescription.setValue('new task description')
      await editTaskForm.trigger('keyup.esc')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveTaskSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingTask')
    })
  })
})
