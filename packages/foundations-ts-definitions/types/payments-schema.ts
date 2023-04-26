export interface LinkModel {
  href?: string
}
export interface PagingLinkModel {
  href?: string
}
/**
 * Representation of the physical address of a building or premise
 */
export interface PaymentCustomerAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * A summarised view of the details of a contact or company who will be making the payment (the customer)
 */
export interface PaymentCustomerModel {
  /**
   * The unique identifier of the contact or company
   */
  id?: string
  /**
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The type of the contact (company/contact)
   */
  type?: string
  /**
   * The home phone number of the contact or company
   */
  homePhone?: string
  /**
   * The work phone number of the contact or company
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact or company
   */
  mobilePhone?: string
  /**
   * The email address of the contact or company
   */
  email?: string
  primaryAddress?: PaymentCustomerAddressModel
}
/**
 * Model representing a Payment
 */
export interface PaymentModel {
  readonly _links?: {
    [name: string]: LinkModel
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the payment
   */
  id?: string
  /**
   * The date and time when the payment was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the payment was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The payment type [paymentRequest]
   */
  type?: string
  /**
   * The payment description
   */
  description?: string
  /**
   * The status of the payment [awaitingAuthorisation/awaitingPosting/posted/rejected]
   */
  status?: string
  /**
   * The ledger the payment is recorded in
   */
  ledger?: string
  /**
   * The payment amount
   */
  amount?: number // double
  /**
   * The client account that the funds will be, or have been paid into
   */
  clientAccountName?: string
  /**
   * The reference number the payment is associated with in the external payment handler
   */
  externalReference?: string
  /**
   * The unique identifier of the company the payment is associated with, where applicable
   */
  companyId?: string
  customer?: PaymentCustomerModel
  /**
   * The unique identifier of the landlord the payment is associated with, where applicable
   */
  landlordId?: string
  /**
   * The unique identifier of the property the payment is associated with, where applicable
   */
  propertyId?: string
  /**
   * The unique identifier of the tenancy the payment is associated with, where applicable
   */
  tenancyId?: string
  /**
   * The ETag for the current version of the payment. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface PaymentModelPagedResult {
  _embedded?: PaymentModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Request body used to update an existing payment
 * example:
 * [object Object]
 */
export interface UpdatePaymentModel {
  /**
   * The status of the payment [awaitingAuthorisation/awaitingPosting/posted/rejected]
   */
  status?: string
  /**
   * The reference number the payment is associated with in the external payment handler
   */
  externalReference?: string
}
