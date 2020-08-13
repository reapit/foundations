import { selectIsRequiredDataOfBillingPageFilled } from '../billing'
import appState from '@/reducers/__stubs__/app-state'
import { checkObjectKeysValueIsNotEmpty, checkAtLeastOneKeysOfObjectIsNotEmpty } from '@/utils/check-object-fields'

jest.mock('@/utils/check-object-fields', () => ({
  checkObjectKeysValueIsNotEmpty: jest.fn(() => true),
  checkAtLeastOneKeysOfObjectIsNotEmpty: jest.fn(() => true),
}))

describe('selectIsRequiredDataOfBillingPageFilled', () => {
  it('should run correctly', () => {
    selectIsRequiredDataOfBillingPageFilled(appState)

    expect(checkObjectKeysValueIsNotEmpty).toHaveBeenCalledWith({
      keys: ['website', 'telephone', 'name'],
      object: appState.settings.developerInfomation || {},
    })

    expect(checkObjectKeysValueIsNotEmpty).toHaveBeenCalledWith({
      keys: ['line1', 'line4', 'postcode'],
      object: appState.settings.developerInfomation?.companyAddress || {},
    })

    expect(checkAtLeastOneKeysOfObjectIsNotEmpty).toHaveBeenCalledWith({
      keys: ['registrationNumber', 'taxNumber', 'nationalInsurance'],
      object: appState.settings.developerInfomation || {},
    })
  })
})
