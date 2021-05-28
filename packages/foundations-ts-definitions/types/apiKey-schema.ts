export enum ApiKeyEntityType {
  PAYMENT = 'payment',
  DEPLOYMENT = 'deployment',
}

export interface ApiKeyInterface {
  apiKey?: string
	keyCreatedAt?: string
	keyExpiresAt?: string
	developerId?: string
	entityId?: string
	entityType?: ApiKeyEntityType
}
