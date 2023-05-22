import React from 'react'
import App from '../app'
import { render, unmountComponentAtNode } from 'react-dom'
import { render as testRender } from '../../tests/react-testing'

jest.mock('../router')

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    delete global.window.location
    // @ts-ignore
    global.window ??= Object.create(window)
    // @ts-ignore
    global.window.location = {
      reload: jest.fn(),
    }
  })

  it('should render without crashing', () => {
    const div = document.createElement('div')
    render(<App />, div)
    unmountComponentAtNode(div)
  })

  it('should match a snapshot', () => {
    expect(testRender(<App />)).toMatchSnapshot()
  })
})
