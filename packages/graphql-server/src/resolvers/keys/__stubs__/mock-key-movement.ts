import { CreateKeyMovementArgs, UpdateKeyMovementArgs } from '../keys'

export const mockKeyMovementUpdate: UpdateKeyMovementArgs = {
  keyId: 'keyId',
  movementId: 'movementId',
  propertyId: 'propertyId',
  checkInNegotiatorId: 'checkInNegotiatorId',
}

export const mockKeyMovement: CreateKeyMovementArgs = {
  keyId: 'keyId',
  propertyId: 'propertyId',
  movement: {},
  // @ts-ignore
  checkInNegotiator: undefined,
  checkOutNegotiator: undefined,
  checkOutToContact: false,
  checkOutToNegotiator: false,
}

export const mockKeyMovements = { _embedded: [mockKeyMovement, mockKeyMovement] }
