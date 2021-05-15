import { UserInputError } from 'apollo-server-lambda'
import { TaskModel, TaskModelPagedResult, CreateTaskModel, UpdateTaskModel } from '@reapit/foundations-ts-definitions'

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
export type GetTasksReturn = Promise<TaskModelPagedResult | UserInputError>
export type CreateTaskReturn = Promise<TaskModel | UserInputError>
export type UpdateTaskReturn = Promise<TaskModel | UserInputError>

// resolver type
export type QueryGetTaskByIdReturn = GetTaskByIdReturn
export type QueryGetTasksReturn = GetTasksReturn
export type MutationCreateTaskReturn = CreateTaskReturn
export type MutationUpdateTaskReturn = UpdateTaskReturn
