import { fetcher } from '@reapit/elements'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { URLS } from '@/constants/api'
import { ExtendedAppointmentModel } from '@/types/core'

export const fetchOffices = async (officeIds: string[]) => {
  return Promise.all(
    officeIds.map(officeId => {
      const office = fetchOffice({ id: officeId })

      if (!office) {
        throw new Error(`Unable to fetch office - id: ${officeId}`)
      }

      return office
    }),
  )
}

export const fetchAppointmentMetadata = async (appointment: ExtendedAppointmentModel) => {
  if (!appointment.id) {
    throw new Error('key propertyId of reponse of appointment is required')
  }
  const appointmentId = appointment.id
  if (!appointment.propertyId) {
    throw new Error(`key propertyId of appointment id ${appointmentId} is required`)
  }
  if (!appointment.officeIds) {
    throw new Error(`key officeIds of appointment id ${appointmentId} is required`)
  }
  if (!appointment.negotiatorIds) {
    throw new Error(`key NegotiatorIds of appointment id ${appointmentId} is required`)
  }

  const [property, negotiators, offices] = await Promise.all([
    fetchProperty({ id: appointment.propertyId }),
    fetchNegotiators(appointment.negotiatorIds),
    fetchOffices(appointment.officeIds),
  ])

  // avoid modifying the original object
  const modifiedAppointment = JSON.parse(JSON.stringify(appointment))
  modifiedAppointment.property = property
  modifiedAppointment.negotiators = negotiators
  modifiedAppointment.offices = offices

  return modifiedAppointment
}

export const fetchNegotiators = async (negotiatorsIds: string[]) => {
  return Promise.all(
    negotiatorsIds.map(negotiatorsId => {
      const negotiator = fetchNegotiator({ id: negotiatorsId })

      if (!negotiator) {
        throw new Error(`Unable to fetch office - id: ${negotiatorsId})`)
      }

      return negotiator
    }),
  )
}

export const fetchProperty = async ({ id }) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.properties}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const fetchNegotiator = async ({ id }) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.negotiators}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const fetchOffice = async ({ id }) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.offices}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const fetchAppointment = async ({ id }) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.appointments}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const updateAppointment = async ({ id, ...rest }: ExtendedAppointmentModel) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.appointments}/${id}`,
    api: process.env.PLATFORM_API_BASE_URL as string,
    method: 'PATCH',
    headers: headers,
    body: rest,
  })
  return response
}
