import { shallowMount, mount } from '@vue/test-utils'
import SubTaskEditor from '@/components/SubTaskEditor.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

describe('SubTaskEditor.vue', () => {
  describe('set up', () => {
    it('editName and editDescription are correctly set to sub-task name and description at set up', () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
      expect(wrapper.vm.editName).toBe("sub-task 1")
      expect(wrapper.vm.editDescription).toBe("description 1")
    })
  })

  describe('methods', () => {
    it('saveSubTask correctly emits saveEditedSubTask and finishEditingSubTask', async () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
        editName: 'new sub-task name',
        editDescription: 'new sub-task description'
      })
      await wrapper.vm.saveSubTask()
      const editedSubTask = wrapper.emitted().saveEditedSubTask[0][0].editedSubTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedSubTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingSubTask')
      expect(editedSubTask.name).toBe('new sub-task name')
      expect(editedSubTask.description).toBe('new sub-task description')
      expect(editedSubTask.completed).toBe(false)
      expect(editedSubTask.removed).toBe(false)
      expect(editedSubTask.user).toBe(6)
    })

    it('cancelEdit correctly emits finishEditingSubTask', async () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
        editName: 'new sub-task name',
        editDescription: 'new sub-task description'
      })
      await wrapper.vm.cancelEdit()
      expect(wrapper.emitted()).not.toHaveProperty('saveEditedSubTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingSubTask')
    })
  })

  describe('DOM', () => {
    it('can edit sub-task through form', async () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
      const saveSubTaskSpy = jest.spyOn(wrapper.vm, 'saveSubTask')

      const editSubTaskForm = wrapper.find('#edit-sub-task-form')
      const editSubTaskName = wrapper.find('#edit-sub-task-name-input')
      const editSubTaskDescription = wrapper.find('#edit-sub-task-description-input')

      editSubTaskName.setValue('new sub-task name')
      editSubTaskDescription.setValue('new sub-task description')
      await editSubTaskForm.trigger('submit')
      expect(saveSubTaskSpy).toHaveBeenCalled()

      const editedSubTask = wrapper.emitted().saveEditedSubTask[0][0].editedSubTask
      expect(wrapper.emitted()).toHaveProperty('saveEditedSubTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingSubTask')
      expect(editedSubTask.name).toBe('new sub-task name')
      expect(editedSubTask.description).toBe('new sub-task description')
      expect(editedSubTask.completed).toBe(false)
      expect(editedSubTask.removed).toBe(false)
      expect(editedSubTask.user).toBe(6)
    })


    it('pressing cancel edit button does not call saveSubTask method', async () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
      const saveSubTaskSpy = jest.spyOn(wrapper.vm, 'saveSubTask')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editSubTaskName = wrapper.find('#edit-sub-task-name-input')
      const editSubTaskDescription = wrapper.find('#edit-sub-task-description-input')
      const cancelEditButton = wrapper.find('#cancel-sub-task-edit-button')

      editSubTaskName.setValue('new sub-task name')
      editSubTaskDescription.setValue('new sub-task description')
      await cancelEditButton.trigger('click')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveSubTaskSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedSubTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingSubTask')
    })


    it('pressing esc button also cancels editing and does not save changes', async () => {
      const wrapper = shallowMount(SubTaskEditor, {
        props: {
          subTask: {
            "id":1,
            "name":"sub-task 1",
            "description":"description 1",
            "timestamp":"2022-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"202022-04-15T07:25:23.269770Z",
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
      const saveSubTaskSpy = jest.spyOn(wrapper.vm, 'saveSubTask')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editSubTaskForm = wrapper.find('#edit-sub-task-form')
      const editSubTaskName = wrapper.find('#edit-sub-task-name-input')
      const editSubTaskDescription = wrapper.find('#edit-sub-task-description-input')

      editSubTaskName.setValue('new sub-task name')
      editSubTaskDescription.setValue('new sub-task description')
      await editSubTaskForm.trigger('keyup.esc')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveSubTaskSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedSubTask')
      expect(wrapper.emitted()).toHaveProperty('finishEditingSubTask')
    })
  })
})
