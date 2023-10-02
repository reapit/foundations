import React from 'react'
import { RegisterConfirm, handleUseEffect } from '..'
import Routes from '../../../../constants/routes'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../services/cognito-identity', () => ({
  confirmRegistration: jest.fn().mockResolvedValue('success'),
}))

describe('RegisterConfirm', () => {
  it('should match snapshot', () => {
    const wrapper = render(<RegisterConfirm />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    const mockParams = {
      userName: 'mockUserName@gmail.com',
      verificationCode: '123',
      navigate: jest.fn(),
    }
    const replaceSpy = jest.spyOn(mockParams, 'navigate')

    it('should call replace on success with correct params', async () => {
      const curried = handleUseEffect(mockParams)

      curried()

      await new Promise((resolve) => resolve(curried()))
      expect(replaceSpy).toHaveBeenCalledWith(`${Routes.LOGIN}?isSuccess=1`)
    })
  })
})
