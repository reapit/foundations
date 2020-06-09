import { fetcher } from '../../../common/utils/fetcher-server'
import { stringifyError } from '@reapit/node-utils'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'
import { PickedPropertyModel } from '../../types'
import { mapMinimalProperty } from '../utils/map-minimal-property'
import { INCLUDED_PROPS } from '../constants/api'
import { logger } from '../core/logger'
import { AppRequest, AppResponse } from '@reapit/node-utils'

export const getProperty = async (req: AppRequest, res: AppResponse) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const url = new URL(`${process.env.PLATFORM_API_BASE_URL}${req.url}`)
    const result = await fetcher<PropertyModel, undefined>({
      url: String(url),
      headers,
    })

    if (result) {
      const minimalResult = mapMinimalProperty<PropertyModel, PickedPropertyModel>(
        result,
        INCLUDED_PROPS.GET_PROPERTIES,
      )
      res.status(200)
      res.json(minimalResult)
      res.end()
    }
  } catch (err) {
    logger.error('getProperty', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })
    errorHandler(err, res, req, 'getProperty', logger)
  }
}

export default getProperty
