import { PropertyProjectorConfig } from './schema'

export type GetByOfficeIdParams = { traceId: string; data: Pick<PropertyProjectorConfig, 'customerId' | 'officeId'> }
export type CreateParams = { traceId: string; data: PropertyProjectorConfig }

export type UpdateParams = {
  traceId: string
  data: Partial<PropertyProjectorConfig> & { customerId: Pick<PropertyProjectorConfig, 'customerId' | 'officeId'> }
}

export type DeleteParams = { traceId: string; data: Pick<PropertyProjectorConfig, 'customerId' | 'officeId'> }