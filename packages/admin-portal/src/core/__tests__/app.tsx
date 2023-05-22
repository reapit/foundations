import * as React from 'react'
import { render as testRender } from '../../tests/react-testing'

import App from '../app'
import { render, unmountComponentAtNode } from 'react-dom'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

jest.mock('../router')

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    delete global.window.location
    // @ts-ignore
    global.window ??= Object.create(window)
    // @ts-ignore
    global.window.location = {
      reload: {
        bind: jest.fn(),
      } as any,
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
