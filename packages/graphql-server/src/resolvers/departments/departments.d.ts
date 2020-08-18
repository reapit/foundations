import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { DepartmentModel, PagedResultDepartmentModel_ } from '../../types'

export type GetDepartmentByIdArgs = {
  id: string
  embed?: string[]
}

export type GetDepartmentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  age?: string[]
  agentRole?: string[]
  landlordId?: string[]
  lettingStatus?: string[]
  locality?: string[]
  parking?: string[]
  sellingStatus?: string[]
  situation?: string[]
  style?: string[]
  type?: string[]
  address?: string
  departmentId?: string
  marketingMode?: string[]
  bedroomsFrom?: number
  bedroomsTo?: number
  priceFrom?: number
  priceTo?: number
  rentFrom?: number
  rentTo?: number
  rentFrequency?: number
  internetAdvertising?: boolean
}

// api return type
export type GetDepartmentByIdReturn = Promise<DepartmentModel | UserInputError>
export type GetDepartmentsReturn = Promise<PagedResultDepartmentModel_ | UserInputError>

// resolver type
export type QueryGetDepartmentByIdReturn = AuthenticationError | GetDepartmentByIdReturn
export type QueryGetDepartmentsReturn = AuthenticationError | GetDepartmentsReturn
