import { checkPermission } from '../check-permission'
import { ServerContext } from '../../index'

describe('checkPermission', () => {
  it('should run correctly', () => {
    const input = {
      traceId: 'mock traceId',
      authorization: 'mock token',
      dataLoader: {
        configurationLoader: jest.fn() as any,
        propertyLoader: jest.fn() as any,
      },
    } as ServerContext
    const output = true
    const result = checkPermission(input)
    expect(result).toEqual(output)
  })
})
