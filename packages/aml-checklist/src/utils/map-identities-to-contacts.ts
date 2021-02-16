import { IdentityCheckModelPagedResult, ContactModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mapIdentitiesToContacts = (
  responseContacts: ContactModelPagedResult,
  responseIdentities: IdentityCheckModelPagedResult,
) => {
  // For each contact, find the first identity in the list, take status and set as identityCheck
  const responseContactsEmbeddedWithStatus = responseContacts._embedded?.map(({ id, identityCheck, ...rest }) => {
    if (identityCheck) {
      return {
        id,
        identityCheck,
        ...rest,
      }
    }
    const identity = responseIdentities._embedded?.find(({ contactId }) => contactId === id)

    return {
      ...rest,
      id,
      identityCheck: identity?.status,
    }
  })
  return {
    ...responseContacts,
    _embedded: responseContactsEmbeddedWithStatus,
  }
}
