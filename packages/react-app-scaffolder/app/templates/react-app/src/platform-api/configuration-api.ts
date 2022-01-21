import { ReapitConnectSession } from '@reapit/connect-session'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const configurationAppointmentsApiService = async (
  session: ReapitConnectSession | null,
): Promise<ListItemModel[] | undefined> => {
  try {
    if (!session) return

    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.CONFIGURATION_APPOINTMENT_TYPES}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (response.ok) {
      const responseJson: Promise<ListItemModel[] | undefined> = response.json()
      return responseJson
    }

    throw new Error('No response returned by API')
  } catch (err) {
    const error = err as Error
    console.error('Error fetching Configuration Appointment Types', error.message)
  }
}
