import React, { MouseEvent } from 'react'
import { Register, onSubmit, onDeclineTermsAndConditions, onLoginButtonClick, formSubmit } from '..'
import MockDate from 'mockdate'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { render } from '../../../tests/react-testing'
import { DATE_TIME_FORMAT } from '@reapit/utils-common'
import { createDeveloperService } from '../../../services/developer'

const mockRegisterFormValues: Marketplace.CreateDeveloperModel = {
  name: 'test',
  companyName: 'test',
  email: 'test@email.com',
  telephone: '9991112311',
  agreedTerms: '',
}

jest.mock('../../../services/developer', () => ({
  createDeveloperService: jest.fn(),
}))

const mockCreateDevelperService = createDeveloperService as jest.Mock

describe('Register', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(render(<Register />)).toMatchSnapshot()
  })
})

describe('onSubmit', () => {
  beforeAll(() => {
    MockDate.set(new Date('2020-05-21'))
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should submit correctly', async () => {
    mockCreateDevelperService.mockReturnValue(true)
    const setDeveloperState = jest.fn()
    const error = jest.fn()
    const curried = onSubmit(mockRegisterFormValues, setDeveloperState, error)

    await curried()

    expect(createDeveloperService).toHaveBeenCalledWith({
      ...mockRegisterFormValues,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })

    expect(error).not.toHaveBeenCalled()
    expect(setDeveloperState).toHaveBeenCalledWith('SUCCESS')
  })

  it('should fail correctly', async () => {
    mockCreateDevelperService.mockReturnValue('Err message')
    const setDeveloperState = jest.fn()
    const error = jest.fn()
    const curried = onSubmit(mockRegisterFormValues, setDeveloperState, error)

    await curried()

    expect(createDeveloperService).toHaveBeenCalledWith({
      ...mockRegisterFormValues,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })

    expect(error.mock.calls[0][0]).toEqual('Err message')
    expect(setDeveloperState).toHaveBeenCalledWith('ERROR')
  })
})

describe('onDeclineTermsAndConditions', () => {
  it('should handle declining T&Cs ', () => {
    const mockSetTermsAndConditionsModalVisible = jest.fn()
    const curried = onDeclineTermsAndConditions(mockSetTermsAndConditionsModalVisible)
    curried()
    expect(mockSetTermsAndConditionsModalVisible).toBeCalledWith(false)
  })
})

describe('onLoginButtonClick', () => {
  it('should redirect to developer login page', () => {
    const loginSpy = jest.spyOn(reapitConnectBrowserSession, 'connectLoginRedirect')
    const curried = onLoginButtonClick()
    const event = {
      preventDefault: jest.fn(),
    }
    curried(event as unknown as MouseEvent)
    expect(loginSpy).toHaveBeenCalledTimes(1)
  })
})

describe('formSubmit', () => {
  it('should set modal visible', () => {
    const setAgreeModalVisable = jest.fn()

    const curried = formSubmit(setAgreeModalVisable)

    curried()

    expect(setAgreeModalVisable).toHaveBeenCalledWith(true)
  })
})
