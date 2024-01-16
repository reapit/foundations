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
  /**
   * Gets the apps rotating client secret
   */
  rotatingClientSecret?: string
}
/**
 * App detailed representation
 */
export interface AppDetailModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * Gets public listed date of this application
   */
  publicListedDate?: string // date-time
  /**
   * Gets client id of this application
   */
  externalId?: string
  /**
   * Gets the rotating external client id of this application
   */
  rotatingExternalId?: string
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
   * Gets the products to list this app on
   */
  products?: string[]
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
   * Gets a flag determining whether or not the app is protected from deletion
   */
  deletionProtection?: boolean
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
   * Gets the location url of the terms and conditions associated to the app
   */
  termsAndConditionsUrl?: string
  /**
   * Gets the location url of the privacy policy associated to the app
   */
  privacyPolicyUrl?: string
  /**
   * Gets the location url of the pricing document associated to the app
   */
  pricingUrl?: string
  /**
   * Gets a flag to determine if the app is free to use
   */
  isFree?: boolean
  /**
   * Gets a flag to determing if the app is marked as hidden
   */
  isHidden?: boolean
  /**
   * Gets the collection of categories assigned to the app
   */
  categories?: CategoryModel[]
  /**
   * Gets the collection of scopes against the app
   */
  scopes?: ScopeModel[]
  /**
   * Gets a collection of media objects associated with the app
   */
  media?: MediaModel[]
  /**
   * Gets the X axis size of the launched window for apps with one or more configured desktop integration types
   */
  launchWindowSizeX?: number // int32
  /**
   * Gets the Y axis size of the launched window for apps with one or more configured desktop integration types
   */
  launchWindowSizeY?: number // int32
  /**
   * Gets the fixed api consumption cost for the app
   */
  fixedApiConsumptionCost?: number // double
}
/**
 * Model to expose app restriction info
 */
export interface AppRestrictionModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * Gets the unique identifier associated to the app restriction
   */
  id?: string // uuid
  /**
   * Gets the unique identifier of the app associated to the app restriction
   */
  appId?: string // uuid
  /**
   * The date and time the app restriction was created
   */
  created?: string // date-time
  /**
   * The date and time the app restriction was last modified
   */
  modified?: string // date-time
  /**
   * The status of the app restriction (include/exclude)
   */
  status?: string
}
/**
 * Model to handle paged data and information
 */
export interface AppRestrictionModelPagedResult {
  /**
   * List of paged data
   */
  data?: AppRestrictionModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model to expose the app revision consent
 */
export interface AppRevisionConsentModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * Gets the unique identifier of the consent
   */
  id?: string // uuid
  /**
   * The timestamp of entity creation
   */
  created?: string // date-time
  /**
   * The email of the user who actioned the consent
   */
  actionedBy?: string
  /**
   * The email of the user who installed the app the consent relates to
   */
  installedBy?: string
  /**
   * Gets the unique identifier of the installation associated to the consent
   */
  installationId?: string // uuid
  /**
   * Gets the unique identifier of the application associated to the consent
   */
  applicationId?: string // uuid
  /**
   * Gets the unique identifier of the app revision associated to the consent
   */
  revisionId?: string // uuid
  /**
   * The timestamp of when the email was sent
   */
  sentDate?: string // date-time
  /**
   * Gets the status of the consent
   */
  status?: string
  /**
   * The timestamp of when the consent was approved
   */
  approvalDate?: string // date-time
  /**
   * The timestamp of when the app was uninstalled
   */
  uninstallDate?: string // date-time
}
/**
 * App revision detailed representation
 */
export interface AppRevisionModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * Gets the email of the user who created the revision
   */
  createdBy?: string
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
   * Gets a flag determining whether or not the app is protected from deletion
   */
  deletionProtection?: boolean
  /**
   * Gets the unique identifier of clients that the app is visible to
   */
  limitToClientIds?: string[]
  /**
   * Gets the desktop integration type ids of this revision
   */
  desktopIntegrationTypeIds?: string[]
  /**
   * Gets the products to list this app on
   */
  products?: string[]
  /**
   * Gets the location url of the terms and conditions associated to the app
   */
  termsAndConditionsUrl?: string
  /**
   * Gets the location url of the privacy policy associated to the app
   */
  privacyPolicyUrl?: string
  /**
   * Gets the location url of the pricing document associated to the app
   */
  pricingUrl?: string
  /**
   * Gets a flag to determine if the app is free to use
   */
  isFree?: boolean
  /**
   * Gets the categories for the app this revision belongs to
   */
  categories?: CategoryModel[]
  /**
   * Gets the scopes that have been associated to this revision
   */
  scopes?: ScopeModel[]
  /**
   * Gets a collection of media objects associated with the app
   */
  media?: MediaModel[]
  /**
   * Gets the X axis size of the launched window in AgencyCloud for an app with one or more desktopIntegrationTypeIds set
   */
  launchWindowSizeX?: number // int32
  /**
   * Gets the Y axis size of the launched window in AgencyCloud for an app with one or more desktopIntegrationTypeIds set
   */
  launchWindowSizeY?: number // int32
}
/**
 * Model to handle paged data and information
 */
export interface AppRevisionModelPagedResult {
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
 * App summary representation
 */
export interface AppSummaryModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * Gets the GUID of the app
   */
  id?: string // uuid
  /**
   * Gets public listed date of this application
   */
  publicListedDate?: string // date-time
  /**
   * Gets external client id of this application
   */
  externalId?: string
  /**
   * Gets the rotating external client id of this application
   */
  rotatingExternalId?: string
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
   * Gets a flag determining whether or not the app is protected from deletion
   */
  deletionProtection?: boolean
  /**
   * Gets a flag to determine if the app is free to use
   */
  isFree?: boolean
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
   * Gets the products to list this app on
   */
  products?: string[]
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
   * Gets a flag to determing if the app is marked as hidden
   */
  isHidden?: boolean
  /**
   * Gets the unique identifier of clients that the app is visible to
   */
  limitToClientIds?: string[]
  /**
   * Gets the X axis size of the launched window for apps with one or more configured desktop integration types
   */
  launchWindowSizeX?: number // int32
  /**
   * Gets the Y axis size of the launched window for apps with one or more configured desktop integration types
   */
  launchWindowSizeY?: number // int32
  /**
   * Gets the fixed api consumption cost for the app
   */
  fixedApiConsumptionCost?: number // double
  /**
   * A flag to determine if installation is required for access to this app (defaults to true for security)
   */
  isInstallationRequired?: boolean
  /**
   * A flag to determine if the app is internal (For reapit staff only)
   */
  isInternalApp?: boolean
}
/**
 * Model to handle paged data and information
 */
export interface AppSummaryModelPagedResult {
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
 * Approval representation
 */
export interface ApprovalModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * Apps unique identifier
   */
  appId?: string // uuid
  /**
   * Type of approval
   */
  type?: string
  /**
   * The name of the app the approval relates to
   */
  appName?: string
  /**
   * Description of approval
   */
  description?: string
  /**
   * App revision unique identifier
   */
  appRevisionId?: string // uuid
  /**
   * Gets the email of the user who created the revision
   */
  createdBy?: string
  /**
   * Gets the date the revision was created
   */
  readonly created?: string // date-time
}
/**
 * Model to handle paged data and information
 */
export interface ApprovalModelPagedResult {
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
 * The model responsible for approving a consent
 */
export interface ApproveAppRevisionConsentModel {
  /**
   * Sets the email of the user approving the consent
   */
  approvedBy?: string
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
  /**
   * Sets the public listed date of the approval
   */
  publicListedDate?: string // date-time
}
/**
 * The model responsible for creation of installation metadata
 */
export interface BatchUpdateInstallationMetadataModel {
  /**
   * Sets the service that the metadata is associated to (eg appointment,contacts, companies)
   */
  service?: string
  /**
   * Sets the field the filter is applied too
   */
  field?: string
  /**
   * Sets the allowed values in the field
   */
  allow?: string[]
}
/**
 * The model responsible for batch updating installations
 */
export interface BatchUpdateInstallationsModel {
  /**
   * Sets the unique identifier of the app the installation updates are for
   */
  appId?: string // uuid
  /**
   * Sets the email address of the user performing the action
   */
  actionedBy?: string
  /**
   * Sets the list of customers to install the app for
   */
  installFor?: string[]
  /**
   * Sets the list of customers to uninstall the app for
   */
  uninstallFor?: string[]
  /**
   * The group mode to install and uninstall for (officeGroup/organisationGroup)
   */
  mode?: string
  /**
   * Sets any additional metadata against the installation
   */
  metadata?: BatchUpdateInstallationMetadataModel[]
}
/**
 * Model to expose category info
 */
export interface CategoryModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
}
/**
 * Model to handle paged data and information
 */
export interface CategoryModelPagedResult {
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
   * Sets the unique identifer of the apps category. Multiple ids can be passed in the array
   */
  categoryIds?: string[]
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
   * Sets the list of products to list the app on for this app
   */
  products?: string[]
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
  /**
   * Sets the location url of the first (optional) app video url
   */
  videoUrl1?: string
  /**
   * Sets the location url of the second (optional) app video url
   */
  videoUrl2?: string
}
/**
 * The model responsible for creation of an app restriction
 */
export interface CreateAppRestrictionModel {
  /**
   * Sets the unique identifier of the app the restriciton is for
   */
  appId?: string // uuid
  /**
   * Sets a status to determine whether or not to include the app (include/exclude)
   */
  status?: string
}
/**
 * The model responsible for creation of app revision consents
 */
export interface CreateAppRevisionConsentsModel {
  /**
   * Sets the email of the user creating the app revision consents
   */
  actionedBy?: string
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
   * Sets the flag determining whether or not the app is protected from deletion
   */
  deletionProtection?: boolean
  /**
   * Sets the unique identifier of the developer associated with this app revision
   */
  developerId?: string // uuid
  /**
   * Sets the unique identifer of the apps revisions category. Multiple ids can be passed in the array
   */
  categoryIds?: string[]
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
   * Sets the location url of the first (optional) app video url
   */
  videoUrl1?: string
  /**
   * Sets the location url of the second (optional) app video url
   */
  videoUrl2?: string
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
  /**
   * Sets the list of products to list the app on for this app revision
   */
  products?: string[]
  /**
   * Sets the location url of the terms and conditions associated to the app
   */
  termsAndConditionsUrl?: string
  /**
   * Sets the location url of the privacy policy associated to the app
   */
  privacyPolicyUrl?: string
  /**
   * Sets the location url of the pricing document associated to the app
   */
  pricingUrl?: string
  /**
   * Sets a flag to determine if the app is free to use
   */
  isFree?: boolean
  /**
   * Sets the X axis size of the launched window in AgencyCloud for an app with one or more desktopIntegrationTypeIds set
   */
  launchWindowSizeX?: number // int32
  /**
   * Sets the Y axis size of the launched window in AgencyCloud for an app with one or more desktopIntegrationTypeIds set
   */
  launchWindowSizeY?: number // int32
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
   * Alternative email address for marketplace developer notifications
   */
  notificationsEmail?: string
  companyAddress?: CreateAddressModel
  /**
   * The github username for the initial member
   */
  gitHubUsername?: string
  /**
   * The maximum number of apps the developer can have unlisted
   */
  maxAppsUnlisted?: number // int32
  /**
   * The notes specified by the developer
   */
  notes?: string
}
/**
 * The model responsible for creation of installation metadata
 */
export interface CreateInstallationMetadataModel {
  /**
   * Sets the service that the metadata is associated to (eg appointment,contacts, companies)
   */
  service?: string
  /**
   * Sets the field the filter is applied too
   */
  field?: string
  /**
   * Sets the allowed values in the field
   */
  allow?: string[]
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
  /**
   * Sets any additional metadata against the installation
   */
  metadata?: CreateInstallationMetadataModel[]
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
   * The id of the customer to create the subscription for
   */
  customerId?: string
  /**
   * The id of the application to create the subscription against
   */
  applicationId?: string // uuid
  /**
   * The email of the user related to the subscription
   */
  user?: string
  /**
   * The type of subscription (applicationListing/developerRegistration/developerEdition/dataWarehouse)
   */
  type?: string
}
/**
 * Model to expose customer info
 */
export interface CustomerModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * Gets the unique identifier associated to the customer
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
   * Gets the agency cloud identifier of the customer
   */
  agencyCloudId?: string
  /**
   * Gets the name of the customer
   */
  name?: string
  address?: AddressModel
  /**
   * The Reapit billing reference number for the customer
   */
  billingReference?: string
  /**
   * The email of the user who approved the customers account
   */
  accountApprovedEmail?: string
  /**
   * The date time the customers account was approved
   */
  accountApproved?: string // date-time
}
/**
 * Model to handle paged data and information
 */
export interface CustomerModelPagedResult {
  /**
   * List of paged data
   */
  data?: CustomerModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
/**
 * Model representing an Apps demonstration details
 */
export interface DemonstrationModel {
  /**
   * The external app identifier
   */
  externalAppId?: string
  /**
   * The access token
   */
  accessToken?: string
  /**
   * The id token
   */
  idToken?: string
  /**
   * The refresh token
   */
  refreshToken?: string
}
/**
 * Model that represents a desktop integration type
 */
export interface DesktopIntegrationTypeModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
}
/**
 * Model to handle paged data and information
 */
export interface DesktopIntegrationTypeModelPagedResult {
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
 * Model that represents a developer
 */
export interface DeveloperModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * Alternative email address for marketplace developer notifications
   */
  notificationsEmail?: string
  /**
   * The maximum number of unlisted apps
   */
  maxAppsUnlisted?: number // int32
  /**
   * The amount the developer pays for the developer edition subscription
   */
  developerEditionSubscriptionCost?: number // double
  companyAddress?: CompanyAddressModel
  /**
   * The notes specified by the developer
   */
  notes?: string
}
/**
 * Model to handle paged data and information
 */
export interface DeveloperModelPagedResult {
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
 * Payload used to generate demonstration details for a given app
 */
export interface GenerateDemonstrationDetailsModel {
  /**
   * The external identifier of the app to generate demonstration details for (the app Ids stored in third party IdP)
   */
  externalAppId?: string
}
/**
 * Query object for requesting a list of products in the Reapit Group that marketplace applications can be published to
 */
export interface GetProductsQuery {}
/**
 * Installation metadata representation
 */
export interface InstallationMetadataModel {
  /**
   * The service that the metadata is associated to (eg appointment,contacts, companies)
   */
  service?: string
  /**
   * The field the filter is applied too
   */
  field?: string
  /**
   * The allowed values in the field
   */
  allow?: string[]
}
/**
 * Installation representation
 */
export interface InstallationModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * Gets the name of the app the installation is associated with
   */
  appName?: string
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
   * Gets or sets the name of the office group that the installation has been created for, where applicable
   */
  officeGroupName?: string
  /**
   * Gets the email address of the user who installed the app
   */
  installedBy?: string
  /**
   * Gets the email address of the user who uninstalled the app
   */
  uninstalledBy?: string
  /**
   * Gets the X axis size of the pop up window
   */
  launchWindowSizeX?: number // int32
  /**
   * Gets the Y axis size of the pop up window
   */
  launchWindowSizeY?: number // int32
  /**
   * Gets the fixed api consumption cost for the installation
   */
  fixedApiConsumptionCost?: number // double
  customerAddress?: AddressModel
  /**
   * Gets the installations metadata
   */
  metadata?: InstallationMetadataModel[]
  officeGroup?: InstallationOfficeGroupModel
}
/**
 * Model to handle paged data and information
 */
export interface InstallationModelPagedResult {
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
 * Office group representation
 */
export interface InstallationOfficeGroupModel {
  /**
   * Gets the name of the office group
   */
  name?: string
  /**
   * Gets the list of offices associated to the group
   */
  offices?: InstallationOfficeModel[]
}
/**
 * Office representation
 */
export interface InstallationOfficeModel {
  /**
   * Gets the unique identifier of the office
   */
  id?: string
  /**
   * Gets the name of the office
   */
  name?: string
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
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
}
/**
 * Model that represents a member of a developer organisation
 */
export interface MemberModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * The github username of the member
   */
  gitHubUsername?: string
  /**
   * The date the member agreed to the terms
   */
  agreedTerms?: string // date-time
  /**
   * The id of the developer the member is associated to
   */
  developerId?: string // uuid
  /**
   * The id of the sandbox envionment the member is associated to (AUS/GBR)
   */
  sandboxId?: string
  /**
   * The id of the negotiator account to use when signing into Developer Edition
   * assuming a valid subscription exists
   */
  developerEditionId?: string
  /**
   * A flag specifying if the member has access to agency cloud
   */
  agencyCloudAccess?: boolean
  /**
   * A flag to determine whether an access token issued to this developer user will resolve to customer data (rather than sandbox)
   */
  useCustomerData?: boolean
  /**
   * A flag to determine if this member is the main contact for the developer
   */
  isMainContact?: boolean
}
/**
 * Model to handle paged data and information
 */
export interface MemberModelPagedResult {
  /**
   * List of paged data
   */
  data?: MemberModel[]
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
 * Model to expose details of products across the Reapit Group that marketplace applications can be published to
 */
export interface ProductModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * The unique product identifier
   */
  id?: string
  /**
   * The product name
   */
  name?: string
  /**
   * The URL at which the OpenAPI specification JSON document for the product can be obtained
   */
  openApiUrl?: string
  /**
   * The identifier of the default sandbox that should be used by the product
   */
  defaultSandboxId?: string
}
/**
 * Model to handle paged data and information
 */
export interface ProductModelPagedResult {
  /**
   * List of paged data
   */
  data?: ProductModel[]
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
  /**
   * Flag to determine if the revision has been rejected by a developer (defaulted to false)
   */
  rejectedByDeveloper?: boolean
}
/**
 * The model responsible for resending consent emails
 */
export interface ResendAppRevisionConsentModel {
  /**
   * Sets the email of the user resending the consent emails
   */
  actionedBy?: string
  /**
   * Sets the override email of the user to re-send the consent too
   * If this is not sent it goes to the user who installed the app
   */
  recipient?: string
}
/**
 * Model to expose details of a sandbox environment
 */
export interface SandboxModel {
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
  /**
   * The unique sandbox identifier
   */
  id?: string
  /**
   * The sandbox environment name
   */
  name?: string
  /**
   * The identifier of the customer associated to the sandbox
   */
  customerId?: string
}
/**
 * Model to handle paged data and information
 */
export interface SandboxModelPagedResult {
  /**
   * List of paged data
   */
  data?: SandboxModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
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
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
   * The developer organisation associated to the subscription
   */
  organisationName?: string
  /**
   * The unique identifier of the customer associated to the subscription
   */
  customerId?: string
  /**
   * The GUID of the application associated to the subscription
   */
  applicationId?: string // uuid
  /**
   * The email of the user against the subscription
   */
  user?: string
  /**
   * The type of subscription (applicationListing/developerRegistration/developerEdition/dataWarehouse)
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
}
/**
 * Model to handle paged data and information
 */
export interface SubscriptionModelPagedResult {
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
 * The model responsible for updating an app
 */
export interface UpdateAppModel {
  /**
   * Sets the fixed api consumption cost for the app
   */
  fixedApiConsumptionCost?: number // double
  /**
   * A flag to determine if installation is required for access to this app (defaults to true for security)
   */
  isInstallationRequired?: boolean
  /**
   * A flag to determine if the app is internal (For reapit staff only)
   */
  isInternalApp?: boolean
}
/**
 * The model responsible for updating a customer
 */
export interface UpdateCustomerModel {
  /**
   * The email of the user approving the customer
   */
  accountApprovedEmail?: string
  /**
   * The date time the account was approved
   */
  accountApproved?: string // date-time
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
  agreedTerms?: string // date-time
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
   * Alternative email address for marketplace developer notifications
   */
  notificationsEmail?: string
  companyAddress?: UpdateAddressModel
  /**
   * The maximum number of apps the developer can have unlisted
   */
  maxAppsUnlisted?: number // int32
  /**
   * Sets the price this developer will pay for developer edition
   */
  developerEditionSubscriptionCost?: number // double
  /**
   * Sets the notes specified by the developer
   */
  notes?: string
}
/**
 * The model responsible for updating an installation
 */
export interface UpdateInstallationModel {
  /**
   * Sets the fixed api consumption cost for the installation
   */
  fixedApiConsumptionCost?: number // double
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
  /**
   * A flag to determine whether an access token issued to this developer user will resolve to customer data (rather than sandbox)
   */
  useCustomerData?: boolean
  /**
   * The identifier of the sandbox environment to use (AUS/GBR)
   */
  sandboxId?: string
  /**
   * The id of the negotiator account to use when signing into Developer Edition
   * assuming a valid subscription exists
   */
  developerEditionId?: string
  /**
   * The github username for this member
   */
  gitHubUsername?: string
  /**
   * The status of the member (active/inactive/pending/rejected)
   */
  status?: string
  /**
   * A flag to determine if the member is the main contact
   */
  isMainContact?: boolean
}
