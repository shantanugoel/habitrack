import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../layout/ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document class list
    document.documentElement.classList.remove('dark')
  })

  it('renders properly', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.exists()).toBe(true)
  })

  it('toggles theme when clicked', async () => {
    const wrapper = mount(ThemeToggle)
    
    // Initial state should be light
    expect(localStorage.getItem('theme')).toBe(null)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Click the toggle button
    await wrapper.find('button').trigger('click')
    
    // Should switch to dark mode
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Click again
    await wrapper.find('button').trigger('click')
    
    // Should switch back to light mode
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('loads theme from localStorage on mount', async () => {
    // Set initial theme in localStorage
    localStorage.setItem('theme', 'dark')
    
    const wrapper = mount(ThemeToggle)
    
    // Should load dark theme from localStorage
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
