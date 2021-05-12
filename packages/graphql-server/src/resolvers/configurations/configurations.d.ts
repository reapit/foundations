import { UserInputError } from 'apollo-server-lambda'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export type ConfigurationType =
  | '​​appointmentTypes'
  | '​​companyTypes'
  | '​​identityDocumentTypes'
  | '​​documentTypes'
  | '​​journalEntryTypes'
  | '​​followUpResponses'
  | '​​sellingReasons'
  | '​​supplierTypes'
  | '​​taskTypes'
  | '​​tenancyTypes'
  | '​​vendorTypes'
  | '​​worksOrderTypes'

export type GetConfigurationByTypeArgs = {
  type: ConfigurationType
}
export type GetConfigurationByTypeAndIdArgs = { id: String } & GetConfigurationByTypeArgs

// api return type
export type GetConfigurationByTypeAndIdReturn = Promise<ListItemModel | UserInputError>
export type GetConfigurationsByTypeReturn = Promise<ListItemModel[] | UserInputError>

// resolver type
export type QueryConfigurationByTypeAndIdReturn = GetConfigurationByTypeAndIdReturn
export type QueryConfigurationsByTypeReturn = GetConfigurationsByTypeReturn
