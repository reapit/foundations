import * as React from 'react'
import { shallow } from 'enzyme'
import { Icon } from '../'
import iconSet from '../icons'

describe('Icon component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Icon icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when intent prop is supplied', () => {
    const wrapper = shallow(<Icon icon="add" intent="primary" />)
    expect(wrapper).toMatchSnapshot()
  })

  Object.keys(iconSet).forEach((icon) => {
    it(`should match a snapshot of icon ${icon}`, () => {
      const Icon = iconSet[icon]
      const wrapper = shallow(<Icon />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
