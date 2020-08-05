import React from 'react'
import { shallow } from 'enzyme'
import AccountStatusSection, { capitalizeFirstLetter } from '../account-status-section'

const defaultProps = {
  initialStatus: 'pending',
  isSubmittedDebit: true,
  hasReapitAccountsRef: 'yes',
}
describe('AccountStatusSection', () => {
  test('capitalizeFirstLetter', () => {
    expect(capitalizeFirstLetter('ab')).toBe('Ab')
    expect(capitalizeFirstLetter('aaB')).toBe('AaB')
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with status !== pending', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} initialStatus="incomplete" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with hasReapitAccountsRef is no', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} hasReapitAccountsRef="no" />)
    expect(wrapper).toMatchSnapshot()
  })
})
