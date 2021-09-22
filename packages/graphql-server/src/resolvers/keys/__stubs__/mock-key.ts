import { CreateKeyArgs } from '../keys'

function anonymous() {}

export const mockKey: CreateKeyArgs = {
  propertyId: 'mock-property-id',
  key: {},
  // @ts-ignore
  office: anonymous,
  status: undefined,
  type: undefined,
}
