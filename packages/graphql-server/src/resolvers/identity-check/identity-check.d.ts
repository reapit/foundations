export type Document = {
  typeId: string
  expiry: string
  details: string
  fileData: string
  name: string
}

export type MetaData = {
  [key: string]: string
}

export type GetIdentityCheckByIdArgs = {
  id: string
}

export type GetIdentityChecksArgs = {
  negotiatorId: string
  contactId: string
  pageNumber: number
  pageSize: number
  ids: string[]
  status: 'unknow' | 'uncheck' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass'
}

export type CreateIdentityCheckArgs = {
  contactId: string
  checkDate?: string
  status?: string
  negotiatorId?: string
  identityDocument1: Document
  identityDocument2: Document
  metadata: MetaData
}

export type UpdateIdentityCheckArgs = {
  id: string
  checkDate?: string
  status?: string
  negotiatorId?: string
  identityDocument1: Document
  identityDocument2: Document
  metadata: MetaData
  _eTag: string
}

export type IdentityCheck = {
  id: string
  contactId: string
  created: string
  modified: string
  checkDate: string
  status: string
  negotiatorId: string
  identityDocument1: Document
  identityDocument2: Document
  metadata: MetaData
  _eTag: string
  _links: JSON
  _embedded: JSON
}
