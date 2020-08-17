import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { TaskModel, PagedResultTaskModel_, CreateTaskModel, UpdateTaskModel } from '../../types'

export type CreateTaskArgs = CreateTaskModel

export type UpdateTaskArgs = { id: string; _eTag: string } & UpdateTaskModel

export type GetTaskByIdArgs = {
  id: string
  embed?: ('applicant' | 'contact' | 'landlord' | 'property' | 'tenancy' | 'type')[]
}

export type GetTasksArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: ('applicant' | 'contact' | 'landlord' | 'property' | 'tenancy' | 'type')[]
  id?: string[]
  applicantId?: string[]
  contactId?: string[]
  landlordId?: string[]
  officeId?: string[]
  propertyId?: string[]
  recipientId?: string[]
  senderId?: string[]
  typeId?: string[]
  tenancyId?: string[]
  activatesFrom?: string
  activatesTo?: string
  createdFrom?: string
  createdTo?: string
  metadata?: string[]
}

// api return type
export type GetTaskByIdReturn = Promise<TaskModel | UserInputError>
export type GetTasksReturn = Promise<PagedResultTaskModel_ | UserInputError>
export type CreateTaskReturn = Promise<TaskModel | UserInputError>
export type UpdateTaskReturn = Promise<TaskModel | UserInputError>

// resolver type
export type QueryGetTaskByIdReturn = AuthenticationError | GetTaskByIdReturn
export type QueryGetTasksReturn = AuthenticationError | GetTasksReturn
export type MutationCreateTaskReturn = AuthenticationError | CreateTaskReturn
export type MutationUpdateTaskReturn = AuthenticationError | UpdateTaskReturn
