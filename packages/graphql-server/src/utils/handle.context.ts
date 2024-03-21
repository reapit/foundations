import { generateConfigurationLoader } from './../resolvers/configurations/dataloader'
import { generatePropertyLoader } from './../resolvers/properties/dataloader'
import { generateOfficeLoader } from './../resolvers/offices/dataloader'
import { generateNegotiatorLoader } from './../resolvers/negotiators/dataloader'
import { v4 as uuid } from 'uuid'
import { Context } from 'apollo-server-core'
import { ServerDataLoader } from './server.data.loader'
import { generateContactLoader } from '../resolvers/contacts/dataloader'

export type ServerContext = Context<{ traceId: string; authorization: string; dataLoader: ServerDataLoader }>

export const headersToContext = (headers: Record<string, any>, extras: Record<string, any>) => {
  const reapitCustomer = headers['reapit-customer'] ?? 'UNKNOWN-CUSTOMER'
  const traceId = `${reapitCustomer}-${uuid()}`
  const newContext = {
    traceId: traceId,
    headers: headers,
    authorization: headers['reapit-connect-token'] ?? '',
    ...extras,
  } as any
  const dataLoader = {
    configurationLoader: generateConfigurationLoader(newContext),
    propertyLoader: generatePropertyLoader(newContext),
    officeLoader: generateOfficeLoader(newContext),
    negotiatorLoader: generateNegotiatorLoader(newContext),
    contactLoader: generateContactLoader(newContext),
  } as ServerDataLoader
  newContext.dataLoader = dataLoader
  return newContext
}

export const handleContext = ({ event, context }) => {
  const extras = {
    functionName: context.functionName,
    event,
    context,
  }
  return headersToContext(event.headers, extras)
}
