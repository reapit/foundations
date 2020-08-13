/*
 * TODOME(selectIsRequiredDataOfBillingPageFilled)
 * create selector
 */

import { ReduxState } from '@/types/core'
import { checkObjectKeysValueIsNotEmpty, checkAtLeastOneKeysOfObjectIsNotEmpty } from '@/utils/check-object-fields'
import { DeveloperModel, CompanyAddressModel } from '@reapit/foundations-ts-definitions'

export const selectIsRequiredDataOfBillingPageFilled = (state: ReduxState): boolean => {
  return (
    checkObjectKeysValueIsNotEmpty<DeveloperModel>({
      object: state.settings.developerInfomation || {},
      keys: ['website', 'telephone', 'name'],
    }) &&
    checkObjectKeysValueIsNotEmpty<CompanyAddressModel>({
      object: state.settings.developerInfomation?.companyAddress || {},
      keys: ['line1', 'line4', 'postcode', 'countryId'],
    }) &&
    checkAtLeastOneKeysOfObjectIsNotEmpty<DeveloperModel>({
      object: state.settings.developerInfomation || {},
      keys: ['registrationNumber', 'taxNumber', 'nationalInsurance'],
    })
  )
}
