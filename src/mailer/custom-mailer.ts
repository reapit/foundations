import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { forgotPasswordTemplate, confirmRegistrationTemplate } from './templates/index'

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch (event.triggerSource) {
      case 'CustomMessage_ForgotPassword':
        event.response.emailSubject = 'Reapit Foundations: Forgotten Password'
        // TODO will replace by env
        const resetPasswordUrl = 'https://dev.marketplace.reapit.com/developer/reset-password'
        event.response.emailMessage = await forgotPasswordTemplate({
          verificationCode: event.request.codeParameter as string,
          userName: event.request.userAttributes.email,
          url: resetPasswordUrl
        })
        break
      case 'CustomMessage_SignUp':
        event.response.emailSubject = 'Welcome to Reapit Foundations'
        // TODO will replace by env
        const confirmRegistrationUrl = 'https://dev.marketplace.reapit.com/register/confirm'
        event.response.emailMessage = await confirmRegistrationTemplate({
          userName: event.request.userAttributes.email,
          url: confirmRegistrationUrl
        })
        break
    }
  }
  callback(null, event)
}
