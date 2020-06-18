import { FormFieldInfo } from '@reapit/elements'

type Field = 'declarationFormField' | 'typeField' | 'reasonField' | 'riskAssessmentFormField'

const formFields: Record<Field, FormFieldInfo> = {
  declarationFormField: {
    name: 'metadata.declarationRisk.declarationForm',
    label: 'Upload file',
  },
  typeField: {
    name: 'metadata.declarationRisk.type',
    label: 'Risk Assessment Type',
  },
  reasonField: {
    name: 'metadata.declarationRisk.reason',
    label: 'Reason for Type',
  },
  riskAssessmentFormField: {
    name: 'metadata.declarationRisk.riskAssessmentForm',
    label: 'Upload File',
  },
}

export default formFields
