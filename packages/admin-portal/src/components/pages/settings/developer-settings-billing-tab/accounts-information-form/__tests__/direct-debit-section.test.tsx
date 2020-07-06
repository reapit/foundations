import React from 'react'
import { shallow } from 'enzyme'
import DirectDebitSection, { DirectDebitSectionProps } from '../direct-debit-section'

describe('DirectDebitSection', () => {
  const mockProps: DirectDebitSectionProps = {
    setFieldValue: jest.fn(),
    values: {
      contact: '',
      email: '',
      hasDirectDebit: 'yes',
      hasReapitAccountsRef: 'yes',
      phoneNumber: '',
      reapitAccountsRef: '123456',
    },
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
