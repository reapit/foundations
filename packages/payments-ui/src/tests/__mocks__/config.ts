import { ClientConfigCreateModel, ClientConfigModel } from '../../types/config'

export const mockConfigCreateModel: ClientConfigCreateModel = {
  clientCode: 'SBOX',
  vendorName: 'MOCK_VENDOR',
  integrationKey: 'MOCK_KEY',
  passKey: 'MOCK_KEY',
  companyName: 'Reapit Ltd',
  logoUri: 'https://logo.png',
  isLive: true,
}

export const mockConfigModel: ClientConfigModel = {
  clientCode: 'SBOX',
  companyName: 'Reapit Ltd',
  logoUri: 'https://logo.png',
  isLive: true,
  isConfigured: true,
}
