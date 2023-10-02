export type WebhookModelPagedResult = {
  _embedded?: WebhookModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

export type WebhookModel = {
  id?: string
  created?: string
  modified?: string
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  extraFields?: string[]
  active?: boolean
  ignoreEtagOnlyChanges?: boolean
}

export type PagingLinkModel = {
  href?: string
}

export type CreateWebhookModel = {
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  extraFields?: string[]
  active?: boolean
  ignoreEtagOnlyChanges?: boolean
}

export type UpdateWebhookModel = {
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  extraFields?: string[]
  active?: boolean
  ignoreEtagOnlyChanges?: boolean
}

export type PingEndpointModel = {
  topicId?: string
}

export type TopicModelPagedResult = {
  _embedded?: TopicModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

export type TopicModel = {
  id?: string
  created?: string
  modified?: string
  name?: string
  description?: string
  url?: string
  active?: boolean
  associatedScope?: string
  example?: string
}

export type CreateTopicModel = {
  id?: string
  name?: string
  description?: string
  url?: string
  associatedScope?: string
  example?: string
}
export type UpdateTopicModel = {
  name?: string
  description?: string
  url?: string
  example?: string
}

export interface WebhookLogModel {
  timeStamp: string
  applicationId: string
  url: string
  payload: string
  topicId: string
  statusCode: number
  entityId: string
}

export interface WebhookPublicKey {
  id: string
  curve: string
  x: string
}

export interface WebhookPublicKeyResponse {
  keys: WebhookPublicKey[]
}
