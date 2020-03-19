import * as React from 'react'
import { shallow } from 'enzyme'
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
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
