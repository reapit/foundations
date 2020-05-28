import { Request, Response } from 'express'
import { fetcher } from '../../../common/utils/fetcher-server'
import { PagedResultAppointmentModel_ } from '@reapit/foundations-ts-definitions'
import { errorHandler } from '../../../common/utils/error-handler'
import { getServerHeaders } from '../../../common/utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

export const getAppointmentSlots = async (req: Request, res: Response) => {
  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.APPOINTMENT_PLANNER)
    const url = new URL(`${process.env.PLATFORM_API_BASE_URL}${req.url}`)
    const response = await fetcher<PagedResultAppointmentModel_, undefined>({
      url: String(url),
      headers,
    })

    if (response) {
      res.status(200)
      res.json(response)
      res.end()
    }
  } catch (err) {
    errorHandler(err, res)
  }
}
