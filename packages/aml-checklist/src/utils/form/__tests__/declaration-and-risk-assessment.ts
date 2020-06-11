import { ContactModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'
import { validate, DeclarationAndRiskAssessmentErrorKeys } from '../declaration-and-risk-assessment'

type InputOutput = [ContactModel, PartialRecord<DeclarationAndRiskAssessmentErrorKeys, string | {}>]

const invalidValues: InputOutput[] = [
  [
    {
      metadata: {
        declarationRisk: {
          declarationForm: 'data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUg',
        },
      },
    },
    {
      metadata: {
        declarationRisk: {
          declarationForm: 'Wrong file type',
        },
      },
    },
  ],
  [
    {
      metadata: {
        declarationRisk: {
          riskAssessmentForm: 'data:video/quicktime;base64,AAAAFGZ0eXBxdCAgAAAAAH',
        },
      },
    },
    {
      metadata: {
        declarationRisk: {
          riskAssessmentForm: 'Wrong file type',
        },
      },
    },
  ],
]

const validValues: ContactModel[] = [
  {
    metadata: {
      declarationRisk: {
        declarationForm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABS8A',
      },
    },
  },
  {
    metadata: {
      declarationRisk: {
        riskAssessmentForm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABS8A',
      },
    },
  },
]

describe('validate', () => {
  it('invalid values', () => {
    invalidValues.forEach(([input, output]) => {
      expect(validate(input)).toEqual(output)
    })
  })

  it('valid values', () => {
    validValues.forEach(input => {
      expect(validate(input)).toEqual({})
    })
  })
})
