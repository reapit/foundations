import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { forgotPasswordTemplate, confirmRegistrationTemplate } from './templates/index'

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Reapit Foundations: Forgotten Password'
    const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/developer/reset-password`
    event.response.emailMessage = await forgotPasswordTemplate({
      verificationCode: event.request.codeParameter as string,
      userName: event.request.userAttributes.email,
      url: resetPasswordUrl
    })
  }
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = 'Welcome to Reapit Foundations'
    const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/register/confirm`
    event.response.emailMessage = await confirmRegistrationTemplate({
      userName: event.request.userAttributes.email,
      url: confirmRegistrationUrl
    })
  }
  callback(null, event)
}
