import { NextFunction, Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'

const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshResponse = await fetcher<PagedResultPropertyModel_, undefined>({
      url: '/properties',
    })

    if (refreshResponse) {
      res.status(200)
      res.json(refreshResponse)
      res.end()
    }
  } catch (err) {
    res.status(400)
    next(err)
  }
}

export default getProperties
