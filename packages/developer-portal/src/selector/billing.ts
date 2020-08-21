import { ReduxState } from '@/types/core'
import { checkAllKeysHasValueNotEmpty, checkAtLeastOneKeyHasValueIsNotEmpty } from '@/utils/check-object-data'
import { DeveloperModel, CompanyAddressModel } from '@reapit/foundations-ts-definitions'

export const selectIsRequiredDataOfBillingPageFilled = (state: ReduxState): boolean => {
  return (
    checkAllKeysHasValueNotEmpty<DeveloperModel>({
      object: state.settings.developerInfomation || {},
      keys: ['website', 'telephone', 'name'],
    }) &&
    checkAllKeysHasValueNotEmpty<CompanyAddressModel>({
      object: state.settings.developerInfomation?.companyAddress || {},
      keys: ['line1', 'line4', 'postcode', 'countryId'],
    }) &&
    checkAtLeastOneKeyHasValueIsNotEmpty<DeveloperModel>({
      object: state.settings.developerInfomation || {},
      keys: ['registrationNumber', 'taxNumber', 'nationalInsurance'],
    })
  )
}
