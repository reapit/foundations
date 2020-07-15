import React from 'react'
import { shallow } from 'enzyme'
import DirectDebitSection, { DirectDebitSectionProps, handleFinish, handleCloseModal } from '../direct-debit-section'
import formFields from '../form-schema/form-fields'

const { statusField, hasDirectDebitField } = formFields

describe('DirectDebitSection', () => {
  const mockProps: DirectDebitSectionProps = {
    setFieldValue: jest.fn(),
    values: {
      hasDirectDebit: 'yes',
      hasReapitAccountsRef: 'yes',
    },
    setIsSubmittedDebit: jest.fn(),
  }
  it('should match snapshot', () => {
    const wrapper = shallow(<DirectDebitSection {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const props = {
      ...mockProps,
      values: {
        ...mockProps.values,
        hasReapitAccountsRef: 'no',
      },
    }
    const wrapper = shallow(<DirectDebitSection {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleFinish', () => {
  it('should run correctly', () => {
    const setIsSubmittedDebit = jest.fn()
    const setFieldValue = jest.fn()
    const setIsOpenDirectDebitModal = jest.fn()

    const fn = handleFinish({
      setIsOpenDirectDebitModal,
      setFieldValue,
      setIsSubmittedDebit,
    })

    fn()
    expect(setIsOpenDirectDebitModal).toHaveBeenCalledWith(false)
    expect(setFieldValue).toHaveBeenCalledWith(statusField.name, 'pending')
    expect(setFieldValue).toHaveBeenCalledWith(hasDirectDebitField.name, 'yes')
    expect(setIsSubmittedDebit).toHaveBeenCalledWith(true)
  })
})

describe('handleCloseModal', () => {
  it('should run correctly', () => {
    const setIsOpenDirectDebitModal = jest.fn()

    const fn = handleCloseModal(setIsOpenDirectDebitModal)

    fn()
    expect(setIsOpenDirectDebitModal).toHaveBeenCalledWith(false)
  })
})
