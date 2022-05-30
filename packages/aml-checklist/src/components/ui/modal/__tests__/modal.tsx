import React from 'react'
import { render } from '../../../tests/react-testing'
import ProfileModal, { renderContent, STEPS, ID_STATUS } from '../modal'
import { contact } from '@/sagas/__stubs__/contact'

describe('Modal', () => {
  describe('renderContent', () => {
    const mockProps = (type: string) => ({
      id: '123',
      modalContentType: type,
      contact: contact,
      isSubmitting: false,
      history: {},
    })
    it('should return Profile', () => {
      const result = renderContent(mockProps(STEPS.PROFILE))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return PrimaryId', () => {
      const result = renderContent(mockProps(STEPS.PRIMARY_IDENTIFICATION))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return SecondaryId', () => {
      const result = renderContent(mockProps(STEPS.SECONDARY_IDENTIFICATION))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Address history', () => {
      const result = renderContent(mockProps(STEPS.ADDRESS_INFORMATION))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Declaration and Risk', () => {
      const result = renderContent(mockProps(STEPS.DECLARATION_RISK_MANAGEMENT))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Pep search', () => {
      const result = renderContent(mockProps(STEPS.PEP_SEARCH))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Report', () => {
      const result = renderContent(mockProps(STEPS.REPORT))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Update Status', () => {
      const result = renderContent(mockProps(ID_STATUS.UPDATE))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return Update Status Success', () => {
      const result = renderContent(mockProps(ID_STATUS.SUCCESS))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return null', () => {
      const result = renderContent(mockProps(''))
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('ProfileModal', () => {
    it('should match snapshot', () => {
      const mockProps = {
        id: '123',
        visible: true,
        afterClose: jest.fn(),
        modalContentType: STEPS.PROFILE,
        history: {},
      }
      const wrapper = render(<ProfileModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
