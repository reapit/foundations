import * as React from 'react'
import { render as testRender } from '../../tests/react-testing'
import App from '../app'
import { render, unmountComponentAtNode } from 'react-dom'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    render(<App />, div)
    unmountComponentAtNode(div)
  })

  it('should match a snapshot', () => {
    const wrapper = testRender(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
