import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../index'
import { render, unmountComponentAtNode } from 'react-dom'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    render(<App />, div)
    unmountComponentAtNode(div)
  })

  it('should match a snapshot', () => {
    expect(toJson(shallow(<App />))).toMatchSnapshot()
  })
})
