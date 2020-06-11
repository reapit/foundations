import { ContactModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'

export type DeclarationAndRiskAssessmentErrorKeys = 'metadata'

export const validate = (values: ContactModel) => {
  const errors: PartialRecord<DeclarationAndRiskAssessmentErrorKeys, string | {}> = {}
  if (
    values.metadata?.declarationRisk?.declarationForm &&
    values.metadata?.declarationRisk?.declarationForm.indexOf('data:image') < 0
  ) {
    errors.metadata = {
      declarationRisk: {
        declarationForm: 'Wrong file type',
      },
    }
  }

  if (
    values.metadata?.declarationRisk?.riskAssessmentForm &&
    values.metadata?.declarationRisk?.riskAssessmentForm.indexOf('data:image') < 0
  ) {
    errors.metadata = {
      declarationRisk: {
        riskAssessmentForm: 'Wrong file type',
      },
    }
  }

  return errors
}
