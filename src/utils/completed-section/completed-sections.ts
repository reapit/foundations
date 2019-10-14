export const isCompletedProfile = (contact: any) => {
  const { title, surname, forename, dateOfBirth, communications } = contact
  if (title && surname && forename && dateOfBirth && communications) {
    return communications.some((item: any) => item.label === 'Mobile' || item.label === 'Home')
  }
  return false
}

export const isCompletedPrimaryID = (contact: any) => {
  const { primaryId } = contact.metadata
  let flag: boolean = false
  if (primaryId) {
    flag = true
    primaryId.forEach((idList: any) => {
      idList.documents.forEach((item: any) => {
        if (!item.typeId || !item.details || !item.expiry || !item.fileUrl) {
          flag = false
        }
      })
    })
  }
  return flag
}

export const isCompletedSecondaryID = (contact: any) => {
  const { secondaryId } = contact.metadata
  let flag: boolean = false
  if (secondaryId) {
    flag = true
    secondaryId.forEach((idList: any) => {
      idList.documents.forEach((item: any) => {
        console.log(item)
        if (!item.typeId || !item.details || !item.expiry || !item.fileUrl) {
          flag = false
        }
      })
    })
  }
  return flag
}

export const isCompletedAddress = (contact: any) => {
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
  const { metadata } = contact
  if (metadata && metadata.declarationRisk) {
    const { reason, type, declarationForm, riskAssessmentForm } = metadata.declarationRisk
    return Boolean(reason && type && (declarationForm || riskAssessmentForm))
  }
  return false
}
