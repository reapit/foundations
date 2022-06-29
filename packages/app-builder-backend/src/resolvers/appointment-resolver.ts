import { Appointment, AppointmentFragment, AppointmentInput } from '../entities/appointments'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
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
    $description: String!
    $attendee: AppointmentAttendeeInput
    $organiserId: String!
    $propertyId: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
  ) {
    CreateAppointment(
      start: $start
      end: $end
      description: $description
      attendee: $attendee
      organiserId: $organiserId
      propertyId: $propertyId
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      metadata: $metadata
    ) {
      ...AppointmentFragment
    }
  }
`

const updateAppointmentMutation = gql`
  ${AppointmentFragment}
  mutation UpdateAppointment(
    $id: String!
    $start: String!
    $end: String!
    $description: String!
    $attendee: AppointmentAttendeeInput
    $organiserId: String!
    $propertyId: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
  ) {
    UpdateAppointment(
      id: $id
      start: $start
      end: $end
      description: $description
      attendee: $attendee
      organiserId: $organiserId
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
  appointment: AppointmentInput,
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

const updateAppointment = async (
  id: string,
  accessToken: string,
  idToken: string,
  appointment: AppointmentInput,
): Promise<Appointment> => {
  const existingAppointment = await getApiAppointment(id, accessToken, idToken)
  if (!existingAppointment) {
    throw new Error(`Contact with id ${id} not found`)
  }
  const { _eTag } = existingAppointment
  await query<AppointmentAPIResponse<null>>(
    updateAppointmentMutation,
    { ...appointment, id, _eTag },
    'UpdateAppointment',
    {
      accessToken,
      idToken,
    },
  )

  const newContact = await getAppointment(id, accessToken, idToken)
  if (!newContact) {
    throw new Error('Contact not found')
  }
  return newContact
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
  @Query(() => Appointment)
  async getAppointment(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Appointment> {
    const appointment = await getAppointment(id, accessToken, idToken)

    if (!appointment) {
      throw new Error(`Appointment with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, appointment.metadata)
    return appointment
  }

  @Authorized()
  @Mutation(() => Appointment)
  async createAppointment(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg(entityName) appointment: AppointmentInput,
  ): Promise<Appointment> {
    const { [entityName]: metadata } = operationMetadata
    const newAppointment = await createAppointment(accessToken, idToken, { ...appointment, metadata })
    storeCachedMetadata(entityName, newAppointment.id, appointment.metadata)

    return newAppointment
  }

  @Authorized()
  @Mutation(() => Appointment)
  async updateAppointment(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) appointment: AppointmentInput,
  ): Promise<Appointment> {
    const { [entityName]: metadata } = operationMetadata
    const newAppointment = await updateAppointment(accessToken, idToken, id, { ...appointment, metadata })
    storeCachedMetadata(entityName, newAppointment.id, appointment.metadata)

    return newAppointment
  }
}
