import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

export const getProperties = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const url = new URL(`${process.env.PLATFORM_API_BASE_URL}${req.url}`)
    const refreshResponse = await fetcher<PagedResultPropertyModel_, undefined>({
      url: String(url),
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
