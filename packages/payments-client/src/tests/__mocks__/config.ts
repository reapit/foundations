import { ClientConfigCreateModel, ClientConfigModel } from '@reapit/payments-ui'

export const mockConfigModel: ClientConfigModel = {
  clientCode: 'SBOX',
  companyName: 'Reapit Ltd',
  logoUri: 'https://logo.png',
  isLive: false,
  isConfigured: true,
}

export const mockConfigCreateModel: ClientConfigCreateModel = {
  clientCode: 'SBOX',
  vendorName: 'MOCK_VENDOR',
  integrationKey: 'MOCK_KEY',
  passKey: 'MOCK_KEY',
  companyName: 'Reapit Ltd',
  logoUri: 'https://logo.png',
  isLive: false,
}
