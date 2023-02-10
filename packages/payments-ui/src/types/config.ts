export interface ClientConfigModel {
  clientCode: string
  companyName?: string
  logoUri?: string
  isLive: boolean
  isConfigured: boolean
  configId?: string
}

export interface ClientConfigCreateModel {
  clientCode: string
  isLive: boolean
  vendorName?: string
  integrationKey?: string
  passKey?: string
  companyName?: string
  logoUri?: string
  configId?: string
}

export interface ClientConfigDeleteModel {
  configId?: string
}
