import * as React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../tabs'
import toJson from 'enzyme-to-json'
import { tabConfigs, LoginProps } from '../../pages/login'

const loginProps: Partial<LoginProps> = {
  loginType: 'CLIENT',
  authChangeLoginType: jest.fn()
}

describe('Tabs', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Tabs tabConfigs={tabConfigs(loginProps as LoginProps)} />))).toMatchSnapshot()
  })

  it('simulates afterClose event', () => {
    const wrapper = shallow(<Tabs tabConfigs={tabConfigs(loginProps as LoginProps)} />)
    wrapper
      .find('a')
      .first()
      .simulate('click', {
        preventDefault: jest.fn()
      })
    expect(loginProps.authChangeLoginType).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
