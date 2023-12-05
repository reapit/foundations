/**
 * Representation of additional contact details
 */
export interface AdditionalCompanyContactDetailsModel {
  /**
   * The type of contact detail
   */
  type?: string
  /**
   * The contact detail
   */
  value?: string
}
/**
 * Representation of additional contact details
 */
export interface AdditionalContactDetailModel {
  /**
   * The type of contact detail
   */
  type?: string
  /**
   * The contact detail
   */
  value?: string
}
/**
 * Representation of additional contact details
 */
export interface AdditionalOfficeContactDetailsModel {
  /**
   * The type of contact detail
   */
  type?: string
  /**
   * The contact detail
   */
  value?: string
}
/**
 * Model for exposing error details to API consumers
 */
export interface ApiErrorModel {
  statusCode?:
    | 100
    | 101
    | 102
    | 103
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 421
    | 422
    | 423
    | 424
    | 426
    | 428
    | 429
    | 431
    | 451
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 510
    | 511 // int32
  /**
   * The date and time that this error event occurred
   * example:
   * 2019-08-14T12:30:02Z
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
  /**
   * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * The identifier of the applicant's buying reason
   */
  reasonId?: string
  /**
   * The identifier of the applicant's selling position
   */
  positionId?: string
  /**
   * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
   */
  tenure?: string[]
  /**
   * The date when the applicant's current mortgage expires/is due for renewal
   * example:
   * 2019-08-14
   */
  mortgageExpiry?: string // date
  /**
   * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
   */
  leaseRemaining?: {
    /**
     * The minimum number of years that must remain on the lease of a leasehold property
     */
    min?: number // int32
    /**
     * The maximum number of years that must remain on the lease of a leasehold property
     */
    max?: number // int32
  }
}
/**
 * An applicant's commercial details
 */
export interface ApplicantCommercialModel {
  /**
   * The commercial use requirements (eg a1, a2, b1), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  useClass?: string[]
  /**
   * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  floorLevel?: string[]
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
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The date of birth of the contact (Available when 'type' is 'contact')
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
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
   * A flag denoting whether or not this relationship is archived
   */
  fromArchive?: boolean
  /**
   * Representation of the physical address of a building or premise
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
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
}
/**
 * Representation of a relationship between an applicant and a contact or company
 */
export interface ApplicantContactRelationshipModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the applicant relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
  /**
   * A flag denoting whether or not this relationship is archived
   */
  fromArchive?: boolean
}
export interface ApplicantContactRelationshipModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the applicant relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
    /**
     * A flag denoting whether or not this relationship is archived
     */
    fromArchive?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
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
 * Details of regional information specific to Guernsey
 */
export interface ApplicantGuernseyModel {
  /**
   * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
   */
  market?: string[]
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
 * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
 */
export interface ApplicantLeaseRemaining {
  /**
   * The minimum number of years that must remain on the lease of a leasehold property
   */
  min?: number // int32
  /**
   * The maximum number of years that must remain on the lease of a leasehold property
   */
  max?: number // int32
}
/**
 * Representation of an applicant
 */
export interface ApplicantModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the applicant
   */
  id?: string
  /**
   * The date and time when the applicant was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the applicant was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The applicant's selling status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  sellingStatus?: string
  /**
   * The applicant's selling position (nothingToSell/renting/sellingWithUs/sellingWithOtherAgent/sellingPrivately/notYetOnMarket)
   */
  sellingPosition?: string
  /**
   * The status id of the applicant
   */
  statusId?: string
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
   * The unique identifier of the department the applicant is associated with. The applicant will only match to properties with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
   */
  departmentId?: string
  /**
   * The unique identifier of the solicitor associated to the applicant
   */
  solicitorId?: string
  /**
   * A flag determining whether or not the applicant is a potential client
   */
  potentialClient?: boolean
  /**
   * The applicant's property type requirements (eg house, bungalow, land), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  type?: string[]
  /**
   * The applicant's property style requirements (eg detached, semiDetached), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  style?: string[]
  /**
   * The applicant's requirements for other aspects of prospective properties - such as outside space - as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  situation?: string[]
  /**
   * The applicant's parking requirements (eg garage), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  parking?: string[]
  /**
   * The applicant's property age requirements (eg new, period), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  age?: string[]
  /**
   * The applicant's general property location requirements (eg rural, townCity), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  locality?: string[]
  /**
   * The applicant's special feature property requirements (eg swimmingPool, tennisCourt), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
  /**
   * The requirements associated to the applicant which are not currently mapped. These are defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  unmappedRequirements?: {
    /**
     * The type of unmapped requirement
     */
    type?: string
    /**
     * The value associated to the unmapped type
     */
    value?: string
  }[]
  /**
   * The minimum number of bedrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bedroomsMin?: number // int32
  /**
   * The maximum number of bedrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bedroomsMax?: number // int32
  /**
   * The minimum number of reception rooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  receptionsMin?: number // int32
  /**
   * The maximum number of reception rooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  receptionsMax?: number // int32
  /**
   * The minimum number of bathrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bathroomsMin?: number // int32
  /**
   * The maximum number of bathrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bathroomsMax?: number // int32
  /**
   * The minimum number of parking spaces the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  parkingSpacesMin?: number // int32
  /**
   * The maximum number of parking spaces the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  parkingSpacesMax?: number // int32
  /**
   * The applicant's location type (areas/addresses/none)
   */
  locationType?: string
  /**
   * The applicant's location options
   */
  locationOptions?: string[]
  /**
   * The date and time the applicant was archived
   * example:
   * 2019-08-14T12:30:02Z
   */
  archivedOn?: string // date-time
  /**
   * A flag denoting whether or not this applicant is archived
   */
  fromArchive?: boolean
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
    /**
     * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * The identifier of the applicant's buying reason
     */
    reasonId?: string
    /**
     * The identifier of the applicant's selling position
     */
    positionId?: string
    /**
     * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
     */
    tenure?: string[]
    /**
     * The date when the applicant's current mortgage expires/is due for renewal
     * example:
     * 2019-08-14
     */
    mortgageExpiry?: string // date
    /**
     * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
     */
    leaseRemaining?: {
      /**
       * The minimum number of years that must remain on the lease of a leasehold property
       */
      min?: number // int32
      /**
       * The maximum number of years that must remain on the lease of a leasehold property
       */
      max?: number // int32
    }
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
    /**
     * The identifier of the applicant's renting position
     */
    positionId?: string
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
   * An applicant's source of enquiry
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
   * An applicant's commercial details
   */
  commercial?: {
    /**
     * The commercial use requirements (eg a1, a2, b1), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    useClass?: string[]
    /**
     * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    floorLevel?: string[]
  }
  /**
   * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Details of regional information specific to Guernsey
     */
    ggy?: {
      /**
       * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
       */
      market?: string[]
    }
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
     * The complete name of the contact or company
     */
    name?: string
    /**
     * The title of the contact (Available when 'type' is 'contact')
     */
    title?: string
    /**
     * The forename of the contact (Available when 'type' is 'contact')
     */
    forename?: string
    /**
     * The surname of the contact (Available when 'type' is 'contact')
     */
    surname?: string
    /**
     * The date of birth of the contact (Available when 'type' is 'contact')
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
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
     * A flag denoting whether or not this relationship is archived
     */
    fromArchive?: boolean
    /**
     * Representation of the physical address of a building or premise
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
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
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
}
export interface ApplicantModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the applicant
     */
    id?: string
    /**
     * The date and time when the applicant was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the applicant was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The applicant's selling status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    sellingStatus?: string
    /**
     * The applicant's selling position (nothingToSell/renting/sellingWithUs/sellingWithOtherAgent/sellingPrivately/notYetOnMarket)
     */
    sellingPosition?: string
    /**
     * The status id of the applicant
     */
    statusId?: string
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
     * The unique identifier of the department the applicant is associated with. The applicant will only match to properties with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
     */
    departmentId?: string
    /**
     * The unique identifier of the solicitor associated to the applicant
     */
    solicitorId?: string
    /**
     * A flag determining whether or not the applicant is a potential client
     */
    potentialClient?: boolean
    /**
     * The applicant's property type requirements (eg house, bungalow, land), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    type?: string[]
    /**
     * The applicant's property style requirements (eg detached, semiDetached), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    style?: string[]
    /**
     * The applicant's requirements for other aspects of prospective properties - such as outside space - as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    situation?: string[]
    /**
     * The applicant's parking requirements (eg garage), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    parking?: string[]
    /**
     * The applicant's property age requirements (eg new, period), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    age?: string[]
    /**
     * The applicant's general property location requirements (eg rural, townCity), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    locality?: string[]
    /**
     * The applicant's special feature property requirements (eg swimmingPool, tennisCourt), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    specialFeatures?: string[]
    /**
     * The requirements associated to the applicant which are not currently mapped. These are defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    unmappedRequirements?: {
      /**
       * The type of unmapped requirement
       */
      type?: string
      /**
       * The value associated to the unmapped type
       */
      value?: string
    }[]
    /**
     * The minimum number of bedrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bedroomsMin?: number // int32
    /**
     * The maximum number of bedrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bedroomsMax?: number // int32
    /**
     * The minimum number of reception rooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    receptionsMin?: number // int32
    /**
     * The maximum number of reception rooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    receptionsMax?: number // int32
    /**
     * The minimum number of bathrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bathroomsMin?: number // int32
    /**
     * The maximum number of bathrooms the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bathroomsMax?: number // int32
    /**
     * The minimum number of parking spaces the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    parkingSpacesMin?: number // int32
    /**
     * The maximum number of parking spaces the applicant requires. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    parkingSpacesMax?: number // int32
    /**
     * The applicant's location type (areas/addresses/none)
     */
    locationType?: string
    /**
     * The applicant's location options
     */
    locationOptions?: string[]
    /**
     * The date and time the applicant was archived
     * example:
     * 2019-08-14T12:30:02Z
     */
    archivedOn?: string // date-time
    /**
     * A flag denoting whether or not this applicant is archived
     */
    fromArchive?: boolean
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
      /**
       * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
       */
      decoration?: string[]
      /**
       * The identifier of the applicant's buying reason
       */
      reasonId?: string
      /**
       * The identifier of the applicant's selling position
       */
      positionId?: string
      /**
       * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
       */
      tenure?: string[]
      /**
       * The date when the applicant's current mortgage expires/is due for renewal
       * example:
       * 2019-08-14
       */
      mortgageExpiry?: string // date
      /**
       * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
       */
      leaseRemaining?: {
        /**
         * The minimum number of years that must remain on the lease of a leasehold property
         */
        min?: number // int32
        /**
         * The maximum number of years that must remain on the lease of a leasehold property
         */
        max?: number // int32
      }
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
      /**
       * The identifier of the applicant's renting position
       */
      positionId?: string
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
     * An applicant's source of enquiry
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
     * An applicant's commercial details
     */
    commercial?: {
      /**
       * The commercial use requirements (eg a1, a2, b1), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
       */
      useClass?: string[]
      /**
       * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
       */
      floorLevel?: string[]
    }
    /**
     * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
     */
    regional?: {
      /**
       * Details of regional information specific to Guernsey
       */
      ggy?: {
        /**
         * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
         */
        market?: string[]
      }
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
       * The complete name of the contact or company
       */
      name?: string
      /**
       * The title of the contact (Available when 'type' is 'contact')
       */
      title?: string
      /**
       * The forename of the contact (Available when 'type' is 'contact')
       */
      forename?: string
      /**
       * The surname of the contact (Available when 'type' is 'contact')
       */
      surname?: string
      /**
       * The date of birth of the contact (Available when 'type' is 'contact')
       * example:
       * 2019-08-14
       */
      dateOfBirth?: string // date
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
       * A flag denoting whether or not this relationship is archived
       */
      fromArchive?: boolean
      /**
       * Representation of the physical address of a building or premise
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
      /**
       * A collection of additional contact details
       */
      additionalContactDetails?: {
        /**
         * The type of contact detail
         */
        type?: string
        /**
         * The contact detail
         */
        value?: string
      }[]
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface ApplicantRegionalModel {
  /**
   * Details of regional information specific to Guernsey
   */
  ggy?: {
    /**
     * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
     */
    market?: string[]
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
  /**
   * The identifier of the applicant's renting position
   */
  positionId?: string
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
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: (
    | 'appointments'
    | 'areas'
    | 'department'
    | 'documents'
    | 'negotiators'
    | 'offers'
    | 'offices'
    | 'solicitor'
    | 'source'
  )[]
  id?: string[]
  age?: ('period' | 'new' | 'modern' | 'old')[]
  contactDetail?: string[]
  emailAddresses?: string[]
  furnishing?: ('furnished' | 'unfurnished' | 'partFurnished')[]
  locality?: ('rural' | 'village' | 'townCity')[]
  negotiatorId?: string[]
  officeId?: string[]
  parking?: (
    | 'residents'
    | 'offStreet'
    | 'secure'
    | 'underground'
    | 'garage'
    | 'doubleGarage'
    | 'tripleGarage'
    | 'carport'
  )[]
  situation?: (
    | 'garden'
    | 'land'
    | 'patio'
    | 'roofTerrace'
    | 'conservatory'
    | 'balcony'
    | 'communalGardens'
    | 'outsideSpace'
  )[]
  style?: (
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
    | 'duplex'
  )[]
  type?: (
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
  market?: ('local' | 'openA' | 'openB' | 'openC' | 'openD')[]
  address?: string
  departmentId?: string
  marketingMode?: ('buying' | 'renting')[]
  name?: string
  nameType?: ('surname' | 'initials' | 'full' | 'companyName')[]
  priceFrom?: number
  priceTo?: number
  rentFrom?: number
  rentTo?: number
  rentFrequency?: ('weekly' | 'monthly' | 'annually')[]
  bedroomsFrom?: number
  bedroomsTo?: number
  active?: boolean
  fromArchive?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  hasLastCall?: boolean
  lastCallFrom?: string
  lastCallTo?: string
  nextCallFrom?: string
  nextCallTo?: string
  hasNextCall?: boolean
  metadata?: string[]
  locationOptions?: string
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
    /**
     * A flag determining if the related contact is archived
     */
    fromArchive?: boolean
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
  /**
   * A flag determining if the related contact is archived
   */
  fromArchive?: boolean
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the appointment
   */
  id?: string
  /**
   * The date and time when the appointment was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the appointment was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The date and time when the appointment will start
   * example:
   * 2019-08-14T12:30:02Z
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02Z
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
   * Representation of an appointments recurrence details
   */
  recurrence?: {
    /**
     * The recurrence interval
     */
    interval?: number // int32
    /**
     * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
     */
    type?: string
    /**
     * The date the appointment recurs until
     * example:
     * 2019-08-14T12:30:02Z
     */
    until?: string // date-time
  }
  /**
   * A flag denoting whether or not the appointment has been cancelled
   */
  cancelled?: boolean
  /**
   * Follow up information relating to an appointment
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
   * A collection of unique identifiers of negotiators attached to the appointment. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment. The first item in the collection is considered the primary office
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
      /**
       * A flag determining if the related contact is archived
       */
      fromArchive?: boolean
    }[]
  }
  /**
   * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
   */
  accompanied?: boolean
  /**
   * A flag denoting whether or not the appointment is a subsequent appointment to a previous one (a repeat appointment for the same attendee)
   */
  isRepeat?: boolean
  /**
   * A flag denoting whether or not the appointment is virtual
   */
  virtual?: boolean
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
   * A flag determining whether or not the appointment is archived
   */
  fromArchive?: boolean
  /**
   * The unique identifier of the external company either carrying out or attending the appointment with the agent
   */
  otherAgentId?: string
  /**
   * App specific metadata that has been set against the appointment
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the appointment. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface AppointmentModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the appointment
     */
    id?: string
    /**
     * The date and time when the appointment was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the appointment was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The date and time when the appointment will start
     * example:
     * 2019-08-14T12:30:02Z
     */
    start?: string // date-time
    /**
     * The date and time when the appointment will end
     * example:
     * 2019-08-14T12:30:02Z
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
     * Representation of an appointments recurrence details
     */
    recurrence?: {
      /**
       * The recurrence interval
       */
      interval?: number // int32
      /**
       * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
       */
      type?: string
      /**
       * The date the appointment recurs until
       * example:
       * 2019-08-14T12:30:02Z
       */
      until?: string // date-time
    }
    /**
     * A flag denoting whether or not the appointment has been cancelled
     */
    cancelled?: boolean
    /**
     * Follow up information relating to an appointment
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
     * A collection of unique identifiers of negotiators attached to the appointment. The first item in the collection is considered the primary negotiator
     */
    negotiatorIds?: string[]
    /**
     * A collection of unique identifiers of offices attached to the appointment. The first item in the collection is considered the primary office
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
        /**
         * A flag determining if the related contact is archived
         */
        fromArchive?: boolean
      }[]
    }
    /**
     * A flag denoting whether or not the appointment will be accompanied by one or more negotiators
     */
    accompanied?: boolean
    /**
     * A flag denoting whether or not the appointment is a subsequent appointment to a previous one (a repeat appointment for the same attendee)
     */
    isRepeat?: boolean
    /**
     * A flag denoting whether or not the appointment is virtual
     */
    virtual?: boolean
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
     * A flag determining whether or not the appointment is archived
     */
    fromArchive?: boolean
    /**
     * The unique identifier of the external company either carrying out or attending the appointment with the agent
     */
    otherAgentId?: string
    /**
     * App specific metadata that has been set against the appointment
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the appointment. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Appointments {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('negotiators' | 'offices' | 'organiser' | 'property' | 'type')[]
  id?: string[]
  typeId?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  propertyId?: string[]
  attendeeId?: string[]
  attendeeType?: ('applicant' | 'contact' | 'landlord' | 'tenancy')[]
  start?: string
  end?: string
  includeCancelled?: boolean
  includeUnconfirmed?: boolean
  fromArchive?: boolean
  followUpFrom?: string
  followUpTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  extrasField?: string[]
  metadata?: string[]
}
/**
 * Representation of an area that properties reside in, or applicants are looking to buy/rent in
 */
export interface AreaModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the area
   */
  id?: string
  /**
   * The date and time when the area was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the area was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * A collection of unique identifiers of offices attached to the area. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of parent area groups that this area is part of
   * This information can be used to understand the area hierarchy in a customer's system
   */
  parentIds?: string[]
  /**
   * The ETag for the current version of the area. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface AreaModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the area
     */
    id?: string
    /**
     * The date and time when the area was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the area was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * A collection of unique identifiers of offices attached to the area. The first item in the collection is considered the primary office
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of parent area groups that this area is part of
     * This information can be used to understand the area hierarchy in a customer's system
     */
    parentIds?: string[]
    /**
     * The ETag for the current version of the area. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Areas {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  departmentId?: string[]
  officeId?: string[]
  name?: string
  active?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
}
/**
 * Representation of a cerificate
 */
export interface CertificateModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the certificate
   */
  id?: string
  /**
   * The date and time when the certificate was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the certificate was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The certificate's category (safetyCertificate/insurancePolicy/warranty)
   */
  category?: string
  /**
   * The certificate's type
   */
  typeId?: string
  /**
   * The certificate's start date
   * example:
   * 2019-08-14T12:30:02Z
   */
  start?: string // date-time
  /**
   * The certificate's expiry date
   * example:
   * 2019-08-14T12:30:02Z
   */
  expiry?: string // date-time
  /**
   * The unique identifier of the property
   */
  propertyId?: string
  /**
   * The unique identifier of the company
   */
  companyId?: string
  /**
   * The unique identifier of the certificates status
   */
  statusId?: string
  /**
   * Any general notes regarding the certificate
   */
  notes?: string
  /**
   * The certificate's reference number
   */
  referenceNumber?: string
  /**
   * The ETag for the current version of the certificate. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface CertificateModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the certificate
     */
    id?: string
    /**
     * The date and time when the certificate was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the certificate was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The certificate's category (safetyCertificate/insurancePolicy/warranty)
     */
    category?: string
    /**
     * The certificate's type
     */
    typeId?: string
    /**
     * The certificate's start date
     * example:
     * 2019-08-14T12:30:02Z
     */
    start?: string // date-time
    /**
     * The certificate's expiry date
     * example:
     * 2019-08-14T12:30:02Z
     */
    expiry?: string // date-time
    /**
     * The unique identifier of the property
     */
    propertyId?: string
    /**
     * The unique identifier of the company
     */
    companyId?: string
    /**
     * The unique identifier of the certificates status
     */
    statusId?: string
    /**
     * Any general notes regarding the certificate
     */
    notes?: string
    /**
     * The certificate's reference number
     */
    referenceNumber?: string
    /**
     * The ETag for the current version of the certificate. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a certificate type
 */
export interface CertificateTypeModel {
  /**
   * The unique identifier of the list item
   */
  id?: string
  /**
   * The textual value for the list item
   */
  value?: string
  /**
   * The configurable statuses associated to the certificate type
   */
  statuses?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
}
/**
 * Request body used for checking in a key
 * example:
 * [object Object]
 */
export interface CheckInKeyModel {
  /**
   * The unique identifier of the negotiator who performed the key check in
   */
  checkInNegotiatorId?: string
}
/**
 * Representation of a check list item
 */
export interface CheckListItemModel {
  /**
   * The name of the check list item
   */
  name?: string
  /**
   * A flag to determine if the item is completed
   */
  completed?: boolean
  /**
   * The date when the item was completed
   * example:
   * 2019-08-14
   */
  completedDate?: string // date
}
export interface Companies {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('companyTypes' | 'relationships')[]
  id?: string[]
  address?: string
  branch?: string
  name?: string
  typeId?: string
  negotiatorId?: string[]
  officeId?: string[]
  contactDetail?: string[]
  fromArchive?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
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
 */
export interface CompanyModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the company
   */
  id?: string
  /**
   * The date and time when the company was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the company was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The marketing consent status of the company (deny/notAsked)
   */
  marketingConsent?: string
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
   * The date and time the company was archived
   * example:
   * 2019-08-14T12:30:02Z
   */
  archivedOn?: string // date-time
  /**
   * A flag determining whether or not the company is archived
   */
  fromArchive?: boolean
  /**
   * Representation of the physical address of a building or premise
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
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
  /**
   * A collection of unique identifiers of offices attached to the company. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the company. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
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
  /**
   * A list of relationships belonging to the company. This is later removed from the response
   */
  relationships?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the related company
     */
    companyId?: string
    /**
     * The type of related entity (applicant/landlord/offer/tenancy/vendor)
     */
    associatedType?: string
    /**
     * The unique identifier of the related entity
     */
    associatedId?: string
    /**
     * Flag to determine if this role on the system is now archived
     */
    fromArchive?: boolean
  }[]
}
export interface CompanyModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the company
     */
    id?: string
    /**
     * The date and time when the company was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the company was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The marketing consent status of the company (deny/notAsked)
     */
    marketingConsent?: string
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
     * The date and time the company was archived
     * example:
     * 2019-08-14T12:30:02Z
     */
    archivedOn?: string // date-time
    /**
     * A flag determining whether or not the company is archived
     */
    fromArchive?: boolean
    /**
     * Representation of the physical address of a building or premise
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
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
    /**
     * A collection of unique identifiers of offices attached to the company. The first item in the collection is considered the primary office
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of negotiators attached to the company. The first item in the collection is considered the primary negotiator
     */
    negotiatorIds?: string[]
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
    /**
     * A list of relationships belonging to the company. This is later removed from the response
     */
    relationships?: {
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: any
      }
      /**
       * The unique identifier of the relationship
       */
      id?: string
      /**
       * The date and time when the relationship was created
       * example:
       * 2019-08-14T12:30:02Z
       */
      created?: string // date-time
      /**
       * The date and time when the relationship was last modified
       * example:
       * 2019-08-14T12:30:02Z
       */
      modified?: string // date-time
      /**
       * The unique identifier of the related company
       */
      companyId?: string
      /**
       * The type of related entity (applicant/landlord/offer/tenancy/vendor)
       */
      associatedType?: string
      /**
       * The unique identifier of the related entity
       */
      associatedId?: string
      /**
       * Flag to determine if this role on the system is now archived
       */
      fromArchive?: boolean
    }[]
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of the roles that an individual companies possesses
 */
export interface CompanyRoleModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the related company
   */
  companyId?: string
  /**
   * The type of related entity (applicant/landlord/offer/tenancy/vendor)
   */
  associatedType?: string
  /**
   * The unique identifier of the related entity
   */
  associatedId?: string
  /**
   * Flag to determine if this role on the system is now archived
   */
  fromArchive?: boolean
}
export interface CompanyRoleModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the related company
     */
    companyId?: string
    /**
     * The type of related entity (applicant/landlord/offer/tenancy/vendor)
     */
    associatedType?: string
    /**
     * The unique identifier of the related entity
     */
    associatedId?: string
    /**
     * Flag to determine if this role on the system is now archived
     */
    fromArchive?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface ConfigurationApplicantStatuses {
  id?: string[]
}
export interface ConfigurationCompanyTypes {
  id?: string[]
}
export interface ConfigurationContactCategories {
  id?: string[]
}
export interface ConfigurationPortalTypes {
  id?: string[]
}
export interface ConfigurationPreTenancyCheckTypes {
  active?: boolean
  officeId?: string[]
}
export interface ConfigurationRenewalCheckTypes {
  active?: boolean
  officeId?: string[]
}
export interface ConfigurationTenancyRenewalOptionConditions {
  id?: string[]
}
export interface ConfigurationTenancyRenewalOptions {
  id?: string[]
}
export interface ConfigurationTypes {
  type?: (
    | 'agencyTypes'
    | 'appointmentTypes'
    | 'applicantStatuses'
    | 'boardStatuses'
    | 'buyingPositions'
    | 'buyingReasons'
    | 'certificateTypes'
    | 'companyTypes'
    | 'contactCategories'
    | 'identityDocumentTypes'
    | 'documentTypes'
    | 'journalEntryTypes'
    | 'keyTypes'
    | 'followUpResponses'
    | 'sellingReasons'
    | 'rentInsuranceCancellationReasons'
    | 'rentingPositions'
    | 'supplierTypes'
    | 'taskTypes'
    | 'tenancyLegalStatuses'
    | 'tenancyTypes'
    | 'vendorTypes'
    | 'worksOrderTypes'
  )[]
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
 */
export interface ContactModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the contact
   */
  id?: string
  /**
   * The date and time when the contact was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the contact was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * Representation of a contact's source
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
   * The date and time the contact was archived
   * example:
   * 2019-08-14T12:30:02Z
   */
  archivedOn?: string // date-time
  /**
   * A flag determining whether or not the contact is archived
   */
  fromArchive?: boolean
  /**
   * Representation of the physical address of a building or premise
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
   * Representation of the physical address of a building or premise
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
   * Representation of the physical address of a building or premise
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
   * A collection of unique identifiers of offices attached to the contact. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of categories associated to the contact.
   */
  categoryIds?: string[]
  /**
   * A flag determining whether or not the contact is happy to receive communications by letter
   */
  communicationPreferenceLetter?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by email
   */
  communicationPreferenceEmail?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by phone
   */
  communicationPreferencePhone?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by SMS
   */
  communicationPreferenceSMS?: boolean
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
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
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
  /**
   * A list of relationships belonging to the contact. This is later removed from the response
   */
  relationships?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the related contact
     */
    contactId?: string
    /**
     * The type of related entity (applicant/landlord/offer/tenancy/vendor)
     */
    associatedType?: string
    /**
     * The unique identifier of the related entity
     */
    associatedId?: string
    /**
     * Flag to determine if this role on the system is now archived
     */
    fromArchive?: boolean
  }[]
}
export interface ContactModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the contact
     */
    id?: string
    /**
     * The date and time when the contact was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the contact was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * Representation of a contact's source
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
     * The date and time the contact was archived
     * example:
     * 2019-08-14T12:30:02Z
     */
    archivedOn?: string // date-time
    /**
     * A flag determining whether or not the contact is archived
     */
    fromArchive?: boolean
    /**
     * Representation of the physical address of a building or premise
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
     * Representation of the physical address of a building or premise
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
     * Representation of the physical address of a building or premise
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
     * A collection of unique identifiers of offices attached to the contact. The first item in the collection is considered the primary office
     */
    officeIds?: string[]
    /**
     * A collection of unique identifiers of negotiators attached to the contact. The first item in the collection is considered the primary negotiator
     */
    negotiatorIds?: string[]
    /**
     * A collection of categories associated to the contact.
     */
    categoryIds?: string[]
    /**
     * A flag determining whether or not the contact is happy to receive communications by letter
     */
    communicationPreferenceLetter?: boolean
    /**
     * A flag determining whether or not the contact is happy to receive communications by email
     */
    communicationPreferenceEmail?: boolean
    /**
     * A flag determining whether or not the contact is happy to receive communications by phone
     */
    communicationPreferencePhone?: boolean
    /**
     * A flag determining whether or not the contact is happy to receive communications by SMS
     */
    communicationPreferenceSMS?: boolean
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
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
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
    /**
     * A list of relationships belonging to the contact. This is later removed from the response
     */
    relationships?: {
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: any
      }
      /**
       * The unique identifier of the relationship
       */
      id?: string
      /**
       * The date and time when the relationship was created
       * example:
       * 2019-08-14T12:30:02Z
       */
      created?: string // date-time
      /**
       * The date and time when the relationship was last modified
       * example:
       * 2019-08-14T12:30:02Z
       */
      modified?: string // date-time
      /**
       * The unique identifier of the related contact
       */
      contactId?: string
      /**
       * The type of related entity (applicant/landlord/offer/tenancy/vendor)
       */
      associatedType?: string
      /**
       * The unique identifier of the related entity
       */
      associatedId?: string
      /**
       * Flag to determine if this role on the system is now archived
       */
      fromArchive?: boolean
    }[]
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of the roles that an individual contacts possesses
 */
export interface ContactRoleModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the related contact
   */
  contactId?: string
  /**
   * The type of related entity (applicant/landlord/offer/tenancy/vendor)
   */
  associatedType?: string
  /**
   * The unique identifier of the related entity
   */
  associatedId?: string
  /**
   * Flag to determine if this role on the system is now archived
   */
  fromArchive?: boolean
}
export interface ContactRoleModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the related contact
     */
    contactId?: string
    /**
     * The type of related entity (applicant/landlord/offer/tenancy/vendor)
     */
    associatedType?: string
    /**
     * The unique identifier of the related entity
     */
    associatedId?: string
    /**
     * Flag to determine if this role on the system is now archived
     */
    fromArchive?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
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
/**
 * Representation of an individual contact subscription
 */
export interface ContactSubscriptionModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the subscription
   */
  id?: string
  /**
   * The unique identifier of the contact the subscription is associated with
   */
  contactId?: string
  /**
   * The name of the subscription
   */
  name?: string
  /**
   * The name of the group this subscription belongs to, if applicable
   */
  group?: string
  /**
   * The status of the subscription (subscribed/unsubscribed)
   */
  status?: string
  /**
   * The type of subscription (mailing/event)
   */
  type?: string
  /**
   * The date and time when the subscription was started for the associated contact
   * example:
   * 2019-08-14T12:30:02Z
   */
  subscribedOn?: string // date-time
  /**
   * The date and time when the subscription was terminated for the associated contact
   * example:
   * 2019-08-14T12:30:02Z
   */
  unsubscribedOn?: string // date-time
}
export interface ContactSubscriptionModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the subscription
     */
    id?: string
    /**
     * The unique identifier of the contact the subscription is associated with
     */
    contactId?: string
    /**
     * The name of the subscription
     */
    name?: string
    /**
     * The name of the group this subscription belongs to, if applicable
     */
    group?: string
    /**
     * The status of the subscription (subscribed/unsubscribed)
     */
    status?: string
    /**
     * The type of subscription (mailing/event)
     */
    type?: string
    /**
     * The date and time when the subscription was started for the associated contact
     * example:
     * 2019-08-14T12:30:02Z
     */
    subscribedOn?: string // date-time
    /**
     * The date and time when the subscription was terminated for the associated contact
     * example:
     * 2019-08-14T12:30:02Z
     */
    unsubscribedOn?: string // date-time
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Contacts {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('documents' | 'identityChecks' | 'negotiators' | 'offices' | 'relationships' | 'source')[]
  id?: string[]
  contactDetail?: string[]
  email?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  address?: string
  identityCheck?: ('pass' | 'fail' | 'pending' | 'warnings' | 'unchecked')[]
  name?: string
  nameType?: string
  marketingConsent?: ('grant' | 'deny' | 'notAsked')[]
  marketingConsentFilterType?: ('assumedOrExplicit' | 'explicit')[]
  active?: boolean
  fromArchive?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
  extrasField?: string[]
}
export interface Conveyancing {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  propertyId?: string[]
  buyerId?: string[]
  embed?: ('buyerSolicitor' | 'offer' | 'property' | 'vendor' | 'vendorSolicitor')[]
  metadata?: string[]
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
}
/**
 * Representation of an offers sales progression information
 */
export interface ConveyancingModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the offer
   */
  id?: string
  /**
   * The date and time when the offer was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the offer was modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * Flag set to true if this offer is external
   */
  isExternal?: boolean
  /**
   * The unique identifier of the property that this offer is associated to. Empty if the offer is external and relates to a property not instructed to the agent
   */
  propertyId?: string
  /**
   * The address of the property that this offer is associated to
   */
  propertyAddress?: string
  /**
   * The full name of the vendor of the property
   */
  vendor?: string
  /**
   * The unique identifier of the vendor that this offer is associated to. Empty if the offer is external and relates to a property not instructed to the agent
   */
  vendorId?: string
  /**
   * The unique identifier of the solicitor / conveyancer that the vendor has instructed
   */
  vendorSolicitorId?: string
  /**
   * The full name of the buyer who has submitted the offer
   */
  buyer?: string
  /**
   * The unique identifier of the contact that represents this buyer. Empty if the offer is external and relates to a property not instructed to the agent
   */
  buyerId?: string
  /**
   * The unique identifier of the solicitor / conveyancer that the buyer has instructed
   */
  buyerSolicitorId?: string
  /**
   * The name of the agent who is marketing the property, where the offer is external and and relates to a property not instructed to the agent
   */
  externalAgent?: string
  /**
   * The unique identifier of the agent company that holds the property instruction
   */
  externalAgentId?: string
  /**
   * The unique identifier of the offer that sits above this one in the chain (where known)
   */
  upwardChainId?: string
  /**
   * The unique identifier of the offer that sits below this one in the chain (where known)
   */
  downwardChainId?: string
  /**
   * The date when the fixtures and fittings form has been completed
   * example:
   * 2019-08-14
   */
  fixturesAndFittingsCompleted?: string // date
  /**
   * The date when the title deeds were requested from land registry
   * example:
   * 2019-08-14
   */
  deedsRequested?: string // date
  /**
   * The date when the title deeds were received from land registry
   * example:
   * 2019-08-14
   */
  deedsReceived?: string // date
  /**
   * The date when the legal enquiries raised by the buyers solicitor were sent
   * example:
   * 2019-08-14
   */
  enquiriesSent?: string // date
  /**
   * The date when the legal enquiries raised by the buyers solicitor were answered
   * example:
   * 2019-08-14
   */
  enquiriesAnswered?: string // date
  /**
   * The date when the buyer paid for conveyancing searches
   * example:
   * 2019-08-14
   */
  searchesPaid?: string // date
  /**
   * The date when conveyancing searches were applied for
   * example:
   * 2019-08-14
   */
  searchesApplied?: string // date
  /**
   * The date when conveyancing searches were received for
   * example:
   * 2019-08-14
   */
  searchesReceived?: string // date
  /**
   * The date when the draft contract was sent
   * example:
   * 2019-08-14
   */
  contractSent?: string // date
  /**
   * The date when the draft contract was received
   * example:
   * 2019-08-14
   */
  contractReceived?: string // date
  /**
   * The date when the contract was approved
   * example:
   * 2019-08-14
   */
  contractApproved?: string // date
  /**
   * The date when the vendor signed the approved contract
   * example:
   * 2019-08-14
   */
  contractVendorSigned?: string // date
  /**
   * The date when the buyer signed the approved contract
   * example:
   * 2019-08-14
   */
  contractBuyerSigned?: string // date
  /**
   * Indication of whether the buyer will require a mortgage to fund the purchase (yes/no/unknown)
   */
  mortgageRequired?: string
  /**
   * The loan to value percentage of the mortgage required
   */
  mortgageLoanPercentage?: number // int32
  /**
   * The date when the mortgage application was submitted
   * example:
   * 2019-08-14
   */
  mortgageSubmitted?: string // date
  /**
   * The date when the mortgage offer was received
   * example:
   * 2019-08-14
   */
  mortgageOfferReceived?: string // date
  /**
   * The unique identifier of the company who will provide the mortgage
   */
  mortgageLenderId?: string
  /**
   * The unique identifier of the company who brokered the mortgage
   */
  mortgageBrokerId?: string
  /**
   * The date of the mortgage valuation/survey
   * example:
   * 2019-08-14
   */
  mortgageSurveyDate?: string // date
  /**
   * The unique identifier of the company who will perform the mortgage valuation/survey
   */
  mortgageSurveyorId?: string
  /**
   * Indication of whether the buyer requires that an additional survey take place  (yes/no/unknown)
   */
  additionalSurveyRequired?: string
  /**
   * The date of the additional survey
   * example:
   * 2019-08-14
   */
  additionalSurveyDate?: string // date
  /**
   * The unique identifier of the company who will perform the additional survey
   */
  additionalSurveyorId?: string
  /**
   * The date when the vendor conveyancer confirms the exchange
   * example:
   * 2019-08-14
   */
  exchangedVendor?: string // date
  /**
   * The date when the buyer conveyancer confirms the exchange
   * example:
   * 2019-08-14
   */
  exchangedBuyer?: string // date
  /**
   * The date when the sale completed
   * example:
   * 2019-08-14
   */
  completion?: string // date
  /**
   * Check list items to be completed as part of the sales progression process
   */
  checkListItems?: {
    /**
     * The name of the check list item
     */
    name?: string
    /**
     * A flag to determine if the item is completed
     */
    completed?: boolean
    /**
     * The date when the item was completed
     * example:
     * 2019-08-14
     */
    completedDate?: string // date
  }[]
  /**
   * The ETag for the current version of this conveyancing record. Used for managing update concurrency
   */
  readonly _eTag?: string
  /**
   * App specific metadata that has been set against this conveyancing record
   */
  metadata?: {
    [name: string]: any
  }
}
export interface ConveyancingModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the offer
     */
    id?: string
    /**
     * The date and time when the offer was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the offer was modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * Flag set to true if this offer is external
     */
    isExternal?: boolean
    /**
     * The unique identifier of the property that this offer is associated to. Empty if the offer is external and relates to a property not instructed to the agent
     */
    propertyId?: string
    /**
     * The address of the property that this offer is associated to
     */
    propertyAddress?: string
    /**
     * The full name of the vendor of the property
     */
    vendor?: string
    /**
     * The unique identifier of the vendor that this offer is associated to. Empty if the offer is external and relates to a property not instructed to the agent
     */
    vendorId?: string
    /**
     * The unique identifier of the solicitor / conveyancer that the vendor has instructed
     */
    vendorSolicitorId?: string
    /**
     * The full name of the buyer who has submitted the offer
     */
    buyer?: string
    /**
     * The unique identifier of the contact that represents this buyer. Empty if the offer is external and relates to a property not instructed to the agent
     */
    buyerId?: string
    /**
     * The unique identifier of the solicitor / conveyancer that the buyer has instructed
     */
    buyerSolicitorId?: string
    /**
     * The name of the agent who is marketing the property, where the offer is external and and relates to a property not instructed to the agent
     */
    externalAgent?: string
    /**
     * The unique identifier of the agent company that holds the property instruction
     */
    externalAgentId?: string
    /**
     * The unique identifier of the offer that sits above this one in the chain (where known)
     */
    upwardChainId?: string
    /**
     * The unique identifier of the offer that sits below this one in the chain (where known)
     */
    downwardChainId?: string
    /**
     * The date when the fixtures and fittings form has been completed
     * example:
     * 2019-08-14
     */
    fixturesAndFittingsCompleted?: string // date
    /**
     * The date when the title deeds were requested from land registry
     * example:
     * 2019-08-14
     */
    deedsRequested?: string // date
    /**
     * The date when the title deeds were received from land registry
     * example:
     * 2019-08-14
     */
    deedsReceived?: string // date
    /**
     * The date when the legal enquiries raised by the buyers solicitor were sent
     * example:
     * 2019-08-14
     */
    enquiriesSent?: string // date
    /**
     * The date when the legal enquiries raised by the buyers solicitor were answered
     * example:
     * 2019-08-14
     */
    enquiriesAnswered?: string // date
    /**
     * The date when the buyer paid for conveyancing searches
     * example:
     * 2019-08-14
     */
    searchesPaid?: string // date
    /**
     * The date when conveyancing searches were applied for
     * example:
     * 2019-08-14
     */
    searchesApplied?: string // date
    /**
     * The date when conveyancing searches were received for
     * example:
     * 2019-08-14
     */
    searchesReceived?: string // date
    /**
     * The date when the draft contract was sent
     * example:
     * 2019-08-14
     */
    contractSent?: string // date
    /**
     * The date when the draft contract was received
     * example:
     * 2019-08-14
     */
    contractReceived?: string // date
    /**
     * The date when the contract was approved
     * example:
     * 2019-08-14
     */
    contractApproved?: string // date
    /**
     * The date when the vendor signed the approved contract
     * example:
     * 2019-08-14
     */
    contractVendorSigned?: string // date
    /**
     * The date when the buyer signed the approved contract
     * example:
     * 2019-08-14
     */
    contractBuyerSigned?: string // date
    /**
     * Indication of whether the buyer will require a mortgage to fund the purchase (yes/no/unknown)
     */
    mortgageRequired?: string
    /**
     * The loan to value percentage of the mortgage required
     */
    mortgageLoanPercentage?: number // int32
    /**
     * The date when the mortgage application was submitted
     * example:
     * 2019-08-14
     */
    mortgageSubmitted?: string // date
    /**
     * The date when the mortgage offer was received
     * example:
     * 2019-08-14
     */
    mortgageOfferReceived?: string // date
    /**
     * The unique identifier of the company who will provide the mortgage
     */
    mortgageLenderId?: string
    /**
     * The unique identifier of the company who brokered the mortgage
     */
    mortgageBrokerId?: string
    /**
     * The date of the mortgage valuation/survey
     * example:
     * 2019-08-14
     */
    mortgageSurveyDate?: string // date
    /**
     * The unique identifier of the company who will perform the mortgage valuation/survey
     */
    mortgageSurveyorId?: string
    /**
     * Indication of whether the buyer requires that an additional survey take place  (yes/no/unknown)
     */
    additionalSurveyRequired?: string
    /**
     * The date of the additional survey
     * example:
     * 2019-08-14
     */
    additionalSurveyDate?: string // date
    /**
     * The unique identifier of the company who will perform the additional survey
     */
    additionalSurveyorId?: string
    /**
     * The date when the vendor conveyancer confirms the exchange
     * example:
     * 2019-08-14
     */
    exchangedVendor?: string // date
    /**
     * The date when the buyer conveyancer confirms the exchange
     * example:
     * 2019-08-14
     */
    exchangedBuyer?: string // date
    /**
     * The date when the sale completed
     * example:
     * 2019-08-14
     */
    completion?: string // date
    /**
     * Check list items to be completed as part of the sales progression process
     */
    checkListItems?: {
      /**
       * The name of the check list item
       */
      name?: string
      /**
       * A flag to determine if the item is completed
       */
      completed?: boolean
      /**
       * The date when the item was completed
       * example:
       * 2019-08-14
       */
      completedDate?: string // date
    }[]
    /**
     * The ETag for the current version of this conveyancing record. Used for managing update concurrency
     */
    readonly _eTag?: string
    /**
     * App specific metadata that has been set against this conveyancing record
     */
    metadata?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * The details specific to applicants with a marketingMode of buying
 */
export interface CreateApplicantBuyingModel {
  /**
   * The identifier of the applicant's buying reason
   */
  reasonId?: string
  /**
   * The identifier of the applicant's selling position
   */
  positionId?: string
  /**
   * The lower bound of the applicant's budget. (Required when 'marketingMode' is 'buying' and 'priceTo' is not provided)
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the applicant's budget. (Required when 'marketingMode' is 'buying' and 'priceFrom' is not provided)
   */
  priceTo?: number // int32
  /**
   * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
   */
  tenure?: string[]
  /**
   * The date when the applicant's current mortgage expires/is due for renewal
   * example:
   * 2019-08-14T12:30:02Z
   */
  mortgageExpiry?: string // date-time
  /**
   * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
   */
  leaseRemaining?: {
    /**
     * The minimum number of years that must remain on the lease of a leasehold property
     */
    min?: number // int32
    /**
     * The maximum number of years that must remain on the lease of a leasehold property
     */
    max?: number // int32
  }
}
/**
 * Request body used to create a relationship between an applicant and a contact or company
 */
export interface CreateApplicantContactRelationshipModel {
  /**
   * The unique identifier of the contact or company to create a relationship with
   */
  associatedId: string
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
 * Details of regional information specific to Guernsey
 */
export interface CreateApplicantGuernseyModel {
  /**
   * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
   */
  market?: string[]
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
 * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
 */
export interface CreateApplicantLeaseRemaining {
  /**
   * The minimum number of years that must remain on the lease of a leasehold property
   */
  min?: number // int32
  /**
   * The maximum number of years that must remain on the lease of a leasehold property
   */
  max?: number // int32
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
  marketingMode: string
  /**
   * The ISO-4217 currency code that relates to monetary amounts specified by the applicant
   * Where not specified this will default to the customer's base currency
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
   * The status id of the applicant
   */
  statusId?: string
  /**
   * The applicant's selling status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  sellingStatus?: string
  /**
   * The applicant's selling position (nothingToSell/renting/sellingWithUs/sellingWithOtherAgent/sellingPrivately/notYetOnMarket)
   */
  sellingPosition?: string
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
   * The unique identifier of the department the applicant is associated with. The applicant will only match to properties with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
   */
  departmentId: string
  /**
   * The unique identifier of the solicitor associated to the applicant
   */
  solicitorId?: string
  /**
   * A flag determining whether or not the applicant is a potential client
   */
  potentialClient?: boolean
  /**
   * The applicant's property type requirements (eg house, bungalow, land), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  type?: string[]
  /**
   * The applicant's property style requirements (eg detached, semiDetached), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  style?: string[]
  /**
   * The applicant's requirements for other aspects of prospective properties - such as outside space - as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  situation?: string[]
  /**
   * The applicant's parking requirements (eg garage), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parking?: string[]
  /**
   * The applicant's property age requirements (eg new, period), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  age?: string[]
  /**
   * The applicant's general property location requirements (eg rural, townCity), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  locality?: string[]
  /**
   * The applicant's special feature property requirements (eg Swimming Pool, Tennis Court), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
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
   * The minimum number of parking spaces the applicant requires
   */
  parkingSpacesMin?: number // int32
  /**
   * The maximum number of parking spaces the applicant requires
   */
  parkingSpacesMax?: number // int32
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
     * The identifier of the applicant's buying reason
     */
    reasonId?: string
    /**
     * The identifier of the applicant's selling position
     */
    positionId?: string
    /**
     * The lower bound of the applicant's budget. (Required when 'marketingMode' is 'buying' and 'priceTo' is not provided)
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the applicant's budget. (Required when 'marketingMode' is 'buying' and 'priceFrom' is not provided)
     */
    priceTo?: number // int32
    /**
     * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
     */
    tenure?: string[]
    /**
     * The date when the applicant's current mortgage expires/is due for renewal
     * example:
     * 2019-08-14T12:30:02Z
     */
    mortgageExpiry?: string // date-time
    /**
     * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
     */
    leaseRemaining?: {
      /**
       * The minimum number of years that must remain on the lease of a leasehold property
       */
      min?: number // int32
      /**
       * The maximum number of years that must remain on the lease of a leasehold property
       */
      max?: number // int32
    }
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
     * The lower bound of the applicant's budget. (Required when 'marketingMode' is 'renting' and 'rentTo' is 0)
     */
    rentFrom?: number // double
    /**
     * The upper bound of the applicant's budget. (Required when 'marketingMode' is 'renting' and 'rentFrom' is 0)
     */
    rentTo?: number // double
    /**
     * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually/fourWeekly).
     */
    rentFrequency?: string
    /**
     * A list of property furnishing requirements taken from the full listing of the associated department
     */
    furnishing?: string[]
    /**
     * The identifier of the applicant's renting position
     */
    positionId?: string
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
   * An applicant's source of enquiry
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
   * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Details of regional information specific to Guernsey
     */
    ggy?: {
      /**
       * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
       */
      market?: string[]
    }
  }
  /**
   * A collection of unique identifiers of offices attached to the applicant. The first item in the collection is considered the primary office
   */
  officeIds: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the applicant. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds: string[]
  /**
   * A collection of contacts and/or companies associated to the applicant. The first item in the collection is considered the primary relationship
   */
  related: {
    /**
     * The unique identifier of the contact or company to create a relationship with
     */
    associatedId: string
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
 * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface CreateApplicantRegionalModel {
  /**
   * Details of regional information specific to Guernsey
   */
  ggy?: {
    /**
     * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
     */
    market?: string[]
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
   * The lower bound of the applicant's budget. (Required when 'marketingMode' is 'renting' and 'rentTo' is 0)
   */
  rentFrom?: number // double
  /**
   * The upper bound of the applicant's budget. (Required when 'marketingMode' is 'renting' and 'rentFrom' is 0)
   */
  rentTo?: number // double
  /**
   * The desired rent collection frequency specified by the applicant's budget (weekly/monthly/annually/fourWeekly).
   */
  rentFrequency?: string
  /**
   * A list of property furnishing requirements taken from the full listing of the associated department
   */
  furnishing?: string[]
  /**
   * The identifier of the applicant's renting position
   */
  positionId?: string
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
   * 2019-08-14T12:30:02Z
   */
  start: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02Z
   */
  end: string // date-time
  /**
   * The date when the appointment should be followed up
   * example:
   * 2019-08-14
   */
  followUpOn?: string // date
  /**
   * The unique identifier of the appointment type
   */
  typeId: string
  /**
   * A free text description about the appointment
   */
  description?: string
  /**
   * The unique identifier of the negotiator that organised the appointment
   */
  organiserId?: string
  /**
   * A collection of unique identifiers of negotiators attached to the appointment. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * Represents an external attendee on an appointment
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
   * The unique identifier of the external company either carrying out or attending the appointment with the agent
   */
  otherAgentId?: string
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
   * A flag denoting whether or not the appointment is virtual
   */
  virtual?: boolean
  /**
   * A flag denoting whether or not the appointment is a subsequent appointment to a previous one (a repeat appointment for the same attendee)
   */
  isRepeat?: boolean
  /**
   * Details of an appointment's recurrence pattern
   */
  recurrence?: {
    /**
     * The numeric value denoting how often the appointment will recur
     */
    interval?: number // int32
    /**
     * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
     */
    type?: string
    /**
     * The date and time when the recurrence will stop. (Required if 'type' is provided)
     * example:
     * 2019-08-14T12:30:02Z
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
   * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
   */
  type?: string
  /**
   * The date and time when the recurrence will stop. (Required if 'type' is provided)
   * example:
   * 2019-08-14T12:30:02Z
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
  name: string
  /**
   * The type of area (postcodes/polygon/group)
   */
  type: string
  /**
   * The location details (comma delimited list of postcodes, group ids or lat/long coordinate groups)
   */
  area: string[]
  /**
   * A collection of unique identifiers of departments associated to the area
   */
  departmentIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the area. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * The unique identifier of the parent area, if the area should be registered as a child area/group in an existing area group
   */
  parentId?: string
}
/**
 * Request body to create bulk journal entry
 * example:
 * [object Object]
 */
export interface CreateBulkJournalEntryModel {
  /**
   * Collection of journal entries
   */
  createJournalEntry?: {
    /**
     * The unique identifier of the type the journal entry is related to.
     * Default value set to MI
     */
    typeId?: string
    /**
     * The unique identifier of the property the journal entry is related to. Can additionally be associated to another type (Required when 'associatedId' is not given)
     */
    propertyId?: string
    /**
     * The entity type the journal entry has been raised against (applicant/contact/company/landlord/tenancy/worksOrder) (Required when 'associatedId' is given)
     * TypeId must be set to WO when passing worksOrder
     */
    associatedType?: string
    /**
     * The unique identifier of the entity the journal entry has been raised against. Can additionally be associated to a property (Required when 'propertyId' is not given)
     */
    associatedId?: string
    /**
     * The textual description of the journal entry event
     */
    description: string
    /**
     * The identifier of the negotiator recording the journal entry
     */
    negotiatorId?: string
  }[]
}
/**
 * Request body used to create a new certificate
 * example:
 * [object Object]
 */
export interface CreateCertificateModel {
  /**
   * The certificate's category (safetyCertificate/insurancePolicy/warranty)
   */
  category?: string
  /**
   * The certificate's type
   */
  typeId?: string
  /**
   * The certificate's start date
   * example:
   * 2019-08-14
   */
  start?: string // date
  /**
   * The certificate's expiry date
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * The unique identifier of the company that supplied, or is supplying, the certificate
   */
  companyId?: string
  /**
   * Any general notes regarding the certificate
   */
  notes?: string
  /**
   * The certificate's reference number
   */
  referenceNumber?: string
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
  name: string
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
   * The marketing consent status of the company (deny/notAsked)
   */
  marketingConsent?: string
  /**
   * A flag determining whether or not the company is VAT registered
   */
  vatRegistered?: boolean
  /**
   * A collection of unique identifiers of company types that categorise the type of business the company operates
   */
  typeIds: string[]
  /**
   * The unique identifier of a supplier type, if the company is a supplier
   */
  supplierTypeId?: string
  /**
   * The work phone number of the company. (Required when no other company or address details are provided)
   */
  workPhone?: string
  /**
   * The mobile phone number of the company. (Required when no other company or address details are provided)
   */
  mobilePhone?: string
  /**
   * The email address of the company. (Required when no other company or address details are provided)
   */
  email?: string
  /**
   * Request body to set the address of a new company
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
  surname: string
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
  marketingConsent: string
  /**
   * Request body used to set the source of a new contact
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
   * The home phone number of the contact (Required when no other contact details are provided)
   */
  homePhone?: string
  /**
   * The work phone number of the contact (Required when no other contact details are provided)
   */
  workPhone?: string
  /**
   * The mobile phone number of the contact (Required when no other contact details are provided)
   */
  mobilePhone?: string
  /**
   * The email address of the contact (Required when no other contact details are provided)
   */
  email?: string
  /**
   * A collection of unique identifiers of offices attached to the contact. The first item in the collection is considered the primary office
   */
  officeIds: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds: string[]
  /**
   * A collection of categories associated to the contact.
   */
  categoryIds?: string[]
  /**
   * Request body used to set an address against a new contact
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
   * Request body used to set an address against a new contact
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
   * Request body used to set an address against a new contact
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
   * A flag determining whether or not the contact is happy to receive communications by letter
   */
  communicationPreferenceLetter?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by email
   */
  communicationPreferenceEmail?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by phone
   */
  communicationPreferencePhone?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by SMS
   */
  communicationPreferenceSMS?: boolean
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
   * The type of entity that the document is associated with (appliance/applicant/bankStatement/batch/certificate/contact/depositCertificate/estate/estateUnit/idCheck/keySet/landlord/nominalTransaction/property/supplierInvoice/tenancy/tenancyCheck/tenancyRenewal/worksOrder/renewalNegotiation)
   */
  associatedType: string
  /**
   * The unique identifier of the entity that the document is associated with
   */
  associatedId: string
  /**
   * The unique identifier of the type of document
   */
  typeId: string
  /**
   * The filename of the document
   */
  name: string
  /**
   * A flag denoting whether or not the document is private
   */
  isPrivate?: boolean
  /**
   * The base64 encoded document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl)
   * This supports upto 6MB
   */
  fileData?: string
  /**
   * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
   */
  fileUrl?: string
  /**
   * App specific metadata to set against the document
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body for associating this offer to another one below it in the chain
 * example:
 * [object Object]
 */
export interface CreateDownwardLinkModel {
  /**
   * The unique identifier of the offer below this one in the chain. Should be left empty if the upward property is external (instructed by another agent)
   */
  offerId?: string
  /**
   * The address of the property below this one in the chain. (Required when 'offerId' is not provided)
   */
  propertyAddress?: string
  /**
   * The name of the agent managing the sale of the property. (Required when 'offerId' is not provided)
   */
  agent?: string
  /**
   * The name of the buyer purchasing the property. (Required when 'offerId' is not provided)
   */
  buyer?: string
  /**
   * The unique identifier of the solicitor / conveyancer that the buyer has instructed. (Required when 'offerId' is not provided)
   */
  buyerSolicitorId?: string
}
/**
 * Request body used to create a enquiries address
 */
export interface CreateEnquiryAddressModel {
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
   * Sets the ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * The details specific to a buying enquiry
 */
export interface CreateEnquiryBuyingModel {
  /**
   * The lower bound of the prospective buyer's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the prospective buyer's budget
   */
  priceTo?: number // int32
}
/**
 * Request body used to create an enquiry
 * example:
 * [object Object]
 */
export interface CreateEnquiryModel {
  /**
   * The title of the individual making the enquiry
   */
  title: string
  /**
   * The forename of the individual making the enquiry
   */
  forename: string
  /**
   * The surname of the individual making the enquiry
   */
  surname: string
  /**
   * The selling position of the individual making the enquiry (renting/instructedThisAgent/instructedOtherAgent/privateSale/notOnMarket)
   */
  position?: string
  /**
   * The type of enquiry. Enquiries can created for applicants interested in buying/renting, as well as prospective vendors and landlords (salesApplicant/lettingsApplicant/salesProperty/lettingsProperty)
   */
  enquiryType: string
  /**
   * Textual information about the nature of the enquiry - usually the message text from the individual making the enquiry
   */
  message: string
  /**
   * The unique identifier of the related office
   */
  officeId: string
  /**
   * The marketing consent status of the individual making the enquiry (grant/deny/notAsked)
   */
  marketingConsent: string
  /**
   * The name of the source that the enquiry was generated from
   */
  sourceName: string
  /**
   * The home phone number of the individual making the enquiry (Required when no other contact details are given)
   */
  homePhone?: string
  /**
   * The work phone number of the individual making the enquiry (Required when no other contact details are given)
   */
  workPhone?: string
  /**
   * The mobile phone number of the individual making the enquiry (Required when no other contact details are given)
   */
  mobilePhone?: string
  /**
   * The email of the individual making the enquiry (Required when no other contact details are given)
   */
  email?: string
  /**
   * Request body used to create a enquiries address
   */
  address?: {
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
     * Sets the ISO-3166 country code that the address resides within
     */
    countryId?: string
  }
  /**
   * The details specific to a buying enquiry
   */
  buying?: {
    /**
     * The lower bound of the prospective buyer's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the prospective buyer's budget
     */
    priceTo?: number // int32
  }
  /**
   * The details specific to renting enquiry. When type is renting.
   */
  renting?: {
    /**
     * The lower bound of the prospective tenant's budget
     */
    rentFrom?: number // int32
    /**
     * The upper bound of the prospective tenant's budget
     */
    rentTo?: number // int32
    /**
     * The desired rent collection frequency specified by the prospective tenant (weekly/monthly/annually).
     */
    rentFrequency?: string
  }
  /**
   * The number of bedrooms the prospective buyer or tenant requires
   */
  bedrooms?: number // int32
  /**
   * A list of unique property identifiers that the enquiry relates to. Used to indicate the properties that a sales or lettings applicant has expressed an interest in
   */
  propertyIds?: string[]
}
/**
 * The details specific to renting enquiry. When type is renting.
 */
export interface CreateEnquiryRentingModel {
  /**
   * The lower bound of the prospective tenant's budget
   */
  rentFrom?: number // int32
  /**
   * The upper bound of the prospective tenant's budget
   */
  rentTo?: number // int32
  /**
   * The desired rent collection frequency specified by the prospective tenant (weekly/monthly/annually).
   */
  rentFrequency?: string
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
  contactId: string
  /**
   * The date when the identity check was performed. This may differ to the date when the check was created
   * example:
   * 2019-08-14
   */
  checkDate: string // date
  /**
   * The current status of the identity check (pass/fail/pending/cancelled/warnings/unchecked)
   */
  status: string
  /**
   * The unique identifier of the negotiator that initiated the identity check
   */
  negotiatorId: string
  /**
   * Request body to attach an identity document to a new contact identity check
   * A second identity document is not required and can be ignored by being set to null
   */
  identityDocument1?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number) (Required when 'fileData' is not given)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl) (Required when 'details' are not given)
     * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
     */
    fileData?: string
    /**
     * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
     */
    fileUrl?: string
    /**
     * The filename to store the document as (Required when 'details' are not given)
     */
    name?: string
  }
  /**
   * Request body to attach an identity document to a new contact identity check
   * A second identity document is not required and can be ignored by being set to null
   */
  identityDocument2?: {
    /**
     * The unique identifier of the type of identity document provided
     */
    typeId: string
    /**
     * The date when the document expires and becomes invalid
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * Details regarding the identity document (eg. passport number) (Required when 'fileData' is not given)
     */
    details?: string
    /**
     * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl) (Required when 'details' are not given)
     * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
     */
    fileData?: string
    /**
     * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
     */
    fileUrl?: string
    /**
     * The filename to store the document as (Required when 'details' are not given)
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
 * A second identity document is not required and can be ignored by being set to null
 */
export interface CreateIdentityDocumentModel {
  /**
   * The unique identifier of the type of identity document provided
   */
  typeId: string
  /**
   * The date when the document expires and becomes invalid
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * Details regarding the identity document (eg. passport number) (Required when 'fileData' is not given)
   */
  details?: string
  /**
   * The base64 encoded identity document content, prefixed with the content type (eg. data:text/plain;base64,VGVzdCBmaWxl) (Required when 'details' are not given)
   * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
   */
  fileData?: string
  /**
   * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
   */
  fileUrl?: string
  /**
   * The filename to store the document as (Required when 'details' are not given)
   */
  name?: string
}
/**
 * Request body used to create an individual key included in a key set
 */
export interface CreateIndividualKeyModel {
  /**
   * The name of the individual key in the set
   */
  name?: string
}
/**
 * Request body used to set the energy performance rating information for properties in Ireland
 */
export interface CreateIrelandPropertyBERModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
   */
  exempt?: boolean
  /**
   * The BER rating of the property
   */
  rating?: string
  /**
   * The BER certificate reference number
   */
  refNumber?: string
  /**
   * The energy performance indicator for the property
   */
  epi?: string
}
/**
 * Request body used to set the data specific to properties in Ireland
 */
export interface CreateIrelandPropertyModel {
  /**
   * Request body used to set the energy performance rating information for properties in Ireland
   */
  buildingEnergyRating?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
     */
    exempt?: boolean
    /**
     * The BER rating of the property
     */
    rating?: string
    /**
     * The BER certificate reference number
     */
    refNumber?: string
    /**
     * The energy performance indicator for the property
     */
    epi?: string
  }
}
/**
 * Request body to create a journal entry
 * example:
 * [object Object]
 */
export interface CreateJournalEntryModel {
  /**
   * The unique identifier of the type the journal entry is related to.
   * Default value set to MI
   */
  typeId?: string
  /**
   * The unique identifier of the property the journal entry is related to. Can additionally be associated to another type (Required when 'associatedId' is not given)
   */
  propertyId?: string
  /**
   * The entity type the journal entry has been raised against (applicant/contact/company/landlord/tenancy/worksOrder) (Required when 'associatedId' is given)
   * TypeId must be set to WO when passing worksOrder
   */
  associatedType?: string
  /**
   * The unique identifier of the entity the journal entry has been raised against. Can additionally be associated to a property (Required when 'propertyId' is not given)
   */
  associatedId?: string
  /**
   * The textual description of the journal entry event
   */
  description: string
  /**
   * The identifier of the negotiator recording the journal entry
   */
  negotiatorId?: string
}
/**
 * Request body used to create a new set of keys
 * example:
 * [object Object]
 */
export interface CreateKeyModel {
  /**
   * The number assigned to the key - key numbers can only be occupied by a single property within an office concurrently
   */
  number?: string
  /**
   * The unique identifier of the key type
   */
  typeId?: string
  /**
   * The unique identifier of the office responsible for the key
   */
  officeId?: string
  /**
   * A listing of the individual keys included in the set
   */
  keysInSet?: {
    /**
     * The name of the individual key in the set
     */
    name?: string
  }[]
}
/**
 * Request body used to create a new key movement
 * example:
 * [object Object]
 */
export interface CreateKeyMovementModel {
  /**
   * Indicates whether the key is expected to be checked back in. Set to true when the key is no longer held (eg. returned to the landlord)
   */
  checkInRequired?: boolean
  /**
   * The unique identifier of the contact or negotiator to check out the key with - this person will be recorded as holding the key
   */
  checkOutToId?: string
  /**
   * The type of entity that checked out the key (contact/negotiator)
   */
  checkOutToType?: string
  /**
   * The unique identifier of the negotiator who performed the key check out
   */
  checkOutNegotiatorId?: string
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
  officeId: string
  /**
   * Request body used to set the source of a new landlord
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
  related: {
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
 * Request body used to create a tenancy renewals letting fee
 */
export interface CreateLettingFeeRenewalModel {
  /**
   * The letting fee type (fixed/perentage)
   */
  type?: string
  /**
   * The letting fee amount as a fixed price or percentage based on the `type`
   */
  amount?: number // double
  /**
   * The frequency at which the letting fee is required (monthly/quarterly/halfYearly/yearly/28days/upfront/upfrontOver2Months/other/notApplicable)
   */
  frequency?: string
}
/**
 * Request body used to create a tenancy renewals management fee
 */
export interface CreateManagementFeeRenewalModel {
  /**
   * The mangement fee type (fixed/perentage)
   */
  type?: string
  /**
   * The mangement fee amount as a fixed price or percentage based on the `type`
   */
  amount?: number // double
  /**
   * The frequency at which the mangement fee is required (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
   */
  frequency?: string
}
/**
 * Payload to create a metadata record
 * example:
 * [object Object]
 */
export interface CreateMetadataRequest {
  /**
   * The type of the entity that this metadata is related to. This can represent a Foundations inbuilt type (an entity presented in our APIs) or it can be a custom entity type (a dynamic standalone metadata entity that you create).
   *
   * Inbuilt types: applicant, appointment, company, contact, conveyancing, identityCheck, landlord, negotiator, offer, office, property, task, vendor, worksOrder
   */
  entityType: string
  /**
   * The unique identifier of the entity that this metadata is related to.
   * For custom entities, this can be left blank and an id will be generated for you.
   */
  entityId?: string
  /**
   * The JSON document to store
   */
  metadata: {
    [name: string]: any
  }
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
  name: string
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
  officeId: string
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
 * Payload for creating a notification
 * example:
 * [object Object]
 */
export interface CreateNotificationModel {
  /**
   * The notification type (telephony)
   */
  type?: string
  /**
   * The sub category type (answeredCall/endedCall/incomingCall/missedCall)
   */
  subType?: string
  /**
   * The products the notification is associated to, and will be delivered to
   */
  products?: string[]
  /**
   * Payload for defining notification targets
   */
  targets?: {
    /**
     * The identifier of the negotiators whom should receive the notification
     */
    negotiatorId?: string[]
  }
  /**
   * The payload to deliver to the specified target(s). Note that the payload must match the expected format
   * based on the type/subType combination and will be validated accordingly. Please refer to [the documentation](https://foundations-documentation.reapit.cloud/api/notifications)
   * for more information
   */
  payload?: any
}
/**
 * Payload for defining notification targets
 */
export interface CreateNotificationTargetModel {
  /**
   * The identifier of the negotiators whom should receive the notification
   */
  negotiatorId?: string[]
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
  applicantId: string
  /**
   * The unique identifier of the property associated to the offer
   */
  propertyId: string
  /**
   * The unique identifier of the negotiator associated to the offer
   */
  negotiatorId?: string
  /**
   * The date when the offer was made
   * example:
   * 2019-08-14
   */
  date: string // date
  /**
   * The monetary amount of the offer
   */
  amount: number // double
  /**
   * The current status of the offer (pending/withdrawn/rejected/accepted/noteOfInterest)
   */
  status: string
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
 * Request body used to set the geolocation coordinates of a new address
 */
export interface CreateOfficeAddressGeolocationModel {
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
  line1: string
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
   * Request body used to set the geolocation coordinates of a new address
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
 * Request body used to create a new office
 * example:
 * [object Object]
 */
export interface CreateOfficeModel {
  /**
   * The name of the office
   */
  name: string
  /**
   * A flag denoting whether or not this office is active
   */
  active?: boolean
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * Request body used to set the address of a new office
   */
  address: {
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
    line1: string
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
     * Request body used to set the geolocation coordinates of a new address
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
 * Request body used to create a new open house attendee
 * example:
 * [object Object]
 */
export interface CreateOpenHouseAttendeeModel {
  /**
   * The interest level of the open house attendee (veryInterested/mightBeInterested/notInterested/notSet)
   */
  interestLevel?: string
  /**
   * Notes on this open house attendee
   */
  notes?: string
  /**
   * Represents an external attendee on an appointment
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
}
/**
 * Request body used to create pre signed urls to upload files between 6MB and 30MB
 * example:
 * [object Object]
 */
export interface CreatePreSignedUrlsModel {
  /**
   * The number of pre signed urls to create
   */
  amount: number // int32
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
  line1: string
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
   * Request body used to set the geolocation coordinates of a new property's address
   */
  geolocation?: {
    /**
     * The latitude coordinate of the coordinate pair
     */
    latitude: number // double
    /**
     * The longitude coordinate of the coordinate pair
     */
    longitude: number // double
  }
}
/**
 * Request body used to create a new check
 * example:
 * [object Object]
 */
export interface CreatePropertyCheckModel {
  /**
   * Short, descriptive text describing the purpose of the check
   */
  description: string
  /**
   * The type of the check (preInstruction)
   */
  type: string
  /**
   * The status of the check (needed/notNeeded/arranging/completed)
   */
  status: string
}
/**
 * Request body used to set the commission fee for a property
 */
export interface CreatePropertyCommissionFeeModel {
  /**
   * The commission letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The commission letting fee amount
   */
  amount?: number // double
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
  /**
   * The URL to access the full EPC document
   */
  fullDocumentUrl?: string
  /**
   * The URL to access the first page of the EPC document
   */
  firstPageDocumentUrl?: string
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
   * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
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
  latitude: number // double
  /**
   * The longitude coordinate of the coordinate pair
   */
  longitude: number // double
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
   * The presigned s3 url which a property image has been uploaded to (This supports files up to 30MB)
   */
  fileUrl?: string
  /**
   * The unique identifier of the property attached to the image
   */
  propertyId: string
  /**
   * The image caption
   */
  caption: string
  /**
   * The type of image (photograph/floorPlan/epc/map)
   */
  type: string
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
   * The date the letting agreement between the landlord and agent was signed
   * example:
   * 2019-08-14
   */
  agreementSigned?: string // date
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Details of any bills that are included in the rent
   */
  rentIncludes?: string
  /**
   * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
   */
  furnishing?: string[]
  /**
   * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole?: string
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
  /**
   * A note to accompany any works orders created for the property
   */
  worksOrderNote?: string
  /**
   * Sets the minimum number of months the property can be let out for
   */
  minimumTerm?: number // int32
  /**
   * Request body used to set the commission fee for a property
   */
  managementFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * Request body used to set the commission fee for a property
   */
  lettingFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The rent qualifier (rentOnApplication/askingRent)
   */
  qualifier?: string
  /**
   * Representation of property details specific to utilities
   */
  utilities?: {
    /**
     * A flag denoting whether or not the property has gas connected
     */
    hasGas?: boolean
    /**
     * The unique identifier of the company supplying the gas to the property
     */
    gasCompanyId?: string
    /**
     * The gas meter point number
     */
    gasMeterPoint?: string
    /**
     * The unique identifier of the company supplying the electricity to the property
     */
    electricityCompanyId?: string
    /**
     * The electricity meter point number
     */
    electricityMeterPoint?: string
    /**
     * The unique identifier of the company supplying the water to the property
     */
    waterCompanyId?: string
    /**
     * The water meter point number
     */
    waterMeterPoint?: string
    /**
     * The unique identifier of the company supplying the telephone to the property
     */
    telephoneCompanyId?: string
    /**
     * The unique identifier of the company supplying the internet to the property
     */
    internetCompanyId?: string
    /**
     * The unique identifier of the company supplying the cable tv to the property
     */
    cableTvCompanyId?: string
  }
  /**
   * Representation of a property details related to deposit
   */
  deposit?: {
    /**
     * The type of deposit (weeks/months/fixed)
     */
    type?: string
    /**
     * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
     */
    amount?: number // double
  }
}
/**
 * Representation of a property details related to deposit
 */
export interface CreatePropertyLettingsDepositModel {
  /**
   * The type of deposit (weeks/months/fixed)
   */
  type?: string
  /**
   * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
   */
  amount?: number // double
}
/**
 * Request body used to create a new property
 * example:
 * [object Object]
 */
export interface CreatePropertyModel {
  /**
   * The date the owner of the property was last called
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date the owner of the property is next due to be called
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * The marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode: string
  /**
   * The unique identifier of the department the property is associated with. The property will only match to applicants with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
   */
  departmentId: string
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
   * An optional alternative identifier specified for this property
   */
  alternateId?: string
  /**
   * The property's special feature property requirements (eg Swimming Pool, Tennis Court), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
  /**
   * Request body used to set the address of a new property
   */
  address: {
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
    line1: string
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
     * Request body used to set the geolocation coordinates of a new property's address
     */
    geolocation?: {
      /**
       * The latitude coordinate of the coordinate pair
       */
      latitude: number // double
      /**
       * The longitude coordinate of the coordinate pair
       */
      longitude: number // double
    }
  }
  /**
   * The total number of bedrooms in the property
   */
  bedrooms?: number // int32
  /**
   * The maximum number of bedrooms in the property
   */
  bedroomsMax?: number // int32
  /**
   * The number of units offered on the market. This is typically used when marketing development sites.
   */
  numberOfUnits?: number // int32
  /**
   * The total number of reception rooms in the property
   */
  receptions?: number // int32
  /**
   * The maximum number of reception rooms in the property
   */
  receptionsMax?: number // int32
  /**
   * The total number of bathrooms in the property
   */
  bathrooms?: number // int32
  /**
   * The maximum number of bathrooms in the property
   */
  bathroomsMax?: number // int32
  /**
   * The total number of parking spaces the property has. This is only supported by some departments. Please refer to the glossary for support [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parkingSpaces?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H/I/notYetAvailable)
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
   * The url of a video associated with this property, such as a virtual tour
   */
  videoUrl?: string
  /**
   * The caption for the video url associated with this property
   */
  videoCaption?: string
  /**
   * The url of a second video associated with this property, such as a virtual tour
   */
  video2Url?: string
  /**
   * The caption for the second video url associated with this property
   */
  video2Caption?: string
  /**
   * Any general notes regarding the property. These are not usually exposed to end users and may contain sensitive information about a sale
   */
  notes?: string
  /**
   * The long description of the property
   */
  longDescription?: string
  /**
   * The floor level the property is on. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  floorLevel?: number // int32
  /**
   * The number of internal floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  internalFloors?: number // int32
  /**
   * The total number of floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  totalFloors?: number // int32
  /**
   * The status of the advertising board sited outside or near to the property
   */
  boardStatus?: string
  /**
   * Any notes relevant to the advertising board sited outside or near to the property
   */
  boardNotes?: string
  /**
   * The date the advertising board was last updated (or should be updated when the date is in the future)
   * example:
   * 2019-08-14
   */
  boardUpdated?: string // date
  /**
   * The date on which the property was valued. Note that this can differ to physical appointment dates in some cases
   * example:
   * 2019-08-14
   */
  valuation?: string // date
  /**
   * Request body used to set the EPC statistic of a new property
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
    /**
     * The URL to access the full EPC document
     */
    fullDocumentUrl?: string
    /**
     * The URL to access the first page of the EPC document
     */
    firstPageDocumentUrl?: string
  }
  /**
   * Request body to set the external land area of a new property
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
     * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
     */
    max?: number // double
  }
  /**
   * Request body to set the internal dimensions of a new property
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
   * Request body used to set details specific to rural properties
   */
  rural?: {
    /**
     * Details of the buildings associated with the property.
     */
    buildingsDescription?: string
    /**
     * Details of the land associated with the property.
     */
    landDescription?: string
  }
  /**
   * Request body used to set details specific to sales marketing on a new property. When creating a new sales property, a vendor record is automatically created. Please refer to the [Platform Glossary](http://foundations.link/glossary#vendor) for full details
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
     * The fee charged by the agent to reserve a property (typically a new build)
     */
    reservationFee?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
     */
    disposal?: string
    /**
     * The date the property sale was completed
     * example:
     * 2019-08-14
     */
    completed?: string // date
    /**
     * The date the property was exchanged
     * example:
     * 2019-08-14
     */
    exchanged?: string // date
    /**
     * The date the property account was paid
     * example:
     * 2019-08-14
     */
    accountPaid?: string // date
    /**
     * Request body used to set the tenure of a new property
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
     * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
     */
    sellingAgency?: string
    /**
     * The unique identifier of the custom selling agency type - only applicable when SellingAgency is not set
     */
    agencyId?: string
    /**
     * The date on which the agreement between the vendor and agent expires
     * example:
     * 2019-08-14
     */
    agreementExpiry?: string // date
    /**
     * Request body used to set the commission fee for a property
     */
    fee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The agent's recommended asking price
     */
    recommendedPrice?: number // int32
    /**
     * The agent's valuation price
     */
    valuationPrice?: number // int32
    /**
     * The property's decorative condition (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * Details relating to the shared ownership of the property
     */
    sharedOwnership?: {
      /**
       * The percentage of the shared ownership property being sold by the vendor
       */
      sharedPercentage?: number // double
      /**
       * The rent payable on the remainder of the shared ownership property
       */
      rent?: number // double
      /**
       * The frequency at which the shared ownership rent should be paid
       */
      rentFrequency?: string
    }
  }
  /**
   * Request body used to set details specific to lettings marketing on a new property
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
     * The date the letting agreement between the landlord and agent was signed
     * example:
     * 2019-08-14
     */
    agreementSigned?: string // date
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * Details of any bills that are included in the rent
     */
    rentIncludes?: string
    /**
     * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
     */
    furnishing?: string[]
    /**
     * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
     */
    agentRole?: string
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
    /**
     * A note to accompany any works orders created for the property
     */
    worksOrderNote?: string
    /**
     * Sets the minimum number of months the property can be let out for
     */
    minimumTerm?: number // int32
    /**
     * Request body used to set the commission fee for a property
     */
    managementFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * Request body used to set the commission fee for a property
     */
    lettingFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The rent qualifier (rentOnApplication/askingRent)
     */
    qualifier?: string
    /**
     * Representation of property details specific to utilities
     */
    utilities?: {
      /**
       * A flag denoting whether or not the property has gas connected
       */
      hasGas?: boolean
      /**
       * The unique identifier of the company supplying the gas to the property
       */
      gasCompanyId?: string
      /**
       * The gas meter point number
       */
      gasMeterPoint?: string
      /**
       * The unique identifier of the company supplying the electricity to the property
       */
      electricityCompanyId?: string
      /**
       * The electricity meter point number
       */
      electricityMeterPoint?: string
      /**
       * The unique identifier of the company supplying the water to the property
       */
      waterCompanyId?: string
      /**
       * The water meter point number
       */
      waterMeterPoint?: string
      /**
       * The unique identifier of the company supplying the telephone to the property
       */
      telephoneCompanyId?: string
      /**
       * The unique identifier of the company supplying the internet to the property
       */
      internetCompanyId?: string
      /**
       * The unique identifier of the company supplying the cable tv to the property
       */
      cableTvCompanyId?: string
    }
    /**
     * Representation of a property details related to deposit
     */
    deposit?: {
      /**
       * The type of deposit (weeks/months/fixed)
       */
      type?: string
      /**
       * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
       */
      amount?: number // double
    }
  }
  /**
   * Request body used to set region specific property details. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Request body used to set the data specific to properties in Ireland
     */
    irl?: {
      /**
       * Request body used to set the energy performance rating information for properties in Ireland
       */
      buildingEnergyRating?: {
        /**
         * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
         */
        exempt?: boolean
        /**
         * The BER rating of the property
         */
        rating?: string
        /**
         * The BER certificate reference number
         */
        refNumber?: string
        /**
         * The energy performance indicator for the property
         */
        epi?: string
      }
    }
  }
  /**
   * The attributes describing the overall type of the property (eg house, bungalow, land), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  type?: string[]
  /**
   * The attributes describing the style of property (eg detached, semiDetached), defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  style?: string[]
  /**
   * The attributes describing other aspects of the property - such as outside space - as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  situation?: string[]
  /**
   * The attributes describing the parking available at the property (eg garage), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parking?: string[]
  /**
   * The attributes describing the age of the property (eg new, period), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  age?: string[]
  /**
   * The attributes describing the general location of the property (eg rural, townCity), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
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
   * A flag determining whether or not the property's room details have been approved by the vendor or landlord
   */
  roomDetailsApproved?: boolean
  /**
   * The unique identifier of the negotiator managing the property
   */
  negotiatorId: string
  /**
   * A collection of unique identifiers of offices attached to the property
   */
  officeIds: string[]
  /**
   * The unique identifier of the area that the property resides in
   */
  areaId?: string
  /**
   * The url to the property on an external website
   */
  url?: string
  /**
   * The caption to accompany the url to the property on an external website
   */
  urlCaption?: string
  /**
   * Any ground rent payment that applies to the property
   */
  groundRent?: number // double
  /**
   * Comments regarding the ground rent of the property
   */
  groundRentComment?: string
  /**
   * The date when the ground rent payable on the property should be reviewed
   * example:
   * 2019-08-14T12:30:02Z
   */
  groundRentReviewDate?: string // date-time
  /**
   * The annual percentage increase of the ground rent after being reviewed
   */
  groundRentIncrease?: number // double
  /**
   * Any service charge payment that applies to the property
   */
  serviceCharge?: number // double
  /**
   * Comments regarding the service charge of the property
   */
  serviceChargeComment?: string
  /**
   * App specific metadata to set against the property
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set region specific property details. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface CreatePropertyRegionalModel {
  /**
   * Request body used to set the data specific to properties in Ireland
   */
  irl?: {
    /**
     * Request body used to set the energy performance rating information for properties in Ireland
     */
    buildingEnergyRating?: {
      /**
       * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
       */
      exempt?: boolean
      /**
       * The BER rating of the property
       */
      rating?: string
      /**
       * The BER certificate reference number
       */
      refNumber?: string
      /**
       * The energy performance indicator for the property
       */
      epi?: string
    }
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
 * Request body used to set details specific to rural properties
 */
export interface CreatePropertyRuralModel {
  /**
   * Details of the buildings associated with the property.
   */
  buildingsDescription?: string
  /**
   * Details of the land associated with the property.
   */
  landDescription?: string
}
/**
 * Request body used to set details specific to sales marketing on a new property. When creating a new sales property, a vendor record is automatically created. Please refer to the [Platform Glossary](http://foundations.link/glossary#vendor) for full details
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
   * The fee charged by the agent to reserve a property (typically a new build)
   */
  reservationFee?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
   */
  disposal?: string
  /**
   * The date the property sale was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * The date the property was exchanged
   * example:
   * 2019-08-14
   */
  exchanged?: string // date
  /**
   * The date the property account was paid
   * example:
   * 2019-08-14
   */
  accountPaid?: string // date
  /**
   * Request body used to set the tenure of a new property
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
   * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
   */
  sellingAgency?: string
  /**
   * The unique identifier of the custom selling agency type - only applicable when SellingAgency is not set
   */
  agencyId?: string
  /**
   * The date on which the agreement between the vendor and agent expires
   * example:
   * 2019-08-14
   */
  agreementExpiry?: string // date
  /**
   * Request body used to set the commission fee for a property
   */
  fee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The agent's recommended asking price
   */
  recommendedPrice?: number // int32
  /**
   * The agent's valuation price
   */
  valuationPrice?: number // int32
  /**
   * The property's decorative condition (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * Details relating to the shared ownership of the property
   */
  sharedOwnership?: {
    /**
     * The percentage of the shared ownership property being sold by the vendor
     */
    sharedPercentage?: number // double
    /**
     * The rent payable on the remainder of the shared ownership property
     */
    rent?: number // double
    /**
     * The frequency at which the shared ownership rent should be paid
     */
    rentFrequency?: string
  }
}
/**
 * Details relating to the shared ownership of the property
 */
export interface CreatePropertySharedOwnershipModel {
  /**
   * The percentage of the shared ownership property being sold by the vendor
   */
  sharedPercentage?: number // double
  /**
   * The rent payable on the remainder of the shared ownership property
   */
  rent?: number // double
  /**
   * The frequency at which the shared ownership rent should be paid
   */
  rentFrequency?: string
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
 * Payload to create a JSON schema for metadata validation
 * example:
 * [object Object]
 */
export interface CreateSchemaRequest {
  /**
   * The name of the entity type that this schema is related to
   */
  entityType: string
  /**
   * The JSON schema used to validate entities of this type
   */
  schema: string
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
  name: string
  /**
   * The type of the source (source/advertisement)
   */
  type: string
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
 * Request body used to create a new supplier invoice
 * example:
 * [object Object]
 */
export interface CreateSupplierInvoiceModel {
  /**
   * The unique identifier of the works order the supplier invoice is associated with, where applicable
   * Must be provided if propertyId/companyId/tenancyId are not present
   */
  worksOrderId?: string
  /**
   * The unique identifier of the property the supplier invoice is associated with, where applicable
   * When providing a propertyId along with a worksOrderId, the id will be validated against the works order to check they match
   */
  propertyId?: string
  /**
   * The unique identifier of the contractor (company) the supplier invoice is associated with, where applicable
   * When providing a companyId along with a worksOrderId, the id will be validated against the works order to check they match
   */
  companyId?: string
  /**
   * The unique identifier of the tenancy the supplier invoice is associated with, where applicable
   * When providing a tenancyId along with a worksOrderId, the id will be validated against the works order to check they match
   */
  tenancyId?: string
  /**
   * The supplier invoice work description
   */
  description: string
  /**
   * The identifier of the nominal account the supplier invoice should be attributed to
   */
  accountId: string
  /**
   * The invoice reference
   */
  invoiceRef: string
  /**
   * The unique identifier of the negotiator the invoice should be attributed to (normally the person creating it on the system)
   */
  negotiatorId: string
  /**
   * The invoice date
   * example:
   * 2019-08-14
   */
  invoiceDate: string // date
  /**
   * The date the invoice should be paid by
   * example:
   * 2019-08-14
   */
  dueDate?: string // date
  /**
   * The invoice net amount
   */
  netAmount: number // double
  /**
   * The invoice tax amount
   */
  taxAmount: number // double
}
/**
 * Request body used to create a new task, which can also be an internal message
 * example:
 * [object Object]
 */
export interface CreateTaskModel {
  /**
   * The date the task becomes active (Required when 'TypeId' is given)
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
  senderId: string
  /**
   * The textual contents of the task or message
   */
  text: string
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
  recipientId: string
  /**
   * The type of the recipient (office/negotiator)
   */
  recipientType: string
  /**
   * App specific metadata that has been set against the task
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set party agreements to a specific clause in a tenancy agreement
 */
export interface CreateTenancyAgreementModel {
  /**
   * A flag to determine if the landlord has agreed
   */
  landlord?: boolean
  /**
   * A flag to determine if the tenant has agreed
   */
  tenant?: boolean
}
/**
 * Request body used to set a tenancy allowance
 * example:
 * [object Object]
 */
export interface CreateTenancyAllowanceModel {
  /**
   * The identifier of the associated to the allowance
   */
  typeId?: string
  /**
   * The state of the allowance (allowed/notAllowed)
   */
  state?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
}
/**
 * Request body used to update tenancy break clause
 * example:
 * [object Object]
 */
export interface CreateTenancyBreakClauseModel {
  /**
   * The identifier of the associated to the break clause
   */
  typeId?: string
  /**
   * The date the break clause becomes/became active
   * example:
   * 2019-08-14
   */
  active?: string // date
  /**
   * The responsible party (landlord/tenant/mutual)
   */
  appliesTo?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
  /**
   * Request body used to set a break clauses break from details
   */
  breakFrom?: {
    /**
     * The date the break from clause can be used
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The minimum number of months until the break clause can be used
     */
    minTermMonths?: number // int32
  }
  /**
   * Request body used to set a break clauses notice required details
   */
  noticeRequired?: {
    /**
     * The date a break clauses notice is required by
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The number of months the notice is required before the break clause
     */
    beforeBreakMonths?: number // int32
  }
}
/**
 * Request body used to set a break clauses break from details
 */
export interface CreateTenancyBreakFromModel {
  /**
   * The date the break from clause can be used
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The minimum number of months until the break clause can be used
   */
  minTermMonths?: number // int32
}
/**
 * Request body used to create a new tenancy check
 * example:
 * [object Object]
 */
export interface CreateTenancyCheckModel {
  /**
   * Short, descriptive text describing the purpose of the check. This should be populated
   * when creating a custom tenancy check that does not match any of the existing pre-configured
   * tenancy check options.
   * Description and CheckTypeId must not be supplied in the same payload, but at least one must be provided
   */
  description?: string
  /**
   * The type of the tenancy check (preTenancy/postTenancy)
   */
  type: string
  /**
   * The status of the tenancy check (needed/notNeeded/arranging/completed)
   */
  status: string
  /**
   * The identifier of the pre-configured tenancy check. This should be populated
   * when an existing tenancy check configuration is desired, rather than a custom one
   * CheckTypeId and Description must not be supplied in the same payload, but at least one must be provided
   */
  checkTypeId?: string
  /**
   * App specific metadata to set against the tenancy check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the deposit of a new tenancy
 */
export interface CreateTenancyDepositModel {
  /**
   * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
   */
  heldBy?: string
  /**
   * The number of weeks or months rent collected as the deposit on the tenancy
   */
  period?: number // int32
  /**
   * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
   */
  type?: string
  /**
   * The amount of deposit held
   */
  sum?: number // double
}
/**
 * Request body used to set letting fees on a new tenancy
 */
export interface CreateTenancyLettingFeeModel {
  /**
   * The letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
   */
  frequency?: string
}
/**
 * Request body used to set management fees on a new tenancy
 */
export interface CreateTenancyManagementFeeModel {
  /**
   * The management fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
   */
  frequency?: string
}
/**
 * Request body used to create a new tenancy
 * example:
 * [object Object]
 */
export interface CreateTenancyModel {
  /**
   * example:
   * 2019-08-14
   */
  startDate?: string // date
  /**
   * example:
   * 2019-08-14
   */
  endDate?: string // date
  /**
   * The current status of the tenancy (offerPending/offerWithdrawn/offerRejected/arranging)
   */
  status?: string
  /**
   * The role that the agent is performing for the tenancy (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole: string
  /**
   * The amount of rent required, returned in relation to the collection frequency
   */
  rent: number // double
  /**
   * The rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency: string
  /**
   * The frequency of rental instalment payments (weekly/fortnightly/monthly/quarterly/halfYearly/yearly/every28Days/other)
   */
  rentInstalmentsFrequency?: string
  /**
   * The amount due for each rent instalment (where specified)
   */
  rentInstalmentsAmount?: number // double
  /**
   * The date that the first instalment is due
   * example:
   * 2019-08-14
   */
  rentInstalmentsStart?: string // date
  /**
   * The recorded utility reading for the gas meter
   */
  meterReadingGas?: string
  /**
   * Date of when the reading of gas utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingGasLastRead?: string // date
  /**
   * The recorded utility reading for the electricity meter
   */
  meterReadingElectricity?: string
  /**
   * Date of when the reading of electricity utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingElectricityLastRead?: string // date
  /**
   * The recorded utility reading for the water meter
   */
  meterReadingWater?: string
  /**
   * Date of when the reading of water utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingWaterLastRead?: string // date
  /**
   * A flag determining whether or not the tenancy has been extended indefinitely
   */
  isPeriodic?: boolean
  /**
   * The unique identifier of the type of tenancy
   */
  typeId: string
  /**
   * The unique identifier of the negotiator who is managing the tenancy
   */
  negotiatorId: string
  /**
   * The unique identifier of the property that relates to the tenancy
   */
  propertyId: string
  /**
   * The unique identifier of the applicant who has applied to be a tenant
   */
  applicantId: string
  /**
   * Financial notes set against the tenancy
   */
  feeNotes?: string
  /**
   * Request body used to set letting fees on a new tenancy
   */
  lettingFee?: {
    /**
     * The letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Request body used to set management fees on a new tenancy
   */
  managementFee?: {
    /**
     * The management fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
  /**
   * Request body used to set the deposit of a new tenancy
   */
  deposit?: {
    /**
     * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
     */
    heldBy?: string
    /**
     * The number of weeks or months rent collected as the deposit on the tenancy
     */
    period?: number // int32
    /**
     * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
     */
    type?: string
    /**
     * The amount of deposit held
     */
    sum?: number // double
  }
  /**
   * Request body used to set the source of a new tenancy
   */
  source?: {
    /**
     * The unique identifier of the source for the tenancy
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * App specific metadata to set against the tenancy
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set a break clauses notice required details
 */
export interface CreateTenancyNoticeRequiredModel {
  /**
   * The date a break clauses notice is required by
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The number of months the notice is required before the break clause
   */
  beforeBreakMonths?: number // int32
}
/**
 * Request body used to create a new tenancy renewal check
 * example:
 * [object Object]
 */
export interface CreateTenancyRenewalCheckModel {
  /**
   * The status of the tenancy check (needed/notNeeded/arranging/completed)
   */
  status: string
  /**
   * The identifier of the pre-configured tenancy check. This will only be populated
   * for pre-configured tenancy checks, and not for custom/ad-hoc checks added to individual tenancies
   */
  checkTypeId?: string
  /**
   * The name of this tenancy check
   */
  description?: string
  /**
   * App specific metadata to set against the tenancy renewal check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to create a tenancy renewal negotiation
 * example:
 * [object Object]
 */
export interface CreateTenancyRenewalModel {
  /**
   * The proposed start date of the tenancy renewal
   * example:
   * 2019-08-14T12:30:02Z
   */
  startDate?: string // date-time
  /**
   * The proposed end date of the tenancy renewal
   * example:
   * 2019-08-14T12:30:02Z
   */
  endDate?: string // date-time
  /**
   * The unique identifier of the negotiator who is managing this tenancy renewal
   */
  negotiatorId?: string
  /**
   * The amount of rent required, returned in relation to the collection frequency
   */
  rent?: number // double
  /**
   * The rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Request body used to create a tenancy renewals letting fee
   */
  lettingFee?: {
    /**
     * The letting fee type (fixed/perentage)
     */
    type?: string
    /**
     * The letting fee amount as a fixed price or percentage based on the `type`
     */
    amount?: number // double
    /**
     * The frequency at which the letting fee is required (monthly/quarterly/halfYearly/yearly/28days/upfront/upfrontOver2Months/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Request body used to create a tenancy renewals management fee
   */
  managementFee?: {
    /**
     * The mangement fee type (fixed/perentage)
     */
    type?: string
    /**
     * The mangement fee amount as a fixed price or percentage based on the `type`
     */
    amount?: number // double
    /**
     * The frequency at which the mangement fee is required (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
}
/**
 * Request body used to set a tenancy responsibility
 * example:
 * [object Object]
 */
export interface CreateTenancyResponsibilityModel {
  /**
   * The identifier of the associated to the responsibility
   */
  typeId?: string
  /**
   * The responsible party (landlord/tenant)
   */
  appliesTo?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
}
/**
 * Request body used to set the source of a new tenancy
 */
export interface CreateTenancySourceModel {
  /**
   * The unique identifier of the source for the tenancy
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Request body for associating this offer to another one above it in the chain
 * example:
 * [object Object]
 */
export interface CreateUpwardLinkModel {
  /**
   * The unique identifier of the offer above this one in the chain. Should be left empty if the upward property is external (instructed by another agent)
   */
  offerId?: string
  /**
   * The address of the property above this one in the chain. (Required when 'offerId' is not provided)
   */
  propertyAddress?: string
  /**
   * The name of the agent managing the sale of the property. (Required when 'offerId' is not provided)
   */
  agent?: string
  /**
   * The name of the vendor selling the property. (Required when 'offerId' is not provided)
   */
  vendor?: string
  /**
   * The unique identifier of the solicitor / conveyancer that the vendor has instructed. (Required when 'offerId' is not provided)
   */
  vendorSolicitorId?: string
}
/**
 * Representation of property details specific to utilities
 */
export interface CreateUtilityModel {
  /**
   * A flag denoting whether or not the property has gas connected
   */
  hasGas?: boolean
  /**
   * The unique identifier of the company supplying the gas to the property
   */
  gasCompanyId?: string
  /**
   * The gas meter point number
   */
  gasMeterPoint?: string
  /**
   * The unique identifier of the company supplying the electricity to the property
   */
  electricityCompanyId?: string
  /**
   * The electricity meter point number
   */
  electricityMeterPoint?: string
  /**
   * The unique identifier of the company supplying the water to the property
   */
  waterCompanyId?: string
  /**
   * The water meter point number
   */
  waterMeterPoint?: string
  /**
   * The unique identifier of the company supplying the telephone to the property
   */
  telephoneCompanyId?: string
  /**
   * The unique identifier of the company supplying the internet to the property
   */
  internetCompanyId?: string
  /**
   * The unique identifier of the company supplying the cable tv to the property
   */
  cableTvCompanyId?: string
}
/**
 * Request body used to create a new webhook subscription
 * example:
 * [object Object]
 */
export interface CreateWebhookModel {
  /**
   * The url where the payload associated with the webhook should be sent to
   */
  url: string
  /**
   * A short description associated with the webhook (ie a friendly name or label)
   */
  description?: string
  /**
   * The identifiers of the topics the subscription is associated with
   */
  topicIds?: string[]
  /**
   * Flag denoting whether or not the webhook is active and ready to receive data
   */
  active?: boolean
  /**
   * Flag denoting whether or events that only contain changes to etags and/or modified dates are emitted
   * Pass true to disable emitting of these events
   */
  ignoreEtagOnlyChanges?: boolean
}
/**
 * Representation of a works order item
 * example:
 * [object Object]
 */
export interface CreateWorksOrderItemModel {
  /**
   * The notes attached to the works order item
   */
  notes: string
  /**
   * The party to be charged for the work being carried out (landlord/tenant)
   */
  chargeTo: string
  /**
   * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
   */
  estimate?: number // double
  /**
   * The type of estimate supplied (agent/verbal/written)
   */
  estimateType?: string
  /**
   * The net cost of the work to be carried out
   */
  netAmount?: number // double
  /**
   * The cost of the vat associated with the work
   */
  vatAmount?: number // double
}
/**
 * Request body used to create a new works order
 * example:
 * [object Object]
 */
export interface CreateWorksOrderModel {
  /**
   * The unique identifier of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * The unique identifier of the property where the work is to be carried out
   */
  propertyId: string
  /**
   * The unique identifier of the tenancy that the works order originated from
   */
  tenancyId?: string
  /**
   * The unique identifier of the negotiator that booked the works order
   */
  negotiatorId: string
  /**
   * The unique id of the type of work that needs to be carried out
   */
  typeId?: string
  /**
   * The current status of the works order (pendingApproval/pendingQuote/raised/raisedToChase/landlordToComplete/complete/cancelled/quoteAccepted)
   */
  status: string
  /**
   * A free text description of the work required
   */
  description: string
  /**
   * The party requesting the work to be carried out (landlord/tenant/other)
   */
  reporter: string
  /**
   * The priority level of the works order (low/medium/high)
   */
  priority?: string
  /**
   * The date when the works order was booked
   * example:
   * 2019-08-14
   */
  booked?: string // date
  /**
   * The date when the work is required to be completed by
   * example:
   * 2019-08-14
   */
  required?: string // date
  /**
   * The date when the work was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * Individual work items to attach to the works order
   */
  items: {
    /**
     * The notes attached to the works order item
     */
    notes: string
    /**
     * The party to be charged for the work being carried out (landlord/tenant)
     */
    chargeTo: string
    /**
     * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
     */
    estimate?: number // double
    /**
     * The type of estimate supplied (agent/verbal/written)
     */
    estimateType?: string
    /**
     * The net cost of the work to be carried out
     */
    netAmount?: number // double
    /**
     * The cost of the vat associated with the work
     */
    vatAmount?: number // double
  }[]
  /**
   * App specific metadata to set against the works order
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Representation of a department
 */
export interface DepartmentModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the department
   */
  id?: string
  /**
   * The date and time when the department was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the department was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The name of the department
   */
  name?: string
  /**
   * A collection of property type values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  typeOptions?: string[]
  /**
   * A collection of property style values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  styleOptions?: string[]
  /**
   * A collection of property situation values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  situationOptions?: string[]
  /**
   * A collection of property parking values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  parkingOptions?: string[]
  /**
   * A collection of property age values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  ageOptions?: string[]
  /**
   * A collection of property locality values that will be accepted by other services
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  localityOptions?: string[]
  /**
   * A collection of special property feature values that will be presented by other services
   */
  specialFeaturesOptions?: string[]
  /**
   * A collection of commercial use class values that will be accepted by other services
   */
  commercialUseClassOptions?: string[]
  /**
   * A collection of commercial floor level values that will be accepted by other services
   */
  commercialFloorLevelOptions?: string[]
  /**
   * A flag to determing if the department has bedrooms configured
   */
  hasBedrooms?: boolean
  /**
   * A flag to determing if the department has bathrooms configured
   */
  hasBathrooms?: boolean
  /**
   * A flag to determing if the department has reception rooms configured
   */
  hasReceptionRooms?: boolean
  /**
   * A flag to determing if the department has parking spaces configured
   */
  hasParkingSpaces?: boolean
  /**
   * A flag to determing if the department allows the floor level property to be set
   */
  hasFloorLevelEnabled?: boolean
  /**
   * A flag to determing if the department allows the internal floors property to be set
   */
  hasInternalFloorsEnabled?: boolean
  /**
   * A flag to determing if the department allows the total floors property to be set
   */
  hasTotalFloorsEnabled?: boolean
  /**
   * The ETag for the current version of the department. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface DepartmentModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the department
     */
    id?: string
    /**
     * The date and time when the department was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the department was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The name of the department
     */
    name?: string
    /**
     * A collection of property type values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    typeOptions?: string[]
    /**
     * A collection of property style values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    styleOptions?: string[]
    /**
     * A collection of property situation values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    situationOptions?: string[]
    /**
     * A collection of property parking values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    parkingOptions?: string[]
    /**
     * A collection of property age values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    ageOptions?: string[]
    /**
     * A collection of property locality values that will be accepted by other services
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    localityOptions?: string[]
    /**
     * A collection of special property feature values that will be presented by other services
     */
    specialFeaturesOptions?: string[]
    /**
     * A collection of commercial use class values that will be accepted by other services
     */
    commercialUseClassOptions?: string[]
    /**
     * A collection of commercial floor level values that will be accepted by other services
     */
    commercialFloorLevelOptions?: string[]
    /**
     * A flag to determing if the department has bedrooms configured
     */
    hasBedrooms?: boolean
    /**
     * A flag to determing if the department has bathrooms configured
     */
    hasBathrooms?: boolean
    /**
     * A flag to determing if the department has reception rooms configured
     */
    hasReceptionRooms?: boolean
    /**
     * A flag to determing if the department has parking spaces configured
     */
    hasParkingSpaces?: boolean
    /**
     * A flag to determing if the department allows the floor level property to be set
     */
    hasFloorLevelEnabled?: boolean
    /**
     * A flag to determing if the department allows the internal floors property to be set
     */
    hasInternalFloorsEnabled?: boolean
    /**
     * A flag to determing if the department allows the total floors property to be set
     */
    hasTotalFloorsEnabled?: boolean
    /**
     * The ETag for the current version of the department. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Departments {
  pageSize?: number
  pageNumber?: number
  id?: string[]
  name?: string
}
/**
 * Representation of a document
 */
export interface DocumentModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the document
   */
  id?: string
  /**
   * The date and time when the document was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the document was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The type of entity that the document is associated with
   */
  associatedType?: string
  /**
   * A flag denoting whether or not the document is private
   */
  isPrivate?: boolean
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
   * App specific metadata that has been set against the document
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the document. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface DocumentModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the document
     */
    id?: string
    /**
     * The date and time when the document was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the document was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The type of entity that the document is associated with
     */
    associatedType?: string
    /**
     * A flag denoting whether or not the document is private
     */
    isPrivate?: boolean
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
     * App specific metadata that has been set against the document
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the document. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Documents {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: 'documentType'[]
  id?: string[]
  associatedId?: string[]
  associatedType?: (
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
  typeId?: string[]
  includeRoleDocuments?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
}
export interface Enquiries {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  enquiryType?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
}
/**
 * Representation of the physical address of a building or premise
 */
export interface EnquiryAddressModel {
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
 * Request body used to create a buying enquiry
 */
export interface EnquiryBuyingModel {
  /**
   * The lower bound of the prospective buyer's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the prospective buyer's budget
   */
  priceTo?: number // int32
}
/**
 * Representation of an enquiry
 */
export interface EnquiryModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the enquiry
   */
  id?: number // int32
  /**
   * The date and time when the enquiry was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the enquiry was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The title of the individual making the enquiry
   */
  title?: string
  /**
   * The forename of the individual making the enquiry
   */
  forename?: string
  /**
   * The surname of the individual making the enquiry
   */
  surname?: string
  /**
   * The type of enquiry. Enquiries can created for applicants interested in buying/renting, as well as prospective vendors and landlords (salesApplicant/lettingsApplicant/salesProperty/lettingsProperty)
   */
  enquiryType?: string
  /**
   * Textual information about the nature of the enquiry - usually the message text from the individual making the enquiry
   */
  message?: string
  /**
   * The status of the enquiry (pending/added/rejected/alreadyExists/duplicateEntry/spam)
   */
  status?: string
  /**
   * The marketing consent status of the individual making the enquiry (grant/deny/notAsked)
   */
  marketingConsent?: string
  /**
   * The selling position of the individual making the enquiry (renting/instructedThisAgent/instructedOtherAgent/privateSale/notOnMarket)
   */
  position?: string
  /**
   * The unique identifier of the office related to the enquiry
   */
  officeId?: string
  /**
   * The unique identifier of the applicant related to the enquiry
   */
  applicantId?: string
  /**
   * The unique identifier of the negotiator related to the enquiry
   */
  negotiatorId?: string
  /**
   * The name of the source that the enquiry was generated by
   */
  sourceName?: string
  /**
   * The home phone number of the individual making the enquiry
   */
  homePhone?: string
  /**
   * The work phone number of the individual making the enquiry
   */
  workPhone?: string
  /**
   * The mobile phone number of the individual making the enquiry
   */
  mobilePhone?: string
  /**
   * The email of the individual making the enquiry
   */
  email?: string
  /**
   * Representation of the physical address of a building or premise
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
   * Request body used to create a buying enquiry
   */
  buying?: {
    /**
     * The lower bound of the prospective buyer's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the prospective buyer's budget
     */
    priceTo?: number // int32
  }
  /**
   * The details specific to enquiries with a type of lettingsApplicant
   */
  renting?: {
    /**
     * The lower bound of the prospective tenant's budget
     */
    rentFrom?: number // double
    /**
     * The upper bound of the prospective tenant's budget
     */
    rentTo?: number // double
    /**
     * How often the tenant would like to pay the rent (weekly/monthly/annually)
     */
    rentFrequency?: string
  }
  /**
   * The number of bedrooms the prospective buyer or tenant requires
   */
  bedrooms?: number // int32
  /**
   * A list of unique property identifiers that this enquiry relates to. Used to indicate the properties that a sales or lettings applicant has expressed an interest in
   */
  propertyIds?: string[]
  /**
   * The ETag for the current version of the enquiry. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface EnquiryModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the enquiry
     */
    id?: number // int32
    /**
     * The date and time when the enquiry was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the enquiry was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The title of the individual making the enquiry
     */
    title?: string
    /**
     * The forename of the individual making the enquiry
     */
    forename?: string
    /**
     * The surname of the individual making the enquiry
     */
    surname?: string
    /**
     * The type of enquiry. Enquiries can created for applicants interested in buying/renting, as well as prospective vendors and landlords (salesApplicant/lettingsApplicant/salesProperty/lettingsProperty)
     */
    enquiryType?: string
    /**
     * Textual information about the nature of the enquiry - usually the message text from the individual making the enquiry
     */
    message?: string
    /**
     * The status of the enquiry (pending/added/rejected/alreadyExists/duplicateEntry/spam)
     */
    status?: string
    /**
     * The marketing consent status of the individual making the enquiry (grant/deny/notAsked)
     */
    marketingConsent?: string
    /**
     * The selling position of the individual making the enquiry (renting/instructedThisAgent/instructedOtherAgent/privateSale/notOnMarket)
     */
    position?: string
    /**
     * The unique identifier of the office related to the enquiry
     */
    officeId?: string
    /**
     * The unique identifier of the applicant related to the enquiry
     */
    applicantId?: string
    /**
     * The unique identifier of the negotiator related to the enquiry
     */
    negotiatorId?: string
    /**
     * The name of the source that the enquiry was generated by
     */
    sourceName?: string
    /**
     * The home phone number of the individual making the enquiry
     */
    homePhone?: string
    /**
     * The work phone number of the individual making the enquiry
     */
    workPhone?: string
    /**
     * The mobile phone number of the individual making the enquiry
     */
    mobilePhone?: string
    /**
     * The email of the individual making the enquiry
     */
    email?: string
    /**
     * Representation of the physical address of a building or premise
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
     * Request body used to create a buying enquiry
     */
    buying?: {
      /**
       * The lower bound of the prospective buyer's budget
       */
      priceFrom?: number // int32
      /**
       * The upper bound of the prospective buyer's budget
       */
      priceTo?: number // int32
    }
    /**
     * The details specific to enquiries with a type of lettingsApplicant
     */
    renting?: {
      /**
       * The lower bound of the prospective tenant's budget
       */
      rentFrom?: number // double
      /**
       * The upper bound of the prospective tenant's budget
       */
      rentTo?: number // double
      /**
       * How often the tenant would like to pay the rent (weekly/monthly/annually)
       */
      rentFrequency?: string
    }
    /**
     * The number of bedrooms the prospective buyer or tenant requires
     */
    bedrooms?: number // int32
    /**
     * A list of unique property identifiers that this enquiry relates to. Used to indicate the properties that a sales or lettings applicant has expressed an interest in
     */
    propertyIds?: string[]
    /**
     * The ETag for the current version of the enquiry. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * The details specific to enquiries with a type of lettingsApplicant
 */
export interface EnquiryRentingModel {
  /**
   * The lower bound of the prospective tenant's budget
   */
  rentFrom?: number // double
  /**
   * The upper bound of the prospective tenant's budget
   */
  rentTo?: number // double
  /**
   * How often the tenant would like to pay the rent (weekly/monthly/annually)
   */
  rentFrequency?: string
}
/**
 * Any specific details relating to the marketing of a property in Guernsey
 */
export interface GuernseyModel {
  /**
   * Attributes describing which markets the property is available in (local/openA/openB/openC/openD)
   */
  market?: string[]
}
export type HttpStatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 421
  | 422
  | 423
  | 424
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511 // int32
/**
 * Representation of a contact identity check
 */
export interface IdentityCheckModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
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
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the identity check was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * Representation of a single identity document that was provided as part of a contact identity check (eg. passport)
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
   * Representation of a single identity document that was provided as part of a contact identity check (eg. passport)
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
}
export interface IdentityCheckModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
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
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the identity check was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * Representation of a single identity document that was provided as part of a contact identity check (eg. passport)
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
     * Representation of a single identity document that was provided as part of a contact identity check (eg. passport)
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface IdentityChecks {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('contact' | 'document1' | 'document2' | 'documentType1' | 'documentType2')[]
  id?: string[]
  contactId?: string[]
  negotiatorId?: string[]
  status?: ('unknown' | 'unchecked' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass')[]
  checkDateFrom?: string
  checkDateTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
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
 * Representation of an individual key included in a key set
 */
export interface IndividualKeyModel {
  /**
   * The name of the individual key in the set
   */
  name?: string
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
  associatedId: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType: string
  /**
   * Flag denoting whether or not this relationship should be considered to be the main/primary relationship. Setting to true will automatically demote the existing primary relationship
   */
  isMain: boolean
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
  associatedId: string
  /**
   * The type of relationship to create (contact/company)
   */
  associatedType: string
  /**
   * Flag denoting whether or not this relationship should be considered to be the main/primary relationship. Setting to true will automatically demote the existing primary relationship
   */
  isMain: boolean
}
/**
 * Any specific details relating to energy performance ratings for properties marketed in Ireland
 */
export interface IrelandPropertyBERModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
   */
  exempt?: boolean
  /**
   * The BER rating of the property
   */
  rating?: string
  /**
   * The BER certificate reference number
   */
  refNumber?: string
  /**
   * The energy performance indicator for the property
   */
  epi?: string
}
/**
 * Any specific details relating to the marketing of a property in Ireland
 */
export interface IrelandPropertyModel {
  /**
   * Any specific details relating to energy performance ratings for properties marketed in Ireland
   */
  buildingEnergyRating?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
     */
    exempt?: boolean
    /**
     * The BER rating of the property
     */
    rating?: string
    /**
     * The BER certificate reference number
     */
    refNumber?: string
    /**
     * The energy performance indicator for the property
     */
    epi?: string
  }
}
export interface JournalEntries {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('property' | 'negotiator' | 'type')[]
  associatedType?: string
  associatedId?: string[]
  negotiatorId?: string[]
  propertyId?: string[]
  typeId?: string[]
  createdFrom?: string
  createdTo?: string
}
/**
 * Representation of a journal entry
 */
export interface JournalEntryModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The date and time when the journal entry was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The unique identifier of the property the journal entry is related to. Can additionally be associated to another type
   */
  propertyId?: string
  /**
   * The entity type the journal entry has been raised against (applicant/contact/company/landlord/tenancy/worksOrder)
   */
  associatedType?: string
  /**
   * The unique identifier of the entity the journal entry has been raised against. Can additionally be associated to a property
   */
  associatedId?: string
  /**
   * The type of journal entry
   */
  typeId?: string
  /**
   * The unique identifier of the negotiator that created the entry
   */
  negotiatorId?: string
  /**
   * The textual description of the journal entry event
   */
  description?: string
}
export interface JournalEntryModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The date and time when the journal entry was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The unique identifier of the property the journal entry is related to. Can additionally be associated to another type
     */
    propertyId?: string
    /**
     * The entity type the journal entry has been raised against (applicant/contact/company/landlord/tenancy/worksOrder)
     */
    associatedType?: string
    /**
     * The unique identifier of the entity the journal entry has been raised against. Can additionally be associated to a property
     */
    associatedId?: string
    /**
     * The type of journal entry
     */
    typeId?: string
    /**
     * The unique identifier of the negotiator that created the entry
     */
    negotiatorId?: string
    /**
     * The textual description of the journal entry event
     */
    description?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a key movement
 */
export interface KeyMovementModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the key movement
   */
  id?: string
  /**
   * The date and time when the key movement was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the key movement was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the key set this movement belongs to
   */
  keyId?: string
  /**
   * The unique identifier of the property that the key set belongs to
   */
  propertyId?: string
  /**
   * The unique identifier of the contact/negotiator that the key is checked out with
   */
  checkOutToId?: string
  /**
   * The type of entity that checked out the key (contact/negotiator)
   */
  checkOutToType?: string
  /**
   * The date and time of when the key set was checked out
   * example:
   * 2019-08-14T12:30:02Z
   */
  checkOutAt?: string // date-time
  /**
   * The unique identifier of the negotiator who performed the key check out
   */
  checkOutNegotiatorId?: string
  /**
   * The date and time of when the key set was checked in
   * example:
   * 2019-08-14T12:30:02Z
   */
  checkInAt?: string // date-time
  /**
   * The unique identifier of the negotiator who performed the key check in
   */
  checkInNegotiatorId?: string
  /**
   * The ETag for the current version of the key movement. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface KeyMovementModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the key movement
     */
    id?: string
    /**
     * The date and time when the key movement was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the key movement was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the key set this movement belongs to
     */
    keyId?: string
    /**
     * The unique identifier of the property that the key set belongs to
     */
    propertyId?: string
    /**
     * The unique identifier of the contact/negotiator that the key is checked out with
     */
    checkOutToId?: string
    /**
     * The type of entity that checked out the key (contact/negotiator)
     */
    checkOutToType?: string
    /**
     * The date and time of when the key set was checked out
     * example:
     * 2019-08-14T12:30:02Z
     */
    checkOutAt?: string // date-time
    /**
     * The unique identifier of the negotiator who performed the key check out
     */
    checkOutNegotiatorId?: string
    /**
     * The date and time of when the key set was checked in
     * example:
     * 2019-08-14T12:30:02Z
     */
    checkInAt?: string // date-time
    /**
     * The unique identifier of the negotiator who performed the key check in
     */
    checkInNegotiatorId?: string
    /**
     * The ETag for the current version of the key movement. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a set of keys
 */
export interface KeysModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the key
   */
  id?: string
  /**
   * The date and time when the key was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the key was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The number assigned to the key - key numbers can only be occupied by a single property within an office concurrently
   */
  number?: string
  /**
   * The unique identifier of the key type
   */
  typeId?: string
  /**
   * The unique identifier of the office responsible for the key
   */
  officeId?: string
  /**
   * The unique identifier of the property that the key belongs to
   */
  propertyId?: string
  /**
   * The status of the key (checkedIn/checkedOut/noLongerHeld)
   */
  status?: string
  /**
   * A listing of the individual keys included in the set
   */
  keysInSet?: {
    /**
     * The name of the individual key in the set
     */
    name?: string
  }[]
  /**
   * The ETag for the current version of the keys. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface KeysModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the key
     */
    id?: string
    /**
     * The date and time when the key was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the key was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The number assigned to the key - key numbers can only be occupied by a single property within an office concurrently
     */
    number?: string
    /**
     * The unique identifier of the key type
     */
    typeId?: string
    /**
     * The unique identifier of the office responsible for the key
     */
    officeId?: string
    /**
     * The unique identifier of the property that the key belongs to
     */
    propertyId?: string
    /**
     * The status of the key (checkedIn/checkedOut/noLongerHeld)
     */
    status?: string
    /**
     * A listing of the individual keys included in the set
     */
    keysInSet?: {
      /**
       * The name of the individual key in the set
       */
      name?: string
    }[]
    /**
     * The ETag for the current version of the keys. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
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
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The date of birth of the contact (Available when 'type' is 'contact')
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
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
   * Representation of the physical address of a building or premise
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
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
}
/**
 * Representation of relationship between a landlord and a contact or company
 */
export interface LandlordContactRelationshipModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
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
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
}
export interface LandlordContactRelationshipModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
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
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a landlord
 */
export interface LandlordModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the landlord
   */
  id?: string
  /**
   * The date and time when the landlord was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the landlord was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * Representation of a landlord's source
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
     * The complete name of the contact or company
     */
    name?: string
    /**
     * The title of the contact (Available when 'type' is 'contact')
     */
    title?: string
    /**
     * The forename of the contact (Available when 'type' is 'contact')
     */
    forename?: string
    /**
     * The surname of the contact (Available when 'type' is 'contact')
     */
    surname?: string
    /**
     * The date of birth of the contact (Available when 'type' is 'contact')
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
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
     * Representation of the physical address of a building or premise
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
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
  }[]
  /**
   * App specific metadata that has been set against the landlord
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the landlord. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface LandlordModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the landlord
     */
    id?: string
    /**
     * The date and time when the landlord was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the landlord was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * Representation of a landlord's source
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
       * The complete name of the contact or company
       */
      name?: string
      /**
       * The title of the contact (Available when 'type' is 'contact')
       */
      title?: string
      /**
       * The forename of the contact (Available when 'type' is 'contact')
       */
      forename?: string
      /**
       * The surname of the contact (Available when 'type' is 'contact')
       */
      surname?: string
      /**
       * The date of birth of the contact (Available when 'type' is 'contact')
       * example:
       * 2019-08-14
       */
      dateOfBirth?: string // date
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
       * Representation of the physical address of a building or premise
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
      /**
       * A collection of additional contact details
       */
      additionalContactDetails?: {
        /**
         * The type of contact detail
         */
        type?: string
        /**
         * The contact detail
         */
        value?: string
      }[]
    }[]
    /**
     * App specific metadata that has been set against the landlord
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the landlord. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
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
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('appointments' | 'documents' | 'office' | 'properties' | 'solicitor' | 'source')[]
  id?: string[]
  email?: string[]
  officeId?: string[]
  extrasField?: string[]
  active?: boolean
  address?: string
  name?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
}
export interface LinkModel {
  href?: string
}
/**
 * Representation of detail properties configuration item
 * configuration
 */
export interface ListItemDetailModel {
  /**
   * The unique identifier of the list item
   */
  id?: string
  /**
   * The textual value for the list item
   */
  value?: string
  /**
   * A flag determining the status
   */
  active?: boolean
  /**
   * A collection of unique identifiers of offices associated
   */
  officeIds?: string[]
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
export interface Metadata {
  pageSize?: number
  pageNumber?: number
  entityType?: string
  id?: string[]
  entityId?: string[]
  filter?: string[]
}
export interface MetadataMetadataSchema {
  pageSize?: number
  pageNumber?: number
  entityType?: string
}
/**
 * Model representing the state of a metadata record for a given entity
 */
export interface MetadataModel {
  /**
   * The unique identifier of this metadata record
   */
  id?: string
  /**
   * The date and time of when this metadata record was last updated
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The name of the entity type that this metadata record is associated to
   */
  entityType?: string
  /**
   * The unique identifier of the the entity that this metadata is associated to
   */
  entityId?: string
  /**
   * The JSON document content
   */
  metadata?: {
    [name: string]: any
  }
}
export interface MetadataModelPagedResult {
  _embedded?: {
    /**
     * The unique identifier of this metadata record
     */
    id?: string
    /**
     * The date and time of when this metadata record was last updated
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The name of the entity type that this metadata record is associated to
     */
    entityType?: string
    /**
     * The unique identifier of the the entity that this metadata is associated to
     */
    entityId?: string
    /**
     * The JSON document content
     */
    metadata?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a negotiator
 */
export interface NegotiatorModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the negotiator
   */
  id?: string
  /**
   * The date and time when the negotiator was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the negotiator was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The URL of the optional negotiator profile image
   */
  profileImageUrl?: string
  /**
   * A flag determining whether or not the negotiator is active
   */
  active?: boolean
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
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
}
export interface NegotiatorModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the negotiator
     */
    id?: string
    /**
     * The date and time when the negotiator was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the negotiator was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The URL of the optional negotiator profile image
     */
    profileImageUrl?: string
    /**
     * A flag determining whether or not the negotiator is active
     */
    active?: boolean
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Negotiators {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: 'office'[]
  id?: string[]
  officeId?: string[]
  email?: string
  name?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  active?: boolean
  metadata?: string[]
}
/**
 * Model representing a nominal account
 */
export interface NominalAccountModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the nominal account
   */
  id?: string
  /**
   * The date and time when the nominal account was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the nominal account was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The nominal account name
   */
  name?: string
  /**
   * Flag indicating whether or not the nominal account can be associated with works orders
   */
  appliesToWorksOrders?: boolean
}
export interface NominalAccountModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the nominal account
     */
    id?: string
    /**
     * The date and time when the nominal account was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the nominal account was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The nominal account name
     */
    name?: string
    /**
     * Flag indicating whether or not the nominal account can be associated with works orders
     */
    appliesToWorksOrders?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
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
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The date of birth of the contact (Available when 'type' is 'contact')
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
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
   * Representation of the physical address of a building or premise
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
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
}
/**
 * Representation of an offer
 */
export interface OfferModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the offer
   */
  id?: string
  /**
   * The the date and time when the offer was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the offer was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The unique identifier of the company associated to the offer
   */
  companyId?: string
  /**
   * The unique identifier of the contact associated to the offer
   */
  contactId?: string
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
     * The complete name of the contact or company
     */
    name?: string
    /**
     * The title of the contact (Available when 'type' is 'contact')
     */
    title?: string
    /**
     * The forename of the contact (Available when 'type' is 'contact')
     */
    forename?: string
    /**
     * The surname of the contact (Available when 'type' is 'contact')
     */
    surname?: string
    /**
     * The date of birth of the contact (Available when 'type' is 'contact')
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
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
     * Representation of the physical address of a building or premise
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
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
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
}
export interface OfferModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the offer
     */
    id?: string
    /**
     * The the date and time when the offer was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the offer was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The unique identifier of the company associated to the offer
     */
    companyId?: string
    /**
     * The unique identifier of the contact associated to the offer
     */
    contactId?: string
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
       * The complete name of the contact or company
       */
      name?: string
      /**
       * The title of the contact (Available when 'type' is 'contact')
       */
      title?: string
      /**
       * The forename of the contact (Available when 'type' is 'contact')
       */
      forename?: string
      /**
       * The surname of the contact (Available when 'type' is 'contact')
       */
      surname?: string
      /**
       * The date of birth of the contact (Available when 'type' is 'contact')
       * example:
       * 2019-08-14
       */
      dateOfBirth?: string // date
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
       * Representation of the physical address of a building or premise
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
      /**
       * A collection of additional contact details
       */
      additionalContactDetails?: {
        /**
         * The type of contact detail
         */
        type?: string
        /**
         * The contact detail
         */
        value?: string
      }[]
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Offers {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('applicant' | 'conveyancing' | 'property' | 'negotiator')[]
  id?: string[]
  applicantId?: string[]
  propertyId?: string[]
  status?: ('pending' | 'withdrawn' | 'rejected' | 'accepted' | 'noteOfInterest' | 'noteOfInterestWithdrawn')[]
  address?: string
  name?: string
  amountFrom?: number
  amountTo?: number
  dateFrom?: string
  dateTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
}
/**
 * Representation of the geographical location of an address using coordinates
 */
export interface OfficeAddressGeolocationModel {
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
  /**
   * Representation of the geographical location of an address using coordinates
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
 * Representation of an office
 */
export interface OfficeModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the office
   */
  id?: string
  /**
   * The date and time when the office was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the office was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * A flag denoting whether or not this office is active
   */
  active?: boolean
  /**
   * Representation of the physical address of a building or premise
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
     * Representation of the geographical location of an address using coordinates
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
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
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
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
}
export interface OfficeModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the office
     */
    id?: string
    /**
     * The date and time when the office was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the office was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * A flag denoting whether or not this office is active
     */
    active?: boolean
    /**
     * Representation of the physical address of a building or premise
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
       * Representation of the geographical location of an address using coordinates
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
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
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
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Offices {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: 'negotiators'[]
  id?: string[]
  address?: string
  name?: string
  active?: boolean
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
  extrasField?: string[]
}
/**
 * Representation of a calendar appointment
 */
export interface OpenHouseAttendeeModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the open house attendee
   */
  id?: string
  /**
   * The unique identifier of the open house appointment
   */
  openHouseId?: string
  /**
   * The date and time when the open house attendee was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the open house attendee was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The notes taken regarding the open house attendee
   */
  notes?: string
  /**
   * The open house attendees interest level (veryInterested/notInterested/possibleInterest)
   */
  interestLevel?: string
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
      /**
       * A flag determining if the related contact is archived
       */
      fromArchive?: boolean
    }[]
  }
  /**
   * The ETag for the current version of the open house attendee. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface OpenHouseAttendeeModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the open house attendee
     */
    id?: string
    /**
     * The unique identifier of the open house appointment
     */
    openHouseId?: string
    /**
     * The date and time when the open house attendee was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the open house attendee was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The notes taken regarding the open house attendee
     */
    notes?: string
    /**
     * The open house attendees interest level (veryInterested/notInterested/possibleInterest)
     */
    interestLevel?: string
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
        /**
         * A flag determining if the related contact is archived
         */
        fromArchive?: boolean
      }[]
    }
    /**
     * The ETag for the current version of the open house attendee. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * example:
 * [object Object]
 */
export interface Operation {
  operationType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 // int32
  path?: string
  op?: string
  from?: string
  value?: any
}
export type OperationType = 0 | 1 | 2 | 3 | 4 | 5 | 6 // int32
export interface PagingLinkModel {
  href?: string
}
export interface Properties {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: (
    | 'appointments'
    | 'area'
    | 'certificates'
    | 'department'
    | 'documents'
    | 'images'
    | 'keys'
    | 'landlord'
    | 'negotiator'
    | 'offers'
    | 'offices'
    | 'tenancies'
    | 'vendor'
  )[]
  id?: string[]
  age?: ('period' | 'new' | 'modern' | 'old')[]
  agentRole?: (
    | 'managed'
    | 'rentCollection'
    | 'collectFirstPayment'
    | 'collectRentToDate'
    | 'lettingOnly'
    | 'introducingTenant'
  )[]
  areaId?: string[]
  excludeAreaId?: string[]
  landlordId?: string[]
  lettingStatus?: (
    | 'valuation'
    | 'toLet'
    | 'toLetUnavailable'
    | 'underOffer'
    | 'underOfferUnavailable'
    | 'arrangingTenancyUnavailable'
    | 'arrangingTenancy'
    | 'tenancyCurrentUnavailable'
    | 'tenancyCurrent'
    | 'tenancyFinished'
    | 'tenancyCancelled'
    | 'sold'
    | 'letByOtherAgent'
    | 'letPrivately'
    | 'provisional'
    | 'withdrawn'
  )[]
  locality?: ('rural' | 'village' | 'townCity')[]
  marketingMode?: ('selling' | 'letting' | 'sellingAndLetting')[]
  masterId?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  parking?: (
    | 'residents'
    | 'offStreet'
    | 'secure'
    | 'underground'
    | 'garage'
    | 'doubleGarage'
    | 'tripleGarage'
    | 'carport'
  )[]
  sellingStatus?: (
    | 'preAppraisal'
    | 'valuation'
    | 'paidValuation'
    | 'forSale'
    | 'forSaleUnavailable'
    | 'underOffer'
    | 'underOfferUnavailable'
    | 'reserved'
    | 'exchanged'
    | 'completed'
    | 'soldExternally'
    | 'withdrawn'
  )[]
  situation?: (
    | 'garden'
    | 'land'
    | 'patio'
    | 'roofTerrace'
    | 'conservatory'
    | 'balcony'
    | 'communalGardens'
    | 'outsideSpace'
  )[]
  style?: (
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
    | 'duplex'
  )[]
  type?: (
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
  market?: ('local' | 'openA' | 'openB' | 'openC' | 'openD')[]
  address?: string
  countryId?: string
  departmentId?: string
  bedroomsFrom?: number
  bedroomsTo?: number
  priceFrom?: number
  priceTo?: number
  rentFrom?: number
  rentTo?: number
  rentFrequency?: ('weekly' | 'monthly' | 'annually')[]
  internetAdvertising?: boolean
  isExternal?: boolean
  fromArchive?: boolean
  availableFrom?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
  extrasField?: string[]
}
export interface PropertiesCertificates {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  expiryDateFrom?: string
  expiryDateTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  categories?: string[]
  typeIds?: string[]
  propertyIds?: string[]
  embed?: 'property'[]
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
   * The local timezone for the address, based on the Geolocation coordinates
   */
  localTimeZone?: string
  /**
   * Representation of the geographical location of an address using coordinates
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
 * Representation of a check
 */
export interface PropertyCheckModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the check
   */
  id?: string
  /**
   * The date and time when the check was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the check was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * Textual description of what the check relates to
   */
  description?: string
  /**
   * The status of the check (needed/notNeeded/arranging/completed)
   */
  status?: string
  /**
   * The type of the check (preInstruction)
   */
  type?: string
  /**
   * The unique identifier of the property that this check relates to
   */
  propertyId?: string
  /**
   * The ETag for the current version of the check. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface PropertyCheckModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the check
     */
    id?: string
    /**
     * The date and time when the check was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the check was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * Textual description of what the check relates to
     */
    description?: string
    /**
     * The status of the check (needed/notNeeded/arranging/completed)
     */
    status?: string
    /**
     * The type of the check (preInstruction)
     */
    type?: string
    /**
     * The unique identifier of the property that this check relates to
     */
    propertyId?: string
    /**
     * The ETag for the current version of the check. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * An properties commercial details
 */
export interface PropertyCommercialModel {
  /**
   * The commercial use attributes (eg a1, a2, b1), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  useClass?: string[]
  /**
   * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  floorLevel?: string[]
}
/**
 * Representation of the the commission fee for a property
 */
export interface PropertyCommissionFeeModel {
  /**
   * The commission letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The commission letting fee amount
   */
  amount?: number // double
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
   * The current energy efficiency letter rating (A-G). This is generated from the `eer` value
   * for systems that do not have an explicit EPC Rating component
   */
  eerRating?: string
  /**
   * The potential energy efficiency rating
   */
  eerPotential?: number // int32
  /**
   * The potential energy efficiency letter rating (A-G). This is generated from the `eerPotential` value
   */
  eerPotentialRating?: string
  /**
   * The current environmental impact rating
   */
  eir?: number // int32
  /**
   * The current environment impact letter rating (A-G). This is generated from the `eir` value
   */
  eirRating?: string
  /**
   * The potential environmental impact rating
   */
  eirPotential?: number // int32
  /**
   * The potential environment impact letter rating (A-G). This is generated from the `eirPotential` value
   */
  eirPotentialRating?: string
  /**
   * The URL to access the full EPC document
   */
  fullDocumentUrl?: string
  /**
   * The URL to access the first page of the EPC document
   */
  firstPageDocumentUrl?: string
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
   * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the image, which is also the filename
   */
  id?: string
  /**
   * The date and time when the image was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the property image was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The type of image (photograph/floorPlan/epc/map)
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
}
export interface PropertyImageModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the image, which is also the filename
     */
    id?: string
    /**
     * The date and time when the image was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the property image was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The type of image (photograph/floorPlan/epc/map)
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PropertyImages {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  embed?: 'property'[]
  propertyId?: string[]
  type?: ('photograph' | 'map' | 'floorPlan' | 'epc')[]
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
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
 * Representation of property details specific to property licence application
 */
export interface PropertyLettingLicenceApplicationModel {
  /**
   * The status of the licence application (applied/granted/landlordApplying/notApplicable)
   */
  status?: string
  /**
   * The licence application reference number
   */
  referenceNumber?: string
  /**
   * The date the licence was applied for
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The date the licence application was granted
   * example:
   * 2019-08-14
   */
  granted?: string // date
  /**
   * The date the licence will expire
   * example:
   * 2019-08-14
   */
  expiry?: string // date
}
/**
 * Representation of property details specific to property Licencing
 */
export interface PropertyLettingLicencingModel {
  /**
   * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
   */
  licenceRequired?: boolean
  /**
   * The type of licence (additional/mandatory/none/notSet/selective)
   */
  licenceType?: string
  /**
   * The number of households that the licence permits in the property
   */
  households?: number // int32
  /**
   * The number of occupants that the licence permits in the property
   */
  occupants?: number // int32
  /**
   * A flag determining whether or not the property is above commercial premises
   */
  aboveCommercialPremises?: boolean
  /**
   * Representation of property details specific to property licence application
   */
  application?: {
    /**
     * The status of the licence application (applied/granted/landlordApplying/notApplicable)
     */
    status?: string
    /**
     * The licence application reference number
     */
    referenceNumber?: string
    /**
     * The date the licence was applied for
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The date the licence application was granted
     * example:
     * 2019-08-14
     */
    granted?: string // date
    /**
     * The date the licence will expire
     * example:
     * 2019-08-14
     */
    expiry?: string // date
  }
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
   * The date the letting agreement between the landlord and agent was signed
   * example:
   * 2019-08-14
   */
  agreementSigned?: string // date
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Details of any bills that are included in the rent
   */
  rentIncludes?: string
  /**
   * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
   */
  furnishing?: string[]
  /**
   * The acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
  /**
   * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole?: string
  /**
   * The unique identifier of the landlord letting the property
   */
  landlordId?: string
  /**
   * A note to accompany any works orders created for the property
   */
  worksOrderNote?: string
  /**
   * The minimum number of months the property can be let out for
   */
  minimumTerm?: number // int32
  /**
   * The unique identifier of the negotiator that manages the property
   */
  propertyManagerId?: string
  /**
   * The unique identifiers of the management companies associated to the property
   */
  managementCompanyIds?: string[]
  /**
   * The unique identifier of the document used for the lettings brochure
   */
  brochureId?: string
  /**
   * The URL at which the brochure can be publicly accessed when the
   * property is being actively marketed
   */
  publicBrochureUrl?: string // uri
  /**
   * Representation of the the commission fee for a property
   */
  managementFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * Representation of the the commission fee for a property
   */
  lettingFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The rent qualifier (rentOnApplication/askingRent)
   */
  qualifier?: string
  /**
   * Representation of property details specific to utilities
   */
  utilities?: {
    /**
     * A flag denoting whether or not the property has gas connected
     */
    hasGas?: boolean
    /**
     * The unique identifier of the company supplying the gas to the property
     */
    gasCompanyId?: string
    /**
     * The gas meter point number
     */
    gasMeterPoint?: string
    /**
     * The unique identifier of the company supplying the electricity to the property
     */
    electricityCompanyId?: string
    /**
     * The electricity meter point number
     */
    electricityMeterPoint?: string
    /**
     * The unique identifier of the company supplying the water to the property
     */
    waterCompanyId?: string
    /**
     * The water meter point number
     */
    waterMeterPoint?: string
    /**
     * The unique identifier of the company supplying the telephone to the property
     */
    telephoneCompanyId?: string
    /**
     * The unique identifier of the company supplying the internet to the property
     */
    internetCompanyId?: string
    /**
     * The unique identifier of the company supplying the cable tv to the property
     */
    cableTvCompanyId?: string
  }
  /**
   * Representation of a property details related to deposit
   */
  deposit?: {
    /**
     * The type of deposit (weeks/months/fixed)
     */
    type?: string
    /**
     * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
     */
    amount?: number // double
  }
  /**
   * Representation of property details specific to rent insurance associated with a lettings property
   */
  rentInsurance?: {
    /**
     * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
     */
    status?: string
    /**
     * The reference number of the insurance policy when rent protection insurance has been taken out
     */
    referenceNumber?: string
    /**
     * The insurance policy start date
     * example:
     * 2019-08-14
     */
    start?: string // date
    /**
     * The insurance policy end date
     * example:
     * 2019-08-14
     */
    end?: string // date
    /**
     * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
     */
    cancelledReasonId?: string
    /**
     * A textual comment or note entered by the agent when an insurance policy was cancelled
     */
    cancelledComment?: string
    /**
     * Flag indicating whether or not the insurance policy should auto renew
     */
    autoRenew?: boolean
  }
  /**
   * Representation of property details specific to property Licencing
   */
  licencing?: {
    /**
     * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
     */
    licenceRequired?: boolean
    /**
     * The type of licence (additional/mandatory/none/notSet/selective)
     */
    licenceType?: string
    /**
     * The number of households that the licence permits in the property
     */
    households?: number // int32
    /**
     * The number of occupants that the licence permits in the property
     */
    occupants?: number // int32
    /**
     * A flag determining whether or not the property is above commercial premises
     */
    aboveCommercialPremises?: boolean
    /**
     * Representation of property details specific to property licence application
     */
    application?: {
      /**
       * The status of the licence application (applied/granted/landlordApplying/notApplicable)
       */
      status?: string
      /**
       * The licence application reference number
       */
      referenceNumber?: string
      /**
       * The date the licence was applied for
       * example:
       * 2019-08-14
       */
      date?: string // date
      /**
       * The date the licence application was granted
       * example:
       * 2019-08-14
       */
      granted?: string // date
      /**
       * The date the licence will expire
       * example:
       * 2019-08-14
       */
      expiry?: string // date
    }
  }
}
/**
 * Representation of property details specific to rent insurance associated with a lettings property
 */
export interface PropertyLettingRentInsuranceModel {
  /**
   * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
   */
  status?: string
  /**
   * The reference number of the insurance policy when rent protection insurance has been taken out
   */
  referenceNumber?: string
  /**
   * The insurance policy start date
   * example:
   * 2019-08-14
   */
  start?: string // date
  /**
   * The insurance policy end date
   * example:
   * 2019-08-14
   */
  end?: string // date
  /**
   * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
   */
  cancelledReasonId?: string
  /**
   * A textual comment or note entered by the agent when an insurance policy was cancelled
   */
  cancelledComment?: string
  /**
   * Flag indicating whether or not the insurance policy should auto renew
   */
  autoRenew?: boolean
}
/**
 * Representation of a property details related to deposit
 */
export interface PropertyLettingsDepositModel {
  /**
   * The type of deposit (weeks/months/fixed)
   */
  type?: string
  /**
   * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
   */
  amount?: number // double
}
/**
 * Representation of a property. Properties can be grouped into developments in the source data, functionality that is typically used by New Homes departments.
 * The _links collection will expose specific links to allow developers to navigate through a particular development, should a property be configured in this manner. Refer to commentary on the _links collection for more details
 */
export interface PropertyModel {
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the property
   */
  id?: string
  /**
   * The date and time when the property was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the property was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The date the owner of the property was last called
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date the owner of the property is next due to be called
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * The marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode?: string
  /**
   * The currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * An optional alternative identifier specified for this property
   */
  alternateId?: string
  /**
   * Representation of the physical address of a building or premise
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
     * The local timezone for the address, based on the Geolocation coordinates
     */
    localTimeZone?: string
    /**
     * Representation of the geographical location of an address using coordinates
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
   * The long description of the property
   */
  longDescription?: string
  /**
   * The property's local authority
   */
  localAuthorityCompanyId?: string
  /**
   * The name of the property's local authority
   */
  localAuthorityCompanyName?: string
  /**
   * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
   */
  summary?: string
  /**
   * The unique identifier of the department the property is associated with. The property will only match to applicants with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
   */
  departmentId?: string
  /**
   * The unique identifier of the negotiator managing the property
   */
  negotiatorId?: string
  /**
   * The total number of bedrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bedrooms?: number // int32
  /**
   * The maximum number of bedrooms in the property or properties. This is typically used when marketing development sites and would be set on the master record. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bedroomsMax?: number // int32
  /**
   * The total number of reception rooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  receptions?: number // int32
  /**
   * The maximum number of reception rooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  receptionsMax?: number // int32
  /**
   * The total number of bathrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bathrooms?: number // int32
  /**
   * The maximum number of bathrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  bathroomsMax?: number // int32
  /**
   * The number of units offered on the market. This is typically used when marketing development sites.
   */
  numberOfUnits?: number // int32
  /**
   * The total number of parking spaces the property has. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  parkingSpaces?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H/I/notYetAvailable)
   */
  councilTax?: string
  /**
   * A collection of identifiers of portals that the property should not be displayed on
   */
  disabledPortalIds?: string[]
  /**
   * A flag denoting whether or not this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * A flag denoting whether or not the property has been instructed by another estate agent
   */
  isExternal?: boolean
  /**
   * The arrangements regarding viewing the property
   */
  viewingArrangements?: string
  /**
   * The url of a video associated with this property, such as a virtual tour
   */
  videoUrl?: string
  /**
   * The caption for the video url associated with this property
   */
  videoCaption?: string
  /**
   * The url of a second video associated with this property, such as a virtual tour
   */
  video2Url?: string
  /**
   * The caption for the second video url associated with this property
   */
  video2Caption?: string
  /**
   * Any general notes regarding the property. These are not usually exposed to end users and may contain sensitive information about a sale
   */
  notes?: string
  /**
   * The status of the advertising board sited outside or near to the property
   */
  boardStatus?: string
  /**
   * Any notes relevant to the advertising board sited outside or near to the property
   */
  boardNotes?: string
  /**
   * The properties featured image url
   */
  featuredImageUrl?: string // uri
  /**
   * The url to the property on an external website
   */
  url?: string
  /**
   * The caption to accompany the url to the property on an external website
   */
  urlCaption?: string
  /**
   * Any ground rent payment that applies to the property
   */
  groundRent?: number // double
  /**
   * Comments regarding the ground rent of the property
   */
  groundRentComment?: string
  /**
   * The date when the ground rent payable on the property should be reviewed
   * example:
   * 2019-08-14T12:30:02Z
   */
  groundRentReviewDate?: string // date-time
  /**
   * The annual percentage increase of the ground rent after being reviewed
   */
  groundRentIncrease?: number // double
  /**
   * Any service charge payment that applies to the property
   */
  serviceCharge?: number // double
  /**
   * Comments regarding the service charge of the property
   */
  serviceChargeComment?: string
  /**
   * The total number of parking spaces the property has. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  floorLevel?: number // int32
  /**
   * The number of internal floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  internalFloors?: number // int32
  /**
   * The total number of floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  totalFloors?: number // int32
  /**
   * The date the advertising board was last updated (or should be updated when the date is in the future)
   * example:
   * 2019-08-14
   */
  boardUpdated?: string // date
  /**
   * The date on which the property was valued. Note that this can differ to physical appointment dates in some cases
   * example:
   * 2019-08-14
   */
  valuation?: string // date
  /**
   * The date and time the property was archived
   * example:
   * 2019-08-14T12:30:02Z
   */
  archivedOn?: string // date-time
  /**
   * A flag determining whether or not the property is archived
   */
  fromArchive?: boolean
  /**
   * Details specific to rural properties
   */
  rural?: {
    /**
     * Details of the rural tenure associated with the property.
     */
    tenureId?: string
    /**
     * Details of the buildings associated with the property.
     */
    buildingsDescription?: string
    /**
     * Details of the land associated with the property.
     */
    landDescription?: string
  }
  /**
   * Representation of the external land area of a property
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
     * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
     */
    max?: number // double
  }
  /**
   * Representation of the internal dimensions of a property
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
   * Representation of EPC statistics
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
     * The current energy efficiency letter rating (A-G). This is generated from the `eer` value
     * for systems that do not have an explicit EPC Rating component
     */
    eerRating?: string
    /**
     * The potential energy efficiency rating
     */
    eerPotential?: number // int32
    /**
     * The potential energy efficiency letter rating (A-G). This is generated from the `eerPotential` value
     */
    eerPotentialRating?: string
    /**
     * The current environmental impact rating
     */
    eir?: number // int32
    /**
     * The current environment impact letter rating (A-G). This is generated from the `eir` value
     */
    eirRating?: string
    /**
     * The potential environmental impact rating
     */
    eirPotential?: number // int32
    /**
     * The potential environment impact letter rating (A-G). This is generated from the `eirPotential` value
     */
    eirPotentialRating?: string
    /**
     * The URL to access the full EPC document
     */
    fullDocumentUrl?: string
    /**
     * The URL to access the first page of the EPC document
     */
    firstPageDocumentUrl?: string
  }
  /**
   * Representation of property details specific to sales marketing
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
     * The maximum price of a property on the development plot
     */
    priceTo?: number // double
    /**
     * The fee charged by the agent to reserve a property (typically a new build)
     */
    reservationFee?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
     */
    disposal?: string
    /**
     * The date the property sale was completed
     * example:
     * 2019-08-14
     */
    completed?: string // date
    /**
     * The date the property was exchanged
     * example:
     * 2019-08-14
     */
    exchanged?: string // date
    /**
     * The date the property account was paid
     * example:
     * 2019-08-14
     */
    accountPaid?: string // date
    /**
     * Representation of the tenure of a property
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
    /**
     * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
     */
    agency?: string
    /**
     * The unique identifier of the custom selling agency type - only applicable when Agency is not set
     */
    agencyId?: string
    /**
     * The date on which the agreement between the vendor and agent expires
     * example:
     * 2019-08-14
     */
    agreementExpiry?: string // date
    /**
     * Representation of the the commission fee for a property
     */
    fee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The actual fee amount to be collected by the agent - often based on the exchange price of the property
     */
    exchangedCompanyFee?: number // double
    /**
     * The agent's recommended asking price
     */
    recommendedPrice?: number // int32
    /**
     * The agent's valuation price
     */
    valuationPrice?: number // int32
    /**
     * The unique identifier of the document used for the sales brochure
     */
    brochureId?: string
    /**
     * The URL at which the brochure can be publicly accessed when the
     * property is being actively marketed
     */
    publicBrochureUrl?: string // uri
    /**
     * The price the property exchanged/sold for
     */
    exchangedPrice?: number // int32
    /**
     * The unique identifier of the office that sold the property
     */
    exchangedOfficeId?: string
    /**
     * The property's decorative condition (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * Details relating to the shared ownership of the property
     */
    sharedOwnership?: {
      /**
       * The percentage of the shared ownership property being sold by the vendor
       */
      sharedPercentage?: number // double
      /**
       * The rent payable on the remainder of the shared ownership property
       */
      rent?: number // double
      /**
       * The frequency at which the shared ownership rent should be paid
       */
      rentFrequency?: string
    }
  }
  /**
   * Representation of property details specific to lettings marketing
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
     * The date the letting agreement between the landlord and agent was signed
     * example:
     * 2019-08-14
     */
    agreementSigned?: string // date
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * Details of any bills that are included in the rent
     */
    rentIncludes?: string
    /**
     * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
     */
    furnishing?: string[]
    /**
     * The acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
    /**
     * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
     */
    agentRole?: string
    /**
     * The unique identifier of the landlord letting the property
     */
    landlordId?: string
    /**
     * A note to accompany any works orders created for the property
     */
    worksOrderNote?: string
    /**
     * The minimum number of months the property can be let out for
     */
    minimumTerm?: number // int32
    /**
     * The unique identifier of the negotiator that manages the property
     */
    propertyManagerId?: string
    /**
     * The unique identifiers of the management companies associated to the property
     */
    managementCompanyIds?: string[]
    /**
     * The unique identifier of the document used for the lettings brochure
     */
    brochureId?: string
    /**
     * The URL at which the brochure can be publicly accessed when the
     * property is being actively marketed
     */
    publicBrochureUrl?: string // uri
    /**
     * Representation of the the commission fee for a property
     */
    managementFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * Representation of the the commission fee for a property
     */
    lettingFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The rent qualifier (rentOnApplication/askingRent)
     */
    qualifier?: string
    /**
     * Representation of property details specific to utilities
     */
    utilities?: {
      /**
       * A flag denoting whether or not the property has gas connected
       */
      hasGas?: boolean
      /**
       * The unique identifier of the company supplying the gas to the property
       */
      gasCompanyId?: string
      /**
       * The gas meter point number
       */
      gasMeterPoint?: string
      /**
       * The unique identifier of the company supplying the electricity to the property
       */
      electricityCompanyId?: string
      /**
       * The electricity meter point number
       */
      electricityMeterPoint?: string
      /**
       * The unique identifier of the company supplying the water to the property
       */
      waterCompanyId?: string
      /**
       * The water meter point number
       */
      waterMeterPoint?: string
      /**
       * The unique identifier of the company supplying the telephone to the property
       */
      telephoneCompanyId?: string
      /**
       * The unique identifier of the company supplying the internet to the property
       */
      internetCompanyId?: string
      /**
       * The unique identifier of the company supplying the cable tv to the property
       */
      cableTvCompanyId?: string
    }
    /**
     * Representation of a property details related to deposit
     */
    deposit?: {
      /**
       * The type of deposit (weeks/months/fixed)
       */
      type?: string
      /**
       * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
       */
      amount?: number // double
    }
    /**
     * Representation of property details specific to rent insurance associated with a lettings property
     */
    rentInsurance?: {
      /**
       * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
       */
      status?: string
      /**
       * The reference number of the insurance policy when rent protection insurance has been taken out
       */
      referenceNumber?: string
      /**
       * The insurance policy start date
       * example:
       * 2019-08-14
       */
      start?: string // date
      /**
       * The insurance policy end date
       * example:
       * 2019-08-14
       */
      end?: string // date
      /**
       * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
       */
      cancelledReasonId?: string
      /**
       * A textual comment or note entered by the agent when an insurance policy was cancelled
       */
      cancelledComment?: string
      /**
       * Flag indicating whether or not the insurance policy should auto renew
       */
      autoRenew?: boolean
    }
    /**
     * Representation of property details specific to property Licencing
     */
    licencing?: {
      /**
       * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
       */
      licenceRequired?: boolean
      /**
       * The type of licence (additional/mandatory/none/notSet/selective)
       */
      licenceType?: string
      /**
       * The number of households that the licence permits in the property
       */
      households?: number // int32
      /**
       * The number of occupants that the licence permits in the property
       */
      occupants?: number // int32
      /**
       * A flag determining whether or not the property is above commercial premises
       */
      aboveCommercialPremises?: boolean
      /**
       * Representation of property details specific to property licence application
       */
      application?: {
        /**
         * The status of the licence application (applied/granted/landlordApplying/notApplicable)
         */
        status?: string
        /**
         * The licence application reference number
         */
        referenceNumber?: string
        /**
         * The date the licence was applied for
         * example:
         * 2019-08-14
         */
        date?: string // date
        /**
         * The date the licence application was granted
         * example:
         * 2019-08-14
         */
        granted?: string // date
        /**
         * The date the licence will expire
         * example:
         * 2019-08-14
         */
        expiry?: string // date
      }
    }
  }
  /**
   * An properties commercial details
   */
  commercial?: {
    /**
     * The commercial use attributes (eg a1, a2, b1), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    useClass?: string[]
    /**
     * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    floorLevel?: string[]
  }
  /**
   * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Any specific details relating to the marketing of a property in Guernsey
     */
    ggy?: {
      /**
       * Attributes describing which markets the property is available in (local/openA/openB/openC/openD)
       */
      market?: string[]
    }
    /**
     * Any specific details relating to the marketing of a property in Ireland
     */
    irl?: {
      /**
       * Any specific details relating to energy performance ratings for properties marketed in Ireland
       */
      buildingEnergyRating?: {
        /**
         * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
         */
        exempt?: boolean
        /**
         * The BER rating of the property
         */
        rating?: string
        /**
         * The BER certificate reference number
         */
        refNumber?: string
        /**
         * The energy performance indicator for the property
         */
        epi?: string
      }
    }
  }
  /**
   * The attributes describing the overall type of the property (eg house, bungalow, land), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  type?: string[]
  /**
   * The attributes describing the style of property (eg detached, semiDetached), defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  style?: string[]
  /**
   * The attributes describing other aspects of the property - such as outside space - as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  situation?: string[]
  /**
   * The attributes describing the parking available at the property (eg garage), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  parking?: string[]
  /**
   * The attributes describing the age of the property (eg new, period), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  age?: string[]
  /**
   * The attributes describing the general location of the property (eg rural, townCity), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
   */
  locality?: string[]
  /**
   * The attributes describing the property's special features (eg swimmingPool, tennisCourt), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
  /**
   * The attributes associated to the property which are not currently mapped. These are defined the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  unmappedAttributes?: {
    /**
     * The type of unmapped attribute (style/type/situation/parking/age/locality/special)
     */
    type?: string
    /**
     * The value associated to the unmapped type
     */
    value?: string
  }[]
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
     * Details about the alternate dimensions of the room
     */
    dimensionsAlt?: string
    /**
     * Short description of the room
     */
    description?: string
  }[]
  /**
   * A flag determining whether or not the property's room details have been approved by the vendor or landlord
   */
  roomDetailsApproved?: boolean
  /**
   * A collection of unique identifiers of offices attached to the property
   */
  officeIds?: string[]
  /**
   * The date that this property became a lost instruction
   * example:
   * 2019-08-14T12:30:02Z
   */
  lostInstructionDate?: string // date-time
  /**
   * The notes regarding the lost instruction
   */
  lostInstructionNote?: string
  /**
   * App specific metadata that has been set against the property
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The keywords associated with property
   */
  keywords?: string[]
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the property. Used for managing update concurrency
   */
  readonly _eTag?: string
  /**
   * Collection containing relative URLs to data associated with the property.
   * In the case of a development - where a property is grouped with, or associated to another property by way of a parent/child relationship,
   * the collection will contain a _master_ or _subPlot_ link depending on the property type. Where the property is the master record in a development (the parent),
   * a _subPlots_ link will be included in the collection giving you access to all the plots (the children) within the development. Where the property is a sub plot that forms part of a
   * development, a _master_ link will be included in the collection giving you access to the master record.
   */
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface PropertyModelPagedResult {
  _embedded?: {
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the property
     */
    id?: string
    /**
     * The date and time when the property was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the property was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The date the owner of the property was last called
     * example:
     * 2019-08-14
     */
    lastCall?: string // date
    /**
     * The date the owner of the property is next due to be called
     * example:
     * 2019-08-14
     */
    nextCall?: string // date
    /**
     * The marketing mode of the property (selling/letting/sellingAndLetting)
     */
    marketingMode?: string
    /**
     * The currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * An optional alternative identifier specified for this property
     */
    alternateId?: string
    /**
     * Representation of the physical address of a building or premise
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
       * The local timezone for the address, based on the Geolocation coordinates
       */
      localTimeZone?: string
      /**
       * Representation of the geographical location of an address using coordinates
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
     * The long description of the property
     */
    longDescription?: string
    /**
     * The property's local authority
     */
    localAuthorityCompanyId?: string
    /**
     * The name of the property's local authority
     */
    localAuthorityCompanyName?: string
    /**
     * The summary of accommodation, typically short phrases or bullet points describing the key features of the property
     */
    summary?: string
    /**
     * The unique identifier of the department the property is associated with. The property will only match to applicants with the same values set. See the [Platform Glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information about departments
     */
    departmentId?: string
    /**
     * The unique identifier of the negotiator managing the property
     */
    negotiatorId?: string
    /**
     * The total number of bedrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bedrooms?: number // int32
    /**
     * The maximum number of bedrooms in the property or properties. This is typically used when marketing development sites and would be set on the master record. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bedroomsMax?: number // int32
    /**
     * The total number of reception rooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    receptions?: number // int32
    /**
     * The maximum number of reception rooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    receptionsMax?: number // int32
    /**
     * The total number of bathrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bathrooms?: number // int32
    /**
     * The maximum number of bathrooms in the property. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    bathroomsMax?: number // int32
    /**
     * The number of units offered on the market. This is typically used when marketing development sites.
     */
    numberOfUnits?: number // int32
    /**
     * The total number of parking spaces the property has. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    parkingSpaces?: number // int32
    /**
     * The council tax banding of the property (A/B/C/D/E/F/G/H/I/notYetAvailable)
     */
    councilTax?: string
    /**
     * A collection of identifiers of portals that the property should not be displayed on
     */
    disabledPortalIds?: string[]
    /**
     * A flag denoting whether or not this property can be advertised on the internet
     */
    internetAdvertising?: boolean
    /**
     * A flag denoting whether or not the property has been instructed by another estate agent
     */
    isExternal?: boolean
    /**
     * The arrangements regarding viewing the property
     */
    viewingArrangements?: string
    /**
     * The url of a video associated with this property, such as a virtual tour
     */
    videoUrl?: string
    /**
     * The caption for the video url associated with this property
     */
    videoCaption?: string
    /**
     * The url of a second video associated with this property, such as a virtual tour
     */
    video2Url?: string
    /**
     * The caption for the second video url associated with this property
     */
    video2Caption?: string
    /**
     * Any general notes regarding the property. These are not usually exposed to end users and may contain sensitive information about a sale
     */
    notes?: string
    /**
     * The status of the advertising board sited outside or near to the property
     */
    boardStatus?: string
    /**
     * Any notes relevant to the advertising board sited outside or near to the property
     */
    boardNotes?: string
    /**
     * The properties featured image url
     */
    featuredImageUrl?: string // uri
    /**
     * The url to the property on an external website
     */
    url?: string
    /**
     * The caption to accompany the url to the property on an external website
     */
    urlCaption?: string
    /**
     * Any ground rent payment that applies to the property
     */
    groundRent?: number // double
    /**
     * Comments regarding the ground rent of the property
     */
    groundRentComment?: string
    /**
     * The date when the ground rent payable on the property should be reviewed
     * example:
     * 2019-08-14T12:30:02Z
     */
    groundRentReviewDate?: string // date-time
    /**
     * The annual percentage increase of the ground rent after being reviewed
     */
    groundRentIncrease?: number // double
    /**
     * Any service charge payment that applies to the property
     */
    serviceCharge?: number // double
    /**
     * Comments regarding the service charge of the property
     */
    serviceChargeComment?: string
    /**
     * The total number of parking spaces the property has. This is only supported by some departments. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    floorLevel?: number // int32
    /**
     * The number of internal floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    internalFloors?: number // int32
    /**
     * The total number of floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
     */
    totalFloors?: number // int32
    /**
     * The date the advertising board was last updated (or should be updated when the date is in the future)
     * example:
     * 2019-08-14
     */
    boardUpdated?: string // date
    /**
     * The date on which the property was valued. Note that this can differ to physical appointment dates in some cases
     * example:
     * 2019-08-14
     */
    valuation?: string // date
    /**
     * The date and time the property was archived
     * example:
     * 2019-08-14T12:30:02Z
     */
    archivedOn?: string // date-time
    /**
     * A flag determining whether or not the property is archived
     */
    fromArchive?: boolean
    /**
     * Details specific to rural properties
     */
    rural?: {
      /**
       * Details of the rural tenure associated with the property.
       */
      tenureId?: string
      /**
       * Details of the buildings associated with the property.
       */
      buildingsDescription?: string
      /**
       * Details of the land associated with the property.
       */
      landDescription?: string
    }
    /**
     * Representation of the external land area of a property
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
       * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
       */
      max?: number // double
    }
    /**
     * Representation of the internal dimensions of a property
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
     * Representation of EPC statistics
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
       * The current energy efficiency letter rating (A-G). This is generated from the `eer` value
       * for systems that do not have an explicit EPC Rating component
       */
      eerRating?: string
      /**
       * The potential energy efficiency rating
       */
      eerPotential?: number // int32
      /**
       * The potential energy efficiency letter rating (A-G). This is generated from the `eerPotential` value
       */
      eerPotentialRating?: string
      /**
       * The current environmental impact rating
       */
      eir?: number // int32
      /**
       * The current environment impact letter rating (A-G). This is generated from the `eir` value
       */
      eirRating?: string
      /**
       * The potential environmental impact rating
       */
      eirPotential?: number // int32
      /**
       * The potential environment impact letter rating (A-G). This is generated from the `eirPotential` value
       */
      eirPotentialRating?: string
      /**
       * The URL to access the full EPC document
       */
      fullDocumentUrl?: string
      /**
       * The URL to access the first page of the EPC document
       */
      firstPageDocumentUrl?: string
    }
    /**
     * Representation of property details specific to sales marketing
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
       * The maximum price of a property on the development plot
       */
      priceTo?: number // double
      /**
       * The fee charged by the agent to reserve a property (typically a new build)
       */
      reservationFee?: number // int32
      /**
       * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
       */
      qualifier?: string
      /**
       * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
       */
      status?: string
      /**
       * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
       */
      disposal?: string
      /**
       * The date the property sale was completed
       * example:
       * 2019-08-14
       */
      completed?: string // date
      /**
       * The date the property was exchanged
       * example:
       * 2019-08-14
       */
      exchanged?: string // date
      /**
       * The date the property account was paid
       * example:
       * 2019-08-14
       */
      accountPaid?: string // date
      /**
       * Representation of the tenure of a property
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
      /**
       * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
       */
      agency?: string
      /**
       * The unique identifier of the custom selling agency type - only applicable when Agency is not set
       */
      agencyId?: string
      /**
       * The date on which the agreement between the vendor and agent expires
       * example:
       * 2019-08-14
       */
      agreementExpiry?: string // date
      /**
       * Representation of the the commission fee for a property
       */
      fee?: {
        /**
         * The commission letting fee type (percentage/fixed)
         */
        type?: string
        /**
         * The commission letting fee amount
         */
        amount?: number // double
      }
      /**
       * The actual fee amount to be collected by the agent - often based on the exchange price of the property
       */
      exchangedCompanyFee?: number // double
      /**
       * The agent's recommended asking price
       */
      recommendedPrice?: number // int32
      /**
       * The agent's valuation price
       */
      valuationPrice?: number // int32
      /**
       * The unique identifier of the document used for the sales brochure
       */
      brochureId?: string
      /**
       * The URL at which the brochure can be publicly accessed when the
       * property is being actively marketed
       */
      publicBrochureUrl?: string // uri
      /**
       * The price the property exchanged/sold for
       */
      exchangedPrice?: number // int32
      /**
       * The unique identifier of the office that sold the property
       */
      exchangedOfficeId?: string
      /**
       * The property's decorative condition (unmodernised/fair/good/veryGood)
       */
      decoration?: string[]
      /**
       * Details relating to the shared ownership of the property
       */
      sharedOwnership?: {
        /**
         * The percentage of the shared ownership property being sold by the vendor
         */
        sharedPercentage?: number // double
        /**
         * The rent payable on the remainder of the shared ownership property
         */
        rent?: number // double
        /**
         * The frequency at which the shared ownership rent should be paid
         */
        rentFrequency?: string
      }
    }
    /**
     * Representation of property details specific to lettings marketing
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
       * The date the letting agreement between the landlord and agent was signed
       * example:
       * 2019-08-14
       */
      agreementSigned?: string // date
      /**
       * The rent being charged for the property
       */
      rent?: number // double
      /**
       * The frequency at which rent will be collected (weekly/monthly/annually)
       */
      rentFrequency?: string
      /**
       * Details of any bills that are included in the rent
       */
      rentIncludes?: string
      /**
       * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
       */
      furnishing?: string[]
      /**
       * The acceptable letting terms (short/long/any)
       */
      term?: string
      /**
       * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
       */
      status?: string
      /**
       * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
       */
      agentRole?: string
      /**
       * The unique identifier of the landlord letting the property
       */
      landlordId?: string
      /**
       * A note to accompany any works orders created for the property
       */
      worksOrderNote?: string
      /**
       * The minimum number of months the property can be let out for
       */
      minimumTerm?: number // int32
      /**
       * The unique identifier of the negotiator that manages the property
       */
      propertyManagerId?: string
      /**
       * The unique identifiers of the management companies associated to the property
       */
      managementCompanyIds?: string[]
      /**
       * The unique identifier of the document used for the lettings brochure
       */
      brochureId?: string
      /**
       * The URL at which the brochure can be publicly accessed when the
       * property is being actively marketed
       */
      publicBrochureUrl?: string // uri
      /**
       * Representation of the the commission fee for a property
       */
      managementFee?: {
        /**
         * The commission letting fee type (percentage/fixed)
         */
        type?: string
        /**
         * The commission letting fee amount
         */
        amount?: number // double
      }
      /**
       * Representation of the the commission fee for a property
       */
      lettingFee?: {
        /**
         * The commission letting fee type (percentage/fixed)
         */
        type?: string
        /**
         * The commission letting fee amount
         */
        amount?: number // double
      }
      /**
       * The rent qualifier (rentOnApplication/askingRent)
       */
      qualifier?: string
      /**
       * Representation of property details specific to utilities
       */
      utilities?: {
        /**
         * A flag denoting whether or not the property has gas connected
         */
        hasGas?: boolean
        /**
         * The unique identifier of the company supplying the gas to the property
         */
        gasCompanyId?: string
        /**
         * The gas meter point number
         */
        gasMeterPoint?: string
        /**
         * The unique identifier of the company supplying the electricity to the property
         */
        electricityCompanyId?: string
        /**
         * The electricity meter point number
         */
        electricityMeterPoint?: string
        /**
         * The unique identifier of the company supplying the water to the property
         */
        waterCompanyId?: string
        /**
         * The water meter point number
         */
        waterMeterPoint?: string
        /**
         * The unique identifier of the company supplying the telephone to the property
         */
        telephoneCompanyId?: string
        /**
         * The unique identifier of the company supplying the internet to the property
         */
        internetCompanyId?: string
        /**
         * The unique identifier of the company supplying the cable tv to the property
         */
        cableTvCompanyId?: string
      }
      /**
       * Representation of a property details related to deposit
       */
      deposit?: {
        /**
         * The type of deposit (weeks/months/fixed)
         */
        type?: string
        /**
         * The deposit amount. This can be the number of weeks or months rent or a monetary amount based on the `type`
         */
        amount?: number // double
      }
      /**
       * Representation of property details specific to rent insurance associated with a lettings property
       */
      rentInsurance?: {
        /**
         * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
         */
        status?: string
        /**
         * The reference number of the insurance policy when rent protection insurance has been taken out
         */
        referenceNumber?: string
        /**
         * The insurance policy start date
         * example:
         * 2019-08-14
         */
        start?: string // date
        /**
         * The insurance policy end date
         * example:
         * 2019-08-14
         */
        end?: string // date
        /**
         * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
         */
        cancelledReasonId?: string
        /**
         * A textual comment or note entered by the agent when an insurance policy was cancelled
         */
        cancelledComment?: string
        /**
         * Flag indicating whether or not the insurance policy should auto renew
         */
        autoRenew?: boolean
      }
      /**
       * Representation of property details specific to property Licencing
       */
      licencing?: {
        /**
         * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
         */
        licenceRequired?: boolean
        /**
         * The type of licence (additional/mandatory/none/notSet/selective)
         */
        licenceType?: string
        /**
         * The number of households that the licence permits in the property
         */
        households?: number // int32
        /**
         * The number of occupants that the licence permits in the property
         */
        occupants?: number // int32
        /**
         * A flag determining whether or not the property is above commercial premises
         */
        aboveCommercialPremises?: boolean
        /**
         * Representation of property details specific to property licence application
         */
        application?: {
          /**
           * The status of the licence application (applied/granted/landlordApplying/notApplicable)
           */
          status?: string
          /**
           * The licence application reference number
           */
          referenceNumber?: string
          /**
           * The date the licence was applied for
           * example:
           * 2019-08-14
           */
          date?: string // date
          /**
           * The date the licence application was granted
           * example:
           * 2019-08-14
           */
          granted?: string // date
          /**
           * The date the licence will expire
           * example:
           * 2019-08-14
           */
          expiry?: string // date
        }
      }
    }
    /**
     * An properties commercial details
     */
    commercial?: {
      /**
       * The commercial use attributes (eg a1, a2, b1), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
       */
      useClass?: string[]
      /**
       * The commercial floor level attributes (eg basement, subGround, ground, upperFloor), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
       */
      floorLevel?: string[]
    }
    /**
     * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
     */
    regional?: {
      /**
       * Any specific details relating to the marketing of a property in Guernsey
       */
      ggy?: {
        /**
         * Attributes describing which markets the property is available in (local/openA/openB/openC/openD)
         */
        market?: string[]
      }
      /**
       * Any specific details relating to the marketing of a property in Ireland
       */
      irl?: {
        /**
         * Any specific details relating to energy performance ratings for properties marketed in Ireland
         */
        buildingEnergyRating?: {
          /**
           * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
           */
          exempt?: boolean
          /**
           * The BER rating of the property
           */
          rating?: string
          /**
           * The BER certificate reference number
           */
          refNumber?: string
          /**
           * The energy performance indicator for the property
           */
          epi?: string
        }
      }
    }
    /**
     * The attributes describing the overall type of the property (eg house, bungalow, land), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    type?: string[]
    /**
     * The attributes describing the style of property (eg detached, semiDetached), defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    style?: string[]
    /**
     * The attributes describing other aspects of the property - such as outside space - as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    situation?: string[]
    /**
     * The attributes describing the parking available at the property (eg garage), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    parking?: string[]
    /**
     * The attributes describing the age of the property (eg new, period), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    age?: string[]
    /**
     * The attributes describing the general location of the property (eg rural, townCity), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     * For information about how to interpret this data and how it maps back to AgencyCloud, please [see the documentation](https://foundations-documentation.reapit.cloud/platform-glossary#interpreting-department-data)
     */
    locality?: string[]
    /**
     * The attributes describing the property's special features (eg swimmingPool, tennisCourt), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    specialFeatures?: string[]
    /**
     * The attributes associated to the property which are not currently mapped. These are defined the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
     */
    unmappedAttributes?: {
      /**
       * The type of unmapped attribute (style/type/situation/parking/age/locality/special)
       */
      type?: string
      /**
       * The value associated to the unmapped type
       */
      value?: string
    }[]
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
       * Details about the alternate dimensions of the room
       */
      dimensionsAlt?: string
      /**
       * Short description of the room
       */
      description?: string
    }[]
    /**
     * A flag determining whether or not the property's room details have been approved by the vendor or landlord
     */
    roomDetailsApproved?: boolean
    /**
     * A collection of unique identifiers of offices attached to the property
     */
    officeIds?: string[]
    /**
     * The date that this property became a lost instruction
     * example:
     * 2019-08-14T12:30:02Z
     */
    lostInstructionDate?: string // date-time
    /**
     * The notes regarding the lost instruction
     */
    lostInstructionNote?: string
    /**
     * App specific metadata that has been set against the property
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The keywords associated with property
     */
    keywords?: string[]
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the property. Used for managing update concurrency
     */
    readonly _eTag?: string
    /**
     * Collection containing relative URLs to data associated with the property.
     * In the case of a development - where a property is grouped with, or associated to another property by way of a parent/child relationship,
     * the collection will contain a _master_ or _subPlot_ link depending on the property type. Where the property is the master record in a development (the parent),
     * a _subPlots_ link will be included in the collection giving you access to all the plots (the children) within the development. Where the property is a sub plot that forms part of a
     * development, a _master_ link will be included in the collection giving you access to the master record.
     */
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface PropertyRegionalModel {
  /**
   * Any specific details relating to the marketing of a property in Guernsey
   */
  ggy?: {
    /**
     * Attributes describing which markets the property is available in (local/openA/openB/openC/openD)
     */
    market?: string[]
  }
  /**
   * Any specific details relating to the marketing of a property in Ireland
   */
  irl?: {
    /**
     * Any specific details relating to energy performance ratings for properties marketed in Ireland
     */
    buildingEnergyRating?: {
      /**
       * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
       */
      exempt?: boolean
      /**
       * The BER rating of the property
       */
      rating?: string
      /**
       * The BER certificate reference number
       */
      refNumber?: string
      /**
       * The energy performance indicator for the property
       */
      epi?: string
    }
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
   * Details about the alternate dimensions of the room
   */
  dimensionsAlt?: string
  /**
   * Short description of the room
   */
  description?: string
}
/**
 * Details specific to rural properties
 */
export interface PropertyRuralModel {
  /**
   * Details of the rural tenure associated with the property.
   */
  tenureId?: string
  /**
   * Details of the buildings associated with the property.
   */
  buildingsDescription?: string
  /**
   * Details of the land associated with the property.
   */
  landDescription?: string
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
   * The maximum price of a property on the development plot
   */
  priceTo?: number // double
  /**
   * The fee charged by the agent to reserve a property (typically a new build)
   */
  reservationFee?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
   */
  disposal?: string
  /**
   * The date the property sale was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * The date the property was exchanged
   * example:
   * 2019-08-14
   */
  exchanged?: string // date
  /**
   * The date the property account was paid
   * example:
   * 2019-08-14
   */
  accountPaid?: string // date
  /**
   * Representation of the tenure of a property
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
  /**
   * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
   */
  agency?: string
  /**
   * The unique identifier of the custom selling agency type - only applicable when Agency is not set
   */
  agencyId?: string
  /**
   * The date on which the agreement between the vendor and agent expires
   * example:
   * 2019-08-14
   */
  agreementExpiry?: string // date
  /**
   * Representation of the the commission fee for a property
   */
  fee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The actual fee amount to be collected by the agent - often based on the exchange price of the property
   */
  exchangedCompanyFee?: number // double
  /**
   * The agent's recommended asking price
   */
  recommendedPrice?: number // int32
  /**
   * The agent's valuation price
   */
  valuationPrice?: number // int32
  /**
   * The unique identifier of the document used for the sales brochure
   */
  brochureId?: string
  /**
   * The URL at which the brochure can be publicly accessed when the
   * property is being actively marketed
   */
  publicBrochureUrl?: string // uri
  /**
   * The price the property exchanged/sold for
   */
  exchangedPrice?: number // int32
  /**
   * The unique identifier of the office that sold the property
   */
  exchangedOfficeId?: string
  /**
   * The property's decorative condition (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * Details relating to the shared ownership of the property
   */
  sharedOwnership?: {
    /**
     * The percentage of the shared ownership property being sold by the vendor
     */
    sharedPercentage?: number // double
    /**
     * The rent payable on the remainder of the shared ownership property
     */
    rent?: number // double
    /**
     * The frequency at which the shared ownership rent should be paid
     */
    rentFrequency?: string
  }
}
/**
 * Details relating to the shared ownership of the property
 */
export interface PropertySharedOwnershipModel {
  /**
   * The percentage of the shared ownership property being sold by the vendor
   */
  sharedPercentage?: number // double
  /**
   * The rent payable on the remainder of the shared ownership property
   */
  rent?: number // double
  /**
   * The frequency at which the shared ownership rent should be paid
   */
  rentFrequency?: string
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
 * Terminologies associated with the properties
 */
export interface PropertyTerminologyModel {
  /**
   * A flag denoting whether the agent's CRM is configured to use "Sold STC/SSTC" terminology instead of "Under Offer"
   */
  useSoldStc?: boolean
  /**
   * A flag denoting whether the agent's CRM is configured to use "Market Appraisal" terminology instead of "Valuation"
   */
  useMarketAppraisal?: boolean
}
/**
 * Representation of an appointments recurrence details
 */
export interface RecurrenceModel {
  /**
   * The recurrence interval
   */
  interval?: number // int32
  /**
   * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
   */
  type?: string
  /**
   * The date the appointment recurs until
   * example:
   * 2019-08-14T12:30:02Z
   */
  until?: string // date-time
}
/**
 * Representation of a contact
 */
export interface ReferralContactModel {
  id?: string
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
   * The mobile phone number of the contact
   */
  mobilePhone?: string
  /**
   * The email address of the contact
   */
  email?: string
}
/**
 * Representation of a referral
 */
export interface ReferralModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the referral
   */
  id?: string
  /**
   * The date and time when the referral was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the referral was amended
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the referralTypeId the referral is associated with, where applicable
   */
  referralTypeId?: string
  /**
   * The unique identifier of the negotiator the referral is associated with, where applicable
   */
  negotiatorId?: string
  /**
   * The unique identifier of the property the referral is associated with, where applicable
   */
  propertyId?: string
  /**
   * The unique identifier of the applicant the referral is associated with, where applicable
   */
  applicantId?: string
  /**
   * The unique identifier of the applicant the referral is associated with, where applicable
   */
  contactId?: string
  /**
   * The status of the referral (sent/succeeded/cancelled/failed/paid/declined/inProgress)
   */
  status?: string
  /**
   * The amount paid to the agent for the referral
   */
  amount?: number // double
  /**
   * The date and time when the referral was paid
   * example:
   * 2019-08-14T12:30:02Z
   */
  paid?: string // date-time
  /**
   * The date and time when the referral was accepted
   * example:
   * 2019-08-14T12:30:02Z
   */
  accepted?: string // date-time
  /**
   * Representation of a contact
   */
  related?: {
    id?: string
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
     * The mobile phone number of the contact
     */
    mobilePhone?: string
    /**
     * The email address of the contact
     */
    email?: string
  }
  /**
   * App specific metadata that has been set against the referral
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the referral. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface ReferralModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the referral
     */
    id?: string
    /**
     * The date and time when the referral was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the referral was amended
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the referralTypeId the referral is associated with, where applicable
     */
    referralTypeId?: string
    /**
     * The unique identifier of the negotiator the referral is associated with, where applicable
     */
    negotiatorId?: string
    /**
     * The unique identifier of the property the referral is associated with, where applicable
     */
    propertyId?: string
    /**
     * The unique identifier of the applicant the referral is associated with, where applicable
     */
    applicantId?: string
    /**
     * The unique identifier of the applicant the referral is associated with, where applicable
     */
    contactId?: string
    /**
     * The status of the referral (sent/succeeded/cancelled/failed/paid/declined/inProgress)
     */
    status?: string
    /**
     * The amount paid to the agent for the referral
     */
    amount?: number // double
    /**
     * The date and time when the referral was paid
     * example:
     * 2019-08-14T12:30:02Z
     */
    paid?: string // date-time
    /**
     * The date and time when the referral was accepted
     * example:
     * 2019-08-14T12:30:02Z
     */
    accepted?: string // date-time
    /**
     * Representation of a contact
     */
    related?: {
      id?: string
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
       * The mobile phone number of the contact
       */
      mobilePhone?: string
      /**
       * The email address of the contact
       */
      email?: string
    }
    /**
     * App specific metadata that has been set against the referral
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the referral. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a referral type
 */
export interface ReferralTypeModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  id?: string
  /**
   * The name of the referral type
   */
  name?: string
}
export interface ReferralTypeModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    id?: string
    /**
     * The name of the referral type
     */
    name?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Referrals {
  id?: string[]
  propertyId?: string[]
  applicantId?: string[]
  contactId?: string[]
  negotiatorId?: string[]
  referralTypeId?: string[]
  status?: ('sent' | 'inProgress' | 'succeeded' | 'cancelled' | 'failed' | 'paid' | 'declined')[]
  embed?: ('applicant' | 'contact' | 'negotiator' | 'property' | 'type')[]
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
}
export interface ReferralsTypes {
  id?: string[]
  pageSize?: number
  pageNumber?: number
  sortBy?: string
}
/**
 * Representation of renewal options in a tenancy
 */
export interface RenewalOptionsModel {
  /**
   * The unique identifier of the renewal option
   */
  optionId?: string
  /**
   * The associated renewal option text
   */
  optionText?: string
  /**
   * The renewal option expiry date
   * example:
   * 2019-08-14
   */
  expiry?: string // date
  /**
   * The renewal options associated condition Ids
   */
  conditionIds?: string[]
}
export interface Resthooks {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  active?: boolean
}
/**
 * Model representing a JSON schema used to validate a specific entity type
 */
export interface SchemaModel {
  /**
   * The unique identifier of this JSON schema
   */
  id?: string
  /**
   * The date and time of when this JSON schema was last updated
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The JSON schema document
   */
  schema?: string
}
export interface SchemaModelPagedResult {
  _embedded?: {
    /**
     * The unique identifier of this JSON schema
     */
    id?: string
    /**
     * The date and time of when this JSON schema was last updated
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The JSON schema document
     */
    schema?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a source of business
 */
export interface SourceModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the source
   */
  id?: string
  /**
   * The date and time when the source was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the source was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
}
export interface SourceModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the source
     */
    id?: string
    /**
     * The date and time when the source was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the source was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Sources {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  officeId?: string[]
  departmentId?: string[]
  name?: string
  type?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
}
/**
 * Representation of a staff member
 */
export interface StaffModel {
  /**
   * The staff member's name
   */
  name?: string
  /**
   * A flag determining whether or not the staff member is currently active
   */
  active?: boolean
  /**
   * The staff member's job title
   */
  jobTitle?: string
  /**
   * The staff member's work phone
   */
  workPhone?: string
  /**
   * The staff member's mobile phone
   */
  mobilePhone?: string
  /**
   * The staff member's email
   */
  email?: string
}
export interface StaffModelPagedResult {
  _embedded?: {
    /**
     * The staff member's name
     */
    name?: string
    /**
     * A flag determining whether or not the staff member is currently active
     */
    active?: boolean
    /**
     * The staff member's job title
     */
    jobTitle?: string
    /**
     * The staff member's work phone
     */
    workPhone?: string
    /**
     * The staff member's mobile phone
     */
    mobilePhone?: string
    /**
     * The staff member's email
     */
    email?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a task, which can also be an internal message
 */
export interface TaskModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the task
   */
  id?: string
  /**
   * The date and time when the task was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the task was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
}
export interface TaskModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the task
     */
    id?: string
    /**
     * The date and time when the task was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the task was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Tasks {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('applicant' | 'contact' | 'landlord' | 'property' | 'tenancy' | 'type')[]
  id?: string[]
  applicantId?: string[]
  contactId?: string[]
  landlordId?: string[]
  officeId?: string[]
  propertyId?: string[]
  recipientId?: string[]
  senderId?: string[]
  typeId?: string[]
  tenancyId?: string[]
  activatesFrom?: string
  activatesTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  metadata?: string[]
}
export interface Tenancies {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  fromArchive?: boolean
  embed?: (
    | 'appointments'
    | 'applicant'
    | 'extensions'
    | 'documents'
    | 'negotiator'
    | 'property'
    | 'source'
    | 'tasks'
    | 'type'
  )[]
  id?: string[]
  negotiatorId?: string[]
  applicantId?: string[]
  propertyId?: string[]
  name?: string
  nameType?: string
  status?: ('offerPending' | 'offerWithdrawn' | 'offerRejected' | 'arranging' | 'current' | 'finished' | 'cancelled')[]
  email?: string[]
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  endDateFrom?: string
  endDateTo?: string
  startDateFrom?: string
  startDateTo?: string
  metadata?: string[]
}
/**
 * Representation of party agreements to a specific clause in a tenancy agreement
 */
export interface TenancyAgreementModel {
  /**
   * A flag to determine if the landlord has agreed
   */
  landlord?: boolean
  /**
   * A flag to determine if the tenant has agreed
   */
  tenant?: boolean
}
/**
 * Representation of a tenancy allowance
 */
export interface TenancyAllowanceModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the allowance
   */
  id?: string
  /**
   * The date and time when the allowance was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the allowance last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The identifier of the associated allowance
   */
  typeId?: string
  /**
   * The break clauses description
   */
  description?: string
  /**
   * The state of the allowance (allowed/notAllowed)
   */
  state?: string
  /**
   * Representation of party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
  /**
   * Tenancy agreement text that relates to the allowance
   */
  letterText?: string
  /**
   * The unique identifier of the associated tenancy
   */
  tenancyId?: string
  /**
   * The ETag for the current version of the allowance. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyAllowanceModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the allowance
     */
    id?: string
    /**
     * The date and time when the allowance was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the allowance last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The identifier of the associated allowance
     */
    typeId?: string
    /**
     * The break clauses description
     */
    description?: string
    /**
     * The state of the allowance (allowed/notAllowed)
     */
    state?: string
    /**
     * Representation of party agreements to a specific clause in a tenancy agreement
     */
    agreements?: {
      /**
       * A flag to determine if the landlord has agreed
       */
      landlord?: boolean
      /**
       * A flag to determine if the tenant has agreed
       */
      tenant?: boolean
    }
    /**
     * Tenancy agreement text that relates to the allowance
     */
    letterText?: string
    /**
     * The unique identifier of the associated tenancy
     */
    tenancyId?: string
    /**
     * The ETag for the current version of the allowance. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of tenancy arrears data (populated only when Client Accounts functionality is enabled)
 */
export interface TenancyArrearsModel {
  /**
   * A flag determining whether or not tenancy arrears should be chased
   */
  chaseArrears?: boolean
  /**
   * Indicates whether or not a payment plan is set up for a tenancy in arrears (no/yes/negotiating)
   */
  paymentPlan?: string
}
/**
 * Representation of a tenancy break clauses break from details
 */
export interface TenancyBreakClauseBreakFromModel {
  /**
   * The earliest date at which the tenant/landlord can end the tenancy agreement
   * example:
   * 2019-08-14T12:30:02Z
   */
  date?: string // date-time
  /**
   * The minimum number of months from the break clause agreement becoming active at which the tenant/landlord can end the tenancy agreement
   */
  minTermMonths?: number // int32
}
/**
 * Representation of a tenancy break clause
 */
export interface TenancyBreakClauseModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the break clause
   */
  id?: string
  /**
   * The date and time when the break clause was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the break clause last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The identifier of the associated break clause
   */
  clauseTypeId?: string
  /**
   * The break clauses description
   */
  description?: string
  /**
   * The date the break clause became (or becomes) active
   * example:
   * 2019-08-14
   */
  active?: string // date
  /**
   * The parties that the break clause applies to (landlord/tenant/mutual)
   */
  appliesTo?: string
  /**
   * Tenancy agreement text relating to the break clause
   */
  letterText?: string
  /**
   * Representation of a tenancy break clauses break from details
   */
  breakFrom?: {
    /**
     * The earliest date at which the tenant/landlord can end the tenancy agreement
     * example:
     * 2019-08-14T12:30:02Z
     */
    date?: string // date-time
    /**
     * The minimum number of months from the break clause agreement becoming active at which the tenant/landlord can end the tenancy agreement
     */
    minTermMonths?: number // int32
  }
  /**
   * Representation of a tenancy break clauses notice requirements
   */
  noticeRequired?: {
    /**
     * The latest date at which the tenant/landlord must give notice of their decision to end the agreement
     * example:
     * 2019-08-14T12:30:02Z
     */
    date?: string // date-time
    /**
     * The minimum number of months before the break clause can be invoked at which the tenant/landlord must give notice of their decision to end the tenancy agreement
     */
    beforeBreakMonths?: number // int32
  }
  /**
   * Representation of party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
  /**
   * The unique identifier of the associated tenancy
   */
  tenancyId?: string
  /**
   * The ETag for the current version of the break clause. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyBreakClauseModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the break clause
     */
    id?: string
    /**
     * The date and time when the break clause was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the break clause last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The identifier of the associated break clause
     */
    clauseTypeId?: string
    /**
     * The break clauses description
     */
    description?: string
    /**
     * The date the break clause became (or becomes) active
     * example:
     * 2019-08-14
     */
    active?: string // date
    /**
     * The parties that the break clause applies to (landlord/tenant/mutual)
     */
    appliesTo?: string
    /**
     * Tenancy agreement text relating to the break clause
     */
    letterText?: string
    /**
     * Representation of a tenancy break clauses break from details
     */
    breakFrom?: {
      /**
       * The earliest date at which the tenant/landlord can end the tenancy agreement
       * example:
       * 2019-08-14T12:30:02Z
       */
      date?: string // date-time
      /**
       * The minimum number of months from the break clause agreement becoming active at which the tenant/landlord can end the tenancy agreement
       */
      minTermMonths?: number // int32
    }
    /**
     * Representation of a tenancy break clauses notice requirements
     */
    noticeRequired?: {
      /**
       * The latest date at which the tenant/landlord must give notice of their decision to end the agreement
       * example:
       * 2019-08-14T12:30:02Z
       */
      date?: string // date-time
      /**
       * The minimum number of months before the break clause can be invoked at which the tenant/landlord must give notice of their decision to end the tenancy agreement
       */
      beforeBreakMonths?: number // int32
    }
    /**
     * Representation of party agreements to a specific clause in a tenancy agreement
     */
    agreements?: {
      /**
       * A flag to determine if the landlord has agreed
       */
      landlord?: boolean
      /**
       * A flag to determine if the tenant has agreed
       */
      tenant?: boolean
    }
    /**
     * The unique identifier of the associated tenancy
     */
    tenancyId?: string
    /**
     * The ETag for the current version of the break clause. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a tenancy break clauses notice requirements
 */
export interface TenancyBreakClauseNoticeRequiredModel {
  /**
   * The latest date at which the tenant/landlord must give notice of their decision to end the agreement
   * example:
   * 2019-08-14T12:30:02Z
   */
  date?: string // date-time
  /**
   * The minimum number of months before the break clause can be invoked at which the tenant/landlord must give notice of their decision to end the tenancy agreement
   */
  beforeBreakMonths?: number // int32
}
/**
 * Representation of a tenancy check - a process that needs to happen before a tenancy can commence or ends
 */
export interface TenancyCheckModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the tenancy check
   */
  id?: string
  /**
   * The date and time when the tenancy check was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the tenancy check was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * Textual description of what the tenancy check relates to
   */
  description?: string
  /**
   * The status of the tenancy check (needed/notNeeded/arranging/completed)
   */
  status?: string
  /**
   * The type of the tenancy check (preTenancy/postTenancy)
   */
  type?: string
  /**
   * The identifier of the pre-configured tenancy check. This will only be populated
   * for pre-configured tenancy checks, and not for custom/ad-hoc checks added to individual tenancies
   */
  checkTypeId?: string
  /**
   * The unique identifier of the tenancy that this check relates to
   */
  tenancyId?: string
  /**
   * App specific metadata that has been set against the tenancy check
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the teanncy check. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyCheckModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the tenancy check
     */
    id?: string
    /**
     * The date and time when the tenancy check was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the tenancy check was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * Textual description of what the tenancy check relates to
     */
    description?: string
    /**
     * The status of the tenancy check (needed/notNeeded/arranging/completed)
     */
    status?: string
    /**
     * The type of the tenancy check (preTenancy/postTenancy)
     */
    type?: string
    /**
     * The identifier of the pre-configured tenancy check. This will only be populated
     * for pre-configured tenancy checks, and not for custom/ad-hoc checks added to individual tenancies
     */
    checkTypeId?: string
    /**
     * The unique identifier of the tenancy that this check relates to
     */
    tenancyId?: string
    /**
     * App specific metadata that has been set against the tenancy check
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the teanncy check. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of the physical address of a building or premise
 */
export interface TenancyContactAddressModel {
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
 * A summarised view of the details of a contact or company associated to a tenancy
 */
export interface TenancyContactModel {
  /**
   * The unique identifier of the contact or company
   */
  id?: string
  /**
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The date of birth of the contact (Available when 'type' is 'contact')
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
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
   * An optional payment reference to be used for transactions related to this tenancy associated with this tenant
   */
  paymentReference?: string
  /**
   * A flag denoting whether or not this roie on the system is now archived
   */
  fromArchive?: boolean
  /**
   * Representation of the physical address of a building or premise
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
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
}
/**
 * Representation of a relationship between a tenancy and a contact or company
 */
export interface TenancyContactRelationshipModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the tenancy relationship
   */
  id?: string
  /**
   * The date and time when the relationship was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the tenancy
   */
  tenancyId?: string
  /**
   * The type of related entity (contact/company)
   */
  associatedType?: string
  /**
   * The unique identifier of the related contact or company
   */
  associatedId?: string
  /**
   * A flag denoting whether or not this contact or company should be regarded as the main tenant
   */
  isMain?: boolean
  /**
   * A flag denoting whether or not this relationship is archived
   */
  fromArchive?: boolean
}
export interface TenancyContactRelationshipModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the tenancy relationship
     */
    id?: string
    /**
     * The date and time when the relationship was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the tenancy
     */
    tenancyId?: string
    /**
     * The type of related entity (contact/company)
     */
    associatedType?: string
    /**
     * The unique identifier of the related contact or company
     */
    associatedId?: string
    /**
     * A flag denoting whether or not this contact or company should be regarded as the main tenant
     */
    isMain?: boolean
    /**
     * A flag denoting whether or not this relationship is archived
     */
    fromArchive?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * A tenancy deposit model
 */
export interface TenancyDepositModel {
  /**
   * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
   */
  heldBy?: string
  /**
   * The number of weeks or months rent collected as the deposit on the tenancy
   */
  period?: number // int32
  /**
   * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
   */
  type?: string
  /**
   * The amount of deposit held
   */
  sum?: number // double
}
/**
 * Represents a one off fee associated with tenancy extension or alteration
 */
export interface TenancyExtensionAlterationFeeModel {
  /**
   * The one fee amount
   */
  amount?: number // double
  /**
   * The one of fee summary text
   */
  summary?: string
  /**
   * The fee type
   */
  type?: string
}
/**
 * Represents a tenancy extension or alteration
 */
export interface TenancyExtensionAlterationModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the extension or alteration
   */
  id?: string
  /**
   * The date and time when the extension or alteration was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the extension or alteration was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The start date of the extension or alteration
   * example:
   * 2019-08-14
   */
  startDate?: string // date
  /**
   * The end date of the extension (alterations do not have an end date)
   * example:
   * 2019-08-14
   */
  endDate?: string // date
  /**
   * The type of entry (extension|alteration)
   */
  type?: string
  /**
   * The unique identifier of the negotiator associated to the extension or alteration
   */
  negotiatorId?: string
  /**
   * The extension or alteration rent amount
   */
  rent?: number // double
  /**
   * The rent frequency (weekly/monthly/4weeks/annually)
   */
  rentFrequency?: string
  /**
   * The unique identifier of the tenancy associated to the extension or alteration
   */
  tenancyId?: string
  /**
   * Represents a one off fee associated with tenancy extension or alteration
   */
  fee?: {
    /**
     * The one fee amount
     */
    amount?: number // double
    /**
     * The one of fee summary text
     */
    summary?: string
    /**
     * The fee type
     */
    type?: string
  }
  /**
   * The ETag for the current version of the tenancy extension or alteration. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyExtensionAlterationModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the extension or alteration
     */
    id?: string
    /**
     * The date and time when the extension or alteration was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the extension or alteration was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The start date of the extension or alteration
     * example:
     * 2019-08-14
     */
    startDate?: string // date
    /**
     * The end date of the extension (alterations do not have an end date)
     * example:
     * 2019-08-14
     */
    endDate?: string // date
    /**
     * The type of entry (extension|alteration)
     */
    type?: string
    /**
     * The unique identifier of the negotiator associated to the extension or alteration
     */
    negotiatorId?: string
    /**
     * The extension or alteration rent amount
     */
    rent?: number // double
    /**
     * The rent frequency (weekly/monthly/4weeks/annually)
     */
    rentFrequency?: string
    /**
     * The unique identifier of the tenancy associated to the extension or alteration
     */
    tenancyId?: string
    /**
     * Represents a one off fee associated with tenancy extension or alteration
     */
    fee?: {
      /**
       * The one fee amount
       */
      amount?: number // double
      /**
       * The one of fee summary text
       */
      summary?: string
      /**
       * The fee type
       */
      type?: string
    }
    /**
     * The ETag for the current version of the tenancy extension or alteration. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of the tenancy letting fee
 */
export interface TenancyLettingFeeModel {
  /**
   * The letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
   */
  frequency?: string
}
/**
 * Representation of the tenancy management fee
 */
export interface TenancyManagementFeeModel {
  /**
   * The management fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
   */
  frequency?: string
}
/**
 * Representation of a tenancy
 */
export interface TenancyModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the tenancy
   */
  id?: string
  /**
   * The date and time when the tenancy was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the tenancy was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The start date of the tenancy
   * example:
   * 2019-08-14
   */
  startDate?: string // date
  /**
   * The end date of the tenancy
   * example:
   * 2019-08-14
   */
  endDate?: string // date
  /**
   * The current status of the tenancy (offerPending/offerWithdrawn/offerRejected/arranging/current/finished/cancelled)
   */
  status?: string
  /**
   * The role that the agent is performing for this tenancy (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole?: string
  /**
   * The amount of rent required, returned in relation to the collection frequency
   * Note that this is the original rent set on the tenancy. For tenancies that have been extended with a rent change you MUST use the extensions endpoint
   */
  rent?: number // double
  /**
   * The rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * A flag determining whether or not the tenancy is confirmed to finish at the end date
   */
  endDateConfirmed?: boolean
  /**
   * A flag determining whether or not the tenancy has been extended indefinitely
   */
  isPeriodic?: boolean
  /**
   * The frequency of rental instalment payments (weekly/fortnightly/monthly/quarterly/halfYearly/yearly/every28Days/other)
   */
  rentInstalmentsFrequency?: string
  /**
   * The amount due for each rent instalment (where specified)
   */
  rentInstalmentsAmount?: number // double
  /**
   * The date that the first instalment is due
   * example:
   * 2019-08-14
   */
  rentInstalmentsStart?: string // date
  /**
   * The recorded utility reading for the gas meter
   */
  meterReadingGas?: string
  /**
   * Date of when the reading of gas utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingGasLastRead?: string // date
  /**
   * The recorded utility reading for the electricity meter
   */
  meterReadingElectricity?: string
  /**
   * Date of when the reading of electricity utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingElectricityLastRead?: string // date
  /**
   * The recorded utility reading for the water meter
   */
  meterReadingWater?: string
  /**
   * Date of when the reading of water utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingWaterLastRead?: string // date
  /**
   * The unique identifier of the type of tenancy
   */
  typeId?: string
  /**
   * The unique identifier of the negotiator who is managing the tenancy
   */
  negotiatorId?: string
  /**
   * The unique identifier of the property that relates to the tenancy
   */
  propertyId?: string
  /**
   * The unique identifier of the applicant who has applied to be a tenant. Whilst the tenancy is an in arranging state, information about the individual such as name and contact details can be obtained from GET /applicants/{id}. Use the link in the _links collection for a relative URI
   */
  applicantId?: string
  /**
   * An optional payment reference to be used for transactions related to this tenancy associated with all tenants in the property
   */
  groupPaymentReference?: string
  /**
   * Representation of the tenancy letting fee
   */
  lettingFee?: {
    /**
     * The letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Representation of the tenancy management fee
   */
  managementFee?: {
    /**
     * The management fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
  /**
   * A tenancy source of enquiry
   */
  source?: {
    /**
     * The unique identifier of the source for this tenancy
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * A tenancy deposit model
   */
  deposit?: {
    /**
     * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
     */
    heldBy?: string
    /**
     * The number of weeks or months rent collected as the deposit on the tenancy
     */
    period?: number // int32
    /**
     * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
     */
    type?: string
    /**
     * The amount of deposit held
     */
    sum?: number // double
  }
  /**
   * A collection of contact / company tenants associated to the tenancy. The first item in the collection is considered the primary relationship. This collection is only populated once a tenant moves into a property and the tenancy status becomes current
   */
  related?: {
    /**
     * The unique identifier of the contact or company
     */
    id?: string
    /**
     * The complete name of the contact or company
     */
    name?: string
    /**
     * The title of the contact (Available when 'type' is 'contact')
     */
    title?: string
    /**
     * The forename of the contact (Available when 'type' is 'contact')
     */
    forename?: string
    /**
     * The surname of the contact (Available when 'type' is 'contact')
     */
    surname?: string
    /**
     * The date of birth of the contact (Available when 'type' is 'contact')
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
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
     * An optional payment reference to be used for transactions related to this tenancy associated with this tenant
     */
    paymentReference?: string
    /**
     * A flag denoting whether or not this roie on the system is now archived
     */
    fromArchive?: boolean
    /**
     * Representation of the physical address of a building or premise
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
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
  }[]
  /**
   * A flag denoting whether or not this tenancy is archived
   */
  fromArchive?: boolean
  /**
   * App specific metadata that has been set against the tenancy
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * Financial notes set against the tenancy
   */
  feeNotes?: string
  /**
   * The identifier of the legal status to set against the tenancy
   */
  legalStatusId?: string
  /**
   * Representation of renewal options in a tenancy
   */
  renewalOptions?: {
    /**
     * The unique identifier of the renewal option
     */
    optionId?: string
    /**
     * The associated renewal option text
     */
    optionText?: string
    /**
     * The renewal option expiry date
     * example:
     * 2019-08-14
     */
    expiry?: string // date
    /**
     * The renewal options associated condition Ids
     */
    conditionIds?: string[]
  }
  /**
   * Representation of tenancy arrears data (populated only when Client Accounts functionality is enabled)
   */
  arrears?: {
    /**
     * A flag determining whether or not tenancy arrears should be chased
     */
    chaseArrears?: boolean
    /**
     * Indicates whether or not a payment plan is set up for a tenancy in arrears (no/yes/negotiating)
     */
    paymentPlan?: string
  }
  /**
   * The ETag for the current version of the tenancy. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the tenancy
     */
    id?: string
    /**
     * The date and time when the tenancy was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the tenancy was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The start date of the tenancy
     * example:
     * 2019-08-14
     */
    startDate?: string // date
    /**
     * The end date of the tenancy
     * example:
     * 2019-08-14
     */
    endDate?: string // date
    /**
     * The current status of the tenancy (offerPending/offerWithdrawn/offerRejected/arranging/current/finished/cancelled)
     */
    status?: string
    /**
     * The role that the agent is performing for this tenancy (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
     */
    agentRole?: string
    /**
     * The amount of rent required, returned in relation to the collection frequency
     * Note that this is the original rent set on the tenancy. For tenancies that have been extended with a rent change you MUST use the extensions endpoint
     */
    rent?: number // double
    /**
     * The rent collection frequency (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * A flag determining whether or not the tenancy is confirmed to finish at the end date
     */
    endDateConfirmed?: boolean
    /**
     * A flag determining whether or not the tenancy has been extended indefinitely
     */
    isPeriodic?: boolean
    /**
     * The frequency of rental instalment payments (weekly/fortnightly/monthly/quarterly/halfYearly/yearly/every28Days/other)
     */
    rentInstalmentsFrequency?: string
    /**
     * The amount due for each rent instalment (where specified)
     */
    rentInstalmentsAmount?: number // double
    /**
     * The date that the first instalment is due
     * example:
     * 2019-08-14
     */
    rentInstalmentsStart?: string // date
    /**
     * The recorded utility reading for the gas meter
     */
    meterReadingGas?: string
    /**
     * Date of when the reading of gas utility was last recorded
     * example:
     * 2019-08-14
     */
    meterReadingGasLastRead?: string // date
    /**
     * The recorded utility reading for the electricity meter
     */
    meterReadingElectricity?: string
    /**
     * Date of when the reading of electricity utility was last recorded
     * example:
     * 2019-08-14
     */
    meterReadingElectricityLastRead?: string // date
    /**
     * The recorded utility reading for the water meter
     */
    meterReadingWater?: string
    /**
     * Date of when the reading of water utility was last recorded
     * example:
     * 2019-08-14
     */
    meterReadingWaterLastRead?: string // date
    /**
     * The unique identifier of the type of tenancy
     */
    typeId?: string
    /**
     * The unique identifier of the negotiator who is managing the tenancy
     */
    negotiatorId?: string
    /**
     * The unique identifier of the property that relates to the tenancy
     */
    propertyId?: string
    /**
     * The unique identifier of the applicant who has applied to be a tenant. Whilst the tenancy is an in arranging state, information about the individual such as name and contact details can be obtained from GET /applicants/{id}. Use the link in the _links collection for a relative URI
     */
    applicantId?: string
    /**
     * An optional payment reference to be used for transactions related to this tenancy associated with all tenants in the property
     */
    groupPaymentReference?: string
    /**
     * Representation of the tenancy letting fee
     */
    lettingFee?: {
      /**
       * The letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The fee amount
       */
      amount?: number // double
      /**
       * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
       */
      frequency?: string
    }
    /**
     * Representation of the tenancy management fee
     */
    managementFee?: {
      /**
       * The management fee type (percentage/fixed)
       */
      type?: string
      /**
       * The fee amount
       */
      amount?: number // double
      /**
       * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
       */
      frequency?: string
    }
    /**
     * A tenancy source of enquiry
     */
    source?: {
      /**
       * The unique identifier of the source for this tenancy
       */
      id?: string
      /**
       * The source type (office/source)
       */
      type?: string
    }
    /**
     * A tenancy deposit model
     */
    deposit?: {
      /**
       * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
       */
      heldBy?: string
      /**
       * The number of weeks or months rent collected as the deposit on the tenancy
       */
      period?: number // int32
      /**
       * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
       */
      type?: string
      /**
       * The amount of deposit held
       */
      sum?: number // double
    }
    /**
     * A collection of contact / company tenants associated to the tenancy. The first item in the collection is considered the primary relationship. This collection is only populated once a tenant moves into a property and the tenancy status becomes current
     */
    related?: {
      /**
       * The unique identifier of the contact or company
       */
      id?: string
      /**
       * The complete name of the contact or company
       */
      name?: string
      /**
       * The title of the contact (Available when 'type' is 'contact')
       */
      title?: string
      /**
       * The forename of the contact (Available when 'type' is 'contact')
       */
      forename?: string
      /**
       * The surname of the contact (Available when 'type' is 'contact')
       */
      surname?: string
      /**
       * The date of birth of the contact (Available when 'type' is 'contact')
       * example:
       * 2019-08-14
       */
      dateOfBirth?: string // date
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
       * An optional payment reference to be used for transactions related to this tenancy associated with this tenant
       */
      paymentReference?: string
      /**
       * A flag denoting whether or not this roie on the system is now archived
       */
      fromArchive?: boolean
      /**
       * Representation of the physical address of a building or premise
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
      /**
       * A collection of additional contact details
       */
      additionalContactDetails?: {
        /**
         * The type of contact detail
         */
        type?: string
        /**
         * The contact detail
         */
        value?: string
      }[]
    }[]
    /**
     * A flag denoting whether or not this tenancy is archived
     */
    fromArchive?: boolean
    /**
     * App specific metadata that has been set against the tenancy
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * Financial notes set against the tenancy
     */
    feeNotes?: string
    /**
     * The identifier of the legal status to set against the tenancy
     */
    legalStatusId?: string
    /**
     * Representation of renewal options in a tenancy
     */
    renewalOptions?: {
      /**
       * The unique identifier of the renewal option
       */
      optionId?: string
      /**
       * The associated renewal option text
       */
      optionText?: string
      /**
       * The renewal option expiry date
       * example:
       * 2019-08-14
       */
      expiry?: string // date
      /**
       * The renewal options associated condition Ids
       */
      conditionIds?: string[]
    }
    /**
     * Representation of tenancy arrears data (populated only when Client Accounts functionality is enabled)
     */
    arrears?: {
      /**
       * A flag determining whether or not tenancy arrears should be chased
       */
      chaseArrears?: boolean
      /**
       * Indicates whether or not a payment plan is set up for a tenancy in arrears (no/yes/negotiating)
       */
      paymentPlan?: string
    }
    /**
     * The ETag for the current version of the tenancy. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a tenancy renewal check
 */
export interface TenancyRenewalCheckModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the tenancy renewal check
   */
  id?: string
  /**
   * The date and time when the tenancy renewal check was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the tenancy renewal check was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The status of the tenancy renewal check (needed/notNeeded/arranging/completed)
   */
  status?: string
  /**
   * Textual description of what the tenancy renewal check relates to
   */
  description?: string
  /**
   * The identifier of the pre-configured tenancy check. This will only be populated
   * for pre-configured tenancy checks, and not for custom/ad-hoc checks added to individual tenancies
   */
  checkTypeId?: string
  /**
   * The unique identifier of the tenancy that this check relates to
   */
  tenancyId?: string
  /**
   * The unique identifier of the renewal that this check relates to
   */
  renewalId?: string
  /**
   * App specific metadata that has been set against the tenancy renewal check
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the teanncy check. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyRenewalCheckModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the tenancy renewal check
     */
    id?: string
    /**
     * The date and time when the tenancy renewal check was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the tenancy renewal check was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The status of the tenancy renewal check (needed/notNeeded/arranging/completed)
     */
    status?: string
    /**
     * Textual description of what the tenancy renewal check relates to
     */
    description?: string
    /**
     * The identifier of the pre-configured tenancy check. This will only be populated
     * for pre-configured tenancy checks, and not for custom/ad-hoc checks added to individual tenancies
     */
    checkTypeId?: string
    /**
     * The unique identifier of the tenancy that this check relates to
     */
    tenancyId?: string
    /**
     * The unique identifier of the renewal that this check relates to
     */
    renewalId?: string
    /**
     * App specific metadata that has been set against the tenancy renewal check
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the teanncy check. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Represents a tenancies renewal negotiation
 */
export interface TenancyRenewalModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the renewal negotiation
   */
  id?: string
  /**
   * The date and time when the renewal was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the renewal was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * example:
   * 2019-08-14
   */
  startDate?: string // date
  /**
   * example:
   * 2019-08-14
   */
  endDate?: string // date
  /**
   * The status of the renewal (notStarted/started/negotiating/renewed/tenantTerminated/landlordTerminated/periodic)
   */
  status?: string
  /**
   * The unique identifier of the negotiator associated to the renewal
   */
  negotiatorId?: string
  /**
   * The tenancies rent amount
   */
  rent?: number // double
  /**
   * The rent collection frequency (weekly/monthly/4weeks/annually)
   */
  rentFrequency?: string
  /**
   * Represents rent changes in a tenancies renewal
   */
  rentChange?: {
    /**
     * The amount the rent has changed in the renewal
     */
    amount?: number // double
    /**
     * The percentage the rent has changed in the renewal
     */
    percentage?: number // double
  }
  /**
   * The unique identifier of the tenancy associated to the renewal
   */
  tenancyId?: string
  /**
   * Representation of the tenancy letting fee
   */
  lettingFee?: {
    /**
     * The letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Representation of the tenancy management fee
   */
  managementFee?: {
    /**
     * The management fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
  /**
   * The ETag for the current version of the tenancy renewal. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyRenewalModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the renewal negotiation
     */
    id?: string
    /**
     * The date and time when the renewal was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the renewal was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * example:
     * 2019-08-14
     */
    startDate?: string // date
    /**
     * example:
     * 2019-08-14
     */
    endDate?: string // date
    /**
     * The status of the renewal (notStarted/started/negotiating/renewed/tenantTerminated/landlordTerminated/periodic)
     */
    status?: string
    /**
     * The unique identifier of the negotiator associated to the renewal
     */
    negotiatorId?: string
    /**
     * The tenancies rent amount
     */
    rent?: number // double
    /**
     * The rent collection frequency (weekly/monthly/4weeks/annually)
     */
    rentFrequency?: string
    /**
     * Represents rent changes in a tenancies renewal
     */
    rentChange?: {
      /**
       * The amount the rent has changed in the renewal
       */
      amount?: number // double
      /**
       * The percentage the rent has changed in the renewal
       */
      percentage?: number // double
    }
    /**
     * The unique identifier of the tenancy associated to the renewal
     */
    tenancyId?: string
    /**
     * Representation of the tenancy letting fee
     */
    lettingFee?: {
      /**
       * The letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The fee amount
       */
      amount?: number // double
      /**
       * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
       */
      frequency?: string
    }
    /**
     * Representation of the tenancy management fee
     */
    managementFee?: {
      /**
       * The management fee type (percentage/fixed)
       */
      type?: string
      /**
       * The fee amount
       */
      amount?: number // double
      /**
       * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
       */
      frequency?: string
    }
    /**
     * The ETag for the current version of the tenancy renewal. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Represents rent changes in a tenancies renewal
 */
export interface TenancyRentChangeModel {
  /**
   * The amount the rent has changed in the renewal
   */
  amount?: number // double
  /**
   * The percentage the rent has changed in the renewal
   */
  percentage?: number // double
}
/**
 * Representation of a tenancies responsibility
 */
export interface TenancyResponsibilityModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the responsibility
   */
  id?: string
  /**
   * The date and time when the responsibility was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the responsibility last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The identifier of the associated to the responsibility
   */
  typeId?: string
  /**
   * The responsibilities description
   */
  description?: string
  /**
   * The responsible party (landlord/tenant)
   */
  appliesTo?: string
  /**
   * Representation of party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
  /**
   * Tenancy agreement text that relates to the responsibility
   */
  letterText?: string
  /**
   * The unique identifier of the associated tenancy
   */
  tenancyId?: string
  /**
   * The ETag for the current version of the responsibility. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TenancyResponsibilityModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the responsibility
     */
    id?: string
    /**
     * The date and time when the responsibility was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the responsibility last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The identifier of the associated to the responsibility
     */
    typeId?: string
    /**
     * The responsibilities description
     */
    description?: string
    /**
     * The responsible party (landlord/tenant)
     */
    appliesTo?: string
    /**
     * Representation of party agreements to a specific clause in a tenancy agreement
     */
    agreements?: {
      /**
       * A flag to determine if the landlord has agreed
       */
      landlord?: boolean
      /**
       * A flag to determine if the tenant has agreed
       */
      tenant?: boolean
    }
    /**
     * Tenancy agreement text that relates to the responsibility
     */
    letterText?: string
    /**
     * The unique identifier of the associated tenancy
     */
    tenancyId?: string
    /**
     * The ETag for the current version of the responsibility. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * A tenancy source of enquiry
 */
export interface TenancySourceModel {
  /**
   * The unique identifier of the source for this tenancy
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Representation of the configuration settings for terminology
 */
export interface TerminologyModel {
  /**
   * Terminologies associated with the properties
   */
  properties?: {
    /**
     * A flag denoting whether the agent's CRM is configured to use "Sold STC/SSTC" terminology instead of "Under Offer"
     */
    useSoldStc?: boolean
    /**
     * A flag denoting whether the agent's CRM is configured to use "Market Appraisal" terminology instead of "Valuation"
     */
    useMarketAppraisal?: boolean
  }
}
/**
 * Model representing a transaction
 */
export interface TransactionModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the transaction
   */
  id?: string
  /**
   * The date and time when the transaction was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the transaction was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The transaction category (advertisingCharge,accountTransfer,bankCharges,buyerAdminFee,buyerDeposit,buyerPayment,deposit,depositDeduction,depositRefund,depositTransfer,depositTransferToAgent,depositTransferToLandlord,depositTransferToScheme,estateServiceCharge,estateWorksOrder,estateUnitWorksOrder,externalCredit,externalAgentFee,freeholderPayment,float,groundRent,goodwillPayment,holdingDeposit,introducingTenantFee,landlordAdminFee,landlordTax,landlordPayment,landlordToSupplierPayment,landlordWorksOrder,leaseholderAdminFee,leaseholderPayment,leaseholderRepayment,leaseholderWorksOrder,lettingFee,managementFee,paymentSurcharge,receipt,rent,rentGuarantee,recoveryPayment,reserveFund,tenantAdminFee,tenantPayment,tenantToLandlordPayment,tenantToSupplierPayment,trustAccountingInvoice,tenantWorksOrder,vacantManagementFee,vendorAdminFee,vendorCommission,vendorPayment,vendorToSupplierPayment,worksOrderPayment)
   */
  category?: string
  /**
   * The transaction type (bankersDraft,bankTransfer,cash,cheque,creditCard,debitCard,directDebit,housingBenefit,paymentRequest,standingOrder)
   */
  type?: string
  /**
   * The transaction description
   */
  description?: string
  /**
   * The status of the transaction (awaitingAuthorisation/awaitingPosting/posted/rejected)
   */
  status?: string
  /**
   * The ledger the transaction is recorded in
   */
  ledger?: string
  /**
   * The transaction net amount
   */
  netAmount?: number // double
  /**
   * The transaction tax amount
   */
  taxAmount?: number // double
  /**
   * The transaction gross amount
   */
  grossAmount?: number // double
  /**
   * The amount outstanding that remains to be paid
   */
  outstanding?: number // double
  /**
   * The unique identifier of the company the transaction is associated with, where applicable
   */
  companyId?: string
  /**
   * The unique identifier of the landlord the transaction is associated with, where applicable
   */
  landlordId?: string
  /**
   * The unique identifier of the property the transaction is associated with, where applicable
   */
  propertyId?: string
  /**
   * The unique identifier of the tenancy the transaction is associated with, where applicable
   */
  tenancyId?: string
  /**
   * The ETag for the current version of the transaction. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface TransactionModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the transaction
     */
    id?: string
    /**
     * The date and time when the transaction was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the transaction was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The transaction category (advertisingCharge,accountTransfer,bankCharges,buyerAdminFee,buyerDeposit,buyerPayment,deposit,depositDeduction,depositRefund,depositTransfer,depositTransferToAgent,depositTransferToLandlord,depositTransferToScheme,estateServiceCharge,estateWorksOrder,estateUnitWorksOrder,externalCredit,externalAgentFee,freeholderPayment,float,groundRent,goodwillPayment,holdingDeposit,introducingTenantFee,landlordAdminFee,landlordTax,landlordPayment,landlordToSupplierPayment,landlordWorksOrder,leaseholderAdminFee,leaseholderPayment,leaseholderRepayment,leaseholderWorksOrder,lettingFee,managementFee,paymentSurcharge,receipt,rent,rentGuarantee,recoveryPayment,reserveFund,tenantAdminFee,tenantPayment,tenantToLandlordPayment,tenantToSupplierPayment,trustAccountingInvoice,tenantWorksOrder,vacantManagementFee,vendorAdminFee,vendorCommission,vendorPayment,vendorToSupplierPayment,worksOrderPayment)
     */
    category?: string
    /**
     * The transaction type (bankersDraft,bankTransfer,cash,cheque,creditCard,debitCard,directDebit,housingBenefit,paymentRequest,standingOrder)
     */
    type?: string
    /**
     * The transaction description
     */
    description?: string
    /**
     * The status of the transaction (awaitingAuthorisation/awaitingPosting/posted/rejected)
     */
    status?: string
    /**
     * The ledger the transaction is recorded in
     */
    ledger?: string
    /**
     * The transaction net amount
     */
    netAmount?: number // double
    /**
     * The transaction tax amount
     */
    taxAmount?: number // double
    /**
     * The transaction gross amount
     */
    grossAmount?: number // double
    /**
     * The amount outstanding that remains to be paid
     */
    outstanding?: number // double
    /**
     * The unique identifier of the company the transaction is associated with, where applicable
     */
    companyId?: string
    /**
     * The unique identifier of the landlord the transaction is associated with, where applicable
     */
    landlordId?: string
    /**
     * The unique identifier of the property the transaction is associated with, where applicable
     */
    propertyId?: string
    /**
     * The unique identifier of the tenancy the transaction is associated with, where applicable
     */
    tenancyId?: string
    /**
     * The ETag for the current version of the transaction. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface Transactions {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  propertyId?: string[]
  landlordId?: string[]
  tenancyId?: string[]
  status?: ('awaitingAuthorisation' | 'awaitingPosting' | 'posted' | 'rejected')[]
  type?: (
    | 'creditAdjustment'
    | 'creditNoteCorrection'
    | 'creditNoteGoodwillPayment'
    | 'creditNoteRefund'
    | 'creditNoteRepayment'
    | 'creditNoteWriteOff'
    | 'debitAdjustment'
    | 'deposit'
    | 'float'
    | 'invoice'
    | 'journal'
    | 'openingBalanceDr'
    | 'openingBalancingCr'
    | 'payment'
    | 'reserveFunds'
    | 'transfer'
  )[]
  ledger?: ('landlord' | 'tenant' | 'vendor')[]
  category?: (
    | 'advertisingCharge'
    | 'accountTransfer'
    | 'bankCharges'
    | 'buyerAdminFee'
    | 'buyerDeposit'
    | 'buyerPayment'
    | 'deposit'
    | 'depositDeduction'
    | 'depositRefund'
    | 'depositTransfer'
    | 'depositTransferToAgent'
    | 'depositTransferToLandlord'
    | 'depositTransferToScheme'
    | 'estateServiceCharge'
    | 'estateWorksOrder'
    | 'estateUnitWorksOrder'
    | 'externalCredit'
    | 'externalAgentFee'
    | 'freeholderPayment'
    | 'float'
    | 'groundRent'
    | 'goodwillPayment'
    | 'holdingDeposit'
    | 'introducingTenantFee'
    | 'landlordAdminFee'
    | 'landlordTax'
    | 'landlordPayment'
    | 'landlordToSupplierPayment'
    | 'landlordWorksOrder'
    | 'leaseholderAdminFee'
    | 'leaseholderPayment'
    | 'leaseholderRepayment'
    | 'leaseholderWorksOrder'
    | 'lettingFee'
    | 'managementFee'
    | 'paymentSurcharge'
    | 'receipt'
    | 'rent'
    | 'rentGuarantee'
    | 'recoveryPayment'
    | 'reserveFund'
    | 'tenantAdminFee'
    | 'tenantPayment'
    | 'tenantToLandlordPayment'
    | 'tenantToSupplierPayment'
    | 'trustAccountingInvoice'
    | 'tenantWorksOrder'
    | 'vacantManagementFee'
    | 'vendorAdminFee'
    | 'vendorCommission'
    | 'vendorPayment'
    | 'vendorToSupplierPayment'
    | 'worksOrderPayment'
  )[]
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  outstandingFrom?: number
  outstandingTo?: number
}
export interface TransactionsNominalAccounts {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  appliesToWorksOrders?: boolean
}
/**
 * Representation of all of the available configurable items
 */
export interface TypeModel {
  /**
   * A list of configurable agency types
   */
  agencyTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable appointment types
   */
  appointmentTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable applicant statuses
   */
  applicantStatuses?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable board statuses
   */
  boardStatuses?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable buying positions
   */
  buyingPositions?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable buying reasons
   */
  buyingReasons?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable certificate types
   */
  certificateTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable company types
   */
  companyTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable contact categories
   */
  contactCategories?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable document types
   */
  documentTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable identity document types
   */
  identityDocumentTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable journal entry types
   */
  journalEntryTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable key types
   */
  keyTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable follow up responses
   */
  followUpResponses?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable selling reasons
   */
  sellingReasons?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable rent insurance cancellation reasons
   */
  rentInsuranceCancellationReasons?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable renting positions
   */
  rentingPositions?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable supplier types
   */
  supplierTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable task types
   */
  taskTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable tenancy legal status
   */
  tenancyLegalStatuses?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable tenancy types
   */
  tenancyTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable vendor types
   */
  vendorTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
  /**
   * A list of configurable works order types
   */
  worksOrderTypes?: {
    /**
     * The unique identifier of the list item
     */
    id?: string
    /**
     * The textual value for the list item
     */
    value?: string
  }[]
}
/**
 * Represents an unmapped attribute type
 */
export interface UnmappedAttributeModel {
  /**
   * The type of unmapped attribute (style/type/situation/parking/age/locality/special)
   */
  type?: string
  /**
   * The value associated to the unmapped type
   */
  value?: string
}
/**
 * Represents an unmapped requirement type
 */
export interface UnmappedRequirementModel {
  /**
   * The type of unmapped requirement
   */
  type?: string
  /**
   * The value associated to the unmapped type
   */
  value?: string
}
/**
 * The details specific to applicants with a marketingMode of buying
 */
export interface UpdateApplicantBuyingModel {
  /**
   * The identifier of the applicant's buying reason
   */
  reasonId?: string
  /**
   * The identifier of the applicant's selling position
   */
  positionId?: string
  /**
   * The lower bound of the applicant's budget
   */
  priceFrom?: number // int32
  /**
   * The upper bound of the applicant's budget
   */
  priceTo?: number // int32
  /**
   * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
   */
  tenure?: string[]
  /**
   * The date when the applicant's current mortgage expires/is due for renewal
   * example:
   * 2019-08-14
   */
  mortgageExpiry?: string // date
  /**
   * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
   */
  leaseRemaining?: {
    /**
     * The minimum number of years that must remain on the lease of a leasehold property
     */
    min?: number // int32
    /**
     * The maximum number of years that must remain on the lease of a leasehold property
     */
    max?: number // int32
  }
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
 * Details of regional information specific to Guernsey
 */
export interface UpdateApplicantGuernseyModel {
  /**
   * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
   */
  market?: string[]
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
 * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
 */
export interface UpdateApplicantLeaseRemaining {
  /**
   * The minimum number of years that must remain on the lease of a leasehold property
   */
  min?: number // int32
  /**
   * The maximum number of years that must remain on the lease of a leasehold property
   */
  max?: number // int32
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
   * The ISO-4217 currency code that relates to monetary amounts specified by the applicant
   * Where not specified this will default to the customer's base currency
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
   * The status id of the applicant
   */
  statusId?: string
  /**
   * The applicant's selling status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  sellingStatus?: string
  /**
   * The applicant's selling position (nothingToSell/renting/sellingWithUs/sellingWithOtherAgent/sellingPrivately/notYetOnMarket)
   */
  sellingPosition?: string
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
   * A flag determining whether or not the applicant is a potential client
   */
  potentialClient?: boolean
  /**
   * The applicant's property type requirements (eg house, bungalow, land), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  type?: string[]
  /**
   * The applicant's property style requirements (eg detached, semiDetached), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  style?: string[]
  /**
   * The applicant's requirements for other aspects of prospective properties - such as outside space - as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  situation?: string[]
  /**
   * The applicant's parking requirements (eg garage), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parking?: string[]
  /**
   * The applicant's property age requirements (eg new, period), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  age?: string[]
  /**
   * The applicant's general property location requirements (eg rural, townCity), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  locality?: string[]
  /**
   * The applicant's special feature property requirements (eg Swimming Pool, Tennis Court), as defined by the applicant's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
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
   * The minimum number of parking spaces the applicant requires
   */
  parkingSpacesMin?: number // int32
  /**
   * The maximum number of parking spaces the applicant requires
   */
  parkingSpacesMax?: number // int32
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
     * The identifier of the applicant's buying reason
     */
    reasonId?: string
    /**
     * The identifier of the applicant's selling position
     */
    positionId?: string
    /**
     * The lower bound of the applicant's budget
     */
    priceFrom?: number // int32
    /**
     * The upper bound of the applicant's budget
     */
    priceTo?: number // int32
    /**
     * A list of property decoration requirements taken from the full listing of the associated department (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * A list of tenure requirements taken from the full listing of the associated department (freehold/leasehold/shareOfFreehold)
     */
    tenure?: string[]
    /**
     * The date when the applicant's current mortgage expires/is due for renewal
     * example:
     * 2019-08-14
     */
    mortgageExpiry?: string // date
    /**
     * The details specific to the applicant's lease term requirements where they are interested in properties with a leasehold tenure
     */
    leaseRemaining?: {
      /**
       * The minimum number of years that must remain on the lease of a leasehold property
       */
      min?: number // int32
      /**
       * The maximum number of years that must remain on the lease of a leasehold property
       */
      max?: number // int32
    }
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
    /**
     * The identifier of the applicant's renting position
     */
    positionId?: string
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
   * An applicant's source of enquiry
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
   * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Details of regional information specific to Guernsey
     */
    ggy?: {
      /**
       * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
       */
      market?: string[]
    }
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
 * Details relating to the real estate market in specific countries. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface UpdateApplicantRegionalModel {
  /**
   * Details of regional information specific to Guernsey
   */
  ggy?: {
    /**
     * Requirements describing which markets the applicant is looking for properties in (local/openA/openB/openC/openD)
     */
    market?: string[]
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
  /**
   * The identifier of the applicant's renting position
   */
  positionId?: string
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
   * The unique identifier of the attendee. To clear an attendee this can be passed as an empty string.
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
   * 2019-08-14T12:30:02Z
   */
  start?: string // date-time
  /**
   * The date and time when the appointment will end
   * example:
   * 2019-08-14T12:30:02Z
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
   * The unique identifier of the external company either carrying out or attending the appointment with the agent
   */
  otherAgentId?: string
  /**
   * The unique identifier of the negotiator that organised the appointment
   */
  organiserId?: string
  /**
   * A flag denoting whether or not the appointment has been cancelled
   */
  cancelled?: boolean
  /**
   * A collection of unique identifiers of negotiators attached to the appointment. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of unique identifiers of offices attached to the appointment. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * Represents an external attendee on an appointment
   */
  attendee?: {
    /**
     * The unique identifier of the attendee. To clear an attendee this can be passed as an empty string.
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
   * A flag denoting whether or not the appointment is virtual
   */
  virtual?: boolean
  /**
   * A flag denoting whether or not the appointment is a subsequent appointment to a previous one (a repeat appointment for the same attendee)
   */
  isRepeat?: boolean
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
   * Represents the follow up information on a single appointment
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
   * Details of an appointment's recurrence pattern
   */
  recurrence?: {
    /**
     * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
     */
    type?: string
    /**
     * The numeric value denoting how often the appointment will recur
     */
    interval?: number // int32
    /**
     * The date and time when the recurrence will stop
     * example:
     * 2019-08-14T12:30:02Z
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
   * The type of unit that the `interval` applies to (daily/weekly/yearly/monthly)
   */
  type?: string
  /**
   * The numeric value denoting how often the appointment will recur
   */
  interval?: number // int32
  /**
   * The date and time when the recurrence will stop
   * example:
   * 2019-08-14T12:30:02Z
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
   * A collection of unique identifiers of offices attached to the area. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
}
/**
 * Request body used to update an existing certificate
 * example:
 * [object Object]
 */
export interface UpdateCertificateModel {
  /**
   * The certificate's start date
   * example:
   * 2019-08-14T12:30:02Z
   */
  start?: string // date-time
  /**
   * The certificate's expiry date
   * example:
   * 2019-08-14T12:30:02Z
   */
  expiry?: string // date-time
  /**
   * The unique identifier of the company
   */
  companyId?: string
  /**
   * Any general notes regarding the certificate
   */
  notes?: string
  /**
   * The certificate's reference number
   */
  referenceNumber?: string
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
   * The marketing consent status of the company (deny/notAsked)
   */
  marketingConsent?: string
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
   * Request body to set the address of an existing company
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
   * Request body used to update the source of an existing contact
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
   * A collection of unique identifiers of offices attached to the contact. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * A collection of unique identifiers of negotiators attached to the contact. The first item in the collection is considered the primary negotiator
   */
  negotiatorIds?: string[]
  /**
   * A collection of categories associated to the contact.
   */
  categoryIds?: string[]
  /**
   * Request body used to update an address on an existing contact
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
   * Request body used to update an address on an existing contact
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
   * Request body used to update an address on an existing contact
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
   * A flag determining whether or not the contact is happy to receive communications by letter
   */
  communicationPreferenceLetter?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by email
   */
  communicationPreferenceEmail?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by phone
   */
  communicationPreferencePhone?: boolean
  /**
   * A flag determining whether or not the contact is happy to receive communications by SMS
   */
  communicationPreferenceSMS?: boolean
  /**
   * A flag determining whether the contact is archived
   */
  fromArchive?: boolean
  /**
   * App specific metadata to set against the contact
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    [name: string]: string
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
 * Request body used to update an existing contact subscription
 * example:
 * [object Object]
 */
export interface UpdateContactSubscriptionModel {
  /**
   * The status of the subscription (subscribed/unsubscribed)
   */
  status?: string
}
/**
 * Request body for updating sales progression information on an existing offer
 * example:
 * [object Object]
 */
export interface UpdateConveyancingModel {
  /**
   * The unique identifier of the vendor that this offer is associated to. Empty if the offer is external and relates to a property not instructed to the agent
   */
  vendorSolicitorId?: string
  /**
   * The unique identifier of the solicitor / conveyancer that the vendor has instructed
   */
  buyerSolicitorId?: string
  /**
   * The date when the fixtures and fittings form has been completed
   * example:
   * 2019-08-14
   */
  fixturesAndFittingsCompleted?: string // date
  /**
   * The date when the title deeds were requested from land registry
   * example:
   * 2019-08-14
   */
  deedsRequested?: string // date
  /**
   * The date when the title deeds were received from land registry
   * example:
   * 2019-08-14
   */
  deedsReceived?: string // date
  /**
   * The date when the legal enquiries raised by the buyers solicitor were sent
   * example:
   * 2019-08-14
   */
  enquiriesSent?: string // date
  /**
   * The date when the legal enquiries raised by the buyers solicitor were answered
   * example:
   * 2019-08-14
   */
  enquiriesAnswered?: string // date
  /**
   * The date when the buyer paid for conveyancing searches
   * example:
   * 2019-08-14
   */
  searchesPaid?: string // date
  /**
   * The date when conveyancing searches were applied for
   * example:
   * 2019-08-14
   */
  searchesApplied?: string // date
  /**
   * The date when conveyancing searches were received
   * example:
   * 2019-08-14
   */
  searchesReceived?: string // date
  /**
   * The date when the draft contract was sent
   * example:
   * 2019-08-14
   */
  contractSent?: string // date
  /**
   * The date when the draft contract was received
   * example:
   * 2019-08-14
   */
  contractReceived?: string // date
  /**
   * The date when the contract was approved
   * example:
   * 2019-08-14
   */
  contractApproved?: string // date
  /**
   * The date when the vendor signed the approved contract
   * example:
   * 2019-08-14
   */
  contractVendorSigned?: string // date
  /**
   * The date when the buyer signed the approved contract
   * example:
   * 2019-08-14
   */
  contractBuyerSigned?: string // date
  /**
   * Indication of whether the buyer will require a mortgage to fund the purchase (yes/no/unknown)
   */
  mortgageRequired?: string
  /**
   * The loan to value percentage of the mortgage required
   */
  mortgageLoanPercentage?: number // int32
  /**
   * The date when the mortgage application was submitted
   * example:
   * 2019-08-14
   */
  mortgageSubmitted?: string // date
  /**
   * The date when the mortgage offer was received
   * example:
   * 2019-08-14
   */
  mortgageOfferReceived?: string // date
  /**
   * The unique identifier of the company who will provide the mortgage
   */
  mortgageLenderId?: string
  /**
   * The unique identifier of the company who brokered the mortgage
   */
  mortgageBrokerId?: string
  /**
   * The date of the mortgage valuation/survey
   * example:
   * 2019-08-14T12:30:02Z
   */
  mortgageSurveyDate?: string // date-time
  /**
   * The unique identifier of the company who will perform the mortgage valuation/survey
   */
  mortgageSurveyorId?: string
  /**
   * Indication of whether the buyer requires that an additional survey take place (yes/no/unknown)
   */
  additionalSurveyRequired?: string
  /**
   * The date of the additional survey
   * example:
   * 2019-08-14
   */
  additionalSurveyDate?: string // date
  /**
   * The unique identifier of the company who will perform the additional survey
   */
  additionalSurveyorId?: string
  /**
   * The date when the vendor conveyancer confirms the exchange
   * example:
   * 2019-08-14
   */
  exchangedVendor?: string // date
  /**
   * The date when the buyer conveyancer confirms the exchange
   * example:
   * 2019-08-14
   */
  exchangedBuyer?: string // date
  /**
   * The date when the sale completed
   * example:
   * 2019-08-14
   */
  completion?: string // date
  /**
   * App specific metadata to set against this conveyancing record
   */
  metadata?: {
    [name: string]: any
  }
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
  /**
   * A flag denoting whether or not the document is private
   */
  isPrivate?: boolean
  /**
   * App specific metadata to set against the document
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update an existing enquiry
 * example:
 * [object Object]
 */
export interface UpdateEnquiryModel {
  /**
   * The unique identifier of the applicant associated to the enquiry
   */
  applicantId?: string
  /**
   * The status of the enquiry (added/alreadyExists/duplicateEntry/pending/rejected/spam)
   */
  status?: string
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
   * Request body to update an identity document attached to an existing contact identity check
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
     * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
     */
    fileData?: string
    /**
     * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
     */
    fileUrl?: string
    /**
     * The filename to store the document as
     */
    name?: string
  }
  /**
   * Request body to update an identity document attached to an existing contact identity check
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
     * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
     */
    fileData?: string
    /**
     * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
     */
    fileUrl?: string
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
   * The total request payload cannot exceed 6Mb, regardless of the number of documents being sent
   */
  fileData?: string
  /**
   * The presigned s3 url which a document has been uploaded to (This supports files up to 30MB)
   */
  fileUrl?: string
  /**
   * The filename to store the document as
   */
  name?: string
}
/**
 * Request body used to set the energy performance rating information for properties in Ireland
 */
export interface UpdateIrelandPropertyBERModel {
  /**
   * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
   */
  exempt?: boolean
  /**
   * The BER rating of the property
   */
  rating?: string
  /**
   * The BER certificate reference number
   */
  refNumber?: string
  /**
   * The energy performance indicator for the property
   */
  epi?: string
}
/**
 * Request body used to set the data specific to properties in Ireland
 */
export interface UpdateIrelandPropertyModel {
  /**
   * Request body used to set the energy performance rating information for properties in Ireland
   */
  buildingEnergyRating?: {
    /**
     * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
     */
    exempt?: boolean
    /**
     * The BER rating of the property
     */
    rating?: string
    /**
     * The BER certificate reference number
     */
    refNumber?: string
    /**
     * The energy performance indicator for the property
     */
    epi?: string
  }
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
   * Request body used to update the source of an existing landlord
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
 * Request body used to update a tenancy renewals letting fee
 */
export interface UpdateLettingFeeRenewalModel {
  /**
   * The letting fee type (fixed/perentage)
   */
  type?: string
  /**
   * The letting fee amount as a fixed price or percentage based on the `type`
   */
  amount?: number // double
  /**
   * The frequency at which the letting fee is required (monthly/quarterly/halfYearly/yearly/28days/upfront/upfrontOver2Months/other/notApplicable)
   */
  frequency?: string
}
/**
 * Representation of property details specific to property licence application
 */
export interface UpdateLicenceApplicationModel {
  /**
   * The status of the licence application (applied/granted/landlordApplying/notApplicable)
   */
  status?: string
  /**
   * The licence application reference number
   */
  referenceNumber?: string
  /**
   * The date the licence was applied for
   * example:
   * 2019-08-14T12:30:02Z
   */
  date?: string // date-time
  /**
   * The date the licence application was granted
   * example:
   * 2019-08-14T12:30:02Z
   */
  granted?: string // date-time
  /**
   * The date the licence will expire
   * example:
   * 2019-08-14T12:30:02Z
   */
  expiry?: string // date-time
}
/**
 * Request body used to update a tenancy renewals management fee
 */
export interface UpdateManagementFeeRenewalModel {
  /**
   * The mangement fee type (fixed/perentage)
   */
  type?: string
  /**
   * The mangement fee amount as a fixed price or percentage based on the `type`
   */
  amount?: number // double
  /**
   * The frequency at which the mangement fee is required (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
   */
  frequency?: string
}
/**
 * Payload to update a metadata record
 * example:
 * [object Object]
 */
export interface UpdateMetadataRequest {
  /**
   * The updated JSON document to store
   */
  metadata: {
    [name: string]: any
  }
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
 * Request body used to set the geolocation coordinates of an existing address
 */
export interface UpdateOfficeAddressGeolocationModel {
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
  /**
   * Request body used to set the geolocation coordinates of an existing address
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
   * A flag denoting whether or not this office is active
   */
  active?: boolean
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * Request body used to update the address of an existing office
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
     * Request body used to set the geolocation coordinates of an existing address
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
 * Request body used to upda te a new open house attendee
 * example:
 * [object Object]
 */
export interface UpdateOpenHouseAttendeeModel {
  /**
   * The interest level of the open house attendee (veryInterested/mightBeInterested/notInterested/notSet)
   */
  interestLevel?: string
  /**
   * Notes on this open house attendee
   */
  notes?: string
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
   * Request body used to update the geolocation coordinates of an existing property's address
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
 * Model for the update of an existing check
 * example:
 * [object Object]
 */
export interface UpdatePropertyCheckModel {
  /**
   * The status of the check (needed/notNeeded/arranging/completed)
   */
  status?: string
}
/**
 * Request body used to update the commission fee for a property
 */
export interface UpdatePropertyCommissionFeeModel {
  /**
   * The commission letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The commission letting fee amount
   */
  amount?: number // double
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
  /**
   * The URL to access the full EPC document
   */
  fullDocumentUrl?: string
  /**
   * The URL to access the first page of the EPC document
   */
  firstPageDocumentUrl?: string
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
   * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
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
   * The type of image (photograph/floorPlan/epc/map)
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
 * Representation of property details specific to property Licencing
 */
export interface UpdatePropertyLettingLicencingModel {
  /**
   * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
   */
  licenceRequired?: boolean
  /**
   * The type of licence (additional/mandatory/none/selective)
   */
  licenceType?: string
  /**
   * The number of households that the licence permits in the property
   */
  households?: number // int32
  /**
   * The number of occupants that the licence permits in the property
   */
  occupants?: number // int32
  /**
   * A flag determining whether or not the property is above commercial premises
   */
  aboveCommercialPremises?: boolean
  /**
   * Representation of property details specific to property licence application
   */
  application?: {
    /**
     * The status of the licence application (applied/granted/landlordApplying/notApplicable)
     */
    status?: string
    /**
     * The licence application reference number
     */
    referenceNumber?: string
    /**
     * The date the licence was applied for
     * example:
     * 2019-08-14T12:30:02Z
     */
    date?: string // date-time
    /**
     * The date the licence application was granted
     * example:
     * 2019-08-14T12:30:02Z
     */
    granted?: string // date-time
    /**
     * The date the licence will expire
     * example:
     * 2019-08-14T12:30:02Z
     */
    expiry?: string // date-time
  }
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
   * The date the letting agreement between the landlord and agent was signed
   * example:
   * 2019-08-14
   */
  agreementSigned?: string // date
  /**
   * The rent being charged for the property
   */
  rent?: number // double
  /**
   * The frequency at which rent will be collected (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Details of any bills that are included in the rent
   */
  rentIncludes?: string
  /**
   * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
   */
  furnishing?: string[]
  /**
   * The acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
  /**
   * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole?: string
  /**
   * The unique identifier of the landlord letting the property
   */
  landlordId?: string
  /**
   * The unique identifier of the document used for the lettings brochure
   */
  brochureId?: string
  /**
   * A note to accompany any works orders created for the property
   */
  worksOrderNote?: string
  /**
   * Sets the minimum number of months the property can be let out for
   */
  minimumTerm?: number // int32
  /**
   * Request body used to update the commission fee for a property
   */
  managementFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * Request body used to update the commission fee for a property
   */
  lettingFee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The rent qualifier (rentOnApplication/askingRent)
   */
  qualifier?: string
  /**
   * Representation of property details specific to utilities
   */
  utilities?: {
    /**
     * A flag denoting whether or not the property has gas connected
     */
    hasGas?: boolean
    /**
     * The unique identifier of the company supplying the gas to the property
     */
    gasCompanyId?: string
    /**
     * The gas meter point number
     */
    gasMeterPoint?: string
    /**
     * The unique identifier of the company supplying the electricity to the property
     */
    electricityCompanyId?: string
    /**
     * The electricity meter point number
     */
    electricityMeterPoint?: string
    /**
     * The unique identifier of the company supplying the water to the property
     */
    waterCompanyId?: string
    /**
     * The water meter point number
     */
    waterMeterPoint?: string
    /**
     * The unique identifier of the company supplying the telephone to the property
     */
    telephoneCompanyId?: string
    /**
     * The unique identifier of the company supplying the internet to the property
     */
    internetCompanyId?: string
    /**
     * The unique identifier of the company supplying the cable tv to the property
     */
    cableTvCompanyId?: string
  }
  /**
   * Representation of a property details related to deposit
   */
  deposit?: {
    /**
     * The type of deposit (weeks/months/fixed)
     */
    type?: string
    /**
     * The deposit amount. This can be the number of weeks or months rent or a monetry amount based on the `type`
     */
    amount?: number // double
  }
  /**
   * Request body used to update details specific to rent insurance associated with a lettings property
   */
  rentInsurance?: {
    /**
     * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
     */
    status?: string
    /**
     * The reference number of the insurance policy when rent protection insurance has been taken out
     */
    referenceNumber?: string
    /**
     * The insurance policy start date
     * example:
     * 2019-08-14
     */
    start?: string // date
    /**
     * The insurance policy end date
     * example:
     * 2019-08-14
     */
    end?: string // date
    /**
     * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
     */
    cancelledReasonId?: string
    /**
     * A textual comment or note entered by the agent when an insurance policy was cancelled
     */
    cancelledComment?: string
    /**
     * Flag indicating whether or not the insurance policy should auto renew
     */
    autoRenew?: boolean
  }
  /**
   * Representation of property details specific to property Licencing
   */
  licencing?: {
    /**
     * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
     */
    licenceRequired?: boolean
    /**
     * The type of licence (additional/mandatory/none/selective)
     */
    licenceType?: string
    /**
     * The number of households that the licence permits in the property
     */
    households?: number // int32
    /**
     * The number of occupants that the licence permits in the property
     */
    occupants?: number // int32
    /**
     * A flag determining whether or not the property is above commercial premises
     */
    aboveCommercialPremises?: boolean
    /**
     * Representation of property details specific to property licence application
     */
    application?: {
      /**
       * The status of the licence application (applied/granted/landlordApplying/notApplicable)
       */
      status?: string
      /**
       * The licence application reference number
       */
      referenceNumber?: string
      /**
       * The date the licence was applied for
       * example:
       * 2019-08-14T12:30:02Z
       */
      date?: string // date-time
      /**
       * The date the licence application was granted
       * example:
       * 2019-08-14T12:30:02Z
       */
      granted?: string // date-time
      /**
       * The date the licence will expire
       * example:
       * 2019-08-14T12:30:02Z
       */
      expiry?: string // date-time
    }
  }
}
/**
 * Request body used to update details specific to rent insurance associated with a lettings property
 */
export interface UpdatePropertyLettingRentInsuranceModel {
  /**
   * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
   */
  status?: string
  /**
   * The reference number of the insurance policy when rent protection insurance has been taken out
   */
  referenceNumber?: string
  /**
   * The insurance policy start date
   * example:
   * 2019-08-14
   */
  start?: string // date
  /**
   * The insurance policy end date
   * example:
   * 2019-08-14
   */
  end?: string // date
  /**
   * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
   */
  cancelledReasonId?: string
  /**
   * A textual comment or note entered by the agent when an insurance policy was cancelled
   */
  cancelledComment?: string
  /**
   * Flag indicating whether or not the insurance policy should auto renew
   */
  autoRenew?: boolean
}
/**
 * Representation of a property details related to deposit
 */
export interface UpdatePropertyLettingsDepositModel {
  /**
   * The type of deposit (weeks/months/fixed)
   */
  type?: string
  /**
   * The deposit amount. This can be the number of weeks or months rent or a monetry amount based on the `type`
   */
  amount?: number // double
}
/**
 * Request body used to update an existing property
 * example:
 * [object Object]
 */
export interface UpdatePropertyModel {
  /**
   * The date the owner of the property was last called
   * example:
   * 2019-08-14
   */
  lastCall?: string // date
  /**
   * The date the owner of the property is next due to be called
   * example:
   * 2019-08-14
   */
  nextCall?: string // date
  /**
   * A flag determining whether or not the property's room details have been approved by the vendor or landlord
   */
  roomDetailsApproved?: boolean
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
   * An optional alternative identifier specified for this property
   */
  alternateId?: string
  /**
   * The property's special feature property requirements (eg Swimming Pool, Tennis Court), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  specialFeatures?: string[]
  /**
   * Request body used to update the address of an existing property
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
     * Request body used to update the geolocation coordinates of an existing property's address
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
   * The maximum number of bedrooms in the property
   */
  bedroomsMax?: number // int32
  /**
   * The number of units offered on the market. This is typically used when marketing development sites.
   */
  numberOfUnits?: number // int32
  /**
   * The total number of reception rooms in the property
   */
  receptions?: number // int32
  /**
   * The maximum number of reception rooms in the property
   */
  receptionsMax?: number // int32
  /**
   * The total number of bathrooms in the property
   */
  bathrooms?: number // int32
  /**
   * The maximum number of bathrooms in the property
   */
  bathroomsMax?: number // int32
  /**
   * The total number of parking spaces the property has. This is only supported by some departments. Please refer to the glossary for support [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parkingSpaces?: number // int32
  /**
   * The council tax banding of the property (A/B/C/D/E/F/G/H/I/notYetAvailable)
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
   * The url of a video associated with this property, such as a virtual tour
   */
  videoUrl?: string
  /**
   * The caption for the video url associated with this property
   */
  videoCaption?: string
  /**
   * The url of a second video associated with this property, such as a virtual tour
   */
  video2Url?: string
  /**
   * The caption for the second video url associated with this property
   */
  video2Caption?: string
  /**
   * Any general notes regarding the property. These are not usually exposed to end users and may contain sensitive information about a sale
   */
  notes?: string
  /**
   * The long description of the property
   */
  longDescription?: string
  /**
   * The floor level the property is on. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  floorLevel?: number // int32
  /**
   * The number of internal floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  internalFloors?: number // int32
  /**
   * The total number of floors the property has. Note that this field can only be set when certain configuration settings are enabled on the property's department. Please [refer to the glossary](https://foundations-documentation.reapit.cloud/platform-glossary#department) for more information
   */
  totalFloors?: number // int32
  /**
   * The status of the advertising board sited outside or near to the property
   */
  boardStatus?: string
  /**
   * Any notes relevant to the advertising board sited outside or near to the property
   */
  boardNotes?: string
  /**
   * The date the advertising board was last updated (or should be updated when the date is in the future)
   * example:
   * 2019-08-14
   */
  boardUpdated?: string // date
  /**
   * The date on which the property was valued. Note that this can differ to physical appointment dates in some cases
   * example:
   * 2019-08-14
   */
  valuation?: string // date
  /**
   * Request body used to update the EPC statistics of an existing property
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
    /**
     * The URL to access the full EPC document
     */
    fullDocumentUrl?: string
    /**
     * The URL to access the first page of the EPC document
     */
    firstPageDocumentUrl?: string
  }
  /**
   * Request body to update the external land area of an existing property
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
     * The maximum area bound (please note there is no corresponding field in the Reapit CRM)
     */
    max?: number // double
  }
  /**
   * Request body to update the internal dimensions of an existing property
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
   * Request body used to update details specific to sales marketing on an existing property
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
     * The fee charged by the agent to reserve a property (typically a new build)
     */
    reservationFee?: number // int32
    /**
     * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
     */
    disposal?: string
    /**
     * The date the property sale was completed
     * example:
     * 2019-08-14
     */
    completed?: string // date
    /**
     * The date the property was exchanged
     * example:
     * 2019-08-14
     */
    exchanged?: string // date
    /**
     * The date the property account was paid
     * example:
     * 2019-08-14
     */
    accountPaid?: string // date
    /**
     * Request body used to set the tenure of an existing property
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
     * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
     */
    sellingAgency?: string
    /**
     * The unique identifier of the custom selling agency type - only applicable when SellingAgency is not set
     */
    agencyId?: string
    /**
     * The date on which the agreement between the vendor and agent expires
     * example:
     * 2019-08-14
     */
    agreementExpiry?: string // date
    /**
     * Request body used to update the commission fee for a property
     */
    fee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The agent's recommended asking price
     */
    recommendedPrice?: number // int32
    /**
     * The agent's valuation price
     */
    valuationPrice?: number // int32
    /**
     * The unique identifier of the document used for the sales brochure
     */
    brochureId?: string
    /**
     * The property's decorative condition (unmodernised/fair/good/veryGood)
     */
    decoration?: string[]
    /**
     * Details relating to the shared ownership of the property
     */
    sharedOwnership?: {
      /**
       * The percentage of the shared ownership property being sold by the vendor
       */
      sharedPercentage?: number // double
      /**
       * The rent payable on the remainder of the shared ownership property
       */
      rent?: number // double
      /**
       * The frequency at which the shared ownership rent should be paid
       */
      rentFrequency?: string
    }
  }
  /**
   * Request body used to update details specific to lettings marketing on an existing property
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
     * The date the letting agreement between the landlord and agent was signed
     * example:
     * 2019-08-14
     */
    agreementSigned?: string // date
    /**
     * The rent being charged for the property
     */
    rent?: number // double
    /**
     * The frequency at which rent will be collected (weekly/monthly/annually)
     */
    rentFrequency?: string
    /**
     * Details of any bills that are included in the rent
     */
    rentIncludes?: string
    /**
     * The furnishing state that the property can be offered in (furnished/unfurnished/partFurnished)
     */
    furnishing?: string[]
    /**
     * The acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * The current status of the let (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
    /**
     * The role that the agent will be performing for this lettings property (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
     */
    agentRole?: string
    /**
     * The unique identifier of the landlord letting the property
     */
    landlordId?: string
    /**
     * The unique identifier of the document used for the lettings brochure
     */
    brochureId?: string
    /**
     * A note to accompany any works orders created for the property
     */
    worksOrderNote?: string
    /**
     * Sets the minimum number of months the property can be let out for
     */
    minimumTerm?: number // int32
    /**
     * Request body used to update the commission fee for a property
     */
    managementFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * Request body used to update the commission fee for a property
     */
    lettingFee?: {
      /**
       * The commission letting fee type (percentage/fixed)
       */
      type?: string
      /**
       * The commission letting fee amount
       */
      amount?: number // double
    }
    /**
     * The rent qualifier (rentOnApplication/askingRent)
     */
    qualifier?: string
    /**
     * Representation of property details specific to utilities
     */
    utilities?: {
      /**
       * A flag denoting whether or not the property has gas connected
       */
      hasGas?: boolean
      /**
       * The unique identifier of the company supplying the gas to the property
       */
      gasCompanyId?: string
      /**
       * The gas meter point number
       */
      gasMeterPoint?: string
      /**
       * The unique identifier of the company supplying the electricity to the property
       */
      electricityCompanyId?: string
      /**
       * The electricity meter point number
       */
      electricityMeterPoint?: string
      /**
       * The unique identifier of the company supplying the water to the property
       */
      waterCompanyId?: string
      /**
       * The water meter point number
       */
      waterMeterPoint?: string
      /**
       * The unique identifier of the company supplying the telephone to the property
       */
      telephoneCompanyId?: string
      /**
       * The unique identifier of the company supplying the internet to the property
       */
      internetCompanyId?: string
      /**
       * The unique identifier of the company supplying the cable tv to the property
       */
      cableTvCompanyId?: string
    }
    /**
     * Representation of a property details related to deposit
     */
    deposit?: {
      /**
       * The type of deposit (weeks/months/fixed)
       */
      type?: string
      /**
       * The deposit amount. This can be the number of weeks or months rent or a monetry amount based on the `type`
       */
      amount?: number // double
    }
    /**
     * Request body used to update details specific to rent insurance associated with a lettings property
     */
    rentInsurance?: {
      /**
       * Status indicating whether or not rent protection insurance has been taken out (notAsked/cancelled/declined/quoted/taken)
       */
      status?: string
      /**
       * The reference number of the insurance policy when rent protection insurance has been taken out
       */
      referenceNumber?: string
      /**
       * The insurance policy start date
       * example:
       * 2019-08-14
       */
      start?: string // date
      /**
       * The insurance policy end date
       * example:
       * 2019-08-14
       */
      end?: string // date
      /**
       * The identifier of the reason the insurance policy was cancelled, to be used in conjunction with the relevant configuration API endpoint
       */
      cancelledReasonId?: string
      /**
       * A textual comment or note entered by the agent when an insurance policy was cancelled
       */
      cancelledComment?: string
      /**
       * Flag indicating whether or not the insurance policy should auto renew
       */
      autoRenew?: boolean
    }
    /**
     * Representation of property details specific to property Licencing
     */
    licencing?: {
      /**
       * A flag determining whether or not a licence is required to let the property. Typically required for houses of multiple occupancy (HMOs)
       */
      licenceRequired?: boolean
      /**
       * The type of licence (additional/mandatory/none/selective)
       */
      licenceType?: string
      /**
       * The number of households that the licence permits in the property
       */
      households?: number // int32
      /**
       * The number of occupants that the licence permits in the property
       */
      occupants?: number // int32
      /**
       * A flag determining whether or not the property is above commercial premises
       */
      aboveCommercialPremises?: boolean
      /**
       * Representation of property details specific to property licence application
       */
      application?: {
        /**
         * The status of the licence application (applied/granted/landlordApplying/notApplicable)
         */
        status?: string
        /**
         * The licence application reference number
         */
        referenceNumber?: string
        /**
         * The date the licence was applied for
         * example:
         * 2019-08-14T12:30:02Z
         */
        date?: string // date-time
        /**
         * The date the licence application was granted
         * example:
         * 2019-08-14T12:30:02Z
         */
        granted?: string // date-time
        /**
         * The date the licence will expire
         * example:
         * 2019-08-14T12:30:02Z
         */
        expiry?: string // date-time
      }
    }
  }
  /**
   * Request body used to set region specific property details. Child models are named based on the ISO3166 country code that the data inside the model relates to
   */
  regional?: {
    /**
     * Request body used to set the data specific to properties in Ireland
     */
    irl?: {
      /**
       * Request body used to set the energy performance rating information for properties in Ireland
       */
      buildingEnergyRating?: {
        /**
         * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
         */
        exempt?: boolean
        /**
         * The BER rating of the property
         */
        rating?: string
        /**
         * The BER certificate reference number
         */
        refNumber?: string
        /**
         * The energy performance indicator for the property
         */
        epi?: string
      }
    }
  }
  /**
   * Request body used to set details specific to rural properties.
   */
  rural?: {
    /**
     * Details of the building associated with the property.
     */
    buildingsDescription?: string
    /**
     * Details of the land associated with the property.
     */
    landDescription?: string
  }
  /**
   * The attributes describing the overall type of the property (eg house, bungalow, land), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  type?: string[]
  /**
   * The attributes describing the style of property (eg detached, semiDetached), defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  style?: string[]
  /**
   * The attributes describing other aspects of the property - such as outside space - as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  situation?: string[]
  /**
   * The attributes describing the parking available at the property (eg garage), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  parking?: string[]
  /**
   * The attributes describing the age of the property (eg new, period), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
   */
  age?: string[]
  /**
   * The attributes describing the general location of the property (eg rural, townCity), as defined by the property's [department](https://foundations-documentation.reapit.cloud/platform-glossary#department)
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
   * The url to the property on an external website
   */
  url?: string
  /**
   * The caption to accompany the url to the property on an external website
   */
  urlCaption?: string
  /**
   * Any ground rent payment that applies to the property
   */
  groundRent?: number // double
  /**
   * Comments regarding the ground rent of the property
   */
  groundRentComment?: string
  /**
   * The date when the ground rent payable on the property should be reviewed
   * example:
   * 2019-08-14T12:30:02Z
   */
  groundRentReviewDate?: string // date-time
  /**
   * The annual percentage increase of the ground rent after being reviewed
   */
  groundRentIncrease?: number // double
  /**
   * Any service charge payment that applies to the property
   */
  serviceCharge?: number // double
  /**
   * Comments regarding the service charge of the property
   */
  serviceChargeComment?: string
  /**
   * App specific metadata to set against the property
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set region specific property details. Child models are named based on the ISO3166 country code that the data inside the model relates to
 */
export interface UpdatePropertyRegionalModel {
  /**
   * Request body used to set the data specific to properties in Ireland
   */
  irl?: {
    /**
     * Request body used to set the energy performance rating information for properties in Ireland
     */
    buildingEnergyRating?: {
      /**
       * A flag denoting whether or not this property is exempt from requiring a Building Energy Rating (BER) certificate
       */
      exempt?: boolean
      /**
       * The BER rating of the property
       */
      rating?: string
      /**
       * The BER certificate reference number
       */
      refNumber?: string
      /**
       * The energy performance indicator for the property
       */
      epi?: string
    }
  }
}
/**
 * Request body used to set details specific to rural properties.
 */
export interface UpdatePropertyRuralModel {
  /**
   * Details of the building associated with the property.
   */
  buildingsDescription?: string
  /**
   * Details of the land associated with the property.
   */
  landDescription?: string
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
   * The fee charged by the agent to reserve a property (typically a new build)
   */
  reservationFee?: number // int32
  /**
   * The price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * The current status of the sale (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * The method used to sell the property (auction/confidential/tender/offersInvited/privateTreaty/sharedOwnership)
   */
  disposal?: string
  /**
   * The date the property sale was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * The date the property was exchanged
   * example:
   * 2019-08-14
   */
  exchanged?: string // date
  /**
   * The date the property account was paid
   * example:
   * 2019-08-14
   */
  accountPaid?: string // date
  /**
   * Request body used to set the tenure of an existing property
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
   * The selling agency type (marketingForAssociate/clientsOnly/comparable/subAgent/jointSole/jointSoleFeeAvailable/multiple/multipleFeeAvailable/ownToSell/soleSellingRights/soleSellingRightsFeeAvailable/soleAgent/soleAgentFeeAvailable)
   */
  sellingAgency?: string
  /**
   * The unique identifier of the custom selling agency type - only applicable when SellingAgency is not set
   */
  agencyId?: string
  /**
   * The date on which the agreement between the vendor and agent expires
   * example:
   * 2019-08-14
   */
  agreementExpiry?: string // date
  /**
   * Request body used to update the commission fee for a property
   */
  fee?: {
    /**
     * The commission letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The commission letting fee amount
     */
    amount?: number // double
  }
  /**
   * The agent's recommended asking price
   */
  recommendedPrice?: number // int32
  /**
   * The agent's valuation price
   */
  valuationPrice?: number // int32
  /**
   * The unique identifier of the document used for the sales brochure
   */
  brochureId?: string
  /**
   * The property's decorative condition (unmodernised/fair/good/veryGood)
   */
  decoration?: string[]
  /**
   * Details relating to the shared ownership of the property
   */
  sharedOwnership?: {
    /**
     * The percentage of the shared ownership property being sold by the vendor
     */
    sharedPercentage?: number // double
    /**
     * The rent payable on the remainder of the shared ownership property
     */
    rent?: number // double
    /**
     * The frequency at which the shared ownership rent should be paid
     */
    rentFrequency?: string
  }
}
/**
 * Details relating to the shared ownership of the property
 */
export interface UpdatePropertySharedOwnershipModel {
  /**
   * The percentage of the shared ownership property being sold by the vendor
   */
  sharedPercentage?: number // double
  /**
   * The rent payable on the remainder of the shared ownership property
   */
  rent?: number // double
  /**
   * The frequency at which the shared ownership rent should be paid
   */
  rentFrequency?: string
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
 * Update Referral Model
 * example:
 * [object Object]
 */
export interface UpdateReferralModel {
  /**
   * The status of the referral (sent/succeeded/cancelled/failed/paid/declined/inProgress)
   */
  status?: string
  /**
   * The amount paid to the agent for the referral
   */
  amount?: number // double
  /**
   * App specific metadata to set against the referral
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Payload to update a JSON schema
 * example:
 * [object Object]
 */
export interface UpdateSchemaRequest {
  /**
   * The updated JSON schema to store
   */
  schema: string
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
   * The date the task becomes active (Required when 'TypeId' is given)
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
 * Request body used to set party agreements to a specific clause in a tenancy agreement
 */
export interface UpdateTenancyAgreementModel {
  /**
   * A flag to determine if the landlord has agreed
   */
  landlord?: boolean
  /**
   * A flag to determine if the tenant has agreed
   */
  tenant?: boolean
}
/**
 * Request body used to update tenancy allowance
 * example:
 * [object Object]
 */
export interface UpdateTenancyAllowanceModel {
  /**
   * The state of the allowance (allowed/notAllowed)
   */
  state?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
}
/**
 * Request body used to update tenancy break clause
 * example:
 * [object Object]
 */
export interface UpdateTenancyBreakClauseModel {
  /**
   * The date the break clause becomes/became active
   * example:
   * 2019-08-14
   */
  active?: string // date
  /**
   * The responsible party (landlord/tenant/mutual)
   */
  appliesTo?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
  /**
   * Request body used to set a break clauses break from details
   */
  breakFrom?: {
    /**
     * The date the break from clause can be used
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The minimum number of months until the break clause can be used
     */
    minTermMonths?: number // int32
  }
  /**
   * Request body used to set a break clauses notice required details
   */
  noticeRequired?: {
    /**
     * The date a break clauses notice is required by
     * example:
     * 2019-08-14
     */
    date?: string // date
    /**
     * The number of months the notice is required before the break clause
     */
    beforeBreakMonths?: number // int32
  }
}
/**
 * Request body used to set a break clauses break from details
 */
export interface UpdateTenancyBreakFromModel {
  /**
   * The date the break from clause can be used
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The minimum number of months until the break clause can be used
   */
  minTermMonths?: number // int32
}
/**
 * Model for updat of an existing tenancy check
 * example:
 * [object Object]
 */
export interface UpdateTenancyCheckModel {
  /**
   * The status of the tenancy check (needed/notNeeded/arranging/completed)
   */
  status?: string
  /**
   * App specific metadata to set against the tenancy check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set the deposit of a tenancy
 */
export interface UpdateTenancyDepositModel {
  /**
   * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
   */
  heldBy?: string
  /**
   * The number of weeks or months rent collected as the deposit on the tenancy
   */
  period?: number // int32
  /**
   * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
   */
  type?: string
  /**
   * The amount of deposit held
   */
  sum?: number // double
}
/**
 * Request body used to update letting fees on an existing tenancy
 */
export interface UpdateTenancyLettingFeeModel {
  /**
   * The letting fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
   */
  frequency?: string
}
/**
 * Request body used to update management fees on an existing tenancy
 */
export interface UpdateTenancyManagementFeeModel {
  /**
   * The management fee type (percentage/fixed)
   */
  type?: string
  /**
   * The fee amount
   */
  amount?: number // double
  /**
   * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
   */
  frequency?: string
}
/**
 * Request body used to update an existing Tenancy
 * example:
 * [object Object]
 */
export interface UpdateTenancyModel {
  /**
   * The start date of the tenancy
   * example:
   * 2019-08-14
   */
  startDate?: string // date
  /**
   * The end date of the tenancy
   * example:
   * 2019-08-14
   */
  endDate?: string // date
  /**
   * The current status of the tenancy (offerPending/offerWithdrawn/offerRejected/arranging/current/finished/cancelled)
   */
  status?: string
  /**
   * The role that the agent is performing for the tenancy (managed/rentCollection/collectFirstPayment/collectRentToDate/lettingOnly/introducingTenant)
   */
  agentRole?: string
  /**
   * The amount of rent required, returned in relation to the collection frequency
   */
  rent?: number // double
  /**
   * The rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Flag for end date confirmation
   */
  endDateConfirmed?: boolean
  /**
   * A flag determining whether or not the tenancy has been extended indefinitely
   */
  isPeriodic?: boolean
  /**
   * The unique identifier of the type of tenancy
   */
  typeId?: string
  /**
   * The unique identifier of the negotiator who is managing the tenancy
   */
  negotiatorId?: string
  /**
   * Request body used to set the source of a new tenancy
   */
  source?: {
    /**
     * The unique identifier of the source for the tenancy
     */
    id?: string
    /**
     * The source type (office/source)
     */
    type?: string
  }
  /**
   * The frequency of rental instalment payments (weekly/fortnightly/monthly/quarterly/halfYearly/yearly/every28Days/other)
   */
  rentInstalmentsFrequency?: string
  /**
   * The amount due for each rent instalment (where specified)
   */
  rentInstalmentsAmount?: number // double
  /**
   * The date that the first instalment is due
   * example:
   * 2019-08-14
   */
  rentInstalmentsStart?: string // date
  /**
   * The recorded utility reading for the gas meter
   */
  meterReadingGas?: string
  /**
   * Date of when the reading of gas utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingGasLastRead?: string // date
  /**
   * The recorded utility reading for the electricity meter
   */
  meterReadingElectricity?: string
  /**
   * Date of when the reading of electricity utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingElectricityLastRead?: string // date
  /**
   * The recorded utility reading for the water meter
   */
  meterReadingWater?: string
  /**
   * Date of when the reading of water utility was last recorded
   * example:
   * 2019-08-14
   */
  meterReadingWaterLastRead?: string // date
  /**
   * Financial notes set against the tenancy
   */
  feeNotes?: string
  /**
   * The identifier of the legal status to set against the tenancy
   */
  legalStatusId?: string
  /**
   * Request body used to set the deposit of a tenancy
   */
  deposit?: {
    /**
     * The deposit holder (depositProtectionScheme/stakeholder/landlordsAgent/landlord/notApplicable)
     */
    heldBy?: string
    /**
     * The number of weeks or months rent collected as the deposit on the tenancy
     */
    period?: number // int32
    /**
     * The type of deposit (weeksRent/monthsRent/fixedSum/guarantee)
     */
    type?: string
    /**
     * The amount of deposit held
     */
    sum?: number // double
  }
  /**
   * Request body used to update letting fees on an existing tenancy
   */
  lettingFee?: {
    /**
     * The letting fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (upfront/upfrontOver2Months/monthly/quarterly/halfYearly/yearly/28days/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Request body used to update management fees on an existing tenancy
   */
  managementFee?: {
    /**
     * The management fee type (percentage/fixed)
     */
    type?: string
    /**
     * The fee amount
     */
    amount?: number // double
    /**
     * The frequency of when the fee is to be collected (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
  /**
   * App specific metadata to set against the tenancy
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to set a break clauses notice required details
 */
export interface UpdateTenancyNoticeRequiredModel {
  /**
   * The date a break clauses notice is required by
   * example:
   * 2019-08-14
   */
  date?: string // date
  /**
   * The number of months the notice is required before the break clause
   */
  beforeBreakMonths?: number // int32
}
/**
 * Request body used to update a tenancy renewal check
 * example:
 * [object Object]
 */
export interface UpdateTenancyRenewalCheckModel {
  /**
   * The status of the tenancy check (needed/notNeeded/arranging/completed)
   */
  status?: string
  /**
   * App specific metadata to set against the tenancy renewal check
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Request body used to update a tenancy renewal negotiation
 * example:
 * [object Object]
 */
export interface UpdateTenancyRenewalModel {
  /**
   * The proposed start date of the tenancy renewal
   * example:
   * 2019-08-14T12:30:02Z
   */
  startDate?: string // date-time
  /**
   * The proposed end date of the tenancy renewal
   * example:
   * 2019-08-14T12:30:02Z
   */
  endDate?: string // date-time
  /**
   * The unique identifier of the negotiator who is managing this tenancy renewal
   */
  negotiatorId?: string
  /**
   * The amount of rent required, returned in relation to the collection frequency
   */
  rent?: number // double
  /**
   * The rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
  /**
   * Request body used to update a tenancy renewals letting fee
   */
  lettingFee?: {
    /**
     * The letting fee type (fixed/perentage)
     */
    type?: string
    /**
     * The letting fee amount as a fixed price or percentage based on the `type`
     */
    amount?: number // double
    /**
     * The frequency at which the letting fee is required (monthly/quarterly/halfYearly/yearly/28days/upfront/upfrontOver2Months/other/notApplicable)
     */
    frequency?: string
  }
  /**
   * Request body used to update a tenancy renewals management fee
   */
  managementFee?: {
    /**
     * The mangement fee type (fixed/perentage)
     */
    type?: string
    /**
     * The mangement fee amount as a fixed price or percentage based on the `type`
     */
    amount?: number // double
    /**
     * The frequency at which the mangement fee is required (monthly/quarterly/halfYearly/yearly/28days/sameAsLettingFee)
     */
    frequency?: string
  }
}
/**
 * Request body used to update tenancy responsibility
 * example:
 * [object Object]
 */
export interface UpdateTenancyResponsibilityModel {
  /**
   * The responsible party (landlord/tenant)
   */
  appliesTo?: string
  /**
   * Request body used to set party agreements to a specific clause in a tenancy agreement
   */
  agreements?: {
    /**
     * A flag to determine if the landlord has agreed
     */
    landlord?: boolean
    /**
     * A flag to determine if the tenant has agreed
     */
    tenant?: boolean
  }
}
/**
 * Request body used to set the source of a new tenancy
 */
export interface UpdateTenancySourceModel {
  /**
   * The unique identifier of the source for the tenancy
   */
  id?: string
  /**
   * The source type (office/source)
   */
  type?: string
}
/**
 * Representation of property details specific to utilities
 */
export interface UpdateUtilityModel {
  /**
   * A flag denoting whether or not the property has gas connected
   */
  hasGas?: boolean
  /**
   * The unique identifier of the company supplying the gas to the property
   */
  gasCompanyId?: string
  /**
   * The gas meter point number
   */
  gasMeterPoint?: string
  /**
   * The unique identifier of the company supplying the electricity to the property
   */
  electricityCompanyId?: string
  /**
   * The electricity meter point number
   */
  electricityMeterPoint?: string
  /**
   * The unique identifier of the company supplying the water to the property
   */
  waterCompanyId?: string
  /**
   * The water meter point number
   */
  waterMeterPoint?: string
  /**
   * The unique identifier of the company supplying the telephone to the property
   */
  telephoneCompanyId?: string
  /**
   * The unique identifier of the company supplying the internet to the property
   */
  internetCompanyId?: string
  /**
   * The unique identifier of the company supplying the cable tv to the property
   */
  cableTvCompanyId?: string
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
   * Value indicating where hard copies of correspondence should be sent for the primary contact (property/contact)
   */
  correspondenceAddressType?: string
  /**
   * Representation of a vendor's source
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
 * Request body used to update a webhook subscription
 * example:
 * [object Object]
 */
export interface UpdateWebhookModel {
  /**
   * The url where the payload associated with the webhook should be sent to
   */
  url: string
  /**
   * A short description associated with the webhook (ie a friendly name or label)
   */
  description?: string
  /**
   * The identifiers of the topics the subscription is associated with
   */
  topicIds?: string[]
  /**
   * Flag denoting whether or not the webhook is active and ready to receive data
   */
  active?: boolean
  /**
   * Flag denoting whether or events that only contain changes to etags and/or modified dates are emitted
   * Pass true to disable emitting of these events
   */
  ignoreEtagOnlyChanges?: boolean
}
/**
 * Representation of a works order item
 * example:
 * [object Object]
 */
export interface UpdateWorksOrderItemModel {
  /**
   * The notes attached to the works order item
   */
  notes?: string
  /**
   * The party to be charged for the work being carried out (landlord/tenant)
   */
  chargeTo?: string
  /**
   * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
   */
  estimate?: number // double
  /**
   * The type of estimate supplied (agent/verbal/written)
   */
  estimateType?: string
  /**
   * The net cost of the work to be carried out
   */
  netAmount?: number // double
  /**
   * The cost of the vat associated with the work
   */
  vatAmount?: number // double
}
/**
 * Request body used to update an existing works order
 * example:
 * [object Object]
 */
export interface UpdateWorksOrderModel {
  /**
   * The unique identifier of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * The unique identifier of the property where the work is to be carried out
   */
  propertyId?: string
  /**
   * The unique identifier of the tenancy that the works order originated from
   */
  tenancyId?: string
  /**
   * The unique identifier of the negotiator that booked the works order
   */
  negotiatorId?: string
  /**
   * The unique id of the type of work that needs to be carried out
   */
  typeId?: string
  /**
   * The current status of the works order (pendingApproval/pendingQuote/raised/raisedToChase/landlordToComplete/complete/cancelled/quoteAccepted)
   */
  status?: string
  /**
   * A free text description of the work required
   */
  description?: string
  /**
   * The party requesting the work to be carried out (landlord/tenant/other)
   */
  reporter?: string
  /**
   * The priority level of the works order (low/medium/high)
   */
  priority?: string
  /**
   * The date when the works order was booked
   * example:
   * 2019-08-14
   */
  booked?: string // date
  /**
   * The date when the work is required to be completed by
   * example:
   * 2019-08-14
   */
  required?: string // date
  /**
   * The date when the work was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * App specific metadata to set against the works order
   */
  metadata?: {
    [name: string]: any
  }
}
/**
 * Representation of property details specific to utilities
 */
export interface UtilityModel {
  /**
   * A flag denoting whether or not the property has gas connected
   */
  hasGas?: boolean
  /**
   * The unique identifier of the company supplying the gas to the property
   */
  gasCompanyId?: string
  /**
   * The gas meter point number
   */
  gasMeterPoint?: string
  /**
   * The unique identifier of the company supplying the electricity to the property
   */
  electricityCompanyId?: string
  /**
   * The electricity meter point number
   */
  electricityMeterPoint?: string
  /**
   * The unique identifier of the company supplying the water to the property
   */
  waterCompanyId?: string
  /**
   * The water meter point number
   */
  waterMeterPoint?: string
  /**
   * The unique identifier of the company supplying the telephone to the property
   */
  telephoneCompanyId?: string
  /**
   * The unique identifier of the company supplying the internet to the property
   */
  internetCompanyId?: string
  /**
   * The unique identifier of the company supplying the cable tv to the property
   */
  cableTvCompanyId?: string
}
/**
 * Represents a one or more messages for fields that have failed a given validation action
 */
export interface ValidationErrorModel {
  statusCode?:
    | 100
    | 101
    | 102
    | 103
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 421
    | 422
    | 423
    | 424
    | 426
    | 428
    | 429
    | 431
    | 451
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 510
    | 511 // int32
  /**
   * The date and time that this error event occurred
   * example:
   * 2019-08-14T12:30:02Z
   */
  dateTime?: string // date-time
  /**
   * The detailed information regarding this error event
   */
  description?: string
  /**
   * Gets or sets the list of validation errors.
   */
  errors?: {
    /**
     * Gets the field that the message applies to
     */
    readonly field?: string
    /**
     * Gets the validation failure message to issue to the client
     */
    readonly message?: string
  }[]
}
/**
 * Model for validation failure
 */
export interface ValidationMessageModel {
  /**
   * Gets the field that the message applies to
   */
  readonly field?: string
  /**
   * Gets the validation failure message to issue to the client
   */
  readonly message?: string
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
   * The complete name of the contact or company
   */
  name?: string
  /**
   * The title of the contact (Available when 'type' is 'contact')
   */
  title?: string
  /**
   * The forename of the contact (Available when 'type' is 'contact')
   */
  forename?: string
  /**
   * The surname of the contact (Available when 'type' is 'contact')
   */
  surname?: string
  /**
   * The date of birth of the contact (Available when 'type' is 'contact')
   * example:
   * 2019-08-14
   */
  dateOfBirth?: string // date
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
   * Flag to determine if this role on the system is now archived
   */
  fromArchive?: boolean
  /**
   * Representation of the physical address of a building or premise
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
  /**
   * A collection of additional contact details
   */
  additionalContactDetails?: {
    /**
     * The type of contact detail
     */
    type?: string
    /**
     * The contact detail
     */
    value?: string
  }[]
}
/**
 * Representation of a relationship between a vendor and a contact or company
 */
export interface VendorContactRelationshipModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
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
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the relationship was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
}
export interface VendorContactRelationshipModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
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
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the relationship was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a vendor
 */
export interface VendorModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the vendor
   */
  id?: string
  /**
   * The date and time when the vendor was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the vendor was last modified
   * example:
   * 2019-08-14T12:30:02Z
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
   * The unique identifier of the solicitor associated to the vendor
   */
  solicitorId?: string
  /**
   * The unique identifier of the property associated to the vendor
   */
  propertyId?: string
  /**
   * Representation of a vendor's source
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
     * The complete name of the contact or company
     */
    name?: string
    /**
     * The title of the contact (Available when 'type' is 'contact')
     */
    title?: string
    /**
     * The forename of the contact (Available when 'type' is 'contact')
     */
    forename?: string
    /**
     * The surname of the contact (Available when 'type' is 'contact')
     */
    surname?: string
    /**
     * The date of birth of the contact (Available when 'type' is 'contact')
     * example:
     * 2019-08-14
     */
    dateOfBirth?: string // date
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
     * Flag to determine if this role on the system is now archived
     */
    fromArchive?: boolean
    /**
     * Representation of the physical address of a building or premise
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
    /**
     * A collection of additional contact details
     */
    additionalContactDetails?: {
      /**
       * The type of contact detail
       */
      type?: string
      /**
       * The contact detail
       */
      value?: string
    }[]
  }[]
  /**
   * Value indicating where hard copies of correspondence should be sent for the primary contact (property/contact).
   * When set to contact, any correspondence should be sent to the related contact's address, rather than the property address
   */
  correspondenceAddressType?: string
  /**
   * The unique identifier of the negotiator attached to the vendor. The first item in the collection is considered the primary negotiator
   */
  negotiatorId?: string
  /**
   * A collection of unique identifiers of offices attached to the vendor. The first item in the collection is considered the primary office
   */
  officeIds?: string[]
  /**
   * The date and time the vendor was archived
   * example:
   * 2019-08-14T12:30:02Z
   */
  archivedOn?: string // date-time
  /**
   * A flag determining whether or not the vendor is archived
   */
  fromArchive?: boolean
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
}
export interface VendorModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the vendor
     */
    id?: string
    /**
     * The date and time when the vendor was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the vendor was last modified
     * example:
     * 2019-08-14T12:30:02Z
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
     * The unique identifier of the solicitor associated to the vendor
     */
    solicitorId?: string
    /**
     * The unique identifier of the property associated to the vendor
     */
    propertyId?: string
    /**
     * Representation of a vendor's source
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
       * The complete name of the contact or company
       */
      name?: string
      /**
       * The title of the contact (Available when 'type' is 'contact')
       */
      title?: string
      /**
       * The forename of the contact (Available when 'type' is 'contact')
       */
      forename?: string
      /**
       * The surname of the contact (Available when 'type' is 'contact')
       */
      surname?: string
      /**
       * The date of birth of the contact (Available when 'type' is 'contact')
       * example:
       * 2019-08-14
       */
      dateOfBirth?: string // date
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
       * Flag to determine if this role on the system is now archived
       */
      fromArchive?: boolean
      /**
       * Representation of the physical address of a building or premise
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
      /**
       * A collection of additional contact details
       */
      additionalContactDetails?: {
        /**
         * The type of contact detail
         */
        type?: string
        /**
         * The contact detail
         */
        value?: string
      }[]
    }[]
    /**
     * Value indicating where hard copies of correspondence should be sent for the primary contact (property/contact).
     * When set to contact, any correspondence should be sent to the related contact's address, rather than the property address
     */
    correspondenceAddressType?: string
    /**
     * The unique identifier of the negotiator attached to the vendor. The first item in the collection is considered the primary negotiator
     */
    negotiatorId?: string
    /**
     * A collection of unique identifiers of offices attached to the vendor. The first item in the collection is considered the primary office
     */
    officeIds?: string[]
    /**
     * The date and time the vendor was archived
     * example:
     * 2019-08-14T12:30:02Z
     */
    archivedOn?: string // date-time
    /**
     * A flag determining whether or not the vendor is archived
     */
    fromArchive?: boolean
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
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
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('negotiator' | 'offices' | 'property' | 'sellingReason' | 'solicitor' | 'source' | 'type')[]
  id?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  email?: string[]
  fromArchive?: boolean
  address?: string
  name?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  lastCallFrom?: string
  lastCallTo?: string
  nextCallFrom?: string
  nextCallTo?: string
  metadata?: string[]
}
/**
 * Representation of a webhook subscription
 */
export interface WebhookModel {
  /**
   * The unique identifier of the webhook
   */
  id?: string // uuid
  /**
   * The date and time when the webhook was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the webhook was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The url where the payload associated with the webhook should be sent to
   */
  url?: string
  /**
   * A short description associated with the webhook (ie a friendly name or label)
   */
  description?: string
  /**
   * The identifiers of the topics the webhook is associated with
   */
  topicIds?: string[]
  /**
   * Flag denoting whether or not the webhook is active and ready to receive data
   */
  active?: boolean
  /**
   * Flag denoting whether or events that only contain changes to etags and/or modified dates are emitted
   */
  ignoreEtagOnlyChanges?: boolean
}
export interface WebhookModelPagedResult {
  _embedded?: {
    /**
     * The unique identifier of the webhook
     */
    id?: string // uuid
    /**
     * The date and time when the webhook was created
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    created?: string // date-time
    /**
     * The date and time when the webhook was last modified
     * example:
     * 2019-08-14T12:30:02.0000000Z
     */
    modified?: string // date-time
    /**
     * The url where the payload associated with the webhook should be sent to
     */
    url?: string
    /**
     * A short description associated with the webhook (ie a friendly name or label)
     */
    description?: string
    /**
     * The identifiers of the topics the webhook is associated with
     */
    topicIds?: string[]
    /**
     * Flag denoting whether or not the webhook is active and ready to receive data
     */
    active?: boolean
    /**
     * Flag denoting whether or events that only contain changes to etags and/or modified dates are emitted
     */
    ignoreEtagOnlyChanges?: boolean
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a works order item
 */
export interface WorksOrderItemModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the works order item
   */
  id?: string
  /**
   * The unique identifier of the parent works order
   */
  worksOrderId?: string
  /**
   * The date and time when the works order item was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the works order item was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The notes attached to the works order item
   */
  notes?: string
  /**
   * The party to be charged for the work being carried out (landlord/tenant)
   */
  chargeTo?: string
  /**
   * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
   */
  estimate?: number // double
  /**
   * The type of estimate supplied (agent/verbal/written)
   */
  estimateType?: string
  /**
   * The net cost of the work to be carried out
   */
  netAmount?: number // double
  /**
   * The additional vat cost for the work to be carried out
   */
  vatAmount?: number // double
  /**
   * The gross cost of the work to be carried out
   */
  grossAmount?: number // double
  /**
   * The unique identifier of the nominal account the works order financial transactions are allocated to
   */
  nominalAccountId?: string
  /**
   * The ETag for the current version of the works order item. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface WorksOrderItemModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the works order item
     */
    id?: string
    /**
     * The unique identifier of the parent works order
     */
    worksOrderId?: string
    /**
     * The date and time when the works order item was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the works order item was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The notes attached to the works order item
     */
    notes?: string
    /**
     * The party to be charged for the work being carried out (landlord/tenant)
     */
    chargeTo?: string
    /**
     * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
     */
    estimate?: number // double
    /**
     * The type of estimate supplied (agent/verbal/written)
     */
    estimateType?: string
    /**
     * The net cost of the work to be carried out
     */
    netAmount?: number // double
    /**
     * The additional vat cost for the work to be carried out
     */
    vatAmount?: number // double
    /**
     * The gross cost of the work to be carried out
     */
    grossAmount?: number // double
    /**
     * The unique identifier of the nominal account the works order financial transactions are allocated to
     */
    nominalAccountId?: string
    /**
     * The ETag for the current version of the works order item. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
/**
 * Representation of a works order
 */
export interface WorksOrderModel {
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: any
  }
  /**
   * The unique identifier of the works order
   */
  id?: string
  /**
   * The date and time when the works order was created
   * example:
   * 2019-08-14T12:30:02Z
   */
  created?: string // date-time
  /**
   * The date and time when the works order was last modified
   * example:
   * 2019-08-14T12:30:02Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * The unique identifier of the property where the work is to be carried out
   */
  propertyId?: string
  /**
   * The unique identifier of the tenancy that the works order originated from
   */
  tenancyId?: string
  /**
   * The unique identifier of the negotiator that booked the works order
   */
  negotiatorId?: string
  /**
   * The unique identifier of the type of work that needs to be carried out
   */
  typeId?: string
  /**
   * The current status of the works order (pendingApproval/pendingQuote/raised/raisedToChase/landlordToComplete/complete/cancelled/quoteAccepted)
   */
  status?: string
  /**
   * A free text description of the work required
   */
  description?: string
  /**
   * The party requesting the work to be carried out (landlord/tenant/other)
   */
  reporter?: string
  /**
   * The priority level of the works order (low/medium/high)
   */
  priority?: string
  /**
   * The date when the works order was booked
   * example:
   * 2019-08-14
   */
  booked?: string // date
  /**
   * The date when the work is required to be completed by
   * example:
   * 2019-08-14
   */
  required?: string // date
  /**
   * The date when the work was completed
   * example:
   * 2019-08-14
   */
  completed?: string // date
  /**
   * The total net cost for all of the items of work to be carried out
   */
  totalNetAmount?: number // double
  /**
   * The total additional vat cost for all of the items of work to be carried out
   */
  totalVatAmount?: number // double
  /**
   * The total gross cost for all of the items of work to be carried out
   */
  totalGrossAmount?: number // double
  /**
   * A collection of jobs/items of work that the works order should fulfill
   */
  items?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the works order item
     */
    id?: string
    /**
     * The unique identifier of the parent works order
     */
    worksOrderId?: string
    /**
     * The date and time when the works order item was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the works order item was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The notes attached to the works order item
     */
    notes?: string
    /**
     * The party to be charged for the work being carried out (landlord/tenant)
     */
    chargeTo?: string
    /**
     * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
     */
    estimate?: number // double
    /**
     * The type of estimate supplied (agent/verbal/written)
     */
    estimateType?: string
    /**
     * The net cost of the work to be carried out
     */
    netAmount?: number // double
    /**
     * The additional vat cost for the work to be carried out
     */
    vatAmount?: number // double
    /**
     * The gross cost of the work to be carried out
     */
    grossAmount?: number // double
    /**
     * The unique identifier of the nominal account the works order financial transactions are allocated to
     */
    nominalAccountId?: string
    /**
     * The ETag for the current version of the works order item. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  /**
   * App specific metadata that has been set against the works order
   */
  metadata?: {
    [name: string]: any
  }
  /**
   * The requested extras fields
   */
  extrasField?: {
    [name: string]: any
  }
  /**
   * The ETag for the current version of the works order. Used for managing update concurrency
   */
  readonly _eTag?: string
}
export interface WorksOrderModelPagedResult {
  _embedded?: {
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: any
    }
    /**
     * The unique identifier of the works order
     */
    id?: string
    /**
     * The date and time when the works order was created
     * example:
     * 2019-08-14T12:30:02Z
     */
    created?: string // date-time
    /**
     * The date and time when the works order was last modified
     * example:
     * 2019-08-14T12:30:02Z
     */
    modified?: string // date-time
    /**
     * The unique identifier of the company that has been selected to perform the work
     */
    companyId?: string
    /**
     * The unique identifier of the property where the work is to be carried out
     */
    propertyId?: string
    /**
     * The unique identifier of the tenancy that the works order originated from
     */
    tenancyId?: string
    /**
     * The unique identifier of the negotiator that booked the works order
     */
    negotiatorId?: string
    /**
     * The unique identifier of the type of work that needs to be carried out
     */
    typeId?: string
    /**
     * The current status of the works order (pendingApproval/pendingQuote/raised/raisedToChase/landlordToComplete/complete/cancelled/quoteAccepted)
     */
    status?: string
    /**
     * A free text description of the work required
     */
    description?: string
    /**
     * The party requesting the work to be carried out (landlord/tenant/other)
     */
    reporter?: string
    /**
     * The priority level of the works order (low/medium/high)
     */
    priority?: string
    /**
     * The date when the works order was booked
     * example:
     * 2019-08-14
     */
    booked?: string // date
    /**
     * The date when the work is required to be completed by
     * example:
     * 2019-08-14
     */
    required?: string // date
    /**
     * The date when the work was completed
     * example:
     * 2019-08-14
     */
    completed?: string // date
    /**
     * The total net cost for all of the items of work to be carried out
     */
    totalNetAmount?: number // double
    /**
     * The total additional vat cost for all of the items of work to be carried out
     */
    totalVatAmount?: number // double
    /**
     * The total gross cost for all of the items of work to be carried out
     */
    totalGrossAmount?: number // double
    /**
     * A collection of jobs/items of work that the works order should fulfill
     */
    items?: {
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: any
      }
      /**
       * The unique identifier of the works order item
       */
      id?: string
      /**
       * The unique identifier of the parent works order
       */
      worksOrderId?: string
      /**
       * The date and time when the works order item was created
       * example:
       * 2019-08-14T12:30:02Z
       */
      created?: string // date-time
      /**
       * The date and time when the works order item was last modified
       * example:
       * 2019-08-14T12:30:02Z
       */
      modified?: string // date-time
      /**
       * The notes attached to the works order item
       */
      notes?: string
      /**
       * The party to be charged for the work being carried out (landlord/tenant)
       */
      chargeTo?: string
      /**
       * The estimate of any costs associated with the work being carried out given to the party to be charged for the work
       */
      estimate?: number // double
      /**
       * The type of estimate supplied (agent/verbal/written)
       */
      estimateType?: string
      /**
       * The net cost of the work to be carried out
       */
      netAmount?: number // double
      /**
       * The additional vat cost for the work to be carried out
       */
      vatAmount?: number // double
      /**
       * The gross cost of the work to be carried out
       */
      grossAmount?: number // double
      /**
       * The unique identifier of the nominal account the works order financial transactions are allocated to
       */
      nominalAccountId?: string
      /**
       * The ETag for the current version of the works order item. Used for managing update concurrency
       */
      readonly _eTag?: string
    }[]
    /**
     * App specific metadata that has been set against the works order
     */
    metadata?: {
      [name: string]: any
    }
    /**
     * The requested extras fields
     */
    extrasField?: {
      [name: string]: any
    }
    /**
     * The ETag for the current version of the works order. Used for managing update concurrency
     */
    readonly _eTag?: string
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
export interface WorksOrders {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('company' | 'documents' | 'negotiator' | 'property' | 'tenancy' | 'type')[]
  id?: string[]
  companyId?: string[]
  negotiatorId?: string[]
  propertyId?: string[]
  status?: (
    | 'pendingApproval'
    | 'pendingQuote'
    | 'raised'
    | 'raisedToChase'
    | 'landlordToComplete'
    | 'complete'
    | 'cancelled'
    | 'quoteAccepted'
  )[]
  tenancyId?: string[]
  typeId?: string[]
  extrasField?: string[]
  completedFrom?: string
  completedTo?: string
  createdFrom?: string
  createdTo?: string
  modifiedFrom?: string
  modifiedTo?: string
  requiredFrom?: string
  requiredTo?: string
  metadata?: string[]
}
