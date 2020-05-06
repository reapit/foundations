import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PickedPropertyModel } from '../../types'

export type GetPropertyType = {
  apiKey: string
  propertyId: string
}

export const getProperty = async (params: GetPropertyType): Promise<PickedPropertyModel | undefined> => {
  const { apiKey, propertyId } = params
  return fetcher<PickedPropertyModel, null>({
    url: `${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/properties/${propertyId}`,
    headers: getClientHeaders(apiKey),
  })
}
