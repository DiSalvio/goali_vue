import store from '@/store'
import { mount } from '@vue/test-utils'
import TheNavBar from '@/components/TheNavBar.vue'

describe('TheNavBar.vue', () => {

  describe('default set up', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(TheNavBar, {
        global: {
          plugins: [store]
        }
      })
    })

    it('has token computed prop and logOut method', () => {
      expect(wrapper.vm).toEqual(
        expect.objectContaining({
          'token': null,
          'logOut': expect.any(Function)
        })
      )
    })

  })

  describe('when not logged in', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(TheNavBar, {
        global: {
          plugins: [store]
        }
      })
    })

    it('does not have token set in localStorage or computed prop', () => {
      expect(localStorage.getItem('token')).toBe(null)
      expect(wrapper.vm.token).toBe(null)
    })

    it('back, home, and log out buttons are not shown', () => {
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(0)
    })

    it('does not dispatch refresh token api call', () => {
      const { vm } = mount(TheNavBar, {
        global: {
          mocks: {
            $store: {
              state: {
                userModule: {
                  token: null
                }
              },
              dispatch: jest.fn()
            }
          }
        }
      })

      expect(vm.$store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when logged in', () => {
    let wrapper

    beforeEach(() => {
      localStorage.setItem('token', '1234')
      wrapper = mount(TheNavBar, {
        global: {
          mocks: {
            $store: {
              state: {
                userModule: {
                  token: '1234'
                }
              },
              dispatch: jest.fn()
            }
          }
        }
      })
    })

    it('has token set in computed prop', () => {
      expect(wrapper.vm.token).toBe('1234')
    })

    it('dispatches refresh token action with correct params', () => {
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('refreshTokenState', '1234')
    })

    it('shows back, home, and log out buttons in nav bar', () => {
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(3)
      expect(buttons[0].attributes('id')).toBe('back-button')
      expect(buttons[1].attributes('id')).toBe('home-button')
      expect(buttons[2].attributes('id')).toBe('log-out-button')
    })

    it('matches snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

  })

  describe('logOut method', () => {
    let wrapper

    beforeEach(() => {
      localStorage.setItem('token', '5678')
      wrapper = mount(TheNavBar, {
        global: {
          mocks: {
            $route: {
              name: 'PageLogin'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              state: {
                userModule: {
                  token: '5678'
                }
              },
              dispatch: jest.fn().mockResolvedValue(true)
            }
          }
        }
      })
    })
  
    it('correctly dispatches logOut action with correct params', async () => {
      await wrapper.vm.logOut()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('logOut', '5678')
    })

    it('redirects to login page if logOut is successful', async () => {
      await wrapper.vm.logOut()
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'PageLogin' })
    })
  })

  describe('user', () => {
    let wrapper

    beforeEach(() => {
      localStorage.setItem('token', '5678')
      wrapper = mount(TheNavBar, {
        global: {
          mocks: {
            $route: {
              name: 'PageHome'
            },
            $router: {
              push: jest.fn(),
              back: jest.fn()
            },
            $store: {
              state: {
                userModule: {
                  token: '5678'
                }
              },
              dispatch: jest.fn().mockResolvedValue(true)
            },
          }
        }
      })
    })

    it('can push back button to go back', () => {
      const backButton = wrapper.find('#back-button')
      backButton.trigger('click')
      expect(wrapper.vm.$router.back).toHaveBeenCalled()
    })

    it('can push home button and be routed to home page', async () => {
      const homeButton = wrapper.find('#home-button')
      await homeButton.trigger('click')
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'PageHome' })
    })

    it('can push log out button and be logged out', async () => {
      const logOutSpy = jest.spyOn(wrapper.vm, 'logOut')

      let buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(3)

      const logOutButton = wrapper.find('#log-out-button')
      await logOutButton.trigger('click')
      expect(logOutSpy).toHaveBeenCalled()
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'PageLogin' })
    })

  })

})
