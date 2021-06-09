import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const configurationAppointmentsApiService = async (
  session: ReapitConnectSession,
): Promise<ListItemModel[] | undefined> => {
  try {
    const response: ListItemModel[] | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: URLS.CONFIGURATION_APPOINTMENT_TYPES,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
