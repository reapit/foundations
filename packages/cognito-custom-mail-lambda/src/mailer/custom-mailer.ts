import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { forgotPasswordTemplate, confirmRegistrationTemplate, adminUserInviteTemplate } from './templates/index'

export const customMailer: CognitoUserPoolTriggerHandler = (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Reapit Connect - Forgotten Password'
    const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/reset-password`
    event.response.emailMessage = forgotPasswordTemplate({
      verificationCode: event.request.codeParameter as string,
      userName: event.request.userAttributes.email,
      url: resetPasswordUrl,
    })
  }
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = 'Welcome to Reapit Connect'
    const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/register/confirm`
    event.response.emailMessage = confirmRegistrationTemplate({
      userName: event.request.userAttributes.email,
      url: confirmRegistrationUrl,
    })
  }
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = 'Welcome to Reapit Connect'
    const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/login`
    event.response.emailMessage = adminUserInviteTemplate({
      userName: event.request.userAttributes.email,
      url: confirmRegistrationUrl,
    })
  }
  callback(null, event)
}
