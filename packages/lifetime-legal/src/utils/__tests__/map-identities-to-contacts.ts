import { contacts, responseContactsWithStatus } from '@/sagas/__stubs__/contacts'
import { identities } from '@/sagas/__stubs__/identities'

import { mapIdentitiesToContacts } from '../map-identities-to-contacts'

describe('mapIdentitiesToContacts', () => {
  it('should return correct value', () => {
    const result = mapIdentitiesToContacts(contacts, identities)
    expect(result).toEqual(responseContactsWithStatus)
  })

  it('should return original contact if dont have _embedded field', () => {
    const { _embedded, ...contactsWithoutEmbedded } = contacts
    const result = mapIdentitiesToContacts(contactsWithoutEmbedded, identities)
    const contactsWithEmbeddedUndefined = { ...contacts, _embedded: undefined }
    expect(result).toEqual(contactsWithEmbeddedUndefined)
    expect(_embedded).toBeDefined()
  })

  it('should map identityCheck to undefined if dont have _embedded field in identities', () => {
    const { _embedded, ...identitiesWithoutEmbedded } = identities
    const result = mapIdentitiesToContacts(contacts, identitiesWithoutEmbedded)
    const embeddedWithIdentityCheckUndefined = contacts._embedded.map(data => ({ ...data, identityCheck: undefined }))
    expect(result).toEqual({ ...contacts, _embedded: embeddedWithIdentityCheckUndefined })
    expect(_embedded).toBeDefined()
  })
})
