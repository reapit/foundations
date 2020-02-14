/**
 * Model for exposing error details to API consumers
 */
export interface ApiErrorModel {
  /**
   * The Http StatusCode associated with this error event
   */
  statusCode?:
    | 'Continue'
    | 'SwitchingProtocols'
    | 'Processing'
    | 'EarlyHints'
    | 'OK'
    | 'Created'
    | 'Accepted'
    | 'NonAuthoritativeInformation'
    | 'NoContent'
    | 'ResetContent'
    | 'PartialContent'
    | 'MultiStatus'
    | 'AlreadyReported'
    | 'IMUsed'
    | 'MultipleChoices'
    | 'Ambiguous'
    | 'MovedPermanently'
    | 'Moved'
    | 'Found'
    | 'Redirect'
    | 'SeeOther'
    | 'RedirectMethod'
    | 'NotModified'
    | 'UseProxy'
    | 'Unused'
    | 'TemporaryRedirect'
    | 'RedirectKeepVerb'
    | 'PermanentRedirect'
    | 'BadRequest'
    | 'Unauthorized'
    | 'PaymentRequired'
    | 'Forbidden'
    | 'NotFound'
    | 'MethodNotAllowed'
    | 'NotAcceptable'
    | 'ProxyAuthenticationRequired'
    | 'RequestTimeout'
    | 'Conflict'
    | 'Gone'
    | 'LengthRequired'
    | 'PreconditionFailed'
    | 'RequestEntityTooLarge'
    | 'RequestUriTooLong'
    | 'UnsupportedMediaType'
    | 'RequestedRangeNotSatisfiable'
    | 'ExpectationFailed'
    | 'MisdirectedRequest'
    | 'UnprocessableEntity'
    | 'Locked'
    | 'FailedDependency'
    | 'UpgradeRequired'
    | 'PreconditionRequired'
    | 'TooManyRequests'
    | 'RequestHeaderFieldsTooLarge'
    | 'UnavailableForLegalReasons'
    | 'InternalServerError'
    | 'NotImplemented'
    | 'BadGateway'
    | 'ServiceUnavailable'
    | 'GatewayTimeout'
    | 'HttpVersionNotSupported'
    | 'VariantAlsoNegotiates'
    | 'InsufficientStorage'
    | 'LoopDetected'
    | 'NotExtended'
    | 'NetworkAuthenticationRequired'
  /**
   * The date and time that this error event occurred
   */
  dateTime?: string // date-time
  /**
   * The detailed information regarding this error event
   */
  description?: string
}
/**
 * The details specific to applicants with a marketingMode of buying
 */
export interface ApplicantBuyingModel {
  /**
   * The lower bound of the applicant's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the applicant's budget
   */
  priceTo?: number // int32
}
/**
 * Representation of the physical address of a building or premise
 */
export interface ApplicantContactAddressModel {
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
 * A summarised view of the details of a contact associated to an applicant
 */
export interface ApplicantContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The name of the contact
   */
  name?: string
  /**
   * The type of the contact (company/contact)
   */
  type?: string
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * The primary address of the contact
   */
  primaryAddress?: {
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
}
export interface ApplicantContactRelationshipModel {
  /**
   * The unique identifier of the applicant relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   */
  modified?: string // date-time
  /**
   * The unique identifier of the applicant
   */
  applicantId?: string
  /**
   * The type of related entity
   */
  associatedType?: string
  /**
   * The unique identifier of the related entity
   */
  associatedId?: string
  /**
   * A flag denoting whether or not this relationship should be regarded as the main relationship for the parent applicant entity
   */
  isMain?: boolean
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * The applicant's outdoor space requirements
 */
export interface ApplicantExternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (acres/hectares)
   */
  type?: string
  /**
   * The minimum unit value of outside space that the applicant is looking for
   */
  amountFrom?: number // double
  /**
   * The maximum unit value of outside space that the applicant is looking for
   */
  amountTo?: number // double
}
/**
 * The applicant's indoor space requirements
 */
export interface ApplicantInternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The unit value of inside space that the applicant is looking for
   */
  amount?: number // double
}
/**
 * Representation of an applicant
 */
export interface ApplicantModel {
  /**
   * The unique identifier of the applicant
   */
  id?: string
  /**
   * The date and time when the applicant was created
   */
  created?: string // date-time
  /**
   * The date and time when the applicant was last modified
   */
  modified?: string // date-time
  /**
   * Indicates whether the applicant is look to buy or rent a property (buying/renting)
   */
  marketingMode?: string
  /**
   * The ISO-4217 currency code that relates to monetary amounts specified by this applicant
   */
  currency?: string
  /**
   * A flag determining whether or not the applicant is actively looking for a property
   */
  active?: boolean
  /**
   * A free text field describing any adhoc buying or renting requirements
   */
  notes?: string
  /**
   * The date when the applicant was last contacted
   */
  lastCall?: string // date-time
  /**
   * The date when the applicant is next due to be contacted
   */
  nextCall?: string // date-time
  /**
   * The unique identifier of the department that the applicant requirements are associated with. This applicant will only match to properties with the same value
   */
  departmentId?: string
  /**
   * The unique identifier of the solicitor associated to this applicant
   */
  solicitorId?: string
  /**
   * A list of property type requirements taken from the full listing of the associated department
   */
  type?: string[]
  /**
   * A list of property style requirements taken from the full listing of the associated department
   */
  style?: string[]
  /**
   * A list of property situation requirements taken from the full listing of the associated department
   */
  situation?: string[]
  /**
   * A list of property parking requirements taken from the full listing of the associated department
   */
  parking?: string[]
  /**
   * A list of property age requirements taken from the full listing of the associated department
   */
  age?: string[]
  /**
   * A list of property locality requirements taken from the full listing of the associated department
   */
  locality?: string[]
  /**
   * The minimum number of bedrooms the applicant requires
   */
  bedroomsMin?: number // int32
  /**
   * The maximum number of bedrooms the applicant requires
   */
  bedroomsMax?: number // int32
  /**
   * The minimum number of reception rooms the applicant requires
   */
  receptionsMin?: number // int32
  /**
   * The maximum number of reception rooms the applicant requires
   */
  receptionsMax?: number // int32
  /**
   * The minimum number of bathrooms the applicant requires
   */
  bathroomsMin?: number // int32
  /**
   * The maximum number of bathrooms the applicant requires
   */
  bathroomsMax?: number // int32
  /**
   * The applicants location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * The applicants location options
   */
  locationOptions?: string[]
  /**
   * The details specific to applicants with a marketingMode of buying
   */
  buying?: {
    /**
     * The lower bound of the applicant's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the applicant's budget
     */
    priceTo?: number // int32
  }
  /**
   * The details specific to applicants with a marketingMode of renting
   */
  renting?: {
    /**
     * The date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * The applicant's preferred letting term (long/short/any)
     */
    term?: string
    /**
     * The lower bound of the applicant's budget
     */
    rentFrom?: number // double
    /**
     * The upper bound of the applicant's budget
     */
    rentTo?: number // double
    /**
     * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * A list of property furnishing requirements taken from the full listing of the associated department. Only applicable to applicants with a marketingMode of renting
     */
    furnishing?: string[]
  }
  /**
   * The applicant's outdoor space requirements
   */
  externalArea?: {
    /**
     * The unit of area that each amount corresponds to (acres/hectares)
     */
    type?: string
    /**
     * The minimum unit value of outside space that the applicant is looking for
     */
    amountFrom?: number // double
    /**
     * The maximum unit value of outside space that the applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * The applicant's indoor space requirements
   */
  internalArea?: {
    /**
     * The unit of area that each amount corresponds to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The unit value of inside space that the applicant is looking for
     */
    amount?: number // double
  }
  /**
   * Gets the applicants source information
   */
  source?: {
    /**
     * Gets the unique identifier of the applicants source
     */
    id?: string
    /**
     * Gets the applicants source type
     */
    type?: string
  }
  /**
   * A collection of office unique identifiers that are associated to the applicant. The first identifier listed is considered to be the primary office
   */
  officeIds?: string[]
  /**
   * A collection of negotiator unique identifiers that are associated to the applicant. The first identifier listed is considered to be the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of summarised contacts attached to the applicant. The first contact listed is considered to be the primary contact
   */
  related?: {
    /**
     * The unique identifier of the contact
     */
    id?: string
    /**
     * The name of the contact
     */
    name?: string
    /**
     * The type of the contact (company/contact)
     */
    type?: string
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
    /**
     * The primary address of the contact
     */
    primaryAddress?: {
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
  }[]
  /**
   * A listing of app specific metadata that has been set against this applicant
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this applicant. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * The details specific to applicants with a marketingMode of renting
 */
export interface ApplicantRentingModel {
  /**
   * The date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * The applicant's preferred letting term (long/short/any)
   */
  term?: string
  /**
   * The lower bound of the applicant's budget
   */
  rentFrom?: number // double
  /**
   * The upper bound of the applicant's budget
   */
  rentTo?: number // double
  /**
   * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * A list of property furnishing requirements taken from the full listing of the associated department. Only applicable to applicants with a marketingMode of renting
   */
  furnishing?: string[]
}
/**
 * Model representing the details of a applicants source
 */
export interface ApplicantSourceModel {
  /**
   * Gets the unique identifier of the applicants source
   */
  id?: string
  /**
   * Gets the applicants source type
   */
  type?: string
}
export interface Applicants {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  Address?: string
  DepartmentId?: string
  Name?: string
  PriceFrom?: number
  PriceTo?: number
  RentFrom?: number
  RentTo?: number
  BedroomsFrom?: number
  BedroomsTo?: number
  CreatedFrom?: string
  CreatedTo?: string
  LastCallFrom?: string
  LastCallTo?: string
  NextCallFrom?: string
  NextCallTo?: string
  Age?: ('period' | 'new' | 'modern')[]
  Furnishing?: ('furnished' | 'unfurnished' | 'partFurnished')[]
  Locality?: ('rural' | 'village' | 'townCity')[]
  Parking?: ('residents' | 'offStreet' | 'secure' | 'underground' | 'garage' | 'doubleGarage' | 'tripleGarage')[]
  Situation?: ('garden' | 'land' | 'patio' | 'roofTerrace' | 'conservatory' | 'balcony' | 'communalGardens')[]
  Style?: (
    | 'terraced'
    | 'endTerrace'
    | 'detached'
    | 'semiDetached'
    | 'linkDetached'
    | 'mews'
    | 'basement'
    | 'lowerGroundFloor'
    | 'groundFloor'
    | 'firstFloor'
    | 'upperFloor'
    | 'upperFloorWithLift'
    | 'penthouse'
  )[]
  Type?: (
    | 'house'
    | 'bungalow'
    | 'flatApartment'
    | 'maisonette'
    | 'land'
    | 'farm'
    | 'cottage'
    | 'studio'
    | 'townhouse'
    | 'developmentPlot'
  )[]
  MarketingMode?: ('buying' | 'renting')[]
}
/**
 * Represents an appointments attendee.
 */
export interface AppointmentAttendeeModel {
  /**
   * The unique identifier of the attendee.
   */
  id?: string
  /**
   * The type of attendee.
   */
  type?: string
  /**
   * The contacts of this attendee.
   */
  contacts?: {
    /**
     * The identifier of the contact.
     */
    id?: string
    /**
     * The name of the contact.
     */
    name?: string
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
  }[]
}
/**
 * Represents an appointments contact.
 */
export interface AppointmentContactModel {
  /**
   * The identifier of the contact.
   */
  id?: string
  /**
   * The name of the contact.
   */
  name?: string
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
}
/**
 * Represents appointment follow up data.
 */
export interface AppointmentFollowUpModel {
  /**
   * The date when the appointment should be followed up on.
   */
  due?: string // date-time
  /**
   * The unique identifier of a pre-defined follow up response type.
   */
  responseId?: string
  /**
   * The internal follow up notes to be stored against the appointment.
   */
  notes?: string
}
/**
 * Represents a calendar appointment.
 */
export interface AppointmentModel {
  /**
   * The appointments unique identifier.
   */
  id?: string
  /**
   * The datetime when the appointment was created.
   */
  created?: string // date-time
  /**
   * The date and time when the appointment was last modified.
   */
  modified?: string // date-time
  /**
   * The date and time when the appointment will start.
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end.
   */
  end?: string // date-time
  /**
   * The type of appointment.
   */
  typeId?: string
  /**
   * The appointment description.
   */
  description?: string
  /**
   * The directions to the appointment location.
   */
  directions?: string
  /**
   * A flag denoting whether or not the appointment recurs.
   */
  recurring?: boolean
  /**
   * A flag denoting whether or not the appointment is cancelled.
   */
  cancelled?: boolean
  /**
   * The appointments follow up information.
   */
  followUp?: {
    /**
     * The date when the appointment should be followed up on.
     */
    due?: string // date-time
    /**
     * The unique identifier of a pre-defined follow up response type.
     */
    responseId?: string
    /**
     * The internal follow up notes to be stored against the appointment.
     */
    notes?: string
  }
  /**
   * The unique identifier of the property related to the appointment.
   */
  propertyId?: string
  /**
   * The identifier of the person that organised the appointment.
   */
  organiserId?: string
  /**
   * A collection of negotiators related to the appointment.
   */
  negotiatorIds?: string[]
  /**
   * A collection of offices related to the appointment.
   */
  officeIds?: string[]
  /**
   * A collection of attendees who are requested to attend the appointment.
   */
  attendee?: {
    /**
     * The unique identifier of the attendee.
     */
    id?: string
    /**
     * The type of attendee.
     */
    type?: string
    /**
     * The contacts of this attendee.
     */
    contacts?: {
      /**
       * The identifier of the contact.
       */
      id?: string
      /**
       * The name of the contact.
       */
      name?: string
      /**
       * The home phone number of the contact
       */
      homePhone?: string
      /**
       * The work phone number of the contact
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
    }[]
  }
  /**
   * A flag denoting whether or not the appointment is accompanied.
   */
  accompanied?: boolean
  /**
   * A flag denoting whether or not the negotiator is confirmed.
   */
  negotiatorConfirmed?: boolean
  /**
   * A flag denoting whether or not the attendee is confirmed.
   */
  attendeeConfirmed?: boolean
  /**
   * A flag denoting whether or not the property is confirmed.
   */
  propertyConfirmed?: boolean
  /**
   * A listing of additional metadata that has been set against this appointment.
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this appointment. Used for managing update concurrency.
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Appointments {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  TypeId?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  PropertyId?: string[]
  Start?: string
  End?: string
  FollowUpDueFrom?: string
  FollowUpDueTo?: string
  IncludeCancelled?: boolean
  IncludeUnconfirmed?: boolean
}
export interface AreaModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the contact was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the contact was last modified
   */
  modified?: string // date-time
  /**
   * Gets the areas name
   */
  name?: string
  /**
   * Gets the areas active flag
   */
  active?: boolean
  /**
   * Gets the areas type (postcodes/polygon/group)
   */
  type?: string
  /**
   * Gets the areas location details (Postcodes, Group names or Lat Longs)
   */
  area?: string[]
  /**
   * Gets the departments linked to this area
   */
  departmentIds?: string[]
  /**
   * Gets the offices linked to this area
   */
  officeIds?: string[]
  /**
   * The ETag for the current version of this area. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Areas {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  DepartmentId?: string[]
  OfficeId?: string[]
  Name?: string
  Active?: boolean
}
export interface Companies {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  Address?: string
  Branch?: string
  Name?: string
  TypeId?: string
  CreatedFrom?: string
  CreatedTo?: string
}
/**
 * Model representing the physical address of a building or premise
 */
export interface CompanyAddressModel {
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
}
/**
 * Model representing the details of a company
 */
export interface CompanyModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the company was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the company was last modified
   */
  modified?: string // date-time
  /**
   * Gets the name of the company
   */
  name?: string
  /**
   * Gets the branch of the company
   */
  branch?: string
  /**
   * Gets the notes stored against the company
   */
  notes?: string
  /**
   * Gets a flag to indicate if this company has been marked as active
   */
  active?: boolean
  /**
   * Gets a flag to indicate if this company is vat registered
   */
  vatRegistered?: boolean
  /**
   * Gets a list of type ids
   */
  typeIds?: string[]
  /**
   * Gets the supplier type id
   */
  supplierTypeId?: string
  /**
   * The work phone number of the company
   */
  workPhone?: string
  /**
   * The mobile phone number of the company
   */
  mobilePhone?: string
  /**
   * The email address of the company
   */
  email?: string
  /**
   * Gets the address for this company
   */
  address?: {
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
  }
  /**
   * Gets a listing of additional metadata that has been set against this company
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this company. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface ConfigurationCompanyTypes {
  Id?: string[]
}
/**
 * Model representing the physical address of a building or premise
 */
export interface ContactAddressModel {
  /**
   * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
  countryId?: string
}
/**
 * Model representing the details of a person
 */
export interface ContactModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the contact was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the contact was last modified
   */
  modified?: string // date-time
  /**
   * Gets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Gets the forename of this contact
   */
  forename?: string
  /**
   * Gets the surname of this contact
   */
  surname?: string
  /**
   * Gets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Gets a flag to indicate if this contact has been marked as active
   */
  active?: boolean
  /**
   * Gets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Gets the status of the last identity check performed against this contact (pass/fail/pending/cancelled/warnings/unchecked)
   */
  identityCheck?: string
  /**
   * Gets the contacts source information
   */
  source?: {
    /**
     * Gets the unique identifier of the contacts source
     */
    id?: string
    /**
     * Gets the contacts source type
     */
    type?: string
  }
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * Gets the contacts primary address
   */
  primaryAddress?: {
    /**
     * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
    countryId?: string
  }
  /**
   * Gets the contacts secondary address
   */
  secondaryAddress?: {
    /**
     * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
    countryId?: string
  }
  /**
   * Gets the contacts work address
   */
  workAddress?: {
    /**
     * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
    countryId?: string
  }
  /**
   * Gets a collection of office ids that are related to this contact
   */
  officeIds?: string[]
  /**
   * Gets a collection of negotiator ids that are related to this contact
   */
  negotiatorIds?: string[]
  /**
   * Gets a listing of additional metadata that has been set against this contact
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this contact. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * Model representing the details of a contacts source
 */
export interface ContactSourceModel {
  /**
   * Gets the unique identifier of the contacts source
   */
  id?: string
  /**
   * Gets the contacts source type
   */
  type?: string
}
export interface Contacts {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  Address?: string
  IdentityCheck?: string
  Name?: string
  Active?: boolean
  CreatedFrom?: string
  CreatedTo?: string
  MarketingConsent?: ('grant' | 'deny' | 'notAsked')[]
}
/**
 * The details specific to applicants with a marketingMode of buying
 */
export interface CreateApplicantBuyingModel {
  /**
   * The lower bound of the applicant's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the applicant's budget
   */
  priceTo?: number // int32
}
/**
 * A relationship between the applicant and a contact
 */
export interface CreateApplicantContactRelationshipModel {
  /**
   * The unique identifier of the contact to create a relationship with
   */
  associatedId?: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType?: string
}
/**
 * The applicant's outdoor space requirements
 */
export interface CreateApplicantExternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (acres/hectares)
   */
  type?: string
  /**
   * The minimum unit value of outside space that the applicant is looking for
   */
  amountFrom?: number // double
  /**
   * The maximum unit value of outside space that the applicant is looking for
   */
  amountTo?: number // double
}
/**
 * The applicant's indoor space requirements
 */
export interface CreateApplicantInternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The unit value of inside space that the applicant is looking for
   */
  amount?: number // double
}
/**
 * Representation of an applicant
 * example:
 * [object Object]
 */
export interface CreateApplicantModel {
  /**
   * Sets the marketing mode relating to the buyer (buying / renting)
   */
  marketingMode?: string
  /**
   * Sets a flag determining whether or not the applicant is actively looking for property
   */
  active?: boolean
  /**
   * Gets the applicant requirement notes
   */
  notes?: string
  /**
   * Sets the date and time that the applicant was last contacted
   */
  lastCall?: string // date-time
  /**
   * Sets the date and time that the applicant is next due to be contacted
   */
  nextCall?: string // date-time
  /**
   * Sets the id of the department that the applicant requirements are associated with
   */
  departmentId?: string
  /**
   * Sets the unique idenfitier of the applicants solicitor
   */
  solicitorId?: string
  /**
   * Sets the property type requirements
   */
  type?: string[]
  /**
   * Sets the property style requirements
   */
  style?: string[]
  /**
   * Sets the property situation requirements
   */
  situation?: string[]
  /**
   * Sets the property parking requirements
   */
  parking?: string[]
  /**
   * Sets the property age requirements
   */
  age?: string[]
  /**
   * Sets the property locality requirements
   */
  locality?: string[]
  /**
   * Sets the minimum number of bedrooms the applicant requires
   */
  bedroomsMin?: number // int32
  /**
   * Sets the maximum number of bedrooms the applicant requires
   */
  bedroomsMax?: number // int32
  /**
   * Sets the minimum number of reception rooms the applicant requires
   */
  receptionsMin?: number // int32
  /**
   * Sets the maximum number of reception rooms the applicant requires
   */
  receptionsMax?: number // int32
  /**
   * Sets the minimum number of bathrooms the applicant requires
   */
  bathroomsMin?: number // int32
  /**
   * Sets the maximum number of bathrooms the applicant requires
   */
  bathroomsMax?: number // int32
  /**
   * Sets the applicants location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * Sets the applicants location options
   */
  locationOptions?: string[]
  /**
   * Sets the sales specific requirements, if the applicant is looking to buy
   */
  buying?: {
    /**
     * The lower bound of the applicant's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the applicant's budget
     */
    priceTo?: number // int32
  }
  /**
   * Sets the letting specific requirements, if the applicant is looking to rent
   */
  renting?: {
    /**
     * The date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * The applicant's preferred letting term (long/short/any)
     */
    term?: string
    /**
     * The lower bound of the applicant's budget
     */
    rentFrom?: number // double
    /**
     * The upper bound of the applicant's budget
     */
    rentTo?: number // double
    /**
     * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * Sets the applicants furnishing requirements
     */
    furnishing?: string[]
  }
  /**
   * Sets the applicant's external area requirements
   */
  externalArea?: {
    /**
     * The unit of area that each amount corresponds to (acres/hectares)
     */
    type?: string
    /**
     * The minimum unit value of outside space that the applicant is looking for
     */
    amountFrom?: number // double
    /**
     * The maximum unit value of outside space that the applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * Sets the applicant's internal area requirements
   */
  internalArea?: {
    /**
     * The unit of area that each amount corresponds to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The unit value of inside space that the applicant is looking for
     */
    amount?: number // double
  }
  /**
   * Sets the applicants source
   */
  source?: {
    /**
     * Sets the unique identifier of the applicants source
     */
    id?: string
    /**
     * Sets the applicants source type
     */
    type?: string
  }
  /**
   * Sets a collection of office ids that are related to this applicant
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this applicant
   */
  negotiatorIds?: string[]
  /**
   * Sets the collection of new or existing contact entities that
   * should be attached to the new applicant
   */
  related?: {
    /**
     * The unique identifier of the contact to create a relationship with
     */
    associatedId?: string
    /**
     * The type of relationship to create (contact/company)
     */
    associatedType?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this applicant as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * The details specific to applicants with a marketingMode of renting
 */
export interface CreateApplicantRentingModel {
  /**
   * The date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * The applicant's preferred letting term (long/short/any)
   */
  term?: string
  /**
   * The lower bound of the applicant's budget
   */
  rentFrom?: number // double
  /**
   * The upper bound of the applicant's budget
   */
  rentTo?: number // double
  /**
   * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Sets the applicants furnishing requirements
   */
  furnishing?: string[]
}
/**
 * Model used for creating a applicants source
 */
export interface CreateApplicantSourceModel {
  /**
   * Sets the unique identifier of the applicants source
   */
  id?: string
  /**
   * Sets the applicants source type
   */
  type?: string
}
/**
 * Represents an appointments attendee.
 */
export interface CreateAppointmentAttendeeModel {
  /**
   * The identifier of the attendee.
   */
  id?: string
  /**
   * The type of attendee.
   */
  type?: string
}
/**
 * Represents a calendar appointment.
 */
export interface CreateAppointmentModel {
  /**
   * The date and time when the appointment will start.
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end.
   */
  end?: string // date-time
  /**
   * The date and time when the appointment should be followed up on.
   */
  followUpOn?: string // date-time
  /**
   * The type of appointment.
   */
  typeId?: string
  /**
   * The appointment description.
   */
  description?: string
  /**
   * The id of the person that organised the appointment.
   */
  organiserId?: string
  /**
   * The negotiator ids to link the appointment too.
   */
  negotiatorIds?: string[]
  /**
   * The office ids to link the appointment too.
   */
  officeIds?: string[]
  /**
   * The details of the attendee of the appointment.
   */
  attendee?: {
    /**
     * The identifier of the attendee.
     */
    id?: string
    /**
     * The type of attendee.
     */
    type?: string
  }
  /**
   * The property identifier that the appointment takes place at.
   */
  propertyId?: string
  /**
   * The flag to specify if the appointment is accompanied.
   */
  accompanied?: boolean
  /**
   * The flag to specify if the negotiator is confirmed.
   */
  negotiatorConfirmed?: boolean
  /**
   * The flag to specify if the attendee is confirmed.
   */
  attendeeConfirmed?: boolean
  /**
   * Sets the flag to specify if the property is confirmed.
   */
  propertyConfirmed?: boolean
  /**
   * The recurrence pattern for this appointment.
   */
  recurrence?: {
    /**
     * The numeric value for often this appointment will recur.
     */
    interval?: number // int32
    /**
     * The type of unit that the interval will apply to.
     */
    type?: string
    /**
     * The date and time when the appointment will continue to recur until.
     */
    until?: string // date-time
  }
  /**
   * A JSON fragment to attach to this appointment as metadata.
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Represents the recurrence details of a new appointment.
 */
export interface CreateAppointmentRecurrenceModel {
  /**
   * The numeric value for often this appointment will recur.
   */
  interval?: number // int32
  /**
   * The type of unit that the interval will apply to.
   */
  type?: string
  /**
   * The date and time when the appointment will continue to recur until.
   */
  until?: string // date-time
}
/**
 * example:
 * [object Object]
 */
export interface CreateAreaModel {
  /**
   * Sets the areas name
   */
  name?: string
  /**
   * Sets the areas type
   */
  type?: string
  /**
   * Sets the areas area information
   */
  area?: string[]
  /**
   * Sets the areas related deparments
   */
  departmentIds?: string[]
  /**
   * Sets the areas related offices
   */
  officeIds?: string[]
  /**
   * Sets the areas parent id
   */
  parentId?: string
}
/**
 * Model to create a company address
 */
export interface CreateCompanyAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to create a company
 * example:
 * [object Object]
 */
export interface CreateCompanyModel {
  /**
   * Sets the companies name
   */
  name?: string
  /**
   * Sets the companies branch
   */
  branch?: string
  /**
   * Sets the companies notes
   */
  notes?: string
  /**
   * Sets the active flag against the company
   */
  active?: boolean
  /**
   * Sets the vat registered flag against the company
   */
  vatRegistered?: boolean
  /**
   * Sets the companies list of type ids
   */
  typeIds?: string[]
  /**
   * Sets the supplier type id
   */
  supplierTypeId?: string
  /**
   * The work phone number of the company
   */
  workPhone?: string
  /**
   * The mobile phone number of the company
   */
  mobilePhone?: string
  /**
   * The email address of the company
   */
  email?: string
  /**
   * Sets the address of the company
   */
  address?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets a JSON fragment to attach to this company as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to create a contact address
 */
export interface CreateContactAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to create a new contact record
 * example:
 * [object Object]
 */
export interface CreateContactModel {
  /**
   * Sets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Sets the forename of this contact
   */
  forename?: string
  /**
   * Sets the surname of this contact
   */
  surname?: string
  /**
   * Sets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Sets a flag to indicate if this contact has been marked as active (default true)
   */
  active?: boolean
  /**
   * Sets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Sets the contacts source
   */
  source?: {
    /**
     * Sets the unique identifier of the contacts source
     */
    id?: string
    /**
     * Sets the contacts source type
     */
    type?: string
  }
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * Sets a collection of office ids that are related to this contact
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this contact
   */
  negotiatorIds?: string[]
  /**
   * Sets the contacts primary address
   */
  primaryAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets the contacts secondary address
   */
  secondaryAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets the contacts work address
   */
  workAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model used for creating a contacts source
 */
export interface CreateContactSourceModel {
  /**
   * Sets the unique identifier of the contacts source
   */
  id?: string
  /**
   * Sets the contacts source type
   */
  type?: string
}
/**
 * Model used for creating a new document
 * example:
 * [object Object]
 */
export interface CreateDocumentModel {
  /**
   * Sets the type of entity that this document is associated with
   */
  associatedType?: string
  /**
   * Sets the Id of the entity that this document is associated with
   */
  associatedId?: string
  /**
   * Sets the Id of the document type
   */
  typeId?: string
  /**
   * Sets the filename assigned to the document
   */
  name?: string
  /**
   * Sets the base64 binary content of the file
   */
  fileData?: string
}
/**
 * Model to create an identity check
 * example:
 * [object Object]
 */
export interface CreateIdentityCheckModel {
  /**
   * Sets the id of the contact to create the identity check against
   */
  contactId?: string
  /**
   * Sets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Sets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Sets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Sets the details of document one that have been provided for this identity check
   */
  identityDocument1?: {
    /**
     * Sets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Sets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Sets the textual details of the identity document (eg. passport number)
     */
    details?: string
    /**
     * Sets the base64 binary content of the file
     */
    fileData?: string
    /**
     * Sets the filename assigned to the document
     */
    name?: string
  }
  /**
   * Sets the details of document two that have been provided for this identity check
   */
  identityDocument2?: {
    /**
     * Sets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Sets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Sets the textual details of the identity document (eg. passport number)
     */
    details?: string
    /**
     * Sets the base64 binary content of the file
     */
    fileData?: string
    /**
     * Sets the filename assigned to the document
     */
    name?: string
  }
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to create an identity check document
 */
export interface CreateIdentityDocumentModel {
  /**
   * Sets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Sets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Sets the textual details of the identity document (eg. passport number)
   */
  details?: string
  /**
   * Sets the base64 binary content of the file
   */
  fileData?: string
  /**
   * Sets the filename assigned to the document
   */
  name?: string
}
/**
 * A model used to create a new relationship between a landlord and an existing contact
 */
export interface CreateLandlordContactRelationshipModel {
  /**
   * Sets the entity id to create a relationship with. (Contact or Company)
   */
  associatedId?: string
  /**
   * Sets the entity type to create a relationship with. (Contact or Company)
   */
  associatedType?: string
}
/**
 * Request body to create a landlord
 */
export interface CreateLandlordModel {
  /**
   * Sets the active flag against this landlord
   */
  active?: boolean
  /**
   * Sets the unique idenfitier of the landlords solicitor
   */
  solicitorId?: string
  /**
   * Sets the office id that is associated to this landlord
   */
  officeId?: string
  /**
   * Sets the landlords source
   */
  source?: {
    /**
     * Sets the unique identifier of the landlords source
     */
    id?: string
    /**
     * Sets the landlords source type
     */
    type?: string
  }
  /**
   * Sets the collection of new or existing contact entities the
   * should be attached to the new landlord
   */
  related?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    associatedId?: string
    /**
     * Sets the entity type to create a relationship with. (Contact or Company)
     */
    associatedType?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this landlord as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model used for creating a landlords source
 */
export interface CreateLandlordSourceModel {
  /**
   * Sets the unique identifier of the landlords source
   */
  id?: string
  /**
   * Sets the landlords source type
   */
  type?: string
}
/**
 * Request body used to create a new negotiator
 * example:
 * [object Object]
 */
export interface CreateNegotiatorModel {
  /**
   * The unique identifier of the negotiator
   */
  id?: string
  /**
   * The name of the negotiator
   */
  name?: string
  /**
   * The job title of the negotiator
   */
  jobTitle?: string
  /**
   * Flag denoting whether or not the negotiator is active
   */
  active?: boolean
  /**
   * The unique identifier of the office that the negotiator is attached to
   */
  officeId?: string
  /**
   * The work phone number of the negotiator
   */
  workPhone?: string
  /**
   * The mobile phone number of the negotiator
   */
  mobilePhone?: string
  /**
   * The email address of the negotiator
   */
  email?: string
  /**
   * App specific metadata to set against the negotiator
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to create an offer
 * example:
 * [object Object]
 */
export interface CreateOfferModel {
  /**
   * Sets the id of the applicant associated to the offer
   */
  applicantId?: string
  /**
   * Sets the id of the property associated to the offer
   */
  propertyId?: string
  /**
   * Sets the id of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * Sets the date the offer was made
   */
  date?: string // date-time
  /**
   * Sets the amount the offer was for
   */
  amount?: number // double
  /**
   * Sets the status of the offer
   */
  status?: string
  /**
   * Sets the requested inclusions of the offer
   */
  inclusions?: string
  /**
   * Sets the requested exclusions of the offer
   */
  exclusions?: string
  /**
   * Sets the conditions of the offer
   */
  conditions?: string
  /**
   * Sets a JSON fragment to attach to this offer as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the address of a new office
 */
export interface CreateOfficeAddressModel {
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
 * Request body used to create a new office
 */
export interface CreateOfficeModel {
  /**
   * The unique identifier of the office
   */
  id?: string
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: {
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
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata to set against the office
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the address of a new property
 */
export interface CreatePropertyAddressModel {
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
  /**
   * The geolocation coordinates associated with the address
   */
  geolocation?: {
    /**
     * The latitude coordinate of the coordinate pair
     */
    latitude?: number // double
    /**
     * The longitude coordinate of the coordinate pair
     */
    longitude?: number // double
  }
}
/**
 * Request body used to set the EPC statistic of a new property
 */
export interface CreatePropertyEpcModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring an EPC certificate
   */
  exempt?: boolean
  /**
   * The current energy efficiency rating
   */
  eer?: number // int32
  /**
   * The potential energy efficiency rating
   */
  eerPotential?: number // int32
  /**
   * The current environmental impact rating
   */
  eir?: number // int32
  /**
   * The potential environmental impact rating
   */
  eirPotential?: number // int32
}
/**
 * Request body to set the external land area of a new property
 */
export interface CreatePropertyExternalAreaModel {
  /**
   * The unit of area (acres/hectares)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Request body used to set the geolocation coordinates of a new property's address
 */
export interface CreatePropertyGeolocationModel {
  /**
   * The latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * The longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
/**
 * Request body used to create a new property image
 * example:
 * [object Object]
 */
export interface CreatePropertyImageModel {
  /**
   * The base64 binary content of the file, including mime type
   */
  data?: string
  /**
   * The unique identifier of the property attached to the image
   */
  propertyId?: string
  /**
   * The image caption
   */
  caption?: string
  /**
   * The type of image (picture/floorPlan/epc/map)
   */
  type?: string
}
/**
 * Request body to set the internal dimensions of a new property
 */
export interface CreatePropertyInternalAreaModel {
  /**
   * The unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Request body used to set details specific to lettings marketing on a new property
 */
export interface CreatePropertyLettingModel {
  /**
   * The date the property was marked as to let
   */
  instructed?: string // date-time
  /**
   * The date the property is available from
   */
  availableFrom?: string // date-time
  /**
   * The date the property is available to
   */
  availableTo?: string // date-time
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * The acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
}
/**
 * Request body used to create a new property
 */
export interface CreatePropertyModel {
  /**
   * The marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode?: string
  /**
   * The unique identifier of the department
   */
  departmentId?: string
  /**
   * The strapline description containing a short summary about the property
   */
  strapline?: string
  /**
   * The brief description of the property
   */
  description?: string
  /**
   * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
   */
  summary?: string
  /**
   * The address of the property
   */
  address?: {
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
    /**
     * The geolocation coordinates associated with the address
     */
    geolocation?: {
      /**
       * The latitude coordinate of the coordinate pair
       */
      latitude?: number // double
      /**
       * The longitude coordinate of the coordinate pair
       */
      longitude?: number // double
    }
  }
  /**
   * The total number of bedrooms in the property
   */
  bedrooms?: number // int32
  /**
   * The total number of reception rooms in the property
   */
  receptions?: number // int32
  /**
   * The total number of bathrooms in the property
   */
  bathrooms?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * A flag denoting whether or not this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * The arrangements regarding viewing the property
   */
  viewingArrangements?: string
  /**
   * Details of the EPC statistics
   */
  epc?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring an EPC certificate
     */
    exempt?: boolean
    /**
     * The current energy efficiency rating
     */
    eer?: number // int32
    /**
     * The potential energy efficiency rating
     */
    eerPotential?: number // int32
    /**
     * The current environmental impact rating
     */
    eir?: number // int32
    /**
     * The potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Details of the external land area associated to this property
   */
  externalArea?: {
    /**
     * The unit of area (acres/hectares)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * The unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Selling specific details about the property
   */
  selling?: {
    /**
     * The date that the property was marked as for sale
     */
    instructed?: string // date-time
    /**
     * The marketing price of the property
     */
    price?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Details about the tenure of the property
     */
    tenure?: {
      /**
       * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
       */
      type?: string
      /**
       * The tenure expiration date
       */
      expiry?: string // date-time
    }
  }
  /**
   * Letting specific details about the property
   */
  letting?: {
    /**
     * The date the property was marked as to let
     */
    instructed?: string // date-time
    /**
     * The date the property is available from
     */
    availableFrom?: string // date-time
    /**
     * The date the property is available to
     */
    availableTo?: string // date-time
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * The acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
  }
  /**
   * The property type attributes
   */
  type?: string[]
  /**
   * The property style attributes
   */
  style?: string[]
  /**
   * The property situation attributes
   */
  situation?: string[]
  /**
   * The property parking attributes
   */
  parking?: string[]
  /**
   * The property age attributes
   */
  age?: string[]
  /**
   * The property locality attributes
   */
  locality?: string[]
  /**
   * Details of each room in the property
   */
  rooms?: {
    /**
     * The name of the room
     */
    name?: string
    /**
     * Details about the dimensions of the room
     */
    dimensions?: string
    /**
     * Short description of the room
     */
    description?: string
  }[]
  /**
   * The unique identifier of the negotiator managing the property
   */
  negotiatorId?: string
  /**
   * A collection of unique identifiers of offices attached to the property
   */
  officeIds?: string[]
  /**
   * The unique identifier of the area that the property resides in
   */
  areaId?: string
  /**
   * App specific metadata to set against the property
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body to create a room in the Rooms collection of a new property
 */
export interface CreatePropertyRoomModel {
  /**
   * The name of the room
   */
  name?: string
  /**
   * Details about the dimensions of the room
   */
  dimensions?: string
  /**
   * Short description of the room
   */
  description?: string
}
/**
 * Request body used to set details specific to sales marketing on a new property
 */
export interface CreatePropertySellingModel {
  /**
   * The date that the property was marked as for sale
   */
  instructed?: string // date-time
  /**
   * The marketing price of the property
   */
  price?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Details about the tenure of the property
   */
  tenure?: {
    /**
     * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
     */
    type?: string
    /**
     * The tenure expiration date
     */
    expiry?: string // date-time
  }
}
/**
 * Request body used to set the tenure of a new property
 */
export interface CreatePropertyTenureModel {
  /**
   * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
   */
  type?: string
  /**
   * The tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Request body used to create a new source of business
 * example:
 * [object Object]
 */
export interface CreateSourceModel {
  /**
   * The name of the source or advertising publication
   */
  name?: string
  /**
   * The type of the source (source/advertisement)
   */
  type?: string
  /**
   * A collection of the unique identifiers of offices that regularly get business from the source
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of departments that regularly get business from the source
   */
  departmentIds?: string[]
}
/**
 * Representation of a task, which can also be an internal message
 * example:
 * [object Object]
 */
export interface CreateTaskModel {
  /**
   * The date the task becomes active
   */
  activates?: string // date-time
  /**
   * The date the task was completed
   */
  completed?: string // date-time
  /**
   * The unique identifier of the task type
   */
  typeId?: string
  /**
   * The unique identifer of the negotiator that created the task
   */
  senderId?: string
  /**
   * The textual contents of the task or message
   */
  text?: string
  /**
   * The unique identifier of the landlord the task is associated to
   */
  landlordId?: string
  /**
   * The unique identifier of the property the task is associated to
   */
  propertyId?: string
  /**
   * The unique identifier of the applicant the task is associated to
   */
  applicantId?: string
  /**
   * The unique identifier of the tenancy the task is associated to
   */
  tenancyId?: string
  /**
   * The unique identifier of the contact the task is associated to
   */
  contactId?: string
  /**
   * The unique identifier of the negotiator or office the task is being sent to
   */
  recipientId?: string
  /**
   * The type of the recipient (office/negotiator)
   */
  recipientType?: string
  /**
   * App specific metadata that has been set against the task
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model representing a department
 */
export interface DepartmentModel {
  /**
   * Gets the unique department identifier
   */
  id?: string
  /**
   * Gets the date and time the department was created
   */
  created?: string // date-time
  /**
   * Gets the date and time the department was last modified
   */
  modified?: string // date-time
  /**
   * Gets the name of the department
   */
  name?: string
  /**
   * Gets a list of property type values that will be accepted by other services
   */
  typeOptions?: string[]
  /**
   * Gets a list of property style values that will be accepted by other services
   */
  styleOptions?: string[]
  /**
   * Gets a list of property situation values that will be accepted by other services
   */
  situationOptions?: string[]
  /**
   * Gets a list of property parking values that will be accepted by other services
   */
  parkingOptions?: string[]
  /**
   * Gets a list of property age values that will be accepted by other services
   */
  ageOptions?: string[]
  /**
   * Gets a list of property locality values that will be accepted by other services
   */
  localityOptions?: string[]
  /**
   * The ETag for the current version of this department. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Departments {
  Id?: string[]
  Name?: string
  PageNumber?: number
  PageSize?: number
}
/**
 * Model representing a Document
 */
export interface DocumentModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the datetime when the document was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the document was last modified
   */
  modified?: string // date-time
  /**
   * Gets the type of entity that this document is associated with
   */
  associatedType?: string
  /**
   * Gets the Id of the entity that this document is associated with
   */
  associatedId?: string
  /**
   * Gets the Id of the document type
   */
  typeId?: string
  /**
   * Gets the filename assigned to the document
   */
  name?: string
  /**
   * The ETag for the current version of this contact. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Documents {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  AssociatedId?: string[]
  TypeId?: string[]
  AssociatedType?: (
    | 'appliance'
    | 'applicant'
    | 'bankStatement'
    | 'batch'
    | 'certificate'
    | 'contact'
    | 'depositCertificate'
    | 'estate'
    | 'estateUnit'
    | 'idCheck'
    | 'keySet'
    | 'landlord'
    | 'nominalTransaction'
    | 'property'
    | 'tenancy'
    | 'tenancyCheck'
    | 'tenancyRenewal'
    | 'worksOrder'
  )[]
}
export interface EntityTagHeaderValue {
  readonly tag?: {
    readonly buffer?: string
    readonly offset?: number // int32
    readonly length?: number // int32
    readonly value?: string
    readonly hasValue?: boolean
  }
  readonly isWeak?: boolean
}
export interface FileResult {
  readonly contentType?: string
  fileDownloadName?: string
  lastModified?: string // date-time
  entityTag?: {
    readonly tag?: {
      readonly buffer?: string
      readonly offset?: number // int32
      readonly length?: number // int32
      readonly value?: string
      readonly hasValue?: boolean
    }
    readonly isWeak?: boolean
  }
  enableRangeProcessing?: boolean
}
/**
 * Represents an attempt to verify an individual contacts identity
 */
export interface IdentityCheckModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the unique identifier of the contact associated to the id check
   */
  contactId?: string
  /**
   * Gets the date and time that the identity check was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the identity check was last modified
   */
  modified?: string // date-time
  /**
   * Gets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Gets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Gets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Gets the details of document one that has been provided for this identity check
   */
  identityDocument1?: {
    /**
     * Gets the unique identifier of the document
     */
    documentId?: string
    /**
     * Gets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Gets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Gets the textual details of the identity document (eg. passport number)
     */
    details?: string
  }
  /**
   * Gets the details of document two that has been provided for this identity check
   */
  identityDocument2?: {
    /**
     * Gets the unique identifier of the document
     */
    documentId?: string
    /**
     * Gets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Gets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Gets the textual details of the identity document (eg. passport number)
     */
    details?: string
  }
  /**
   * Gets a listing of additional metadata that has been set against this identity check
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this identity check. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface IdentityChecks {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  ContactId?: string[]
  NegotiatorId?: string[]
  Status?: string[]
  CheckDateTo?: string
  CheckDateFrom?: string
  CreatedTo?: string
  CreatedFrom?: string
  pageNumber?: number
  pageSize?: number
}
/**
 * Represents the details of a document added to an identity check
 */
export interface IdentityDocumentModel {
  /**
   * Gets the unique identifier of the document
   */
  documentId?: string
  /**
   * Gets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Gets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Gets the textual details of the identity document (eg. passport number)
   */
  details?: string
}
/**
 * Create (OR update) a relationship between the applicant and a contact
 * example:
 * [object Object]
 */
export interface InsertApplicantContactRelationshipModel {
  /**
   * The unique identifier of the contact to create a relationship with
   */
  associatedId?: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType?: string
  /**
   * Flag denoting whether or not this relationship should be considered to be the main/primary relationship. Setting to true will automatically demote the existing primary relationship
   */
  isMain?: boolean
}
/**
 * Create (OR update) a relationship between the landlord and a contact
 */
export interface InsertLandlordContactRelationshipModel {
  /**
   * The unique identifier of the contact to create a relationship with
   */
  associatedId?: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType?: string
  /**
   * Flag denoting whether or not this relationship should be considered to be the main/primary relationship. Setting to true will automatically demote the existing primary relationship
   */
  isMain?: boolean
}
/**
 * Request body used to create or edit a relationship between the vendor and a contact
 */
export interface InsertVendorContactRelationshipModel {
  /**
   * The unique identifier of the contact to create a relationship with
   */
  associatedId?: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType?: string
  /**
   * Flag denoting whether or not this relationship should be considered to be the main/primary relationship. Setting to true will automatically demote the existing primary relationship
   */
  isMain?: boolean
}
/**
 * Model representing the physical address of a building or premise
 */
export interface LandlordContactAddressModel {
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
  countryId?: string
}
/**
 * Model representing the details of a contact relationship associated with a landlord entity
 */
export interface LandlordContactModel {
  /**
   * Gets the unique identifier of the contact
   */
  id?: string
  /**
   * Gets the name of this contact or company
   */
  name?: string
  /**
   * Gets the type of this contact (Contact/Company)
   */
  type?: string
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * Gets the primary address of the contact
   */
  primaryAddress?: {
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
    countryId?: string
  }
}
export interface LandlordModel {
  id?: string
  /**
   * Gets the datetime when the landlord was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the landlord was last modified
   */
  modified?: string // date-time
  /**
   * Gets the active flag
   */
  active?: boolean
  /**
   * Gets the unique identifier of the landlords solicitor
   */
  solicitorId?: string
  /**
   * Gets the office id that is associated to this landlord
   */
  officeId?: string
  /**
   * Gets the landlords source information
   */
  source?: {
    /**
     * Gets the unique identifier of the landlords source
     */
    id?: string
    /**
     * Gets the landlords source type
     */
    type?: string
  }
  /**
   * Gets a collection of contact entities attached to this landlord
   * The primary contact will always appear first in the collection
   */
  related?: {
    /**
     * Gets the unique identifier of the contact
     */
    id?: string
    /**
     * Gets the name of this contact or company
     */
    name?: string
    /**
     * Gets the type of this contact (Contact/Company)
     */
    type?: string
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
    /**
     * Gets the primary address of the contact
     */
    primaryAddress?: {
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
      countryId?: string
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this landlord
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this landlord. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * Model representing the details of a landlords source
 */
export interface LandlordSourceModel {
  /**
   * Gets the unique identifier of the landlords source
   */
  id?: string
  /**
   * Gets the landlords source type
   */
  type?: string
}
export interface Landlords {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  Active?: boolean
  Address?: string
  Name?: string
  CreatedFrom?: string
  CreatedTo?: string
}
export interface LinkModel {
  href?: string
}
export interface ListItemModel {
  /**
   * The unique identifier
   */
  id?: string
  /**
   * The text value corresponding to the id
   */
  value?: string
}
/**
 * Representation of a negotiator
 */
export interface NegotiatorModel {
  /**
   * The unique identifier of the negotiator
   */
  id?: string
  /**
   * The date and time when the negotiator was created
   */
  created?: string // date-time
  /**
   * The date and time when the negotiator was last modified
   */
  modified?: string // date-time
  /**
   * The name of the negotiator
   */
  name?: string
  /**
   * The job title of the negotiator
   */
  jobTitle?: string
  /**
   * Flag denoting whether or not the negotiator is active
   */
  active?: boolean
  /**
   * The unique identifier of the office that the negotiator is attached to
   */
  officeId?: string
  /**
   * The work phone number of the negotiator
   */
  workPhone?: string
  /**
   * The mobile phone number of the negotiator
   */
  mobilePhone?: string
  /**
   * The email address of the negotiator
   */
  email?: string
  /**
   * App specific metadata to set against the negotiator
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the negotiator. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Negotiators {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  OfficeId?: string[]
  Name?: string
}
/**
 * Model representing the physical address of a building or premise
 */
export interface OfferContactAddressModel {
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
  countryId?: string
}
/**
 * Model representing the details of a contact relationship associated with an offer entity
 */
export interface OfferContactModel {
  /**
   * Gets the unique identifier of the contact
   */
  id?: string
  /**
   * Gets the name of this contact or company
   */
  name?: string
  /**
   * Gets the type of this contact (contact/company)
   */
  type?: string
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * Gets the primary address of the contact
   */
  primaryAddress?: {
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
    countryId?: string
  }
}
/**
 * Model to retrieve offer details
 */
export interface OfferModel {
  /**
   * Gets the unique identifier of the offer
   */
  id?: string
  /**
   * Gets the date the offer was created
   */
  created?: string // date-time
  /**
   * Gets the date the offer was last modified
   */
  modified?: string // date-time
  /**
   * Gets the currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * Gets the id of the applicant associated to the offer
   */
  applicantId?: string
  /**
   * Gets the id of the property associated to the offer
   */
  propertyId?: string
  /**
   * Gets the id of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * Gets the date the offer was made
   */
  date?: string // date-time
  /**
   * Gets the amount the offer was for
   */
  amount?: number // double
  /**
   * Gets the status of the offer
   */
  status?: string
  /**
   * Gets the requested inclusions of the offer
   */
  inclusions?: string
  /**
   * Gets the requested exclusions of the offer
   */
  exclusions?: string
  /**
   * Gets the conditions of the offer
   */
  conditions?: string
  /**
   * Gets a collection of contact entities attached to this offer
   * The primary contact will always appear first in the collection
   */
  related?: {
    /**
     * Gets the unique identifier of the contact
     */
    id?: string
    /**
     * Gets the name of this contact or company
     */
    name?: string
    /**
     * Gets the type of this contact (contact/company)
     */
    type?: string
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
    /**
     * Gets the primary address of the contact
     */
    primaryAddress?: {
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
      countryId?: string
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this offer
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of this offer. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Offers {
  PageNumber?: number
  PageSize?: number
  SortBy?: string
  Id?: string[]
  ApplicantId?: string[]
  PropertyId?: string[]
  Address?: string
  Name?: string
  AmountFrom?: number
  AmountTo?: number
  DateFrom?: string
  DateTo?: string
  Status?: ('pending' | 'withdrawn' | 'rejected' | 'accepted' | 'noteOfInterest' | 'noteOfInterestWithdrawn')[]
}
/**
 * Representation of the physical address of a building or premise
 */
export interface OfficeAddressModel {
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
 * Representation of an office
 */
export interface OfficeModel {
  /**
   * The unique identifier of the office
   */
  id?: string
  /**
   * The date and time when the office was created
   */
  created?: string // date-time
  /**
   * The date and time when the office was last modified
   */
  modified?: string // date-time
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: {
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
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata that has been set against the office
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the office. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Offices {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  Address?: string
  Name?: string
}
export interface PagedResultApplicantModel_ {
  _embedded?: {
    /**
     * The unique identifier of the applicant
     */
    id?: string
    /**
     * The date and time when the applicant was created
     */
    created?: string // date-time
    /**
     * The date and time when the applicant was last modified
     */
    modified?: string // date-time
    /**
     * Indicates whether the applicant is look to buy or rent a property (buying/renting)
     */
    marketingMode?: string
    /**
     * The ISO-4217 currency code that relates to monetary amounts specified by this applicant
     */
    currency?: string
    /**
     * A flag determining whether or not the applicant is actively looking for a property
     */
    active?: boolean
    /**
     * A free text field describing any adhoc buying or renting requirements
     */
    notes?: string
    /**
     * The date when the applicant was last contacted
     */
    lastCall?: string // date-time
    /**
     * The date when the applicant is next due to be contacted
     */
    nextCall?: string // date-time
    /**
     * The unique identifier of the department that the applicant requirements are associated with. This applicant will only match to properties with the same value
     */
    departmentId?: string
    /**
     * The unique identifier of the solicitor associated to this applicant
     */
    solicitorId?: string
    /**
     * A list of property type requirements taken from the full listing of the associated department
     */
    type?: string[]
    /**
     * A list of property style requirements taken from the full listing of the associated department
     */
    style?: string[]
    /**
     * A list of property situation requirements taken from the full listing of the associated department
     */
    situation?: string[]
    /**
     * A list of property parking requirements taken from the full listing of the associated department
     */
    parking?: string[]
    /**
     * A list of property age requirements taken from the full listing of the associated department
     */
    age?: string[]
    /**
     * A list of property locality requirements taken from the full listing of the associated department
     */
    locality?: string[]
    /**
     * The minimum number of bedrooms the applicant requires
     */
    bedroomsMin?: number // int32
    /**
     * The maximum number of bedrooms the applicant requires
     */
    bedroomsMax?: number // int32
    /**
     * The minimum number of reception rooms the applicant requires
     */
    receptionsMin?: number // int32
    /**
     * The maximum number of reception rooms the applicant requires
     */
    receptionsMax?: number // int32
    /**
     * The minimum number of bathrooms the applicant requires
     */
    bathroomsMin?: number // int32
    /**
     * The maximum number of bathrooms the applicant requires
     */
    bathroomsMax?: number // int32
    /**
     * The applicants location type (areas/addresses/none)
     */
    locationType?: string
    /**
     * The applicants location options
     */
    locationOptions?: string[]
    /**
     * The details specific to applicants with a marketingMode of buying
     */
    buying?: {
      /**
       * The lower bound of the applicant's budget
       */
      priceFrom?: number // int32
      /**
       * The upper bound of the applicant's budget
       */
      priceTo?: number // int32
    }
    /**
     * The details specific to applicants with a marketingMode of renting
     */
    renting?: {
      /**
       * The date the applicant is looking to move to a new property
       */
      moveDate?: string // date-time
      /**
       * The applicant's preferred letting term (long/short/any)
       */
      term?: string
      /**
       * The lower bound of the applicant's budget
       */
      rentFrom?: number // double
      /**
       * The upper bound of the applicant's budget
       */
      rentTo?: number // double
      /**
       * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
       */
      rentFrequency?: string
      /**
       * A list of property furnishing requirements taken from the full listing of the associated department. Only applicable to applicants with a marketingMode of renting
       */
      furnishing?: string[]
    }
    /**
     * The applicant's outdoor space requirements
     */
    externalArea?: {
      /**
       * The unit of area that each amount corresponds to (acres/hectares)
       */
      type?: string
      /**
       * The minimum unit value of outside space that the applicant is looking for
       */
      amountFrom?: number // double
      /**
       * The maximum unit value of outside space that the applicant is looking for
       */
      amountTo?: number // double
    }
    /**
     * The applicant's indoor space requirements
     */
    internalArea?: {
      /**
       * The unit of area that each amount corresponds to (squareFeet/squareMetres)
       */
      type?: string
      /**
       * The unit value of inside space that the applicant is looking for
       */
      amount?: number // double
    }
    /**
     * Gets the applicants source information
     */
    source?: {
      /**
       * Gets the unique identifier of the applicants source
       */
      id?: string
      /**
       * Gets the applicants source type
       */
      type?: string
    }
    /**
     * A collection of office unique identifiers that are associated to the applicant. The first identifier listed is considered to be the primary office
     */
    officeIds?: string[]
    /**
     * A collection of negotiator unique identifiers that are associated to the applicant. The first identifier listed is considered to be the primary negotiator
     */
    negotiatorIds?: string[]
    /**
     * A collection of summarised contacts attached to the applicant. The first contact listed is considered to be the primary contact
     */
    related?: {
      /**
       * The unique identifier of the contact
       */
      id?: string
      /**
       * The name of the contact
       */
      name?: string
      /**
       * The type of the contact (company/contact)
       */
      type?: string
      /**
       * The home phone number of the contact
       */
      homePhone?: string
      /**
       * The work phone number of the contact
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
      /**
       * The primary address of the contact
       */
      primaryAddress?: {
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
    }[]
    /**
     * A listing of app specific metadata that has been set against this applicant
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this applicant. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultAppointmentModel_ {
  _embedded?: {
    /**
     * The appointments unique identifier.
     */
    id?: string
    /**
     * The datetime when the appointment was created.
     */
    created?: string // date-time
    /**
     * The date and time when the appointment was last modified.
     */
    modified?: string // date-time
    /**
     * The date and time when the appointment will start.
     */
    start?: string // date-time
    /**
     * The date and time when the appointment will end.
     */
    end?: string // date-time
    /**
     * The type of appointment.
     */
    typeId?: string
    /**
     * The appointment description.
     */
    description?: string
    /**
     * The directions to the appointment location.
     */
    directions?: string
    /**
     * A flag denoting whether or not the appointment recurs.
     */
    recurring?: boolean
    /**
     * A flag denoting whether or not the appointment is cancelled.
     */
    cancelled?: boolean
    /**
     * The appointments follow up information.
     */
    followUp?: {
      /**
       * The date when the appointment should be followed up on.
       */
      due?: string // date-time
      /**
       * The unique identifier of a pre-defined follow up response type.
       */
      responseId?: string
      /**
       * The internal follow up notes to be stored against the appointment.
       */
      notes?: string
    }
    /**
     * The unique identifier of the property related to the appointment.
     */
    propertyId?: string
    /**
     * The identifier of the person that organised the appointment.
     */
    organiserId?: string
    /**
     * A collection of negotiators related to the appointment.
     */
    negotiatorIds?: string[]
    /**
     * A collection of offices related to the appointment.
     */
    officeIds?: string[]
    /**
     * A collection of attendees who are requested to attend the appointment.
     */
    attendee?: {
      /**
       * The unique identifier of the attendee.
       */
      id?: string
      /**
       * The type of attendee.
       */
      type?: string
      /**
       * The contacts of this attendee.
       */
      contacts?: {
        /**
         * The identifier of the contact.
         */
        id?: string
        /**
         * The name of the contact.
         */
        name?: string
        /**
         * The home phone number of the contact
         */
        homePhone?: string
        /**
         * The work phone number of the contact
         */
        workPhone?: string
        /**
         * The mobile phone number of the contact
         */
        mobilePhone?: string
        /**
         * The email address of the contact
         */
        email?: string
      }[]
    }
    /**
     * A flag denoting whether or not the appointment is accompanied.
     */
    accompanied?: boolean
    /**
     * A flag denoting whether or not the negotiator is confirmed.
     */
    negotiatorConfirmed?: boolean
    /**
     * A flag denoting whether or not the attendee is confirmed.
     */
    attendeeConfirmed?: boolean
    /**
     * A flag denoting whether or not the property is confirmed.
     */
    propertyConfirmed?: boolean
    /**
     * A listing of additional metadata that has been set against this appointment.
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this appointment. Used for managing update concurrency.
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultAreaModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the date and time that the contact was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the contact was last modified
     */
    modified?: string // date-time
    /**
     * Gets the areas name
     */
    name?: string
    /**
     * Gets the areas active flag
     */
    active?: boolean
    /**
     * Gets the areas type (postcodes/polygon/group)
     */
    type?: string
    /**
     * Gets the areas location details (Postcodes, Group names or Lat Longs)
     */
    area?: string[]
    /**
     * Gets the departments linked to this area
     */
    departmentIds?: string[]
    /**
     * Gets the offices linked to this area
     */
    officeIds?: string[]
    /**
     * The ETag for the current version of this area. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultCompanyModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the date and time that the company was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the company was last modified
     */
    modified?: string // date-time
    /**
     * Gets the name of the company
     */
    name?: string
    /**
     * Gets the branch of the company
     */
    branch?: string
    /**
     * Gets the notes stored against the company
     */
    notes?: string
    /**
     * Gets a flag to indicate if this company has been marked as active
     */
    active?: boolean
    /**
     * Gets a flag to indicate if this company is vat registered
     */
    vatRegistered?: boolean
    /**
     * Gets a list of type ids
     */
    typeIds?: string[]
    /**
     * Gets the supplier type id
     */
    supplierTypeId?: string
    /**
     * The work phone number of the company
     */
    workPhone?: string
    /**
     * The mobile phone number of the company
     */
    mobilePhone?: string
    /**
     * The email address of the company
     */
    email?: string
    /**
     * Gets the address for this company
     */
    address?: {
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
    }
    /**
     * Gets a listing of additional metadata that has been set against this company
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this company. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultContactModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the date and time that the contact was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the contact was last modified
     */
    modified?: string // date-time
    /**
     * Gets the title of this contact (eg. Mr, Mrs, Miss, Dr)
     */
    title?: string
    /**
     * Gets the forename of this contact
     */
    forename?: string
    /**
     * Gets the surname of this contact
     */
    surname?: string
    /**
     * Gets the date of birth of this contact
     */
    dateOfBirth?: string // date-time
    /**
     * Gets a flag to indicate if this contact has been marked as active
     */
    active?: boolean
    /**
     * Gets the marketing consent status of this contact (grant/deny/notAsked)
     */
    marketingConsent?: string
    /**
     * Gets the status of the last identity check performed against this contact (pass/fail/pending/cancelled/warnings/unchecked)
     */
    identityCheck?: string
    /**
     * Gets the contacts source information
     */
    source?: {
      /**
       * Gets the unique identifier of the contacts source
       */
      id?: string
      /**
       * Gets the contacts source type
       */
      type?: string
    }
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
    /**
     * Gets the contacts primary address
     */
    primaryAddress?: {
      /**
       * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
      countryId?: string
    }
    /**
     * Gets the contacts secondary address
     */
    secondaryAddress?: {
      /**
       * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
      countryId?: string
    }
    /**
     * Gets the contacts work address
     */
    workAddress?: {
      /**
       * Gets the type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
      countryId?: string
    }
    /**
     * Gets a collection of office ids that are related to this contact
     */
    officeIds?: string[]
    /**
     * Gets a collection of negotiator ids that are related to this contact
     */
    negotiatorIds?: string[]
    /**
     * Gets a listing of additional metadata that has been set against this contact
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this contact. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultDepartmentModel_ {
  _embedded?: {
    /**
     * Gets the unique department identifier
     */
    id?: string
    /**
     * Gets the date and time the department was created
     */
    created?: string // date-time
    /**
     * Gets the date and time the department was last modified
     */
    modified?: string // date-time
    /**
     * Gets the name of the department
     */
    name?: string
    /**
     * Gets a list of property type values that will be accepted by other services
     */
    typeOptions?: string[]
    /**
     * Gets a list of property style values that will be accepted by other services
     */
    styleOptions?: string[]
    /**
     * Gets a list of property situation values that will be accepted by other services
     */
    situationOptions?: string[]
    /**
     * Gets a list of property parking values that will be accepted by other services
     */
    parkingOptions?: string[]
    /**
     * Gets a list of property age values that will be accepted by other services
     */
    ageOptions?: string[]
    /**
     * Gets a list of property locality values that will be accepted by other services
     */
    localityOptions?: string[]
    /**
     * The ETag for the current version of this department. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultDocumentModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the datetime when the document was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the document was last modified
     */
    modified?: string // date-time
    /**
     * Gets the type of entity that this document is associated with
     */
    associatedType?: string
    /**
     * Gets the Id of the entity that this document is associated with
     */
    associatedId?: string
    /**
     * Gets the Id of the document type
     */
    typeId?: string
    /**
     * Gets the filename assigned to the document
     */
    name?: string
    /**
     * The ETag for the current version of this contact. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultIdentityCheckModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the unique identifier of the contact associated to the id check
     */
    contactId?: string
    /**
     * Gets the date and time that the identity check was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the identity check was last modified
     */
    modified?: string // date-time
    /**
     * Gets the date that the identity check was performed
     * Note that this can be different to the date that the check was created
     */
    checkDate?: string // date-time
    /**
     * Gets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
     */
    status?: string
    /**
     * Gets the id of the negotiator that performed the identity check
     * Note that this can be different to the negotiator that created the check
     */
    negotiatorId?: string
    /**
     * Gets the details of document one that has been provided for this identity check
     */
    identityDocument1?: {
      /**
       * Gets the unique identifier of the document
       */
      documentId?: string
      /**
       * Gets the id of the document type that describes this document
       */
      typeId?: string
      /**
       * Gets the date that this document expires
       */
      expiry?: string // date-time
      /**
       * Gets the textual details of the identity document (eg. passport number)
       */
      details?: string
    }
    /**
     * Gets the details of document two that has been provided for this identity check
     */
    identityDocument2?: {
      /**
       * Gets the unique identifier of the document
       */
      documentId?: string
      /**
       * Gets the id of the document type that describes this document
       */
      typeId?: string
      /**
       * Gets the date that this document expires
       */
      expiry?: string // date-time
      /**
       * Gets the textual details of the identity document (eg. passport number)
       */
      details?: string
    }
    /**
     * Gets a listing of additional metadata that has been set against this identity check
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this identity check. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultLandlordModel_ {
  _embedded?: {
    id?: string
    /**
     * Gets the datetime when the landlord was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the landlord was last modified
     */
    modified?: string // date-time
    /**
     * Gets the active flag
     */
    active?: boolean
    /**
     * Gets the unique identifier of the landlords solicitor
     */
    solicitorId?: string
    /**
     * Gets the office id that is associated to this landlord
     */
    officeId?: string
    /**
     * Gets the landlords source information
     */
    source?: {
      /**
       * Gets the unique identifier of the landlords source
       */
      id?: string
      /**
       * Gets the landlords source type
       */
      type?: string
    }
    /**
     * Gets a collection of contact entities attached to this landlord
     * The primary contact will always appear first in the collection
     */
    related?: {
      /**
       * Gets the unique identifier of the contact
       */
      id?: string
      /**
       * Gets the name of this contact or company
       */
      name?: string
      /**
       * Gets the type of this contact (Contact/Company)
       */
      type?: string
      /**
       * The home phone number of the contact
       */
      homePhone?: string
      /**
       * The work phone number of the contact
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
      /**
       * Gets the primary address of the contact
       */
      primaryAddress?: {
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
        countryId?: string
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this landlord
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this landlord. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultNegotiatorModel_ {
  _embedded?: {
    /**
     * The unique identifier of the negotiator
     */
    id?: string
    /**
     * The date and time when the negotiator was created
     */
    created?: string // date-time
    /**
     * The date and time when the negotiator was last modified
     */
    modified?: string // date-time
    /**
     * The name of the negotiator
     */
    name?: string
    /**
     * The job title of the negotiator
     */
    jobTitle?: string
    /**
     * Flag denoting whether or not the negotiator is active
     */
    active?: boolean
    /**
     * The unique identifier of the office that the negotiator is attached to
     */
    officeId?: string
    /**
     * The work phone number of the negotiator
     */
    workPhone?: string
    /**
     * The mobile phone number of the negotiator
     */
    mobilePhone?: string
    /**
     * The email address of the negotiator
     */
    email?: string
    /**
     * App specific metadata to set against the negotiator
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the negotiator. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultOfferModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier of the offer
     */
    id?: string
    /**
     * Gets the date the offer was created
     */
    created?: string // date-time
    /**
     * Gets the date the offer was last modified
     */
    modified?: string // date-time
    /**
     * Gets the currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * Gets the id of the applicant associated to the offer
     */
    applicantId?: string
    /**
     * Gets the id of the property associated to the offer
     */
    propertyId?: string
    /**
     * Gets the id of the negotiator associated to the offer
     */
    negotiatorId?: string
    /**
     * Gets the date the offer was made
     */
    date?: string // date-time
    /**
     * Gets the amount the offer was for
     */
    amount?: number // double
    /**
     * Gets the status of the offer
     */
    status?: string
    /**
     * Gets the requested inclusions of the offer
     */
    inclusions?: string
    /**
     * Gets the requested exclusions of the offer
     */
    exclusions?: string
    /**
     * Gets the conditions of the offer
     */
    conditions?: string
    /**
     * Gets a collection of contact entities attached to this offer
     * The primary contact will always appear first in the collection
     */
    related?: {
      /**
       * Gets the unique identifier of the contact
       */
      id?: string
      /**
       * Gets the name of this contact or company
       */
      name?: string
      /**
       * Gets the type of this contact (contact/company)
       */
      type?: string
      /**
       * The home phone number of the contact
       */
      homePhone?: string
      /**
       * The work phone number of the contact
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
      /**
       * Gets the primary address of the contact
       */
      primaryAddress?: {
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
        countryId?: string
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this offer
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of this offer. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultOfficeModel_ {
  _embedded?: {
    /**
     * The unique identifier of the office
     */
    id?: string
    /**
     * The date and time when the office was created
     */
    created?: string // date-time
    /**
     * The date and time when the office was last modified
     */
    modified?: string // date-time
    /**
     * The name of the office
     */
    name?: string
    /**
     * The name of the office manager
     */
    manager?: string
    /**
     * The address of the office
     */
    address?: {
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
     * The work phone number of the office
     */
    workPhone?: string
    /**
     * The email address of the office
     */
    email?: string
    /**
     * App specific metadata that has been set against the office
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the office. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultPropertyImageModel_ {
  _embedded?: {
    /**
     * The unique identifier of the image, which is also the filename
     */
    id?: string
    /**
     * The date and time when the image was created
     */
    created?: string // date-time
    /**
     * The date and time when the property image was last modified
     */
    modified?: string // date-time
    /**
     * The unique identifier of the property attached to the image
     */
    propertyId?: string
    /**
     * The url where the image can be downloaded from
     */
    url?: string
    /**
     * The image caption
     */
    caption?: string
    /**
     * The type of image (picture/floorPlan/epc/map)
     */
    type?: string
    /**
     * The display order index of the image which can be used to correctly order the whole collection
     */
    order?: number // int32
    /**
     * The ETag for the current version of the image. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultPropertyModel_ {
  _embedded?: {
    /**
     * The unique identifier of the property
     */
    id?: string
    /**
     * The date and time when the property was created
     */
    created?: string // date-time
    /**
     * The date and time when the property was last modified
     */
    modified?: string // date-time
    /**
     * The marketing mode of the property (selling/letting/sellingAndLetting)
     */
    marketingMode?: string
    /**
     * The currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * The address of the property
     */
    address?: {
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
      /**
       * The geolocation coordinates associated with the address
       */
      geolocation?: {
        /**
         * The latitude coordinate of the coordinate pair
         */
        latitude?: number // double
        /**
         * The longitude coordinate of the coordinate pair
         */
        longitude?: number // double
      }
    }
    /**
     * The unique identifier of the area that the property resides in
     */
    areaId?: string
    /**
     * The strapline description containing a short summary about the property
     */
    strapline?: string
    /**
     * The brief description of the property
     */
    description?: string
    /**
     * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
     */
    summary?: string
    /**
     * The unique identifier of the department
     */
    departmentId?: string
    /**
     * The unique identifier of the negotiator managing the property
     */
    negotiatorId?: string
    /**
     * The total number of bedrooms in the property
     */
    bedrooms?: number // int32
    /**
     * The total number of reception rooms in the property
     */
    receptions?: number // int32
    /**
     * The total number of bathrooms in the property
     */
    bathrooms?: number // int32
    /**
     * The council tax banding of the property (A/B/C/D/E/F/G/H)
     */
    councilTax?: string
    /**
     * A flag denoting whether or not this property can be advertised on the internet
     */
    internetAdvertising?: boolean
    /**
     * The arrangements regarding viewing the property
     */
    viewingArrangements?: string
    /**
     * Details of the external land area associated to this property
     */
    externalArea?: {
      /**
       * The unit of area (acres/hectares)
       */
      type?: string
      /**
       * The minimum area bound
       */
      min?: number // double
      /**
       * The maximum area bound
       */
      max?: number // double
    }
    /**
     * Details of the internal dimensions of the property
     */
    internalArea?: {
      /**
       * The unit of area (squareFeet/squareMetres)
       */
      type?: string
      /**
       * The minimum area bound
       */
      min?: number // double
      /**
       * The maximum area bound
       */
      max?: number // double
    }
    /**
     * Details of the EPC statistics
     */
    epc?: {
      /**
       * A flag denoting whether or not this property is exempt from requiring an EPC certificate
       */
      exempt?: boolean
      /**
       * The current energy efficiency rating
       */
      eer?: number // int32
      /**
       * The potential energy efficiency rating
       */
      eerPotential?: number // int32
      /**
       * The current environmental impact rating
       */
      eir?: number // int32
      /**
       * The potential environmental impact rating
       */
      eirPotential?: number // int32
    }
    /**
     * Selling specific details about the property
     */
    selling?: {
      /**
       * The date that the property was marked as for sale
       */
      instructed?: string // date-time
      /**
       * The marketing price of the property
       */
      price?: number // int32
      /**
       * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
       */
      qualifier?: string
      /**
       * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
       */
      status?: string
      /**
       * Details about the tenure of the property
       */
      tenure?: {
        /**
         * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
         */
        type?: string
        /**
         * The tenure expiration date
         */
        expiry?: string // date-time
      }
      /**
       * The unique identifier of the vendor selling the property
       */
      vendorId?: string
    }
    /**
     * Letting specific details about the property
     */
    letting?: {
      /**
       * The date the property was marked as to let
       */
      instructed?: string // date-time
      /**
       * The date the property is next available from
       */
      availableFrom?: string // date-time
      /**
       * The date the property is available to
       */
      availableTo?: string // date-time
      /**
       * The rent being charged for the property
       */
      rent?: number // double
      /**
       * The frequency at which rent will be collected (weekly/monthly/yearly)
       */
      rentFrequency?: string
      /**
       * The acceptable letting terms (short/long/any)
       */
      term?: string
      /**
       * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
       */
      status?: string
      /**
       * The unique identifier of the landlord letting the property
       */
      landlordId?: string
    }
    /**
     * The property type attributes
     */
    type?: string[]
    /**
     * The property style attributes
     */
    style?: string[]
    /**
     * The property situation attributes
     */
    situation?: string[]
    /**
     * The property parking attributes
     */
    parking?: string[]
    /**
     * The property age attributes
     */
    age?: string[]
    /**
     * The property locality attributes
     */
    locality?: string[]
    /**
     * Details of each room in the property
     */
    rooms?: {
      /**
       * The name of the room
       */
      name?: string
      /**
       * Details about the dimensions of the room
       */
      dimensions?: string
      /**
       * Short description of the room
       */
      description?: string
    }[]
    /**
     * A collection of unique identifiers of offices attached to the property
     */
    officeIds?: string[]
    /**
     * App specific metadata that has been set against the property
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the property. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultSourceModel_ {
  _embedded?: {
    /**
     * The unique identifier of the source
     */
    id?: string
    /**
     * The date and time when the source was created
     */
    created?: string // date-time
    /**
     * The date and time when the source was last modified
     */
    modified?: string // date-time
    /**
     * The name of the source or advertising publication
     */
    name?: string
    /**
     * The type of the source (source/advertisement)
     */
    type?: string
    /**
     * A collection of the unique identifiers of offices that regularly get business from the source
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of departments that regularly get business from the source
     */
    departmentIds?: string[]
    /**
     * The ETag for the current version of the source. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultTaskModel_ {
  _embedded?: {
    /**
     * The unique identifier of the task
     */
    id?: string
    /**
     * The date and time when the task was created
     */
    created?: string // date-time
    /**
     * The date and time when the task was last modified
     */
    modified?: string // date-time
    /**
     * The date the task becomes active
     */
    activates?: string // date-time
    /**
     * The date the task was completed
     */
    completed?: string // date-time
    /**
     * The unique identifier of the task type
     */
    typeId?: string
    /**
     * The unique identifer of the negotiator that created the task
     */
    senderId?: string
    /**
     * The textual contents of the task or message
     */
    text?: string
    /**
     * The unique identifier of the landlord the task is associated to
     */
    landlordId?: string
    /**
     * The unique identifier of the property the task is associated to
     */
    propertyId?: string
    /**
     * The unique identifier of the applicant the task is associated to
     */
    applicantId?: string
    /**
     * The unique identifier of the tenancy the task is associated to
     */
    tenancyId?: string
    /**
     * The unique identifier of the contact the task is associated to
     */
    contactId?: string
    /**
     * The unique identifier of the negotiator or office the task is being sent to
     */
    recipientId?: string
    /**
     * The type of the recipient (office/negotiator)
     */
    recipientType?: string
    /**
     * App specific metadata that has been set against the task
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the task. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagedResultVendorModel_ {
  _embedded?: {
    /**
     * The unique identifier of the vendor
     */
    id?: string
    /**
     * The date and time when the vendor was created
     */
    created?: string // date-time
    /**
     * The date and time when the vendor was last modified
     */
    modified?: string // date-time
    /**
     * The date the vendor was last called
     */
    lastCall?: string // date-time
    /**
     * The date the vendor is next due to be called
     */
    nextCall?: string // date-time
    /**
     * The unique identifier of the type of vendor
     */
    typeId?: string
    /**
     * The unique identifier of the reason the vendor is selling
     */
    sellingReasonId?: string
    /**
     * The unique identifier of the vendor's solicitor
     */
    solicitorId?: string
    /**
     * The source of the vendor
     */
    source?: {
      /**
       * The unique identifier of the source of the vendor
       */
      id?: string
      /**
       * The source type (office/source)
       */
      type?: string
    }
    /**
     * A collection of contacts associated to the vendor
     */
    related?: {
      /**
       * The unique identifier of the contact
       */
      id?: string
      /**
       * The name of the contact
       */
      name?: string
      /**
       * The type of the contact (company/contact)
       */
      type?: string
      /**
       * The home phone number of the contact
       */
      homePhone?: string
      /**
       * The work phone number of the contact
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
      /**
       * The primary address of the contact
       */
      primaryAddress?: {
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
    }[]
    /**
     * The unique identifier of the negotiator attached to the vendor
     */
    negotiatorId?: string
    /**
     * A collection of unique identifiers of offices attached to the vendor
     */
    officeIds?: string[]
    /**
     * App specific metadata that has been set against the vendor
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the vendor. Used for managing update concurrency
     */
    readonly _eTag?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PagingLinkModel {
  href?: string
}
export interface ProblemDetails {
  [name: string]: any
  type?: string
  title?: string
  status?: number // int32
  detail?: string
  instance?: string
}
export interface Properties {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  LandlordId?: string[]
  Address?: string
  DepartmentId?: string
  BedroomsFrom?: number
  BedroomsTo?: number
  PriceFrom?: number
  PriceTo?: number
  RentFrom?: number
  RentTo?: number
  InternetAdvertising?: boolean
  Age?: ('period' | 'new' | 'modern')[]
  LettingStatus?: (
    | 'valuation'
    | 'toLet'
    | 'toLetUnavailable'
    | 'underOffer '
    | 'underOfferUnavailable'
    | 'arrangingTenancyUnavailable '
    | 'arrangingTenancy'
    | 'tenancyCurrentUnavailable'
    | 'tenancyCurrent'
    | 'tenancyFinished '
    | 'tenancyCancelled'
    | 'sold'
    | 'letByOtherAgent'
    | 'letPrivately '
    | 'provisional'
    | 'withdrawn'
  )[]
  Locality?: ('rural' | 'village' | 'townCity')[]
  Parking?: ('residents' | 'offStreet' | 'secure' | 'underground' | 'garage' | 'doubleGarage' | 'tripleGarage')[]
  SellingStatus?: (
    | 'preAppraisal'
    | 'valuation'
    | 'paidValuation'
    | 'forSale '
    | 'forSaleUnavailable'
    | 'underOffer'
    | 'underOfferUnavailable'
    | 'reserved'
    | 'exchanged '
    | 'completed'
    | 'soldExternally'
    | 'withdrawn'
  )[]
  Situation?: ('garden' | 'land' | 'patio' | 'roofTerrace' | 'conservatory' | 'balcony' | 'communalGardens')[]
  Style?: (
    | 'terraced'
    | 'endTerrace'
    | 'detached'
    | 'semiDetached'
    | 'linkDetached'
    | 'mews'
    | 'basement'
    | 'lowerGroundFloor'
    | 'groundFloor'
    | 'firstFloor'
    | 'upperFloor'
    | 'upperFloorWithLift'
    | 'penthouse'
  )[]
  Type?: (
    | 'house'
    | 'bungalow'
    | 'flatApartment'
    | 'maisonette'
    | 'land'
    | 'farm'
    | 'cottage'
    | 'studio'
    | 'townhouse'
    | 'developmentPlot'
  )[]
  MarketingMode?: ('selling' | 'letting' | 'sellingAndLetting')[]
}
/**
 * Representation of the physical address of a building or premise
 */
export interface PropertyAddressModel {
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
  /**
   * The geolocation coordinates associated with the address
   */
  geolocation?: {
    /**
     * The latitude coordinate of the coordinate pair
     */
    latitude?: number // double
    /**
     * The longitude coordinate of the coordinate pair
     */
    longitude?: number // double
  }
}
/**
 * Representation of EPC statistics
 */
export interface PropertyEpcModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring an EPC certificate
   */
  exempt?: boolean
  /**
   * The current energy efficiency rating
   */
  eer?: number // int32
  /**
   * The potential energy efficiency rating
   */
  eerPotential?: number // int32
  /**
   * The current environmental impact rating
   */
  eir?: number // int32
  /**
   * The potential environmental impact rating
   */
  eirPotential?: number // int32
}
/**
 * Representation of the external land area of a property
 */
export interface PropertyExternalAreaModel {
  /**
   * The unit of area (acres/hectares)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Representation of the geographical location of an address using coordinates
 */
export interface PropertyGeolocationModel {
  /**
   * The latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * The longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
/**
 * Representation of a property image
 */
export interface PropertyImageModel {
  /**
   * The unique identifier of the image, which is also the filename
   */
  id?: string
  /**
   * The date and time when the image was created
   */
  created?: string // date-time
  /**
   * The date and time when the property image was last modified
   */
  modified?: string // date-time
  /**
   * The unique identifier of the property attached to the image
   */
  propertyId?: string
  /**
   * The url where the image can be downloaded from
   */
  url?: string
  /**
   * The image caption
   */
  caption?: string
  /**
   * The type of image (picture/floorPlan/epc/map)
   */
  type?: string
  /**
   * The display order index of the image which can be used to correctly order the whole collection
   */
  order?: number // int32
  /**
   * The ETag for the current version of the image. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface PropertyImages {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  PropertyId?: string[]
  Type?: string[]
}
/**
 * Representation of the internal dimensions of a property
 */
export interface PropertyInternalAreaModel {
  /**
   * The unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Representation of property details specific to lettings marketing
 */
export interface PropertyLettingModel {
  /**
   * The date the property was marked as to let
   */
  instructed?: string // date-time
  /**
   * The date the property is next available from
   */
  availableFrom?: string // date-time
  /**
   * The date the property is available to
   */
  availableTo?: string // date-time
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * The acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
  /**
   * The unique identifier of the landlord letting the property
   */
  landlordId?: string
}
/**
 * Representation of a property
 */
export interface PropertyModel {
  /**
   * The unique identifier of the property
   */
  id?: string
  /**
   * The date and time when the property was created
   */
  created?: string // date-time
  /**
   * The date and time when the property was last modified
   */
  modified?: string // date-time
  /**
   * The marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode?: string
  /**
   * The currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * The address of the property
   */
  address?: {
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
    /**
     * The geolocation coordinates associated with the address
     */
    geolocation?: {
      /**
       * The latitude coordinate of the coordinate pair
       */
      latitude?: number // double
      /**
       * The longitude coordinate of the coordinate pair
       */
      longitude?: number // double
    }
  }
  /**
   * The unique identifier of the area that the property resides in
   */
  areaId?: string
  /**
   * The strapline description containing a short summary about the property
   */
  strapline?: string
  /**
   * The brief description of the property
   */
  description?: string
  /**
   * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
   */
  summary?: string
  /**
   * The unique identifier of the department
   */
  departmentId?: string
  /**
   * The unique identifier of the negotiator managing the property
   */
  negotiatorId?: string
  /**
   * The total number of bedrooms in the property
   */
  bedrooms?: number // int32
  /**
   * The total number of reception rooms in the property
   */
  receptions?: number // int32
  /**
   * The total number of bathrooms in the property
   */
  bathrooms?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * A flag denoting whether or not this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * The arrangements regarding viewing the property
   */
  viewingArrangements?: string
  /**
   * Details of the external land area associated to this property
   */
  externalArea?: {
    /**
     * The unit of area (acres/hectares)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * The unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Details of the EPC statistics
   */
  epc?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring an EPC certificate
     */
    exempt?: boolean
    /**
     * The current energy efficiency rating
     */
    eer?: number // int32
    /**
     * The potential energy efficiency rating
     */
    eerPotential?: number // int32
    /**
     * The current environmental impact rating
     */
    eir?: number // int32
    /**
     * The potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Selling specific details about the property
   */
  selling?: {
    /**
     * The date that the property was marked as for sale
     */
    instructed?: string // date-time
    /**
     * The marketing price of the property
     */
    price?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Details about the tenure of the property
     */
    tenure?: {
      /**
       * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
       */
      type?: string
      /**
       * The tenure expiration date
       */
      expiry?: string // date-time
    }
    /**
     * The unique identifier of the vendor selling the property
     */
    vendorId?: string
  }
  /**
   * Letting specific details about the property
   */
  letting?: {
    /**
     * The date the property was marked as to let
     */
    instructed?: string // date-time
    /**
     * The date the property is next available from
     */
    availableFrom?: string // date-time
    /**
     * The date the property is available to
     */
    availableTo?: string // date-time
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * The acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
    /**
     * The unique identifier of the landlord letting the property
     */
    landlordId?: string
  }
  /**
   * The property type attributes
   */
  type?: string[]
  /**
   * The property style attributes
   */
  style?: string[]
  /**
   * The property situation attributes
   */
  situation?: string[]
  /**
   * The property parking attributes
   */
  parking?: string[]
  /**
   * The property age attributes
   */
  age?: string[]
  /**
   * The property locality attributes
   */
  locality?: string[]
  /**
   * Details of each room in the property
   */
  rooms?: {
    /**
     * The name of the room
     */
    name?: string
    /**
     * Details about the dimensions of the room
     */
    dimensions?: string
    /**
     * Short description of the room
     */
    description?: string
  }[]
  /**
   * A collection of unique identifiers of offices attached to the property
   */
  officeIds?: string[]
  /**
   * App specific metadata that has been set against the property
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the property. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * Representation of a single room in a property
 */
export interface PropertyRoomModel {
  /**
   * The name of the room
   */
  name?: string
  /**
   * Details about the dimensions of the room
   */
  dimensions?: string
  /**
   * Short description of the room
   */
  description?: string
}
/**
 * Representation of property details specific to sales marketing
 */
export interface PropertySellingModel {
  /**
   * The date that the property was marked as for sale
   */
  instructed?: string // date-time
  /**
   * The marketing price of the property
   */
  price?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Details about the tenure of the property
   */
  tenure?: {
    /**
     * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
     */
    type?: string
    /**
     * The tenure expiration date
     */
    expiry?: string // date-time
  }
  /**
   * The unique identifier of the vendor selling the property
   */
  vendorId?: string
}
/**
 * Representation of the tenure of a property
 */
export interface PropertyTenureModel {
  /**
   * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
   */
  type?: string
  /**
   * The tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Representation of a source of business
 */
export interface SourceModel {
  /**
   * The unique identifier of the source
   */
  id?: string
  /**
   * The date and time when the source was created
   */
  created?: string // date-time
  /**
   * The date and time when the source was last modified
   */
  modified?: string // date-time
  /**
   * The name of the source or advertising publication
   */
  name?: string
  /**
   * The type of the source (source/advertisement)
   */
  type?: string
  /**
   * A collection of the unique identifiers of offices that regularly get business from the source
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of departments that regularly get business from the source
   */
  departmentIds?: string[]
  /**
   * The ETag for the current version of the source. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Sources {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  OfficeId?: string[]
  DepartmentId?: string[]
  Name?: string
  CreatedFrom?: string
  CreatedTo?: string
  Type?: ('advertisement' | 'source')[]
}
export interface StringSegment {
  readonly buffer?: string
  readonly offset?: number // int32
  readonly length?: number // int32
  readonly value?: string
  readonly hasValue?: boolean
}
/**
 * Representation of a task, which can also be an internal message
 */
export interface TaskModel {
  /**
   * The unique identifier of the task
   */
  id?: string
  /**
   * The date and time when the task was created
   */
  created?: string // date-time
  /**
   * The date and time when the task was last modified
   */
  modified?: string // date-time
  /**
   * The date the task becomes active
   */
  activates?: string // date-time
  /**
   * The date the task was completed
   */
  completed?: string // date-time
  /**
   * The unique identifier of the task type
   */
  typeId?: string
  /**
   * The unique identifer of the negotiator that created the task
   */
  senderId?: string
  /**
   * The textual contents of the task or message
   */
  text?: string
  /**
   * The unique identifier of the landlord the task is associated to
   */
  landlordId?: string
  /**
   * The unique identifier of the property the task is associated to
   */
  propertyId?: string
  /**
   * The unique identifier of the applicant the task is associated to
   */
  applicantId?: string
  /**
   * The unique identifier of the tenancy the task is associated to
   */
  tenancyId?: string
  /**
   * The unique identifier of the contact the task is associated to
   */
  contactId?: string
  /**
   * The unique identifier of the negotiator or office the task is being sent to
   */
  recipientId?: string
  /**
   * The type of the recipient (office/negotiator)
   */
  recipientType?: string
  /**
   * App specific metadata that has been set against the task
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the task. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
export interface Tasks {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  ApplicantId?: string[]
  ContactId?: string[]
  LandlordId?: string[]
  OfficeId?: string[]
  PropertyId?: string[]
  RecipientId?: string[]
  SenderId?: string[]
  TypeId?: string[]
  TenancyId?: string[]
  ActivatesFrom?: string
  ActivatesTo?: string
  CreatedFrom?: string
  CreatedTo?: string
}
/**
 * The details specific to applicants with a marketingMode of buying
 */
export interface UpdateApplicantBuyingModel {
  /**
   * The lower bound of the applicant's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the applicant's budget
   */
  priceTo?: number // int32
}
/**
 * The applicant's outdoor space requirements
 */
export interface UpdateApplicantExternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (acres/hectares)
   */
  type?: string
  /**
   * The minimum unit value of outside space that the applicant is looking for
   */
  amountFrom?: number // double
  /**
   * The maximum unit value of outside space that the applicant is looking for
   */
  amountTo?: number // double
}
/**
 * The applicant's indoor space requirements
 */
export interface UpdateApplicantInternalAreaModel {
  /**
   * The unit of area that each amount corresponds to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The unit value of inside space that the applicant is looking for
   */
  amount?: number // double
}
/**
 * Representation of an applicant
 * example:
 * [object Object]
 */
export interface UpdateApplicantModel {
  /**
   * Sets the marketing mode relating to the buyer (buying / renting)
   */
  marketingMode?: string
  /**
   * Sets a flag determining whether or not the applicant is actively looking for property
   */
  active?: boolean
  /**
   * Gets the applicant requirement notes
   */
  notes?: string
  /**
   * Sets the date and time that the applicant was last contacted
   */
  lastCall?: string // date-time
  /**
   * Sets the date and time that the applicant is next due to be contacted
   */
  nextCall?: string // date-time
  /**
   * Sets the id of the department that the applicant requirements are associated with
   */
  departmentId?: string
  /**
   * Sets the unique idenfitier of the applicants solicitor
   */
  solicitorId?: string
  /**
   * Sets the property type requirements
   */
  type?: string[]
  /**
   * Sets the property style requirements
   */
  style?: string[]
  /**
   * Sets the property situation requirements
   */
  situation?: string[]
  /**
   * Sets the property parking requirements
   */
  parking?: string[]
  /**
   * Sets the property age requirements
   */
  age?: string[]
  /**
   * Sets the property locality requirements
   */
  locality?: string[]
  /**
   * Sets the minimum number of bedrooms the applicant requires
   */
  bedroomsMin?: number // int32
  /**
   * Sets the maximum number of bedrooms the applicant requires
   */
  bedroomsMax?: number // int32
  /**
   * Sets the minimum number of reception rooms the applicant requires
   */
  receptionsMin?: number // int32
  /**
   * Sets the maximum number of reception rooms the applicant requires
   */
  receptionsMax?: number // int32
  /**
   * Sets the minimum number of bathrooms the applicant requires
   */
  bathroomsMin?: number // int32
  /**
   * Sets the maximum number of bathrooms the applicant requires
   */
  bathroomsMax?: number // int32
  /**
   * Sets the applicants location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * Sets the applicants location options
   */
  locationOptions?: string[]
  /**
   * Sets the sales specific requirements, if the applicant is looking to buy
   */
  buying?: {
    /**
     * The lower bound of the applicant's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the applicant's budget
     */
    priceTo?: number // int32
  }
  /**
   * Sets the letting specific requirements, if the applicant is looking to rent
   */
  renting?: {
    /**
     * The date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * The applicant's preferred letting term (long/short/any)
     */
    term?: string
    /**
     * The lower bound of the applicant's budget
     */
    rentFrom?: number // double
    /**
     * The upper bound of the applicant's budget
     */
    rentTo?: number // double
    /**
     * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * Sets the applicants furnishing requirements
     */
    furnishing?: string[]
  }
  /**
   * Sets the applicant's external area requirements
   */
  externalArea?: {
    /**
     * The unit of area that each amount corresponds to (acres/hectares)
     */
    type?: string
    /**
     * The minimum unit value of outside space that the applicant is looking for
     */
    amountFrom?: number // double
    /**
     * The maximum unit value of outside space that the applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * Sets the applicant's internal area requirements
   */
  internalArea?: {
    /**
     * The unit of area that each amount corresponds to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The unit value of inside space that the applicant is looking for
     */
    amount?: number // double
  }
  /**
   * Sets the applicants source
   */
  source?: {
    /**
     * Sets the unique identifier of the applicants source
     */
    id?: string
    /**
     * Sets the applicants source type
     */
    type?: string
  }
  /**
   * Sets a collection of office ids that are related to this applicant
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this applicant
   */
  negotiatorIds?: string[]
  /**
   * Sets a JSON fragment to attach to this applicant as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * The details specific to applicants with a marketingMode of renting
 */
export interface UpdateApplicantRentingModel {
  /**
   * The date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * The applicant's preferred letting term (long/short/any)
   */
  term?: string
  /**
   * The lower bound of the applicant's budget
   */
  rentFrom?: number // double
  /**
   * The upper bound of the applicant's budget
   */
  rentTo?: number // double
  /**
   * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Sets the applicants furnishing requirements
   */
  furnishing?: string[]
}
/**
 * Model used for creating a applicants source
 */
export interface UpdateApplicantSourceModel {
  /**
   * Sets the unique identifier of the applicants source
   */
  id?: string
  /**
   * Sets the applicants source type
   */
  type?: string
}
/**
 * Represents an attendee on an appointment.
 */
export interface UpdateAppointmentAttendeeModel {
  /**
   * The identifier of the attendee.
   */
  id?: string
  /**
   * The type of attendee.
   */
  type?: string
  /**
   * A flag denoting whether or not the attendee has confirmed their attendance to the appointment.
   */
  confirmed?: boolean
}
/**
 * Represents the follow up information on a single appointment
 */
export interface UpdateAppointmentFollowUpModel {
  /**
   * The unique identifier of a pre-defined follow up response type.
   */
  responseId?: string
  /**
   * The internal follow up notes to be stored against the appointment.
   */
  notes?: string
}
/**
 * Represents a calendar entry.
 */
export interface UpdateAppointmentModel {
  /**
   * The date and time when the appointment will start.
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end.
   */
  end?: string // date-time
  /**
   * The type of appointment.
   */
  typeId?: string
  /**
   * The date and time when the appointment should be followed up on.
   */
  followUpOn?: string // date-time
  /**
   * The appointment description.
   */
  description?: string
  /**
   * The property identifier that the appointment takes place at.
   */
  propertyId?: string
  /**
   * The id of the person that organised the appointment.
   */
  organiserId?: string
  /**
   * The flag that determines if this appointment is cancelled.
   */
  cancelled?: boolean
  /**
   * The negotiator ids to link the appointment too.
   */
  negotiatorIds?: string[]
  /**
   * The office ids to link the appointment too.
   */
  officeIds?: string[]
  /**
   * The details of the attendee of the appointment.
   */
  attendee?: {
    /**
     * The identifier of the attendee.
     */
    id?: string
    /**
     * The type of attendee.
     */
    type?: string
    /**
     * A flag denoting whether or not the attendee has confirmed their attendance to the appointment.
     */
    confirmed?: boolean
  }
  /**
   * The flag to specify if the appointment is accompanied.
   */
  accompanied?: boolean
  /**
   * The flag to specify if the negotiator is confirmed.
   */
  negotiatorConfirmed?: boolean
  /**
   * The flag to specify if the attendee is confirmed.
   */
  attendeeConfirmed?: boolean
  /**
   * The flag to specify if the property is confirmed.
   */
  propertyConfirmed?: boolean
  /**
   * The details of the appointments follow up.
   */
  followUp?: {
    /**
     * The unique identifier of a pre-defined follow up response type.
     */
    responseId?: string
    /**
     * The internal follow up notes to be stored against the appointment.
     */
    notes?: string
  }
  /**
   * The recurrence pattern for this appointment.
   */
  recurrence?: {
    /**
     * The type of unit that the interval will apply to.
     */
    type?: string
    /**
     * The numeric value for how often the appointment will recur.
     */
    interval?: number // int32
    /**
     * The date and time when the appointment will continue to recur until.
     */
    until?: string // date-time
  }
  /**
   * Sets a JSON fragment to attach to this appointment as metadata.
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Represents the recurrence details of an appointment.
 */
export interface UpdateAppointmentRecurrenceModel {
  /**
   * The type of unit that the interval will apply to.
   */
  type?: string
  /**
   * The numeric value for how often the appointment will recur.
   */
  interval?: number // int32
  /**
   * The date and time when the appointment will continue to recur until.
   */
  until?: string // date-time
}
/**
 * Model to update an area
 * example:
 * [object Object]
 */
export interface UpdateAreaModel {
  /**
   * Sets the areas name
   */
  name?: string
  /**
   * Sets the areas area information
   */
  area?: string[]
  /**
   * Sets the areas related deparments
   */
  departmentIds?: string[]
  /**
   * Sets the areas related offices
   */
  officeIds?: string[]
}
/**
 * Model to update a company address
 */
export interface UpdateCompanyAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to update a company
 * example:
 * [object Object]
 */
export interface UpdateCompanyModel {
  /**
   * Sets the companies name
   */
  name?: string
  /**
   * Sets the companies branch
   */
  branch?: string
  /**
   * Sets the companies notes
   */
  notes?: string
  /**
   * Sets the active flag against the company
   */
  active?: boolean
  /**
   * Sets the vat registered flag against the company
   */
  vatRegistered?: boolean
  /**
   * Sets the companies list of type ids
   */
  typeIds?: string[]
  /**
   * Sets the supplier type id
   */
  supplierTypeId?: string
  /**
   * The work phone number of the company
   */
  workPhone?: string
  /**
   * The mobile phone number of the company
   */
  mobilePhone?: string
  /**
   * The email address of the company
   */
  email?: string
  /**
   * Sets the address of the company
   */
  address?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets a JSON fragment to attach to this company as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update a contact address
 */
export interface UpdateContactAddressModel {
  /**
   * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
  /**
   * Sets the building name
   */
  buildingName?: string
  /**
   * Sets the building number
   */
  buildingNumber?: string
  /**
   * Sets the first line of the address
   */
  line1?: string
  /**
   * Sets the second line of the address
   */
  line2?: string
  /**
   * Sets the third line of the address
   */
  line3?: string
  /**
   * Sets the fourth line of the address
   */
  line4?: string
  /**
   * Sets the postcode
   */
  postcode?: string
  /**
   * Sets the ISO-3166 country code associated with the address
   */
  countryId?: string
}
/**
 * Model to update a contact record
 * example:
 * [object Object]
 */
export interface UpdateContactModel {
  /**
   * Sets the title of this contact (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * Sets the forename of this contact
   */
  forename?: string
  /**
   * Sets the surname of this contact
   */
  surname?: string
  /**
   * Sets the date of birth of this contact
   */
  dateOfBirth?: string // date-time
  /**
   * Sets a flag to indicate if this contact has been marked as active
   */
  active?: boolean
  /**
   * Sets the marketing consent status of this contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * Sets the contacts source
   */
  source?: {
    /**
     * Sets the unique identifier of the contacts source
     */
    id?: string
    /**
     * Sets the contacts source type
     */
    type?: string
  }
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * Gets a collection of office ids that are related to this contact
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this contact
   */
  negotiatorIds?: string[]
  /**
   * Sets the contacts primary address
   */
  primaryAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets the contacts secondary address
   */
  secondaryAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets the contacts work address
   */
  workAddress?: {
    /**
     * Sets the type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
    /**
     * Sets the building name
     */
    buildingName?: string
    /**
     * Sets the building number
     */
    buildingNumber?: string
    /**
     * Sets the first line of the address
     */
    line1?: string
    /**
     * Sets the second line of the address
     */
    line2?: string
    /**
     * Sets the third line of the address
     */
    line3?: string
    /**
     * Sets the fourth line of the address
     */
    line4?: string
    /**
     * Sets the postcode
     */
    postcode?: string
    /**
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
  }
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model used for creating a contacts source
 */
export interface UpdateContactSourceModel {
  /**
   * Sets the unique identifier of the contacts source
   */
  id?: string
  /**
   * Sets the contacts source type
   */
  type?: string
}
/**
 * example:
 * [object Object]
 */
export interface UpdateDocumentModel {
  /**
   * Sets the Id of the document type
   */
  typeId?: string
  /**
   * Sets the filename assigned to the document
   */
  name?: string
}
/**
 * Model to update an existing identity check
 * example:
 * [object Object]
 */
export interface UpdateIdentityCheckModel {
  /**
   * Sets the date that the identity check was performed
   * Note that this can be different to the date that the check was created
   */
  checkDate?: string // date-time
  /**
   * Sets the status of this identity check  (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * Sets the id of the negotiator that performed the identity check
   * Note that this can be different to the negotiator that created the check
   */
  negotiatorId?: string
  /**
   * Sets the details of document one that have been provided for this identity check
   */
  identityDocument1?: {
    /**
     * Sets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Sets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Sets the textual details of the identity document (eg. passport number)
     */
    details?: string
    /**
     * Sets the base64 binary content of the file
     */
    fileData?: string
    /**
     * Sets the filename assigned to the document
     */
    name?: string
  }
  /**
   * Sets the details of document two that have been provided for this identity check
   */
  identityDocument2?: {
    /**
     * Sets the id of the document type that describes this document
     */
    typeId?: string
    /**
     * Sets the date that this document expires
     */
    expiry?: string // date-time
    /**
     * Sets the textual details of the identity document (eg. passport number)
     */
    details?: string
    /**
     * Sets the base64 binary content of the file
     */
    fileData?: string
    /**
     * Sets the filename assigned to the document
     */
    name?: string
  }
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update an identity document
 */
export interface UpdateIdentityDocumentModel {
  /**
   * Sets the id of the document type that describes this document
   */
  typeId?: string
  /**
   * Sets the date that this document expires
   */
  expiry?: string // date-time
  /**
   * Sets the textual details of the identity document (eg. passport number)
   */
  details?: string
  /**
   * Sets the base64 binary content of the file
   */
  fileData?: string
  /**
   * Sets the filename assigned to the document
   */
  name?: string
}
/**
 * Request body to update a landlord
 */
export interface UpdateLandlordModel {
  /**
   * Sets the active flag against this landlord
   */
  active?: boolean
  /**
   * Sets the unique idenfitier of the landlords solicitor
   */
  solicitorId?: string
  /**
   * Sets the office id that is associated to this landlord
   */
  officeId?: string
  /**
   * Sets the landlords source
   */
  source?: {
    /**
     * Sets the unique identifier of the landlords source
     */
    id?: string
    /**
     * Sets the landlords source type
     */
    type?: string
  }
  /**
   * Sets a JSON fragment to attach to this landlord as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model used for updating a landlords source
 */
export interface UpdateLandlordSourceModel {
  /**
   * Sets the unique identifier of the landlords source
   */
  id?: string
  /**
   * Sets the landlords source type
   */
  type?: string
}
/**
 * Request body used to update an existing negotiator
 * example:
 * [object Object]
 */
export interface UpdateNegotiatorModel {
  /**
   * The name of the negotiator
   */
  name?: string
  /**
   * The job title of the negotiator
   */
  jobTitle?: string
  /**
   * Flag denoting whether or not the negotiator is active
   */
  active?: boolean
  /**
   * The work phone number of the negotiator
   */
  workPhone?: string
  /**
   * The mobile phone number of the negotiator
   */
  mobilePhone?: string
  /**
   * The email address of the negotiator
   */
  email?: string
  /**
   * App specific metadata to set against the negotiator
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Model to update an offer
 * example:
 * [object Object]
 */
export interface UpdateOfferModel {
  /**
   * Sets the id of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * Sets the date the offer was made
   */
  date?: string // date-time
  /**
   * Sets the amount the offer was for
   */
  amount?: number // double
  /**
   * Sets the status of the offer
   */
  status?: string
  /**
   * Sets the requested inclusions of the offer
   */
  inclusions?: string
  /**
   * Sets the requested exclusions of the offer
   */
  exclusions?: string
  /**
   * Sets the conditions of the offer
   */
  conditions?: string
  /**
   * Sets a JSON fragment to attach to this offer as metadata
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update the address of an existing office
 */
export interface UpdateOfficeAddressModel {
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
 * Request body used to update an existing office
 */
export interface UpdateOfficeModel {
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: {
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
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata to set against the office
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update the address of an existing property
 */
export interface UpdatePropertyAddressModel {
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
  /**
   * The geolocation coordinates associated with the address
   */
  geolocation?: {
    /**
     * The latitude coordinate of the coordinate pair
     */
    latitude?: number // double
    /**
     * The longitude coordinate of the coordinate pair
     */
    longitude?: number // double
  }
}
/**
 * Request body used to update the EPC statistics of an existing property
 */
export interface UpdatePropertyEpcModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring an EPC certificate
   */
  exempt?: boolean
  /**
   * The current energy efficiency rating
   */
  eer?: number // int32
  /**
   * The potential energy efficiency rating
   */
  eerPotential?: number // int32
  /**
   * The current environmental impact rating
   */
  eir?: number // int32
  /**
   * The potential environmental impact rating
   */
  eirPotential?: number // int32
}
/**
 * Request body to update the external land area of an existing property
 */
export interface UpdatePropertyExternalAreaModel {
  /**
   * The unit of area (acres/hectares)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Request body used to update the geolocation coordinates of an existing property's address
 */
export interface UpdatePropertyGeolocationModel {
  /**
   * The latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * The longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
/**
 * Request body used to update an existing property image
 * example:
 * [object Object]
 */
export interface UpdatePropertyImageModel {
  /**
   * The image caption
   */
  caption?: string
  /**
   * The type of image (picture/floorPlan/epc/map)
   */
  type?: string
}
/**
 * Request body to update the internal dimensions of an existing property
 */
export interface UpdatePropertyInternalAreaModel {
  /**
   * The unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * The minimum area bound
   */
  min?: number // double
  /**
   * The maximum area bound
   */
  max?: number // double
}
/**
 * Request body used to update details specific to lettings marketing on an existing property
 */
export interface UpdatePropertyLettingModel {
  /**
   * The date the property was marked as to let
   */
  instructed?: string // date-time
  /**
   * The date the property is next available from
   */
  availableFrom?: string // date-time
  /**
   * The date the property is available to
   */
  availableTo?: string // date-time
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * The acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
}
/**
 * Request body used to update an existing property
 */
export interface UpdatePropertyModel {
  /**
   * The strapline description containing a short summary about the property
   */
  strapline?: string
  /**
   * The brief description of the property
   */
  description?: string
  /**
   * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
   */
  summary?: string
  /**
   * The address of the property
   */
  address?: {
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
    /**
     * The geolocation coordinates associated with the address
     */
    geolocation?: {
      /**
       * The latitude coordinate of the coordinate pair
       */
      latitude?: number // double
      /**
       * The longitude coordinate of the coordinate pair
       */
      longitude?: number // double
    }
  }
  /**
   * The total number of bedrooms in the property
   */
  bedrooms?: number // int32
  /**
   * The total number of reception rooms in the property
   */
  receptions?: number // int32
  /**
   * The total number of bathrooms in the property
   */
  bathrooms?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * A flag denoting whether or not this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * The arrangements regarding viewing the property
   */
  viewingArrangements?: string
  /**
   * Details of the EPC statistics
   */
  epc?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring an EPC certificate
     */
    exempt?: boolean
    /**
     * The current energy efficiency rating
     */
    eer?: number // int32
    /**
     * The potential energy efficiency rating
     */
    eerPotential?: number // int32
    /**
     * The current environmental impact rating
     */
    eir?: number // int32
    /**
     * The potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Details of the external land area associated to this property
   */
  externalArea?: {
    /**
     * The unit of area (acres/hectares)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * The unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * The minimum area bound
     */
    min?: number // double
    /**
     * The maximum area bound
     */
    max?: number // double
  }
  /**
   * Selling specific details about the property
   */
  selling?: {
    /**
     * The date that the property was marked as for sale
     */
    instructed?: string // date-time
    /**
     * The marketing price of the property
     */
    price?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Details about the tenure of the property
     */
    tenure?: {
      /**
       * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
       */
      type?: string
      /**
       * The tenure expiration date
       */
      expiry?: string // date-time
    }
  }
  /**
   * Letting specific details about the property
   */
  letting?: {
    /**
     * The date the property was marked as to let
     */
    instructed?: string // date-time
    /**
     * The date the property is next available from
     */
    availableFrom?: string // date-time
    /**
     * The date the property is available to
     */
    availableTo?: string // date-time
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * The acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
  }
  /**
   * The property type attributes
   */
  type?: string[]
  /**
   * The property style attributes
   */
  style?: string[]
  /**
   * The property situation attributes
   */
  situation?: string[]
  /**
   * The property parking attributes
   */
  parking?: string[]
  /**
   * The property age attributes
   */
  age?: string[]
  /**
   * The property locality attributes
   */
  locality?: string[]
  /**
   * The unique identifier of the negotiator managing the property
   */
  negotiatorId?: string
  /**
   * A collection of unique identifiers of offices attached to the property
   */
  officeIds?: string[]
  /**
   * The unique identifier of the area that the property resides in
   */
  areaId?: string
  /**
   * App specific metadata to set against the property
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update details specific to sales marketing on an existing property
 */
export interface UpdatePropertySellingModel {
  /**
   * The date that the property was marked as for sale
   */
  instructed?: string // date-time
  /**
   * The marketing price of the property
   */
  price?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Details about the tenure of the property
   */
  tenure?: {
    /**
     * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
     */
    type?: string
    /**
     * The tenure expiration date
     */
    expiry?: string // date-time
  }
}
/**
 * Request body used to set the tenure of an existing property
 */
export interface UpdatePropertyTenureModel {
  /**
   * The type of tenure that applies to the property (freehold/leasehold/shareOfFreehold/commonhold/tba)
   */
  type?: string
  /**
   * The tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Request body used to update an existing source of business
 * example:
 * [object Object]
 */
export interface UpdateSourceModel {
  /**
   * The name of the source or advertising publication
   */
  name?: string
  /**
   * The type of the source (source/advertisement)
   */
  type?: string
  /**
   * A collection of the unique identifiers of offices that regularly get business from the source
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of departments that regularly get business from the source
   */
  departmentIds?: string[]
}
/**
 * Representation of a task, which can also be an internal message
 * example:
 * [object Object]
 */
export interface UpdateTaskModel {
  /**
   * The date the task becomes active
   */
  activates?: string // date-time
  /**
   * The date the task was completed
   */
  completed?: string // date-time
  /**
   * The unique identifier of the task type
   */
  typeId?: string
  /**
   * The unique identifer of the negotiator that created the task
   */
  senderId?: string
  /**
   * The textual contents of the task or message
   */
  text?: string
  /**
   * The unique identifier of the landlord the task is associated to
   */
  landlordId?: string
  /**
   * The unique identifier of the property the task is associated to
   */
  propertyId?: string
  /**
   * The unique identifier of the applicant the task is associated to
   */
  applicantId?: string
  /**
   * The unique identifier of the tenancy the task is associated to
   */
  tenancyId?: string
  /**
   * The unique identifier of the contact the task is associated to
   */
  contactId?: string
  /**
   * The unique identifier of the negotiator or office the task is being sent to
   */
  recipientId?: string
  /**
   * The type of the recipient (office/negotiator)
   */
  recipientType?: string
  /**
   * App specific metadata that has been set against the task
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update an existing vendor
 * example:
 * [object Object]
 */
export interface UpdateVendorModel {
  /**
   * The date the vendor was last called
   */
  lastCall?: string // date-time
  /**
   * The date the vendor is next due to be called
   */
  nextCall?: string // date-time
  /**
   * The unique identifier of the type of vendor
   */
  typeId?: string
  /**
   * The unique identifier of the reason the vendor is selling
   */
  sellingReasonId?: string
  /**
   * The unique identifier of the vendor's solicitor
   */
  solicitorId?: string
  /**
   * The source of the vendor
   */
  source?: {
    /**
     * The unique identifier of the source of the vendor
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * App specific metadata that has been set against the vendor
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Representation of the physical address of a building or premise
 */
export interface VendorContactAddressModel {
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
 * A summarised view of the details of a contact associated to a vendor
 */
export interface VendorContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The name of the contact
   */
  name?: string
  /**
   * The type of the contact (company/contact)
   */
  type?: string
  /**
   * The home phone number of the contact
   */
  homePhone?: string
  /**
   * The work phone number of the contact
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
  /**
   * The primary address of the contact
   */
  primaryAddress?: {
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
}
/**
 * Representation of a vendor
 */
export interface VendorModel {
  /**
   * The unique identifier of the vendor
   */
  id?: string
  /**
   * The date and time when the vendor was created
   */
  created?: string // date-time
  /**
   * The date and time when the vendor was last modified
   */
  modified?: string // date-time
  /**
   * The date the vendor was last called
   */
  lastCall?: string // date-time
  /**
   * The date the vendor is next due to be called
   */
  nextCall?: string // date-time
  /**
   * The unique identifier of the type of vendor
   */
  typeId?: string
  /**
   * The unique identifier of the reason the vendor is selling
   */
  sellingReasonId?: string
  /**
   * The unique identifier of the vendor's solicitor
   */
  solicitorId?: string
  /**
   * The source of the vendor
   */
  source?: {
    /**
     * The unique identifier of the source of the vendor
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of contacts associated to the vendor
   */
  related?: {
    /**
     * The unique identifier of the contact
     */
    id?: string
    /**
     * The name of the contact
     */
    name?: string
    /**
     * The type of the contact (company/contact)
     */
    type?: string
    /**
     * The home phone number of the contact
     */
    homePhone?: string
    /**
     * The work phone number of the contact
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
    /**
     * The primary address of the contact
     */
    primaryAddress?: {
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
  }[]
  /**
   * The unique identifier of the negotiator attached to the vendor
   */
  negotiatorId?: string
  /**
   * A collection of unique identifiers of offices attached to the vendor
   */
  officeIds?: string[]
  /**
   * App specific metadata that has been set against the vendor
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the vendor. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
}
/**
 * Representation of a vendor's source
 */
export interface VendorSourceModel {
  /**
   * The unique identifier of the source of the vendor
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Representation of a vendor's source
 */
export interface VendorUpdateSourceModel {
  /**
   * The unique identifier of the source of the vendor
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
export interface Vendors {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  Address?: string
  Name?: string
  CreatedFrom?: string
  CreatedTo?: string
  LastCallFrom?: string
  LastCallTo?: string
  NextCallFrom?: string
  NextCallTo?: string
}
