import {
  callGetKeyAPI,
  callGetPropertyKeysAPI,
  callCreateKeyAPI,
  callGetKeyMovementsAPI,
  callGetKeyMovementAPI,
  callCreateKeyMovementAPI,
  callUpdateKeyMovementAPI,
} from '../api'
import {
  createKey,
  createKeyMovement,
  updateKeyMovement,
  getKeyById,
  getKeyMovement,
  getKeyMovements,
  getKeysByPropertyId,
} from '../services'

import { mockKey } from '../__stubs__/mock-key'
import { mockKeys } from '../__stubs__/mock-keys'
import { mockKeyMovement, mockKeyMovements, mockKeyMovementUpdate } from '../__stubs__/mock-key-movement'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetKeyAPI: jest.fn(() => Promise.resolve(mockKey)),
  callGetPropertyKeysAPI: jest.fn(() => Promise.resolve(mockKeys)),
  callCreateKeyAPI: jest.fn(() => Promise.resolve(mockKey)),
  callGetKeyMovementsAPI: jest.fn(() => Promise.resolve(mockKeyMovements)),
  callGetKeyMovementAPI: jest.fn(() => Promise.resolve(mockKeyMovement)),
  callCreateKeyMovementAPI: jest.fn(() => Promise.resolve(mockKeyMovement)),
  callUpdateKeyMovementAPI: jest.fn(() => Promise.resolve(mockKeyMovement)),
}))

jest.mock('../../configurations/api', () => ({
  callGetConfigurationsByTypeApi: jest.fn(() => [{ id: '123' }]),
}))

describe('getKeyById', () => {
  it('should return correctly', async () => {
    const args = { propertyId: 'a', keyId: 'b' }
    const result = await getKeyById(args, mockContext)
    expect(callGetKeyAPI).toHaveBeenCalledWith(args, mockContext)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockKey))
  })
})

describe('getKeysByPropertyId', () => {
  it('should return correctly', async () => {
    const args = { propertyId: 'a' }
    const result = await getKeysByPropertyId(args, mockContext)
    expect(callGetPropertyKeysAPI).toHaveBeenCalledWith(args, mockContext)
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(mockKeys._embedded))
  })
})

describe('createKey', () => {
  it('should return correctly', async () => {
    const result = await createKey(mockKey, mockContext)
    expect(callCreateKeyAPI).toHaveBeenCalledWith(mockKey, mockContext)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockKey))
  })
})

describe('getKeyMovement', () => {
  it('should return correctly', async () => {
    const args = { propertyId: 'a', keyId: 'b', movementId: 'c' }
    const result = await getKeyMovement(args, mockContext)
    expect(callGetKeyMovementAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockKeyMovement)
  })
})

describe('getKeyMovements', () => {
  it('should return correctly', async () => {
    const args = { propertyId: 'a', keyId: 'b' }
    const result = await getKeyMovements(args, mockContext)
    expect(callGetKeyMovementsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockKeyMovements._embedded)
  })
})

describe('createKeyMovement', () => {
  it('should return correctly', async () => {
    const result = await createKeyMovement(mockKeyMovement, mockContext)
    expect(callCreateKeyMovementAPI).toHaveBeenCalledWith(mockKeyMovement, mockContext)
    expect(result).toEqual(mockKeyMovement)
  })
})

describe('updateKeyMovement', () => {
  it('should return correctly', async () => {
    const result = await updateKeyMovement(mockKeyMovementUpdate, mockContext)
    expect(callUpdateKeyMovementAPI).toHaveBeenCalledWith(mockKeyMovementUpdate, mockContext)
    expect(result).toEqual(mockKeyMovement)
  })
})
