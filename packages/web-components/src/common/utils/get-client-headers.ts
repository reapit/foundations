export const getClientHeaders = (apiKey: string = '') => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  }
}
