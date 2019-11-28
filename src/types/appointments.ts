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
  typeId?: string
  /**
   * Gets the appointment description
   */
  description?: string
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
   * Gets the property the appointment is associated to
   */
  property?: PropertyModel
  /**
   * Gets a collection of attendees who are requested to attend the appointment
   */
  attendees?: AttendeeModel[]
  /**
   * Gets a listing of additional metadata that has been set against this appointment
   */
  metadata?: {
    [name: string]: any
  }
  readonly links?: LinkModel[]
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
/**
 * Model required to create a calendar entry
 */
export interface CreateAppointmentModel {
  /**
   * Sets the date and time that the appointment will start
   */
  start?: string // date-time
  /**
   * Sets the date and time that the appointment will end
   */
  end?: string // date-time
  /**
   * Sets the type of appointment
   */
  typeId?: string
  /**
   * Sets the appointment description
   */
  description?: string
  /**
   * Sets the property identifier that the appointment takes place at
   */
  propertyId?: string
  /**
   * Sets the details of the attendees of the appointment
   */
  attendees?: CreateAttendeeModel[]
  /**
   * Sets the recurrence pattern for this appointment
   */
  recurrence?: CreateRecurrenceModel
  /**
   * Sets a JSON fragment to attach to this appointment as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to associate an attendee to a new appointment
 */
export interface CreateAttendeeModel {
  /**
   * Sets the identifier of the attendee
   */
  id?: string
  /**
   * Sets the type of attendee
   */
  type?: string
  /**
   * Flag denoting whether or not the attendee has confirmed their attendance to the appointment
   */
  confirmed?: boolean
}
/**
 * Model to set the recurrence details of a new appointment
 */
export interface CreateRecurrenceModel {
  /**
   * Sets the numeric value for often this appointment will recur
   */
  interval?: number // int32
  /**
   * Sets the type of unit that the interval will apply to
   */
  type?: string
  /**
   * Sets the date this appointment will continue to recur until
   */
  until?: string // date-time
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
export interface LinkModel {
  rel?: string
  href?: string
  action?: string
}
export interface PagedResultAppointmentModel_ {
  data?: AppointmentModel[]
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
 * Model representing an appointment property
 */
export interface PropertyModel {
  /**
   * Gets the unique property identifier
   */
  id?: string
  /**
   * Gets any arrangements in place for viewing this property
   */
  arrangements?: string
  /**
   * Gets the address of the property where the appointment is due to take place
   */
  address?: AddressModel
}
/**
 * Model required to update a calendar entry
 */
export interface UpdateAppointmentModel {
  /**
   * Sets the date and time that the appointment will start
   */
  start?: string // date-time
  /**
   * Sets the date and time that the appointment will end
   */
  end?: string // date-time
  /**
   * Sets the type of appointment
   */
  typeId?: string
  /**
   * Sets the appointment description
   */
  description?: string
  /**
   * Sets the property identifier that the appointment takes place at
   */
  propertyId?: string
  /**
   * Sets the flag that determines if this appointment is cancelled
   */
  cancelled?: boolean
  /**
   * Sets the details of the attendees of the appointment
   */
  attendees?: UpdateAttendeeModel[]
  /**
   * Sets the recurrence pattern for this appointment
   */
  recurrence?: UpdateRecurrenceModel
  /**
   * Sets a JSON fragment to attach to this appointment as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update an attendee on an appointment
 */
export interface UpdateAttendeeModel {
  /**
   * Sets the identifier of the attendee
   */
  id?: string
  /**
   * Sets the type of attendee
   */
  type?: string
  /**
   * Flag denoting whether or not the attendee has confirmed their attendance to the appointment
   */
  confirmed?: boolean
}
/**
 * Model to update the recurrence details of an appointment
 */
export interface UpdateRecurrenceModel {
  /**
   * Sets the type of unit that the interval will apply to
   */
  type?: string
  /**
   * Sets the numeric value for often this appointment will recur
   */
  interval?: number // int32
  /**
   * Sets the date this appointment will continue to recur until
   */
  until?: string // date-time
}
