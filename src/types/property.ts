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
  geolocation?: CreatePropertyGeolocationModel
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
  address?: CreatePropertyAddressModel
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
  epc?: CreatePropertyEpcModel
  /**
   * Sets the external area
   */
  externalArea?: CreatePropertyExternalAreaModel
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: CreatePropertyInternalAreaModel
  /**
   * Sets the sales specific details of the property
   */
  selling?: CreatePropertySellingModel
  /**
   * Sets the letting specific details of the property
   */
  letting?: CreatePropertyLettingModel
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
  rooms?: CreatePropertyRoomModel[]
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
    [name: string]: any
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
  tenure?: CreatePropertyTenureModel
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
export interface LinkModel {
  href?: string
}
export interface PagedResultPropertyModel_ {
  _embedded?: PropertyModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
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
  geolocation?: PropertyGeolocationModel
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
   * Gets the address of the property
   */
  address?: PropertyAddressModel
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
  externalArea?: PropertyExternalAreaModel
  /**
   * Gets details of the internal dimensions of the property
   */
  internalArea?: PropertyInternalAreaModel
  /**
   * Gets details of the EPC statistics
   */
  epc?: PropertyEpcModel
  /**
   * Gets the sales specific details of the property
   */
  selling?: PropertySellingModel
  /**
   * Gets the lettings specific details of the property
   */
  letting?: PropertyLettingModel
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
  rooms?: PropertyRoomModel[]
  /**
   * Gets the properties office ids
   */
  officeIds?: string[]
  /**
   * Gets a listing of additional metadata that has been set against this property
   */
  metadata?: {
    [name: string]: any
  }
  readonly _links?: {
    [name: string]: LinkModel
  }
  readonly _embedded?: {
    [name: string]: any
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
  tenure?: PropertyTenureModel
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
  geolocation?: UpdatePropertyGeolocationModel
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
  address?: UpdatePropertyAddressModel
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
  epc?: UpdatePropertyEpcModel
  /**
   * Sets the external area
   */
  externalArea?: UpdatePropertyExternalAreaModel
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: UpdatePropertyInternalAreaModel
  /**
   * Sets the sales specific details of the property
   */
  selling?: UpdatePropertySellingModel
  /**
   * Sets the letting specific details of the property
   */
  letting?: UpdatePropertyLettingModel
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
  rooms?: UpdatePropertyRoomModel[]
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
    [name: string]: any
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
  tenure?: UpdatePropertyTenureModel
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
