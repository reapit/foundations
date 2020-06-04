import { pingResolver } from '../resolvers'

describe('ping', () => {
  it('pingResolver', () => {
    const result = pingResolver()
    expect(result).toEqual('Services is running')
  })
})
