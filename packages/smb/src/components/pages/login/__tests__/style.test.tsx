import React from 'react'
import { shallow, mount } from 'enzyme'
import { Container, Wrapper, ImageContainer } from '../__styles__/styles'

describe('login styled', () => {
  describe('Container', () => {
    it('should match Snapshot', () => {
      const wrapper = shallow(<Container />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('Wrapper', () => {
    it('should match Snapshot', () => {
      const wrapper = mount(<Wrapper disabled={false} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match Snapshot', () => {
      const wrapper = mount(<Wrapper disabled={true} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('ImageContainer', () => {
    it('should match Snapshot', () => {
      const wrapper = shallow(<ImageContainer />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
