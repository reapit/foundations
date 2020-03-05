import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { errorHandler } from '../../../common/utils/error-handler'

const getPropertyImages = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const refreshResponse = await fetcher<PagedResultPropertyImageModel_, undefined>({
      url: `${process.env.PLATFORM_API_BASE_URL}/propertyimages`,
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

export default getPropertyImages
