import { CreateAppModel } from '@reapit/foundations-ts-definitions'
import { validateRequire, validateEmail } from '@reapit/elements'

export type SubmitAppFormErrorKeys =
  | 'name'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageUrl'
  | 'homePage'
  | 'description'
  | 'summary'
  | 'screen1ImageUrl'
  | 'authFlow'

export const validate = (values: CreateAppModel) => {
  let errors = validateRequire<CreateAppModel, SubmitAppFormErrorKeys>({
    values,
    currentErrors: {},
    keys: [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageUrl',
      'homePage',
      'description',
      'summary',
      'screen1ImageUrl',
      'authFlow'
    ]
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail']
  })

  return errors
}
