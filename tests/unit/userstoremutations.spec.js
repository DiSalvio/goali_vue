import mutations from '@/store/users/mutations.js'

beforeEach(() => {
})

describe('user store mutations', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('setToken saves token to localStorage without changing vuex state', () => {
    let state = { token: null }
    expect(localStorage.getItem('token')).toBe(null)
    mutations.setToken(state, '1234')
    expect(localStorage.getItem('token')).toBe('1234')
    expect(state.token).toBe(null)
  })

  it('setTokenState saves token to state without changing localStorage', () => {
    let state = { token: null }
    mutations.setTokenState(state, '1234')
    expect(state.token).toBe('1234')
    expect(localStorage.getItem('token')).toBe(null)
  })

  it('removeToken deletes token from state and localStorage', () => {
    let state = { token: '1234' }
    localStorage.setItem('token', '1234')
    mutations.removeToken(state)
    expect(state.token).toBe(null)
    expect(localStorage.getItem('token')).toBe(null)
  })
})
