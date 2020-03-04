import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-client'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'

const getProperties = async (_req: Request, res: Response) => {
  try {
    const refreshResponse = await fetcher<PagedResultPropertyModel_, undefined>({
      url: `${process.env.PLATFORM_API_BASE_URL}/properties`,
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
