export enum KeyType {
  PAYMENT = 'payment',
  DEPLOYMENT = 'deployment',
}

export interface ApiKeyInterface {
  apiKey: string
  keyType: KeyType
	keyCreatedAt: string
	keyExpiresAt: string
	clientCode: string
}

export interface PaymentApiKeyInterface extends ApiKeyInterface {
	paymentId: string
}

export interface DeploymentApiKeyInterface extends ApiKeyInterface {
	developmentId: string
	organisationId?: string
}
