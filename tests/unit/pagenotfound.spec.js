import store from '@/store'
import { mount } from '@vue/test-utils'
import PageNotFound from '@/views/PageNotFound.vue'

describe('PageNotFound.vue', () => {
  it('matches snapshot', () => {
    const wrapper = mount(PageNotFound)
    expect(wrapper).toMatchSnapshot()
  })

  it('message shows resource name if resource prop is passed', () => {
    const wrapper = mount(PageNotFound, {
      propsData: {
        resource: 'goal'
      }
    })
    const message = wrapper.find('#message')
    expect(message.text()).toBe("The goal you're looking for doesn't exist")
  })

  it('message shows page if no resource prop is passed', () => {
    const wrapper = mount(PageNotFound)
    const message = wrapper.find('#message')
    expect(message.text()).toBe("The page you're looking for doesn't exist")
  })
})
