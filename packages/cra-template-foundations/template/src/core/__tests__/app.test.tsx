import React from 'react'
import { act, render } from '@testing-library/react'
import App from '../app'
import { createRoot } from 'react-dom/client'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    act(() => {
      const root = createRoot(div)
      root.render(<App />)
      root.unmount()
    })
  })

  it('should match a snapshot', () => {
    const app = render(<App />)
    act(() => {
      expect(app).toMatchSnapshot()
    })
  })
})
