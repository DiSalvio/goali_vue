import actions from '@/store/users/actions.js'
import { faker } from '@faker-js/faker'
import axios from 'axios'

jest.mock('axios')
process.env.VUE_APP_API_URL = 'https://example.com'
const commit = jest.fn()

describe('user store actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login Method', () => {
    it('correctly calls login API', async () => {
      const username = faker.name.findName()
      axios.post.mockResolvedValue({ data: { token: '1234' }})
      const response = await actions.login({ commit }, { username: username, password: 12345678 })
      expect(axios.post).toHaveBeenCalledWith('https://example.com/login/', { username: username, password: 12345678 })
    })

    it('calls mutations if token received from API', async () => {
      axios.post.mockResolvedValueOnce({ data: { token: '1234' } })
      const response = await actions.login({ commit }, { username: faker.name.findName(), password: 12345678 })
      expect(commit).toHaveBeenCalledWith('setToken', "1234")
      expect(commit).toHaveBeenCalledWith('setTokenState', "1234")
    })

    it('does not call mutations if token not received from API', async () => {
      axios.post.mockRejectedValue({ error: 'Invalid credentials' })
      const response = await actions.login({ commit }, { username: faker.name.findName(), password: 12345678 })
      expect(commit).not.toHaveBeenCalledWith('setToken', "1234")
      expect(commit).not.toHaveBeenCalledWith('setTokenState', "1234")
    })
  })

  describe('signUp action', () => {
    it('correctly calls signUp API', async () => {

      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }
      axios.post.mockResolvedValue({ Message: 'Successfully Signed Up' })
      const response = await actions.signUp({ commit }, signUpDetails)
      expect(axios.post).toHaveBeenCalledWith('https://example.com/signup/',
        expect.objectContaining({
          email: signUpDetails.email,
          first_name: signUpDetails.firstName,
          last_name: signUpDetails.lastName,
          username: signUpDetails.username,
          password: signUpDetails.password,
          confirm_password: signUpDetails.confirmPassword
        })
      )
    })

    it('returns true when API call successful', async () => {

      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }
      axios.post.mockResolvedValue({ Message: 'Successfully Signed Up' })
      const response = await actions.signUp({ commit }, signUpDetails)
      expect(response).toBe(true)
    })

    it('returns false when API call not successful', async () => {

      const signUpDetails = {
        email: faker.internet.email(),
        username: faker.name.findName(),
        password: '12345678',
        confirmPassword: '12345678',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }
      axios.post.mockRejectedValue({ Message: 'Failed due to error' })
      const response = await actions.signUp({ commit }, signUpDetails)
      expect(response).toBe(false)
    })
  })

describe('logOut action', () => {
    it('correctly calls logOut API', async () => {
      axios.post.mockResolvedValue({ Message: 'Successfully Signed Up' })
      const response = await actions.logOut({ commit }, '1234')
      expect(axios.post).toHaveBeenCalledWith('https://example.com/logout/', { token: '1234' })
    })

    it('returns true when API call successful', async () => {

      axios.post.mockResolvedValue({ res: 'Token deleted!' })
      const response = await actions.logOut({ commit }, '1234')
      expect(response).toBe(true)
    })

    it('returns false when API call not successful', async () => {

      axios.post.mockRejectedValue({ res: 'Object with token does not exist' })
      const response = await actions.logOut({ commit }, '1234')
      expect(response).toBe(false)
    })
  })

describe('refreshTokenState', () => {
    it('correctly calls token API', async () => {
      axios.post.mockResolvedValue({data: { token: '1234' }})
      const response = await actions.refreshTokenState({ commit }, '1234')
      expect(axios.post).toHaveBeenCalledWith('https://example.com/token/', { token: '1234' })
    })

    it('returns token when API call successful', async () => {
      axios.post.mockResolvedValue({data: { token: '1234' }})
      const response = await actions.refreshTokenState({ commit }, '1234')
      expect(commit).toHaveBeenCalledWith('setTokenState', '1234')
      expect(response).toBe("1234")
    })

    it('returns false when API call not successful', async () => {
      axios.post.mockRejectedValue({ error: 'Invalid Token' })
      const response = await actions.refreshTokenState({ commit }, '1234')
      expect(commit).toHaveBeenCalledWith('removeToken', '1234')
      expect(response).toBe(false)
    })
  })
})
