/**
 * Model to create a new group
 */
export interface CreateGroupModel {
  /**
   * The identifier (as it will appear in the IDP)
   */
  id: string
  /**
   * The description of this group
   */
  description: string
}
/**
 * The model responsible for creation of an office group
 */
export interface CreateOfficeGroupModel {
  /**
   * The name of the office group
   */
  name?: string
  /**
   * The office ids to set against the group
   */
  officeIds?: string
}
/**
 * Request body used to set the address details
 */
export interface CreateOrganisationAddressModel {
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
 * Model to create a new organisation
 */
export interface CreateOrganisationModel {
  /**
   * The id of the organisation in agency cloud (if a customer)
   */
  agencyCloudId?: string
  /**
   * The id of the organisation in marketplace (if a developer)
   */
  marketplaceId?: string
  /**
   * The name of the organisation
   */
  name: string
  /**
   * The public website of the organisation
   */
  website?: string
  taxNumber?: string
  /**
   * The registration number of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that our accounts department use internally for billing this organisation
   */
  billingReference?: string
  /**
   * A flag specifying if the organisation has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The organisations national insurance
   */
  nationalInsurance?: string
  address?: CreateOrganisationAddressModel
}
/**
 * Model to create a new user
 */
export interface CreateUserModel {
  /**
   * The email of this user
   */
  email: string
  /**
   * The name of this user
   */
  name: string
  /**
   * Gets or sets the agency cloud identifier that the user occupies in the customers database
   */
  agencyCloudNegotiatorId?: string
  /**
   * The job title of the user
   */
  jobTitle?: string
  /**
   * The mobile telephone of the user
   */
  mobile?: string
  /**
   * The landline telephone of the user
   */
  landline?: string
  /**
   * The id of the organisation that this user should belong to
   */
  organisationId: string
  /**
   * Listing of the group ids that this user is a member of
   */
  groupIds: string[]
  /**
   * A flag to decide whether a user is pushed to the identity provider
   */
  addToIdp?: boolean
}
/**
 * Model representing a member of a group
 */
export interface GroupMembershipModel {
  /**
   * The id of the member
   */
  id?: string
  /**
   * Gets the date the user was added to the group
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The unique email address of this user
   */
  email?: string
  /**
   * Gets or sets the name of this user
   */
  name?: string
  /**
   * Flag determining if this instance is inactive
   */
  inactive?: boolean
  /**
   * The organisation id that this user is a member of
   */
  organisationId?: string
  /**
   * The name of the organisation this user is a member of
   */
  organisationName?: string
}
export interface GroupMembershipModelPagedResult {
  _embedded?: GroupMembershipModel[]
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
 * Model representing a user group
 */
export interface GroupModel {
  /**
   * The id of this group
   */
  id?: string
  /**
   * Gets the modified date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * Gets the created date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * Gets or sets the description of this group
   */
  description?: string
}
export interface GroupModelPagedResult {
  _embedded?: GroupModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface Groups {
  pageNumber?: number
  pageSize?: number
  id?: string[]
}
/**
 * Model to expose an office group
 */
export interface OfficeGroupModel {
  /**
   * Gets the unique identifier associated to the office group
   */
  id?: string
  /**
   * The timestamp of entity creation
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The timestamp of entity modification
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * Gets the unique identifier of the organisation the office group belongs to
   */
  organisationId?: string
  /**
   * Gets the name of the office group
   */
  name?: string
  /**
   * Gets the office groups tag
   */
  tag?: string
  /**
   * Gets the customerId of the office group
   */
  customerId?: string
  /**
   * Gets the office ids associated to the group
   */
  officeIds?: string
  /**
   * Gets the status of the office group
   */
  status?: string
}
export interface OfficeGroupModelPagedResult {
  _embedded?: OfficeGroupModel[]
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
 * Model representing a property address
 */
export interface OrganisationAddressModel {
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
 * Model representing a organisation such as an estate agent or third party developer
 */
export interface OrganisationModel {
  /**
   * The id of this organisation
   */
  id?: string
  /**
   * Gets the modified date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * Gets the created date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The name of the organisation
   */
  name?: string
  /**
   * The id of the organisation in agency cloud (if a customer)
   */
  agencyCloudId?: string
  /**
   * The id of the organisation in marketplace (if a developer)
   */
  marketplaceId?: string
  /**
   * Flag determining if this instance is inactive
   */
  inactive?: boolean
  /**
   * The public website of the organisation
   */
  website?: string
  taxNumber?: string
  /**
   * The registration number of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that our accounts department use internally for billing this organisation
   */
  billingReference?: string
  /**
   * A flag specifying if the organisation has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The organisations national insurance
   */
  nationalInsurance?: string
  address?: OrganisationAddressModel
}
export interface OrganisationModelPagedResult {
  _embedded?: OrganisationModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface Organisations {
  pageNumber?: number
  pageSize?: number
  id?: string[]
  agencyCloudId?: string[]
  marketplaceId?: string[]
  name?: string
}
export interface PagingLinkModel {
  href?: string
}
export interface UpdateGroupModel {
  /**
   * The description of this group
   */
  description: string
}
/**
 * The model responsible for updating an office group
 */
export interface UpdateOfficeGroupModel {
  /**
   * The name of the office group
   */
  name?: string
  /**
   * The office ids to set against the group
   */
  officeIds?: string
  /**
   * The status of the office group
   */
  status?: string
}
export interface UpdateOrganisationAddressModel {
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
export interface UpdateOrganisationModel {
  /**
   * The id of the organisation in agency cloud (if a customer)
   */
  agencyCloudId?: string
  /**
   * The id of the organisation in marketplace (if a developer)
   */
  marketplaceId?: string
  /**
   * The name of the organisation
   */
  name: string
  /**
   * A value indicating whether this organisation should be inactive.
   */
  inactive?: boolean
  /**
   * The public website of the organisation
   */
  website?: string
  taxNumber?: string
  /**
   * The registration number of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that our accounts department use internally for billing this organisation
   */
  billingReference?: string
  /**
   * A flag specifying if the organisation has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The organisations national insurance
   */
  nationalInsurance?: string
  address?: UpdateOrganisationAddressModel
}
/**
 * Model to update an existing user
 */
export interface UpdateUserModel {
  /**
   * The name of this user
   */
  name: string
  /**
   * Flag whether this user should be marked as inactive
   */
  inactive?: boolean
  /**
   * Gets or sets the job title of the user
   */
  jobTitle?: string
  /**
   * The mobile telephone of the user
   */
  mobile?: string
  /**
   * The landline telephone of the user
   */
  landline?: string
  /**
   * The ids of the groups that this user should belong to
   */
  groupIds: string[]
}
/**
 * Request body used to update a user's password to a specific value
 */
export interface UpdateUserPasswordModel {
  /**
   * The current password
   */
  current: string
  /**
   * The new password
   */
  new: string
  /**
   * Flag denoting whether or not the password should be permanent (usually true)
   */
  permanent?: boolean
}
/**
 * Model representing a user of Reapit software
 */
export interface UserModel {
  /**
   * The id of this user - this is the email address
   */
  id?: string
  /**
   * Gets the modified date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * Gets the created date
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The unique email address of this user
   */
  email?: string
  /**
   * Gets or sets the name of this user
   */
  name?: string
  /**
   * The mobile telephone of the user
   */
  mobile?: string
  /**
   * The landline telephone of the user
   */
  landline?: string
  /**
   * The job title of the user
   */
  jobTitle?: string
  /**
   * Flag determining if this instance is inactive
   */
  inactive?: boolean
  /**
   * The id of the parent organisation that this user belongs to
   */
  organisationId?: string
  /**
   * The name of the parent organisation that this user belongs to
   */
  organisationName?: string
  /**
   * The marketplace developer id that this user belongs to
   */
  marketplaceDeveloperId?: string
  /**
   * The customer id that this user is a member of
   */
  agencyCloudCustomerId?: string
  /**
   * The agency cloud id that this user assumes in the customer database
   */
  agencyCloudNegotiatorId?: string
  /**
   * Listing of the group ids that this user is a member of
   */
  groups?: string[]
}
export interface UserModelPagedResult {
  _embedded?: UserModel[]
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
 * Details for an attempt to sign in to the IDP
 */
export interface UserSignInRequest {
  /**
   * The email address of the user to attempt sign in for
   */
  email?: string
  /**
   * The password for the provided email address
   */
  password?: string
}
export interface UserSignInResponse {
  /**
   * The UTC date time of the sign in event
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  timestamp?: string // date-time
  /**
   * A flag indicating whether a successful sign in occurred
   */
  success?: boolean
  /**
   * The email address of the sign in attempt
   */
  emailAddress?: string
  /**
   * If this request failed, the reason why
   */
  failureReason?: string
  /**
   * The agency cloud id of the customer that this user belongs to
   */
  agencyCloudCustomerId?: string
  /**
   * The agency cloud id that this user is associated to, relative to the specified agency cloud customer database
   */
  agencyCloudNegotiatorId?: string
  /**
   * Gets the identity token issued from the IDP
   */
  identityToken?: string
  /**
   * Gets the access token issued from the IDP
   */
  accessToken?: string
}
export interface Users {
  pageNumber?: number
  pageSize?: number
  agencyCloudId?: string
  organisationId?: string
  groupId?: string
  createdFrom?: string
  createdTo?: string
}
