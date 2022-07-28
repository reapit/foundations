import { Appointment, AppointmentFragment, AppointmentInput, AppointmentType } from '../entities/appointments'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'
import { Office } from '../entities/office'
import { Negotiator } from '../entities/negotiator'
import { Property } from '../entities/property'
import { getContact } from './contact-resolver'
import { Contact } from '../entities/contact'

const getAppointmentTypesQuery = gql`
  query GetConfigurationsByType {
    GetConfigurationsByType(type: appointmentTypes) {
      id
      value
    }
  }
`

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
    $attendee: CreateAppointmentModelAttendeeInput
    $organiserId: String!
    $propertyId: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
    $typeId: String!
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
      typeId: $typeId
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
    $attendee: UpdateAppointmentModelAttendeeInput
    $organiserId: String!
    $propertyId: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
    $typeId: String!
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
      typeId: $typeId
      metadata: $metadata
    ) {
      ...AppointmentFragment
    }
  }
`

type AppointmentAPIResponse<T> = Omit<
  Omit<Omit<Omit<Appointment, 'offices'>, 'negotiators'>, 'property'>,
  'attendee'
> & {
  _embedded: T
  _eTag: string
  attendee: {
    id: string
    type: string
  }
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

const convertDates = (obj?: any): any => {
  if (!obj) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj
  }
  const newObj = {}
  Object.entries(obj).forEach(([key, value]) => {
    if ((key === 'created' || key === 'modified') && typeof value === 'string') {
      newObj[key] = value && new Date(value)
    } else if (typeof value === 'object') {
      newObj[key] = convertDates(value)
    } else {
      newObj[key] = value
    }
  })
  return newObj
}

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

const moveAttendeeToAttendeeInfo = (appointment: AppointmentAPIResponse<AppointmentsEmbeds>): Appointment => ({
  ...appointment,
  attendee: undefined,
  attendeeInfo: appointment.attendee,
})

const getAppointment = async (id: string, accessToken: string, idToken: string): Promise<Appointment | null> => {
  const appointment = await getApiAppointment(id, accessToken, idToken)

  if (!appointment) {
    return null
  }

  const moved = moveAttendeeToAttendeeInfo(appointment)
  const hoisted = hoistEmbeds(moved as any)

  const hoistedAppointment = convertDates(hoisted)
  return addDefaultEmbeds(hoistedAppointment)
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
    .map(moveAttendeeToAttendeeInfo)
    .map((c) => hoistEmbeds<AppointmentAPIResponse<AppointmentsEmbeds>, AppointmentsEmbeds>(c as any))
    .map(convertDates)
    .map((c) => addDefaultEmbeds(c as any))
}

const createAppointment = async (
  accessToken: string,
  idToken: string,
  appointment: AppointmentInput,
): Promise<Appointment> => {
  const res = await query<AppointmentAPIResponse<null>>(
    createAppointmentMutation,
    {
      ...appointment,
      type: appointment.typeId,
      attendee: { type: 'contact', id: appointment.attendeeId },
    },
    'CreateAppointment',
    {
      accessToken,
      idToken,
    },
  )
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
    {
      ...appointment,
      attendee: { type: 'contact', id: appointment.attendeeId },
      id,
      _eTag,
    },
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
  @Query(() => [AppointmentType])
  async listAppointmentTypes(@Ctx() { accessToken, idToken }: Context): Promise<AppointmentType[]> {
    return query<AppointmentType[]>(getAppointmentTypesQuery, {}, 'GetConfigurationsByType', {
      accessToken,
      idToken,
    })
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

    const fullNewAppointment = await getAppointment(newAppointment.id, accessToken, idToken)
    if (!fullNewAppointment) {
      throw new Error('Failed to create appointment')
    }
    return fullNewAppointment
  }

  @Authorized()
  @Mutation(() => Appointment)
  async updateAppointment(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) appointment: AppointmentInput,
  ): Promise<Appointment> {
    const { [entityName]: metadata } = operationMetadata
    const newAppointment = await updateAppointment(accessToken, idToken, id, {
      ...appointment,
      metadata,
    })
    storeCachedMetadata(entityName, newAppointment.id, appointment.metadata)

    const fullNewAppointment = await getAppointment(newAppointment.id, accessToken, idToken)
    if (!fullNewAppointment) {
      throw new Error('Failed to create appointment')
    }
    return fullNewAppointment
  }

  @FieldResolver(() => Contact)
  async attendee(@Root() appointment: Appointment, @Ctx() context: Context): Promise<Contact | undefined> {
    if (appointment.attendee) {
      return appointment.attendee
    }
    const contact = await getContact(appointment.attendeeInfo.id, context.accessToken, context.idToken)
    if (!contact) {
      return undefined
    }
    return contact
  }

  @FieldResolver(() => AppointmentType)
  async type(@Root() appointment: Appointment, @Ctx() context: Context): Promise<AppointmentType> {
    if (appointment.type) {
      return appointment.type
    }
    const types = await this.listAppointmentTypes(context)
    const type = types.find((t) => t.id === appointment.typeId)
    if (!type) {
      throw new Error(`Appointment type with id ${appointment.typeId} not found`)
    }
    return type
  }
}
