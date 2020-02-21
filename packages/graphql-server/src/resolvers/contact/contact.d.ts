export type MetaData = {
  [key: string]: string
}

export type Source = {
  id: String
  type: String
}

export type Address = {
  type: String
  buildingName: String
  buildingNumber: String
  line1: String
  line2: String
  line3: String
  line4: String
  postcode: String
  countryId: String
}

export type CreateContactArgs = {
  title?: string
  forename?: string
  surname: string
  dateOfBirth?: string
  active?: boolean
  marketingConsent: 'grant' | 'deny' | 'notAsked'
  identityCheck?: string
  source?: Source
  homePhone?: string
  workPhone?: string
  mobilePhone?: string
  email?: string
  officeIds: string[]
  negotiatorIds: string[]
  primaryAddress: Address
  secondaryAddress?: Address
  workAddress?: Address
  metadata?: MetaData
}

export type UpdateContactArgs = {
  id: string
  title?: string
  forename?: string
  surname: string
  dateOfBirth?: string
  active?: boolean
  marketingConsent: 'grant' | 'deny' | 'notAsked'
  identityCheck?: string
  source?: Source
  homePhone?: string
  workPhone?: string
  mobilePhone?: string
  email?: string
  officeIds: string[]
  negotiatorIds: string[]
  primaryAddress: Address
  secondaryAddress?: Address
  workAddress?: Address
  metadata?: MetaData
  _eTag: string
}

export type GetContactByIdArgs = {
  id: string
}

export type GetContactsArgs = {
  name?: string
  address?: string
  negotiatorId: string[]
  officeId: string[]
  active: boolean
  pageNumber: number
  pageSize: number
  sortBy: string
  identityCheck: string[]
  marketingConsent: string[]
}
