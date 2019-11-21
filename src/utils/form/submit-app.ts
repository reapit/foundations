import { CreateAppModel } from '@/types/marketplace-api-schema'
import { validateRequire, validateEmail } from '@reapit/elements'
import { ScopeObject } from '../common'

export type CreateAppFormModel = Omit<CreateAppModel, 'scopes'> & {
  scopes: ScopeObject
}

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

export const validate = (values: CreateAppFormModel) => {
  let errors = validateRequire<CreateAppFormModel, SubmitAppFormErrorKeys>({
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
      'screen1ImageUrl'
    ]
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail']
  })

  return errors
}
