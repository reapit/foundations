import React from 'react'
import { RenderWithHeader } from '../render-with-header'
import { shallow } from 'enzyme'

test('RenderWithHeader - should match snapshot', () => {
  const wrapper = shallow(<RenderWithHeader header="test">some text</RenderWithHeader>)
  expect(wrapper).toMatchSnapshot()
})
