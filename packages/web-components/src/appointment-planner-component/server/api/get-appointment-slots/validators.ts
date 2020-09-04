import { AppRequest } from '../../../../../../utils/src/node/logger'

export const requiredInformation = [
  {
    fields: ['postcode', 'dateFrom', 'dateTo'],
    property: 'query',
  },
  {
    fields: ['reapit-customer'],
    property: 'headers',
  },
]
export const errorFieldRequiredInRequestProperty = (field: string, property: string) =>
  `Field ${field} is required in request's ${property}`

export const validateGetAppointmentSlotsRequest = (req: AppRequest) => {
  for (let { fields, property } of requiredInformation) {
    for (let field of fields) {
      const fieldValue = req[property][field]
      const isFieldValueEmpty = !fieldValue || typeof fieldValue !== 'string' || fieldValue.trim().length === 0
      if (isFieldValueEmpty) {
        return errorFieldRequiredInRequestProperty(field, property)
      }
    }
  }

  return null
}
