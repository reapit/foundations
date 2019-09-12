// Model representing a single contact detail (eg mobile telephone number)
export interface CommunicationModel {
  // Gets the label representing the type of detail (eg E-mail)
  label: string
  // Gets the contact detail (eg the actual telephone number or email address)
  detail: string
}

// Model representing the physical address of a building or premise
export interface AddressModel {
  // Gets the type of address
  type?: string
  // Gets the building name
  buildingName?: string
  // Gets the building number
  buildingNumber?: string
  // Gets the first line of the address
  line1?: string
  // Gets the second line of the address
  line2?: string
  // Gets the third line of the address
  line3?: string
  // Gets the fourth line of the address
  line4?: string
  // Gets the postcode
  postcode?: string
  // Gets the ISO-3166 country code associated with the address
  countryId?: string
}

// Model representing an entity that is related to the contact
export interface RelationshipModel {
  // Gets the identifier of the related entity
  id?: string
  // Gets the type of relationship
  type?: string
}

// Model representing the details of a person
export interface ContactModel {
  // Gets the unique identifier
  id?: string
  // Gets the date and time that the contact was created
  created?: string // date-time
  // Gets the date and time that the contact was last modified
  modified?: string // date-time
  // Gets the title of this contact (eg. Mr, Mrs, Miss, Dr)
  title?: string
  // Gets the forename of this contact
  forename?: string
  // Gets the surname of this contact
  surname?: string
  // Gets the date of birth of this contact
  dateOfBirth?: string // date-time
  // Gets a flag to indicate if this contact has been marked as active
  active?: boolean
  // Gets the marketing consent status of this contact (grant/deny/notAsked)
  marketingConsent?: string
  // Gets the status of the last identity check performed against this contact (pass/fail/pending/cancelled/warnings/unchecked)
  identityCheck?: string

  communications?: CommunicationModel[]

  addresses?: AddressModel[]

  relationships?: RelationshipModel[]
}

export interface PagedResultContactsModel {
  /**
   * List of paged data
   */
  data?: ContactModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
