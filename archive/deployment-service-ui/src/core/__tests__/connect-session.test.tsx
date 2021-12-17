import { reapitConnectBrowserSession } from '../connect-session'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

describe('reapitConnectBrowserSession', () => {
  it('should be an instance of ReapitConnectBrowserSession', () => {
    expect(reapitConnectBrowserSession instanceof ReapitConnectBrowserSession).toBe(true)
  })
})
