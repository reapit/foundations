import { WebComponentConfig } from './schema'

export type GetByClientIdParams = { traceId: string; data: Pick<WebComponentConfig, 'customerId' | 'appId'> }
export type CreateParams = { traceId: string; data: WebComponentConfig }

export type UpdateParams = {
  traceId: string
  data: Partial<WebComponentConfig> & { customerId: Pick<WebComponentConfig, 'customerId' | 'appId'> }
}

export type DeleteParams = { traceId: string; data: Pick<WebComponentConfig, 'customerId' | 'appId'> }