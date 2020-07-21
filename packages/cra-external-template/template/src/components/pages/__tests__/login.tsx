import * as React from 'react'
import { render } from '@testing-library/react'
import { shallow } from 'enzyme'
import { Button } from '@reapit/elements'
import { ReapitConnectBrowserSessionInstance } from '../../../core/connect-session'
import { Login } from '../login'

jest.mock('../../../core/connect-session', () => ({
  ReapitConnectBrowserSessionInstance: {
    instance: {
      connectLoginRedirect: jest.fn(),
    },
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('loginHandler', () => {
  it('should correctly call redirect on click', () => {
    const wrapper = shallow(<Login />)

    wrapper
      .find(Button)
      .first()
      .simulate('click')

    expect(ReapitConnectBrowserSessionInstance.instance.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
