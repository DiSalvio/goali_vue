import { shallowMount, mount } from '@vue/test-utils'
import GoalList from '@/components/GoalList.vue'

describe('GoalList.vue', () => {
  describe('methods', () => {
    it('editingThisGoal correctly returns false if no goal is being edited', () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            {
              "id":2,
              "name":"goal 2",
              "description":"description 2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingGoalId).toBe(null)
      expect(wrapper.vm.editingThisGoal(1)).toBe(false)
    })

    it('editingThisGoal correctly returns false if different goal is being edited', async () => {
      const wrapper = shallowMount(GoalList, {
        data () {
          return {
            editingGoalId: 2
          }
        },
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            {
              "id":2,
              "name":"goal 2",
              "description":"description 2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingThisGoal(1)).toBe(false)
    })

    it('finishingEditingGoal correctly sets editingGoalId', async () => {
      const wrapper = shallowMount(GoalList, {
          data () {
            return {
              editingGoalId: 2
            }
          },
          props: {
            goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            {
              "id":2,
              "name":"goal 2",
              "description":"description 2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingGoalId).toBe(2)
      await wrapper.vm.finishEditingGoal()
      expect(wrapper.vm.editingGoalId).toBe(null)
    })


    it('editGoal sets editing goal id correctly', async () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            {
              "id":2,
              "name":"goal 2",
              "description":"description 2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      expect(wrapper.vm.editingGoalId).toBe(null)
      await wrapper.vm.editGoal({goalId: 2})
      expect(wrapper.vm.editingGoalId).toBe(2)
    })

    it('saveEditedGoal emits event data correctly', async () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      const editedGoal = {
        "name":"an edited goal",
        "description":"an edited description"
      }
      await wrapper.vm.saveEditedGoal({editedGoal: editedGoal})
      const emittedEditedGoal = wrapper.emitted().saveEditedGoal[0][0].editedGoal
      expect(wrapper.emitted()).toHaveProperty('saveEditedGoal')
      expect(emittedEditedGoal.name).toBe('an edited goal')
      expect(emittedEditedGoal.description).toBe('an edited description')
    })


    it('toggleGoalCompletion emits event data correctly', async () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      await wrapper.vm.toggleGoalCompletion({goal:wrapper.vm.goals[0]})
      const emittedEditedGoal = wrapper.emitted().saveEditedGoal[0][0].editedGoal
      expect(wrapper.emitted()).toHaveProperty('saveEditedGoal')
      expect(emittedEditedGoal.completed).toBe(false)
    })


    it('removeGoal emits event data correctly', async () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      await wrapper.vm.removeGoal({goal:wrapper.vm.goals[0]})
      const emittedEditedGoal = wrapper.emitted().saveEditedGoal[0][0].editedGoal
      expect(wrapper.emitted()).toHaveProperty('saveEditedGoal')
      expect(emittedEditedGoal.removed).toBe(true)
    })

  })

  describe('DOM', () => {
    it('renders GoalCompleted component with completed goal', () => {
      const wrapper = shallowMount(GoalList, {
          props: {
            goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      const completedGoal = wrapper.findComponent('goal-completed-stub')
      expect(completedGoal.isVisible()).toBe(true)
    })

    it('renders GoalInProgress component with incomplete goal', () => {
      const wrapper = shallowMount(GoalList, {
          props: {
            goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      const inProgressGoal = wrapper.findComponent('goal-in-progress-stub')
      expect(inProgressGoal.isVisible()).toBe(true)
    })

    it('renders both completed and in progress goal when provided', () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":true,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            },
            {
              "id":2,
              "name":"goal 2",
              "description":"description 2",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        }
      })
      const completedGoal = wrapper.findComponent('goal-completed-stub')
      expect(completedGoal.isVisible()).toBe(true)
      const inProgressGoal = wrapper.findComponent('goal-in-progress-stub')
      expect(inProgressGoal.isVisible()).toBe(true)
    })

    it('renders no Goal component with no goals', () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: []
        }
      })
      const inProgressGoal = wrapper.findComponent('goal-in-progress-stub')
      const completedGoal = wrapper.findComponent('goal-completed-stub')
      expect(inProgressGoal.exists()).toBe(false)
      expect(completedGoal.exists()).toBe(false)
    })

    it('renders goal editor component when editingGoalId is set', () => {
      const wrapper = shallowMount(GoalList, {
        props: {
          goals: [
            {
              "id":1,
              "name":"goal 1",
              "description":"description 1",
              "timestamp":"2022-04-15T06:58:03.382281Z",
              "completed":false,
              "updated":"2022-04-15T07:25:23.269770Z",
              "removed":false,
              "user":6
            }
          ]
        },
        data () {
          return {
            editingGoalId: 1
          }
        }
      })
      const inProgressGoal = wrapper.findComponent('goal-in-progress-stub')
      const goalEditor = wrapper.findComponent('goal-editor-stub')
      expect(inProgressGoal.exists()).toBe(false)
      expect(goalEditor.isVisible()).toBe(true)
    })

  })
})
