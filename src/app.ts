import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { sendForgotPasswordMail, sendConfirmRegistrationMail } from './mailer/custom-mailer'

export const forgotPasswordHandler: CognitoUserPoolTriggerHandler = (event, context, callback) =>
  sendForgotPasswordMail(event, context, callback)

export const confirmRegistrationHandler: CognitoUserPoolTriggerHandler = (event, context, callback) =>
  sendConfirmRegistrationMail(event, context, callback)
