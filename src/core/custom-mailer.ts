import { CognitoUserPoolTriggerHandler } from 'aws-lambda'

export const customMailer: CognitoUserPoolTriggerHandler = (event, _context, callback) => {
  if (event.userPoolId === process.env.COGNITO_USERPOOL_ID) {
    switch (event.triggerSource) {
      case 'CustomMessage_ForgotPassword':
        event.response.emailSubject = 'Reapit Foundations: Forgotten Password'
        event.response.emailMessage = 'Your verification code is ' + event.request.codeParameter
        break
      case 'CustomMessage_SignUp':
        event.response.emailSubject = 'Welcome to Reapit Foundations'
        event.response.emailMessage =
          'Welcome to the service. Your user name is ' +
          event.request.usernameParameter +
          'Thank you for signing up. ' +
          event.request.codeParameter +
          ' is your verification code'
        break
    }
  }
  callback(null, event)
}
