import store from '@/store'
import { mount } from '@vue/test-utils'
import GoalAdd from '@/components/GoalAdd.vue'

describe('GoalAdd.vue', () => {
  describe('methods', () => {
    it('saveGoal emits addGoal event with name and description', async () => {
      const wrapper  = mount(GoalAdd, {
        data () {
          return {
            newName: 'new goal name',
            newDescription: 'new goal description'
          }
        }
      })
      await wrapper.vm.saveGoal()
      expect(wrapper.emitted()).toHaveProperty('addGoal')
      const emittedNewGoal = wrapper.emitted().addGoal[0][0].newGoal
      expect(emittedNewGoal.name).toEqual('new goal name')
      expect(emittedNewGoal.description).toEqual('new goal description')
      expect(wrapper.vm.newName).toBe("")
      expect(wrapper.vm.newDescription).toBe("")
    })
  })

  describe('DOM', () => {
    it('add goal form starts with blank new name and description', () => {
      const wrapper = mount(GoalAdd)
      const newGoalName = wrapper.find('#add-goal-name-input')
      const newGoalDescription = wrapper.find('#add-goal-description-input')
      expect(newGoalName.text()).toBe('')
      expect(newGoalDescription.text()).toBe('')
    })

    it('can add new name and description and submit through form', async () => {
      const wrapper = mount(GoalAdd)
      const saveGoalSpy = jest.spyOn(wrapper.vm, 'saveGoal')
      const addGoalForm = wrapper.find('#add-goal-form')
      const newGoalName = wrapper.find('#add-goal-name-input')
      const newGoalDescription = wrapper.find('#add-goal-description-input')
      newGoalName.setValue('newest goal name')
      newGoalDescription.setValue('newest goal description')
      await addGoalForm.trigger('submit.prevent')
      expect(saveGoalSpy).toHaveBeenCalled()
      expect(wrapper.emitted()).toHaveProperty('addGoal')
      const emittedNewGoal = wrapper.emitted().addGoal[0][0].newGoal
      expect(emittedNewGoal.name).toEqual('newest goal name')
      expect(emittedNewGoal.description).toEqual('newest goal description')
      expect(newGoalName.text()).toBe('')
      expect(newGoalDescription.text()).toBe('')
    })
  })
})
