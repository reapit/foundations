export type MetaData = {
  [key: string]: string
}

export type Communication = {
  label: String
  detail: String
}

export type Addresses = {
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
  surname?: string
  dateOfBirth?: string
  active?: boolean
  marketingConsent?: string
  communications: Communication[]
  officeIds: string[]
  negotiatorIds: string[]
  addresses: Addresses[]
  metadata: MetaData
}

export type GetContactByIdArgs = {
  id: string
}
