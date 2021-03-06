export const DYNAMO_DB = {
  region: process.env.DYNAMO_DB_REGION,
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
  tableNames: {
    eventStatuses: 'Cloud_Event_Statuses',
    automations: 'Cloud_Automations',
    conversations: 'Cloud_Conversations',
  },
}

export const TWILIO = {
  accountId: process.env.TWILIO_ACC_ID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
}

export const PLATFORM_API_BASE_URL = process.env.PLATFORM_API_BASE_URL

export const ALLOWED_WEBHOOK_SIGNATURES = (process.env.ALLOWED_WEBHOOK_SIGNATURES || '').split(',')
