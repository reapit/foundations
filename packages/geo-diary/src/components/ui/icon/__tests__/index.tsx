import * as React from 'react'
import { shallow } from 'enzyme'
import Icon from '../'

describe('Icon component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Icon icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when color prop is supplied', () => {
    const wrapper = shallow(<Icon icon="add" color="red" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render nothing if invalid icon prop is supplied', () => {
    const wrapper = shallow(<Icon icon="nonExistantIconName" />)
    expect(wrapper).toMatchSnapshot()
  })
})
