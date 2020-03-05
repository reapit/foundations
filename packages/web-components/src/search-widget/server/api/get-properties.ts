import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

const getProperties = async (req: Request, res: Response) => {
  try {
    console.log(`${process.env.PLATFORM_API_BASE_URL}/properties`)
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const refreshResponse = await fetcher<PagedResultPropertyModel_, undefined>({
      url: `${process.env.PLATFORM_API_BASE_URL}/properties`,
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
