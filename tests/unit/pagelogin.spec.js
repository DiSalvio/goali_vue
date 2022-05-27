import store from '@/store'
import { mount } from '@vue/test-utils'
import PageLogin from '@/views/PageLogin.vue'

describe('PageLogin.vue', () => {
  it('matches previous html snapshots', () => {
    const wrapper = mount(PageLogin)
    expect(wrapper).toMatchSnapshot()
  })

  it('has correct methods data and props', () => {
    const { vm } = mount(PageLogin)
    expect(vm).toEqual(
      expect.objectContaining({
        'login': expect.any(Function),
        'username': expect.any(String),
        'password': expect.any(String),
        'loginFailed': expect.any(Boolean),
        'signUpSuccess': expect.any(Boolean)
      })
    )
  })

  describe('login method', () => {
    it('correctly dispatches login action', () => {
      const { vm } = mount(PageLogin, {
        data () {
          return {
            username: 'somename',
            password: 'somevalue'
          }
        },
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn()
            }
          }
        }
      })

      vm.login()
      expect(vm.$store.dispatch).toHaveBeenCalledWith('login', {
        "username": vm.username,
        "password": vm.password
      })
    })

    it('sets loginFailed to true when store login action returns false', () => {
      const { vm } = mount(PageLogin, {
        global: {
          mocks: {
            $store: {
              dispatch: jest.fn().mockResolvedValue(false)
            }
          }
        }
      })

      vm.login()
      expect(vm.loginFailed).toBe(false)
    })

    it('redirects to homepage when store login action returns true', async () => {
      const { vm } = mount(PageLogin, {
        data () {
          return {
            username: 'something',
            password: 'somevalue'
          }
        },
        global: {
          mocks: {
            $route: {
              name: 'PageHome'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true)
            }
          }
        }
      })

      await vm.login()
      expect(vm.loginFailed).toBe(false)
      expect(vm.$router.push).toHaveBeenCalledWith({ name: 'PageHome' })
    })
  })

  describe('DOM', () => {
    it('shows sign up success message when signUpSuccess prop is passed', () => {
      const wrapper = mount(PageLogin, {
        propsData: {
          signUpSuccess: true
        }
      })

      const signUpSuccessMessage = wrapper.find('h2')
      expect(signUpSuccessMessage.attributes('id')).toBe('sign-up-success')
      expect(signUpSuccessMessage.text()).toBe('Sign up successful, Log in now')
    })

    it('shows login failed message when loginFailed is true', () => {
      const wrapper = mount(PageLogin, {
        data() {
          return {
            loginFailed: true
          }
        }
      })

      const loginFailedMessage = wrapper.find('h2')
      expect(loginFailedMessage.attributes('id')).toBe('login-failure')
      expect(loginFailedMessage.text()).toBe('Login Failed')
    })

    it('shows neither loginFailed or signUpSuccess messages by default', () => {
      const wrapper = mount(PageLogin)

      expect(wrapper.findAll('h2').length).toBe(0)
    })

  })

  describe('login form', () => {
    it('passes along correct username and password to data and dispatch', async () => {
      const wrapper = mount(PageLogin, {
        global: {
          mocks: {
            $route: {
              name: 'PageHome'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true)
            }
          }
        }
      })
      const loginSpy = jest.spyOn(wrapper.vm, 'login')

      const form = wrapper.find('form')
      const username = form.find('[name="username"]')
      const password = form.find('[name="password"]')

      username.setValue('jim')
      username.trigger('input')
      password.setValue('halpert')
      await form.trigger('submit')

      expect(wrapper.vm.username).toBe('jim')
      expect(wrapper.vm.password).toBe('halpert')
      expect(loginSpy).toHaveBeenCalled()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('login', {
        username: 'jim',
        password: 'halpert'
      })
      expect(wrapper.vm.loginFailed).toBe(false)
      expect(wrapper.vm.invalid).toBe(false)
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'PageHome' })
    })

    it('does not dispatch login action without username and password', async () => {
      const wrapper = mount(PageLogin, {
        global: {
          mocks: {
            $route: {
              name: 'PageHome'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(true)
            }
          }
        }
      })
      const loginSpy = jest.spyOn(wrapper.vm, 'login')
      const form = wrapper.find('form')
      await form.trigger('submit')

      expect(wrapper.vm.invalid).toBe(true)
      expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
      expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
    })
  })
})
