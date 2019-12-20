import { checkPermission } from '../check-permission'

describe('checkPermission', () => {
  it('should run correctly', () => {
    const input = {
      traceId: 'mock traceId',
      authorization: 'mock token',
    }
    const output = true
    const result = checkPermission(input)
    expect(result).toEqual(output)
  })
})
