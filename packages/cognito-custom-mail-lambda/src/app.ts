import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { customMailer } from './mailer/custom-mailer'

export const cognitoCustomMailerHandler: CognitoUserPoolTriggerHandler = (event, context, callback) =>
  customMailer(event, context, callback)

export default cognitoCustomMailerHandler
