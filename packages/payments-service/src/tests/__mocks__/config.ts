import { ClientConfigModel } from '@reapit/payments-ui'
import { ClientConfigDto } from '../../client-config/dto'

export const mockConfigCreateModel: ClientConfigDto = {
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
