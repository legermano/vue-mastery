import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'
import { describe, expect, test } from 'vitest'

describe('Notification Component', () => {
  test('renders the correct style for error', () => {
    const status = 'error'
    const wrapper = mount(NotificationToast, {
      props: { status: status }
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--error']))
  })

  test('renders the correct style for success', () => {
    const status = 'success'
    const wrapper = mount(NotificationToast, {
      props: { status: status }
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--success']))
  })

  test('renders the correct style for info', () => {
    const status = 'info'
    const wrapper = mount(NotificationToast, {
      props: { status: status }
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--info']))
  })

  test('notification slides up when message is empty', () => {
    const message = ''
    const wrapper = mount(NotificationToast, {
      props: { message }
    })

    expect(wrapper.classes('notification--slide')).toBe(false)
  })

  test('emits event when close button is clicked', async () => {
    const wrapper = mount(NotificationToast)

    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clear-notification')
  })

  test('renders correct message to viewer', () => {
    const message = 'Something happened, try again'
    const wrapper = mount(NotificationToast, {
      props: { message }
    })

    expect(wrapper.find('p').text()).toBe(message)
  })

  test('renders the correct snapshot for error', () => {
    const wrapper = mount(NotificationToast, {
      props: { status: 'error' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders the correct inline snapshot for success', () => {
    const wrapper = mount(NotificationToast, {
      props: { status: 'success' }
    })

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role="alert" class="notification notification--success">
        <p class="notification__text"></p><button data-testid="close-notification" title="close" class="notification__button"> ✕ </button>
      </div>"
    `)
  })
})
