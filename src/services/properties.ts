import { PROPERTIES_API_URL } from '@/constants'
import { getAccessToken } from '@/utils/get-access-token'

export const getPropertiesForSale = async (keywords: string) => {
  const url = new URL(PROPERTIES_API_URL)
  url.searchParams.append(
    'SellingStatuses',
    ['forSale', 'underOffer'].join(',')
  )
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append(
    'marketingMode',
    ['selling', 'sellingAndLetting'].join(',')
  )
  url.searchParams.append('Address', keywords)

  const token = await getAccessToken()
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.json()
}

export const getPropertiesToRent = async (keywords: string) => {
  const url = new URL(PROPERTIES_API_URL)
  url.searchParams.append(
    'SellingStatuses',
    ['forSale', 'underOffer'].join(',')
  )
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append(
    'marketingMode',
    ['letting', 'sellingAndLetting'].join(',')
  )
  url.searchParams.append('Address', keywords)

  const token = await getAccessToken()
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.json()
}
