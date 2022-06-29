import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MetadataSchemaType } from '../utils/extract-metadata'
import { Contact, ContactFragment, ContactInput } from '../entities/contact'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'
import { Office } from '../entities/office'
import { Negotiator } from '../entities/negotiator'

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
    $forename: String
    $surname: String
    $email: String
    $primaryAddress: ContactAddressInput!
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
  ) {
    CreateContact(
      forename: $forename
      surname: $surname
      primaryAddress: $primaryAddress
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      email: $email
      metadata: $metadata
    ) {
      ...ContactFragment
    }
  }
`

const updateContactMutation = gql`
  ${ContactFragment}
  mutation UpdateContact(
    $id: String!
    $forename: String
    $surname: String
    $email: String
    $primaryAddress: ContactAddressInput!
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
    $_eTag: String!
  ) {
    UpdateContact(
      id: $id
      forename: $forename
      surname: $surname
      primaryAddress: $primaryAddress
      email: $email
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      metadata: $metadata
      _eTag: $_eTag
    ) {
      ...ContactFragment
    }
  }
`

type ContactAPIResponse<T> = Omit<Omit<Contact, 'offices'>, 'negotiators'> & {
  _embedded: T
  _eTag: string
}

type ContactsEmbeds = {
  offices: Office[]
  negotiators: Negotiator[]
}

const hoistEmbeds = <T, E>(object: T & { _embedded: any }): T & E => {
  const { _embedded, ...rest } = object
  return { ...rest, ..._embedded }
}

const convertDates = (contact: Contact): Contact => ({
  ...contact,
  created: new Date(contact.created),
  modified: new Date(contact.modified),
})

const updateContact = async (
  id: string,
  contact: ContactInput,
  accessToken: string,
  idToken: string,
): Promise<Contact> => {
  const existingContact = await getApiContact(id, accessToken, idToken)
  if (!existingContact) {
    throw new Error(`Contact with id ${id} not found`)
  }
  const { _eTag } = existingContact
  await query<ContactAPIResponse<null>>(updateContactMutation, { ...contact, id, _eTag }, 'UpdateContact', {
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
    .map(addDefaultEmbeds)
    .map(convertDates)
}

const getApiContact = async (
  id: string,
  accessToken: string,
  idToken: string,
): Promise<ContactAPIResponse<ContactsEmbeds> | null> => {
  return query<ContactAPIResponse<ContactsEmbeds> | null>(getContactQuery, { id }, 'GetContactById', {
    accessToken,
    idToken,
  })
}

const getContact = async (id: string, accessToken: string, idToken: string): Promise<Contact | null> => {
  const contact = await getApiContact(id, accessToken, idToken)

  if (!contact) {
    return null
  }

  const hoistedContact = hoistEmbeds<ContactAPIResponse<ContactsEmbeds>, ContactsEmbeds>(contact)
  return convertDates(addDefaultEmbeds(hoistedContact))
}

const createContact = async (contact: ContactInput, accessToken: string, idToken: string): Promise<Contact> => {
  const res = await query<ContactAPIResponse<null>>(createContactMutation, contact, 'CreateContact', {
    accessToken,
    idToken,
  })
  const { id } = res
  const newContact = await getContact(id, accessToken, idToken)
  if (!newContact) {
    throw new Error('Failed to create contact')
  }
  return newContact
}

const addDefaultEmbeds = (contact: Contact): Contact => ({
  ...contact,
  offices: contact.offices || [],
  negotiators: contact.negotiators || [],
})

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
    .map(addDefaultEmbeds)
}

const entityName: MetadataSchemaType = 'contact'

@Resolver(() => Contact)
export class ContactResolver {
  @Authorized()
  @Query(() => [Contact])
  async listContacts(@Ctx() { accessToken, idToken, storeCachedMetadata }: Context): Promise<Contact[]> {
    const contacts = await getContacts(accessToken, idToken)
    contacts.forEach((contact) => {
      storeCachedMetadata(entityName, contact.id, contact.metadata)
    })
    return contacts
  }

  @Authorized()
  @Query(() => [Contact])
  async searchContacts(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('query') queryStr: string,
  ): Promise<Contact[]> {
    const contacts = await searchContacts(queryStr, accessToken, idToken)
    contacts.forEach((contact) => {
      storeCachedMetadata(entityName, contact.id, contact.metadata)
    })
    return contacts
  }

  @Authorized()
  @Query(() => Contact)
  async getContact(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Contact> {
    const contact = await getContact(id, accessToken, idToken)
    if (!contact) {
      throw new Error(`Contact with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, contact.metadata)
    return contact
  }

  @Authorized()
  @Mutation(() => Contact)
  async createContact(@Ctx() context: Context, @Arg(entityName) contact: ContactInput): Promise<Contact> {
    const { accessToken, idToken, operationMetadata, storeCachedMetadata } = context
    const { [entityName]: metadata } = operationMetadata
    const newContact = await createContact({ ...contact, metadata }, accessToken, idToken)
    storeCachedMetadata(entityName, newContact.id, contact.metadata)
    return newContact
  }

  @Authorized()
  @Mutation(() => Contact)
  async updateContact(
    @Ctx() context: Context,
    @Arg('id') id: string,
    @Arg(entityName) contact: ContactInput,
  ): Promise<Contact> {
    const { accessToken, idToken, operationMetadata, storeCachedMetadata } = context
    const { [entityName]: metadata } = operationMetadata
    const newContact = await updateContact(id, { ...contact, metadata }, accessToken, idToken)
    storeCachedMetadata(entityName, newContact.id, contact.metadata)
    return newContact
  }
}
