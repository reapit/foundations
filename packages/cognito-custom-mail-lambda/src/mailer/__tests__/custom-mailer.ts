import { customMailer } from '../custom-mailer'
import { CognitoUserPoolTriggerEvent, Context } from 'aws-lambda'

const context = {} as Context

describe('customMailer', () => {
  it('should just call the callback with the event if called when userPool does not match', async () => {
    process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
    const callback = jest.fn()
    const event = {
      triggerSource: 'CustomMessage_ForgotPassword',
      userPoolId: 'SOME_OTHER_ID',
      response: {},
      request: {},
    } as CognitoUserPoolTriggerEvent

    await customMailer(event, context, callback)
    expect(event.response).toEqual({})
    expect(callback).toHaveBeenCalledWith(null, event)
    expect(event.response).not.toContain('{userName}')
  })

  it('should just call the callback with the event if the userPool matches but no trigger source match', async () => {
    process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
    const callback = jest.fn()
    const event = {
      triggerSource: 'CreateAuthChallenge_Authentication',
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      response: {},
      request: {},
    } as CognitoUserPoolTriggerEvent

    await customMailer(event, context, callback)
    expect(event.response).toEqual({})
    expect(callback).toHaveBeenCalledWith(null, event)
  })

  it(
    'should call the callback with an updated event if the trigger ' + 'source is CustomMessage_ForgotPassword',
    async () => {
      process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
      process.env.MARKET_PLACE_URL = 'SOME_URL'
      const callback = jest.fn()
      const event = {
        triggerSource: 'CustomMessage_ForgotPassword',
        userPoolId: process.env.COGNITO_USERPOOL_ID,
        response: {},
        request: {
          codeParameter: 'SOME_CODE',
          userAttributes: {
            email: 'someone@bob.com',
          },
        },
      } as Partial<CognitoUserPoolTriggerEvent>

      await customMailer(event as CognitoUserPoolTriggerEvent, context, callback)
      expect(event.response).toMatchSnapshot('Forgot_password')
      expect(callback).toHaveBeenCalledWith(null, event)
      expect(event.response.emailMessage).not.toContain('{userName}')
      expect(event.response.emailMessage).not.toContain('{verificationCode}')
    },
  )

  it('should call the callback with an updated event if the trigger source is CustomMessage_SignUp', async () => {
    process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
    process.env.MARKET_PLACE_URL = 'SOME_URL'
    const callback = jest.fn()
    const event = {
      triggerSource: 'CustomMessage_SignUp',
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      response: {},
      request: {
        codeParameter: 'SOME_CODE',
        userAttributes: {
          email: 'someone@bob.com',
        },
      },
    } as Partial<CognitoUserPoolTriggerEvent>

    await customMailer(event as CognitoUserPoolTriggerEvent, context, callback)
    expect(event.response).toMatchSnapshot('Sign_up')
    expect(callback).toHaveBeenCalledWith(null, event)
    expect(event.response).not.toContain('{userName}')
    expect(event.response.emailMessage).not.toContain('{url}')
    expect(event.response.emailMessage).not.toContain('{code}')
  })

  it('should call the callback with an updated event if trigger source is CustomMessage_AdminCreateUser', async () => {
    process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
    process.env.MARKET_PLACE_URL = 'SOME_URL'
    const callback = jest.fn()
    const event = {
      triggerSource: 'CustomMessage_AdminCreateUser',
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      response: {},
      request: {
        codeParameter: 'SOME_CODE',
        userAttributes: {
          email: 'someone@bob.com',
        },
      },
    } as Partial<CognitoUserPoolTriggerEvent>

    await customMailer(event as CognitoUserPoolTriggerEvent, context, callback)
    expect(event.response).toMatchSnapshot('Admin_Create_User')
    expect(callback).toHaveBeenCalledWith(null, event)
    expect(event.response.emailMessage).not.toContain('{userName}')
    expect(event.response.emailMessage).not.toContain('{code}')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
