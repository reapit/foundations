import { FormFieldInfo } from '@reapit/elements'

type Field = 'declarationForm' | 'type' | 'reason' | 'riskAssessmentForm'

const formFields: Record<Field, FormFieldInfo> = {
  declarationForm: {
    name: 'metadata.declarationRisk.declarationForm',
    label: 'Upload file',
  },
  type: {
    name: 'metadata.declarationRisk.type',
    label: 'Risk Assessment Type',
  },
  reason: {
    name: 'metadata.declarationRisk.reason',
    label: 'Reason for Type',
  },
  riskAssessmentForm: {
    name: 'metadata.declarationRisk.riskAssessmentForm',
    label: 'Upload File',
  },
}

export default formFields
