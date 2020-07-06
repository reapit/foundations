import React from 'react'
import { shallow } from 'enzyme'
import { RegisterConfirm, handleUseEffect } from '../register-confirm'
import Routes from '@/constants/routes'
import { confirmRegistration } from '@reapit/cognito-auth'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({ location: { search: '?userName=mockUserName@gmail.com&verificationCode=123' } }),
  useHistory: () => ({ replace: jest.fn() }),
}))

jest.mock('@reapit/cognito-auth', () => ({
  confirmRegistration: jest.fn().mockResolvedValue('success'),
}))

describe('register-confirm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<RegisterConfirm />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    const mockParams = {
      userName: 'mockUserName@gmail.com',
      verificationCode: '123',
      replace: jest.fn(),
    }
    const replaceSpy = jest.spyOn(mockParams, 'replace')
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should call replace on success with correct params', async () => {
      const fn = handleUseEffect(mockParams)
      fn()
      /* hack to flush promise https://github.com/facebook/jest/issues/2157 */
      await new Promise(resolve => setImmediate(resolve))
      expect(replaceSpy).toHaveBeenCalledWith(`${Routes.DEVELOPER_LOGIN}?isSuccess=1`)
    })

    it('should call replace on fail with correct params', async () => {
      ;(confirmRegistration as jest.Mocked<any>).mockRejectedValue('error')
      const fn = handleUseEffect(mockParams)
      fn()
      await new Promise(resolve => setImmediate(resolve))
      expect(replaceSpy).toHaveBeenCalledWith(`${Routes.DEVELOPER_LOGIN}?confirmError=1`)
    })
  })
})
