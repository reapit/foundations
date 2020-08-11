import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { tableName } from '@/constants/db'
import { booleanObjectType } from 'aws-sdk/clients/iam'
import { bool } from 'aws-sdk/clients/signer'

@table(tableName)
export class PropertyProjectorConfig {
  @hashKey()
  customerId: string

  // Customer office ID
  @attribute()
  officeId: string

  // Customer logo, contains the address to the chosen customer logo
  @attribute()
  customerLogo: string

  // Primary colour, contains the hex value for the customer's chosen primary colour
  @attribute()
  primaryColour: string

  // Secondary colour, contains the hex value for the customer's chosen primary colour
  @attribute()
  secondaryColour: string

  // Rotation duration, a number representing the seconds a projector page is displayed for
  @attribute()
  rotationDuration: number

  // Refresh hour, a number representing how long in hours the projector will run for before restarting.
  @attribute()
  refreshHour: number

  // Property limit, the maximum number of properties to be displayed by projector.
  @attribute()
  propertyLimit: number

  // Min price, the minimum price a property should be to be displayed by the projector.
  @attribute()
  minPrice: number

  // Max price, the maximum price a property should be to be displayed by the projector.
  @attribute()
  maxPrice: number

  // Randomize, a boolean value to determine whether properties should be randomized inside the projector.
  @attribute()
  randomize: boolean

  // Show address, a boolean value to determine whether a property's address should be shown in projector.
  showAddress: boolean

  // Show strapline, a boolean value to determine whether a property's strapline should be shown in projector.
  @attribute()
  showStrapline: boolean

  // Sort by, a string containing the field to sort properties by within the projector.
  @attribute()
  sortBy: string

  // Departments, an array of strings containing the departments for which projector should display properties for.
  @attribute()
  departments: string[]

  // Offices, an array of strings containing the offices for which projector should display properties for.
  @attribute()
  offices: string[]
}
