import * as React from 'react'
import { render as testRender } from '../../tests/react-testing'

import App from '../app'
import { render, unmountComponentAtNode } from 'react-dom'

jest.mock('../router')

const oldWindow = window

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    delete global.window.location
    // @ts-ignore
    global.window = Object.create(window)
    // @ts-ignore
    global.window.location = {
      reload: {
        // @ts-ignore
        bind: jest.fn(),
      },
    }
  })

  afterAll(() => {
    // @ts-ignore
    global.window = oldWindow
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
