import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import forgotPasswordTemplate from './templates/forgot-password.html'
import confirmRegistrationTemplate from './templates/confirm-registration.html'
import adminUserInviteTemplate from './templates/admin-user-invite.html'
import { UserModel } from '@reapit/foundations-ts-definitions'
import * as oldTemplates from './templates/old-templates'

const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/login`
const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/reset-password`
const internalOrgServiceUrl = process.env.INTERNAL_ORG_SERVICE_URL
const agentboxUrl = process.env.AGENTBOX_URL
const titles: string[] = [
  'Mr',
  'Mrs',
  'Dr',
  'Doctor',
  'Master',
  'Miss',
  'Ms',
  'Sir',
  'Mdm',
  'Madam',
  'Dame',
  'Lord',
  'Lady',
  'Esq',
  'Prof',
  'Professor',
]

const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(find, 'g'), replace)
}

const format = (html: string, object: Object) => {
  Object.entries(object).forEach(([key, value]) => {
    html = replaceAll(html, `{${key}}|{ ${key} }`, value)
  })
  return html
}

const getConfirmRegistrationUrl = async (emailAddress: string) => {
  const userId = replaceAll(Buffer.from(emailAddress).toString('base64'), '=', '')
  console.log(userId)
  const res = await fetch(`${internalOrgServiceUrl}/Users/${userId}`, {
    headers: {
      'api-version': '2020-01-31',
    },
  })
  if (res.status === 404) {
    console.error(new Error('user not found, assuming AC'))
    return confirmRegistrationUrl
  }
  if (!res.ok) {
    console.error(new Error('error getting user, assuming AC'))
    return confirmRegistrationUrl
  }
  const user: UserModel = await res.json()
  if (user.products.length === 1 && user.products[0].id === 'agentbox') {
    return agentboxUrl
  }
  return confirmRegistrationUrl
}

const tryGetFirstName = (input?: string) => {
  const trimmed = input.trim()

  if (!trimmed.length || trimmed.length < 2) {
    return input
  }

  const nameParts: string[] = trimmed.split(' ')

  if (nameParts.length < 3) {
    return nameParts[0]
  }

  return titles.includes(nameParts[0]) ? nameParts[1] : nameParts[0]
}

const useOldTemplates = false

export const customMailer: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  switch (event.triggerSource) {
    case 'CustomMessage_ForgotPassword': {
      event.response.emailSubject = 'Reapit Connect - Forgotten Password'
      const obj = {
        verificationCode: event.request.codeParameter as string,
        userName: tryGetFirstName(event.request.userAttributes.name),
        url: resetPasswordUrl,
      }
      event.response.emailMessage = useOldTemplates
        ? oldTemplates.forgotPasswordTemplate(obj)
        : format(forgotPasswordTemplate, obj)
      break
    }

    case 'CustomMessage_SignUp': {
      event.response.emailSubject = 'Welcome to Reapit Connect'
      const obj = {
        url: await getConfirmRegistrationUrl(event.request.userAttributes.email),
        userName: tryGetFirstName(event.request.userAttributes.name),
      }
      event.response.emailMessage = useOldTemplates
        ? oldTemplates.confirmRegistrationTemplate(obj)
        : format(confirmRegistrationTemplate, obj)
      break
    }

    case 'CustomMessage_AdminCreateUser': {
      event.response.emailSubject = 'Welcome to Reapit Connect'
      const obj = {
        name: tryGetFirstName(event.request.userAttributes.name),
        userName: tryGetFirstName(event.request.userAttributes.name),
        url: await getConfirmRegistrationUrl(event.request.userAttributes.email),
        verificationCode: event.request.codeParameter as string,
      }
      event.response.emailMessage = `${
        useOldTemplates ? oldTemplates.adminUserInviteTemplate(obj) : format(adminUserInviteTemplate, obj)
      }`
      break
    }
  }
  callback(null, event)
}
