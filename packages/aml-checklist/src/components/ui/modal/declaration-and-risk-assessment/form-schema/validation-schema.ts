import * as Yup from 'yup'
import errorMessages from '@/constants/error-messages'
import { isValidUploadForm } from '@/utils/validates'

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    declarationRisk: Yup.object().shape({
      declarationForm: Yup.string().test('isValidBase64', errorMessages.WRONG_FILE_TYPE, (value) =>
        isValidUploadForm(value as string),
      ),
      riskAssessmentForm: Yup.string()
        .required(errorMessages.FIELD_REQUIRED)
        .test('isValidBase64', errorMessages.WRONG_FILE_TYPE, (value) => isValidUploadForm(value as string)),
    }),
  }),
})

export default validationSchema
