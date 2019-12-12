import { fetcher } from '@reapit/elements'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { URLS } from '@/constants/api'
import { AppointmentModel } from '@/types/platform'

export const fetchAppointment = async ({ id }) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.appointments}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'GET',
    headers: headers
  })
  return response
}

export const updateAppointment = async ({ id, ...rest }: AppointmentModel) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.appointments}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'PATCH',
    headers: headers,
    body: rest
  })
  return response
}
