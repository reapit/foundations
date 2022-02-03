import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'

import { Contact, ContactFragment } from '../entities/contact'
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

const getContacts = async (accessToken: string, idToken: string) => {
  return query<{ _embedded: Contact[] }>(getContactsQuery, {}, 'GetContacts', { accessToken, idToken })
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
}
