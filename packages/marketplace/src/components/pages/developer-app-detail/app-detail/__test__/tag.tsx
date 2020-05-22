import React from 'react'
import { Tag } from '../tag'
import { shallow } from 'enzyme'

test('Tag - should match snapshot', () => {
  const wrapper = shallow(<Tag>Test</Tag>)
  expect(wrapper).toMatchSnapshot()
})
