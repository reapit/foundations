/**
 * Model representing the physical address of a building or premise
 */
export interface ApplicantContactAddressModel {
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface ApplicantContactCommunicationModel {
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
 * Model representing the details of a contact relationship associated with an applicant entity
 */
export interface ApplicantContactRelationshipModel {
  /**
   * Gets the unique identifier of the contact
   */
  id?: string
  /**
   * Gets the name of this contact or company
   */
  name?: string
  /**
   * Gets the type of this contact (Company/Contact)
   */
  type?: string
  /**
   * Gets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * A model to represent the external area of a property that an applicant is looking for
 */
export interface ApplicantExternalAreaModel {
  /**
   * Gets the unit of area that amounts correspond to (acres/hectares)
   */
  type?: string
  /**
   * Gets the minimum external area unit that an applicant is looking for
   */
  amountFrom?: number // double
  /**
   * Gets the maximum external area unit that an applicant is looking for
   */
  amountTo?: number // double
}
/**
 * A model to represent the internal area of a property that an applicant is looking for
 */
export interface ApplicantInternalAreaModel {
  /**
   * Gets the unit of area that amounts correspond to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * Gets the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
   */
  amount?: number // double
}
/**
 * Model to represent the applicant requirement details specific to lettings marketing
 */
export interface ApplicantLettingModel {
  /**
   * Gets the date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * Gets the applicant's preferred letting term
   */
  term?: string
  /**
   * Gets the applicant's minimum rent requirement
   */
  rentFrom?: number // double
  /**
   * Gets the applicant's maximum rent requirement
   */
  rentTo?: number // double
  /**
   * Gets the rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
}
/**
 * Model representing an Applicant
 */
export interface ApplicantModel {
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
   * Gets the marketing mode relating to the buyer (buying / renting)
   */
  marketingMode?: string
  /**
   * Gets the currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * Gets a flag determining whether or not the applicant is actively looking for property
   */
  active?: boolean
  /**
   * Gets the applicant requirement notes
   */
  notes?: string
  /**
   * Gets the date and time that the applicant was last contacted
   */
  lastCall?: string // date-time
  /**
   * Gets the date and time that the applicant is next due to be contacted
   */
  nextCall?: string // date-time
  /**
   * Gets the id of the department that the applicant requirements are associated with
   */
  departmentId?: string
  /**
   * Gets the unique idenfitier of the applicants solicitor
   */
  solicitorId?: string
  /**
   * Gets the property type requirements
   */
  type?: string[]
  /**
   * Gets the property style requirements
   */
  style?: string[]
  /**
   * Gets the property situation requirements
   */
  situation?: string[]
  /**
   * Gets the property parking requirements
   */
  parking?: string[]
  /**
   * Gets the property age requirements
   */
  age?: string[]
  /**
   * Gets the property locality requirements
   */
  locality?: string[]
  /**
   * Gets the property furnishing requirements
   */
  furnishing?: string[]
  /**
   * Gets the minimum number of bedrooms the applicant requires
   */
  bedroomsMin?: number // int32
  /**
   * Gets the maximum number of bedrooms the applicant requires
   */
  bedroomsMax?: number // int32
  /**
   * Gets the minimum number of reception rooms the applicant requires
   */
  receptionsMin?: number // int32
  /**
   * Gets the maximum number of reception rooms the applicant requires
   */
  receptionsMax?: number // int32
  /**
   * Gets the minimum number of bathrooms the applicant requires
   */
  bathroomsMin?: number // int32
  /**
   * Gets the maximum number of bathrooms the applicant requires
   */
  bathroomsMax?: number // int32
  /**
   * Gets the sales specific requirements, if the applicant is looking to buy
   */
  selling?: {
    /**
     * Gets the applicant's minimum price requirement
     */
    priceFrom?: number // int32
    /**
     * Gets the applicant's maximum price requirement
     */
    priceTo?: number // int32
  }
  /**
   * Gets the letting specific requirements, if the applicant is looking to rent
   */
  letting?: {
    /**
     * Gets the date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * Gets the applicant's preferred letting term
     */
    term?: string
    /**
     * Gets the applicant's minimum rent requirement
     */
    rentFrom?: number // double
    /**
     * Gets the applicant's maximum rent requirement
     */
    rentTo?: number // double
    /**
     * Gets the rent collection frequency (weekly/monthly/annually)
     */
    rentFrequency?: string
  }
  /**
   * Gets the applicant's external area requirements
   */
  externalArea?: {
    /**
     * Gets the unit of area that amounts correspond to (acres/hectares)
     */
    type?: string
    /**
     * Gets the minimum external area unit that an applicant is looking for
     */
    amountFrom?: number // double
    /**
     * Gets the maximum external area unit that an applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * Gets the applicant's internal area requirements
   */
  internalArea?: {
    /**
     * Gets the unit of area that amounts correspond to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * Gets the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
     */
    amount?: number // double
  }
  /**
   * Gets the collection of office ids that are related to this applicant
   */
  officeIds?: string[]
  /**
   * Gets the collection of negotiator ids that are related to this applicant
   */
  negotiatorIds?: string[]
  /**
   * Gets a collection of contact entities attached to this applicant
   * The primary contact will always appear first in the collection
   */
  contacts?: {
    /**
     * Gets the unique identifier of the contact
     */
    id?: string
    /**
     * Gets the name of this contact or company
     */
    name?: string
    /**
     * Gets the type of this contact (Company/Contact)
     */
    type?: string
    /**
     * Gets a collection of the contacts communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
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
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this applicant
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model to represent the applicant requirement details specific to sales marketing
 */
export interface ApplicantSellingModel {
  /**
   * Gets the applicant's minimum price requirement
   */
  priceFrom?: number // int32
  /**
   * Gets the applicant's maximum price requirement
   */
  priceTo?: number // int32
}
/**
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface AppointmentAttendeeCommunicationModel {
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
 * Model representing an appointment attendee
 */
export interface AppointmentAttendeeModel {
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
  communicationDetails?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model representing appointment follow up data
 */
export interface AppointmentFollowUpModel {
  /**
   * Gets the unique identifier of the appointment this follow up relates to
   */
  appointmentId?: string
  /**
   * Gets the unique identifier of a pre-defined follow up response type
   */
  responseId?: string
  /**
   * Gets the internal follow up notes to be stored against the appointment
   */
  notes?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
   * Gets the date that the appointment should be followed up on
   */
  followUpOn?: string // date-time
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
  property?: {
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
      /**
       * Gets the geolocation of the address
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
  }
  /**
   * Gets a collection of attendees who are requested to attend the appointment
   */
  attendees?: {
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
    communicationDetails?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this appointment
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model representing the physical address of a building or premise
 */
export interface AppointmentPropertyAddressModel {
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
 * Model representing the geographical location of an address using coordinates
 */
export interface AppointmentPropertyGeolocationModel {
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
 * Model representing an appointment property
 */
export interface AppointmentPropertyModel {
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
    /**
     * Gets the geolocation of the address
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface CompanyCommunicationModel {
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
   * Gets a collection of the company communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
   * Gets the collection of office ids that are related to this company
   */
  officeIds?: string[]
  /**
   * Gets the collection of negotiator ids that are related to this company
   */
  negotiatorIds?: string[]
  /**
   * Gets a listing of additional metadata that has been set against this company
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface ContactCommunicationModel {
  /**
   * Gets the label representing the type of detail (eg. mobile, email address)
   */
  label?: string
  /**
   * Gets the communication detail (eg. 07999 876543, developers@reapit.com)
   */
  detail?: string
}
/**
 * Represents an attempt to verify an individual contacts identity
 */
export interface ContactIdentityCheckModel {
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
   * Gets the details of the documents that have been provided for this identity check
   */
  documents?: {
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
    /**
     * Gets the location of the physical file that relates to this document (eg. scan of driving license)
     */
    fileUrl?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this identity check
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Represents the details of a document added to an identity check
 */
export interface ContactIdentityDocumentModel {
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
  /**
   * Gets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
   * Gets a collection of the contacts communication details
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg. mobile, email address)
     */
    label?: string
    /**
     * Gets the communication detail (eg. 07999 876543, developers@reapit.com)
     */
    detail?: string
  }[]
  /**
   * Gets a collection of addresses (maximum 3) that this contact has been associated to
   */
  addresses?: {
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
  }[]
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
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * A model used to create a new relationship between an applicant and contact or company
 */
export interface CreateApplicantContactRelationshipModel {
  /**
   * Sets the entity id to create a relationship with. (Contact or Company)
   */
  id?: string
  /**
   * Sets the entity type to create a relationship with. (Contact/Company)
   */
  type?: string
}
/**
 * Model to set the external area requirements on a new applicant
 */
export interface CreateApplicantExternalAreaModel {
  /**
   * Sets the unit of area that amounts correspond to (acres/hectares)
   */
  type?: string
  /**
   * Sets the minimum external area unit that an applicant is looking for
   */
  amountFrom?: number // double
  /**
   * Sets the maximum external area unit that an applicant is looking for
   */
  amountTo?: number // double
}
/**
 * Model to set the internal area requirements on a new applicant
 */
export interface CreateApplicantInternalAreaModel {
  /**
   * Sets the unit of area that amounts correspond to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * GeSetsts the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
   */
  amount?: number // double
}
/**
 * Model to represent the applicant requirement details specific to lettings marketing when creating a new applicant
 */
export interface CreateApplicantLettingModel {
  /**
   * Sets the date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * Sets the applicant's preferred letting term
   */
  term?: string
  /**
   * Sets the applicant's minimum rent requirement
   */
  rentFrom?: number // double
  /**
   * Sets the applicant's maximum rent requirement
   */
  rentTo?: number // double
  /**
   * Sets the rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
}
/**
 * Model used to create a new applicant
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
   * Sets the applicants furnishing requirements
   */
  furnishing?: string[]
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
   * Sets the sales specific requirements, if the applicant is looking to buy
   */
  selling?: {
    /**
     * Sets the applicant's minimum price requirement
     */
    priceFrom?: number // int32
    /**
     * Sets the applicant's maximum price requirement
     */
    priceTo?: number // int32
  }
  /**
   * Sets the letting specific requirements, if the applicant is looking to rent
   */
  letting?: {
    /**
     * Sets the date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * Sets the applicant's preferred letting term
     */
    term?: string
    /**
     * Sets the applicant's minimum rent requirement
     */
    rentFrom?: number // double
    /**
     * Sets the applicant's maximum rent requirement
     */
    rentTo?: number // double
    /**
     * Sets the rent collection frequency (weekly/monthly/annually)
     */
    rentFrequency?: string
  }
  /**
   * Sets the applicant's external area requirements
   */
  externalArea?: {
    /**
     * Sets the unit of area that amounts correspond to (acres/hectares)
     */
    type?: string
    /**
     * Sets the minimum external area unit that an applicant is looking for
     */
    amountFrom?: number // double
    /**
     * Sets the maximum external area unit that an applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * Sets the applicant's internal area requirements
   */
  internalArea?: {
    /**
     * Sets the unit of area that amounts correspond to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * GeSetsts the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
     */
    amount?: number // double
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
   * Sets the collection of new or existing contact entities the
   * should be attached to the new applicant
   */
  contacts?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    id?: string
    /**
     * Sets the entity type to create a relationship with. (Contact/Company)
     */
    type?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this applicant as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to represent the applicant requirement details specific to sales marketing when creating a new applicant
 */
export interface CreateApplicantSellingModel {
  /**
   * Sets the applicant's minimum price requirement
   */
  priceFrom?: number // int32
  /**
   * Sets the applicant's maximum price requirement
   */
  priceTo?: number // int32
}
/**
 * Model to associate an attendee to a new appointment
 */
export interface CreateAppointmentAttendeeModel {
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
   * Sets the date that the appointment should be followed up on
   */
  followUpOn?: string // date-time
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
  attendees?: {
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
  }[]
  /**
   * Sets the recurrence pattern for this appointment
   */
  recurrence?: {
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
   * Sets a JSON fragment to attach to this appointment as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to set the recurrence details of a new appointment
 */
export interface CreateAppointmentRecurrenceModel {
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
 * Model to create a communication detail for a company (eg. an email address)
 */
export interface CreateCompanyCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to create a company
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
   * Sets a collection of the companies communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
   * Sets a collection of office ids that are related to this company
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this company
   */
  negotiatorIds?: string[]
  /**
   * Sets a JSON fragment to attach to this company as metadata
   */
  metadata?: {
    [name: string]: {}
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
 * Model to create a communication detail for a contact (eg. an email address)
 */
export interface CreateContactCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to create an identity check
 */
export interface CreateContactIdentityCheckModel {
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
   * Sets the details of the documents that have been provided for this identity check
   */
  documents?: {
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
     * Sets the location of the physical file that relates to this document (eg. scan of driving license)
     */
    fileUrl?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to create an identity check document
 */
export interface CreateContactIdentityDocumentModel {
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
   * Sets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
}
/**
 * Model to create a new contact record
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
   * Sets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Sets a collection of office ids that are related to this contact
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this contact
   */
  negotiatorIds?: string[]
  /**
   * Sets a collection of addresses that this contact has been associated to
   * A maximum of three addresses can be associated to a contact
   */
  addresses?: {
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
  }[]
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model used for creating a new document
 */
export interface CreateDocumentModel {
  /**
   * Sets the type of entity that this document is owned by
   */
  ownerType?: string
  /**
   * Sets the Id of the entity that this document is owned by
   */
  ownerId?: string
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
  data?: string
}
/**
 * A model used to create a new relationship between a landlord and an existing contact
 */
export interface CreateLandlordContactRelationshipModel {
  /**
   * Sets the entity id to create a relationship with. (Contact or Company)
   */
  id?: string
  /**
   * Sets the entity type to create a relationship with. (Contact or Company)
   */
  type?: string
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
   * Sets the collection of new or existing contact entities the
   * should be attached to the new landlord
   */
  contacts?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    id?: string
    /**
     * Sets the entity type to create a relationship with. (Contact or Company)
     */
    type?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this landlord as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to create a communication details (eg. an email address)
 */
export interface CreateNegotiatorCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the communication detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to create an negotiator
 */
export interface CreateNegotiatorModel {
  /**
   * Sets the unique identifier of the negotiator
   */
  id?: string
  /**
   * Sets the unique identifier of the office related to the negotiator
   */
  officeId?: string
  /**
   * Sets the name of the negotiator
   */
  name?: string
  /**
   * Sets the job title of the negotiator
   */
  jobTitle?: string
  /**
   * Sets the active flag for a negotiator
   */
  active?: boolean
  /**
   * Sets a collection of the negotiator communication details
   * Eg. Email address, mobile number, landline
   */
  communicationDetails?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the communication detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this negotiator as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to create an offer
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
    [name: string]: {}
  }
}
/**
 * Model to create an office address
 */
export interface CreateOfficeAddressModel {
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
 * Model to create a communication details (eg. an email address)
 */
export interface CreateOfficeCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the communication detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to create an office
 */
export interface CreateOfficeModel {
  /**
   * Sets the unique identifier of the office
   */
  id?: string
  /**
   * Sets the name of the office
   */
  name?: string
  /**
   * Sets the manager of the office
   */
  manager?: string
  /**
   * Sets the address of the office
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
   * Sets a collection of the office communication details
   * Eg. Email address, mobile number, landline
   */
  communicationDetails?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the communication detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this office as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
export interface CreatePropertyAddressModel {
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
  /**
   * Sets the geolocation of the address
   */
  geolocation?: {
    /**
     * Sets the latitude coordinate of the coordinate pair
     */
    latitude?: number // double
    /**
     * Sets the longitude coordinate of the coordinate pair
     */
    longitude?: number // double
  }
}
export interface CreatePropertyEpcModel {
  /**
   * Sets whether this property is exempt from requiring an EPC
   */
  exempt?: boolean
  /**
   * Sets the current energy efficienty rating
   */
  eer?: number // int32
  /**
   * Sets the potential energy efficienty rating
   */
  eerPotential?: number // int32
  /**
   * Sets the current environmental impact rating
   */
  eir?: number // int32
  /**
   * Sets the potential environmental impact rating
   */
  eirPotential?: number // int32
}
export interface CreatePropertyExternalAreaModel {
  /**
   * Sets the unit of area (acres/hectares)
   */
  type?: string
  /**
   * Sets the minimum area bound
   */
  min?: number // double
  /**
   * Sets the maximum area bound
   */
  max?: number // double
}
export interface CreatePropertyGeolocationModel {
  /**
   * Sets the latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * Sets the longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
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
export interface CreatePropertyInternalAreaModel {
  /**
   * Sets the unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * Sets the minimum area bound
   */
  min?: number // double
  /**
   * Sets the maximum area bound
   */
  max?: number // double
}
export interface CreatePropertyLettingModel {
  /**
   * Sets the date that the property was flagged as for let
   */
  instructed?: string // date-time
  /**
   * Sets the date this property is next available from
   */
  availableFrom?: string // date-time
  /**
   * Sets the date this property is available to
   */
  availableTo?: string // date-time
  /**
   * Sets the monetary amount required to rent this property
   */
  rent?: number // double
  /**
   * Sets the rent collection frequency (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * Sets the acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * Sets the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
}
/**
 * A model used to create a new property
 */
export interface CreatePropertyModel {
  /**
   * Sets the marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode?: string
  /**
   * Sets the department id which defines a specific property's acceptable values for type, style, situation, parking, age and locality
   */
  departmentId?: string
  /**
   * Sets the strapline description
   */
  strapline?: string
  /**
   * Sets the brief description
   */
  description?: string
  /**
   * Sets the summary of accommodation
   */
  summary?: string
  /**
   * Sets the address of the property
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
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
    /**
     * Sets the geolocation of the address
     */
    geolocation?: {
      /**
       * Sets the latitude coordinate of the coordinate pair
       */
      latitude?: number // double
      /**
       * Sets the longitude coordinate of the coordinate pair
       */
      longitude?: number // double
    }
  }
  /**
   * Sets the number of bedrooms
   */
  bedrooms?: number // int32
  /**
   * Sets the number of reception rooms
   */
  receptions?: number // int32
  /**
   * Sets the number of bathrooms
   */
  bathrooms?: number // int32
  /**
   * Sets the council tax banding (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * Sets a value indicating whether this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * Sets details of the EPC statistics
   */
  epc?: {
    /**
     * Sets whether this property is exempt from requiring an EPC
     */
    exempt?: boolean
    /**
     * Sets the current energy efficienty rating
     */
    eer?: number // int32
    /**
     * Sets the potential energy efficienty rating
     */
    eerPotential?: number // int32
    /**
     * Sets the current environmental impact rating
     */
    eir?: number // int32
    /**
     * Sets the potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Sets the external area
   */
  externalArea?: {
    /**
     * Sets the unit of area (acres/hectares)
     */
    type?: string
    /**
     * Sets the minimum area bound
     */
    min?: number // double
    /**
     * Sets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * Sets the unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * Sets the minimum area bound
     */
    min?: number // double
    /**
     * Sets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Sets the sales specific details of the property
   */
  selling?: {
    /**
     * Sets the date that the property was flagged as for sale
     */
    instructed?: string // date-time
    /**
     * Sets the asking price of the property
     */
    price?: number // int32
    /**
     * Sets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * Sets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Sets details of the sales tenure of the property
     */
    tenure?: {
      /**
       * Sets the type of tenure that applies to this property
       */
      type?: string
      /**
       * Sets tenure expiration date
       */
      expiry?: string // date-time
    }
  }
  /**
   * Sets the letting specific details of the property
   */
  letting?: {
    /**
     * Sets the date that the property was flagged as for let
     */
    instructed?: string // date-time
    /**
     * Sets the date this property is next available from
     */
    availableFrom?: string // date-time
    /**
     * Sets the date this property is available to
     */
    availableTo?: string // date-time
    /**
     * Sets the monetary amount required to rent this property
     */
    rent?: number // double
    /**
     * Sets the rent collection frequency (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * Sets the acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * Sets the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
  }
  /**
   * Sets the property types
   */
  type?: string[]
  /**
   * Sets the property style
   */
  style?: string[]
  /**
   * Sets the property situation
   */
  situation?: string[]
  /**
   * Sets the property parking
   */
  parking?: string[]
  /**
   * Sets the property age
   */
  age?: string[]
  /**
   * Sets the property locality
   */
  locality?: string[]
  /**
   * Sets the listing of room details
   */
  rooms?: {
    name?: string
    dimensions?: string
    description?: string
  }[]
  /**
   * Sets the properties negotiatior id
   */
  negotiatorId?: string
  /**
   * Sets the properties office ids
   */
  officeIds?: string[]
  /**
   * Sets a JSON fragment to attach to this property as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
export interface CreatePropertyRoomModel {
  name?: string
  dimensions?: string
  description?: string
}
export interface CreatePropertySellingModel {
  /**
   * Sets the date that the property was flagged as for sale
   */
  instructed?: string // date-time
  /**
   * Sets the asking price of the property
   */
  price?: number // int32
  /**
   * Sets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * Sets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Sets details of the sales tenure of the property
   */
  tenure?: {
    /**
     * Sets the type of tenure that applies to this property
     */
    type?: string
    /**
     * Sets tenure expiration date
     */
    expiry?: string // date-time
  }
}
export interface CreatePropertyTenureModel {
  /**
   * Sets the type of tenure that applies to this property
   */
  type?: string
  /**
   * Sets tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Model to create a tasks recipient
 */
export interface CreateRecipientModel {
  /**
   * Unique identifier of the tasks recipient
   */
  id?: string
  /**
   * Entity type of the recipient (office/negotiator)
   */
  type?: string
}
/**
 * Model used to create a new task
 */
export interface CreateTaskModel {
  /**
   * Sets the date the task will be activated
   */
  activates?: string // date-time
  /**
   * Sets the date the task will be completed
   */
  completed?: string // date-time
  /**
   * Sets the type of task to create
   */
  typeId?: string
  /**
   * Sets the unique identifier of the negotiator whos creating the task
   */
  senderId?: string
  /**
   * Sets the text against the task or message
   */
  text?: string
  /**
   * Sets the unique identifier of the landlord the task is related too
   */
  landlordId?: string
  /**
   * Sets the unique identifier of the property the task is related too
   */
  propertyId?: string
  /**
   * Sets the unique identifier of the applicant the task is related too
   */
  applicantId?: string
  /**
   * Sets the unique identifier of the tenancy the task is related too
   */
  tenancyId?: string
  /**
   * Sets the unique identifier of the contact the task is related too
   */
  contactId?: string
  /**
   * Sets the recipient to create against this task
   */
  recipient?: {
    /**
     * Unique identifier of the tasks recipient
     */
    id?: string
    /**
     * Entity type of the recipient (office/negotiator)
     */
    type?: string
  }
  /**
   * Sets a JSON fragment to attach to this task as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * A model used to create a new relationship between a vendor and an existing contact
 */
export interface CreateVendorContactRelationshipModel {
  /**
   * Sets the entity id to create a relationship with. (Contact or Company)
   */
  id?: string
  /**
   * Sets the entity type to create a relationship with. (Contact or Company)
   */
  type?: string
}
/**
 * Request body to create a works order item
 */
export interface CreateWorksOrderItemModel {
  /**
   * Sets the notes against the work order item
   */
  notes?: string
  /**
   * Sets the entity to charge the work order item to
   */
  chargeTo?: string
  /**
   * Sets the estimate of the work order item
   */
  estimate?: number // double
  /**
   * Sets the estimate type of the work order item
   */
  estimateType?: string
  /**
   * Sets the cost of the work order item
   */
  cost?: number // double
}
/**
 * Request body to create a works order
 */
export interface CreateWorksOrderModel {
  /**
   * Sets the id of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * Sets the id of the property the work is for
   */
  propertyId?: string
  /**
   * Sets the id of the tenancy that originated the work
   */
  tenancyId?: string
  /**
   * Sets the id of the negotiator that booked the work
   */
  negotiatorId?: string
  /**
   * Sets the id of the type of work that needs to be performed
   */
  typeId?: string
  /**
   * Sets the status of the works order
   */
  status?: string
  /**
   * Sets the description of the works order
   */
  description?: string
  /**
   * Sets the person who reported the fault
   */
  reporter?: string
  /**
   * Sets the date the works order was booked
   */
  booked?: string // date-time
  /**
   * Sets the date the works order is required
   */
  required?: string // date-time
  /**
   * Sets the date the works order was completed
   */
  completed?: string // date-time
  /**
   * Sets the items to create against the works order
   */
  items?: {
    /**
     * Sets the notes against the work order item
     */
    notes?: string
    /**
     * Sets the entity to charge the work order item to
     */
    chargeTo?: string
    /**
     * Sets the estimate of the work order item
     */
    estimate?: number // double
    /**
     * Sets the estimate type of the work order item
     */
    estimateType?: string
    /**
     * Sets the cost of the work order item
     */
    cost?: number // double
  }[]
  /**
   * Sets a JSON fragment to attach to this works order as metadata
   */
  metadata?: {
    [name: string]: {}
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
   * Gets the type of entity that this document is owned by
   */
  ownerType?: string
  /**
   * Gets the Id of the entity that this document is owned by
   */
  ownerId?: string
  /**
   * Gets the Id of the document type
   */
  typeId?: string
  /**
   * Gets the filename assigned to the document
   */
  name?: string
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface LandlordContactCommunicationModel {
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
 * Model representing the details of a contact relationship associated with a landlord entity
 */
export interface LandlordContactRelationshipModel {
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
   * Gets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
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
   * Gets a collection of contact entities attached to this landlord
   * The primary contact will always appear first in the collection
   */
  contacts?: {
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
     * Gets a collection of the contacts communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
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
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this landlord
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
 * Model representing communication details (eg mobile telephone number)
 */
export interface NegotiatorCommunicationModel {
  /**
   * Gets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Gets the communication detail (eg the actual telephone number or email address)
   */
  detail?: string
}
export interface NegotiatorModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the negotiator was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the negotiator was last modified
   */
  modified?: string // date-time
  /**
   * Gets the name of the negotiator
   */
  name?: string
  /**
   * Gets the job title of the negotiator
   */
  jobTitle?: string
  /**
   * Gets the active flag for a negotiator
   */
  active?: boolean
  /**
   * Gets the office the negotiator is linked too
   */
  officeId?: string
  /**
   * Gets a collection of the negotiator communication details
   * Eg. Email address, mobile number, landline
   */
  communicationDetails?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the communication detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this negotiator
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface OfferContactCommunicationModel {
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
 * Model representing the details of a contact relationship associated with an offer entity
 */
export interface OfferContactRelationshipModel {
  /**
   * Gets the unique identifier of the contact
   */
  id?: string
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
   * Gets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
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
  contacts?: {
    /**
     * Gets the unique identifier of the contact
     */
    id?: string
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
     * Gets a collection of the contacts communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
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
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this offer
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model representing the physical address of a building or premise
 */
export interface OfficeAddressModel {
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
 * Model representing communication details (eg mobile telephone number)
 */
export interface OfficeCommunicationModel {
  /**
   * Gets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Gets the communication detail (eg the actual telephone number or email address)
   */
  detail?: string
}
export interface OfficeModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the date and time that the office was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the office was last modified
   */
  modified?: string // date-time
  /**
   * Gets the name of the office
   */
  name?: string
  /**
   * Gets the manager of the office
   */
  manager?: string
  /**
   * Gets the address of the office
   */
  address?: {
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
   * Gets a collection of the office communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the communication detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this office
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
export interface PagedResultApplicantModel_ {
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
     * Gets the marketing mode relating to the buyer (buying / renting)
     */
    marketingMode?: string
    /**
     * Gets the currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * Gets a flag determining whether or not the applicant is actively looking for property
     */
    active?: boolean
    /**
     * Gets the applicant requirement notes
     */
    notes?: string
    /**
     * Gets the date and time that the applicant was last contacted
     */
    lastCall?: string // date-time
    /**
     * Gets the date and time that the applicant is next due to be contacted
     */
    nextCall?: string // date-time
    /**
     * Gets the id of the department that the applicant requirements are associated with
     */
    departmentId?: string
    /**
     * Gets the unique idenfitier of the applicants solicitor
     */
    solicitorId?: string
    /**
     * Gets the property type requirements
     */
    type?: string[]
    /**
     * Gets the property style requirements
     */
    style?: string[]
    /**
     * Gets the property situation requirements
     */
    situation?: string[]
    /**
     * Gets the property parking requirements
     */
    parking?: string[]
    /**
     * Gets the property age requirements
     */
    age?: string[]
    /**
     * Gets the property locality requirements
     */
    locality?: string[]
    /**
     * Gets the property furnishing requirements
     */
    furnishing?: string[]
    /**
     * Gets the minimum number of bedrooms the applicant requires
     */
    bedroomsMin?: number // int32
    /**
     * Gets the maximum number of bedrooms the applicant requires
     */
    bedroomsMax?: number // int32
    /**
     * Gets the minimum number of reception rooms the applicant requires
     */
    receptionsMin?: number // int32
    /**
     * Gets the maximum number of reception rooms the applicant requires
     */
    receptionsMax?: number // int32
    /**
     * Gets the minimum number of bathrooms the applicant requires
     */
    bathroomsMin?: number // int32
    /**
     * Gets the maximum number of bathrooms the applicant requires
     */
    bathroomsMax?: number // int32
    /**
     * Gets the sales specific requirements, if the applicant is looking to buy
     */
    selling?: {
      /**
       * Gets the applicant's minimum price requirement
       */
      priceFrom?: number // int32
      /**
       * Gets the applicant's maximum price requirement
       */
      priceTo?: number // int32
    }
    /**
     * Gets the letting specific requirements, if the applicant is looking to rent
     */
    letting?: {
      /**
       * Gets the date the applicant is looking to move to a new property
       */
      moveDate?: string // date-time
      /**
       * Gets the applicant's preferred letting term
       */
      term?: string
      /**
       * Gets the applicant's minimum rent requirement
       */
      rentFrom?: number // double
      /**
       * Gets the applicant's maximum rent requirement
       */
      rentTo?: number // double
      /**
       * Gets the rent collection frequency (weekly/monthly/annually)
       */
      rentFrequency?: string
    }
    /**
     * Gets the applicant's external area requirements
     */
    externalArea?: {
      /**
       * Gets the unit of area that amounts correspond to (acres/hectares)
       */
      type?: string
      /**
       * Gets the minimum external area unit that an applicant is looking for
       */
      amountFrom?: number // double
      /**
       * Gets the maximum external area unit that an applicant is looking for
       */
      amountTo?: number // double
    }
    /**
     * Gets the applicant's internal area requirements
     */
    internalArea?: {
      /**
       * Gets the unit of area that amounts correspond to (squareFeet/squareMetres)
       */
      type?: string
      /**
       * Gets the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
       */
      amount?: number // double
    }
    /**
     * Gets the collection of office ids that are related to this applicant
     */
    officeIds?: string[]
    /**
     * Gets the collection of negotiator ids that are related to this applicant
     */
    negotiatorIds?: string[]
    /**
     * Gets a collection of contact entities attached to this applicant
     * The primary contact will always appear first in the collection
     */
    contacts?: {
      /**
       * Gets the unique identifier of the contact
       */
      id?: string
      /**
       * Gets the name of this contact or company
       */
      name?: string
      /**
       * Gets the type of this contact (Company/Contact)
       */
      type?: string
      /**
       * Gets a collection of the contacts communication details
       * Eg. Email address, mobile number, landline
       */
      communications?: {
        /**
         * Gets the label representing the type of detail (eg E-mail)
         */
        label?: string
        /**
         * Gets the contact detail (eg the actual telephone number or email address)
         */
        detail?: string
      }[]
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
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this applicant
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the date that the appointment should be followed up on
     */
    followUpOn?: string // date-time
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
    property?: {
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
        /**
         * Gets the geolocation of the address
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
    }
    /**
     * Gets a collection of attendees who are requested to attend the appointment
     */
    attendees?: {
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
      communicationDetails?: {
        /**
         * Gets the label representing the type of detail (eg E-mail)
         */
        label?: string
        /**
         * Gets the contact detail (eg the actual telephone number or email address)
         */
        detail?: string
      }[]
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this appointment
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets a collection of the company communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
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
     * Gets the collection of office ids that are related to this company
     */
    officeIds?: string[]
    /**
     * Gets the collection of negotiator ids that are related to this company
     */
    negotiatorIds?: string[]
    /**
     * Gets a listing of additional metadata that has been set against this company
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
export interface PagedResultContactIdentityCheckModel_ {
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
     * Gets the details of the documents that have been provided for this identity check
     */
    documents?: {
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
      /**
       * Gets the location of the physical file that relates to this document (eg. scan of driving license)
       */
      fileUrl?: string
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this identity check
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets a collection of the contacts communication details
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg. mobile, email address)
       */
      label?: string
      /**
       * Gets the communication detail (eg. 07999 876543, developers@reapit.com)
       */
      detail?: string
    }[]
    /**
     * Gets a collection of addresses (maximum 3) that this contact has been associated to
     */
    addresses?: {
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
    }[]
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
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the type of entity that this document is owned by
     */
    ownerType?: string
    /**
     * Gets the Id of the entity that this document is owned by
     */
    ownerId?: string
    /**
     * Gets the Id of the document type
     */
    typeId?: string
    /**
     * Gets the filename assigned to the document
     */
    name?: string
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets a collection of contact entities attached to this landlord
     * The primary contact will always appear first in the collection
     */
    contacts?: {
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
       * Gets a collection of the contacts communication details
       * Eg. Email address, mobile number, landline
       */
      communications?: {
        /**
         * Gets the label representing the type of detail (eg E-mail)
         */
        label?: string
        /**
         * Gets the contact detail (eg the actual telephone number or email address)
         */
        detail?: string
      }[]
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
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this landlord
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the date and time that the negotiator was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the negotiator was last modified
     */
    modified?: string // date-time
    /**
     * Gets the name of the negotiator
     */
    name?: string
    /**
     * Gets the job title of the negotiator
     */
    jobTitle?: string
    /**
     * Gets the active flag for a negotiator
     */
    active?: boolean
    /**
     * Gets the office the negotiator is linked too
     */
    officeId?: string
    /**
     * Gets a collection of the negotiator communication details
     * Eg. Email address, mobile number, landline
     */
    communicationDetails?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the communication detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this negotiator
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
    contacts?: {
      /**
       * Gets the unique identifier of the contact
       */
      id?: string
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
       * Gets a collection of the contacts communication details
       * Eg. Email address, mobile number, landline
       */
      communications?: {
        /**
         * Gets the label representing the type of detail (eg E-mail)
         */
        label?: string
        /**
         * Gets the contact detail (eg the actual telephone number or email address)
         */
        detail?: string
      }[]
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
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this offer
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the date and time that the office was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the office was last modified
     */
    modified?: string // date-time
    /**
     * Gets the name of the office
     */
    name?: string
    /**
     * Gets the manager of the office
     */
    manager?: string
    /**
     * Gets the address of the office
     */
    address?: {
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
     * Gets a collection of the office communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the communication detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this office
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
  data?: {
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
  }[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface PagedResultPropertyModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier
     */
    id?: string
    /**
     * Gets the datetime when the property was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the property was last modified
     */
    modified?: string // date-time
    /**
     * Gets the marketing mode of the property (selling/letting/sellingAndLetting)
     */
    marketingMode?: string
    /**
     * Gets the currency that applies to monetary amounts exposed in the model
     */
    currency?: string
    /**
     * Gets the address of the property
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
      /**
       * Gets the geolocation of the address
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
     * Gets the strapline description
     */
    strapline?: string
    /**
     * Gets the brief description
     */
    description?: string
    /**
     * Gets the summary of accommodation
     */
    summary?: string
    /**
     * Gets the department id
     */
    departmentId?: string
    /**
     * Gets the properties negotiatior id
     */
    negotiatorId?: string
    /**
     * Gets the number of bedrooms
     */
    bedrooms?: number // int32
    /**
     * Gets the number of reception rooms
     */
    receptions?: number // int32
    /**
     * Gets the number of bathrooms
     */
    bathrooms?: number // int32
    /**
     * Gets the council tax banding (A/B/C/D/E/F/G/H)
     */
    councilTax?: string
    /**
     * Gets a value indicating whether this property can be advertised on the internet
     */
    internetAdvertising?: boolean
    /**
     * Gets details of the external land area associated to this property
     */
    externalArea?: {
      /**
       * Gets the unit of area (acres/hectares)
       */
      type?: string
      /**
       * Gets the minimum area bound
       */
      min?: number // double
      /**
       * Gets the maximum area bound
       */
      max?: number // double
    }
    /**
     * Gets details of the internal dimensions of the property
     */
    internalArea?: {
      /**
       * Gets the unit of area (squareFeet/squareMetres)
       */
      type?: string
      /**
       * Gets the minimum area bound
       */
      min?: number // double
      /**
       * Gets the maximum area bound
       */
      max?: number // double
    }
    /**
     * Gets details of the EPC statistics
     */
    epc?: {
      /**
       * Gets whether this property is exempt from requiring an EPC
       */
      exempt?: boolean
      /**
       * Gets the current energy efficienty rating
       */
      eer?: number // int32
      /**
       * Gets the potential energy efficienty rating
       */
      eerPotential?: number // int32
      /**
       * Gets the current environmental impact rating
       */
      eir?: number // int32
      /**
       * Gets the potential environmental impact rating
       */
      eirPotential?: number // int32
    }
    /**
     * Gets the sales specific details of the property
     */
    selling?: {
      /**
       * Gets the date that the property was flagged as for sale
       */
      instructed?: string // date-time
      /**
       * Gets the asking price of the property
       */
      price?: number // int32
      /**
       * Gets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
       */
      qualifier?: string
      /**
       * Gets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
       */
      status?: string
      /**
       * Gets details of the sales tenure of the property
       */
      tenure?: {
        /**
         * Gets the type of tenure that applies to this property
         */
        type?: string
        /**
         * Gets tenure expiration date
         */
        expiry?: string // date-time
      }
    }
    /**
     * Gets the lettings specific details of the property
     */
    letting?: {
      /**
       * Gets the date that the property was flagged as for let
       */
      instructed?: string // date-time
      /**
       * Gets the date this property is next available from
       */
      availableFrom?: string // date-time
      /**
       * Gets the date this property is available to
       */
      availableTo?: string // date-time
      /**
       * Gets the monetary amount required to rent this property
       */
      rent?: number // double
      /**
       * Gets the rent collection frequency (weekly/monthly/yearly)
       */
      rentFrequency?: string
      /**
       * Gets the acceptable letting terms (short/long/any)
       */
      term?: string
      /**
       * Gets the id of the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
       */
      status?: string
    }
    /**
     * Gets the property types
     */
    type?: string[]
    /**
     * Gets the property style
     */
    style?: string[]
    /**
     * Gets the property situation
     */
    situation?: string[]
    /**
     * Gets the property parking
     */
    parking?: string[]
    /**
     * Gets the property age
     */
    age?: string[]
    /**
     * Gets the property locality
     */
    locality?: string[]
    /**
     * Gets a listing of room details
     */
    rooms?: {
      /**
       * Gets the name of the room
       */
      name?: string
      /**
       * Gets details on the dimension of the room
       */
      dimensions?: string
      /**
       * Gets a short description of the room
       */
      description?: string
    }[]
    /**
     * Gets the properties office ids
     */
    officeIds?: string[]
    /**
     * Gets a listing of additional metadata that has been set against this property
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the unique identifier of the task
     */
    id?: string
    /**
     * Gets the date the task was created
     */
    created?: string // date-time
    /**
     * Gets the date the task was modified
     */
    modified?: string // date-time
    /**
     * Gets the date the task was activated
     */
    activated?: string // date-time
    /**
     * Gets the date the task was completed
     */
    completed?: string // date-time
    /**
     * Gets the type of task
     */
    typeId?: string
    /**
     * Gets the unique identifier of the negotiator who created the task
     */
    senderId?: string
    /**
     * Gets the text against the task or message
     */
    text?: string
    /**
     * Gets the unique identifier of the landlord the task is related too
     */
    landlordId?: string
    /**
     * Gets the unique identifier of the property the task is related too
     */
    propertyId?: string
    /**
     * Gets the unique identifier of the applicant the task is related too
     */
    applicantId?: string
    /**
     * Gets the unique identifier of the tenancy the task is related too
     */
    tenancyId?: string
    /**
     * Gets the unique identifier of the contact the task is related too
     */
    contactId?: string
    /**
     * Gets the recipients of this task
     */
    recipients?: {
      /**
       * Unique identifier of the tasks recipient
       */
      id?: string
      /**
       * Entity type of the recipient (office/negotiator)
       */
      type?: string
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this task
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
     * Gets the vendors unique identfier
     */
    id?: string
    /**
     * Gets the datetime when the vendor was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the vendor was last modified
     */
    modified?: string // date-time
    /**
     * Gets the date and time that the vendor was last called
     */
    lastCall?: string // date-time
    /**
     * Gets the date and time that the vendor will be called next
     */
    nextCall?: string // date-time
    /**
     * Gets the type of vendor
     */
    typeId?: string
    /**
     * Gets the vendors reason for selling
     */
    sellingReasonId?: string
    /**
     * Gets the unique identifier of the vendors solicitor
     */
    solicitorId?: string
    /**
     * Gets a collection of contact entities attached to this vendor
     * The primary contact will always appear first in the collection
     */
    contacts?: {
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
       * Gets a collection of the contacts communication details
       * Eg. Email address, mobile number, landline
       */
      communications?: {
        /**
         * Gets the label representing the type of detail (eg E-mail)
         */
        label?: string
        /**
         * Gets the contact detail (eg the actual telephone number or email address)
         */
        detail?: string
      }[]
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
      readonly _links?: {
        [name: string]: {
          href?: string
        }
      }
      readonly _embedded?: {
        [name: string]: {}
      }
    }[]
    /**
     * Gets a listing of additional metadata that has been set against this vendor
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
export interface PagedResultWorksOrderItemModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier of the works order item
     */
    id?: string
    /**
     * Gets the unique identifier of the works order
     */
    worksOrderId?: string
    /**
     * Gets the datetime when the works order item was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the works order item was last modified
     */
    modified?: string // date-time
    /**
     * Gets the notes of the work order item
     */
    notes?: string
    /**
     * Gets the entity type to charge to (Landlord, Tenant)
     */
    chargeTo?: string
    /**
     * Gets the estimate of the work order item
     */
    estimate?: number // double
    /**
     * Gets the work order items estimate type (Agent, Verbal, Written)
     */
    estimateType?: string
    /**
     * Gets the cost of the work order item
     */
    cost?: number // double
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
export interface PagedResultWorksOrderModel_ {
  _embedded?: {
    /**
     * Gets the unique identifier of the works order
     */
    id?: string
    /**
     * Gets the datetime when the works order was created
     */
    created?: string // date-time
    /**
     * Gets the date and time that the works order was last modified
     */
    modified?: string // date-time
    /**
     * Gets the id of the company that has been selected to perform the work
     */
    companyId?: string
    /**
     * Gets the id of the property the work is for
     */
    propertyId?: string
    /**
     * Gets the id of the tenancy that originated the work
     */
    tenancyId?: string
    /**
     * Gets the id of the negotiator that booked the work
     */
    negotiatorId?: string
    /**
     * Gets the id of the type of work that needs to be performed
     */
    typeId?: string
    /**
     * Gets the status of the works order
     */
    status?: string
    /**
     * Gets the description of the works order
     */
    description?: string
    /**
     * Gets the person who reported the fault
     */
    reporter?: string
    /**
     * Gets the date the works order was booked
     */
    booked?: string // date-time
    /**
     * Gets the date the works order is requried
     */
    required?: string // date-time
    /**
     * Gets the date the works order is completed
     */
    completed?: string // date-time
    /**
     * Gets a listing of additional metadata that has been set against this works order
     */
    metadata?: {
      [name: string]: {}
    }
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
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
/**
 * Model representing the physical address of a building or premise
 */
export interface PropertyAddressModel {
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
 * A model to represent the details of an EPC graph
 */
export interface PropertyEpcModel {
  /**
   * Gets whether this property is exempt from requiring an EPC
   */
  exempt?: boolean
  /**
   * Gets the current energy efficienty rating
   */
  eer?: number // int32
  /**
   * Gets the potential energy efficienty rating
   */
  eerPotential?: number // int32
  /**
   * Gets the current environmental impact rating
   */
  eir?: number // int32
  /**
   * Gets the potential environmental impact rating
   */
  eirPotential?: number // int32
}
/**
 * A model to represent external area of a propeerty
 */
export interface PropertyExternalAreaModel {
  /**
   * Gets the unit of area (acres/hectares)
   */
  type?: string
  /**
   * Gets the minimum area bound
   */
  min?: number // double
  /**
   * Gets the maximum area bound
   */
  max?: number // double
}
/**
 * Model representing the geographical location of an address using coordinates
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
 * A model to represent internal area of a propeerty
 */
export interface PropertyInternalAreaModel {
  /**
   * Gets the unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * Gets the minimum area bound
   */
  min?: number // double
  /**
   * Gets the maximum area bound
   */
  max?: number // double
}
/**
 * Model to represent the property details specific to lettings marketing
 */
export interface PropertyLettingModel {
  /**
   * Gets the date that the property was flagged as for let
   */
  instructed?: string // date-time
  /**
   * Gets the date this property is next available from
   */
  availableFrom?: string // date-time
  /**
   * Gets the date this property is available to
   */
  availableTo?: string // date-time
  /**
   * Gets the monetary amount required to rent this property
   */
  rent?: number // double
  /**
   * Gets the rent collection frequency (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * Gets the acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * Gets the id of the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
}
/**
 * Model representing the details of a property
 */
export interface PropertyModel {
  /**
   * Gets the unique identifier
   */
  id?: string
  /**
   * Gets the datetime when the property was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the property was last modified
   */
  modified?: string // date-time
  /**
   * Gets the marketing mode of the property (selling/letting/sellingAndLetting)
   */
  marketingMode?: string
  /**
   * Gets the currency that applies to monetary amounts exposed in the model
   */
  currency?: string
  /**
   * Gets the address of the property
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
    /**
     * Gets the geolocation of the address
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
   * Gets the strapline description
   */
  strapline?: string
  /**
   * Gets the brief description
   */
  description?: string
  /**
   * Gets the summary of accommodation
   */
  summary?: string
  /**
   * Gets the department id
   */
  departmentId?: string
  /**
   * Gets the properties negotiatior id
   */
  negotiatorId?: string
  /**
   * Gets the number of bedrooms
   */
  bedrooms?: number // int32
  /**
   * Gets the number of reception rooms
   */
  receptions?: number // int32
  /**
   * Gets the number of bathrooms
   */
  bathrooms?: number // int32
  /**
   * Gets the council tax banding (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * Gets a value indicating whether this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * Gets details of the external land area associated to this property
   */
  externalArea?: {
    /**
     * Gets the unit of area (acres/hectares)
     */
    type?: string
    /**
     * Gets the minimum area bound
     */
    min?: number // double
    /**
     * Gets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Gets details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * Gets the unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * Gets the minimum area bound
     */
    min?: number // double
    /**
     * Gets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Gets details of the EPC statistics
   */
  epc?: {
    /**
     * Gets whether this property is exempt from requiring an EPC
     */
    exempt?: boolean
    /**
     * Gets the current energy efficienty rating
     */
    eer?: number // int32
    /**
     * Gets the potential energy efficienty rating
     */
    eerPotential?: number // int32
    /**
     * Gets the current environmental impact rating
     */
    eir?: number // int32
    /**
     * Gets the potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Gets the sales specific details of the property
   */
  selling?: {
    /**
     * Gets the date that the property was flagged as for sale
     */
    instructed?: string // date-time
    /**
     * Gets the asking price of the property
     */
    price?: number // int32
    /**
     * Gets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * Gets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Gets details of the sales tenure of the property
     */
    tenure?: {
      /**
       * Gets the type of tenure that applies to this property
       */
      type?: string
      /**
       * Gets tenure expiration date
       */
      expiry?: string // date-time
    }
  }
  /**
   * Gets the lettings specific details of the property
   */
  letting?: {
    /**
     * Gets the date that the property was flagged as for let
     */
    instructed?: string // date-time
    /**
     * Gets the date this property is next available from
     */
    availableFrom?: string // date-time
    /**
     * Gets the date this property is available to
     */
    availableTo?: string // date-time
    /**
     * Gets the monetary amount required to rent this property
     */
    rent?: number // double
    /**
     * Gets the rent collection frequency (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * Gets the acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * Gets the id of the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
  }
  /**
   * Gets the property types
   */
  type?: string[]
  /**
   * Gets the property style
   */
  style?: string[]
  /**
   * Gets the property situation
   */
  situation?: string[]
  /**
   * Gets the property parking
   */
  parking?: string[]
  /**
   * Gets the property age
   */
  age?: string[]
  /**
   * Gets the property locality
   */
  locality?: string[]
  /**
   * Gets a listing of room details
   */
  rooms?: {
    /**
     * Gets the name of the room
     */
    name?: string
    /**
     * Gets details on the dimension of the room
     */
    dimensions?: string
    /**
     * Gets a short description of the room
     */
    description?: string
  }[]
  /**
   * Gets the properties office ids
   */
  officeIds?: string[]
  /**
   * Gets a listing of additional metadata that has been set against this property
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model representing a room in a property
 */
export interface PropertyRoomModel {
  /**
   * Gets the name of the room
   */
  name?: string
  /**
   * Gets details on the dimension of the room
   */
  dimensions?: string
  /**
   * Gets a short description of the room
   */
  description?: string
}
/**
 * Model to represent the property details specific to sales marketing
 */
export interface PropertySellingModel {
  /**
   * Gets the date that the property was flagged as for sale
   */
  instructed?: string // date-time
  /**
   * Gets the asking price of the property
   */
  price?: number // int32
  /**
   * Gets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * Gets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Gets details of the sales tenure of the property
   */
  tenure?: {
    /**
     * Gets the type of tenure that applies to this property
     */
    type?: string
    /**
     * Gets tenure expiration date
     */
    expiry?: string // date-time
  }
}
/**
 * Model representing the sales tenure of a property
 */
export interface PropertyTenureModel {
  /**
   * Gets the type of tenure that applies to this property
   */
  type?: string
  /**
   * Gets tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Model to display a tasks recipient
 */
export interface RecipientModel {
  /**
   * Unique identifier of the tasks recipient
   */
  id?: string
  /**
   * Entity type of the recipient (office/negotiator)
   */
  type?: string
}
export interface StringSegment {
  readonly buffer?: string
  readonly offset?: number // int32
  readonly length?: number // int32
  readonly value?: string
  readonly hasValue?: boolean
}
/**
 * Outward facing model to display task details
 */
export interface TaskModel {
  /**
   * Gets the unique identifier of the task
   */
  id?: string
  /**
   * Gets the date the task was created
   */
  created?: string // date-time
  /**
   * Gets the date the task was modified
   */
  modified?: string // date-time
  /**
   * Gets the date the task was activated
   */
  activated?: string // date-time
  /**
   * Gets the date the task was completed
   */
  completed?: string // date-time
  /**
   * Gets the type of task
   */
  typeId?: string
  /**
   * Gets the unique identifier of the negotiator who created the task
   */
  senderId?: string
  /**
   * Gets the text against the task or message
   */
  text?: string
  /**
   * Gets the unique identifier of the landlord the task is related too
   */
  landlordId?: string
  /**
   * Gets the unique identifier of the property the task is related too
   */
  propertyId?: string
  /**
   * Gets the unique identifier of the applicant the task is related too
   */
  applicantId?: string
  /**
   * Gets the unique identifier of the tenancy the task is related too
   */
  tenancyId?: string
  /**
   * Gets the unique identifier of the contact the task is related too
   */
  contactId?: string
  /**
   * Gets the recipients of this task
   */
  recipients?: {
    /**
     * Unique identifier of the tasks recipient
     */
    id?: string
    /**
     * Entity type of the recipient (office/negotiator)
     */
    type?: string
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this task
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model to update the external area requirements on an existing applicant
 */
export interface UpdateApplicantExternalAreaModel {
  /**
   * Sets the unit of area that amounts correspond to (acres/hectares)
   */
  type?: string
  /**
   * Sets the minimum external area unit that an applicant is looking for
   */
  amountFrom?: number // double
  /**
   * Sets the maximum external area unit that an applicant is looking for
   */
  amountTo?: number // double
}
/**
 * Model to update the internal area requirements on an existing applicant
 */
export interface UpdateApplicantInternalAreaModel {
  /**
   * Sets the unit of area that amounts correspond to (squareFeet/squareMetres)
   */
  type?: string
  /**
   * GeSetsts the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
   */
  amount?: number // double
}
/**
 * Model to represent the applicant requirement details specific to lettings marketing when updating an applicant
 */
export interface UpdateApplicantLettingModel {
  /**
   * Sets the date the applicant is looking to move to a new property
   */
  moveDate?: string // date-time
  /**
   * Sets the applicant's preferred letting term
   */
  term?: string
  /**
   * Sets the applicant's minimum rent requirement
   */
  rentFrom?: number // double
  /**
   * Sets the applicant's maximum rent requirement
   */
  rentTo?: number // double
  /**
   * Sets the rent collection frequency (weekly/monthly/annually)
   */
  rentFrequency?: string
}
/**
 * Model used to update an applicant
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
   * Sets the applicants furnishing requirements
   */
  furnishing?: string[]
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
   * Sets the sales specific requirements, if the applicant is looking to buy
   */
  selling?: {
    /**
     * Sets the applicant's minimum price requirement
     */
    priceFrom?: number // int32
    /**
     * Sets the applicant's maximum price requirement
     */
    priceTo?: number // int32
  }
  /**
   * Sets the letting specific requirements, if the applicant is looking to rent
   */
  letting?: {
    /**
     * Sets the date the applicant is looking to move to a new property
     */
    moveDate?: string // date-time
    /**
     * Sets the applicant's preferred letting term
     */
    term?: string
    /**
     * Sets the applicant's minimum rent requirement
     */
    rentFrom?: number // double
    /**
     * Sets the applicant's maximum rent requirement
     */
    rentTo?: number // double
    /**
     * Sets the rent collection frequency (weekly/monthly/annually)
     */
    rentFrequency?: string
  }
  /**
   * Sets the applicant's external area requirements
   */
  externalArea?: {
    /**
     * Sets the unit of area that amounts correspond to (acres/hectares)
     */
    type?: string
    /**
     * Sets the minimum external area unit that an applicant is looking for
     */
    amountFrom?: number // double
    /**
     * Sets the maximum external area unit that an applicant is looking for
     */
    amountTo?: number // double
  }
  /**
   * Sets the applicant's internal area requirements
   */
  internalArea?: {
    /**
     * Sets the unit of area that amounts correspond to (squareFeet/squareMetres)
     */
    type?: string
    /**
     * GeSetsts the number of units that describe the property's internal area, relating to the value specified in Type that an applicant is looking for
     */
    amount?: number // double
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
   * Sets the collection of new or existing contact entities the
   * should be attached to the new applicant
   */
  contacts?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    id?: string
    /**
     * Sets the entity type to create a relationship with. (Contact/Company)
     */
    type?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this applicant as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to represent the applicant requirement details specific to sales marketing when updating an applicant
 */
export interface UpdateApplicantSellingModel {
  /**
   * Sets the applicant's minimum price requirement
   */
  priceFrom?: number // int32
  /**
   * Sets the applicant's maximum price requirement
   */
  priceTo?: number // int32
}
/**
 * Model to update an attendee on an appointment
 */
export interface UpdateAppointmentAttendeeModel {
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
 * Model used to update the follow up information on a single appointment
 */
export interface UpdateAppointmentFollowUpModel {
  /**
   * Sets the unique identifier of a pre-defined follow up response type
   */
  responseId?: string
  /**
   * Sets the internal follow up notes to be stored against the appointment
   */
  notes?: string
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
   * Sets the date that the appointment should be followed up on
   */
  followUpOn?: string // date-time
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
  attendees?: {
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
  }[]
  /**
   * Sets the recurrence pattern for this appointment
   */
  recurrence?: {
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
  /**
   * Sets a JSON fragment to attach to this appointment as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to update the recurrence details of an appointment
 */
export interface UpdateAppointmentRecurrenceModel {
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
 * Model to update a communication detail for a company (eg. an email address)
 */
export interface UpdateCompanyCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to update a company
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
   * Sets a collection of the companies communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
   * Sets a collection of office ids that are related to this company
   */
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this company
   */
  negotiatorIds?: string[]
  /**
   * Sets a JSON fragment to attach to this company as metadata
   */
  metadata?: {
    [name: string]: {}
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
 * Model to update a communication detail for a contact (eg. an email address)
 */
export interface UpdateContactCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the contact detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to update an existing identity check
 */
export interface UpdateContactIdentityCheckModel {
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
   * Sets the details of the documents that have been provided for this identity check
   */
  documents?: {
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
     * Sets the location of the physical file that relates to this document (eg. scan of driving license)
     */
    fileUrl?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this identity check as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to update an identity document
 */
export interface UpdateContactIdentityDocumentModel {
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
   * Sets the location of the physical file that relates to this document (eg. scan of driving license)
   */
  fileUrl?: string
}
/**
 * Model to update a contact record
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
   * Sets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  officeIds?: string[]
  /**
   * Sets a collection of negotiator ids that are related to this contact
   */
  negotiatorIds?: string[]
  /**
   * Sets a collection of addresses that this contact has been associated to
   * A maximum of three addresses can be associated to a contact
   */
  addresses?: {
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
  }[]
  /**
   * Sets a JSON fragment to attach to this contact as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
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
   * Sets the collection of new or existing contact entities the
   * should be attached to the new landlord
   */
  contacts?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    id?: string
    /**
     * Sets the entity type to create a relationship with. (Contact or Company)
     */
    type?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this landlord as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to update a communication details (eg. an email address)
 */
export interface UpdateNegotiatorCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the communications detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to update a negotiator
 */
export interface UpdateNegotiatorModel {
  /**
   * Sets the name of the negotiator
   */
  name?: string
  /**
   * Sets the job title of the negotiator
   */
  jobTitle?: string
  /**
   * Sets the inactive flag of the negotiator
   */
  active?: boolean
  /**
   * Sets a collection of the negotiator communication details
   * Eg. Email address, mobile number, landline
   */
  communicationDetails?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the communications detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this negotiator as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to update an offer
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
    [name: string]: {}
  }
}
/**
 * Model to update an address
 */
export interface UpdateOfficeAddressModel {
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
 * Model to update a communication details (eg. an email address)
 */
export interface UpdateOfficeCommunicationModel {
  /**
   * Sets the label representing the type of detail (eg E-mail)
   */
  label?: string
  /**
   * Sets the communications detail (eg the actual telephone number or email address)
   */
  detail?: string
}
/**
 * Model to update an office
 */
export interface UpdateOfficeModel {
  /**
   * Sets the name of the office
   */
  name?: string
  /**
   * Sets the manager of the office
   */
  manager?: string
  /**
   * Sets the address of the office
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
   * Sets a collection of the office communication details
   * Eg. Email address, mobile number, landline
   */
  communicationDetails?: {
    /**
     * Sets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Sets the communications detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this office as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * A model used to update a property address
 */
export interface UpdatePropertyAddressModel {
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
  /**
   * Sets the geolocation of the address
   */
  geolocation?: {
    /**
     * Sets the latitude coordinate of the coordinate pair
     */
    latitude?: number // double
    /**
     * Sets the longitude coordinate of the coordinate pair
     */
    longitude?: number // double
  }
}
/**
 * A model used to update the details of an EPC graph
 */
export interface UpdatePropertyEpcModel {
  /**
   * Sets whether this property is exempt from requiring an EPC
   */
  exempt?: boolean
  /**
   * Sets the current energy efficienty rating
   */
  eer?: number // int32
  /**
   * Sets the potential energy efficienty rating
   */
  eerPotential?: number // int32
  /**
   * Sets the current environmental impact rating
   */
  eir?: number // int32
  /**
   * Sets the potential environmental impact rating
   */
  eirPotential?: number // int32
}
/**
 * A model used to update the external area information about a property
 */
export interface UpdatePropertyExternalAreaModel {
  /**
   * Sets the unit of area (acres/hectares)
   */
  type?: string
  /**
   * Sets the minimum area bound
   */
  min?: number // double
  /**
   * Sets the maximum area bound
   */
  max?: number // double
}
/**
 * A model used to update the geolocation coordinates of a property address
 */
export interface UpdatePropertyGeolocationModel {
  /**
   * Sets the latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * Sets the longitude coordinate of the coordinate pair
   */
  longitude?: number // double
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
/**
 * A model used to update the internal area information about a property address
 */
export interface UpdatePropertyInternalAreaModel {
  /**
   * Sets the unit of area (squareFeet/squareMetres)
   */
  type?: string
  /**
   * Sets the minimum area bound
   */
  min?: number // double
  /**
   * Sets the maximum area bound
   */
  max?: number // double
}
/**
 * A model used to update the letting information associated to a property
 */
export interface UpdatePropertyLettingModel {
  /**
   * Sets the date that the property was flagged as for let
   */
  instructed?: string // date-time
  /**
   * Sets the date this property is next available from
   */
  availableFrom?: string // date-time
  /**
   * Sets the date this property is available to
   */
  availableTo?: string // date-time
  /**
   * Sets the monetary amount required to rent this property
   */
  rent?: number // double
  /**
   * Sets the rent collection frequency (weekly/monthly/yearly)
   */
  rentFrequency?: string
  /**
   * Sets the acceptable letting terms (short/long/any)
   */
  term?: string
  /**
   * Sets the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
   */
  status?: string
}
/**
 * A model used to update an existing property
 */
export interface UpdatePropertyModel {
  /**
   * Sets the strapline description
   */
  strapline?: string
  /**
   * Sets the brief description
   */
  description?: string
  /**
   * Sets the summary of accommodation
   */
  summary?: string
  /**
   * Sets the address of the property
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
     * Sets the ISO-3166 country code associated with the address
     */
    countryId?: string
    /**
     * Sets the geolocation of the address
     */
    geolocation?: {
      /**
       * Sets the latitude coordinate of the coordinate pair
       */
      latitude?: number // double
      /**
       * Sets the longitude coordinate of the coordinate pair
       */
      longitude?: number // double
    }
  }
  /**
   * Sets the number of bedrooms
   */
  bedrooms?: number // int32
  /**
   * Sets the number of reception rooms
   */
  receptions?: number // int32
  /**
   * Sets the number of bathrooms
   */
  bathrooms?: number // int32
  /**
   * Sets the council tax banding (A/B/C/D/E/F/G/H)
   */
  councilTax?: string
  /**
   * Sets a value indicating whether this property can be advertised on the internet
   */
  internetAdvertising?: boolean
  /**
   * Sets details of the EPC statistics
   */
  epc?: {
    /**
     * Sets whether this property is exempt from requiring an EPC
     */
    exempt?: boolean
    /**
     * Sets the current energy efficienty rating
     */
    eer?: number // int32
    /**
     * Sets the potential energy efficienty rating
     */
    eerPotential?: number // int32
    /**
     * Sets the current environmental impact rating
     */
    eir?: number // int32
    /**
     * Sets the potential environmental impact rating
     */
    eirPotential?: number // int32
  }
  /**
   * Sets the external area
   */
  externalArea?: {
    /**
     * Sets the unit of area (acres/hectares)
     */
    type?: string
    /**
     * Sets the minimum area bound
     */
    min?: number // double
    /**
     * Sets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: {
    /**
     * Sets the unit of area (squareFeet/squareMetres)
     */
    type?: string
    /**
     * Sets the minimum area bound
     */
    min?: number // double
    /**
     * Sets the maximum area bound
     */
    max?: number // double
  }
  /**
   * Sets the sales specific details of the property
   */
  selling?: {
    /**
     * Sets the date that the property was flagged as for sale
     */
    instructed?: string // date-time
    /**
     * Sets the asking price of the property
     */
    price?: number // int32
    /**
     * Sets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
     */
    qualifier?: string
    /**
     * Sets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
     */
    status?: string
    /**
     * Sets details of the sales tenure of the property
     */
    tenure?: {
      /**
       * Sets the type of tenure that applies to this property
       */
      type?: string
      /**
       * Sets tenure expiration date
       */
      expiry?: string // date-time
    }
  }
  /**
   * Sets the letting specific details of the property
   */
  letting?: {
    /**
     * Sets the date that the property was flagged as for let
     */
    instructed?: string // date-time
    /**
     * Sets the date this property is next available from
     */
    availableFrom?: string // date-time
    /**
     * Sets the date this property is available to
     */
    availableTo?: string // date-time
    /**
     * Sets the monetary amount required to rent this property
     */
    rent?: number // double
    /**
     * Sets the rent collection frequency (weekly/monthly/yearly)
     */
    rentFrequency?: string
    /**
     * Sets the acceptable letting terms (short/long/any)
     */
    term?: string
    /**
     * Sets the letting status of this property (valuation/toLet/toLetUnavailable/underOffer/underOfferUnavailable/arrangingTenancyUnavailable/arrangingTenancy/tenancyCurrentUnavailable/tenancyCurrent/tenancyFinished/tenancyCancelled/sold/letByOtherAgent/letPrivately/provisional/withdrawn)
     */
    status?: string
  }
  /**
   * Sets the property types
   */
  type?: string[]
  /**
   * Sets the property style
   */
  style?: string[]
  /**
   * Sets the property situation
   */
  situation?: string[]
  /**
   * Sets the property parking
   */
  parking?: string[]
  /**
   * Sets the property age
   */
  age?: string[]
  /**
   * Sets the property locality
   */
  locality?: string[]
  /**
   * Sets the listing of room details
   */
  rooms?: {
    name?: string
    dimensions?: string
    description?: string
  }[]
  /**
   * Sets the properties negotiatior id
   */
  negotiatorId?: string
  /**
   * Sets the properties office ids
   */
  officeIds?: string[]
  /**
   * Sets a JSON fragment to attach to this property as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * A model used to update or add a room attached to a property
 */
export interface UpdatePropertyRoomModel {
  name?: string
  dimensions?: string
  description?: string
}
/**
 * A model used to update the selling information associated to a property
 */
export interface UpdatePropertySellingModel {
  /**
   * Sets the date that the property was flagged as for sale
   */
  instructed?: string // date-time
  /**
   * Sets the asking price of the property
   */
  price?: number // int32
  /**
   * Sets the price qualifier (askingPrice/priceOnApplication/guidePrice/offersInRegion/offersOver/offersInExcess/fixedPrice/priceReducedTo)
   */
  qualifier?: string
  /**
   * Sets the sales status (preAppraisal/valuation/paidValuation/forSale/forSaleUnavailable/underOffer/underOfferUnavailable/reserved/exchanged/completed/soldExternally/withdrawn)
   */
  status?: string
  /**
   * Sets details of the sales tenure of the property
   */
  tenure?: {
    /**
     * Sets the type of tenure that applies to this property
     */
    type?: string
    /**
     * Sets tenure expiration date
     */
    expiry?: string // date-time
  }
}
/**
 * A model used to update the tenure information about a property
 */
export interface UpdatePropertyTenureModel {
  /**
   * Sets the type of tenure that applies to this property
   */
  type?: string
  /**
   * Sets tenure expiration date
   */
  expiry?: string // date-time
}
/**
 * Model to update a tasks recipient
 */
export interface UpdateRecipientModel {
  /**
   * Unique identifier of the tasks recipient
   */
  id?: string
  /**
   * Entity type of the recipient (office/negotiator)
   */
  type?: string
}
/**
 * Model used to update an existing task
 */
export interface UpdateTaskModel {
  /**
   * Sets the date the task will be activated
   */
  activates?: string // date-time
  /**
   * Sets the date the task will be completed
   */
  completed?: string // date-time
  /**
   * Sets the type of task
   */
  typeId?: string
  /**
   * Sets the unique identifier of the negotiator who created the task
   */
  senderId?: string
  /**
   * Sets the text against the task or message
   */
  text?: string
  /**
   * Sets the unique identifier of the landlord the task is related too
   */
  landlordId?: string
  /**
   * Sets the unique identifier of the property the task is related too
   */
  propertyId?: string
  /**
   * Sets the unique identifier of the applicant the task is related too
   */
  applicantId?: string
  /**
   * Sets the unique identifier of the tenancy the task is related too
   */
  tenancyId?: string
  /**
   * Sets the unique identifier of the contact the task is related too
   */
  contactId?: string
  /**
   * Sets the recipient to update against this task
   */
  recipient?: {
    /**
     * Unique identifier of the tasks recipient
     */
    id?: string
    /**
     * Entity type of the recipient (office/negotiator)
     */
    type?: string
  }
  /**
   * Sets a JSON fragment to attach to this task as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model to specify updates for a vendor
 */
export interface UpdateVendorModel {
  /**
   * Sets the date of the last call
   */
  lastCall?: string // date-time
  /**
   * Sets the date of the next call
   */
  nextCall?: string // date-time
  /**
   * Sets the vendors type
   */
  typeId?: string
  /**
   * Sets the vendors selling reason
   */
  sellingReasonId?: string
  /**
   * Sets the unique identifier of the vendors solicitor
   */
  solicitorId?: string
  /**
   * Sets the collection of contact entities to attach to the vendor
   */
  contacts?: {
    /**
     * Sets the entity id to create a relationship with. (Contact or Company)
     */
    id?: string
    /**
     * Sets the entity type to create a relationship with. (Contact or Company)
     */
    type?: string
  }[]
  /**
   * Sets a JSON fragment to attach to this vendor as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Request body to update a works order item
 */
export interface UpdateWorksOrderItemModel {
  /**
   * Sets the notes against the work order item
   */
  notes?: string
  /**
   * Sets the entity to charge the work order item to
   */
  chargeTo?: string
  /**
   * Sets the estimate of the work order item
   */
  estimate?: number // double
  /**
   * Sets the estimate type of the work order item
   */
  estimateType?: string
  /**
   * Sets the cost of the work order item
   */
  cost?: number // double
}
/**
 * Request body to update a works order
 */
export interface UpdateWorksOrderModel {
  /**
   * Sets the id of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * Sets the id of the property the work is for
   */
  propertyId?: string
  /**
   * Sets the id of the tenancy that originated the work
   */
  tenancyId?: string
  /**
   * Sets the id of the negotiator that booked the work
   */
  negotiatorId?: string
  /**
   * Sets the id of the type of work that needs to be performed
   */
  typeId?: string
  /**
   * Sets the status of the works order
   */
  status?: string
  /**
   * Sets the description of the works order
   */
  description?: string
  /**
   * Sets the person who reported the fault
   */
  reporter?: string
  /**
   * Sets the date the works order was booked
   */
  booked?: string // date-time
  /**
   * Sets the date the works order is required
   */
  required?: string // date-time
  /**
   * Sets the date the works order was completed
   */
  completed?: string // date-time
  /**
   * Sets a JSON fragment to attach to this works order as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * Model representing the physical address of a building or premise
 */
export interface VendorContactAddressModel {
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
 * Model representing a single contact detail (eg mobile telephone number)
 */
export interface VendorContactCommunicationModel {
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
 * Model representing the details of a contact relationship associated with a vendor entity
 */
export interface VendorContactRelationshipModel {
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
   * Gets a collection of the contacts communication details
   * Eg. Email address, mobile number, landline
   */
  communications?: {
    /**
     * Gets the label representing the type of detail (eg E-mail)
     */
    label?: string
    /**
     * Gets the contact detail (eg the actual telephone number or email address)
     */
    detail?: string
  }[]
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
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Model representing a vendor
 */
export interface VendorModel {
  /**
   * Gets the vendors unique identfier
   */
  id?: string
  /**
   * Gets the datetime when the vendor was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the vendor was last modified
   */
  modified?: string // date-time
  /**
   * Gets the date and time that the vendor was last called
   */
  lastCall?: string // date-time
  /**
   * Gets the date and time that the vendor will be called next
   */
  nextCall?: string // date-time
  /**
   * Gets the type of vendor
   */
  typeId?: string
  /**
   * Gets the vendors reason for selling
   */
  sellingReasonId?: string
  /**
   * Gets the unique identifier of the vendors solicitor
   */
  solicitorId?: string
  /**
   * Gets a collection of contact entities attached to this vendor
   * The primary contact will always appear first in the collection
   */
  contacts?: {
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
     * Gets a collection of the contacts communication details
     * Eg. Email address, mobile number, landline
     */
    communications?: {
      /**
       * Gets the label representing the type of detail (eg E-mail)
       */
      label?: string
      /**
       * Gets the contact detail (eg the actual telephone number or email address)
       */
      detail?: string
    }[]
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
    readonly _links?: {
      [name: string]: {
        href?: string
      }
    }
    readonly _embedded?: {
      [name: string]: {}
    }
  }[]
  /**
   * Gets a listing of additional metadata that has been set against this vendor
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
/**
 * Outward facing model to display a work order item
 */
export interface WorksOrderItemModel {
  /**
   * Gets the unique identifier of the works order item
   */
  id?: string
  /**
   * Gets the unique identifier of the works order
   */
  worksOrderId?: string
  /**
   * Gets the datetime when the works order item was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the works order item was last modified
   */
  modified?: string // date-time
  /**
   * Gets the notes of the work order item
   */
  notes?: string
  /**
   * Gets the entity type to charge to (Landlord, Tenant)
   */
  chargeTo?: string
  /**
   * Gets the estimate of the work order item
   */
  estimate?: number // double
  /**
   * Gets the work order items estimate type (Agent, Verbal, Written)
   */
  estimateType?: string
  /**
   * Gets the cost of the work order item
   */
  cost?: number // double
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
export interface WorksOrderModel {
  /**
   * Gets the unique identifier of the works order
   */
  id?: string
  /**
   * Gets the datetime when the works order was created
   */
  created?: string // date-time
  /**
   * Gets the date and time that the works order was last modified
   */
  modified?: string // date-time
  /**
   * Gets the id of the company that has been selected to perform the work
   */
  companyId?: string
  /**
   * Gets the id of the property the work is for
   */
  propertyId?: string
  /**
   * Gets the id of the tenancy that originated the work
   */
  tenancyId?: string
  /**
   * Gets the id of the negotiator that booked the work
   */
  negotiatorId?: string
  /**
   * Gets the id of the type of work that needs to be performed
   */
  typeId?: string
  /**
   * Gets the status of the works order
   */
  status?: string
  /**
   * Gets the description of the works order
   */
  description?: string
  /**
   * Gets the person who reported the fault
   */
  reporter?: string
  /**
   * Gets the date the works order was booked
   */
  booked?: string // date-time
  /**
   * Gets the date the works order is requried
   */
  required?: string // date-time
  /**
   * Gets the date the works order is completed
   */
  completed?: string // date-time
  /**
   * Gets a listing of additional metadata that has been set against this works order
   */
  metadata?: {
    [name: string]: {}
  }
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
