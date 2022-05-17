import store from '@/store'
import { mount } from '@vue/test-utils'
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
})
