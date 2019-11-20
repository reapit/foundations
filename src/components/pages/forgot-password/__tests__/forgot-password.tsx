import React from 'react'
import { shallow } from 'enzyme'
import { ForgotPassword } from '../forgot-password'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('ForgotPassword', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        state: {},
        search: '?isSuccessRequestResetPassword=1'
      }
    }
    const wrapper = shallow(<ForgotPassword {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('[className="pb-8"]')).toHaveLength(2)
  })

  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        state: {},
        search: ''
      }
    }
    const wrapper = shallow(<ForgotPassword {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('EnhanceForgotPasswordForm')).toHaveLength(1)
  })
})
