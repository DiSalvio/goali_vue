import { mount, shallowMount } from '@vue/test-utils'
import GoalCompleted from '@/components/GoalCompleted.vue'

describe('GoalCompleted.vue', () => {
  describe('methods', () => {
    it('editGoal correctly emits event', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.editGoal(1)
      expect(wrapper.emitted()).toHaveProperty('editGoal')
      const editGoalId = wrapper.emitted().editGoal[0][0].goalId
      expect(editGoalId).toBe(1)
    })

    it('removeGoal correctly emits event', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.removeGoal(wrapper.vm.goal)
      expect(wrapper.emitted()).toHaveProperty('removeGoal')
      const removeGoal = wrapper.emitted().removeGoal[0][0].goal
      expect(removeGoal.id).toBe(1)
    })

    it('toggleGoalCompletion correctly emits event', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      await wrapper.vm.toggleGoalCompletion(wrapper.vm.goal)
      expect(wrapper.emitted()).toHaveProperty('toggleGoalCompletion')
      const toggledGoal = wrapper.emitted().toggleGoalCompletion[0][0].goal
      expect(toggledGoal.id).toBe(1)
    })
  })


  describe('DOM', () => {
    it('shows goal name', () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const goalName = wrapper.find("#goal-name-completed")
      expect(goalName.isVisible()).toBe(true)
      expect(goalName.text()).toBe("goal 1")
    })

    it('shows edit goal button', () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editGoalButton = wrapper.find("#edit-goal-completed")
      expect(editGoalButton.isVisible()).toBe(true)
    })

    it('shows remove goal button', () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeGoalButton = wrapper.find("#remove-goal-completed")
      expect(removeGoalButton.isVisible()).toBe(true)
    })

    it('shows toggle goal completion button', () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleGoalButton = wrapper.find("#toggle-goal-completion-done")
      expect(toggleGoalButton.isVisible()).toBe(true)
    })

    it('pressing Edit Goal Button runs editGoal method', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const editGoalButton = wrapper.find("#edit-goal-completed")
      const editGoalSpy = jest.spyOn(wrapper.vm, 'editGoal')
      await editGoalButton.trigger('click')
      expect(editGoalSpy).toHaveBeenCalled()
    })

    it('pressing remove goal button runs removeGoal method', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const removeGoalButton = wrapper.find("#remove-goal-completed")
      const removeGoalSpy = jest.spyOn(wrapper.vm, 'removeGoal')
      await removeGoalButton.trigger('click')
      expect(removeGoalSpy).toHaveBeenCalled()
    })

    it('pressing toggle goal completion button runs toggleGoalCompletion method', async () => {
      const wrapper = mount(GoalCompleted, {
        props: {
          goal: {
            "id":1,
            "name":"goal 1",
            "description":"description 1",
            "timestamp":"202-04-15T06:58:03.382281Z",
            "completed":false,
            "updated":"2022-04-15T07:25:23.269770Z",
            "removed":false,
            "user":6
          }
        }
      })
      const toggleGoalButton = wrapper.find("#toggle-goal-completion-done")
      const toggleGoalSpy = jest.spyOn(wrapper.vm, 'toggleGoalCompletion')
      await toggleGoalButton.trigger('click')
      expect(toggleGoalSpy).toHaveBeenCalled()
    })
  })
})
