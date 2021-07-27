import axios from 'axios'
import { AppointmentModelPagedResult } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS, APP_CONSTANTS } from '../constants'
import config from '../../config.json'
import dayjs from 'dayjs'

const { platformBaseUri } = config
const { negCode } = APP_CONSTANTS

// Realised after I wrote this, there is no delete on the Appointments endpoint. So no need to GET and
// then DELETE old appointments before creating new ones. Leaving here as may well be useful at some point.
export const appointmentsGet = async (accessToken: string): Promise<AppointmentModelPagedResult | null> => {
  console.log('Getting appointments')
  const start = dayjs().subtract(1, 'week').startOf('day').toISOString()
  const end = dayjs().add(1, 'week').endOf('day').toISOString()

  try {
    const result = await axios.get<AppointmentModelPagedResult>(
      `${platformBaseUri}/appointments?negotiatorId=${negCode}&start=${start}&end=${end}`,
      {
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log('Got appointments', result.data)
    return result.data
  } catch (error) {
    console.error('Error getting appointments', error)
    process.exit(1)
  }
}
