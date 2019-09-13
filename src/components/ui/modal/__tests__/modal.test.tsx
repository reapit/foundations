import React from 'react'
import { shallow } from 'enzyme'
import ProfileModal, { renderContent } from '../modal'
import { contact } from '@/sagas/__stubs__/contact'

describe('Modal', () => {
  describe('renderContent', () => {
    it('should return Profile', () => {
      const mockProps = {
        modalContentType: 'PROFILE',
        contact: contact,
        isSubmitting: false
      }
      const result = renderContent(mockProps)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('ProfileModal', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact,
        visible: true,
        afterClose: jest.fn(),
        isSubmitting: false,
        modalContentType: 'PROFILE'
      }
      const wrapper = shallow(<ProfileModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('Modal')).toHaveLength(1)
    })
  })
})
