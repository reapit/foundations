import { AppEditFormSchema } from '../edit/form-schema/form-fields'

const listingKeys: (keyof AppEditFormSchema)[] = [
  'supportEmail',
  'telephone',
  'homePage',
  'launchUri',
  'termsAndConditionsUrl',
  'privacyPolicyUrl',
  'pricingUrl',
  'categoryId',
  'description',
  'summary',
  'isFree',
  'iconImageUrl',
  'screen1ImageUrl',
  'screen2ImageUrl',
  'screen3ImageUrl',
  'screen4ImageUrl',
  'screen5ImageUrl',
]

export const listingInCompletion = (formValues: AppEditFormSchema) => {
  return Boolean(
    listingKeys.filter((key) => {
      if (formValues[key]) {
        return true
      }
    }).length,
  )
}
