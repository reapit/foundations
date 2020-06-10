import React from 'react'
import { shallow } from 'enzyme'
import DeveloperBillingTabPage from '../developer-settings-billing-tab'
import * as ReactRedux from 'react-redux'

describe('DeveloperBillingTabPage', () => {
  it('should match snapshot when isAdmin = false', () => {
    jest.spyOn(ReactRedux as any, 'useSelector').mockReturnValue(false)
    const wrapper = shallow(<DeveloperBillingTabPage />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when isAdmin = false', () => {
    jest.spyOn(ReactRedux as any, 'useSelector').mockReturnValue(true)
    const wrapper = shallow(<DeveloperBillingTabPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
