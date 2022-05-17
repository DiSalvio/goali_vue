import store from '@/store'
import { shallowMount, mount } from '@vue/test-utils'
import PageHome from '@/views/PageHome.vue'

describe('PageHome.vue', () => {

  describe('matches previous html snapshots', () => {

    it('if there are no goals', () => {
      const wrapper = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })
      expect(wrapper).toMatchSnapshot()
    })

    it('if there are goals', () => {
      const wrapper = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': [ 
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
            }
          }
        }
      })

      expect(wrapper).toMatchSnapshot()
    })

  })

  describe('component hooks', () => {
    it('dispatches fetchGoals on created', async () => {
      const { vm } = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })

      expect(vm.$store.dispatch).toHaveBeenCalledWith('fetchGoals')
    })
  })

  describe('computed properties', () => {
    it('are all accessible', async () => {
      const { vm } = mount(PageHome, {
        global: {
          plugins: [store]
        }
      })
      expect(vm).toEqual(
        expect.objectContaining({
          'activeGoals': expect.any(Array),
          'activeCompletedGoals': expect.any(Array),
          'activeInProgressGoals': expect.any(Array)
        })
      )
    })
  })


  describe('methods: ', () => {
    it('addGoal dispatches createGoal with correct parameters', () => {
      const { vm } = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })

      const newGoal = {
        "name":"goal 1",
        "description":"description 1"
      }

      vm.addGoal({ newGoal })

      expect(vm.$store.dispatch).toHaveBeenCalledWith('createGoal', {
        "name":"goal 1",
        "description":"description 1"
      })
    })

    it('saveEditedGoal dispatches saveEditedGoal with correct parameters', () => {
      const { vm } = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': [
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
            }
          }
        }
      })

      const editedGoal = {
        "name":"goal 1234",
        "description":"description 12345",
        "completed": false
      }

      vm.saveEditedGoal({ editedGoal })

      expect(vm.$store.dispatch).toHaveBeenCalledWith('saveEditedGoal', {
        editedGoal
      })
    })
  })

  describe('DOM', () => {
    it('shows no active goals message when there are no active goals', () => {
      const wrapper = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })
      const header = wrapper.find('h1')
      expect(header.attributes('id')).toBe('no-goals')
    })
    it('does not render goal list components if there are no active goals', () => {
      const wrapper = shallowMount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })
      expect(wrapper.findAllComponents('goal-list-stub').length).toBe(0)
    })

    it('shows Goals header when there are active goals', () => {
      const wrapper = mount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': [{
                    "id":1,
                    "name":"goal 1",
                    "description":"description 1",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":true,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                  }]
              }
            }
          }
        }
      })
      const header = wrapper.find('h1')
      expect(header.attributes('id')).toBe('yes-goals')
    })

    it('has GoalList component if there are active goals', () => {
      const wrapper = shallowMount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': [{
                    "id":1,
                    "name":"goal 1",
                    "description":"description 1",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":true,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                  }]
              }
            }
          }
        }
      })
      expect(wrapper.findAllComponents('goal-list-stub').length).toBe(2)
    })

    it('shows Goal Add component with active goals', () => {
      const wrapper = shallowMount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': [{
                    "id":1,
                    "name":"goal 1",
                    "description":"description 1",
                    "timestamp":"2022-04-15T06:58:03.382281Z",
                    "completed":true,
                    "updated":"2022-04-15T07:25:23.269770Z",
                    "removed":false,
                    "user":6
                  }]
              }
            }
          }
        }
      })
      expect(wrapper.findAllComponents('goal-add-stub').length).toBe(1)
    })

    it('shows Goal Add component without active goals', () => {
      const wrapper = shallowMount(PageHome, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn(),
              getters: {
                'activeGoals': []
              }
            }
          }
        }
      })
      expect(wrapper.findAllComponents('goal-add-stub').length).toBe(1)
    })
  })
})
