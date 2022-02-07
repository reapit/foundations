import { extractMetadata } from '../utils/extract-metadata'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { Contact, ContactFragment, ContactInput } from '../entities/contact'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'

const getContactsQuery = gql`
  ${ContactFragment}
  {
    GetContacts {
      _embedded {
        ...ContactFragment
      }
    }
  }
`

const searchContactsQuery = gql`
  ${ContactFragment}
  query SearchContacts($query: String!) {
    GetContacts(name: $query) {
      _embedded {
        ...ContactFragment
      }
    }
  }
`

const getContactQuery = gql`
  ${ContactFragment}
  query GetContact($id: String!) {
    GetContactById(id: $id) {
      ...ContactFragment
    }
  }
`

const createContactMutation = gql`
  mutation CreateContact($title: String, $forename: String, $surname: String) {
    CreateContact(title: $title, forename: $forename, surname: $surname)
  }
`

const updateContactMutation = gql`
  mutation UpdateContact($id: String!, $title: String, $forename: String, $surname: String) {
    UpdateContact(id: $id, title: $title, forename: $forename, surname: $surname)
  }
`

const updateContact = async (id: string, contact: ContactInput, accessToken: string, idToken: string) => {
  return query<Contact>(updateContactMutation, { ...contact, id }, 'UpdateContact', { accessToken, idToken })
}

const getContacts = async (accessToken: string, idToken: string) => {
  return query<{ _embedded: Contact[] }>(getContactsQuery, {}, 'GetContacts', { accessToken, idToken })
}

const getContact = async (id: string, accessToken: string, idToken: string) => {
  return query<Contact | null>(getContactQuery, { id }, 'GetContact', { accessToken, idToken })
}

const createContact = async (contact: ContactInput, accessToken: string, idToken: string) => {
  return query<Contact>(createContactMutation, contact, 'CreateContact', { accessToken, idToken })
}

const searchContacts = async (queryStr: string, accessToken: string, idToken: string) => {
  return query<{ _embedded: Contact[] }>(searchContactsQuery, { query: queryStr }, 'GetContacts', {
    accessToken,
    idToken,
  })
}

@Resolver(() => Contact)
export class ContactResolver {
  @Authorized()
  @Query(() => [Contact])
  async listContacts(@Ctx() { accessToken, idToken }: Context): Promise<Contact[]> {
    const { _embedded } = await getContacts(accessToken, idToken)
    return _embedded.map((contact) => ({
      ...(contact.metadata || {}),
      ...contact,
    }))
  }

  @Authorized()
  @Query(() => [Contact])
  async searchContacts(@Ctx() { accessToken, idToken }: Context, @Arg('query') queryStr: string): Promise<Contact[]> {
    const { _embedded } = await searchContacts(queryStr, accessToken, idToken)
    return _embedded.map((contact) => ({
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
  async createContact(@Ctx() context: Context, @Arg('contact') contact: ContactInput): Promise<Contact> {
    const { accessToken, idToken } = context
    const newContact = await createContact(
      extractMetadata<ContactInput>(context, 'contact', contact),
      accessToken,
      idToken,
    )
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
    @Arg('contact') contact: ContactInput,
  ): Promise<Contact> {
    const { accessToken, idToken } = context
    const newContact = await updateContact(
      id,
      extractMetadata<ContactInput>(context, 'contact', contact),
      accessToken,
      idToken,
    )
    return {
      ...(newContact.metadata || {}),
      ...newContact,
    }
  }
}
