import * as React from 'react'
import { shallow } from 'enzyme'
import IconButton from '../'

describe('IconButton component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<IconButton icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when disabled', () => {
    const wrapper = shallow(<IconButton disabled icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when in dark mode', () => {
    const wrapper = shallow(<IconButton dark icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger an onClick prop when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<IconButton icon="add" onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
