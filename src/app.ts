import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { customMailer } from './mailer/custom-mailer'

export const mailHandler: CognitoUserPoolTriggerHandler = (event, context, callback) =>
  customMailer(event, context, callback)
