import { CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'
import { AppEditFormSchema } from '../edit/form-schema/form-fields'

export const formatFormValues = ({
  scopes,
  redirectUris,
  signoutUris,
  limitToClientIds,
  desktopIntegrationTypeIds,
  products,
  isPrivateApp,
  ...rest
}: AppEditFormSchema): CreateAppRevisionModel => {
  return {
    scopes: scopes.split(',').filter(Boolean),
    redirectUris: redirectUris.split(',').filter(Boolean),
    signoutUris: signoutUris.split(',').filter(Boolean),
    limitToClientIds: isPrivateApp ? limitToClientIds.split(',').filter(Boolean) : [],
    desktopIntegrationTypeIds: desktopIntegrationTypeIds.split(',').filter(Boolean),
    products: products.split(',').filter(Boolean),
    ...rest,
  }
}
