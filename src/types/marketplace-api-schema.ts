/**
 * App detailed representation
 */
export interface AppDetailModel {
  /**
   * Gets the unique identifier of the app
   */
  id?: string // uuid
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
}
/**
 * The model responsible for creation of an application definition
 */
export interface CreateAppModel {
  /**
   * Gets the full name of the application
   */
  name?: string
  /**
   * Gets the description of the application
   */
  description?: string
  /**
   * Gets a short summary of the application
   */
  summary?: string
  /**
   * Gets the email address of the developer's helpdesk responsible for providing support of the application
   */
  supportEmail?: string
  /**
   * Gets the telephone number of the developer's helpdesk responsible for providing support of the application
   */
  telephone?: string
  /**
   * Gets the home page of the developer, or the application/product specific page on the developer's website
   */
  homePage?: string
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
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultAppSummaryModel_ {
  /**
   * List of paged data
   */
  readonly data?: AppSummaryModel[]
  /**
   * Page number the data is for
   */
  pageNumber?: number // int32
  /**
   * Number of records per page
   */
  pageSize?: number // int32
  /**
   * Number of records in data
   */
  pageCount?: number // int32
  /**
   * Total number of records that exist
   */
  totalCount?: number // int32
}
