import React from 'react'
import { render as testRender } from '../../tests/react-testing'
import App from '../app'
import { createRoot } from 'react-dom/client'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<App />)
    root.unmount()
  })

  it('should match a snapshot', () => {
    expect(testRender(<App />)).toMatchSnapshot()
  })
})
