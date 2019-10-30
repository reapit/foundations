/**
 * Outward facing model for the creation of a property image
 */
export interface CreatePropertyImageModel {
  /**
   * Sets the base64 binary content of the file
   */
  data?: string
  /**
   * Sets the id of the property the image is linked to
   */
  propertyId?: string
  /**
   * Sets the images caption
   */
  caption?: string
  /**
   * Sets the images type
   */
  type?: string
}
export interface PagedResultPropertyImageModel_ {
  data?: PropertyImageModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface ProblemDetails {
    name: string
    type?: string;
    title?: string;
    status?: number; // int32
    detail?: string;
    instance?: string;
}
/**
 * Response model for property image details
 */
export interface PropertyImageModel {
  /**
   * Gets the unique id of the image (also the filename)
   */
  id?: string
  /**
   * Gets the datetime of when the property image was created
   */
  created?: string // date-time
  /**
   * Gets the datetime of when the property image was last modified
   */
  modified?: string // date-time
  /**
   * The unique identifier for the property the image is linked to
   */
  propertyId?: string
  /**
   * Gets the Url where the image is located
   */
  url?: string
  /**
   * Gets the caption of the image
   */
  caption?: string
  /**
   * Gets the type of the image (picture/floorPlan/epc/map)
   */
  type?: string
  /**
   * Gets this images order (ascending)
   */
  order?: number // int32
}
/**
 * Outward facing model for the updating of a property image
 */
export interface UpdatePropertyImageModel {
  /**
   * Sets the images caption
   */
  caption?: string
  /**
   * Sets the images type
   */
  type?: string
}
