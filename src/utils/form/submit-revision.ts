import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import {
  validateRequire,
  validateEmail,
  validateURI,
  validateMaxCharacterLength,
  validateMinCharacterLength
} from '../validators'

export type SubmitRevisionFormErrorKeys = keyof CreateAppRevisionModel

export const validate = (values: CreateAppRevisionModel) => {
  let errors = validateRequire<CreateAppRevisionModel, SubmitRevisionFormErrorKeys>({
    values,
    currentErrors: {},
    keys: [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageData',
      'homePage',
      'description',
      'summary',
      'screen1ImageData'
    ]
  })

  errors = validateMinCharacterLength({ values, currentErrors: errors, keys: ['description'], length: 150 })

  errors = validateMinCharacterLength({ values, currentErrors: errors, keys: ['summary'], length: 50 })

  errors = validateMaxCharacterLength({ values, currentErrors: errors, keys: ['summary'], length: 150 })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail']
  })

  errors = validateURI({
    values,
    currentErrors: errors,
    keys: ['launchUri', 'homePage']
  })

  return errors
}
