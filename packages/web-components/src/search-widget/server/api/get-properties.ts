import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

export const getUrlQuery = (isRental: boolean, keywords: string) => {
  const url = new URL(`${process.env.PLATFORM_API_BASE_URL}/properties`)
  url.searchParams.append('SellingStatuses', ['forSale', 'underOffer'].join(','))
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append('Address', keywords)
  if (isRental) {
    url.searchParams.append('marketingMode', ['letting', 'sellingAndLetting'].join(','))
  } else {
    url.searchParams.append('marketingMode', ['selling', 'sellingAndLetting'].join(','))
  }
  return String(url)
}

export const getProperties = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const isRental = req.body.isRental as boolean
    const keywords = req.body.keywords as string
    const refreshResponse = await fetcher<PagedResultPropertyModel_, undefined>({
      url: getUrlQuery(isRental, keywords),
      headers,
    })

    if (refreshResponse) {
      res.status(200)
      res.json(refreshResponse)
      res.end()
    }
  } catch (err) {
    errorHandler(err, res)
  }
}

export default getProperties
