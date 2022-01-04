import { ServerContext } from '../../utils'
import {
  GetContactByIdArgs,
  CreateContactArgs,
  UpdateContactArgs,
  GetContactsArgs,
  GetContactByIdReturn,
  GetContactsReturn,
  CreateContactReturn,
  UpdateContactReturn,
} from './contacts'
import { callGetContactByIdAPI, callGetContactsAPI, callCreateContactAPI, callUpdateContactAPI } from './api'

export const getContactById = (args: GetContactByIdArgs, context: ServerContext): GetContactByIdReturn => {
  const contact = callGetContactByIdAPI(args, context)
  return contact
}

export const getContacts = (args: GetContactsArgs, context: ServerContext): GetContactsReturn => {
  const contacts = callGetContactsAPI(args, context)
  return contacts
}

export const createContact = (args: CreateContactArgs, context: ServerContext): CreateContactReturn => {
  const createResult = callCreateContactAPI(args, context)
  return createResult
}

export const updateContact = (args: UpdateContactArgs, context: ServerContext): UpdateContactReturn => {
  const updateResult = callUpdateContactAPI({ ...args }, context)
  return updateResult
}

const contactServices = {
  getContactById,
  getContacts,
  createContact,
  updateContact,
}

export default contactServices
