import React from 'react'
import { shallow } from 'enzyme'
import ReapitReferenceSection, { ReapitReferenceSectionProps } from '../reapit-reference-section'

describe('DirectDebitSection', () => {
  const mockProps: ReapitReferenceSectionProps = {
    setFieldValue: jest.fn(),
    values: {
      hasDirectDebit: 'yes',
      hasReapitAccountsRef: 'yes',
    },
  }
  it('should match snapshot', () => {
    const wrapper = shallow(<ReapitReferenceSection {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
