import { AppRequest, AppResponse } from '@reapit/node-utils'

export const getAppointmentSlots = async (req: AppRequest, res: AppResponse) => {
  /*
   * TODOME(getOffice)
   * call get office, with embed endpoint
   */

  /*
   * TODOME(getConfig)
  - fetch config for reapit customer
   */

  /*
   * TODOME(requestApoinmtne)
   * call filter negotiators from office
   */

  /*
   * TODOME(requestApoinmtne)
   * fetch appointment for negotitor list
   */

  /*
   * TODOME(filterSlots)
   * generate time range
   * get free negotiator from range
   */

  res.status(200)
  res.end()
}
