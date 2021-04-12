export const getClientHeaders = ({ apiKey = '', customerId = '' }: { apiKey?: string; customerId?: string }) => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'reapit-customer': customerId,
  }
}
