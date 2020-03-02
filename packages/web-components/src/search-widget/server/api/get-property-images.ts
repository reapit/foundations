import { NextFunction, Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher'
import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'

const getPropertyImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshResponse = await fetcher<PagedResultPropertyImageModel_, undefined>({
      url: '/propertyimages',
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

export default getPropertyImages
