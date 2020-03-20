import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'

export const isCompletedProfile = (contact?: ContactModel | null) => {
  const isValidProfile =
    contact?.title &&
    contact?.surname &&
    contact?.forename &&
    contact?.dateOfBirth &&
    (contact?.homePhone || contact?.workPhone || contact?.mobilePhone)
  return !!isValidProfile
}

export const isCompletedPrimaryID = (identityCheck?: IdentityCheckModel | null) => {
  const isValidIdentityCheck =
    identityCheck?.identityDocument1?.details &&
    identityCheck?.identityDocument1?.documentId &&
    identityCheck?.identityDocument1?.expiry &&
    identityCheck?.identityDocument1?.typeId
  return !!isValidIdentityCheck
}

export const isCompletedSecondaryID = (identityCheck?: IdentityCheckModel | null) => {
  const isValidIdentityCheck =
    identityCheck?.identityDocument2?.details &&
    identityCheck?.identityDocument2?.documentId &&
    identityCheck?.identityDocument2?.expiry &&
    identityCheck?.identityDocument2?.typeId
  return !!isValidIdentityCheck
}

export const isCompletedAddress = (contact?: ContactModel | null) => {
  const isValidPrimaryAddress =
    !!contact?.primaryAddress?.line1 &&
    !!contact?.primaryAddress?.line3 &&
    !!contact?.primaryAddress?.postcode &&
    !!contact?.metadata?.primaryAddress?.year &&
    !!contact?.metadata?.primaryAddress?.month &&
    !!contact?.metadata?.primaryAddress?.documentType &&
    !!contact?.metadata?.primaryAddress?.documentImage
  return !!isValidPrimaryAddress
}

export const isCompletedDeclarationRisk = (contact: ContactModel | null) => {
  const isValidContactWithDecrationRisk =
    contact?.metadata?.declarationRisk?.reason &&
    contact?.metadata?.declarationRisk?.type &&
    (contact?.metadata?.declarationRisk?.declarationForm || contact?.metadata?.declarationRisk?.riskAssessmentForm)

  return !!isValidContactWithDecrationRisk
}

export const isCompletedAgentCheck = (identityCheck: IdentityCheckModel | null) => {
  const isValidAgentCheck =
    identityCheck?.metadata?.referralType &&
    identityCheck?.metadata?.timeSelection &&
    identityCheck?.metadata?.clientType &&
    identityCheck?.metadata?.placeMeet &&
    identityCheck?.metadata?.isUKResident
  return !!isValidAgentCheck
}
