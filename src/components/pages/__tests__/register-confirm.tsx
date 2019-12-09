import React from 'react'
import { shallow } from 'enzyme'
import { RegisterConfirm, handleUseEffect } from '../register-confirm'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({ location: { search: '?userName=mockUserName@gmail.com&verificationCode=123' } }),
  useHistory: () => ({ replace: jest.fn() })
}))

jest.mock('../register-confirm', () => ({
  ...jest.requireActual('../register-confirm'),
  callConfirmRegistration: jest.fn().mockResolvedValue({})
}))

describe('register-confirm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<RegisterConfirm />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    it('should call replace', done => {
      const mockParams = {
        userName: 'mockUserName@gmail.com',
        verificationCode: '123',
        replace: jest.fn()
      }
      const fn = handleUseEffect(mockParams)
      fn()
      setTimeout(() => {
        expect(mockParams.replace).toHaveBeenCalled()
        done()
      }, 500)
    })
  })
})
