import store from '@/store'
import { mount } from '@vue/test-utils'
import TaskAdd from '@/components/TaskAdd.vue'

describe('TaskAdd.vue', () => {
  describe('methods', () => {
    it('saveTask emits addTask event with name and description', async () => {
      const wrapper  = mount(TaskAdd, {
        data () {
          return {
            newName: 'new task name',
            newDescription: 'new task description'
          }
        }
      })
      await wrapper.vm.saveTask()
      expect(wrapper.emitted()).toHaveProperty('addTask')
      const emittedNewTask = wrapper.emitted().addTask[0][0].newTask
      expect(emittedNewTask.name).toEqual('new task name')
      expect(emittedNewTask.description).toEqual('new task description')
      expect(wrapper.vm.newName).toBe("")
      expect(wrapper.vm.newDescription).toBe("")
    })
  })

  describe('DOM', () => {
    it('add task form starts with blank new name and description', () => {
      const wrapper = mount(TaskAdd)
      const newTaskName = wrapper.find('#add-task-name-input')
      const newTaskDescription = wrapper.find('#add-task-description-input')
      expect(newTaskName.text()).toBe('')
      expect(newTaskDescription.text()).toBe('')
    })

    it('can add new name and description and submit through form', async () => {
      const wrapper = mount(TaskAdd)
      const saveTaskSpy = jest.spyOn(wrapper.vm, 'saveTask')
      const addTaskForm = wrapper.find('#add-task-form')
      const newTaskName = wrapper.find('#add-task-name-input')
      const newTaskDescription = wrapper.find('#add-task-description-input')
      newTaskName.setValue('newest task name')
      newTaskDescription.setValue('newest task description')
      await addTaskForm.trigger('submit.prevent')
      expect(saveTaskSpy).toHaveBeenCalled()
      expect(wrapper.emitted()).toHaveProperty('addTask')
      const emittedNewTask = wrapper.emitted().addTask[0][0].newTask
      expect(emittedNewTask.name).toEqual('newest task name')
      expect(emittedNewTask.description).toEqual('newest task description')
      expect(newTaskName.text()).toBe('')
      expect(newTaskDescription.text()).toBe('')
    })
  })
})
