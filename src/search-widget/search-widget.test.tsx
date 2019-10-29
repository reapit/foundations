import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import SearchWidget from './search-widget'
import { theme } from '../theme'

describe('Search widget', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SearchWidget theme={theme} API_KEY="" />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<SearchWidget theme={theme} API_KEY="" />)
    expect(wrapper).toMatchSnapshot()
  })
})
