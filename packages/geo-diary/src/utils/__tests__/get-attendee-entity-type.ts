import { getAttendeeEntityType } from '../get-attendee-entity-type'
import { EntityType } from '@reapit/elements'

describe('getAttendeeEntityType', () => {
  it('runs correctly', () => {
    expect(getAttendeeEntityType('contact')).toBe(EntityType.CONTACT)
    expect(getAttendeeEntityType('landlord')).toBe(EntityType.LANDLORD)
    expect(getAttendeeEntityType('tenant')).toBe(EntityType.TENNANCY)
    expect(getAttendeeEntityType('applicant')).toBe(EntityType.APPLICANT)
    expect(getAttendeeEntityType('')).toBe(EntityType.CONTACT)
  })
})
