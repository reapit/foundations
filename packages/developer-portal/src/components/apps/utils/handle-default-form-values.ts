import { Marketplace } from '@reapit/foundations-ts-definitions'
import { Dispatch, SetStateAction } from 'react'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'

export const formatAppFields = (appDetail: Marketplace.AppDetailModel | null, developerId?: string | null) => {
  if (appDetail && developerId) {
    const { media, scopes } = appDetail
    const icon = (media ?? []).filter(({ order }) => order === 0)[0]

    const images = (media ?? [])
      .filter((item) => item.type === 'image')
      .reduce(
        (formValuePartial: Partial<AppEditFormSchema>, image: Marketplace.MediaModel, index: number) => ({
          ...formValuePartial,
          [`screen${index + 1}ImageUrl`]: image?.uri ?? '',
        }),
        {
          screen1ImageUrl: '',
        },
      )

    const videos = (media ?? [])
      .filter((item) => item.type === 'video')
      .reduce(
        (formValuePartial: Partial<AppEditFormSchema>, image: Marketplace.MediaModel, index: number) => ({
          ...formValuePartial,
          [`videoUrl${index + 1}`]: image?.uri ?? '',
        }),
        {
          videoUrl1: '',
        },
      )

    const formValues: AppEditFormSchema = {
      ...defaultValues,
      developerId,
      name: appDetail.name ?? '',
      authFlow: appDetail.authFlow ?? '',
      description: appDetail.description ?? '',
      homePage: appDetail.homePage ?? '',
      telephone: appDetail.telephone ?? '',
      supportEmail: appDetail.supportEmail ?? '',
      summary: appDetail.summary ?? '',
      launchUri: appDetail.launchUri ?? '',
      isListed: appDetail.isListed ?? false,
      isAgencyCloudIntegrated: !appDetail.isDirectApi,
      isFree: appDetail.isFree ?? false,
      privacyPolicyUrl: appDetail.privacyPolicyUrl ?? '',
      pricingUrl: appDetail.pricingUrl ?? '',
      termsAndConditionsUrl: appDetail.termsAndConditionsUrl ?? '',
      scopes: scopes?.map((item) => item.name ?? '').join(',') ?? '',
      redirectUris: appDetail.redirectUris?.join(',') ?? '',
      signoutUris: appDetail.signoutUris?.join(',') ?? '',
      limitToClientIds: appDetail.limitToClientIds?.join(',') ?? '',
      isPrivateApp: Boolean(appDetail.limitToClientIds?.length),
      categoryIds: appDetail.categories?.map((item) => item.id ?? '').join(',') ?? '',
      desktopIntegrationTypeIds: appDetail.desktopIntegrationTypeIds?.join(',') ?? '',
      products: appDetail.products?.join(',') ?? '',
      iconImageUrl: icon?.uri ?? '',
      deletionProtection: appDetail.deletionProtection ?? false,
      launchWindowSizeX: appDetail.launchWindowSizeX ?? defaultValues.launchWindowSizeX,
      launchWindowSizeY: appDetail.launchWindowSizeY ?? defaultValues.launchWindowSizeY,
      ...images,
      ...videos,
    }

    return formValues
  }
}

export const handleSetDefaultFormValues =
  (
    setAppEditForm: Dispatch<SetStateAction<AppEditFormSchema>>,
    appDetail: Marketplace.AppDetailModel | null,
    developerId?: string | null,
  ) =>
  () => {
    const formValues = formatAppFields(appDetail, developerId)

    if (formValues) {
      setAppEditForm(formValues)
    }
  }
