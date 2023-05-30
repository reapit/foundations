import axios from 'axios'
import { AppointmentModelPagedResult, CreateAppointmentModel } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS, APP_CONSTANTS } from '../constants'
import { platformBaseUri } from '../../config.json'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

// I need to alternate payloads day on day as a run the workflow. To do this, calc the number of days since
// Jan 2021 and then check if number is even or odd.
const janFirstTwentyOne = dayjs('2021-01-01')
const today = dayjs()
const daysSinceJanFirstTwentyOne = Number(dayjs.duration(today.diff(janFirstTwentyOne)).asDays().toFixed(0))
const isOddDay = Boolean(daysSinceJanFirstTwentyOne % 2)
const { appointmentsPayloadOddDays, appointmentsPayloadEvenDays } = APP_CONSTANTS
export const appointmentsCreate = async (accessToken: string) => {
  const payloads = !isOddDay ? appointmentsPayloadOddDays : appointmentsPayloadEvenDays
  console.log('Creating appointments')

  try {
    await Promise.all(
      payloads.map(async (payload: CreateAppointmentModel) => {
        await axios.post<AppointmentModelPagedResult>(`${platformBaseUri}/appointments`, payload, {
          headers: {
            ...BASE_HEADERS,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(`Appointment for property ${payload.propertyId} created`)
      }),
    )
  } catch (error) {
    console.error('Error creating appointments', error.message)
    process.exit(1)
  }
}
