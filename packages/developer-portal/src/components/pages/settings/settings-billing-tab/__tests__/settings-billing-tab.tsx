import React from 'react'
import { shallow } from 'enzyme'
import DeveloperBillingTabPage from '../settings-billing-tab'

describe('DeveloperBillingTabPage', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperBillingTabPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
