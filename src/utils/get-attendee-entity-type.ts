import { EntityType } from '@reapit/elements'

export const getAttendeeEntityType = (type: string): EntityType => {
  switch (type) {
    case 'contact':
      return EntityType.CONTACT
    case 'landlord':
      return EntityType.LANDLORD
    case 'tenant':
      return EntityType.TENNANCY
    case 'applicant':
      return EntityType.APPLICANT
    default:
      return EntityType.CONTACT
  }
}
