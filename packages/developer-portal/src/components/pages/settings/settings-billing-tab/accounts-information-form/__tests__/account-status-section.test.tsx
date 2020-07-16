import React from 'react'
import { shallow } from 'enzyme'
import AccountStatusSection from '../account-status-section'

const defaultProps = {
  status: 'pending',
  isSubmittedDebit: true,
  hasReapitAccountsRef: 'yes',
}
describe('AccountStatusSection', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with status !== pending', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} status="incomplete" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with hasReapitAccountsRef is no', () => {
    const wrapper = shallow(<AccountStatusSection {...defaultProps} hasReapitAccountsRef="n" />)
    expect(wrapper).toMatchSnapshot()
  })
})
