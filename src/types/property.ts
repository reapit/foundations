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
export interface CreateAddressModel {
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
  geolocation?: CreateGeolocationModel
}
export interface CreateEpcModel {
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
export interface CreateExternalAreaModel {
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
export interface CreateGeolocationModel {
  /**
   * Sets the latitude coordinate of the coordinate pair
   */
  latitude?: number // double
  /**
   * Sets the longitude coordinate of the coordinate pair
   */
  longitude?: number // double
}
export interface CreateInternalAreaModel {
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
export interface CreateLettingModel {
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
  address?: CreateAddressModel
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
  epc?: CreateEpcModel
  /**
   * Sets the external area
   */
  externalArea?: CreateExternalAreaModel
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: CreateInternalAreaModel
  /**
   * Sets the sales specific details of the property
   */
  selling?: CreateSellingModel
  /**
   * Sets the letting specific details of the property
   */
  letting?: CreateLettingModel
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
  rooms?: CreateRoomModel[]
  /**
   * Sets the relationships of the property
   */
  relationships?: CreateRelationshipModel[]
  /**
   * Sets a JSON fragment to attach to this property as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
export interface CreateRelationshipModel {
  id?: string
  type?: string
}
export interface CreateRoomModel {
  name?: string
  dimensions?: string
  description?: string
}
export interface CreateSellingModel {
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
  tenure?: CreateTenureModel
}
export interface CreateTenureModel {
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
 * A model to represent the details of an EPC graph
 */
export interface EpcModel {
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
export interface ExternalAreaModel {
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
/**
 * A model to represent internal area of a propeerty
 */
export interface InternalAreaModel {
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
export interface LettingModel {
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
export interface LinkModel {
  rel?: string
  href?: string
  action?: string
}
export interface PagedResultPropertyModel_ {
  data?: PropertyModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}
export interface ProblemDetails {
  name: string
  type?: string
  title?: string
  status?: number // int32
  detail?: string
  instance?: string
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
  address?: AddressModel
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
  externalArea?: ExternalAreaModel
  /**
   * Gets details of the internal dimensions of the property
   */
  internalArea?: InternalAreaModel
  /**
   * Gets details of the EPC statistics
   */
  epc?: EpcModel
  /**
   * Gets the sales specific details of the property
   */
  selling?: SellingModel
  /**
   * Gets the lettings specific details of the property
   */
  letting?: LettingModel
  /**
   * Gets the property types
   */
  type?: string
  /**
   * Gets the property style
   */
  style?: string
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
  rooms?: RoomModel[]
  /**
   * Gets a collection of entities that are related to this property
   * This is usually the managing negotiators and offices
   */
  relationships?: RelationshipModel[]
  /**
   * Gets a listing of additional metadata that has been set against this contact
   */
  metadata?: {
    [name: string]: {}
  }
  readonly links?: LinkModel[]
}
/**
 * Model representing an entity that is related to the property
 */
export interface RelationshipModel {
  /**
   * Gets the identifier of the related entity
   */
  id?: string
  /**
   * Gets the type of relationship
   */
  type?: string
}
/**
 * Model representing a room in a property
 */
export interface RoomModel {
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
export interface SellingModel {
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
  tenure?: TenureModel
}
/**
 * Model representing the sales tenure of a property
 */
export interface TenureModel {
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
export interface UpdateAddressModel {
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
  geolocation?: UpdateGeolocationModel
}
/**
 * A model used to update the details of an EPC graph
 */
export interface UpdateEpcModel {
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
export interface UpdateExternalAreaModel {
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
export interface UpdateGeolocationModel {
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
export interface UpdateInternalAreaModel {
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
export interface UpdateLettingModel {
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
  address?: UpdateAddressModel
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
  epc?: UpdateEpcModel
  /**
   * Sets the external area
   */
  externalArea?: UpdateExternalAreaModel
  /**
   * Sets details of the internal dimensions of the property
   */
  internalArea?: UpdateInternalAreaModel
  /**
   * Sets the sales specific details of the property
   */
  selling?: UpdateSellingModel
  /**
   * Sets the letting specific details of the property
   */
  letting?: UpdateLettingModel
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
  rooms?: UpdateRoomModel[]
  /**
   * Sets the relationships of the property
   */
  relationships?: UpdateRelationshipModel[]
  /**
   * Sets a JSON fragment to attach to this property as metadata
   */
  metadata?: {
    [name: string]: {}
  }
}
/**
 * A model used to update the negotiator and office relationships associated to a property
 */
export interface UpdateRelationshipModel {
  id?: string
  type?: string
}
/**
 * A model used to update or add a room attached to a property
 */
export interface UpdateRoomModel {
  name?: string
  dimensions?: string
  description?: string
}
/**
 * A model used to update the selling information associated to a property
 */
export interface UpdateSellingModel {
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
  tenure?: UpdateTenureModel
}
/**
 * A model used to update the tenure information about a property
 */
export interface UpdateTenureModel {
  /**
   * Sets the type of tenure that applies to this property
   */
  type?: string
  /**
   * Sets tenure expiration date
   */
  expiry?: string // date-time
}
