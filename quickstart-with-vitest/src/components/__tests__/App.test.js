import { mount, flushPromises } from '@vue/test-utils'
import { describe, test, vi, expect } from 'vitest'
import axios from 'axios'

import App from '@/App.vue'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'Test post',
  body: 'Test body...'
}

describe('Post app', () => {
  test('user can create a new post', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockPost })

    const wrapper = mount(App)

    // Fill the input fields
    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

    // Submit the form
    await wrapper.find('[data-testid="post-form"]').trigger('submit')

    expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

    await flushPromises()

    // Assert that the created post is displayed on screen
    expect(wrapper.html()).toContain(mockPost.title)
    expect(wrapper.html()).toContain(mockPost.body)
  })

  describe('user gets notified', () => {
    test('when attempting to create a post with imcomplete fields', async () => {
      const wrapper = mount(App)

      // Try to submit the form with empty fields
      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.html()).toContain('Please input post title')

      // Click the close notification button
      await wrapper.find('[data-testid="close-notification"]').trigger('click')

      // Assert that the error message is no longer on the screen
      expect(wrapper.html()).not.toContain('Please input post title')

      // Fill only the title field
      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)

      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      // Assert that a new error prompting user for post body is displayed
      expect(wrapper.html()).toContain('Please input post body')
    })

    test('when creating a new post fails', async () => {
      vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Error occurred'))

      const wrapper = mount(App)

      // Fill the input fields
      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

      await flushPromises()

      expect(wrapper.html()).toContain('Error occurred')
    })
  })
})
