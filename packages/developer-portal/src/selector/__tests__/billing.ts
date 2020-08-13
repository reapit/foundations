import { selectIsRequiredDataOfBillingPageFilled } from '../billing'
import appState from '@/reducers/__stubs__/app-state'
import { checkAllKeysHasValueNotEmpty, checkAtLeastOneKeyHasValueIsNotEmpty } from '@/utils/check-object-data'

jest.mock('@/utils/check-object-data', () => ({
  checkAllKeysHasValueNotEmpty: jest.fn(() => true),
  checkAtLeastOneKeyHasValueIsNotEmpty: jest.fn(() => true),
}))

describe('selectIsRequiredDataOfBillingPageFilled', () => {
  it('should run correctly', () => {
    selectIsRequiredDataOfBillingPageFilled(appState)

    expect(checkAllKeysHasValueNotEmpty).toHaveBeenCalledWith({
      keys: ['website', 'telephone', 'name'],
      object: appState.settings.developerInfomation || {},
    })

    expect(checkAllKeysHasValueNotEmpty).toHaveBeenCalledWith({
      keys: ['line1', 'line4', 'postcode', 'countryId'],
      object: appState.settings.developerInfomation?.companyAddress || {},
    })

    expect(checkAtLeastOneKeyHasValueIsNotEmpty).toHaveBeenCalledWith({
      keys: ['registrationNumber', 'taxNumber', 'nationalInsurance'],
      object: appState.settings.developerInfomation || {},
    })
  })
})
