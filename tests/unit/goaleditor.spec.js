import { shallowMount, mount } from '@vue/test-utils'
import GoalEditor from '@/components/GoalEditor.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

describe('GoalEditor.vue', () => {
  describe('set up', () => {
    it('editName and editDescription are correctly set to goal name and description at set up', () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
      expect(wrapper.vm.editName).toBe("goal 1")
      expect(wrapper.vm.editDescription).toBe("description 1")
    })
  })

  describe('methods', () => {
    it('saveGoal correctly emits saveEditedGoal and finishEditingGoal', async () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
        editName: 'new goal name',
        editDescription: 'new goal description'
      })
      await wrapper.vm.saveGoal()
      const editedGoal = wrapper.emitted().saveEditedGoal[0][0].editedGoal
      expect(wrapper.emitted()).toHaveProperty('saveEditedGoal')
      expect(wrapper.emitted()).toHaveProperty('finishEditingGoal')
      expect(editedGoal.name).toBe('new goal name')
      expect(editedGoal.description).toBe('new goal description')
      expect(editedGoal.completed).toBe(false)
      expect(editedGoal.removed).toBe(false)
      expect(editedGoal.user).toBe(6)
    })

    it('cancelEdit correctly emits finishEditingGoal', async () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
        editName: 'new goal name',
        editDescription: 'new goal description'
      })
      await wrapper.vm.cancelEdit()
      expect(wrapper.emitted()).not.toHaveProperty('saveEditedGoal')
      expect(wrapper.emitted()).toHaveProperty('finishEditingGoal')
    })
  })

  describe('DOM', () => {
    it('can edit goal through form', async () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
      const saveGoalSpy = jest.spyOn(wrapper.vm, 'saveGoal')

      const editGoalForm = wrapper.find('#edit-goal-form')
      const editGoalName = wrapper.find('#edit-goal-name-input')
      const editGoalDescription = wrapper.find('#edit-goal-description-input')

      editGoalName.setValue('new goal name')
      editGoalDescription.setValue('new goal description')
      await editGoalForm.trigger('submit')
      expect(saveGoalSpy).toHaveBeenCalled()

      const editedGoal = wrapper.emitted().saveEditedGoal[0][0].editedGoal
      expect(wrapper.emitted()).toHaveProperty('saveEditedGoal')
      expect(wrapper.emitted()).toHaveProperty('finishEditingGoal')
      expect(editedGoal.name).toBe('new goal name')
      expect(editedGoal.description).toBe('new goal description')
      expect(editedGoal.completed).toBe(false)
      expect(editedGoal.removed).toBe(false)
      expect(editedGoal.user).toBe(6)
    })


    it('pressing cancel edit button does not call saveGoal method', async () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
      const saveGoalSpy = jest.spyOn(wrapper.vm, 'saveGoal')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editGoalName = wrapper.find('#edit-goal-name-input')
      const editGoalDescription = wrapper.find('#edit-goal-description-input')
      const cancelEditButton = wrapper.find('#cancel-edit-button')

      editGoalName.setValue('new goal name')
      editGoalDescription.setValue('new goal description')
      await cancelEditButton.trigger('click')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveGoalSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedGoal')
      expect(wrapper.emitted()).toHaveProperty('finishEditingGoal')
    })


    it('pressing esc button also cancels editing and does not save changes', async () => {
      const wrapper = shallowMount(GoalEditor, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
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
      const saveGoalSpy = jest.spyOn(wrapper.vm, 'saveGoal')
      const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')

      const editGoalForm = wrapper.find('#edit-goal-form')
      const editGoalName = wrapper.find('#edit-goal-name-input')
      const editGoalDescription = wrapper.find('#edit-goal-description-input')

      editGoalName.setValue('new goal name')
      editGoalDescription.setValue('new goal description')
      await editGoalForm.trigger('keyup.esc')
      expect(cancelEditSpy).toHaveBeenCalled()
      expect(saveGoalSpy).not.toHaveBeenCalled()

      expect(wrapper.emitted()).not.toHaveProperty('saveEditedGoal')
      expect(wrapper.emitted()).toHaveProperty('finishEditingGoal')
    })
  })
})
