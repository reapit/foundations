import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { forgotPasswordTemplate, confirmRegistrationTemplate } from './templates/index'

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch (event.triggerSource) {
      case 'CustomMessage_ForgotPassword':
        event.response.emailSubject = 'Reapit Foundations: Forgotten Password'
        event.response.emailMessage = await forgotPasswordTemplate({
          verificationCode: event.request.codeParameter as string,
          userName: event.request.userAttributes.email
        })
        break
      case 'CustomMessage_SignUp':
        event.response.emailSubject = 'Welcome to Reapit Foundations'
        event.response.emailMessage = await confirmRegistrationTemplate({
          userName: event.request.userAttributes.email
        })
        break
    }
  }
  callback(null, event)
}
