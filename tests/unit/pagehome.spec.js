import store from '@/store'
import { mount } from '@vue/test-utils'
import PageHome from '@/views/PageHome.vue'

describe('PageHome.vue', () => {
  it('matches previous html snapshot if there are no goals', () => {
    const wrapper = mount(PageHome, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('matches previous html snapshot if there are goals', async () => {
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

  it('dispatches fetchGoals on created', async () => {
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

    expect(wrapper.componentVM.$store.dispatch).toHaveBeenCalledWith('fetchGoals')
  })
})
