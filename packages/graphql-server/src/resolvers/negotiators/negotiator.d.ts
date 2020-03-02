import { AuthenticationError, UserInputError } from 'apollo-server'
import {
  NegotiatorModel,
  PagedResultNegotiatorModel_,
  Negotiators,
  UpdateNegotiatorModel,
  CreateNegotiatorModel,
} from '@reapit/foundations-ts-definitions'

export type GetNegotiatorByIdArgs = {
  id: string
}

export type GetNegotiatorsArgs = Negotiators

export type CreateNegotiatorArgs = CreateNegotiatorModel

export type UpdateNegotiatorArgs = {
  id: string
  model: UpdateNegotiatorModel
  _eTag: string
}

export type GetNegotiatorByIdReturn = Promise<NegotiatorModel | UserInputError>
export type GetNegotiatorsReturn = Promise<PagedResultNegotiatorModel_ | UserInputError>
export type CreateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>
export type UpdateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>

export type QueryNegotiatorByIdReturn = AuthenticationError | GetNegotiatorByIdReturn
export type QueryNegotiatorsReturn = AuthenticationError | GetNegotiatorsReturn
export type MutationCreateNegotiatorReturn = AuthenticationError | CreateNegotiatorReturn
export type MutationUpdateNegotiatorReturn = AuthenticationError | UpdateNegotiatorReturn

/* args type */
// export type GetIdentityCheckByIdArgs = {
//   id: string
// }

// export type GetIdentityChecksArgs = {
//   negotiatorId?: string
//   contactId?: string
//   pageNumber: number
//   pageSize: number
//   ids?: string[]
//   status?: 'unknow' | 'uncheck' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass'
// }

// export type UpdateIdentityCheckArgs = { id: string; _eTag?: string } & UpdateIdentityCheckModel

/* return type */
// export type GetIdentityCheckByIdReturn = Promise<IdentityCheckModel | UserInputError>
// export type GetIdentityChecksReturn = Promise<PagedResultIdentityCheckModel_ | UserInputError>
// /* temporary return boolean, will change later */
// export type CreateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>
// export type UpdateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>

// /* resolver type */
// export type QueryIdentityCheckReturn = AuthenticationError | GetIdentityCheckByIdReturn
// export type QueryIdentityChecksReturn = AuthenticationError | GetIdentityChecksReturn
// export type MutationCreateIdentityCheckReturn = AuthenticationError | CreateIdentityCheckReturn
// export type MutationUpdateIdentityCheckReturn = AuthenticationError | UpdateIdentityCheckReturn
