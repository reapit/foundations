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
      reapitAccountsRef: '',
    },
  }
  it('should match snapshot', () => {
    const wrapper = shallow(<DirectDebitSection {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
