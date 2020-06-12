import * as Yup from 'yup'
import { letterNumberSpaceRegex } from '@reapit/elements'

export const validationSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .max(256, 'Input is too long')
    .matches(letterNumberSpaceRegex, 'Input is not valid'),
  searchBy: Yup.string().required(),
})
