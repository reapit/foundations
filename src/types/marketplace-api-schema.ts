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
   * Gets the public Url for accessing this app's icon
   */
  iconUri?: string
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
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * The model responsible for creation of an app definition
 */
export interface CreateAppModel {
  /**
   * Gets the developer's id (uuid) of the app
   */
  developerId?: string
  /**
   * Gets the full name of the app
   */
  name?: string
  /**
   * Gets the description of the app
   */
  description?: string
  /**
   * Gets a short summary of the app
   */
  summary?: string
  /**
   * Gets the email address of the developer's helpdesk responsible for providing support of the app
   */
  supportEmail?: string
  /**
   * Gets the telephone number of the developer's helpdesk responsible for providing support of the app
   */
  telephone?: string
  /**
   * Gets the home page of the developer, or the application/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Gets the apps launch uri
   */
  launchUri?: string
  /**
   * Base64 encoded data representing the app icon image
   */
  iconImageData?: string
  /**
   * Base64 encoded data representing the app first app screenshot image
   */
  screen1ImageData?: string
  /**
   * Base64 encoded data representing the app second (optional) app screenshot image
   */
  screen2ImageData?: string
  /**
   * Base64 encoded data representing the app third (optional) app screenshot image
   */
  screen3ImageData?: string
  /**
   * Base64 encoded data representing the app fourth (optional) app screenshot image
   */
  screen4ImageData?: string
  /**
   * Base64 encoded data representing the app fifth (optional) app screenshot image
   */
  screen5ImageData?: string
}
/**
 * The model responsible for creation of an app revision
 */
export interface CreateAppRevisionModel {
  /**
   * Gets the full name of the app revision
   */
  name?: string
  /**
   * Gets the description of the app revision
   */
  description?: string
  /**
   * Gets a short summary of the app revision
   */
  summary?: string
  /**
   * Gets the email address of the developer's helpdesk responsible for providing support of the app revision
   */
  supportEmail?: string
  /**
   * Gets the telephone number of the developer's helpdesk responsible for providing support of the app revision
   */
  telephone?: string
  /**
   * Gets the home page of the developer, or the application/product specific page on the developer's website
   */
  homePage?: string
  /**
   * Gets the apps launch uri
   */
  launchUri?: string
}
/**
 * The model responsible for creation of a developer
 */
export interface CreateDeveloperModel {
  /**
   * Gets the full name of this developer
   */
  name?: string
  /**
   * Gets the company to which this developer is acting on behalf of
   */
  companyName?: string
  /**
   * Gets the job title for this developer
   */
  jobTitle?: string
  /**
   * Gets the email address of the developer
   */
  email?: string
  /**
   * Gets the telephone number of the developer
   */
  telephone?: string
}
/**
 * The model responsible for creation of a relationship between a specific client and app
 */
export interface CreateRelationshipModel {
  /**
   * The unique identifier of the company this relationship is being created for
   */
  companyId?: string
  /**
   * The email address of the user that has approved this app (and created the relationship)
   */
  approvedBy?: string
  /**
   * The expiry date of the relationship (this could be used for app trials etc)
   */
  expiresOn?: string // date-time
}
/**
 * The model responsible for ending the relationship between a specific client and app
 */
export interface EndRelationshipModel {
  /**
   * The email address of the person removing access to this app for the client
   * specified in the relationship
   */
  endedBy?: string
  /**
   * The reason that app access has been removed
   */
  endedReason?: string
  /**
   * The date at which the app should become unavailable to the client (optional - if not passed the app will become unavailable immediately)
   */
  endsOn?: string // date-time
}
/**
 * Represents a HyperMedia Link in
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
