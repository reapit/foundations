import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import forgotPasswordTemplate from './templates/forgot-password.html'
import confirmRegistrationTemplate from './templates/confirm-registration.html'
import adminUserInviteTemplate from './templates/admin-user-invite.html'

const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/login`
const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/reset-password`

const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(find, 'g'), replace)
}

const format = (html: string, object: Object) => {
  Object.entries(object).forEach(([key, value]) => {
    html = replaceAll(html, `{${key}}|{ ${key} }`, value)
  })
  return html
}

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch (event.triggerSource) {
      case 'CustomMessage_ForgotPassword':
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = format(forgotPasswordTemplate, {
          verificationCode: event.request.codeParameter as string,
          userName: event.request.userAttributes.name,
          url: resetPasswordUrl,
        })

        break

      case 'CustomMessage_SignUp':
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = format(confirmRegistrationTemplate, {
          // userName: event.request.userAttributes.name,
          url: confirmRegistrationUrl,
        })
        break

      case 'CustomMessage_AdminCreateUser':
        event.response.emailSubject = 'Welcome to Reapit Connect'
        event.response.emailMessage = `${format(adminUserInviteTemplate, {
          name: event.request.userAttributes.name,
          url: confirmRegistrationUrl,
          verificationCode: event.request.codeParameter as string,
        })}`
        break
    }
  }
  callback(null, event)
}
