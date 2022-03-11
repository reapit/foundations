import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MetadataSchemaType } from '../utils/extract-metadata'
import { Contact, ContactFragment, ContactInput } from '../entities/contact'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'
import { Office } from '@/entities/office'
import { Negotiator } from '@/entities/negotiator'

const getContactsQuery = gql`
  ${ContactFragment}
  {
    GetContacts(embed: [offices, negotiators]) {
      _embedded {
        ...ContactFragment
      }
    }
  }
`

const searchContactsQuery = gql`
  ${ContactFragment}
  query SearchContacts($query: String!) {
    GetContacts(name: $query, embed: [offices, negotiators]) {
      _embedded {
        ...ContactFragment
      }
    }
  }
`

const getContactQuery = gql`
  ${ContactFragment}
  query GetContact($id: String!) {
    GetContactById(id: $id, embed: [offices, negotiators]) {
      ...ContactFragment
    }
  }
`

const createContactMutation = gql`
  ${ContactFragment}
  mutation CreateContact(
    $title: String
    $forename: String
    $surname: String
    $email: String
    $marketingConsent: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
  ) {
    CreateContact(
      title: $title
      forename: $forename
      surname: $surname
      marketingConsent: $marketingConsent
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      email: $email
    ) {
      ...ContactFragment
    }
  }
`

const updateContactMutation = gql`
  ${ContactFragment}
  mutation UpdateContact(
    $id: String!
    $title: String
    $forename: String
    $surname: String
    $email: String
    $marketingConsent: String
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
  ) {
    UpdateContact(
      id: $id
      title: $title
      forename: $forename
      surname: $surname
      marketingConsent: $marketingConsent
      email: $email
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
    ) {
      ...ContactFragment
    }
  }
`

type ContactAPIResponse<T> = Omit<Omit<Contact, 'offices'>, 'negotiators'> & {
  _embedded: T
}

type ContactsEmbeds = {
  offices: Office[]
  negotiators: Negotiator[]
}

const hoistEmbeds = <T, E>(object: T & { _embedded: any }): T & E => {
  const { _embedded, ...rest } = object
  return { ...rest, ..._embedded }
}

const updateContact = async (
  id: string,
  contact: ContactInput,
  accessToken: string,
  idToken: string,
): Promise<Contact> => {
  await query<ContactAPIResponse<null>>(updateContactMutation, { ...contact, id }, 'UpdateContact', {
    accessToken,
    idToken,
  })

  const newContact = await getContact(id, accessToken, idToken)
  if (!newContact) {
    throw new Error('Contact not found')
  }
  return newContact
}

const getContacts = async (accessToken: string, idToken: string): Promise<Contact[]> => {
  const contacts = await query<{ _embedded: ContactAPIResponse<ContactsEmbeds>[] }>(
    getContactsQuery,
    {},
    'GetContacts',
    {
      accessToken,
      idToken,
    },
  )

  return contacts._embedded
    .map((c) => hoistEmbeds<ContactAPIResponse<ContactsEmbeds>, ContactsEmbeds>(c))
    .map((c) => ({
      ...c,
      offices: c.offices || [],
      negotiators: c.negotiators || [],
    }))
}

const getContact = async (id: string, accessToken: string, idToken: string): Promise<Contact | null> => {
  const contact = await query<ContactAPIResponse<ContactsEmbeds> | null>(getContactQuery, { id }, 'GetContact', {
    accessToken,
    idToken,
  })

  if (!contact) {
    return null
  }

  const hoistedContact = hoistEmbeds<ContactAPIResponse<ContactsEmbeds>, ContactsEmbeds>(contact)
  return {
    ...hoistedContact,
    offices: hoistedContact.offices || [],
    negotiators: hoistedContact.negotiators || [],
  }
}

const createContact = async (contact: ContactInput, accessToken: string, idToken: string): Promise<Contact> => {
  const { id } = await query<ContactAPIResponse<null>>(createContactMutation, contact, 'CreateContact', {
    accessToken,
    idToken,
  })

  const newContact = await getContact(id, accessToken, idToken)
  if (!newContact) {
    throw new Error('Failed to create contact')
  }
  return newContact
}

const searchContacts = async (queryStr: string, accessToken: string, idToken: string): Promise<Contact[]> => {
  const contacts = await query<{ _embedded: ContactAPIResponse<ContactsEmbeds>[] }>(
    searchContactsQuery,
    { query: queryStr },
    'GetContacts',
    {
      accessToken,
      idToken,
    },
  )

  return contacts._embedded
    .map((c) => hoistEmbeds<ContactAPIResponse<ContactsEmbeds>, ContactsEmbeds>(c))
    .map((c) => ({
      ...c,
      offices: c.offices || [],
      negotiators: c.negotiators || [],
    }))
}

const entityName: MetadataSchemaType = 'contact'

@Resolver(() => Contact)
export class ContactResolver {
  @Authorized()
  @Query(() => [Contact])
  async listContacts(@Ctx() { accessToken, idToken }: Context): Promise<Contact[]> {
    const contacts = await getContacts(accessToken, idToken)

    return contacts.map((contact) => ({
      ...(contact.metadata || {}),
      ...contact,
    }))
  }

  @Authorized()
  @Query(() => [Contact])
  async searchContacts(@Ctx() { accessToken, idToken }: Context, @Arg('query') queryStr: string): Promise<Contact[]> {
    const contacts = await searchContacts(queryStr, accessToken, idToken)
    return contacts.map((contact) => ({
      ...(contact.metadata || {}),
      ...contact,
    }))
  }

  @Authorized()
  @Query(() => Contact)
  async getContact(@Ctx() { accessToken, idToken }: Context, @Arg('id') id: string): Promise<Contact> {
    const contact = await getContact(accessToken, idToken, id)
    if (!contact) {
      throw new Error(`Contact with id ${id} not found`)
    }
    return {
      ...(contact.metadata || {}),
      ...contact,
    }
  }

  @Authorized()
  @Mutation(() => Contact)
  async createContact(@Ctx() context: Context, @Arg(entityName) contact: ContactInput): Promise<Contact> {
    const { accessToken, idToken, operationMetadata } = context
    const { [entityName]: metadata } = operationMetadata
    const newContact = await createContact({ ...contact, metadata }, accessToken, idToken)
    return {
      ...(newContact.metadata || {}),
      ...newContact,
    }
  }

  @Authorized()
  @Mutation(() => Contact)
  async updateContact(
    @Ctx() context: Context,
    @Arg('id') id: string,
    @Arg(entityName) contact: ContactInput,
  ): Promise<Contact> {
    const { accessToken, idToken, operationMetadata } = context
    const { [entityName]: metadata } = operationMetadata
    const newContact = await updateContact(id, { ...contact, metadata }, accessToken, idToken)
    return {
      ...(newContact.metadata || {}),
      ...newContact,
    }
  }
}
