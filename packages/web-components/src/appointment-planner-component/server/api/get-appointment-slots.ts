import { AppRequest, AppResponse } from '@reapit/node-utils'

export const getAppointmentSlots = async (req: AppRequest, res: AppResponse) => {
  res.status(200)
  res.end()
}
