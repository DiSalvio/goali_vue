import store from '@/store'
import { mount } from '@vue/test-utils'
import SignUpPage from '@/views/PageSignUp.vue'
import { faker } from '@faker-js/faker'

describe('SignUpPage.vue', () => {

  it('matches snapshot', () => {
    const wrapper = mount(SignUpPage, {
      globals: {
        plugin: [store]
      }
    })

    expect(wrapper).toMatchSnapshot()
  })

  describe('signUp method', () => {
    it('dispatches signUp action with correct parameters', async () => {
      const wrapper = mount(SignUpPage, {
        global: {
          mocks: {
            $route: {
              name: 'PageLogin'
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
      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }
      
      wrapper.setData({...signUpDetails})
      await wrapper.vm.signUp()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('signUp', signUpDetails)
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: 'PageLogin',
        params: { signUpSuccess: true }
      })
      expect(wrapper.vm.signUpFailed).toBe(false)
    })

    it('dispatches signUp action with incorrect parameters', async () => {
      const wrapper = mount(SignUpPage, {
        global: {
          mocks: {
            $route: {
              name: 'PageLogin'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(false)
            }
          }
        }
      })
      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }
      
      wrapper.setData({...signUpDetails})
      await wrapper.vm.signUp()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('signUp', signUpDetails)
      expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
      expect(wrapper.vm.signUpFailed).toBe(true)
    })
  })
  describe('using sign up form', () => {
    it('can sign up with correct info', async () => {
      const wrapper = mount(SignUpPage, {
        global: {
          mocks: {
            $route: {
              name: 'PageLogin'
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
      const signUpSpy = jest.spyOn(wrapper.vm, 'signUp')

      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }

      const signUpForm = wrapper.find('form')
      const formFields = {
        email: signUpForm.find('#email'),
        username: signUpForm.find('#username'),
        firstName: signUpForm.find('#first-name'),
        lastName: signUpForm.find('#last-name'),
        password: signUpForm.find('#password'),
        confirmPassword: signUpForm.find('#confirm-password')
      }

      Object.entries(formFields).forEach(([fieldName, input]) => {
        input.setValue(signUpDetails[fieldName])
        input.trigger('input')
      })
      
      await signUpForm.trigger('submit')
      expect(signUpSpy).toHaveBeenCalled()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('signUp', signUpDetails)
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: 'PageLogin',
        params: { signUpSuccess: true }
      })
      expect(wrapper.vm.signUpFailed).toBe(false)
      await wrapper.findAll('#sign-up-failed')
      expect(wrapper.findAll('#sign-up-failed').length).toBe(0)
    })

    it('receives sign up failed message with if store sign up action fails', async () => {
      const wrapper = mount(SignUpPage, {
        global: {
          mocks: {
            $route: {
              name: 'PageLogin'
            },
            $router: {
              push: jest.fn()
            },
            $store: {
              dispatch: jest.fn().mockResolvedValue(false)
            }
          }
        }
      })
      const signUpSpy = jest.spyOn(wrapper.vm, 'signUp')

      const signUpDetails = {
        email: '',
        username: '',
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }

      const signUpForm = wrapper.find('form')
      const formFields = {
        email: signUpForm.find('#email'),
        username: signUpForm.find('#username'),
        firstName: signUpForm.find('#first-name'),
        lastName: signUpForm.find('#last-name'),
        password: signUpForm.find('#password'),
        confirmPassword: signUpForm.find('#confirm-password')
      }

      Object.entries(formFields).forEach(([fieldName, input]) => {
        input.setValue(signUpDetails[fieldName])
        input.trigger('input')
      })
      
      await signUpForm.trigger('submit')
      expect(signUpSpy).toHaveBeenCalled()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('signUp', signUpDetails)
      expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith()
      expect(wrapper.vm.signUpFailed).toBe(true)
      await wrapper.findAll('#sign-up-failed')
      expect(wrapper.findAll('#sign-up-failed').length).toBe(1)
      expect(wrapper.find('#sign-up-failed').text()).toBe('Sign Up Failed')
    })
  })
})

