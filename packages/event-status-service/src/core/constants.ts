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
