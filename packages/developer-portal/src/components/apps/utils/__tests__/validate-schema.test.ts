import { AppEditFormSchema } from '../../edit/form-schema/form-fields'
import { handleSetIncompletedFields } from '../validate-schema'

describe('handleSetIncompletedFields', () => {
  it('should handle validating the current form state', (done) => {
    const values = {} as AppEditFormSchema
    const setIncompleteFields = jest.fn()
    const curried = handleSetIncompletedFields(values, setIncompleteFields)
    curried()

    setTimeout(() => {
      expect(setIncompleteFields).toHaveBeenCalledWith([
        'name',
        'telephone',
        'supportEmail',
        'iconImageUrl',
        'screen1ImageUrl',
        'homePage',
        'description',
        'summary',
        'authFlow',
        'termsAndConditionsUrl',
        'privacyPolicyUrl',
        'pricingUrl',
        'products',
      ])
      done()
    }, 100)
  })
})
