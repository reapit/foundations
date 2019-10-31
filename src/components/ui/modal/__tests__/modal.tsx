import React from 'react'
import { shallow } from 'enzyme'
import ProfileModal, { renderContent, STEPS } from '../modal'
import { contact } from '@/sagas/__stubs__/contact'

describe('Modal', () => {
  describe('renderContent', () => {
    it('should return Profile', () => {
      const mockProps = {
        id: '123',
        modalContentType: STEPS.PROFILE,
        contact: contact,
        isSubmitting: false,
        history: {}
      }
      const result = renderContent(mockProps)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('ProfileModal', () => {
    it('should match snapshot', () => {
      const mockProps = {
        id: '123',
        contact: contact,
        visible: true,
        afterClose: jest.fn(),
        isSubmitting: false,
        modalContentType: STEPS.PROFILE,
        history: {}
      }
      const wrapper = shallow(<ProfileModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
