/**
 * The model responsible for accepting an invite
 */
export interface AcceptInviteModel {
  /**
   * The full name of this member
   */
  name?: string
  /**
   * The job title for this member
   */
  jobTitle?: string
}
/**
 * Representation of an address
 */
export interface AddressModel {
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
 * App secret representation
 */
export interface AppClientSecretModel {
  /**
   * Gets the GUID of the app
   */
  id?: string // uuid
  /**
   * Gets the apps client secret
   */
  clientSecret?: string
}
/**
 * App detailed representation
 */
export interface AppDetailModel {
  /**
   * Gets the GUID of the app
   */
  id?: string // uuid
  /**
   * Gets the date and time the app was originally registered on the marketplace
   */
  created?: string // date-time
  /**
   * Gets the GUID of the developer who has created the app
   */
  developerId?: string // uuid
  /**
   * Gets the GUID of the installation
   */
  installationId?: string // uuid
  /**
   * Gets client id of this application
   */
  externalId?: string
  /**
   * Gets the full name of the app
   */
  name?: string
  /**
   * Gets a short summary of the app
   */
  summary?: string
  /**
   * Gets a detailed description of the app
   */
  description?: string
  /**
   * Gets the name of the developer who created the app
   */
  developer?: string
  /**
   * Gets a brief description of the developers organisation
   */
  developerAbout?: string
  /**
   * Gets the email address of the developer's helpdesk responsible for providing support of the application
   */
  supportEmail?: string
  /**
   * Gets the telephone number of the developer's helpdesk responsible for providing support of the application
   */
  telephone?: string
  /**
   * Gets the home page of the developer, or the app/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Gets the Uri at which the app is launched
   */
  launchUri?: string
  /**
   * Gets the apps redirect uri (or uris) where a user will be redirected to immediately after a successful authentication
   */
  redirectUris?: string[]
  /**
   * Gets the apps signout uri (or uris) where a user will be redirected to immediately after a successful logout
   */
  signoutUris?: string[]
  /**
   * Gets the unique identifier of clients that the app is visible to
   */
  limitToClientIds?: string[]
  /**
   * Gets the apps desktop integration type ids
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Gets the date the app was installed for a specific client
   */
  installedOn?: string // date-time
  /**
   * Gets the application authorisation flow type (authorisationCode/clientCredentials)
   */
  authFlow?: string
  /**
   * Gets a flag determining whether or not the app is currently listed on the marketplace
   */
  isListed?: boolean
  /**
   * Gets a flag determining whether or not the app will appear in the marketplace
   */
  isDirectApi?: boolean
  /**
   * Gets the sandbox status of this app
   */
  isSandbox?: boolean
  /**
   * Gets a flag determining whether or not the app is featured
   */
  isFeatured?: boolean
  /**
   * Gets a flag determining whether or not the app is a web component
   */
  isWebComponent?: boolean
  /**
   * Gets the status of whether the app has pending revisions
   */
  pendingRevisions?: boolean
  /**
   * Gets the apps category
   */
  category?: CategoryModel
  /**
   * Gets the collection of scopes against the app
   */
  scopes?: ScopeModel[]
  /**
   * Gets a collection of media objects associated with the app
   */
  media?: MediaModel[]
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * App revision detailed representation
 */
export interface AppRevisionModel {
  /**
   * Gets the unique identifier of the app revision
   */
  id?: string // uuid
  /**
   * Gets the unique identifier of the app the revision is associated with
   */
  appId?: string // uuid
  /**
   * Gets the GUID of the developer of made the app
   */
  developerId?: string // uuid
  /**
   * Gets the full name of the app revision
   */
  name?: string
  /**
   * Gets a short summary of the app revision
   */
  summary?: string
  /**
   * Gets a detailed description of the app revision
   */
  description?: string
  /**
   * Gets the name of the developer who created the app revision
   */
  developer?: string
  /**
   * Gets the email address of the developer's helpdesk responsible for providing support of the application
   */
  supportEmail?: string
  /**
   * Gets the telephone number of the developer's helpdesk responsible for providing support of the application
   */
  telephone?: string
  /**
   * Gets the home page of the developer, or the app/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Gets the app revisions launch uri
   */
  launchUri?: string
  /**
   * Gets the app revisions redirect uri (or uris) where a user will be redirected to immediately after a successful authentication
   */
  redirectUris?: string[]
  /**
   * Gets the app revisions signout uri (or uris) where a user will be redirected to immediately after a successful logout
   */
  signoutUris?: string[]
  /**
   * Gets the listed status of the app revision
   */
  isListed?: boolean
  /**
   * Gets a flag determining whether or not the app will appear in the marketplace
   */
  isDirectApi?: boolean
  /**
   * Gets the unique identifier of clients that the app is visible to
   */
  limitToClientIds?: string[]
  /**
   * Gets the desktop integration type ids of this revision
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Gets the app revisions category
   */
  category?: CategoryModel
  /**
   * Gets the scopes that have been associated to this revision
   */
  scopes?: ScopeModel[]
  /**
   * Gets a collection of media objects associated with the app
   */
  media?: MediaModel[]
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * App summary representation
 */
export interface AppSummaryModel {
  /**
   * Gets the GUID of the app
   */
  id?: string // uuid
  /**
   * Gets external client id of this application
   */
  externalId?: string
  /**
   * Gets the date and time the app was originally registered on the marketplace
   */
  created?: string // date-time
  /**
   * Gets the GUID of the developer who has created the app
   */
  developerId?: string // uuid
  /**
   * Gets the full name of the app
   */
  name?: string
  /**
   * Gets a short summary of the app
   */
  summary?: string
  /**
   * Gets the name of the developer who created the app
   */
  developer?: string
  /**
   * Gets the home page of the developer, or the app/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Gets a flag determining whether or not the app is currently listed on the marketplace
   */
  isListed?: boolean
  /**
   * Gets the sandbox status of this app
   */
  isSandbox?: boolean
  /**
   * Gets a flag determining whether or not the app is featured
   */
  isFeatured?: boolean
  /**
   * Gets a flag determining whether or not the app will appear in the marketplace
   */
  isDirectApi?: boolean
  /**
   * Gets the public Url for accessing this app's icon
   */
  iconUri?: string
  /**
   * Gets the public Url for accessing this app's featured image
   */
  featuredImageUri?: string
  /**
   * Gets the desktop integration types of this app
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Gets the time stamp of the installed date
   */
  installedOn?: string // date-time
  /**
   * Gets the application authorisation flow type (authorisationCode/clientCredentials)
   */
  authFlow?: string
  /**
   * Gets the Uri at which the app is launched
   */
  launchUri?: string
  /**
   * Gets the status of whether the app has pending revisions
   */
  pendingRevisions?: boolean
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Approval representation
 */
export interface ApprovalModel {
  /**
   * Apps unique identifier
   */
  appId?: string // uuid
  /**
   * Type of approval
   */
  type?: string
  /**
   * Description of approval
   */
  description?: string
  /**
   * App revision unique identifier
   */
  appRevisionId?: string // uuid
  /**
   * Gets the date the revision was created
   */
  readonly created?: string // date-time
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * The model responsible for the approval of an app revision
 */
export interface ApproveModel {
  /**
   * Sets the name of the admin approving
   */
  name?: string
  /**
   * Sets the email of the admin approving
   */
  email?: string
}
/**
 * Model to expose category info
 */
export interface CategoryModel {
  /**
   * Gets the unique identifier associated to the category
   */
  id?: string
  /**
   * Gets the name of the category
   */
  name?: string
  /**
   * Gets the description of the category
   */
  description?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Model to expose company address info
 */
export interface CompanyAddressModel {
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
 * Request body used to set the address details
 */
export interface CreateAddressModel {
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
 * The model responsible for creation of an app definition
 */
export interface CreateAppModel {
  /**
   * Sets the full name of the app
   */
  name?: string
  /**
   * Sets the description of the app
   */
  description?: string
  /**
   * Sets a short summary of the app
   */
  summary?: string
  /**
   * Sets the email address of the developer's helpdesk responsible for providing support of the app
   */
  supportEmail?: string
  /**
   * Sets the telephone number of the developer's helpdesk responsible for providing support of the app
   */
  telephone?: string
  /**
   * Sets the home page of the developer, or the application/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Sets the apps launch uri
   */
  launchUri?: string
  /**
   * Sets the apps uri where a user will be redirected to immediately after a successful authentication. Multiple URIs can be passed in the array
   */
  redirectUris?: string[]
  /**
   * Set the apps uri where a user will be redirected to immediately after a session is logged out. Multiple URIs can be passed in the array
   */
  signoutUris?: string[]
  /**
   * Sets the unique identifer of the developer registering the app
   */
  developerId?: string // uuid
  /**
   * Sets the unique identifer of the apps category
   */
  categoryId?: string
  /**
   * Sets a flag determining whether or not the app is featured
   */
  isFeatured?: boolean
  /**
   * Sets the flag determining whether or not the app will appear in the marketplace
   */
  isDirectApi?: boolean
  /**
   * Sets the flag determining whether or not the app is a web component
   */
  isWebComponent?: boolean
  /**
   * Sets the unique identifier of the client that the app is visible to. Multiple ids can be passed in the array
   */
  limitToClientIds?: string[]
  /**
   * Sets the apps desktop integration types. Multiple type ids can be passed in the array
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Sets the application authorisation flow type (authorisationCode/clientCredentials)
   */
  authFlow?: string
  /**
   * Sets the list of scope keys required for this app to run
   */
  scopes?: string[]
  /**
   * Sets the location url of the app icon image
   */
  iconImageUrl?: string
  /**
   * Sets the location url of the first app screenshot image
   */
  screen1ImageUrl?: string
  /**
   * Sets the location url of the second (optional) app screenshot image
   */
  screen2ImageUrl?: string
  /**
   * Sets the location url of the third (optional) app screenshot image
   */
  screen3ImageUrl?: string
  /**
   * Sets the location url of the fourth (optional) app screenshot image
   */
  screen4ImageUrl?: string
  /**
   * Sets the location url of the fifth (optional) app screenshot image
   */
  screen5ImageUrl?: string
}
/**
 * The model responsible for creation of an app revision
 */
export interface CreateAppRevisionModel {
  /**
   * Sets the full name of the app revision
   */
  name?: string
  /**
   * Sets the description of the app revision
   */
  description?: string
  /**
   * Sets a short summary of the app revision
   */
  summary?: string
  /**
   * Sets the email address of the developer's helpdesk responsible for providing support of the app revision
   */
  supportEmail?: string
  /**
   * Sets the telephone number of the developer's helpdesk responsible for providing support of the app revision
   */
  telephone?: string
  /**
   * Sets the home page of the developer, or the application/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Sets the flag determining whether or not the app will appear in the marketplace
   */
  isDirectApi?: boolean
  /**
   * Sets the unique identifier of the developer associated with this app revision
   */
  developerId?: string // uuid
  /**
   * Sets the unique identifer of the app revisions category
   */
  categoryId?: string
  /**
   * Sets location url of the app icon image
   */
  iconImageUrl?: string
  /**
   * Sets the location url of the first app screenshot image
   */
  screen1ImageUrl?: string
  /**
   * Sets the location url of the second (optional) app screenshot image
   */
  screen2ImageUrl?: string
  /**
   * Sets the location url of the third (optional) app screenshot image
   */
  screen3ImageUrl?: string
  /**
   * Sets the location url of the fourth (optional) app screenshot image
   */
  screen4ImageUrl?: string
  /**
   * Sets the location url of the fifth (optional) app screenshot image
   */
  screen5ImageUrl?: string
  /**
   * Sets the apps launch uri
   */
  launchUri?: string
  /**
   * Sets the apps uri where a user will be redirected to immediately after a successful authentication. Multiple URIs can be passed in the array
   */
  redirectUris?: string[]
  /**
   * Set the apps uri where a user will be redirected to immediately after a session is logged out. Multiple URIs can be passed in the array
   */
  signoutUris?: string[]
  /**
   * Sets the listed status of the app
   * When false, the app will not be visible in marketplace app listings
   */
  isListed?: boolean
  /**
   * Sets the unique identifier of the client that the app is visible to. Multiple ids can be passed in the array
   */
  limitToClientIds?: string[]
  /**
   * Sets the apps desktop integration type. Multiple type ids can be passed in the array
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Sets the list of scope keys required for this app revision
   */
  scopes?: string[]
}
/**
 * The model responsible for creation of a category
 */
export interface CreateCategoryModel {
  /**
   * Sets the unique identifier of the category
   */
  id?: string
  /**
   * Sets the name of the category
   */
  name?: string
  /**
   * Sets the description of the category
   */
  description?: string
}
/**
 * The model responsible for creation of a desktop integration type
 */
export interface CreateDesktopIntegrationTypeModel {
  /**
   * Sets the unique identifier of the desktop integration
   */
  id?: string
  /**
   * Sets the desktop integrations name
   */
  name?: string
  /**
   * Sets the desktop integrations description
   */
  description?: string
  /**
   * Sets a link to the desktop integrations documentation
   */
  url?: string
}
/**
 * The model responsible for creation of a developer
 */
export interface CreateDeveloperModel {
  /**
   * Sets the full name of this developer
   */
  name?: string
  /**
   * Sets the company to which this developer is acting on behalf of
   */
  companyName?: string
  /**
   * Sets the job title for this developer
   */
  jobTitle?: string
  /**
   * Sets the email address of the developer
   */
  email?: string
  /**
   * Sets the telephone number of the developer
   */
  telephone?: string
  /**
   * Sets the date the developer agreed to the terms
   */
  agreedTerms?: string // date-time
  /**
   * Sets a brief description for the developers organisation
   */
  about?: string
  /**
   * Sets the website  of the developers organisation
   */
  website?: string
  /**
   * Sets the tax number of the developers organisation
   */
  taxNumber?: string
  /**
   * Sets the registration number of the developers organisation
   */
  registrationNumber?: string
  /**
   * Sets the address of the developers organisation
   */
  companyAddress?: CreateAddressModel
}
/**
 * The model responsible for creation of an installation between a specific client and app
 */
export interface CreateInstallationModel {
  /**
   * Sets the unique identifier of the app that this installation will be associated with
   */
  appId?: string // uuid
  /**
   * Sets the unique identifier of the client this installation is being created for
   */
  clientId?: string
  /**
   * Sets the email address of the user that has approved this app (and created the installation)
   */
  approvedBy?: string
  /**
   * Sets the termination date of the installation (this could be used for app trials etc)
   */
  terminatesOn?: string // date-time
}
/**
 * The model responsible for creation of a subscription
 */
export interface CreateSubscriptionModel {
  /**
   * The id of the developer to create the subscription against
   */
  developerId?: string // uuid
  /**
   * The id of the application to create the subscription against
   */
  applicationId?: string // uuid
  /**
   * The email of the user related to the subscription
   */
  user?: string
  /**
   * The type of subscription (applicationListing/developerRegistration/developerEdition)
   */
  type?: string
}
/**
 * Model that represents a desktop integration type
 */
export interface DesktopIntegrationTypeModel {
  /**
   * The unique identifier of the integration type
   */
  id?: string
  /**
   * The name of the integration type
   */
  name?: string
  /**
   * The description of the integration type
   */
  description?: string
  /**
   * A link to the integration types documentation
   */
  url?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Model that represents a developer
 */
export interface DeveloperModel {
  /**
   * The id of this developer
   */
  id?: string // uuid
  /**
   * The timestamp of entity creation
   */
  created?: string // date-time
  /**
   * The timestamp of entity modification
   */
  modified?: string // date-time
  /**
   * The id of this developer held in the gateway
   */
  externalId?: string
  /**
   * The full name of this developer
   */
  name?: string
  /**
   * The company to which this developer is acting on behalf of
   */
  company?: string
  /**
   * The job title for this developer
   */
  jobTitle?: string
  /**
   * The email address of the developer
   */
  email?: string
  /**
   * The telephone number of the developer
   */
  telephone?: string
  /**
   * The date the developer agreed to the terms
   */
  agreedTerms?: string // date-time
  /**
   * The flag determining if the developer is inactive
   */
  isInactive?: boolean
  /**
   * A brief description of the developers organisation
   */
  about?: string
  /**
   * The website for the developers organisation
   */
  website?: string
  /**
   * The tax number of the developers organisation
   */
  taxNumber?: string
  /**
   * The registration number of the developers organisation
   */
  registrationNumber?: string
  /**
   * The email of the accounts department for the developer
   */
  billingEmail?: string
  /**
   * The telephone number for the accounts department for the developer
   */
  billingTelephone?: string
  /**
   * The name of the member of staff dealing with billing
   */
  billingKeyContact?: string
  /**
   * The reapit account reference used for this company
   */
  reapitReference?: string
  /**
   * A flag specifying if the developer has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The developers national insurance
   */
  nationalInsurance?: string
  /**
   * The status of the developer (incomplete/pending/confirmed/underReview/removed)
   */
  status?: string
  /**
   * The address of the developers organisation
   */
  companyAddress?: CompanyAddressModel
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Installation representation
 */
export interface InstallationModel {
  /**
   * Gets the unique identifier of the installation
   */
  id?: string // uuid
  /**
   * Gets the unique identifier of the app the installation is associated with
   */
  appId?: string // uuid
  /**
   * Gets the date/time the installation was created
   */
  created?: string // date-time
  /**
   * Gets the id of the client that has granted access to the app (or revoked it)
   */
  client?: string
  /**
   * Gets the status of this installation
   */
  status?: string
  /**
   * Gets the authorisation flow type of the associated app
   */
  authFlow?: string
  /**
   * Gets the reason that access to associated app was removed
   */
  terminatedReason?: string
  /**
   * Gets the date that access to the associated app was terminated, or is due to terminate on
   */
  terminatesOn?: string // date-time
  /**
   * Gets the id of the customer that has granted access to the app (or revoked it)
   */
  customerId?: string
  /**
   * Gets the name of the customer that has granted access to the app (or revoked it)
   */
  customerName?: string
  /**
   * Gets the address of the customer
   */
  customerAddress?: AddressModel
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * The model responsible for inviting a recipient to a developer organisation
 */
export interface InviteMemberModel {
  /**
   * The email address of the recipient
   */
  email?: string
  /**
   * The full name of the recipient
   */
  name?: string
  /**
   * The job title of the recipient
   */
  jobTitle?: string
  /**
   * The name of the user whos sent the invite
   */
  sender?: string
  /**
   * The message to send to the recipient
   */
  message?: string
}
/**
 * Represents a HyperMedia Link
 */
export interface LinkModel {
  /**
   * The relationship being described
   */
  rel?: string
  /**
   * The hyperlink URI
   */
  href?: string
  /**
   * The HTTP verb to be issued
   */
  action?: string
}
/**
 * Media representation
 */
export interface MediaModel {
  /**
   * Gets the unique identifier of the media item
   */
  id?: string // uuid
  /**
   * Gets the URI where this media is located
   */
  uri?: string
  /**
   * Gets the textual description of this media content
   */
  description?: string
  /**
   * Gets type of media this entity relates to
   */
  type?: string
  /**
   * Gets the order of this particular picture in the list of available media
   */
  order?: number // int32
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Model that represents a member of a developer organisation
 */
export interface MemberModel {
  /**
   * The id of this member
   */
  id?: string // uuid
  /**
   * The timestamp of entity creation
   */
  created?: string // date-time
  /**
   * The timestamp of entity modification
   */
  modified?: string // date-time
  /**
   * The email address of the member
   */
  email?: string
  /**
   * The full name of this member
   */
  name?: string
  /**
   * The job title for this member
   */
  jobTitle?: string
  /**
   * The status of the member (active/inactive/pending/rejected)
   */
  status?: string
  /**
   * The role of the member (admin/user)
   */
  role?: string
  /**
   * The date the member agreed to the terms
   */
  agreedTerms?: string // date-time
  /**
   * The id of the developer the member is associated to
   */
  developerId?: string // uuid
  /**
   * A flag specifying if the member has access to agency cloud
   */
  agencyCloudAccess?: boolean
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultAppRevisionModel_ {
  /**
   * List of paged data
   */
  data?: AppRevisionModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultAppSummaryModel_ {
  /**
   * List of paged data
   */
  data?: AppSummaryModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultApprovalModel_ {
  /**
   * List of paged data
   */
  data?: ApprovalModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultCategoryModel_ {
  /**
   * List of paged data
   */
  data?: CategoryModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultDesktopIntegrationTypeModel_ {
  /**
   * List of paged data
   */
  data?: DesktopIntegrationTypeModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultDeveloperModel_ {
  /**
   * List of paged data
   */
  data?: DeveloperModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultInstallationModel_ {
  /**
   * List of paged data
   */
  data?: InstallationModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultMemberModel_ {
  /**
   * List of paged data
   */
  data?: MemberModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultSubscriptionModel_ {
  /**
   * List of paged data
   */
  data?: SubscriptionModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * The model responsible for rejection of a revision
 */
export interface RejectRevisionModel {
  /**
   * Sets the name of the admin rejecting
   */
  name?: string
  /**
   * Sets the email of the admin rejecting
   */
  email?: string
  /**
   * Sets the reason the revision is rejected
   */
  rejectionReason?: string
}
/**
 * Model that represents a scope
 */
export interface ScopeModel {
  /**
   * Gets the name of the scope
   */
  name?: string
  /**
   * Gets the description of the scope
   */
  description?: string
}
/**
 * Model to expose subscription info
 */
export interface SubscriptionModel {
  /**
   * The unique identifier associated to the subscription
   */
  id?: string // uuid
  /**
   * The date and time the subscription was created
   */
  created?: string // date-time
  /**
   * The date and time the subscription was cancelled
   */
  cancelled?: string // date-time
  /**
   * The date the subscription renews
   */
  renews?: string
  /**
   * The GUID of the developer associated to the subscription
   */
  developerId?: string // uuid
  /**
   * The GUID of the application associated to the subscription
   */
  applicationId?: string // uuid
  /**
   * The email of the user against the subscription
   */
  user?: string
  /**
   * The type of subscription (applicationListing/developerRegistration/developerEdition)
   */
  type?: string
  /**
   * A brief descripton of the subscription
   */
  summary?: string
  /**
   * The cost of the subscription
   */
  cost?: number // double
  /**
   * The frequency in which the subscription renews (monthly/annually)
   */
  frequency?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * The model responsible for terminating the installation between a specific client and app
 */
export interface TerminateInstallationModel {
  /**
   * Sets the unique identifier of the associated app for which the installation is being terminated
   */
  appId?: string // uuid
  /**
   * Sets the email address of the person removing access to this app for the client
   * specified in the installation
   */
  terminatedBy?: string
  /**
   * Sets the reason that app access has been removed
   */
  terminatedReason?: string
  /**
   * Sets the date at which the app should become unavailable to the client (optional - if not passed the app will become unavailable immediately)
   */
  terminatesOn?: string // date-time
}
/**
 * Request body used to set the address details
 */
export interface UpdateAddressModel {
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
 * The model responsible for updating a desktop integration type
 */
export interface UpdateDesktopIntegrationTypeModel {
  /**
   * Sets the desktop integrations name
   */
  name?: string
  /**
   * Sets the desktop integrations description
   */
  description?: string
  /**
   * Sets a link to the desktop integrations documentation
   */
  url?: string
}
/**
 * The model responsible for updating of a developer
 */
export interface UpdateDeveloperModel {
  /**
   * Sets the full name of this developer
   */
  name?: string
  /**
   * Sets the company to which this developer is acting on behalf of
   */
  companyName?: string
  /**
   * Sets the job title for this developer
   */
  jobTitle?: string
  /**
   * Sets the telephone number of the developer
   */
  telephone?: string
  /**
   * Sets the date the developer agreed to the terms
   */
  readonly agreedTerms?: string // date-time
  /**
   * Sets the flag specifying if the developer is inactive
   */
  isInactive?: boolean
  /**
   * Sets a brief description for the developers organisation
   */
  about?: string
  /**
   * Sets the website  of the developers organisation
   */
  website?: string
  /**
   * Sets the tax number of the developers organisation
   */
  taxNumber?: string
  /**
   * Sets the registration number of the developers organisation
   */
  registrationNumber?: string
  /**
   * Sets the email of the accounts department for the developer
   */
  billingEmail?: string
  /**
   * Sets the telephone number for the accounts department for the developer
   */
  billingTelephone?: string
  /**
   * Sets the name of the member of staff dealing with billing
   */
  billingKeyContact?: string
  /**
   * Sets reapits account reference used for this company
   */
  reapitReference?: string
  /**
   * Sets a flag specifying if the developer has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * Sets the developers national insurance
   */
  nationalInsurance?: string
  /**
   * Sets the status of the developer
   */
  status?: string
  /**
   * Sets the address of the developers organisation
   */
  companyAddress?: UpdateAddressModel
}
/**
 * The model responsible for updating a member
 */
export interface UpdateMemberModel {
  /**
   * The full name of this member
   */
  name?: string
  /**
   * The job title for this member
   */
  jobTitle?: string
  /**
   * The date the terms were agreed
   */
  agreedTerms?: string // date-time
  /**
   * The members role (admin/user)
   */
  role?: string
}
