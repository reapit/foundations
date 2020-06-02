export const FIELD_NAMES: { [x: string]: string } = {
  NAME: 'developerInviteName',
  EMAIL: 'developerInviteEmail',
  MESSAGE: 'developerInviteMessage',
}

export const ERRORS_MESSAGES: { [x: string]: string } = {
  NAME: 'Name can not be empty',
  EMAIL: 'Invalid Email',
  MESSAGE: 'Must be less than 150 characters',
}

export const MAX_MESSAGE_LENGTH = 150
