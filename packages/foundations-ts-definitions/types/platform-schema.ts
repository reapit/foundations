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
 * A summarised view of the details of a contact or company associated to an applicant
 */
export interface ApplicantContactModel {
  /**
   * The unique identifier of the contact or company
   */
  id?: string
  /**
   * The name of the contact or company
   */
  name?: string
  /**
   * The type of the contact (company/contact)
   */
  type?: string
  /**
   * The home phone number of the contact or company
   */
  homePhone?: string
  /**
   * The work phone number of the contact or company
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact or company
   */
  mobilePhone?: string
  /**
   * The email address of the contact or company
   */
  email?: string
  /**
   * The primary address of the contact or company
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
 * Representation of a relationship between an applicant and a contact or company
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface ApplicantContactRelationshipModel {
  /**
   * The unique identifier of the applicant relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the applicant
   */
  applicantId?: string
  /**
   * The type of related entity (contact/company)
   */
  associatedType?: string
  /**
   * The unique identifier of the related contact or company
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
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface ApplicantModel {
  /**
   * The unique identifier of the applicant
   */
  id?: string
  /**
   * The date and time when the applicant was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the applicant was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * Indicates whether the applicant is look to buy or rent a property (buying/renting)
   */
  marketingMode?: string
  /**
   * The ISO-4217 currency code that relates to monetary amounts specified by the applicant
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
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date when the applicant is next due to be contacted
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * The unique identifier of the department that the applicant requirements are associated with. The applicant will only match to properties with the same value
   */
  departmentId?: string
  /**
   * The unique identifier of the solicitor associated to the applicant
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
   * The applicant's location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * The applicant's location options
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
     * example:
     * 2019-08-14
     */
    moveDate?: string // date
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
   * The source of the applicant
   */
  source?: {
    /**
     * The unique identifier of the applicant's source
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of unique identifiers of offices attached to the applicant. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the applicant. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of contacts and/or companies associated to the applicant. The first item in the collection is considered the primary relationship
   */
  related?: {
    /**
     * The unique identifier of the contact or company
     */
    id?: string
    /**
     * The name of the contact or company
     */
    name?: string
    /**
     * The type of the contact (company/contact)
     */
    type?: string
    /**
     * The home phone number of the contact or company
     */
    homePhone?: string
    /**
     * The work phone number of the contact or company
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact or company
     */
    mobilePhone?: string
    /**
     * The email address of the contact or company
     */
    email?: string
    /**
     * The primary address of the contact or company
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
   * App specific metadata that has been set against the applicant
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the applicant. Used for managing update concurrency
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
   * example:
   * 2019-08-14
   */
  moveDate?: string // date
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
 * An applicant's source of enquiry
 */
export interface ApplicantSourceModel {
  /**
   * The unique identifier of the applicant's source
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
export interface Applicants {
  PageSize?: number
  PageNumber?: number
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
  MarketingMode?: ('selling' | 'letting' | 'sellingAndLetting')[]
}
/**
 * An appointment attendee
 */
export interface AppointmentAttendeeModel {
  /**
   * The unique identifier of the attendee
   */
  id?: string
  /**
   * The type of attendee
   */
  type?: string
  /**
   * A collection of contacts relating to the attendee
   */
  contacts?: {
    /**
     * The unique identifier of the contact
     */
    id?: string
    /**
     * The name of the contact
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
 * A summarised view of the details of a contact associated to an appointment attendee
 */
export interface AppointmentContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The name of the contact
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
 * Follow up information relating to an appointment
 */
export interface AppointmentFollowUpModel {
  /**
   * The date when the appointment should be followed up
   * example:
   * 2019-08-14
   */
  due?: string // date
  /**
   * The unique identifier of a pre-defined follow up response type
   */
  responseId?: string
  /**
   * Free text internal follow up notes to be stored against the appointment
   */
  notes?: string
}
/**
 * Representation of a calendar appointment
 */
export interface AppointmentModel {
  /**
   * The unique identifier of the appointment
   */
  id?: string
  /**
   * The date and time when the appointment was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the appointment was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The date and time when the appointment will start
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  end?: string // date-time
  /**
   * The unique identifier of the appointment type
   */
  typeId?: string
  /**
   * A free text description about the appointment
   */
  description?: string
  /**
   * A flag denoting whether or not the appointment recurs
   */
  recurring?: boolean
  /**
   * A flag denoting whether or not the appointment has been cancelled
   */
  cancelled?: boolean
  /**
   * Follow up information relating to the appointment
   */
  followUp?: {
    /**
     * The date when the appointment should be followed up
     * example:
     * 2019-08-14
     */
    due?: string // date
    /**
     * The unique identifier of a pre-defined follow up response type
     */
    responseId?: string
    /**
     * Free text internal follow up notes to be stored against the appointment
     */
    notes?: string
  }
  /**
   * The unique identifier of the property related to the appointment
   */
  propertyId?: string
  /**
   * The unique identifier of the negotiator that organised the appointment
   */
  organiserId?: string
  /**
   * A collection of unique identifiers of negotiators attached to the appointment
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment
   */
  officeIds?: string[]
  /**
   * An appointment attendee
   */
  attendee?: {
    /**
     * The unique identifier of the attendee
     */
    id?: string
    /**
     * The type of attendee
     */
    type?: string
    /**
     * A collection of contacts relating to the attendee
     */
    contacts?: {
      /**
       * The unique identifier of the contact
       */
      id?: string
      /**
       * The name of the contact
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
   * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
   */
  accompanied?: boolean
  /**
   * A flag denoting whether or not the main negotiator has confirmed their attendance
   */
  negotiatorConfirmed?: boolean
  /**
   * A flag denoting whether or not the attendee has confirmed their attendance
   */
  attendeeConfirmed?: boolean
  /**
   * A flag denoting whether or not the property and/or property's vendor has confirmed their attendance
   */
  propertyConfirmed?: boolean
  /**
   * App specific metadata that has been set against the appointment
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the appointment. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  TypeId?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  PropertyId?: string[]
  Start?: string
  End?: string
  IncludeCancelled?: boolean
  IncludeUnconfirmed?: boolean
}
/**
 * Representation of an area that properties reside in, or applicants are looking to buy/rent in
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface AreaModel {
  /**
   * The unique identifier of the area
   */
  id?: string
  /**
   * The date and time when the area was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the area was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the area
   */
  name?: string
  /**
   * A flag denoting whether the area can currently be selected against properties and applicants
   */
  active?: boolean
  /**
   * The type of area (postcodes/polygon/group)
   */
  type?: string
  /**
   * The location details (comma delimited list of postcodes, group ids or lat/long coordinate groups)
   */
  area?: string[]
  /**
   * A collection of unique identifiers of departments associated to the area
   */
  departmentIds?: string[]
  /**
   * A collection of unique identifiers of offices associated to the area
   */
  officeIds?: string[]
  /**
   * The ETag for the current version of the area. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  DepartmentId?: string[]
  OfficeId?: string[]
  Name?: string
  Active?: boolean
}
export interface Companies {
  PageSize?: number
  PageNumber?: number
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
 * Representation of the physical address of a building or premise
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
  country?: string
}
/**
 * Representation of a company
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface CompanyModel {
  /**
   * The unique identifier of the company
   */
  id?: string
  /**
   * The date and time when the company was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the company was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the company
   */
  name?: string
  /**
   * The branch name of the company
   */
  branch?: string
  /**
   * A free text field containing notes that describe the company's business or service offering
   */
  notes?: string
  /**
   * A flag determining whether or not the company is currently active
   */
  active?: boolean
  /**
   * A flag determining whether or not the company is VAT registered
   */
  vatRegistered?: boolean
  /**
   * A collection of unique identifiers of company types that categorise the type of business the company operates
   */
  typeIds?: string[]
  /**
   * The unique identifier of a supplier type, if the company is a supplier
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
   * The address of the company
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
    country?: string
  }
  /**
   * App specific metadata that has been set against the company
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the company. Used for managing update concurrency
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
 * Representation of the physical address of a building or premise
 */
export interface ContactAddressModel {
  /**
   * The type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
   * The ISO-3166 country code that the address resides in
   */
  countryId?: string
}
/**
 * Representation of an individual contact
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface ContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The date and time when the contact was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the contact was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The contact's title  (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * The contact's forename
   */
  forename?: string
  /**
   * The contact's surname
   */
  surname?: string
  /**
   * The contact's date of birth
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
  /**
   * A flag determining whether or not the contact is currently active
   */
  active?: boolean
  /**
   * The marketing consent status of the contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * The status of the last identity check performed against the contact (pass/fail/pending/cancelled/warnings/unchecked)
   */
  identityCheck?: string
  /**
   * The source of the contact
   */
  source?: {
    /**
     * The unique identifier of the source of the contact
     */
    id?: string
    /**
     * The source type (office/source)
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
   * The primary address of the contact
   */
  primaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * The secondary address of the contact
   */
  secondaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * The work address of the contact
   */
  workAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * A collection of unique identifiers of offices attached to the contact
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact
   */
  negotiatorIds?: string[]
  /**
   * App specific metadata that has been set against the contact
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the contact. Used for managing update concurrency
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
 * Representation of a contact's source
 */
export interface ContactSourceModel {
  /**
   * The unique identifier of the source of the contact
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
export interface Contacts {
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  NegotiatorId?: string[]
  OfficeId?: string[]
  Address?: string
  IdentityCheck?: string
  Name?: string
  MarketingConsent?: string
  Active?: boolean
  CreatedFrom?: string
  CreatedTo?: string
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
 * Request body used to create a relationship between an applicant and a contact or company
 */
export interface CreateApplicantContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
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
 * Request body used to create a new applicant
 * example:
 * [object Object]
 */
export interface CreateApplicantModel {
  /**
   * Indicates whether the applicant is look to buy or rent a property (buying/renting)
   */
  marketingMode?: string
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
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date when the applicant is next due to be contacted
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * The unique identifier of the department that the applicant requirements are associated with. The applicant will only match to properties with the same value
   */
  departmentId?: string
  /**
   * The unique identifier of the solicitor associated to the applicant
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
   * The applicant's location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * The applicant's location options
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
     * example:
     * 2019-08-14
     */
    moveDate?: string // date
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
     * A list of property furnishing requirements taken from the full listing of the associated department
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
   * The source of the applicant
   */
  source?: {
    /**
     * The unique identifier of the applicant's source
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of unique identifiers of offices attached to the applicant. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the applicant. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of contacts and/or companies associated to the applicant. The first item in the collection is considered the primary relationship
   */
  related?: {
    /**
     * The unique identifier of the contact or company to create a relationship with
     */
    associatedId?: string
    /**
     * The type of relationship to create (contact/company)
     */
    associatedType?: string
  }[]
  /**
   * App specific metadata to set against the applicant
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
   * example:
   * 2019-08-14
   */
  moveDate?: string // date
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
   * A list of property furnishing requirements taken from the full listing of the associated department
   */
  furnishing?: string[]
}
/**
 * An applicant's source of enquiry
 */
export interface CreateApplicantSourceModel {
  /**
   * The unique identifier of the applicant's source
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Represents an external attendee on an appointment
 */
export interface CreateAppointmentAttendeeModel {
  /**
   * The unique identifier of the attendee
   */
  id?: string
  /**
   * The type of attendee (applicant/contact/landlord/tenant)
   */
  type?: string
}
/**
 * Request body used to create a new calendar appointment
 * example:
 * [object Object]
 */
export interface CreateAppointmentModel {
  /**
   * The date and time when the appointment will start
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  end?: string // date-time
  /**
   * The date when the appointment should be followed up
   * example:
   * 2019-08-14
   */
  followUpOn?: string // date
  /**
   * The unique identifier of the appointment type
   */
  typeId?: string
  /**
   * A free text description about the appointment
   */
  description?: string
  /**
   * The unique identifier of the negotiator that organised the appointment
   */
  organiserId?: string
  /**
   * A collection of unique identifiers of negotiators attached to the appointment
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment
   */
  officeIds?: string[]
  /**
   * Details of the external appointment attendee
   */
  attendee?: {
    /**
     * The unique identifier of the attendee
     */
    id?: string
    /**
     * The type of attendee (applicant/contact/landlord/tenant)
     */
    type?: string
  }
  /**
   * The unique identifier of the property related to the appointment
   */
  propertyId?: string
  /**
   * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
   */
  accompanied?: boolean
  /**
   * A flag denoting whether or not the main negotiator has confirmed their attendance
   */
  negotiatorConfirmed?: boolean
  /**
   * A flag denoting whether or not the attendee has confirmed their attendance
   */
  attendeeConfirmed?: boolean
  /**
   * A flag denoting whether or not the property and/or property's vendor has confirmed their attendance
   */
  propertyConfirmed?: boolean
  /**
   * Details of the recurrence pattern for the appointment
   */
  recurrence?: {
    /**
     * The numeric value denoting how often the appointment will recur
     */
    interval?: number // int32
    /**
     * The type of unit that the `interval` applies to
     */
    type?: string
    /**
     * The date and time when the recurrence will stop
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    until?: string // date-time
  }
  /**
   * App specific metadata to set against the appointment
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Details of an appointment's recurrence pattern
 */
export interface CreateAppointmentRecurrenceModel {
  /**
   * The numeric value denoting how often the appointment will recur
   */
  interval?: number // int32
  /**
   * The type of unit that the `interval` applies to
   */
  type?: string
  /**
   * The date and time when the recurrence will stop
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  until?: string // date-time
}
/**
 * Request body used to create a new area
 * example:
 * [object Object]
 */
export interface CreateAreaModel {
  /**
   * The name of the area
   */
  name?: string
  /**
   * The type of area (postcodes/polygon/group)
   */
  type?: string
  /**
   * The location details (comma delimited list of postcodes, group ids or lat/long coordinate groups)
   */
  area?: string[]
  /**
   * A collection of unique identifiers of departments associated to the area
   */
  departmentIds?: string[]
  /**
   * A collection of unique identifiers of offices associated to the area
   */
  officeIds?: string[]
  /**
   * The unique identifier of the parent area, if the area should be registered as a child area/group in an existing area group
   */
  parentId?: string
}
/**
 * Request body to set the address of a new company
 */
export interface CreateCompanyAddressModel {
  /**
   * The type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
 * Request body used to create a new company
 * example:
 * [object Object]
 */
export interface CreateCompanyModel {
  /**
   * The name of the company
   */
  name?: string
  /**
   * The branch name of the company
   */
  branch?: string
  /**
   * A free text field containing notes that describe the company's business or service offering
   */
  notes?: string
  /**
   * A flag determining whether or not the company is currently active
   */
  active?: boolean
  /**
   * A flag determining whether or not the company is VAT registered
   */
  vatRegistered?: boolean
  /**
   * A collection of unique identifiers of company types that categorise the type of business the company operates
   */
  typeIds?: string[]
  /**
   * The unique identifier of a supplier type, if the company is a supplier
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
   * The address of the company
   */
  address?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
   * App specific metadata to set against the company
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set an address against a new contact
 */
export interface CreateContactAddressModel {
  /**
   * The type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
   * The ISO-3166 country code that the address resides in
   */
  countryId?: string
}
/**
 * Request body used to create a new contact
 * example:
 * [object Object]
 */
export interface CreateContactModel {
  /**
   * The contact's title  (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * The contact's forename
   */
  forename?: string
  /**
   * The contact's surname
   */
  surname?: string
  /**
   * The contact's date of birth
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
  /**
   * A flag determining whether or not the contact is currently active
   */
  active?: boolean
  /**
   * The marketing consent status of the contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * The source of the contact
   */
  source?: {
    /**
     * The unique identifier of the source of the contact
     */
    id?: string
    /**
     * The source type (office/source)
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
   * A collection of unique identifiers of offices attached to the contact
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact
   */
  negotiatorIds?: string[]
  /**
   * The primary address of the contact
   */
  primaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * The secondary address of the contact
   */
  secondaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * The work address of the contact
   */
  workAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
  /**
   * App specific metadata to set against the contact
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the source of a new contact
 */
export interface CreateContactSourceModel {
  /**
   * The unique identifier of the source of the contact
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Request body used to create a new document
 * example:
 * [object Object]
 */
export interface CreateDocumentModel {
  /**
   * The type of entity that the document is associated with (appliance/applicant/bankStatement/batch/certificate/contact/depositCertificate/estate/estateUnit/idCheck/keySet/landlord/nominalTransaction/property/tenancy/tenancyCheck/tenancyRenewal/worksOrder)
   */
  associatedType?: string
  /**
   * The unique identifier of the entity that the document is associated with
   */
  associatedId?: string
  /**
   * The unique identifier of the type of document
   */
  typeId?: string
  /**
   * The filename of the document
   */
  name?: string
  /**
   * The base64 encoded document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
   */
  fileData?: string
}
/**
 * Request body used to create a new contact identity check
 * example:
 * [object Object]
 */
export interface CreateIdentityCheckModel {
  /**
   * The unique identifier of the contact associated to the identity check
   */
  contactId?: string
  /**
   * The date when the identity check was performed. This may differ to the date when the check was created
   * example:
   * 2019-08-14
   */
  checkDate?: string // date
  /**
   * The current status of the identity check (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * The unique identifier of the negotiator that initiated the identity check
   */
  negotiatorId?: string
  /**
   * The details of the first document that was provided as part of the identity check
   */
  identityDocument1?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
     */
    fileData?: string
    /**
     * The filename to store the document as
     */
    name?: string
  }
  /**
   * The details of the second document that was provided as part of the identity check
   */
  identityDocument2?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
     */
    fileData?: string
    /**
     * The filename to store the document as
     */
    name?: string
  }
  /**
   * App specific metadata to set against the identity check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body to attach an identity document to a new contact identity check
 */
export interface CreateIdentityDocumentModel {
  /**
   * The unique identifier of the type of identity document provided
   */
  typeId?: string
  /**
   * The date when the document expires and becomes invalid
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * Details regarding the identity document (eg. passport number)
   */
  details?: string
  /**
   * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
   */
  fileData?: string
  /**
   * The filename to store the document as
   */
  name?: string
}
/**
 * Request body used to create a new relationship between a landlord and a contact or company
 */
export interface CreateLandlordContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
   */
  associatedId?: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType?: string
}
/**
 * Request body used to create a new landlord
 * example:
 * [object Object]
 */
export interface CreateLandlordModel {
  /**
   * A flag determining whether or not the landlord is currently active
   */
  active?: boolean
  /**
   * The unique identifier of the company acting as the landlord's solicitor
   */
  solicitorId?: string
  /**
   * The unique identifier of the office that is associated to the landlord
   */
  officeId?: string
  /**
   * The source of the landlord
   */
  source?: {
    /**
     * The unique identifier of the source of the landlord
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of contacts and/or companies associated to the landlord. The first item in the collection is considered the primary relationship
   */
  related?: {
    /**
     * The unique identifier of the contact or company to create a relationship with
     */
    associatedId?: string
    /**
     * The type of relationship to create (contact/company)
     */
    associatedType?: string
  }[]
  /**
   * App specific metadata that to set against the landlord
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the source of a new landlord
 */
export interface CreateLandlordSourceModel {
  /**
   * The unique identifier of the source of the landlord
   */
  id?: string
  /**
   * The source type (office/source)
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
   * The name of the negotiator
   */
  name?: string
  /**
   * The job title of the negotiator
   */
  jobTitle?: string
  /**
   * A flag determining whether or not the negotiator is active
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
 * Request body used to create a new offer
 * example:
 * [object Object]
 */
export interface CreateOfferModel {
  /**
   * The unique identifier of the applicant associated to the offer
   */
  applicantId?: string
  /**
   * The unique identifier of the property associated to the offer
   */
  propertyId?: string
  /**
   * The unique identifier of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * The date when the offer was made
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The monetary amount of the offer
   */
  amount?: number // double
  /**
   * The current status of the offer (pending/withdrawn/rejected/accepted/noteOfInterest)
   */
  status?: string
  /**
   * A free text field describing items that should be included in the sale
   */
  inclusions?: string
  /**
   * A free text field describing items that are explicitly excluded from the sale
   */
  exclusions?: string
  /**
   * A free text field describing any other conditions set by either party that relate to the sale
   */
  conditions?: string
  /**
   * App specific metadata to set against the offer
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
 * example:
 * [object Object]
 */
export interface CreateOfficeModel {
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
   * The base64 encoded file content, prefixed with the content type (eg. data:image/jpeg;base64,VGVzdCBmaWxl)
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
  /**
   * The date the property is available from
   * example:
   * 2019-08-14
   */
  availableFrom?: string // date
  /**
   * The date the property is available to
   * example:
   * 2019-08-14
   */
  availableTo?: string // date
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
 * example:
 * [object Object]
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
     * example:
     * 2019-08-14
     */
    instructed?: string // date
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
       * example:
       * 2019-08-14
       */
      expiry?: string // date
    }
  }
  /**
   * Letting specific details about the property
   */
  letting?: {
    /**
     * The date the property was marked as to let
     * example:
     * 2019-08-14
     */
    instructed?: string // date
    /**
     * The date the property is available from
     * example:
     * 2019-08-14
     */
    availableFrom?: string // date
    /**
     * The date the property is available to
     * example:
     * 2019-08-14
     */
    availableTo?: string // date
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
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
     * example:
     * 2019-08-14
     */
    expiry?: string // date
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
   * example:
   * 2019-08-14
   */
  expiry?: string // date
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
 * Request body used to create a new task, which can also be an internal message
 * example:
 * [object Object]
 */
export interface CreateTaskModel {
  /**
   * The date the task becomes active
   * example:
   * 2019-08-14
   */
  activates?: string // date
  /**
   * The date the task was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
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
 * Representation of a department
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface DepartmentModel {
  /**
   * The unique identifier of the department
   */
  id?: string
  /**
   * The date and time when the department was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the department was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the department
   */
  name?: string
  /**
   * A collection of property type values that will be accepted by other services
   */
  typeOptions?: string[]
  /**
   * A collection of property style values that will be accepted by other services
   */
  styleOptions?: string[]
  /**
   * A collection of property situation values that will be accepted by other services
   */
  situationOptions?: string[]
  /**
   * A collection of property parking values that will be accepted by other services
   */
  parkingOptions?: string[]
  /**
   * A collection of property age values that will be accepted by other services
   */
  ageOptions?: string[]
  /**
   * A collection of property locality values that will be accepted by other services
   */
  localityOptions?: string[]
  /**
   * The ETag for the current version of the department. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
  Id?: string[]
  Name?: string
}
/**
 * Representation of a document
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface DocumentModel {
  /**
   * The unique identifier of the document
   */
  id?: string
  /**
   * The date and time when the document was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the document was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The type of entity that the document is associated with
   */
  associatedType?: string
  /**
   * The unique identifier of the entity that the document is associated with
   */
  associatedId?: string
  /**
   * The unique identifier of the type of document
   */
  typeId?: string
  /**
   * The filename of the document
   */
  name?: string
  /**
   * The ETag for the current version of the document. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
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
 * Representation of a contact identity check
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface IdentityCheckModel {
  /**
   * The unique identifier of the identity check
   */
  id?: string
  /**
   * The unique identifier of the contact associated to the identity check
   */
  contactId?: string
  /**
   * The date and time when the identity check was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the identity check was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The date when the identity check was performed. This may differ to the date when the check was created
   * example:
   * 2019-08-14
   */
  checkDate?: string // date
  /**
   * The current status of the identity check (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * The unique identifier of the negotiator that initiated the identity check
   */
  negotiatorId?: string
  /**
   * The details of the first document that was provided as part of the identity check
   */
  identityDocument1?: {
    /**
     * The unique identifier of the identity document
     */
    documentId?: string
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
  }
  /**
   * The details of the second document that was provided as part of the identity check
   */
  identityDocument2?: {
    /**
     * The unique identifier of the identity document
     */
    documentId?: string
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
  }
  /**
   * App specific metadata that has been set against the identity check
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the identity check. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
  SortBy?: string
  Id?: string[]
  ContactId?: string[]
  NegotiatorId?: string[]
  CheckDateFrom?: string
  CheckDateTo?: string
  CreatedFrom?: string
  CreatedTo?: string
  pageNumber?: number
  pageSize?: number
  Status?: ('unknown' | 'unchecked' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass')[]
}
/**
 * Representation of a single identity document that was provided as part of a contact identity check (eg. passport)
 */
export interface IdentityDocumentModel {
  /**
   * The unique identifier of the identity document
   */
  documentId?: string
  /**
   * The unique identifier of the type of identity document provided
   */
  typeId?: string
  /**
   * The date when the document expires and becomes invalid
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * Details regarding the identity document (eg. passport number)
   */
  details?: string
}
/**
 * Request body used to create or update a relationship between an applicant and a contact or company
 * example:
 * [object Object]
 */
export interface InsertApplicantContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
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
 * Request body used to create or update a relationship between a landlord and a contact or company
 * example:
 * [object Object]
 */
export interface InsertLandlordContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
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
 * Request body used to create or update a relationship between a vendor and a contact or company
 * example:
 * [object Object]
 */
export interface InsertVendorContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
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
 * Representation of the physical address of a building or premise
 */
export interface LandlordContactAddressModel {
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
 * A summarised view of the details of a contact associated to a landlord
 */
export interface LandlordContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The name of the contact
   */
  name?: string
  /**
   * The type of the contact (contact/company)
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
 * Representation of relationship between a landlord and a contact or company
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface LandlordContactRelationshipModel {
  /**
   * The unique identifier of the landlord relationship
   */
  id?: string
  /**
   * The unique identifier of the landlord
   */
  landlordId?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The type of related entity (contact/company)
   */
  associatedType?: string
  /**
   * The unique identifier of the related contact or company
   */
  associatedId?: string
  /**
   * A flag denoting whether or not the relationship should be regarded as the main relationship for the parent landlord entity
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
 * Representation of a landlord
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface LandlordModel {
  /**
   * The unique identifier of the landlord
   */
  id?: string
  /**
   * The date and time when the landlord was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the landlord was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * A flag determining whether or not the landlord is currently active
   */
  active?: boolean
  /**
   * The unique identifier of the company acting as the landlord's solicitor
   */
  solicitorId?: string
  /**
   * The unique identifier of the office that is associated to the landlord
   */
  officeId?: string
  /**
   * The source of the landlord
   */
  source?: {
    /**
     * The unique identifier of the source of the landlord
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of contacts and/or companies associated to the landlord. The first item in the collection is considered the primary relationship
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
     * The type of the contact (contact/company)
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
   * App specific metadata that has been set against the landlord
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the landlord. Used for managing update concurrency
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
 * Representation of a landlord's source
 */
export interface LandlordSourceModel {
  /**
   * The unique identifier of the source of the landlord
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
export interface Landlords {
  PageSize?: number
  PageNumber?: number
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
/**
 * Representation of a configuration item
 */
export interface ListItemModel {
  /**
   * The unique identifier of the list item
   */
  id?: string
  /**
   * The textual value for the list item
   */
  value?: string
}
/**
 * Representation of a negotiator
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface NegotiatorModel {
  /**
   * The unique identifier of the negotiator
   */
  id?: string
  /**
   * The date and time when the negotiator was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the negotiator was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
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
   * A flag determining whether or not the negotiator is active
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
   * App specific metadata that has been set against the negotiator
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
 * Representation of the physical address of a building or premise
 */
export interface OfferContactAddressModel {
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
   * The ISO-3166 country code that the address resides in
   */
  countryId?: string
}
/**
 * A summarised view of the details of a contact associated to an offer
 */
export interface OfferContactModel {
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The name of the contact
   */
  name?: string
  /**
   * The type of the contact (contact/company)
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
     * The ISO-3166 country code that the address resides in
     */
    countryId?: string
  }
}
/**
 * Representation of an offer
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface OfferModel {
  /**
   * The unique identifier of the offer
   */
  id?: string
  /**
   * The the date and time when the offer was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the offer was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * The unique identifier of the applicant associated to the offer
   */
  applicantId?: string
  /**
   * The unique identifier of the property associated to the offer
   */
  propertyId?: string
  /**
   * The unique identifier of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * The date when the offer was made
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The monetary amount of the offer
   */
  amount?: number // double
  /**
   * The current status of the offer (pending/withdrawn/rejected/accepted/noteOfInterest)
   */
  status?: string
  /**
   * A free text field describing items that should be included in the sale
   */
  inclusions?: string
  /**
   * A free text field describing items that are explicitly excluded from the sale
   */
  exclusions?: string
  /**
   * A free text field describing any other conditions set by either party that relate to the sale
   */
  conditions?: string
  /**
   * A collection of contacts associated to the offer
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
     * The type of the contact (contact/company)
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
       * The ISO-3166 country code that the address resides in
       */
      countryId?: string
    }
  }[]
  /**
   * App specific metadata that has been set against the offer
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the offer. Used for managing update concurrency
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
  PageSize?: number
  PageNumber?: number
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
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface OfficeModel {
  /**
   * The unique identifier of the office
   */
  id?: string
  /**
   * The date and time when the office was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the office was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
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
export interface PagedResultApplicantContactRelationshipModel_ {
  _embedded?: {
    /**
     * The unique identifier of the applicant relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the applicant
     */
    applicantId?: string
    /**
     * The type of related entity (contact/company)
     */
    associatedType?: string
    /**
     * The unique identifier of the related contact or company
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
export interface PagedResultApplicantModel_ {
  _embedded?: {
    /**
     * The unique identifier of the applicant
     */
    id?: string
    /**
     * The date and time when the applicant was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the applicant was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * Indicates whether the applicant is look to buy or rent a property (buying/renting)
     */
    marketingMode?: string
    /**
     * The ISO-4217 currency code that relates to monetary amounts specified by the applicant
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
     * example:
     * 2019-08-14
     */
    lastCall?: string // date
    /**
     * The date when the applicant is next due to be contacted
     * example:
     * 2019-08-14
     */
    nextCall?: string // date
    /**
     * The unique identifier of the department that the applicant requirements are associated with. The applicant will only match to properties with the same value
     */
    departmentId?: string
    /**
     * The unique identifier of the solicitor associated to the applicant
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
     * The applicant's location type (areas/addresses/none)
     */
    locationType?: string
    /**
     * The applicant's location options
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
       * example:
       * 2019-08-14
       */
      moveDate?: string // date
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
     * The source of the applicant
     */
    source?: {
      /**
       * The unique identifier of the applicant's source
       */
      id?: string
      /**
       * The source type (office/source)
       */
      type?: string
    }
    /**
     * A collection of unique identifiers of offices attached to the applicant. The first item in the collection is considered the primary office
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of negotiators attached to the applicant. The first item in the collection is considered the primary negotiator
     */
    negotiatorIds?: string[]
    /**
     * A collection of contacts and/or companies associated to the applicant. The first item in the collection is considered the primary relationship
     */
    related?: {
      /**
       * The unique identifier of the contact or company
       */
      id?: string
      /**
       * The name of the contact or company
       */
      name?: string
      /**
       * The type of the contact (company/contact)
       */
      type?: string
      /**
       * The home phone number of the contact or company
       */
      homePhone?: string
      /**
       * The work phone number of the contact or company
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact or company
       */
      mobilePhone?: string
      /**
       * The email address of the contact or company
       */
      email?: string
      /**
       * The primary address of the contact or company
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
     * App specific metadata that has been set against the applicant
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the applicant. Used for managing update concurrency
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
     * The unique identifier of the appointment
     */
    id?: string
    /**
     * The date and time when the appointment was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the appointment was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The date and time when the appointment will start
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    start?: string // date-time
    /**
     * The date and time when the appointment will end
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    end?: string // date-time
    /**
     * The unique identifier of the appointment type
     */
    typeId?: string
    /**
     * A free text description about the appointment
     */
    description?: string
    /**
     * A flag denoting whether or not the appointment recurs
     */
    recurring?: boolean
    /**
     * A flag denoting whether or not the appointment has been cancelled
     */
    cancelled?: boolean
    /**
     * Follow up information relating to the appointment
     */
    followUp?: {
      /**
       * The date when the appointment should be followed up
       * example:
       * 2019-08-14
       */
      due?: string // date
      /**
       * The unique identifier of a pre-defined follow up response type
       */
      responseId?: string
      /**
       * Free text internal follow up notes to be stored against the appointment
       */
      notes?: string
    }
    /**
     * The unique identifier of the property related to the appointment
     */
    propertyId?: string
    /**
     * The unique identifier of the negotiator that organised the appointment
     */
    organiserId?: string
    /**
     * A collection of unique identifiers of negotiators attached to the appointment
     */
    negotiatorIds?: string[]
    /**
     * A collection of unique identifiers of offices attached to the appointment
     */
    officeIds?: string[]
    /**
     * An appointment attendee
     */
    attendee?: {
      /**
       * The unique identifier of the attendee
       */
      id?: string
      /**
       * The type of attendee
       */
      type?: string
      /**
       * A collection of contacts relating to the attendee
       */
      contacts?: {
        /**
         * The unique identifier of the contact
         */
        id?: string
        /**
         * The name of the contact
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
     * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
     */
    accompanied?: boolean
    /**
     * A flag denoting whether or not the main negotiator has confirmed their attendance
     */
    negotiatorConfirmed?: boolean
    /**
     * A flag denoting whether or not the attendee has confirmed their attendance
     */
    attendeeConfirmed?: boolean
    /**
     * A flag denoting whether or not the property and/or property's vendor has confirmed their attendance
     */
    propertyConfirmed?: boolean
    /**
     * App specific metadata that has been set against the appointment
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the appointment. Used for managing update concurrency
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
     * The unique identifier of the area
     */
    id?: string
    /**
     * The date and time when the area was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the area was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The name of the area
     */
    name?: string
    /**
     * A flag denoting whether the area can currently be selected against properties and applicants
     */
    active?: boolean
    /**
     * The type of area (postcodes/polygon/group)
     */
    type?: string
    /**
     * The location details (comma delimited list of postcodes, group ids or lat/long coordinate groups)
     */
    area?: string[]
    /**
     * A collection of unique identifiers of departments associated to the area
     */
    departmentIds?: string[]
    /**
     * A collection of unique identifiers of offices associated to the area
     */
    officeIds?: string[]
    /**
     * The ETag for the current version of the area. Used for managing update concurrency
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
     * The unique identifier of the company
     */
    id?: string
    /**
     * The date and time when the company was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the company was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The name of the company
     */
    name?: string
    /**
     * The branch name of the company
     */
    branch?: string
    /**
     * A free text field containing notes that describe the company's business or service offering
     */
    notes?: string
    /**
     * A flag determining whether or not the company is currently active
     */
    active?: boolean
    /**
     * A flag determining whether or not the company is VAT registered
     */
    vatRegistered?: boolean
    /**
     * A collection of unique identifiers of company types that categorise the type of business the company operates
     */
    typeIds?: string[]
    /**
     * The unique identifier of a supplier type, if the company is a supplier
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
     * The address of the company
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
      country?: string
    }
    /**
     * App specific metadata that has been set against the company
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the company. Used for managing update concurrency
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
     * The unique identifier of the contact
     */
    id?: string
    /**
     * The date and time when the contact was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the contact was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The contact's title  (eg. Mr, Mrs, Miss, Dr)
     */
    title?: string
    /**
     * The contact's forename
     */
    forename?: string
    /**
     * The contact's surname
     */
    surname?: string
    /**
     * The contact's date of birth
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
    /**
     * A flag determining whether or not the contact is currently active
     */
    active?: boolean
    /**
     * The marketing consent status of the contact (grant/deny/notAsked)
     */
    marketingConsent?: string
    /**
     * The status of the last identity check performed against the contact (pass/fail/pending/cancelled/warnings/unchecked)
     */
    identityCheck?: string
    /**
     * The source of the contact
     */
    source?: {
      /**
       * The unique identifier of the source of the contact
       */
      id?: string
      /**
       * The source type (office/source)
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
     * The primary address of the contact
     */
    primaryAddress?: {
      /**
       * The type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
       * The ISO-3166 country code that the address resides in
       */
      countryId?: string
    }
    /**
     * The secondary address of the contact
     */
    secondaryAddress?: {
      /**
       * The type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
       * The ISO-3166 country code that the address resides in
       */
      countryId?: string
    }
    /**
     * The work address of the contact
     */
    workAddress?: {
      /**
       * The type of address (primary/secondary/home/work/forwarding/company/previous)
       */
      type?: string
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
       * The ISO-3166 country code that the address resides in
       */
      countryId?: string
    }
    /**
     * A collection of unique identifiers of offices attached to the contact
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of negotiators attached to the contact
     */
    negotiatorIds?: string[]
    /**
     * App specific metadata that has been set against the contact
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the contact. Used for managing update concurrency
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
     * The unique identifier of the department
     */
    id?: string
    /**
     * The date and time when the department was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the department was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The name of the department
     */
    name?: string
    /**
     * A collection of property type values that will be accepted by other services
     */
    typeOptions?: string[]
    /**
     * A collection of property style values that will be accepted by other services
     */
    styleOptions?: string[]
    /**
     * A collection of property situation values that will be accepted by other services
     */
    situationOptions?: string[]
    /**
     * A collection of property parking values that will be accepted by other services
     */
    parkingOptions?: string[]
    /**
     * A collection of property age values that will be accepted by other services
     */
    ageOptions?: string[]
    /**
     * A collection of property locality values that will be accepted by other services
     */
    localityOptions?: string[]
    /**
     * The ETag for the current version of the department. Used for managing update concurrency
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
     * The unique identifier of the document
     */
    id?: string
    /**
     * The date and time when the document was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the document was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The type of entity that the document is associated with
     */
    associatedType?: string
    /**
     * The unique identifier of the entity that the document is associated with
     */
    associatedId?: string
    /**
     * The unique identifier of the type of document
     */
    typeId?: string
    /**
     * The filename of the document
     */
    name?: string
    /**
     * The ETag for the current version of the document. Used for managing update concurrency
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
     * The unique identifier of the identity check
     */
    id?: string
    /**
     * The unique identifier of the contact associated to the identity check
     */
    contactId?: string
    /**
     * The date and time when the identity check was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the identity check was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The date when the identity check was performed. This may differ to the date when the check was created
     * example:
     * 2019-08-14
     */
    checkDate?: string // date
    /**
     * The current status of the identity check (pass/fail/pending/cancelled/warnings/unchecked)
     */
    status?: string
    /**
     * The unique identifier of the negotiator that initiated the identity check
     */
    negotiatorId?: string
    /**
     * The details of the first document that was provided as part of the identity check
     */
    identityDocument1?: {
      /**
       * The unique identifier of the identity document
       */
      documentId?: string
      /**
       * The unique identifier of the type of identity document provided
       */
      typeId?: string
      /**
       * The date when the document expires and becomes invalid
       * example:
       * 2019-08-14
       */
      expiry?: string // date
      /**
       * Details regarding the identity document (eg. passport number)
       */
      details?: string
    }
    /**
     * The details of the second document that was provided as part of the identity check
     */
    identityDocument2?: {
      /**
       * The unique identifier of the identity document
       */
      documentId?: string
      /**
       * The unique identifier of the type of identity document provided
       */
      typeId?: string
      /**
       * The date when the document expires and becomes invalid
       * example:
       * 2019-08-14
       */
      expiry?: string // date
      /**
       * Details regarding the identity document (eg. passport number)
       */
      details?: string
    }
    /**
     * App specific metadata that has been set against the identity check
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the identity check. Used for managing update concurrency
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
export interface PagedResultLandlordContactRelationshipModel_ {
  _embedded?: {
    /**
     * The unique identifier of the landlord relationship
     */
    id?: string
    /**
     * The unique identifier of the landlord
     */
    landlordId?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The type of related entity (contact/company)
     */
    associatedType?: string
    /**
     * The unique identifier of the related contact or company
     */
    associatedId?: string
    /**
     * A flag denoting whether or not the relationship should be regarded as the main relationship for the parent landlord entity
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
    /**
     * The unique identifier of the landlord
     */
    id?: string
    /**
     * The date and time when the landlord was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the landlord was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * A flag determining whether or not the landlord is currently active
     */
    active?: boolean
    /**
     * The unique identifier of the company acting as the landlord's solicitor
     */
    solicitorId?: string
    /**
     * The unique identifier of the office that is associated to the landlord
     */
    officeId?: string
    /**
     * The source of the landlord
     */
    source?: {
      /**
       * The unique identifier of the source of the landlord
       */
      id?: string
      /**
       * The source type (office/source)
       */
      type?: string
    }
    /**
     * A collection of contacts and/or companies associated to the landlord. The first item in the collection is considered the primary relationship
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
       * The type of the contact (contact/company)
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
     * App specific metadata that has been set against the landlord
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the landlord. Used for managing update concurrency
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the negotiator was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
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
     * A flag determining whether or not the negotiator is active
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
     * App specific metadata that has been set against the negotiator
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
     * The unique identifier of the offer
     */
    id?: string
    /**
     * The the date and time when the offer was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the offer was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * The unique identifier of the applicant associated to the offer
     */
    applicantId?: string
    /**
     * The unique identifier of the property associated to the offer
     */
    propertyId?: string
    /**
     * The unique identifier of the negotiator associated to the offer
     */
    negotiatorId?: string
    /**
     * The date when the offer was made
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The monetary amount of the offer
     */
    amount?: number // double
    /**
     * The current status of the offer (pending/withdrawn/rejected/accepted/noteOfInterest)
     */
    status?: string
    /**
     * A free text field describing items that should be included in the sale
     */
    inclusions?: string
    /**
     * A free text field describing items that are explicitly excluded from the sale
     */
    exclusions?: string
    /**
     * A free text field describing any other conditions set by either party that relate to the sale
     */
    conditions?: string
    /**
     * A collection of contacts associated to the offer
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
       * The type of the contact (contact/company)
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
         * The ISO-3166 country code that the address resides in
         */
        countryId?: string
      }
    }[]
    /**
     * App specific metadata that has been set against the offer
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the offer. Used for managing update concurrency
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the office was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the property image was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the property was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
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
       * example:
       * 2019-08-14
       */
      instructed?: string // date
      /**
       * The marketing price of the property
       */
      price?: number // double
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
         * example:
         * 2019-08-14
         */
        expiry?: string // date
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
       * example:
       * 2019-08-14
       */
      instructed?: string // date
      /**
       * The date the property is next available from
       * example:
       * 2019-08-14
       */
      availableFrom?: string // date
      /**
       * The date the property is available to
       * example:
       * 2019-08-14
       */
      availableTo?: string // date
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the source was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the task was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The date the task becomes active
     * example:
     * 2019-08-14
     */
    activates?: string // date
    /**
     * The date the task was completed
     * example:
     * 2019-08-14
     */
    completed?: string // date
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
export interface PagedResultVendorContactRelationshipModel_ {
  _embedded?: {
    /**
     * The unique identifier of the vendor relationship
     */
    id?: string
    /**
     * The unique identifier of the vendor
     */
    vendorId?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The type of related entity (contact/company)
     */
    associatedType?: string
    /**
     * The unique identifier of the related contact or company
     */
    associatedId?: string
    /**
     * A flag denoting whether or not this relationship should be regarded as the main relationship for the parent vendor entity
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
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the vendor was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The date the vendor was last called
     * example:
     * 2019-08-14
     */
    lastCall?: string // date
    /**
     * The date the vendor is next due to be called
     * example:
     * 2019-08-14
     */
    nextCall?: string // date
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
     * A collection of contacts and/or companies associated to the vendor. The first item in the collection is considered the primary relationship
     */
    related?: {
      /**
       * The unique identifier of the contact or company
       */
      id?: string
      /**
       * The name of the contact or company
       */
      name?: string
      /**
       * The type of the contact (company/contact)
       */
      type?: string
      /**
       * The home phone number of the contact or company
       */
      homePhone?: string
      /**
       * The work phone number of the contact or company
       */
      workPhone?: string
      /**
       * The mobile phone number of the contact or company
       */
      mobilePhone?: string
      /**
       * The email address of the contact or company
       */
      email?: string
      /**
       * The primary address of the contact or company
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
     * The unique identifier of the negotiator attached to the vendor. The first item in the collection is considered the primary negotiator
     */
    negotiatorId?: string
    /**
     * A collection of unique identifiers of offices attached to the vendor. The first item in the collection is considered the primary office
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
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface PropertyImageModel {
  /**
   * The unique identifier of the image, which is also the filename
   */
  id?: string
  /**
   * The date and time when the image was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the property image was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
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
  Type?: ('photograph' | 'map' | 'floorPlan' | 'epc')[]
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
  /**
   * The date the property is next available from
   * example:
   * 2019-08-14
   */
  availableFrom?: string // date
  /**
   * The date the property is available to
   * example:
   * 2019-08-14
   */
  availableTo?: string // date
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
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface PropertyModel {
  /**
   * The unique identifier of the property
   */
  id?: string
  /**
   * The date and time when the property was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the property was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
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
     * example:
     * 2019-08-14
     */
    instructed?: string // date
    /**
     * The marketing price of the property
     */
    price?: number // double
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
       * example:
       * 2019-08-14
       */
      expiry?: string // date
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
     * example:
     * 2019-08-14
     */
    instructed?: string // date
    /**
     * The date the property is next available from
     * example:
     * 2019-08-14
     */
    availableFrom?: string // date
    /**
     * The date the property is available to
     * example:
     * 2019-08-14
     */
    availableTo?: string // date
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
  /**
   * The marketing price of the property
   */
  price?: number // double
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
     * example:
     * 2019-08-14
     */
    expiry?: string // date
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
   * example:
   * 2019-08-14
   */
  expiry?: string // date
}
/**
 * Representation of a source of business
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface SourceModel {
  /**
   * The unique identifier of the source
   */
  id?: string
  /**
   * The date and time when the source was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the source was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
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
  Type?: string
  CreatedFrom?: string
  CreatedTo?: string
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
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface TaskModel {
  /**
   * The unique identifier of the task
   */
  id?: string
  /**
   * The date and time when the task was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the task was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The date the task becomes active
   * example:
   * 2019-08-14
   */
  activates?: string // date
  /**
   * The date the task was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
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
 * Request body used to update an existing applicant
 * example:
 * [object Object]
 */
export interface UpdateApplicantModel {
  /**
   * Indicates whether the applicant is look to buy or rent a property (buying/renting)
   */
  marketingMode?: string
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
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date when the applicant is next due to be contacted
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * The unique identifier of the department that the applicant requirements are associated with. The applicant will only match to properties with the same value
   */
  departmentId?: string
  /**
   * The unique identifier of the solicitor associated to the applicant
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
   * The applicant's location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * The applicant's location options
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
     * example:
     * 2019-08-14
     */
    moveDate?: string // date
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
     * A list of property furnishing requirements taken from the full listing of the associated department
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
   * The source of the applicant
   */
  source?: {
    /**
     * The unique identifier of the applicant's source
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A collection of unique identifiers of offices attached to the applicant. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the applicant. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * App specific metadata to set against the applicant
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
   * example:
   * 2019-08-14
   */
  moveDate?: string // date
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
   * A list of property furnishing requirements taken from the full listing of the associated department
   */
  furnishing?: string[]
}
/**
 * An applicant's source of enquiry
 */
export interface UpdateApplicantSourceModel {
  /**
   * The unique identifier of the applicant's source
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Represents an external attendee on an appointment
 */
export interface UpdateAppointmentAttendeeModel {
  /**
   * The unique identifier of the attendee
   */
  id?: string
  /**
   * The type of attendee (applicant/contact/landlord/tenant)
   */
  type?: string
  /**
   * A flag denoting whether or not the attendee has confirmed their attendance
   */
  confirmed?: boolean
}
/**
 * Represents the follow up information on a single appointment
 */
export interface UpdateAppointmentFollowUpModel {
  /**
   * The unique identifier of a pre-defined follow up response type
   */
  responseId?: string
  /**
   * The internal follow up notes to be stored against the appointment
   */
  notes?: string
}
/**
 * Request body used to update an existing calendar appointment
 * example:
 * [object Object]
 */
export interface UpdateAppointmentModel {
  /**
   * The date and time when the appointment will start
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  end?: string // date-time
  /**
   * The date when the appointment should be followed up
   * example:
   * 2019-08-14
   */
  followUpOn?: string // date
  /**
   * The unique identifier of the appointment type
   */
  typeId?: string
  /**
   * A free text description about the appointment
   */
  description?: string
  /**
   * The unique identifier of the property related to the appointment
   */
  propertyId?: string
  /**
   * The unique identifier of the negotiator that organised the appointment
   */
  organiserId?: string
  /**
   * A flag denoting whether or not the appointment has been cancelled
   */
  cancelled?: boolean
  /**
   * A collection of unique identifiers of negotiators attached to the appointment
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment
   */
  officeIds?: string[]
  /**
   * Details of the external appointment attendee
   */
  attendee?: {
    /**
     * The unique identifier of the attendee
     */
    id?: string
    /**
     * The type of attendee (applicant/contact/landlord/tenant)
     */
    type?: string
    /**
     * A flag denoting whether or not the attendee has confirmed their attendance
     */
    confirmed?: boolean
  }
  /**
   * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
   */
  accompanied?: boolean
  /**
   * A flag denoting whether or not the main negotiator has confirmed their attendance
   */
  negotiatorConfirmed?: boolean
  /**
   * A flag denoting whether or not the attendee has confirmed their attendance
   */
  attendeeConfirmed?: boolean
  /**
   * A flag denoting whether or not the property and/or property's vendor has confirmed their attendance
   */
  propertyConfirmed?: boolean
  /**
   * Details added when the appointment has been followed up
   */
  followUp?: {
    /**
     * The unique identifier of a pre-defined follow up response type
     */
    responseId?: string
    /**
     * The internal follow up notes to be stored against the appointment
     */
    notes?: string
  }
  /**
   * Details of the recurrence pattern for the appointment
   */
  recurrence?: {
    /**
     * The type of unit that the `interval` applies to
     */
    type?: string
    /**
     * The numeric value denoting how often the appointment will recur
     */
    interval?: number // int32
    /**
     * The date and time when the recurrence will stop
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    until?: string // date-time
  }
  /**
   * App specific metadata to set against the appointment
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Details of an appointment's recurrence pattern
 */
export interface UpdateAppointmentRecurrenceModel {
  /**
   * The type of unit that the `interval` applies to
   */
  type?: string
  /**
   * The numeric value denoting how often the appointment will recur
   */
  interval?: number // int32
  /**
   * The date and time when the recurrence will stop
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  until?: string // date-time
}
/**
 * Request body used to update an existing area
 * example:
 * [object Object]
 */
export interface UpdateAreaModel {
  /**
   * The name of the area
   */
  name?: string
  /**
   * The location details (comma delimited list of postcodes, group ids or lat/long coordinate groups)
   */
  area?: string[]
  /**
   * A collection of unique identifiers of departments associated to the area
   */
  departmentIds?: string[]
  /**
   * A collection of unique identifiers of offices associated to the area
   */
  officeIds?: string[]
}
/**
 * Request body to set the address of an existing company
 */
export interface UpdateCompanyAddressModel {
  /**
   * The type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
 * Request body used to update an existing company
 * example:
 * [object Object]
 */
export interface UpdateCompanyModel {
  /**
   * The name of the company
   */
  name?: string
  /**
   * The branch name of the company
   */
  branch?: string
  /**
   * A free text field containing notes that describe the company's business or service offering
   */
  notes?: string
  /**
   * A flag determining whether or not the company is currently active
   */
  active?: boolean
  /**
   * A flag determining whether or not the company is VAT registered
   */
  vatRegistered?: boolean
  /**
   * A collection of unique identifiers of company types that categorise the type of business the company operates
   */
  typeIds?: string[]
  /**
   * The unique identifier of a supplier type, if the company is a supplier
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
   * The address of the company
   */
  address?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
   * App specific metadata to set against the company
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update an address on an existing contact
 */
export interface UpdateContactAddressModel {
  /**
   * The type of address (primary/secondary/home/work/forwarding/company/previous)
   */
  type?: string
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
   * The ISO-3166 country code that the adderess resides in
   */
  countryId?: string
}
/**
 * Request body used to update an existing contact
 * example:
 * [object Object]
 */
export interface UpdateContactModel {
  /**
   * The contact's title  (eg. Mr, Mrs, Miss, Dr)
   */
  title?: string
  /**
   * The contact's forename
   */
  forename?: string
  /**
   * The contact's surname
   */
  surname?: string
  /**
   * The contact's date of birth
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
  /**
   * A flag determining whether or not the contact is currently active
   */
  active?: boolean
  /**
   * The marketing consent status of the contact (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * The source of the contact
   */
  source?: {
    /**
     * The unique identifier of the source of the contact
     */
    id?: string
    /**
     * The source type (office/source)
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
   * A collection of unique identifiers of offices attached to the contact
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact
   */
  negotiatorIds?: string[]
  /**
   * The primary address of the contact
   */
  primaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the adderess resides in
     */
    countryId?: string
  }
  /**
   * The secondary address of the contact
   */
  secondaryAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the adderess resides in
     */
    countryId?: string
  }
  /**
   * The work address of the contact
   */
  workAddress?: {
    /**
     * The type of address (primary/secondary/home/work/forwarding/company/previous)
     */
    type?: string
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
     * The ISO-3166 country code that the adderess resides in
     */
    countryId?: string
  }
  /**
   * App specific metadata to set against the contact
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update the source of an existing contact
 */
export interface UpdateContactSourceModel {
  /**
   * The unique identifier of the source of the contact
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Request body used to update an existing document
 * example:
 * [object Object]
 */
export interface UpdateDocumentModel {
  /**
   * The unique identifier of the type of document
   */
  typeId?: string
  /**
   * The filename of the document
   */
  name?: string
}
/**
 * Request body used to update an exist contact identity check
 * example:
 * [object Object]
 */
export interface UpdateIdentityCheckModel {
  /**
   * The date when the identity check was performed. This may differ to the date when the check was created
   * example:
   * 2019-08-14
   */
  checkDate?: string // date
  /**
   * The current status of the identity check (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status?: string
  /**
   * The unique identifier of the negotiator that initiated the identity check
   */
  negotiatorId?: string
  /**
   * The details of the first document that was provided as part of the identity check
   */
  identityDocument1?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
     */
    fileData?: string
    /**
     * The filename to store the document as
     */
    name?: string
  }
  /**
   * The details of the second document that was provided as part of the identity check
   */
  identityDocument2?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId?: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
     */
    fileData?: string
    /**
     * The filename to store the document as
     */
    name?: string
  }
  /**
   * App specific metadata to set against the identity check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body to update an identity document attached to an existing contact identity check
 */
export interface UpdateIdentityDocumentModel {
  /**
   * The unique identifier of the type of identity document provided
   */
  typeId?: string
  /**
   * The date when the document expires and becomes invalid
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * Details regarding the identity document (eg. passport number)
   */
  details?: string
  /**
   * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
   */
  fileData?: string
  /**
   * The filename to store the document as
   */
  name?: string
}
/**
 * Request body used to update an existing landlord
 * example:
 * [object Object]
 */
export interface UpdateLandlordModel {
  /**
   * A flag determining whether or not the landlord is currently active
   */
  active?: boolean
  /**
   * The unique identifier of the company acting as the landlord's solicitor
   */
  solicitorId?: string
  /**
   * The unique identifier of the office that is associated to the landlord
   */
  officeId?: string
  /**
   * The source of the landlord
   */
  source?: {
    /**
     * The unique identifier of the source of the landlord
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * App specific metadata that to set against the landlord
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update the source of an existing landlord
 */
export interface UpdateLandlordSourceModel {
  /**
   * The unique identifier of the source of the landlord
   */
  id?: string
  /**
   * The source type (office/source)
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
   * A flag determining whether or not the negotiator is active
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
 * Request body used to update an existing offer
 * example:
 * [object Object]
 */
export interface UpdateOfferModel {
  /**
   * The unique identifier of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * The date when the offer was made
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The monetary amount of the offer
   */
  amount?: number // double
  /**
   * The current status of the offer (pending/withdrawn/rejected/accepted/noteOfInterest)
   */
  status?: string
  /**
   * A free text field describing items that should be included in the sale
   */
  inclusions?: string
  /**
   * A free text field describing items that are explicitly excluded from the sale
   */
  exclusions?: string
  /**
   * A free text field describing any other conditions set by either party that relate to the sale
   */
  conditions?: string
  /**
   * App specific metadata to set against the offer
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
 * example:
 * [object Object]
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
  /**
   * The date the property is next available from
   * example:
   * 2019-08-14
   */
  availableFrom?: string // date
  /**
   * The date the property is available to
   * example:
   * 2019-08-14
   */
  availableTo?: string // date
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
 * example:
 * [object Object]
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
     * example:
     * 2019-08-14
     */
    instructed?: string // date
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
       * example:
       * 2019-08-14
       */
      expiry?: string // date
    }
  }
  /**
   * Letting specific details about the property
   */
  letting?: {
    /**
     * The date the property was marked as to let
     * example:
     * 2019-08-14
     */
    instructed?: string // date
    /**
     * The date the property is next available from
     * example:
     * 2019-08-14
     */
    availableFrom?: string // date
    /**
     * The date the property is available to
     * example:
     * 2019-08-14
     */
    availableTo?: string // date
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
   * example:
   * 2019-08-14
   */
  instructed?: string // date
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
     * example:
     * 2019-08-14
     */
    expiry?: string // date
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
   * example:
   * 2019-08-14
   */
  expiry?: string // date
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
 * Request body used to update an existing task, which can also be an internal message
 * example:
 * [object Object]
 */
export interface UpdateTaskModel {
  /**
   * The date the task becomes active
   * example:
   * 2019-08-14
   */
  activates?: string // date
  /**
   * The date the task was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
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
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date the vendor is next due to be called
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
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
 * A summarised view of the details of a contact or company associated to a vendor
 */
export interface VendorContactModel {
  /**
   * The unique identifier of the contact or company
   */
  id?: string
  /**
   * The name of the contact or company
   */
  name?: string
  /**
   * The type of the contact (company/contact)
   */
  type?: string
  /**
   * The home phone number of the contact or company
   */
  homePhone?: string
  /**
   * The work phone number of the contact or company
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact or company
   */
  mobilePhone?: string
  /**
   * The email address of the contact or company
   */
  email?: string
  /**
   * The primary address of the contact or company
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
 * Representation of a relationship between a vendor and a contact or company
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface VendorContactRelationshipModel {
  /**
   * The unique identifier of the vendor relationship
   */
  id?: string
  /**
   * The unique identifier of the vendor
   */
  vendorId?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The type of related entity (contact/company)
   */
  associatedType?: string
  /**
   * The unique identifier of the related contact or company
   */
  associatedId?: string
  /**
   * A flag denoting whether or not this relationship should be regarded as the main relationship for the parent vendor entity
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
 * Representation of a vendor
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface VendorModel {
  /**
   * The unique identifier of the vendor
   */
  id?: string
  /**
   * The date and time when the vendor was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the vendor was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The date the vendor was last called
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date the vendor is next due to be called
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
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
   * A collection of contacts and/or companies associated to the vendor. The first item in the collection is considered the primary relationship
   */
  related?: {
    /**
     * The unique identifier of the contact or company
     */
    id?: string
    /**
     * The name of the contact or company
     */
    name?: string
    /**
     * The type of the contact (company/contact)
     */
    type?: string
    /**
     * The home phone number of the contact or company
     */
    homePhone?: string
    /**
     * The work phone number of the contact or company
     */
    workPhone?: string
    /**
     * The mobile phone number of the contact or company
     */
    mobilePhone?: string
    /**
     * The email address of the contact or company
     */
    email?: string
    /**
     * The primary address of the contact or company
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
   * The unique identifier of the negotiator attached to the vendor. The first item in the collection is considered the primary negotiator
   */
  negotiatorId?: string
  /**
   * A collection of unique identifiers of offices attached to the vendor. The first item in the collection is considered the primary office
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
