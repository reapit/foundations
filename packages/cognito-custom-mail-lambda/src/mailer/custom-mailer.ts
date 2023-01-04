import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import mjml from 'mjml'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import format from 'string-template'

const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/login`
const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/reset-password`

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch (event.triggerSource) {
      case 'CustomMessage_ForgotPassword':
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = format(
          mjml(readFileSync(resolve(__dirname, 'templates', 'forgot-password.mjml'), 'utf-8')).html,
          {
            verificationCode: event.request.codeParameter as string,
            userName: event.request.userAttributes.email,
            url: resetPasswordUrl,
          },
        )
        break

      case 'CustomMessage_SignUp':
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = format(
          mjml(readFileSync(resolve(__dirname, 'templates', 'confirm-registration.mjml'), 'utf-8')).html,
          {
            userName: event.request.userAttributes.email,
            url: confirmRegistrationUrl,
          },
        )
        break

      case 'CustomMessage_AdminCreateUser':
        event.response.emailSubject = 'Welcome to Reapit Connect'
        event.response.emailMessage = format(
          mjml(readFileSync(resolve(__dirname, 'templates', 'admin-user-invite.mjml'), 'utf-8')).html,
          {
            userName: event.request.userAttributes.email,
            url: confirmRegistrationUrl,
            verificationCode: event.request.codeParameter as string,
          },
        )
        break
    }
  }
  callback(null, event)
}
