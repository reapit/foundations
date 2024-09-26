import { Marketplace } from '@reapit/foundations-ts-definitions'
import { AppEditFormSchema } from '../edit/form-schema/form-fields'

export const sanitizeAppData = (appData: Marketplace.CreateAppRevisionModel): Marketplace.CreateAppRevisionModel => {
  const sanitizedAppData = appData
  if (!sanitizedAppData.description) {
    delete sanitizedAppData.description
  }
  if (!sanitizedAppData.summary) {
    delete sanitizedAppData.summary
  }
  if (!sanitizedAppData.supportEmail) {
    delete sanitizedAppData.supportEmail
  }
  if (!sanitizedAppData.telephone) {
    delete sanitizedAppData.telephone
  }
  if (!sanitizedAppData.homePage) {
    delete sanitizedAppData.homePage
  }
  if (!sanitizedAppData.launchUri) {
    delete sanitizedAppData.launchUri
  }

  if (!sanitizedAppData.videoUrl1) {
    delete sanitizedAppData.videoUrl1
  }

  if (!sanitizedAppData.videoUrl2) {
    delete sanitizedAppData.videoUrl2
  }

  if (!sanitizedAppData.categoryIds) {
    delete sanitizedAppData.categoryIds
  }

  if (sanitizedAppData.redirectUris && !sanitizedAppData.redirectUris.length) {
    delete sanitizedAppData.redirectUris
  }

  if (sanitizedAppData.signoutUris && !sanitizedAppData.signoutUris.length) {
    delete sanitizedAppData.signoutUris
  }

  if (!sanitizedAppData.desktopIntegrationTypeIds?.length) {
    delete sanitizedAppData.launchWindowSizeX
    delete sanitizedAppData.launchWindowSizeY
  }

  return sanitizedAppData
}

export const formatFormValues = ({
  name,
  categoryIds,
  telephone,
  supportEmail,
  launchUri,
  iconImageUrl,
  screen5ImageUrl,
  screen4ImageUrl,
  screen3ImageUrl,
  screen2ImageUrl,
  screen1ImageUrl,
  videoUrl1,
  videoUrl2,
  homePage,
  isAgencyCloudIntegrated,
  summary,
  description,
  termsAndConditionsUrl,
  developerId,
  isFree,
  deletionProtection,
  privacyPolicyUrl,
  pricingUrl,
  isListed,
  scopes,
  redirectUris,
  signoutUris,
  limitToClientIds,
  desktopIntegrationTypeIds,
  products,
  isPrivateApp,
  launchWindowSizeX,
  launchWindowSizeY,
}: AppEditFormSchema): Marketplace.CreateAppRevisionModel => {
  const appData = {
    name,
    telephone,
    supportEmail,
    launchUri,
    iconImageUrl,
    screen5ImageUrl,
    screen4ImageUrl,
    screen3ImageUrl,
    screen2ImageUrl,
    screen1ImageUrl,
    videoUrl1,
    videoUrl2,
    homePage,
    summary,
    description,
    termsAndConditionsUrl,
    developerId,
    isFree,
    deletionProtection,
    isListed,
    privacyPolicyUrl,
    pricingUrl,
    isDirectApi: !isAgencyCloudIntegrated,
    categoryIds: categoryIds.split(',').filter(Boolean),
    scopes: scopes.split(',').filter(Boolean),
    redirectUris: redirectUris.split(',').filter(Boolean),
    signoutUris: signoutUris.split(',').filter(Boolean),
    limitToClientIds: isPrivateApp ? limitToClientIds.split(',').filter(Boolean) : [],
    desktopIntegrationTypeIds: desktopIntegrationTypeIds.split(',').filter(Boolean),
    products: products.split(',').filter(Boolean),
    launchWindowSizeX: Number(launchWindowSizeX),
    launchWindowSizeY: Number(launchWindowSizeY),
  }

  return sanitizeAppData(appData)
}
