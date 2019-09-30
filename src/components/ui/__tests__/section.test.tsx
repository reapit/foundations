import React from 'react'
import { shallow } from 'enzyme'
import { Section, renderCompletedCheckMark } from '../section'

describe('Section', () => {
  it('should match snapshot', () => {
    const mockProps = {
      title: 'Personal Details',
      isCompleted: false,
      onEdit: () => null,
      buttonText: 'Edit'
    }
    const wrapper = shallow(<Section {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('renderCompletedCheckMark', () => {
    it('should match snapshot when isCompleted true', () => {
      const component = renderCompletedCheckMark(true)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot when isCompleted false', () => {
      const component = renderCompletedCheckMark(false)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should have TiTick when isCompleted true', () => {
      const component = renderCompletedCheckMark(true)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('TiTick')).toHaveLength(1)
    })
    it('should not have TiTick when isCompleted false', () => {
      const component = renderCompletedCheckMark(false)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper.find('TiTick')).toHaveLength(0)
    })
  })
})
