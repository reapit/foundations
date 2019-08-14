/**
 * App detailed representation
 */
export interface AppDetailModel {
  /**
   * Gets the GUID of the app
   */
  id?: string // uuid
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
   * Gets the date the app was installed for a specific client
   */
  installedOn?: string // date-time
  /**
   * Gets a flag determining whether or not the app is currently listed on the marketplace
   */
  isListed?: boolean
  /**
   * Gets the sandbox status of this app
   */
  isSandbox?: boolean
  /**
   * Gets the status of whether the app has pending revisions
   */
  pendingRevisions?: boolean
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
   * Gets the listed status of the app revision
   */
  isListed?: boolean
  /**
   * Gets the scopes that have been associated to this revision
   */
  scopes?: string[]
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
   * Gets the public Url for accessing this app's icon
   */
  iconUri?: string
  /**
   * Gets the time stamp of the installed date
   */
  installedOn?: string // date-time
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
   * Sets the unique identifer of the developer registering the app
   */
  developerId?: string // uuid
  /**
   * Sets the list of scope keys required for this app to run
   */
  scopes?: string[]
  /**
   * Sets the base64 encoded data representing the app icon image
   */
  iconImageData?: string
  /**
   * Sets the base64 encoded data representing the app first app screenshot image
   */
  screen1ImageData?: string
  /**
   * Sets the base64 encoded data representing the app second (optional) app screenshot image
   */
  screen2ImageData?: string
  /**
   * Sets the base64 encoded data representing the app third (optional) app screenshot image
   */
  screen3ImageData?: string
  /**
   * Sets the base64 encoded data representing the app fourth (optional) app screenshot image
   */
  screen4ImageData?: string
  /**
   * Sets the base64 encoded data representing the app fifth (optional) app screenshot image
   */
  screen5ImageData?: string
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
   * Sets the unique identifier of the developer associated with this app revision
   */
  developerId?: string // uuid
  /**
   * Sets the base64 encoded data representing the app icon image
   */
  iconImageData?: string
  /**
   * Sets the base64 encoded data representing the app first app screenshot image
   */
  screen1ImageData?: string
  /**
   * Sets the base64 encoded data representing the app second (optional) app screenshot image
   */
  screen2ImageData?: string
  /**
   * Sets the base64 encoded data representing the app third (optional) app screenshot image
   */
  screen3ImageData?: string
  /**
   * Sets the base64 encoded data representing the app fourth (optional) app screenshot image
   */
  screen4ImageData?: string
  /**
   * Sets the base64 encoded data representing the app fifth (optional) app screenshot image
   */
  screen5ImageData?: string
  /**
   * Sets the apps launch uri
   */
  launchUri?: string
  /**
   * Sets the listed status of the app
   * When false, the app will not be visible in marketplace app listings
   */
  isListed?: boolean
  /**
   * Sets the list of scope keys required for this app revision
   */
  scopes?: string[]
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
   * Sets the password the developer uses to log in
   */
  password?: string
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
 * Model that represents a developer
 */
export interface DeveloperModel {
  /**
   * Gets the id of this developer
   */
  readonly id?: string
  /**
   * Gets the id of this developer held in the gateway
   */
  readonly externalId?: string
  /**
   * Gets the full name of this developer
   */
  readonly name?: string
  /**
   * Gets the company to which this developer is acting on behalf of
   */
  readonly company?: string
  /**
   * Gets the job title for this developer
   */
  readonly jobTitle?: string
  /**
   * Gets the email address of the developer
   */
  readonly email?: string
  /**
   * Gets the telephone number of the developer
   */
  readonly telephone?: string
  /**
   * Gets or sets the timestamp of entity creation
   */
  readonly created?: string // date-time
  /**
   * Gets or sets the timestamp of entity modification
   */
  readonly modified?: string // date-time
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
   * Gets the reason that access to associated app was removed
   */
  terminatedReason?: string
  /**
   * Gets the date that access to the associated app was terminated, or is due to terminate on
   */
  terminatesOn?: string // date-time
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
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
  readonly uri?: string
  /**
   * Gets the textual description of this media content
   */
  readonly description?: string
  /**
   * Gets type of media this entity relates to
   */
  readonly type?: string
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
}
