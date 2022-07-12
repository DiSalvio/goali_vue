import store from '@/store'
import { mount } from '@vue/test-utils'
import SubTaskAdd from '@/components/SubTaskAdd.vue'

describe('SubTaskAdd.vue', () => {
  describe('methods', () => {
    it('saveSubTask emits addSubTask event with name and description', async () => {
      const wrapper  = mount(SubTaskAdd, {
        data () {
          return {
            newName: 'new sub-task name',
            newDescription: 'new sub-task description'
          }
        }
      })
      await wrapper.vm.saveSubTask()
      expect(wrapper.emitted()).toHaveProperty('addSubTask')
      const emittedNewSubTask = wrapper.emitted().addSubTask[0][0].newSubTask
      expect(emittedNewSubTask.name).toEqual('new sub-task name')
      expect(emittedNewSubTask.description).toEqual('new sub-task description')
      expect(wrapper.vm.newName).toBe("")
      expect(wrapper.vm.newDescription).toBe("")
    })
  })

  describe('DOM', () => {
    it('add sub-task form starts with blank new name and description', () => {
      const wrapper = mount(SubTaskAdd)
      const newSubTaskName = wrapper.find('#add-sub-task-name-input')
      const newSubTaskDescription = wrapper.find('#add-sub-task-description-input')
      expect(newSubTaskName.text()).toBe('')
      expect(newSubTaskDescription.text()).toBe('')
    })

    it('can add new name and description and submit through form', async () => {
      const wrapper = mount(SubTaskAdd)
      const saveSubTaskSpy = jest.spyOn(wrapper.vm, 'saveSubTask')
      const addSubTaskForm = wrapper.find('#add-sub-task-form')
      const newSubTaskName = wrapper.find('#add-sub-task-name-input')
      const newSubTaskDescription = wrapper.find('#add-sub-task-description-input')
      newSubTaskName.setValue('newest sub-task name')
      newSubTaskDescription.setValue('newest sub-task description')
      await addSubTaskForm.trigger('submit.prevent')
      expect(saveSubTaskSpy).toHaveBeenCalled()
      expect(wrapper.emitted()).toHaveProperty('addSubTask')
      const emittedNewSubTask = wrapper.emitted().addSubTask[0][0].newSubTask
      expect(emittedNewSubTask.name).toEqual('newest sub-task name')
      expect(emittedNewSubTask.description).toEqual('newest sub-task description')
      expect(newSubTaskName.text()).toBe('')
      expect(newSubTaskDescription.text()).toBe('')
    })
  })
})
