/**
 * Model representing the physical address of a building or premise
 */
export interface AddressModel {
  /**
   * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Gets the building name
   */
  buildingName?: string
  /**
   * Gets the building number
   */
  buildingNumber?: string
  /**
   * Gets the first line of the address
   */
  line1?: string
  /**
   * Gets the second line of the address
   */
  line2?: string
  /**
   * Gets the third line of the address
   */
  line3?: string
  /**
   * Gets the fourth line of the address
   */
  line4?: string
  /**
   * Gets the postcode
   */
  postcode?: string
  /**
   * Gets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface CommunicationModel {
  /**
   * Gets the label representing the type of detail (eg. mobile, email address)
   */
  label?: string
  /**
   * Gets the communication detail (eg. 07999 876543, developers@reapit.com)
   */
  detail?: string
}
/**
 * Model representing the details of a person
 */
export interface ContactModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the contact was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the contact was last modified
   */
  modified?: string // date-time
  /**
   * Gets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Gets the forename of this contact
   */
  forename?: string
  /**
   * Gets the surname of this contact
   */
  surname?: string
  /**
   * Gets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Gets a flag to indicate if this contact has been marked as active
   */
  active?: boolean
  /**
   * Gets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Gets the status of the last identity check performed against this contact (pass/fail/pending/cancelled/warnings/unchecked)
   */
  identityCheck?: string
  /**
   * Gets a collection of the contacts communication details
   */
  communications?: CommunicationModel[]
  /**
   * Gets a collection of addresses (maximum 3) that this contact has been associated to
   */
  addresses?: AddressModel[]
  /**
   * Gets a collection of entities that are related to this contact
   * This is usually the managing negotiators and offices
   */
  relationships?: RelationshipModel[]
  /**
   * Gets a listing of additional metadata that has been set against this contact
   */
  metadata?: {
    [name: string]: any
  }
  readonly links?: LinkModel[]
}
/**
 * Model to create a contact address
 */
export interface CreateAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to create a communication detail for a contact (eg. an email address)
 */
export interface CreateCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to create a new contact record
 */
export interface CreateContactModel {
  /**
   * Sets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Sets the forename of this contact
   */
  forename?: string
  /**
   * Sets the surname of this contact
   */
  surname?: string
  /**
   * Sets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Sets a flag to indicate if this contact has been marked as active (default true)
   */
  active?: boolean
  /**
   * Sets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Sets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: CreateCommunicationModel[]
  /**
   * Sets a collection of entities that are related to this contact
   * This is usually the managing negotiators and offices
   */
  relationships?: CreateRelationshipModel[]
  /**
   * Sets a collection of addresses that this contact has been associated to
   * A maximum of three addresses can be associated to a contact
   */
  addresses?: CreateAddressModel[]
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to create an identity check
 */
export interface CreateIdentityCheckModel {
  /**
   * Sets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Sets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Sets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Sets the details of the documents that have been provided for this identity check
   */
  documents?: CreateIdentityDocumentModel[]
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to create an identity check document
 */
export interface CreateIdentityDocumentModel {
  /**
   * Sets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Sets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Sets the textual details of the identity document (eg. passport number)
   */
  details?: string
  /**
   * Sets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
}
/**
 * Model to create a relationship between a contact and another entity
 */
export interface CreateRelationshipModel {
  /**
   * Sets the identifier of the attendee
   */
  id?: string
  /**
   * Sets the type of attendee
   */
  type?: string
}
/**
 * Represents an attempt to verify an individual contacts identity
 */
export interface IdentityCheckModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the unique identifier of the contact associated to the id check
   */
  contactId?: string
  /**
   * Gets the date and time that the identity check was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the identity check was last modified
   */
  modified?: string // date-time
  /**
   * Gets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Gets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Gets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Gets the details of the documents that have been provided for this identity check
   */
  documents?: IdentityDocumentModel[]
  /**
   * Gets a listing of additional metadata that has been set against this identity check
   */
  metadata?: {
    [name: string]: any
  }
  readonly links?: LinkModel[]
}
/**
 * Represents the details of a document added to an identity check
 */
export interface IdentityDocumentModel {
  /**
   * Gets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Gets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Gets the textual details of the identity document (eg. passport number)
   */
  details?: string
  /**
   * Gets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
  readonly links?: LinkModel[]
}
export interface LinkModel {
  rel?: string
  href?: string
  action?: string
}
export interface PagedResultContactModel_ {
  data?: ContactModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface PagedResultIdentityCheckModel_ {
  data?: IdentityCheckModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface ProblemDetails {
  [name: string]: any
  type?: string
  title?: string
  status?: number // int32
  detail?: string
  instance?: string
}
/**
 * Model representing an entity that is related to the contact
 */
export interface RelationshipModel {
  /**
   * Gets the identifier of the related entity
   */
  id?: string
  /**
   * Gets the type of relationship (office/negotiator)
   */
  type?: string
  readonly links?: LinkModel[]
}
/**
 * Model to update a contact address
 */
export interface UpdateAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to update a communication detail for a contact (eg. an email address)
 */
export interface UpdateCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to update a contact record
 */
export interface UpdateContactModel {
  /**
   * Sets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Sets the forename of this contact
   */
  forename?: string
  /**
   * Sets the surname of this contact
   */
  surname?: string
  /**
   * Sets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Sets a flag to indicate if this contact has been marked as active
   */
  active?: boolean
  /**
   * Sets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Sets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: UpdateCommunicationModel[]
  /**
   * Sets a collection of entities that are related to this contact
   * This is usually the managing negotiators and offices
   */
  relationships?: UpdateRelationshipModel[]
  /**
   * Sets a collection of addresses that this contact has been associated to
   * A maximum of three addresses can be associated to a contact
   */
  addresses?: UpdateAddressModel[]
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update an existing identity check
 */
export interface UpdateIdentityCheckModel {
  /**
   * Sets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Sets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Sets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Sets the details of the documents that have been provided for this identity check
   */
  documents?: UpdateIdentityDocumentModel[]
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update an identity document
 */
export interface UpdateIdentityDocumentModel {
  /**
   * Sets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Sets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Sets the textual details of the identity document (eg. passport number)
   */
  details?: string
  /**
   * Sets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
}
/**
 * Model to update a relationship between a contact and another entity
 */
export interface UpdateRelationshipModel {
  /**
   * Sets the identifier of the attendee
   */
  id?: string
  /**
   * Sets the type of attendee
   */
  type?: string
}
