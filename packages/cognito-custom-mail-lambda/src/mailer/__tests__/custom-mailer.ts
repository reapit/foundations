import { customMailer } from '../custom-mailer'
import { CognitoUserPoolTriggerEvent, Context } from 'aws-lambda'
import { confirmRegistrationTemplate, forgotPasswordTemplate, adminUserInviteTemplate } from '../templates/index'

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
      expect(event.response).toEqual({
        emailSubject: 'Reapit Connect - Forgotten Password',
        emailMessage: await forgotPasswordTemplate({
          verificationCode: event.request?.codeParameter as string,
          userName: event.request?.userAttributes.email as string,
          url: 'SOME_URL/reset-password',
        }),
      })
      expect(callback).toHaveBeenCalledWith(null, event)
    },
  )

  // it('should call the callback with an updated event if the trigger source is CustomMessage_SignUp', async () => {
  //   process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
  //   process.env.MARKET_PLACE_URL = 'SOME_URL'
  //   const callback = jest.fn()
  //   const event = {
  //     triggerSource: 'CustomMessage_SignUp',
  //     userPoolId: process.env.COGNITO_USERPOOL_ID,
  //     response: {},
  //     request: {
  //       codeParameter: 'SOME_CODE',
  //       userAttributes: {
  //         email: 'someone@bob.com',
  //       },
  //     },
  //   } as Partial<CognitoUserPoolTriggerEvent>

  //   await customMailer(event as CognitoUserPoolTriggerEvent, context, callback)
  //   expect(event.response).toEqual({
  //     emailSubject: 'Welcome to Reapit Connect',
  //     emailMessage: await confirmRegistrationTemplate({
  //       userName: event.request?.userAttributes.email as string,
  //       url: 'SOME_URL/register/confirm',
  //     }),
  //   })
  //   expect(callback).toHaveBeenCalledWith(null, event)
  // })

  // it('should call the callback with an updated event if trigger source is CustomMessage_AdminCreateUser', async () => {
  //   process.env.COGNITO_USERPOOL_ID = 'SOME_ID'
  //   process.env.MARKET_PLACE_URL = 'SOME_URL'
  //   const callback = jest.fn()
  //   const event = {
  //     triggerSource: 'CustomMessage_AdminCreateUser',
  //     userPoolId: process.env.COGNITO_USERPOOL_ID,
  //     response: {},
  //     request: {
  //       codeParameter: 'SOME_CODE',
  //       userAttributes: {
  //         email: 'someone@bob.com',
  //       },
  //     },
  //   } as Partial<CognitoUserPoolTriggerEvent>

  //   await customMailer(event as CognitoUserPoolTriggerEvent, context, callback)
  //   expect(event.response).toEqual({
  //     emailSubject: 'Welcome to Reapit Connect',
  //     emailMessage: await adminUserInviteTemplate({
  //       userName: event.request?.userAttributes.email as string,
  //       url: 'SOME_URL/login',
  //     }),
  //   })
  //   expect(callback).toHaveBeenCalledWith(null, event)
  // })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
