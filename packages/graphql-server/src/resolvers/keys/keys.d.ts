import {
  KeysModel,
  KeysModelPagedResult,
  CreateKeyModel,
  KeyMovementModelPagedResult,
  KeyMovementModel,
  CreateKeyMovementModel,
  CheckInKeyModel,
  ContactModel,
  NegotiatorModel,
} from '@reapit/foundations-ts-definitions'
import { QueryGetOfficeByIdReturn } from '../offices/offices'

export type CreateKeyArgs = {
  propertyId: string
  key: CreateKeyModel
}

export type GetKeyArgs = {
  keyId: string
  propertyId: string
}

export type GetPropertyKeysArgs = {
  propertyId: string
}

export type KeyStatus = 'checkedIn' | 'checkedOut' | 'noLongerHeld'

type KeyType = {
  id: string
  value: string
}

type IndividualKeyModel = {
  description?: string
  name?: string
}

export type PropertyKey = {
  id?: string
  created?: string
  modified?: string
  number?: string
  type?: KeyType
  office?: QueryGetOfficeByIdReturn
  status?: KeyStatus
  keysInSet?: IndividualKeyModel[]
  propertyId?: string
}

export type PropertyKeyMovement = {
  id?: string
  created?: string
  modified?: string
  checkOutToContact?: ContactModel
  checkOutToNegotiator?: NegotiatorModel
  checkOutAt?: string
  checkOutNegotiator?: NegotiatorModel
  checkInAt?: string
  checkInNegotiator?: NegotiatorModel
}

export type GetKeyMovementsArgs = GetKeyArgs
export type CreateKeyMovementArgs = { propertyId: string; keyId: string; movement: CreateKeyMovementModel }
export type UpdateKeyMovementArgs = CheckInKeyModel & { propertyId: string; keyId: string; movementId: string }
export type GetKeyMovementArgs = GetKeyArgs & { movementId: string }

export type APIResultKey = KeysModel
export type APIResultKeyMovement = KeyMovementModel

// api return type
export type GetKeyReturn = Promise<PropertyKey>
export type GetPropertyKeysReturn = Promise<KeysModelPagedResult>
export type CreateKeyReturn = Promise<PropertyKey>

export type GetKeyMovementsReturn = Promise<KeyMovementModelPagedResult>
export type GetKeyMovementReturn = Promise<KeyMovementModel>
export type CreateKeyMovementReturn = Promise<KeyMovementModel>
export type UpdateKeyMovementReturn = Promise<KeyMovementModel>

// resolver type
export type QueryGetKeyReturn = PropertyKey
export type QueryGetPropertyKeysReturn = PropertyKey[]
export type QueryGetPropertyKeyMovementsReturn = PropertyKeyMovement[]
export type QueryGetPropertyKeyMovementReturn = PropertyKeyMovement
export type MutationCreateKeyReturn = PropertyKey
export type MutationCreateKeyMovementReturn = PropertyKeyMovement
export type MutationUpdateKeyMovementReturn = PropertyKeyMovement
