import * as React from 'react'
import { shallow } from 'enzyme'

import App from '../app'
import { render, unmountComponentAtNode } from 'react-dom'

jest.mock('../router')

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    delete global.window.location
    // @ts-ignore
    global.window = Object.create(window)
    // @ts-ignore
    global.window.location = {
      reload: {
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
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
