import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { createBrowserHistory } from 'history'
import { PrivateRoute, isNotAllowedToAccess, handleRedirectToAuthenticationPage } from '../private-route'
import Routes from '@/constants/routes'
import { LoginIdentity } from '@reapit/connect-session'
import { BrowserRouter as Router } from 'react-router-dom'

describe('PrivateRouter', () => {
  const history = createBrowserHistory()
  jest.spyOn(history, 'replace')
  const TestComp = () => <div>alivba</div>

  it('should match a snapshot', () => {
    expect(shallow(<PrivateRoute component={TestComp} />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = mount(
      <Router>
        <PrivateRoute component={TestComp} />
      </Router>,
    )
    const spy = jest.spyOn(wrapper.instance(), 'componentDidMount')
    expect(spy).not.toHaveBeenCalled()
  })

  describe('isNotAllowedToAccess', () => {
    it('should return false if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess({} as LoginIdentity)).toBeFalsy()
    })
    it('should return true if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess({ developerId: 'developerId' } as LoginIdentity)).toBeTruthy()
    })
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        developerId: '',
      } as LoginIdentity

      const fnNotCall = handleRedirectToAuthenticationPage(history)
      fnNotCall()
      expect(history.replace).not.toHaveBeenCalled()

      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.AUTHENTICATION}/developer`)
    })
  })
})
