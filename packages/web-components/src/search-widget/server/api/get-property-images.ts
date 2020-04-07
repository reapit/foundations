import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { errorHandler } from '../../../common/utils/error-handler'
import { mapMinimalProperties } from '../utils/map-minimal-properties'
import { PickedPagedResultPropertyImageModel_ } from '../../types'
import { INCLUDED_PROPS } from '../constants/api'

export const getPropertyImages = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const fullPagedResult = await fetcher<PagedResultPropertyImageModel_, undefined>({
      url: `${process.env.PLATFORM_API_BASE_URL}${req.url}`,
      headers,
    })

    if (fullPagedResult) {
      const minimalResult = mapMinimalProperties<PagedResultPropertyImageModel_, PickedPagedResultPropertyImageModel_>(
        fullPagedResult,
        INCLUDED_PROPS.GET_PROPERTY_IMAGES,
      )
      res.status(200)
      res.json(minimalResult)
      res.end()
    }
  } catch (err) {
    errorHandler(err, res)
  }
}

export default getPropertyImages
