/**
 * Model representing the physical address of a building or premise
 */
export interface AddressModel {
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
  country?: string
  /**
   * Gets the geolocation of the address
   */
  geolocation?: GeolocationModel
}
/**
 * Model representing a calendar appointment
 */
export interface AppointmentModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the datetime when the appointment was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the appointment was last modified
   */
  modified?: string // date-time
  /**
   * Gets the date and time that the appointment will start
   */
  start?: string // date-time
  /**
   * Gets the date and time that the appointment will end
   */
  end?: string // date-time
  /**
   * Gets the type of appointment
   */
  type?: string
  /**
   * Gets the appointment description
   */
  description?: string
  /**
   * Gets any viewing arrangements associated with the appointment
   */
  arrangements?: string
  /**
   * Gets directions to the appointment location
   */
  directions?: string
  /**
   * Flag denoting whether or not the appointment recurs
   */
  recurring?: boolean
  /**
   * Flag denoting whether or not the appointment is cancelled
   */
  cancelled?: boolean
  /**
   * Gets the address of the property where the appointment is due to take place
   */
  property?: AddressModel
  /**
   * Gets a collection of attendees who are requested to attend the appointment
   */
  attendees?: AttendeeModel[]
}
/**
 * Model representing an appointment attendee
 */
export interface AttendeeModel {
  /**
   * Gets the identifier of the attendee
   */
  id?: string
  /**
   * Gets the type of attendee
   */
  type?: string
  /**
   * Gets the name of the attendee
   */
  name?: string
  /**
   * Flag denoting whether or not the attendee has confirmed their attendance to the appointment
   */
  confirmed?: boolean
  /**
   * Gets a collection of the attendees' contact details
   */
  communicationDetails?: CommunicationModel[]
}
/**
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface CommunicationModel {
  /**
   * Gets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Gets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
export interface CreateAppointmentModel {
  start?: string // date-time
  end?: string // date-time
  type?: string
  description?: string
  propertyId?: string
  attendees?: AttendeeModel[]
  recurrence?: RecurrenceModel
}
/**
 * Model representing the geographical location of an address using coordinates
 */
export interface GeolocationModel {
  /**
   * The latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * The longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
export interface PagedResultAppointmentModel_ {
  data?: AppointmentModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface RecurrenceModel {
  interval?: number // int32
  type?: string
  until?: string // date-time
}
