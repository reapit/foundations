import * as Yup from 'yup'
import errorMessages from '@/constants/error-messages'
import formFields from './form-fields'

const { FIELD_REQUIRED } = errorMessages
const secondaryAddressFields = formFields('secondaryAddress')

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    primaryAddress: Yup.object().shape({
      documentImage: Yup.string().required(FIELD_REQUIRED),
    }),
    secondaryAddress: Yup.object().shape({
      documentImage: Yup.string().when([secondaryAddressFields.line1Field.name], {
        is: (line1) => line1,
        then: Yup.string().required(FIELD_REQUIRED),
      }),
    }),
  }),
})

export default validationSchema
