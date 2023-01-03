import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import mjml from 'mjml'
import { readFileSync } from 'fs'
import { configure, render } from 'eta'
import { resolve } from 'path'

configure({ tags: ['{{', '}}'], views: ['.'] })

const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/login`
const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/reset-password`

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch(event.triggerSource) {
      case "CustomMessage_ForgotPassword":
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = await render(mjml(readFileSync(resolve(__dirname, "templates", "forgot-password.mjml"), "utf-8")).html, {
          verificationCode: event.request.codeParameter as string,
          userName: event.request.userAttributes.email,
          url: resetPasswordUrl,
        }) as string
        break

      case "CustomMessage_SignUp":
        event.response.emailSubject = 'Reapit Connect - Forgotten Password'
        event.response.emailMessage = await render(mjml(readFileSync(resolve(__dirname, "templates", "confirm-registration.mjml"), "utf-8")).html, {
          userName: event.request.userAttributes.email,
          url: confirmRegistrationUrl,
        }) as string
        break

      case "CustomMessage_AdminCreateUser":
        event.response.emailSubject = 'Welcome to Reapit Connect'
        event.response.emailMessage = await render(mjml(readFileSync(resolve(__dirname, "templates", "admin-user-invite.mjml"), "utf-8")).html, {
          userName: event.request.userAttributes.email,
          url: confirmRegistrationUrl,
          verificationCode: event.request.codeParameter as string,
        }) as string
        break
    }
  }
  callback(null, event)
}
