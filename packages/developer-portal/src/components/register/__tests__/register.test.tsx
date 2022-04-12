import React, { MouseEvent } from 'react'
import { Register, onSubmit, onDeclineTermsAndConditions, onLoginButtonClick, formSubmit } from '../register'
import { DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import MockDate from 'mockdate'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { render } from '../../../tests/react-testing'

const mockRegisterFormValues: CreateDeveloperModel = {
  name: 'test',
  companyName: 'test',
  email: 'test@email.com',
  telephone: '9991112311',
  agreedTerms: '',
}

describe('Register', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
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

  it('should submit correctly', () => {
    const createDeveloper = jest.fn()
    const curried = onSubmit(createDeveloper)

    curried(mockRegisterFormValues)

    expect(createDeveloper).toHaveBeenCalledWith({
      ...mockRegisterFormValues,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })
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
