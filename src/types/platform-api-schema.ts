/**
 * AddStore representation
 */
export interface AddStoreModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The code of the associated entity whose type is defined in TypeFrom
   */
  codeFrom?: string
  /**
   * The code of the associated entity whose type is defined in TypeTo
   */
  codeTo?: string
  /**
   * Type of record this entity links from
   */
  typeFrom?: string
  /**
   * Type of record this entity links to
   */
  typeTo?: string
  /**
   * Additional information about this entity
   */
  vars?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Appliance representation
 */
export interface ApplianceModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of property to which Appliance relates
   */
  prpCode?: string
  /**
   * Code of Appliance type
   */
  typeCode?: string
  /**
   * Code of safety certificate for Appliance
   */
  certCode?: string
  /**
   * Date Appliance was purchased
   */
  purchase?: string // date-time
  /**
   * Date warranty expires
   */
  warrExp?: string // date-time
  /**
   * Free entry notes field
   */
  notes?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * ApplianceType representation
 */
export interface ApplianceTypeModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Not currently used
   */
  category?: string
  /**
   * Appliance type description, e.g. Gas cooker
   */
  descr?: string
  /**
   * Appliance make
   */
  make?: string
  /**
   * Appliance model
   */
  model?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Applicant representation
 */
export interface ApplicantModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Applicant requirement type: S - Sales | L - Lettings
   */
  type?: string
  /**
   * Code of main office at which this applicant is registered
   */
  offCode?: string
  /**
   * Department code
   */
  depCode?: string
  /**
   * Code of applicant's owning negotiator
   */
  negCode?: string
  /**
   * Unique identifier code of contact
   */
  cntCode?: string
  /**
   * True if applicant is still looking to buy/rent
   */
  active?: boolean
  /**
   * Number of weeks from register date before applicant expires
   */
  weeks?: number // int32
  /**
   * General requirement notes
   */
  notes?: string
  /**
   * Applicant source of enquiry code
   */
  srcCode?: string
  /**
   * Minimum required weekly rent in system currency
   */
  minRent?: number // double
  /**
   * Maximum required weekly rent in system currency
   */
  maxRent?: number // double
  /**
   * Minimum required price
   */
  minPrice?: number // int32
  /**
   * Maximum required price
   */
  maxPrice?: number // int32
  /**
   * Area requirement type P = Postcodes/Addresses, L = Areas, N = None
   */
  pln?: string
  /**
   * List of area/address requirements
   */
  locCode?: string
  /**
   * Attribute column 1 value
   */
  or1?: number // int32
  /**
   * Attribute column 2 value
   */
  or2?: number // int32
  /**
   * Attribute column 3 value
   */
  or3?: number // int32
  /**
   * Attribute column 4 value
   */
  or4?: number // int32
  /**
   * Attribute column 5 value
   */
  or5?: number // int32
  /**
   * Attribute column 6 value
   */
  or6?: number // int32
  /**
   * Attribute column 7 value
   */
  and1?: number // int32
  /**
   * Number of double bedrooms
   */
  num1?: number // int32
  /**
   * Maximum number of double bedrooms
   */
  num1to?: number // int32
  /**
   * Number of single bedrooms
   */
  num2?: number // int32
  /**
   * Maximum number of single bedrooms
   */
  num2to?: number // int32
  /**
   * Number of reception rooms
   */
  num3?: number // int32
  /**
   * Maximum number of reception rooms
   */
  num3to?: number // int32
  /**
   * Number of bathrooms
   */
  num4?: number // int32
  /**
   * Maximum number of bathrooms
   */
  num4to?: number // int32
  /**
   * Total number of bedrooms
   */
  totalNum?: number // int32
  /**
   * Max total number of bedrooms
   */
  totalNumTo?: number // int32
  /**
   * Furnishings value
   */
  furnished?: number // int32
  /**
   * Property minimum square footage/Applicant minimum required square footage
   */
  feet?: number // int32
  /**
   * Property maximum square footage/Applicant maximum required square footage
   */
  feetTo?: number // int32
  /**
   * Codes of offices and negotiators sharing this applicant
   */
  shared?: string
  /**
   * Date on which applicant was last contacted
   */
  lastCall?: string // date-time
  /**
   * Date by which applicant should next be contacted
   */
  nextCall?: string // date-time
  /**
   * Cumulative tenure requirement 1 = Freehold, 2 = Share of freehold, 4 = Leasehold
   */
  tenure?: number // int32
  /**
   * Minimum required lease term in years
   */
  minLease?: number // int32
  /**
   * Maximum required lease term in years
   */
  maxLease?: number // int32
  /**
   * Lettings tenure value 1 - Long let 2 - Short let
   */
  letTenure?: number // int32
  /**
   * Decoration value
   */
  decoration?: number // int32
  /**
   * Applicant buying/selling position and buying reason codes
   */
  position?: string
  /**
   * True if applicant is prepared to pay agent's fee to find property Matches against properties marked as 'clients only'
   */
  retain?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Appointment representation
 */
export interface AppointmentModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Number of days/weeks/months/years after which this entry should recur
   */
  freq?: number // int32
  /**
   * Date this entry stops recurring
   */
  expiry?: string // date-time
  /**
   * Date and time of this entry
   */
  dateTime?: string // date-time
  /**
   * Date by which this entry should be followed up
   */
  fuDate?: string // date-time
  /**
   * Type of period after which this entry should recur D - Days W - Weeks M - Months Y - Years
   */
  freqType?: string
  /**
   * Code of associated app/lld/cnt record
   */
  tableCode?: string
  /**
   * Table in which associated record resides app - Applicant lld - Landlord cnt - Contact ten - Tenancy
   */
  tableType?: string
  /**
   * Accompanying negotiator code
   */
  negCode?: string
  /**
   * Code of office to which this entry relates
   */
  offCode?: string
  /**
   * Main entry comments
   */
  entry?: string
  /**
   * Type of this diary entry: AP - Appointment | CI - Check In | CO - Check Out | ES - EPC Survey | FA - Financial Services Appointment | HV - Open House Viewing | HY - Holiday | IA - Instruction Appointment | ME - Meeting | MI - Miscellaneous | OH - Open House | PI - Property Inspection | PL - Property Launch | RV - RICS Valuation | RR - Rent Review | SY - Survey | VL - Valuation/Market Appraisal | VW - Viewing
   */
  type?: string
  /**
   * Follow up notes
   */
  followUp?: string
  /**
   * Code of property associated with this diary entry
   */
  prpCode?: string
  /**
   * True if this appointment has been confirmed by all attendees
   */
  confirmed?: boolean
  /**
   * True if this appointment has been cancelled
   */
  cancelled?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Area representation
 */
export interface AreaModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Area name
   */
  name?: string
  /**
   * Numeric value (1 - 9) representing this area's level in the hierarchy 1 = Area | 2 = Group | 3 = Super Group etc.
   */
  level?: number // int32
  /**
   * List of area codes/postcodes contained within this area. In a system configured to use longitude/latitude area polygons,
   * this field will contain a list of coordinates that form the boundary of this area
   */
  areas?: string
  /**
   * List of office codes for which this area is visible by default
   */
  offCodes?: string
  /**
   * List of department codes for which this area is visible by default
   */
  depCodes?: string
  /**
   * The minimum latitude from the coordinates that form the boundary of this area
   */
  minLat?: number // double
  /**
   * The maximum latitude from the coordinates that form the boundary of this area
   */
  maxLat?: number // double
  /**
   * The minimum longitude from the coordinates that form the boundary of this area
   */
  minLng?: number // double
  /**
   * The maximum longitude from the coordinates that form the boundary of this area
   */
  maxLng?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * AuctionLotFee representation
 */
export interface AuctionLotFeeModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date on which this fee was registered against the auction lot
   */
  date?: string // date-time
  /**
   * The code of the lot that this fee applies to
   */
  lotCode?: string
  /**
   * Fee Description
   */
  descr?: string
  /**
   * The type of fee (i.e. who it is charged to): V = Vendor | B = Buyer | C = Company
   */
  feeType?: string
  /**
   * Fee (percentage)
   */
  fee?: number // double
  /**
   * Fixed fee
   */
  fixedFee?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * AuctionLot representation
 */
export interface AuctionLotModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date and time of the lot (only available for single lots as lots linked to an auction will inherit the date/time from the auction)
   */
  dateTime?: string // date-time
  /**
   * The code of the auction this lot is linked to in a multi-lot auction
   * This field will not be populated for single lot auctions for a single property
   */
  auctCode?: string
  /**
   * S - single lot, not part of an auction | M - multi lot, part of an auction (and auctCode will be that auction)
   */
  type?: string
  /**
   * The code of the property that the lot is for
   */
  prpCode?: string
  /**
   * The lot number in the auction
   */
  lotNumber?: string
  /**
   * The status of the property in the auction | FS - For Sale | SA - Sold at Auction | SL - Sold but as part of another lot | SP - Sold Pre-Auction | SO - Sold Post-Auction | US - Unsold (reserve not met) | WD - Withdrawn
   */
  status?: string
  /**
   * Code of negotiator who created this entry
   */
  negCode?: string
  /**
   * Reserve price for the lot
   */
  resvPrice?: number // int32
  /**
   * Buyer deposit needed
   */
  buyerDep?: number // int32
  /**
   * The guide price from value
   */
  guidePrFr?: number // int32
  /**
   * The guide price to value
   */
  guidePrTo?: number // int32
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Auction representation
 */
export interface AuctionModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date and time that the auction is due to take place
   */
  dateTime?: string // date-time
  /**
   * The code of the company that is the auction venue
   */
  venueCode?: string
  /**
   * Code of negotiator auctioneer for the record
   */
  auctCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * BankAccount representation
 */
export interface BankAccountModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Bank name
   */
  name?: string
  /**
   * Bank branch name
   */
  branch?: string
  /**
   * Account name
   */
  acName?: string
  /**
   * Account number
   */
  acNo?: string
  /**
   * Sort code
   */
  sort?: string
  /**
   * Reference for automated BACS payments
   */
  bacsRef?: string
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * House number
   */
  hseNo?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 3
   */
  address3?: string
  /**
   * Address line 4
   */
  address4?: string
  /**
   * Postcode
   */
  postCode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * Flag denoting whether this bank account is a contact's primary/ default account
   */
  main?: boolean
  /**
   * When bank approvals are enabled, flag denoting current approval status of this bank account (otherwise false)
   */
  approved?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Certification representation
 */
export interface CertificationModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of property to which this certificate applies
   */
  prpCode?: string
  /**
   * Code of company which provides this certificate
   */
  cmpCode?: string
  /**
   * Certificate category: S = Safety Certificate | I = Insurance Policy | W = Warranty
   */
  category?: string
  /**
   * Certificate type: AI - Appliance Insurance | BI - Buildings Insurance | CI - Contents Insurance | ES - Electrical Safety | EP - Emergency Plumbing | GS - Gas Safety | LW - Labour Only Warranty | MW - Manufacturers Warranty | PT - PAT Test | FS - Soft Furnishings Safety | SA - System and Appliance Insurance | SI - System Insurance
   */
  type?: string
  /**
   * General notes for this certificate
   */
  notes?: string
  /**
   * Date from which this certificate is valid
   */
  startDate?: string // date-time
  /**
   * Date that this certificate expires
   */
  endDate?: string // date-time
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * ClientAccount representation
 */
export interface ClientAccountModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Date that this account was last reconciled
   */
  statTo?: string // date-time
  /**
   * Client Account name
   */
  name?: string
  /**
   * Reference code of associated bank account details
   */
  bank?: string
  /**
   * Reference code of sweep account providing interest for deposits in client account
   */
  sweepAc?: string
  /**
   * Reference code of associated bank company
   */
  cmpCode?: string
  /**
   * The type of client account
   * P - Primary | W - Sweep | D - Deposit | T - Trust Account - Marketing | S - Trust Account - Sales | [Blank] - Secondary
   */
  type?: string
  /**
   * Balance of client account used in three way reconciliation
   */
  balance?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * ConfigurationSetting representation
 */
export interface ConfigurationSettingModel {
  /**
   * The system name of this configuration setting
   */
  name?: string
  /**
   * The value of this configuration setting
   */
  value?: string
  /**
   * The type of level at which this configuration setting was applied
   */
  appliedLevel?: string
}
/**
 * Contact representation
 */
export interface ContactModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * House number
   */
  hseNo?: string
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 3
   */
  address3?: string
  /**
   * Address line 4
   */
  address4?: string
  /**
   * Postcode
   */
  postcode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * True if contact is active
   */
  active?: boolean
  /**
   * Contact title
   */
  title?: string
  /**
   * Contact initials
   */
  initials?: string
  /**
   * Contact surname
   */
  surname?: string
  /**
   * Code of office to which this contact is assigned
   */
  offCode?: string
  /**
   * Code of negotiator to whom this contact is assigned
   */
  negCode?: string
  /**
   * Company name
   */
  cmpName?: string
  /**
   * Contact details
   */
  phone?: string
  /**
   * List of CntCategory codes which apply to this contact
   */
  type?: string
  /**
   * Contact source code
   */
  srcCode?: string
  /**
   * List office and negotiator codes to denote shared ownership of the record
   */
  shared?: string
  /**
   * Marketing consent: 0 = not asked | 1 = given | 2 = denied When determining whether can market 1 and 2 are explicit. When value is 0 then consent is inferred based on system config. A value can be set which means all contacts with 0 grant marketing. If this is not set then any contact registered before a configured GDPR start date will grant marketing, and any contact registered on or after this date will deny marketing
   */
  mktConsent?: number // int32
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * ContactRelationship representation
 */
export interface ContactRelationshipModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The code associated with the entity at one side of this relationship
   */
  codeFrom?: string
  /**
   * The code associated with the entity at the other side of this relationship
   */
  codeTo?: string
  /**
   * The type of the associated entity at one side of this relationship. CNT - Contact | CMP - Company
   */
  typeFrom?: string
  /**
   * The type of the associated entity at the other side of this relationship. CNT - Contact | CMP - Company
   */
  typeTo?: string
  /**
   * The type of relationship between the two associated entities.
   * BP - Business Partner | PC - Parent&gt;Child | CL - Colleague | EX - Ex-Partner | FR - Friend | RE - Other Relative | PA - Partner | SB - Sibling | SP - Spouse
   */
  relType?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * DefaultFee representation
 */
export interface DefaultFeeModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Fee Type: LG - Landlord General | LI - Landlord Initial | TG - Tenant General | TI - Tenant Initial | VI - Vendor Initial | VG - Vendor General | BI - Buyer Initial | BG - Buyer General
   */
  type?: string
  /**
   * The description of the fee
   */
  descr?: string
  /**
   * The code of the tax descriptor that should apply to this fee (accessible from the VatRates endpoint)
   */
  vatCode?: string
  /**
   * The code of the nominal account that monies collected for this fee are assigned to
   */
  nomCode?: string
  /**
   * The default fee amount
   */
  amount?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Department representation
 */
export interface DepartmentModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Department name
   */
  name?: string
  /**
   * Applicant to property match letter text
   */
  matchLet1?: string
  /**
   * Property to applicant match letter text
   */
  matchLet2?: string
  /**
   * Title of attribute column 1
   */
  orTitle1?: string
  /**
   * Title of attribute column 2
   */
  orTitle2?: string
  /**
   * Title of attribute column 3
   */
  orTitle3?: string
  /**
   * Title of attribute column 4
   */
  orTitle4?: string
  /**
   * Title of attribute column 5
   */
  orTitle5?: string
  /**
   * Title of attribute column 6
   */
  orTitle6?: string
  /**
   * Title of attribute column 7
   */
  andTitle?: string
  /**
   * List of attribute names in attribute column 1
   */
  orList1?: string
  /**
   * List of attribute names in attribute column 2
   */
  orList2?: string
  /**
   * List of attribute names in attribute column 3
   */
  orList3?: string
  /**
   * List of attribute names in attribute column 4
   */
  orList4?: string
  /**
   * List of attribute names in attribute column 5
   */
  orList5?: string
  /**
   * List of attribute names in attribute column 6
   */
  orList6?: string
  /**
   * List of attribute names in attribute column 7
   */
  andList?: string
  /**
   * Single bedrooms caption
   */
  numTitle1?: string
  /**
   * Double bedrooms caption
   */
  numTitle2?: string
  /**
   * Reception rooms caption
   */
  numTitle3?: string
  /**
   * Bathrooms caption
   */
  numTitle4?: string
  /**
   * Total bedrooms caption
   */
  numTitleTotal?: string
  /**
   * Tenure caption
   */
  tenTitle?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Document representation
 */
export interface DocumentModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Name of database table in which to find associated record
   */
  tblName?: string
  /**
   * Code of record to which this File is associated
   */
  tblCode?: string
  /**
   * Type of File: BCS - BACS File | BPY - BPAY File | CRT - Certificate | EPC - EPC Document | INV - Invoice | LET - Letter | LIN - Landlord Invoice | REC - Receipt RPT - Report | STM - Statement | TIN - Tenant Invoice | WKO - Works Order
   */
  type?: string
  /**
   * Original filename
   */
  fileName?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Extra representation
 */
export interface ExtraModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of applicant/contact associated with this record
   */
  appCode?: string
  /**
   * Code of property associated with this record
   */
  prpCode?: string
  /**
   * Entry type: AD - Advertisement | AH - Previous advertisement | BI - Business interest | CL - Saved contact search results | CM - Collated match record | DP - Development phase | FU - Follow up entry for journal or advertising | II - Invoice item | IN - Invoice | LR - Contact code of tenant reference | PB - Pre-booked advertisement | PA - Payment on account | PY - Payment | RM - Property room information | RP - Pre-defined report | SI - Development site office details | SM - Saved match record | SR - Saved report results
   */
  type?: string
  /**
   * Additional information about this entity
   */
  vars?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Contact IdCheck representation
 */
export interface IdCheckModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date the contact's ID was checked
   */
  checkDate?: string // date-time
  /**
   * The date and time that the first provided Id expires
   */
  id1Expire?: string // date-time
  /**
   * The date and time that the second provided Id expires
   */
  id2Expire?: string // date-time
  /**
   * Code of the contact that this Id check applies to
   */
  cntCode?: string
  /**
   * The status of this Id check
   */
  status?: string
  /**
   * The type of Id document provided for the first Id
   * PP - Passport | DL - *Driving Licence | NI - *National ID Card | BC - Birth certificate |
   * BB - Benefit book | ER - Electoral Roll | NC - Naturalisation certificate | FC - Firearms Certificate |
   * TX - Current tax bill | RF - Reference | CR - Correspondence | UT - Utility Bill | CI - Certificate of Incorporation
   */
  id1Type?: string
  /**
   * The type of Id document provided for the second Id
   * PP - Passport | DL - *Driving Licence | NI - *National ID Card | BC - Birth certificate |
   * BB - Benefit book | ER - Electoral Roll | NC - Naturalisation certificate | FC - Firearms Certificate |
   * TX - Current tax bill | RF - Reference | CR - Correspondence | UT - Utility Bill | CI - Certificate of Incorporation
   */
  id2Type?: string
  /**
   * The code of the negotiator who carried out the Id check
   */
  negCode?: string
  regCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * InternetRegistration representation
 */
export interface InternetRegistrationModel {
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Unique identifier code
   */
  ref?: number // int32
  /**
   * House number
   */
  hseNo?: string
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 3
   */
  address3?: string
  /**
   * Address line 4
   */
  address4?: string
  /**
   * Postcode
   */
  postCode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * The source of this Internet Registration
   */
  source?: string
  /**
   * Office code related to this entity
   */
  offCode?: string
  /**
   * A comma separated list of codes of properties this Internet Registration relates to
   */
  prpCodes?: string
  /**
   * The title of the person making the enquiry
   */
  title?: string
  /**
   * The initials or first name of the person making the enquiry
   */
  initials?: string
  /**
   * The surname of the person making the enquiry
   */
  surname?: string
  /**
   * The contact details of the person making the enquiry
   */
  phone?: string
  /**
   * Any additional notes that have been provided by the person making the enquiry
   */
  notes?: string
  /**
   * The position/type relating to this Internet Registration
   * Blank - Buyer/Tenant enquiry | V - Valuation enquiry | OM - Has property to sell that is on the market already
   * OF - Has property to sell that is not yet on the market
   */
  position?: string
  /**
   * The state of the Internet Registration after a negotiator has processed it
   * Blank - Not yet processed | A - Added | R - Rejected | D - Already in RPS | M/N - Duplicate | S - Spam
   */
  action?: string
  /**
   * The marketing type of this enquiry
   * Blank - Unknown | S - Sales | L - Lettings
   */
  type?: string
  /**
   * The lower bound of the price range the person making the enquiry is willing to pay for a sales/lettings property
   */
  minPrice?: number // int32
  /**
   * The upper bound of the price range the person making the enquiry is willing to pay for a sales/lettings property
   */
  maxPrice?: number // int32
  /**
   * The number of bedrooms the person making the enquiry is looking for in their property
   */
  ag5?: number // int32
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * InvoiceDetail representation
 */
export interface InvoiceDetailModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The invoice object this detail line relates to
   */
  invCode?: string
  /**
   * VAT code associated with this record
   */
  vatCode?: string
  /**
   * Invoice Detail Description
   */
  descr?: string
  /**
   * Code of the property for the record
   */
  prpCode?: string
  /**
   * Code of negotiator who added the detail item
   */
  negCode?: string
  /**
   * Code of advert (in extra table)
   */
  adCode?: string
  /**
   * Invoice item account type
   */
  accType?: string
  /**
   * Net cost
   */
  netAmt?: number // double
  /**
   * VAT amount
   */
  vatAmt?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
}
/**
 * InvoiceHeader representation
 */
export interface InvoiceHeaderModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * House number
   */
  hseNo?: string
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 3
   */
  address3?: string
  /**
   * Address line 4
   */
  address4?: string
  /**
   * Postcode
   */
  postCode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * Invoice date
   */
  date?: string // date-time
  /**
   * Invoice Due Date
   */
  dueDate?: string // date-time
  /**
   * The type of the invoice: BD - Buyer Deposit | CR - Credit Note | IN - Invoice | PA - Payment on Account | PP - Pre-paid advertising | PX - Returned Payment | PY - Payment
   */
  type?: string
  /**
   * Code of the property for the record
   */
  prpCode?: string
  /**
   * Code of negotiator for the record
   */
  negCode?: string
  /**
   * Reference for invoice
   */
  invRef?: string
  /**
   * Status of invoice (used mainly for reporting): PE - Pending/Draft | RA - Raised/Posted | PP - Part Paid | FP - Fully Paid | CR - Credited | PC - Part Credited
   */
  status?: string
  /**
   * Invoice Description
   */
  descr?: string
  /**
   * Send To details of who the invoice is sent to (usually company or person name)
   */
  sendTo?: string
  /**
   * Send To Attention details of who the invoice is sent to (usually used when invoicing a company and an attention is required. Appears above the Send To line.)
   */
  sendToAttn?: string
  /**
   * Code of the invoice this is paying off (used for credit notes and payments)
   */
  invPayCode?: string
  /**
   * Has the invoice been raised?
   */
  raised?: boolean
  /**
   * NET amount
   */
  netAmt?: number // double
  /**
   * VAT amount
   */
  vatAmt?: number // double
  /**
   * Outstanding amount
   */
  osAmt?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * JournalEntry representation
 */
export interface JournalEntryModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Code of property associated with this entry
   */
  prpCode?: string
  /**
   * Code of negotiator who created this entry
   */
  negCode?: string
  /**
   * Type of this journal entry: AC - Accounts Note | AD - Advertising | AE - Application Received | AL - Arrears Letter | AN - Arrears Note | AR - Applicant Registered | AP - Appointment | BC - Bank Details Changed | BS - Brochure Sent | CC - (Marketing) Consent Changed | CG - (Marketing) Consent Given | CR - Contract Requested | DA - Archive/Delete | DC - Detail Change | DS - Details Sent | EH - Employment History | EM - E-mail | ES - EPC Survey | FA - Financial Services Appointment | HY - Holiday | IA - Instruction Appointment | LA - Lettings Status to Arranging Tenancy | LC - Lettings Status to Current Tenancy | LD - Lettings Status to Sold | LE - Letter Sent | LF - Lettings Status to Tenancy Finished | LM - Left Messsage | LO - Lettings Status to Let by other agent | LP - Lettings Status to Let privately | LR - Lettings Status to Provisional | LS - Lettings Status to Under Offer | LT - Lettings Status to To Let | LV - Lettings Status to Coming to Market/Market Appraisal/Valuation | LW - Lettings Status to Withdrawn | LX - Lettings Status to Tenancy Cancelled | MA - Match | ME - Meeting | MI - Miscellaneous | ML - Mailing MN - Management Note | NI - Note of Interest | NI - Note of Interest Withdrawn | NM - Not Matched | OF - New Offer | ON - Offer Note | OP - Offer Pending | OA - Offer Accepted | OR - Offer Rejected | OW - Offer Withdrawn | OU - Offer Update | FR - Offer Fall Through (Rejected) | FW - Offer Fall Through (Withdrawn) | FP - Offer Fall Through (Pending) | PC - Price Change | PD - Price Reduction | PH - Telephone/Contact | PL - Property Launch | PR - Property Registered | RE - Reserved | RF - Referral | RH - Reservation Holding | RV - RICS Valuation | RW - Reservation Withdrawn | SC - Sales Status to Completed | SE - Sales Status to Sold Externally | SF - Sales Status to For Sale | SP - Sales Status to Introduction/Pre Appraisal | SS - Sales Status to Under Offer/Sold STC/Reserved | SV - Sales Status to Valuation/Market Appraisal | SW - Sales Status to Withdrawn | SX - Sales Status to Exchanged | SY - Survey | TA - Arranging Tenancy | TC - Current Tenancy | TF - Tenancy Finished | TX - Tenancy Cancelled | TK - Task
   */
  entryType?: string
  /**
   * Type of record associated with this entry: app - Applicant | lld - Landlord | cnt - Contact
   */
  tableType?: string
  /**
   * Entry text
   */
  entry?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Landlord representation
 */
export interface LandlordModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Unique identifier code of contact
   */
  cntCode?: string
  /**
   * General notes
   */
  notes?: string
  /**
   * Deduct tax from landlord payments: Y - Yes | N - No
   */
  deductTax?: string
  /**
   * True if landlord is inactive
   */
  inActive?: boolean
  /**
   * Preferred client account for landlord transactions
   */
  clientAc?: string
  /**
   * Office Code
   */
  offCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Represents a HyperMedia Link in
 */
export interface LinkModel {
  /**
   * The relationship being described
   */
  rel?: string
  /**
   * The hyperlink URI
   */
  href?: string
  /**
   * The HTTP verb to be issued
   */
  action?: string
}
/**
 * A class to provide a lookup along with a name and description
 */
export interface LookupListModel {
  /**
   * Name of the lookup list
   */
  name?: string
  /**
   * Description of the lookup
   */
  description?: string
  /**
   * Lookups converted to a dictionary format
   */
  lookups?: {
    [name: string]: string
  }
}
/**
 * Lookup representation
 */
export interface LookupModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Type of record this lookup is from
   */
  typeFrom?: string
  /**
   * Type of record this lookup points to
   */
  typeTo?: string
  /**
   * The code of the associated entity whose type is defined in TypeTo
   */
  codeTo?: string
  /**
   * The code of the associated entity whose type is defined in TypeFrom
   */
  codeFrom?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Message representation
 */
export interface MessageModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Task/message text
   */
  text?: string
  /**
   * Task type: AV - Now Available | ET - End of Tenancy | GC - Gas Certificate | MI - Miscellaneous | NQ - Notice to Quit | RD - Rent Demand | RE - Rent Due | RM - Reminder | SP - Sales Progression
   */
  type?: string
  /**
   * Code of negotiator to whom this message/task should be sent
   */
  tonCode?: string
  /**
   * Code of negotiator who sent this message/task
   */
  frnCode?: string
  /**
   * Associated landlord code
   */
  lldCode?: string
  /**
   * Associated property code
   */
  prpCode?: string
  /**
   * Associated applicant code
   */
  appCode?: string
  /**
   * Associated tenancy code
   */
  tenCode?: string
  /**
   * Date task should be activated
   */
  activate?: string // date-time
  /**
   * Date of completion of task
   */
  complete?: string // date-time
  /**
   * True if message has been read by recipient
   */
  isRead?: boolean
  /**
   * True if message has been read by recipient
   */
  cntCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Negotiator representation
 */
export interface NegotiatorModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Negotiator name
   */
  name?: string
  /**
   * Code of office at which this negotiator is a staff member
   */
  offCode?: string
  /**
   * Negotiator type
   */
  type?: string
  /**
   * Negotiator notes
   */
  notes?: string
  /**
   * Negotiator contact details
   */
  phone?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * NominalAccount representation
 */
export interface NominalAccountModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Name of nominal account
   */
  name?: string
  /**
   * True if nominal account can be linked to works orders
   */
  workOrd?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * NominalAllocation representation
 */
export interface NominalAllocationModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of first nominal transaction being allocated
   */
  tranFr?: string
  /**
   * Code of second nominal transaction being allocated
   */
  tranTo?: string
  /**
   * Reference code of the user creating the allocation
   */
  negCode?: string
  /**
   * Net amount of money being allocated
   */
  netAmt?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * NominalTransaction representation
 */
export interface NominalTransactionModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Date transaction raised
   */
  date?: string // date-time
  /**
   * Statement date used where transaction represents a movement of funds
   */
  statdate?: string // date-time
  /**
   * Transaction code denoting source of funds where transaction represents a transfer from another ledger (eg rent from tenant to landlord)
   */
  transfer?: string
  /**
   * Deposit - DEP | Invoice - INV | Payment - PAY | Credit Note Correction - CRN | Credit Note Repayment - CRP | Credit Note Refund - CRR | Credit Note Write off - CRW | Credit Note Good will payment - CRG | Debit Adjustment - ADR | Credit Adjustment - ACR | Journal - JNL | Transfer - TRN | Opening Balance DR - ODR | Opening Balance CR - OCR | Float - FLT | Reserve Funds - RES
   */
  type?: string
  /**
   * Landlord - L | Tenant - T | Agent - A | Supplier - S | Tax - X | Estate - E | Vendor - V | Buyer - B
   */
  ledger?: string
  /**
   * Advertising Charge - AD | Account Transfer - AT | Bank Charges - BC | Buyer Admin Fee - BA | Buyer Deposit - BD | Buyer Payment - BP | Deposit - DP | Deposit Deduction - DD | Deposit Refund - DR | Deposit Transfer - DT | Deposit Transfer to Agent - DA | Deposit Transfer to Landlord - DL | Deposit Transfer to Scheme - DS | Estate Payment - EP | Estate Service Charge - EC | Estate Works Order - WE | External Credit - ER | External Agent Fee - EF | Float - FL | Good will payment - GW | Introducing Tenant Fee - IF | Landlord Admin Fee - LA | Landlord Tax - LT | Landlord Payment - LP | Landlord to Supplier Payment - LS | Landlord Works Order - WL | Letting Fee - LF | Management Fee - MF | Payment Surcharge - SC | Receipt - RC | Rent - RE | Rent Guarantee - RG | Recovery Payment - RP | Tenant Admin Fee - TF | Tenant Payment - TP | Tenant to Landlord Payment - TL | Tenant to Supplier Payment - TS | Trust Accounting Invoice - TV | Tenant Works Order - WT | Vacant Management Fee - VF | Vendor Admin Fee - VA | Vendor Commission - VC | Vendor Payment - VP | Works Order Payment - WP
   */
  category?: string
  /**
   * Transaction narrative
   */
  descr?: string
  /**
   * Reference code of associated company (typically a supplier)
   */
  cmpCode?: string
  /**
   * Reference code of associated landlord
   */
  lldCode?: string
  /**
   * Reference code of associated tenancy
   */
  tenCode?: string
  /**
   * Reference code of associated property
   */
  prpCode?: string
  /**
   * Reference code of the user raising this transaction
   */
  negCode?: string
  /**
   * Double-entry debit nominal account code
   */
  drNom?: string
  /**
   * Double-entry credit nominal account code
   */
  crNom?: string
  /**
   * VAT code associated with this record
   */
  vatCode?: string
  /**
   * Invoice/internal reference - usage includes holding external supplier invoice numbers; transaction codes linking floats to landlord payment records; fee or rent invoice numbers
   */
  intRef?: string
  /**
   * Bankers Draft - BD | Bank Transfer - TF | Cash - CA | Cheque - CH | Credit Card - CC | Debit Card - DC | Direct Debit - DD | Housing Benefit - HB | Standing Order - SO
   */
  payType?: string
  /**
   * Awaiting Authorisation - A | Authorised - Awaiting posting - W | Posted - P | Rejected - R
   */
  authStat?: string
  /**
   * Nominal transaction code showing source of funds - used for clearance checking
   */
  payTran?: string
  /**
   * Unallocated amount
   */
  unalloc?: number // double
  /**
   * Receipt is marked as cleared once reconciled wtih a bank statement
   */
  cleared?: boolean
  /**
   * Landlord transactions are marked with statement number once statement is prepared;
   * -1 indicates transaction should not be shown on statement
   */
  lldStat?: number // int32
  /**
   * Net cost
   */
  netAmt?: number // double
  /**
   * VAT amount
   */
  vatAmt?: number // double
  /**
   * Reference code of associated estate - used for block management accounting functionality
   */
  estCode?: string
  /**
   * Code of client account to which this transaction relates
   */
  clientAc?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Offer representation
 */
export interface OfferModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Offer type
   */
  type?: string
  /**
   * Currency code
   */
  currency?: string
  /**
   * Code of applicant making offer
   */
  appCode?: string
  /**
   * Code of property this offer is for
   */
  prpCode?: string
  /**
   * Code of main contact making offer
   */
  cntCode?: string
  /**
   * Code of negotiator who added this offer
   */
  negCode?: string
  /**
   * Value of offer
   */
  offerPrice?: number // double
  /**
   * Date offer was made
   */
  offerDate?: string // date-time
  /**
   * Offer/Reservation/Note of interest status: OP - Offer Pending | OW - Offer Withdrawn | OR - Offer Rejected | OA - Offer Accepted | RE - Reserved | RW - Reservation Withdrawn | RH - Reservation Holding | NI - Note of Interest Pending | NW - Note of Interest Withdrawn
   */
  status?: string
  /**
   * Offer notes
   */
  notes?: string
  /**
   * Items to be included
   */
  include?: string
  /**
   * Items to be excluded
   */
  exclude?: string
  /**
   * Special conditions and remarks
   */
  conds?: string
  /**
   * Code of next offer in chain (vendors purchase)
   */
  vchain?: string
  /**
   * Code of previous offer in chain (buyers sale)
   */
  bchain?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Office representation
 */
export interface OfficeModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * House name or flat number
   */
  name?: string
  /**
   * Office manager
   */
  manager?: string
  /**
   * Office type: A - Admin Only | H - Head Office | L - Lettings | S - Sales | X - Closed
   */
  type?: string
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * House number
   */
  hseNo?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 3
   */
  address3?: string
  /**
   * Address line 4
   */
  address4?: string
  /**
   * Postcode
   */
  postcode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * Office contact details
   */
  phone?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Paid representation
 */
export interface PaidModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Payment method
   * B - BACS | C - Cheque | M - Manual
   */
  type?: string
  /**
   * Reference of associated batch when all payments are made at the same time
   */
  batch?: string
  /**
   * Total amount paid
   */
  amount?: number // double
  /**
   * Number of items included in the payment
   */
  items?: number // int32
  /**
   * Cheque number
   */
  chequeNo?: number // int32
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Payment representation
 */
export interface PaymentModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Date paid
   */
  paid?: string // date-time
  /**
   * Date payment appeared on bank statement
   */
  statDate?: string // date-time
  /**
   * Method by which this item has been paid
   */
  type?: string
  /**
   * Code of associated record in NomTran table
   */
  nomTran?: string
  /**
   * Code of payment record in NomTran table
   */
  payTran?: string
  /**
   * Code of original invoice record in NomTran table
   */
  invTran?: string
  /**
   * Payee
   */
  payee?: string
  /**
   * Code of landlord/company/bank record to which this item should be paid
   */
  payCode?: string
  /**
   * AGT - Agent | BUY - Buyer | BBA - Individual Buyer Account | LBA - Individual Landlord Account | LLD - Main Landlord | SUP - Supplier | TAX - Tax | TBA - Individual Tenant Account | TEN - Tenant | TRF - Transfer | VND - Vendor (Trust Accounting)
   */
  payType?: string
  /**
   * Code of record in Paid table representing physical payment made
   */
  paidCode?: string
  /**
   * Code of record in Batch table to which this item belongs
   */
  batch?: string
  /**
   * Payment amount
   */
  amount?: number // double
  /**
   * True if this payment has cleared
   */
  cleared?: boolean
  /**
   * If set on the Agent VAT Report, payment will be excluded from future reports
   */
  agtVat?: boolean
  /**
   * Reference code of the client account that this payment was made from
   */
  clnAcFr?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * PermissionGroup representation
 */
export interface PermissionGroupModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The name of the permission group
   */
  name?: string
  type?: string
  /**
   * The security settings applied by this group
   */
  settings?: SecuritySettingModel[]
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
}
/**
 * Property representation
 */
export interface PropertyModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Property type: S - Sales | L - Lettings | SL - Both
   */
  type?: string
  /**
   * True if property is external
   */
  extPrp?: boolean
  /**
   * Property lettings status: LA - To Let - Available | LU - To Let - Unavailable | LO - Let by other agent | LP - Let privately | MA - Coming to market / Market Appraisal / Valuation | PR - Provisional | SO - Sold | AA - Arranging Tenancy - Available | TA - Arranging Tenancy - Unavailable | AC - Tenancy Current - Available | TC - Tenancy Current - Unavailable | TF - Tenancy Finished | TX - Tenancy Cancelled | UA - Under Offer - Available | UU - Under Offer - Unavailable | WD - Withdrawn
   */
  letStatus?: string
  /**
   * Property sales status: CO - Completed | EX - Exchanged/Missives Concluded | FA - For Sale - Available | FU - For Sale - Unavailable | PA - Introduction/Pre Appraisal | PV - Paid Valuation | RE - Reserved | SA - Under offer - Available | SU - Under offer - Unavailable | SE - Sold Externally | VA - Coming to market/Market Appraisal/Valuation | WD - Withdrawn
   */
  saleStatus?: string
  /**
   * Department code
   */
  depCode?: string
  /**
   * Property office code
   */
  offCode?: string
  /**
   * Managing negotiator code
   */
  negCode?: string
  /**
   * Code of the landlord record this property is associated to
   */
  lldCode?: string
  /**
   * Unique identifier code of contact
   */
  cntCode?: string
  /**
   * Telephone number of the property
   */
  phone?: string
  /**
   * Date vendor/landlord last contacted
   */
  lastCall?: string // date-time
  /**
   * Date by which vendor/landlord should next be contacted
   */
  nextCall?: string // date-time
  /**
   * General notes
   */
  notes?: string
  /**
   * Property area code
   */
  locCode?: string
  /**
   * Main picture File name
   */
  picFile?: string
  /**
   * Letting commission percentage
   */
  letComm?: number // double
  /**
   * Sales commission percentage
   */
  saleComm?: number // double
  /**
   * Property latitude
   */
  latitude?: number // double
  /**
   * Property longitude
   */
  longitude?: number // double
  /**
   * Minimum rent
   */
  minRent?: number // double
  /**
   * Maximum rent
   */
  maxRent?: number // double
  /**
   * Minimum property price (for matching/development)
   */
  minPrice?: number // int32
  /**
   * Maximum property price (for matching/development)
   */
  maxPrice?: number // int32
  /**
   * Brief description
   */
  brief?: string
  /**
   * Property minimum square footage/Applicant minimum required square footage
   */
  feet?: number // int32
  /**
   * Property maximum square footage/Applicant maximum required square footage
   */
  feetTo?: number // int32
  /**
   * Attribute column 1 value
   */
  or1?: number // int32
  /**
   * Attribute column 2 value
   */
  or2?: number // int32
  /**
   * Attribute column 3 value
   */
  or3?: number // int32
  /**
   * Attribute column 4 value
   */
  or4?: number // int32
  /**
   * Attribute column 5 value
   */
  or5?: number // int32
  /**
   * Attribute column 6 value
   */
  or6?: number // int32
  /**
   * Attribute column 7 value
   */
  and1?: number // int32
  /**
   * Number of double bedrooms
   */
  num1?: number // int32
  /**
   * Maximum number of double bedrooms
   */
  num1to?: number // int32
  /**
   * Number of single bedrooms
   */
  num2?: number // int32
  /**
   * Maximum number of single bedrooms
   */
  num2to?: number // int32
  /**
   * Number of reception rooms
   */
  num3?: number // int32
  /**
   * Maximum number of reception rooms
   */
  num3to?: number // int32
  /**
   * Number of bathrooms
   */
  num4?: number // int32
  /**
   * Maximum number of bathrooms
   */
  num4to?: number // int32
  /**
   * Total number of bedrooms
   */
  totalNum?: number // int32
  /**
   * Max total number of bedrooms
   */
  totalNumTo?: number // int32
  /**
   * Date and time this record was archived (if applicable)
   */
  archDate?: string // date-time
  /**
   * Second marketing office
   */
  offCode2?: string
  /**
   * Third marketing office
   */
  offCode3?: string
  /**
   * Date on which agent was instructed
   */
  forSDate?: string // date-time
  /**
   * Date on which property was exchanged
   */
  exchDate?: string // date-time
  /**
   * Price at which the property exchanged
   */
  exchPrice?: number // int32
  /**
   * Exchange office code
   */
  exchOffCode?: string
  /**
   * Recommended asking price
   */
  rAskPrice?: number // int32
  /**
   * Price at which the property has been valued
   */
  valPrice?: number // int32
  /**
   * Property price
   */
  price?: number // int32
  /**
   * Price qualifier code: AP - Asking Price | FP - Fixed Price | GP - Guide Price | OO - Offers Over | OE - Offers in excess of | OR - Configurable, defaults to: Offers in the region of | PA - Price on Application | PR - Price Reduced to
   */
  priceQual?: string
  /**
   * Decoration value
   */
  decoration?: number // int32
  /**
   * Tenure type F - Freehold L - Leasehold S - Share of freehold
   */
  tenure?: string
  /**
   * Lettings tenure value 1 - Long let 2 - Short let
   */
  letTenure?: number // int32
  /**
   * Disposal AV - By Auction | CF - Confidential | OI - Offers Invited | PT - Private Treaty | TE - By Tender
   */
  disposal?: string
  /**
   * Agency AS - Marketing for Associate | CO - Clients Only | CP - Comparable | HC - Sub Agent | JS - Joint Sole | JF - Joint Sole - Fee Available | MU - Multiple | MF - Multiple - Fee Available | OS - Own to Sell | RF - Sole Selling Rights - Fee Available | SA - Sole Agent | SF - Sole Agent - Fee Available | SS - Sole Selling Rights
   */
  agency?: string
  /**
   * Agent's role CC - Collect first rent payment | CO - Letting only | IT - Introducing tenant | MT - Managed tenancy | RC - Rent collection
   */
  role?: string
  /**
   * Weekly rent
   */
  wRent?: number // double
  /**
   * Date available from
   */
  avFrom?: string // date-time
  /**
   * Date available to
   */
  avTo?: string // date-time
  /**
   * True if there is no gas supply to the property
   */
  noGas?: boolean
  /**
   * Furnishings value
   */
  furnished?: number // int32
  /**
   * Date property will be available to let
   */
  forLDate?: string // date-time
  commProp?: string
  /**
   * Type of development/land site C - Child record L - Land M - Master record
   */
  site?: string
  /**
   * Number of units/lots in development
   */
  plots?: number // int32
  /**
   * True if property should not be marketed on the internet
   */
  noIntAdv?: boolean
  /**
   * Date of tenure expiry (if applicable)
   */
  endLease?: string // date-time
  /**
   * House name or flat number
   */
  hseName?: string
  /**
   * House number
   */
  hseNo?: string
  /**
   * Street or village name
   */
  address1?: string
  /**
   * Address line 2
   */
  address2?: string
  /**
   * Address line 2
   */
  address3?: string
  /**
   * Address line 2
   */
  address4?: string
  /**
   * Postcode
   */
  postcode?: string
  /**
   * ISO 2 letter country code
   */
  country?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * PropertyPicture representation
 */
export interface PropertyPictureModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of property to which this picture relates
   */
  prpCode?: string
  /**
   * Image File name
   */
  picturePath?: string
  /**
   * Picture name
   */
  picName?: string
  /**
   * Picture type: EP - EPC ratings graph | FP - Floor plan | MA - Map | PH - Photograph
   */
  type?: string
  /**
   * Picture order number
   */
  picOrder?: number // int32
  /**
   * Location of the thumbnail image
   */
  thumbnailPath?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
}
/**
 * Referral representation
 */
export interface ReferralModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date on which the referral commission was paid
   */
  paid?: string // date-time
  /**
   * The date on which the referral was accepted
   */
  accepted?: string // date-time
  /**
   * The code of the ReferralDef record that this referral was created from
   */
  refCode?: string
  /**
   * The NegCode of the logged in user that created the referral
   */
  negCode?: string
  /**
   * The Property Code the referral was created against (if a vendor referral or landlord referral)
   */
  prpCode?: string
  /**
   * The Code of the Applicant record the referral was created against
   */
  appCode?: string
  /**
   * Unique identifier code of contact
   */
  cntCode?: string
  /**
   * The status of the referral: Null/Empty - Nothing | S - Sent | W - Pending | Y - Referral Succeeded (Can now be paid) | N - Referral Failed | P - Referral Paid | C - Cancelled | X - Declined
   */
  status?: string
  /**
   * The amount paid by the referral company
   */
  amount?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * ReportDefinition representation
 */
export interface ReportDefinitionModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The number of results that the previous run of this report definition returned
   */
  lastResult?: number // int32
  /**
   * The date/time that this report definition was last executed
   */
  lastRun?: string // date-time
  /**
   * The code of the negotiator who created this report definition
   */
  negCode?: string
  /**
   * Json representatino of the criteria making up this report definition
   */
  criteria?: string
  /**
   * Comma delimited list of types and codes of entities that this report definition is shared with
   * N:XXX denotes a negotiator with code XXX
   * O:YYY denotes an office with code YYY
   * When blank, this report definition is not shared with any other party
   * When *, this report definition is available to Everyone
   */
  shared?: string
  /**
   * The name given to this report definition
   */
  name?: string
  /**
   * The type of entity this report definition should run against
   */
  type?: string
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Room representation
 */
export interface RoomModel {
  /**
   * The room name
   */
  name?: string
  /**
   * The room description text
   */
  description?: string
  /**
   * The room dimensions
   */
  dimensions?: string
  /**
   * The room image
   */
  image?: string
}
/**
 * Representation of a single security setting
 */
export interface SecuritySettingModel {
  /**
   * The name of this security setting
   */
  settingName?: string
  /**
   * The value of this security setting, either allow or deny
   */
  type?: string
  /**
   * The office ids that this security grant applies to. If a particular setting denies access wholesale, this collection will be empty
   */
  officeIds?: string[]
}
/**
 * Source representation
 */
export interface SourceModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Source name
   */
  name?: string
  /**
   * Source type: A - Advertising publication | AL - Allowances | BR - Break Clause Definition | EH - Event Category | E - Event Definition | F - Diary Follow Up Terms | MH - Mailing Category | M - Mailing Definition | P - Custom applicant position | RF - Referral | RO - Renewal Option Definition | RP - Responsibilities | S - Source | PT - Pre-tenancy check | LT - Post-tenancy check
   */
  type?: string
  /**
   * Departments with which this source is associated
   */
  depCodes?: string
  /**
   * Offices with which this source is associated
   */
  offCodes?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * StatementItem representation
 */
export interface StatementItemModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Client account statement item paid from/to
   */
  clientAc?: string
  /**
   * Statement item type (as taken from original bank statement)
   */
  statType?: string
  /**
   * Type of receipt
   * BD - | Bankers Draft, CA - Cash | CH - Cheque | CC - Credit Card | DC - Debit Card | DD -  Direct Debit
   * HB - Housing Benefit | SO - Standing Order | TF - Bank Transfer
   */
  recType?: string
  /**
   * Reference code of associated tenancy
   */
  tenCode?: string
  /**
   * Reference code of associated landlord
   */
  lldCode?: string
  /**
   * Nominal transaction record linked to statement item (or paid record for payments out)
   */
  nomTran?: string
  /**
   * Reference code of the parent statement item where statement items have been split into multiple reciepts (or grouped)
   */
  parent?: string
  /**
   * Statement narrative
   */
  descr?: string
  /**
   * Code inicating how receipt was allocated
   * T - Tenant | L - Landlord | S - Supplier
   * A - Automatic | M - Manual
   */
  allocated?: string
  /**
   * Amount of statement item
   */
  amount?: number // double
  /**
   * True when receipt is required
   */
  receipt?: boolean
  /**
   * True when receipt has been posted
   */
  recptPost?: boolean
  /**
   * True when reconciliation item selected
   */
  recon?: boolean
  /**
   * True when reconciliation item posted
   */
  reconPost?: boolean
  /**
   * Date of statement
   */
  statDate?: string // date-time
  /**
   * Reference code of associated property
   */
  prpCode?: string
  /**
   * Reference code of associated company (typically a supplier)
   */
  cmpCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Subscription representation
 */
export interface SubscriptionModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Unique identifier code of contact
   */
  cntCode?: string
  /**
   * Code of mailing being sent
   */
  mlCode?: string
  /**
   * Type of mailing being sent: M = Mailing | E = Event Invitation | C = campaign sent
   */
  type?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * TaskPlanItem representation
 */
export interface TaskPlanItemModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The date this task plan item was completed
   */
  complete?: string // date-time
  /**
   * The date that this task plan item will activate
   */
  activate?: string // date-time
  /**
   * The code of the entity associated with this task plan item
   */
  tableCode?: string
  /**
   * The type of the entity associated with this task plan item
   * prp - Property | app - Applicant | cnt - Contact
   * ten - Tenancy | lld - Landlord
   */
  tableType?: string
  /**
   * The type of task plan item
   * PH - Call Reminder | LE - Send Letter | EM - Send Email | WF - Trigger Workflow
   */
  type?: string
  /**
   * The text associated with the task plan item
   */
  text?: string
  /**
   * The negotiator responsible for this task plan item
   */
  tonCode?: string
  /**
   * The code of the TaskPlan that this item is attached to
   */
  planCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * TaskPlan representation
 */
export interface TaskPlanModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The type of entity that the task plan can be used against
   * Blank - General | prp - Property | app - Applicant | cnt - Contact
   * ten - Tenancy | lld - Landlord
   */
  type?: string
  /**
   * The task plan name
   */
  name?: string
  /**
   * Json representation of the items that make up this task plan
   */
  schedule?: string
  /**
   * The codes of the offices that this task plan is available to
   */
  offCodes?: string
  /**
   * The codes of the negotiators that this task plan is available to
   */
  negCodes?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * TenancyCheck representation
 */
export interface TenancyCheckModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Date of last change
   */
  date?: string // date-time
  /**
   * Code of tenancy relating to this record
   */
  tenCode?: string
  /**
   * Code of source (check/tenancy term definition) relating to this record
   */
  srcCode?: string
  /**
   * B - Break Clause | P - Pre-tenancy Check | L - Post-tenancy Check | A - Allowance | R - Responsibliity
   */
  type?: string
  /**
   * A - Allowed | D - Disallowed | L - Landlord | T - Tenant | M - Mutual | N - Needed | X - Not Needed | S - Sent/Arranged | C - Completed
   */
  status?: string
  /**
   * Term agreed to by landlord
   */
  lldAgreed?: boolean
  /**
   * Term agreed to by tenant
   */
  tenAgreed?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * TenancyExtension representation
 */
export interface TenancyExtensionModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Tenancy Extension start date
   */
  frDate?: string // date-time
  /**
   * Tenancy Extension end date
   */
  toDate?: string // date-time
  /**
   * Code of tenancy to which this Extension applies
   */
  tenCode?: string
  /**
   * Code of negotiator associated with this Extension
   */
  negCode?: string
  /**
   * Tenancy Extension type: A - Alteration | E - Extension | R - Recurring Charge
   */
  type?: string
  /**
   * Agent's role: CC - Collect first rent payment | CO - Letting only | IT - Introducing tenant | MT - Managed tenancy | RC - Rent collection
   */
  role?: string
  /**
   * Rent frequency: MO - Monthly | QU - Quarterly | HY - Half Yearly | YR - Yearly | OT - Other
   */
  rentFreq?: string
  /**
   * Letting fee collection frequency: UF - Upfront | HY - Half Yearly | QU - Quarterly | MO - Monthly | OT - Other | NA - Not Applicable
   */
  commColl?: string
  /**
   * Weekly rent
   */
  wrent?: number // double
  /**
   * Commission percentage
   */
  comm?: number // double
  /**
   * Fixed commission
   */
  fixedComm?: number // double
  /**
   * Fees payable to external agent
   */
  extComm?: number // double
  /**
   * Agent's split of commission
   */
  commSplit?: number // double
  /**
   * Management fee percentage
   */
  commMan?: number // double
  /**
   * Management fee collection frequency: MO - Monthly | QU - Quarterly | HY - Half Yearly | YR - Yearly | LF - Same As Letting Fee
   */
  commManColl?: string
  /**
   * Recurring charge frequency
   */
  feeFreq?: number // int32
  /**
   * One-off fee or recurring charge type: LA - Landlord Admin Fee | LF - Landlord Letting Fee | MF - Landlord Management Fee | TF - Tenant Admin Fee | TL - Tenant to Landlord Fee | TS - Tenant to Supplier Fee | LS - Landlord to Supplier Fee
   */
  feeCategory?: string
  /**
   * One-off fee or recurring charge amount
   */
  feeAmount?: number // double
  /**
   * True if fee instalment start date should be reset when this alteration/ extension is effective
   */
  resetIns?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Tenancy representation
 */
export interface TenancyModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Managing negotiator code
   */
  negCode?: string
  /**
   * Code of main tenant contact
   */
  mainTenCode?: string
  /**
   * Tenancy status: TA - Arranging Tenancy | TC - Tenancy Current | TF - Tenancy Finished | TX - Tenancy Cancelled | OP - Tenancy Offer Pending | OR - Tenancy Offer Rejected | OW - Tenancy Offer Withdrawn
   */
  status?: string
  /**
   * Tenancy type: AS - Assured Shorthold | CL - Company Let | LC - Non Housing Act - Law of contract | PL - Premium Lease
   */
  type?: string
  /**
   * Agent's role: CC - Collect first rent payment | CO - Letting only | IT - Introducing tenant | MT - Managed tenancy | RC - Rent collection
   */
  role?: string
  /**
   * Code of property to which this tenancy applies
   */
  prpCode?: string
  /**
   * Code of applicant to which this tenancy applies
   */
  appCode?: string
  /**
   * Tenancy start date
   */
  frDate?: string // date-time
  /**
   * Tenancy end date
   */
  toDate?: string // date-time
  /**
   * True if tenancy end date has been confirmed
   */
  endConfirm?: boolean
  /**
   * Weekly rent
   */
  wrent?: number // double
  /**
   * Rent frequency: MO - Monthly | QU - Quarterly | HY - Half Yearly | YR - Yearly | 28 - 28 Days | OT - Other
   */
  rentFreq?: string
  /**
   * Date of first instalment
   */
  firstInst?: string // date-time
  /**
   * Instalment amount
   */
  inst?: number // double
  /**
   * The deposit amount
   */
  dpstSum?: number // double
  /**
   * Deposit type: FS - Fixed sum | WE - X | weeks rent | MO - X months rent | GU - Guarantee
   */
  dpstType?: string
  /**
   * Number of weeks/months rent required for deposit
   */
  dpstTimes?: number // double
  /**
   * Deposit held by: US - Us - stakeholder | UL - Us - landlord's agent | LL - Landlord | DS - Deposit Protection Scheme | NA - Not Applicable
   */
  dpstHeld?: string
  /**
   * True if deposit held on interest
   */
  dpstInt?: boolean
  /**
   * Commission
   */
  comm?: number // double
  /**
   * Fees payable to external agent
   */
  extComm?: number // double
  /**
   * Letting fee collection: UF - Upfront | U2 - Upfront over 2 months | MO - Monthly | QU - Quarterly | HY - Half Yearly | YR - Yearly | 28 - 28 Days | OT - Other | NA - Not Applicable
   */
  commColl?: string
  /**
   * Alternative tenancy reference
   */
  altRef?: string
  /**
   * Date original tenancy term ended
   */
  oldEnd?: string // date-time
  /**
   * Tenancy base currency code
   */
  currency?: string
  /**
   * Date rent paid to
   */
  rentAcTo?: string // date-time
  /**
   * Tenant source of enquiry code
   */
  srcCode?: string
  /**
   * Tenancy rent period: W - per week | M - per month | A - per annum
   */
  mktRent?: string
  /**
   * Fixed commission
   */
  fixedComm?: number // double
  /**
   * Fees payable to external agent
   */
  extCommFixed?: number // double
  /**
   * Agent's split of commission
   */
  commSplit?: number // double
  /**
   * Management fee
   */
  commMan?: number // double
  /**
   * Management fee collection frequency: MO - Monthly | QU - Quarterly | HY - Half Yearly | YR - Yearly | 28 - 28 Days | LF - Same As Letting Fee
   */
  commManColl?: string
  /**
   * True if tenancy is extended indefinitely
   */
  periodic?: boolean
  /**
   * True if inital tenancy invoice has been raised
   */
  acRaised?: boolean
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * Translation representation - only available when system translations are enabled
 */
export interface TranslationModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * The original, untranslated text
   */
  orig?: string
  /**
   * The translated text
   */
  trans?: string
  /**
   * Comma separated list of the codes of the office(s) that this translation should be applied to
   */
  offCodes?: string
  /**
   * Comma separated list of the codes of the negotiator(s) that this translation should be applied to
   */
  negCodes?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * WorksOrderDetail representation
 */
export interface WorksOrderDetailModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Code of works order associated with this record
   */
  woCode?: string
  /**
   * Work charged to: A - Agent | L - Landlord | T - Tenant
   */
  chargeTo?: string
  /**
   * Code of Appliance associated with this record
   */
  applCode?: string
  /**
   * Code of nominal account associated with this record
   */
  nomCode?: string
  /**
   * VAT code associated with this record
   */
  vatCode?: string
  /**
   * Works detail notes
   */
  notes?: string
  /**
   * Estimate type: O - Our estimate | V - Verbal estimate | W - Written estimate
   */
  estType?: string
  /**
   * Code of record in NomTran table relating to this works detail
   */
  nomTran?: string
  /**
   * Estimated cost
   */
  estimate?: number // double
  lineNum?: number // int32
  /**
   * Net cost
   */
  readonly netAmt?: number // double
  /**
   * VAT amount
   */
  readonly vatAmt?: number // double
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
/**
 * WorksOrder representation
 */
export interface WorksOrderModel {
  /**
   * Unique identifier code
   */
  code?: string
  /**
   * Date/Time record was created
   */
  register?: string // date-time
  /**
   * Date/Time record was last amended
   */
  amend?: string // date-time
  /**
   * Order date
   */
  ordDate?: string // date-time
  /**
   * Date work required by
   */
  reqBy?: string // date-time
  /**
   * Date work completed
   */
  complete?: string // date-time
  /**
   * Code of property associated with this works order
   */
  prpCode?: string
  /**
   * Code of tenancy associated with this works order
   */
  tenCode?: string
  /**
   * Order status: A - Pending approval | P - Pending quote | R - Raised 1-9 - Raised | - Chase every X days | L - Landlord to complete | C - Completed | X - Cancelled
   */
  status?: string
  /**
   * Reported by: L - Landlord | T - Tenant | O - Other
   */
  repType?: string
  /**
   * Code of negotiator associated with this works order
   */
  negCode?: string
  /**
   * Code of company associated with this works order
   */
  cmpCode?: string
  /**
   * Description
   */
  descr?: string
  /**
   * Code of estate associated with this works order
   */
  estCode?: string
  /**
   * Additional information about this entity
   */
  extra?: {
    [name: string]: {}
  }
  /**
   * Gets the links associated to this model
   */
  readonly links?: LinkModel[]
}
