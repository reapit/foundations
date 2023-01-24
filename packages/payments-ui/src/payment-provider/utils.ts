import { ClientConfigModel } from '../types/config'

export const genPaymentsHeaders = ({ integrationKey, passKey }: ClientConfigModel) => {
  const keys = `${integrationKey}:${passKey}`
  const encoded = window.btoa(keys)
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${encoded}`,
  }
}
