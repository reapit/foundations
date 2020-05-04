import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import pickBy from 'lodash.pickby'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'
import { PickedPropertyModel } from '../../types'
import { INCLUDED_PROPS } from '../constants/api'

export const getProperty = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const url = new URL(`${process.env.PLATFORM_API_BASE_URL}${req.url}`)
    const result = await fetcher<PickedPropertyModel, undefined>({
      url: String(url),
      headers,
    })

    if (result) {
      const minimalResult = pickBy(result, (_, key) => INCLUDED_PROPS.GET_PROPERTIES.includes(key))
      res.status(200)
      res.json(minimalResult)
      res.end()
    }
  } catch (err) {
    errorHandler(err, res)
  }
}

export default getProperty
