export enum KeyType {
  PAYMENT = 'payment',
  DEPLOYMENT = 'deployment',
}

export interface ApiKeyInterface {
  apiKey?: string
  keyType?: KeyType
	keyCreatedAt?: string
	keyExpiresAt?: string
	clientCode?: string
	developerId?: string
	paymentId?: string
}
