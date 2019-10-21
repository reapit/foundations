// TODO: will replace any type
export const isCompletedProfile = (contact: any) => {
  if (!contact) {
    return false
  }
  const { title, surname, forename, dateOfBirth, communications } = contact
  if (title && surname && forename && dateOfBirth && communications) {
    return communications.some((item: any) => item.label === 'Mobile' || item.label === 'Home')
  }
  return false
}

export const isCompletedPrimaryID = (identityCheck: any) => {
  const isValidIdentityCheck = identityCheck && identityCheck.metadata && identityCheck.documents
  if (!isValidIdentityCheck) {
    return false
  }
  const { documents, metadata } = identityCheck
  const { primaryIdUrl } = metadata
  if (primaryIdUrl && documents[0]) {
    if (documents[0].typeId && documents[0].expiry && documents[0].details) {
      return true
    }
  }
  return false
}

export const isCompletedSecondaryID = (identityCheck: any) => {
  const isValidIdentityCheck = identityCheck && identityCheck.metadata && identityCheck.documents
  if (!isValidIdentityCheck) {
    return false
  }
  const { documents, metadata } = identityCheck
  const { primaryIdUrl, secondaryIdUrl } = metadata
  const isHavePrimaryId = primaryIdUrl && secondaryIdUrl && documents[1]
  if (isHavePrimaryId) {
    if (documents[1].typeId && documents[1].expiry && documents[1].details) {
      return true
    }
  }
  const isNotHavePrimaryId = !primaryIdUrl && secondaryIdUrl && documents[0]
  if (isNotHavePrimaryId) {
    if (documents[0].typeId && documents[0].expiry && documents[0].details) {
      return true
    }
  }

  return false
}

export const isCompletedAddress = (contact: any) => {
  if (!contact) {
    return false
  }
  const { addresses, metadata } = contact
  if (addresses && metadata && metadata.addresses) {
    return (
      addresses.some((item: any) => item.line1 && item.line3 && item.postcode) &&
      metadata.addresses.some((item: any) => item.year && item.month && item.documentImage)
    )
  }
  return false
}

export const isCompletedDeclarationRisk = (contact: any) => {
  const isValidContactWithDecrationRisk = contact && contact.metadata && contact.metadata.declarationRisk
  if (!isValidContactWithDecrationRisk) {
    return false
  }
  const { reason, type, declarationForm, riskAssessmentForm } = contact.metadata.declarationRisk
  return Boolean(reason && type && (declarationForm || riskAssessmentForm))
}

export const isCompletedAgentCheck = (identityCheck: any) => {
  const isValidAgentCheck = identityCheck && identityCheck.metadata
  if (!isValidAgentCheck) {
    return false
  }
  const { referralType, timeSelection, clientType, placeMeet, isUKResident } = identityCheck.metadata
  return Boolean(referralType && timeSelection && clientType && placeMeet && isUKResident)
}
