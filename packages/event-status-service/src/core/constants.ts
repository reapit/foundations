export const DYNAMO_DB = {
  region: process.env.DYNAMO_DB_REGION,
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
  tableNames: {
    eventStatuses: 'Cloud_Event_Statuses',
    automations: 'Cloud_Automations',
    conversations: 'Cloud_Conversations',
  },
}
