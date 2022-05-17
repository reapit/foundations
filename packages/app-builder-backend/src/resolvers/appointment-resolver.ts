import { Appointment, AppointmentFragment } from '../entities/appointments'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@apollo/client'
import { query } from '../utils/graphql-fetch'
import { Office } from '../entities/office'
import { Negotiator } from '../entities/negotiator'
import { Property } from '../entities/property'

const getAppointmentQuery = gql`
  ${AppointmentFragment}
  query GetAppointment($id: String!) {
    GetAppointmentById(id: $id, embed: [offices, negotiators, property]) {
      ...AppointmentFragment
    }
  }
`

const getAppointmentsQuery = gql`
  ${AppointmentFragment}
  query GetAppointments($start: String!, $end: String!) {
    GetAppointments(start: $start, end: $end, embed: [offices, negotiators, property]) {
      _embedded {
        ...AppointmentFragment
      }
    }
  }
`

const createAppointmentMutation = gql`
  ${AppointmentFragment}
  mutation CreateAppointment(
    $start: String!
    $end: String!
    $recurring: Boolean
    $cancelled: Boolean
    $followUp: AppointmentFollowUpInput
    $attendee: AppointmentAttendeeInput
    $organiserId: String!
    $accompanied: Boolean!
    $negotiatorConfirmed: Boolean!
    $attendeeConfirmed: Boolean!
    $propertyConfirmed: Boolean!
    $propertyId: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
  ) {
    CreateAppointment(
      start: $start
      end: $end
      recurring: $recurring
      cancelled: $cancelled
      followUp: $followUp
      attendee: $attendee
      organiserId: $organiserId
      accompanied: $accompanied
      negotiatorConfirmed: $negotiatorConfirmed
      attendeeConfirmed: $attendeeConfirmed
      propertyConfirmed: $propertyConfirmed
      propertyId: $propertyId
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      metadata: $metadata
    ) {
      ...AppointmentFragment
    }
  }
`

type AppointmentAPIResponse<T> = Omit<Omit<Omit<Appointment, 'offices'>, 'negotiators'>, 'property'> & {
  _embedded: T
  _eTag: string
}

type AppointmentsEmbeds = {
  offices: Office[]
  negotiators: Negotiator[]
  property: Property
}

const hoistEmbeds = <T, E>(object: T & { _embedded: any }): T & E => {
  const { _embedded, ...rest } = object
  return { ...rest, ..._embedded }
}

const addDefaultEmbeds = (appointment: Appointment): Appointment => ({
  ...appointment,
  offices: appointment.offices || [],
  negotiators: appointment.negotiators || [],
  property: appointment.property,
})

const convertDates = (appointment: Appointment): Appointment => ({
  ...appointment,
  created: new Date(appointment.created),
  modified: new Date(appointment.modified),
})

const getApiAppointment = async (
  id: string,
  accessToken: string,
  idToken: string,
): Promise<AppointmentAPIResponse<AppointmentsEmbeds> | null> => {
  return query<AppointmentAPIResponse<AppointmentsEmbeds> | null>(getAppointmentQuery, { id }, 'GetAppointmentById', {
    accessToken,
    idToken,
  })
}

const getAppointment = async (id: string, accessToken: string, idToken: string): Promise<Appointment | null> => {
  const appointment = await getApiAppointment(id, accessToken, idToken)

  if (!appointment) {
    return null
  }

  const hoistedAppointment = hoistEmbeds<AppointmentAPIResponse<AppointmentsEmbeds>, AppointmentsEmbeds>(appointment)
  return convertDates(addDefaultEmbeds(hoistedAppointment))
}

const getAppointments = async (
  accessToken: string,
  idToken: string,
  dates: { start: string; end: string },
): Promise<Appointment[]> => {
  const appointments = await query<{ _embedded: AppointmentAPIResponse<AppointmentsEmbeds>[] }>(
    getAppointmentsQuery,
    dates,
    'GetAppointments',
    {
      accessToken,
      idToken,
    },
  )

  return appointments._embedded
    .map((c) => hoistEmbeds<AppointmentAPIResponse<AppointmentsEmbeds>, AppointmentsEmbeds>(c))
    .map(addDefaultEmbeds)
    .map(convertDates)
}

const createAppointment = async (
  accessToken: string,
  idToken: string,
  appointment: Appointment,
): Promise<Appointment> => {
  const res = await query<AppointmentAPIResponse<null>>(createAppointmentMutation, appointment, 'CreateAppointment', {
    accessToken,
    idToken,
  })
  const { id } = res
  const newAppointment = await getAppointment(id, accessToken, idToken)
  if (!newAppointment) {
    throw new Error('Failed to create appointment')
  }
  return newAppointment
}

const entityName = 'appointment'

@Resolver(() => Appointment)
export class AppointmentResolver {
  @Authorized()
  @Query(() => [Appointment])
  async listAppointments(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('start') start: string,
    @Arg('end') end: string,
  ): Promise<Appointment[]> {
    const appointments = await getAppointments(accessToken, idToken, { start, end })
    appointments?.forEach((appointment) => {
      storeCachedMetadata(entityName, appointment.id, appointment.metadata)
    })
    return appointments
  }

  @Authorized()
  @Query(() => [Appointment])
  async getAppointment(@Ctx() { accessToken, idToken, storeCachedMetadata, id }: Context): Promise<Appointment> {
    const appointment = await getAppointment(id, accessToken, idToken)

    if (!appointment) {
      throw new Error(`Appointment with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, appointment.metadata)
    return appointment
  }

  @Authorized()
  @Query(() => Appointment)
  async createAppointment(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg(entityName) appointment: Appointment,
  ): Promise<Appointment> {
    const { [entityName]: metadata } = operationMetadata
    const newAppointment = await createAppointment(accessToken, idToken, { ...appointment, metadata })
    storeCachedMetadata(entityName, newAppointment.id, appointment.metadata)

    return newAppointment
  }
}
