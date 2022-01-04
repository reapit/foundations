import contactServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetContactByIdArgs,
  CreateContactArgs,
  GetContactsArgs,
  UpdateContactArgs,
  QueryGetContactByIdReturn,
  QueryGetContactsReturn,
  MutationCreateContactReturn,
  MutationUpdateContactReturn,
} from './contacts'

export const queryGetContactById = resolverHandler<GetContactByIdArgs, QueryGetContactByIdReturn>(
  (_: any, args: GetContactByIdArgs, context: ServerContext): QueryGetContactByIdReturn => {
    return contactServices.getContactById(args, context)
  },
)

export const queryGetContacts = resolverHandler<GetContactsArgs, QueryGetContactsReturn>(
  (_: any, args: GetContactsArgs, context: ServerContext): QueryGetContactsReturn => {
    return contactServices.getContacts(args, context)
  },
)

export const mutationCreateContact = resolverHandler<CreateContactArgs, MutationCreateContactReturn>(
  (_: any, args: CreateContactArgs, context: ServerContext): MutationCreateContactReturn => {
    return contactServices.createContact(args, context)
  },
)

export const mutationUpdateContact = resolverHandler<UpdateContactArgs, MutationUpdateContactReturn>(
  (_: any, args: UpdateContactArgs, context: ServerContext): MutationUpdateContactReturn => {
    return contactServices.updateContact(args, context)
  },
)

export default {
  Query: {
    GetContactById: queryGetContactById,
    GetContacts: queryGetContacts,
  },
  Mutation: {
    CreateContact: mutationCreateContact,
    UpdateContact: mutationUpdateContact,
  },
}
