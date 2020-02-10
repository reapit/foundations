import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'

export const isCompletedProfile = (contact: ContactModel | null) => {
  if (!contact) {
    return false
  }
  const { title, surname, forename, dateOfBirth, homePhone, mobilePhone } = contact
  if (title && surname && forename && dateOfBirth && (homePhone || mobilePhone)) {
    return true
  }
  return false
}

export const isCompletedPrimaryID = (identityCheck: IdentityCheckModel | null) => {
  const isValidIdentityCheck = identityCheck && identityCheck.metadata && identityCheck.identityDocument1
  if (!isValidIdentityCheck) {
    return false
  }
  const { identityDocument1, metadata } = identityCheck as IdentityCheckModel

  if (metadata?.primaryIdUrl && identityDocument1) {
    if (identityDocument1.typeId && identityDocument1.expiry && identityDocument1.details) {
      return true
    }
  }
  return false
}

export const isCompletedSecondaryID = (identityCheck: IdentityCheckModel | null) => {
  const isValidIdentityCheck = identityCheck && identityCheck.metadata && identityCheck.identityDocument2
  if (!isValidIdentityCheck) {
    return false
  }
  const { identityDocument2, metadata } = identityCheck as IdentityCheckModel

  if (metadata?.secondaryIdUrl && identityDocument2) {
    if (identityDocument2.typeId && identityDocument2.expiry && identityDocument2.details) {
      return true
    }
  }

  return false
}

export const isCompletedAddress = (contact: ContactModel | null) => {
  if (!contact) {
    return false
  }
  const { primaryAddress, metadata } = contact
  if (primaryAddress && metadata && metadata.addresses) {
    return (
      primaryAddress.line1 &&
      primaryAddress.line3 &&
      primaryAddress.postcode &&
      metadata.addresses.some((item: any) => item.year && item.month && item.documentImage)
    )
  }
  return false
}

export const isCompletedDeclarationRisk = (contact: ContactModel | null) => {
  const isValidContactWithDecrationRisk = contact && contact.metadata && contact.metadata.declarationRisk
  if (!isValidContactWithDecrationRisk) {
    return false
  }
  const { reason, type, declarationForm, riskAssessmentForm } = contact?.metadata?.declarationRisk
  return Boolean(reason && type && (declarationForm || riskAssessmentForm))
}

export const isCompletedAgentCheck = (identityCheck: IdentityCheckModel | null) => {
  const isValidAgentCheck = identityCheck && identityCheck.metadata
  if (!isValidAgentCheck) {
    return false
  }

  return Boolean(
    identityCheck?.metadata?.referralType &&
      identityCheck?.metadata?.timeSelection &&
      identityCheck?.metadata?.clientType &&
      identityCheck?.metadata?.placeMeet &&
      identityCheck?.metadata?.isUKResident,
  )
}
