import React from 'react'
import { shallow } from 'enzyme'
import { HeadingMain, HeadingSecondary, SubHeadingMain, SubHeadingSecondary } from '../headings'

describe('headings', () => {
  describe('HeadingMain', () => {
    it('should match snapshot when have props', () => {
      const wrapper = shallow(
        <HeadingMain className="mockClassName" isTextCentered={true}>
          mockHeading
        </HeadingMain>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when no props', () => {
      const wrapper = shallow(<HeadingMain>mockHeading</HeadingMain>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('SubHeadingMain', () => {
    it('should match snapshot when have props', () => {
      const wrapper = shallow(
        <SubHeadingMain className="mockClassName" isTextCentered={true}>
          Mock Heading
        </SubHeadingMain>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when no props', () => {
      const wrapper = shallow(<SubHeadingMain>Mock Heading</SubHeadingMain>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('HeadingSecondary', () => {
    it('should match snapshot when have props', () => {
      const wrapper = shallow(
        <HeadingSecondary className="mockClassName" isTextCentered={true}>
          Mock Heading
        </HeadingSecondary>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when no props', () => {
      const wrapper = shallow(<HeadingSecondary>Mock Heading</HeadingSecondary>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('SubHeadingSecondary', () => {
    it('should match snapshot when have props', () => {
      const wrapper = shallow(
        <SubHeadingSecondary className="mockClassName" isTextCentered={true}>
          Mock Heading
        </SubHeadingSecondary>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when no props', () => {
      const wrapper = shallow(<SubHeadingSecondary>Mock Heading</SubHeadingSecondary>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
