import { WebComponentConfig } from './schema'

export type GetByClientIdParams = { traceId: string; data: Pick<WebComponentConfig, 'customerId'> }
export type CreateParams = { traceId: string; data: WebComponentConfig }

export type UpdateParams = {
  traceId: string
  data: Partial<WebComponentConfig> & { customerId: WebComponentConfig['customerId'] }
}

export type DeleteParams = { traceId: string; data: Pick<WebComponentConfig, 'customerId'> }
