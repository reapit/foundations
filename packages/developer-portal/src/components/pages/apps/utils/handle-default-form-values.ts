import { AppDetailModel, MediaModel } from '@reapit/foundations-ts-definitions'
import { Dispatch, SetStateAction } from 'react'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'

export const handleSetDefaultFormValues =
  (
    setAppEditForm: Dispatch<SetStateAction<AppEditFormSchema>>,
    appDetail: AppDetailModel | null,
    developerId?: string | null,
  ) =>
  () => {
    if (appDetail && developerId) {
      const { media, scopes } = appDetail
      const icon = (media ?? []).filter(({ order }) => order === 0)[0]
      const images = (media ?? [])
        .filter(({ type }) => type !== 'icon')
        .reduce(
          (formValuePartial: Partial<AppEditFormSchema>, image: MediaModel, index: number) => ({
            ...formValuePartial,
            [`screen${index + 1}ImageUrl`]: image?.uri ?? '',
          }),
          {
            screen1ImageUrl: '',
          },
        )

      const formValues: AppEditFormSchema = {
        ...defaultValues,
        developerId,
        name: appDetail.name ?? '',
        categoryId: appDetail.category?.id ?? '',
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
        desktopIntegrationTypeIds: appDetail.desktopIntegrationTypeIds?.join(',') ?? '',
        products: appDetail.products?.join(',') ?? '',
        iconImageUrl: icon?.uri ?? '',
        ...images,
      }

      setAppEditForm(formValues)
    }
  }
