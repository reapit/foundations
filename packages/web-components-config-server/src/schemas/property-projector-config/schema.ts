import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { projectorTableName } from '@/constants/db'
import { booleanObjectType } from 'aws-sdk/clients/iam'
import { bool } from 'aws-sdk/clients/signer'
import { Object } from 'aws-sdk/clients/s3'

@table(projectorTableName)
export class PropertyProjectorConfig {
  @hashKey()
  customerId: string

  // Customer office ID
  @rangeKey()
  officeId: string

  // Customer logo, contains the address to the chosen customer logo
  @attribute()
  logo: string

  // Primary colour, contains the hex value for the customer's chosen primary colour
  @attribute()
  primaryColour: string

  // Secondary colour, contains the hex value for the customer's chosen primary colour
  @attribute()
  secondaryColour: string

  // Header Text colour, contains the hex value for the colour of the info header text
  @attribute()
  headerTextColour: string

  // Rotation duration, a number representing the seconds a projector page is displayed for
  @attribute()
  interval: number

  // Property limit, the maximum number of properties to be displayed by projector.
  @attribute()
  propertyLimit: number

  // Marketing mode, determines whether sales, lettings or both types of properties are to be displayed.
  @attribute()
  marketingMode: string[]

  // Selling status, the status of sales properties that are to be displayed on the projector.
  @attribute()
  sellingStatuses: string[]

  // Letting status, the status of letting properties that are to be displayed on the projector.
  @attribute()
  lettingStatuses: string[]

  // Min price, the minimum price a property should be to be displayed by the projector.
  @attribute()
  minPrice: number

  // Max price, the maximum price a property should be to be displayed by the projector.
  @attribute()
  maxPrice: number

  // Min rent, the minimum rental value a property should be to be displayed by the projector.
  @attribute()
  minRent: number

  // Max rent, the maximum rental value a property should be to be displayed by the projector.
  @attribute()
  maxRent: number

  // Show address, a boolean value to determine whether a property's address should be shown in projector.
  @attribute()
  showAddress: boolean

  // Sort by, a string containing the field to sort properties by within the projector.
  @attribute()
  sortBy: string

  // Departments, an array of strings containing the departments for which projector should display properties for.
  @attribute()
  departments: object

  // Offices, an array of strings containing the offices for which projector should display properties for.
  @attribute()
  offices: string[]
}
