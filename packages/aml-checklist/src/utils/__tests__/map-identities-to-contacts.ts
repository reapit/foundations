import { contacts, responseContactsWithStatus } from '@/sagas/__stubs__/contacts'
import { identities } from '@/sagas/__stubs__/identities'
import { mapIdentitiesToContacts } from '../map-identities-to-contacts'
import { PagedResultIdentityCheckModel_ } from '@reapit/foundations-ts-definitions'

describe('mapIdentitiesToContacts', () => {
  it('should return correct value', () => {
    const result = mapIdentitiesToContacts(contacts, identities)
    expect(result).toEqual(responseContactsWithStatus)
  })

  it('should return original contact if dont have _embedded field', () => {
    const { ...contactsWithoutEmbedded } = contacts
    const result = mapIdentitiesToContacts({ ...contactsWithoutEmbedded, _embedded: undefined }, identities)
    const contactsWithEmbeddedUndefined = { ...contacts, _embedded: undefined }
    expect(result).toEqual(contactsWithEmbeddedUndefined)
  })

  it('should map identityCheck to undefined if dont have _embedded field in identities', () => {
    const { ...identitiesWithoutEmbedded } = identities
    const result = mapIdentitiesToContacts(contacts, {
      ...identitiesWithoutEmbedded,
      _embedded: undefined,
    } as PagedResultIdentityCheckModel_)
    const embeddedWithIdentityCheckUndefined = contacts._embedded.map(data => ({ ...data, identityCheck: undefined }))
    expect(result).toEqual({ ...contacts, _embedded: embeddedWithIdentityCheckUndefined })
  })
})
