import { ReapitConnectServerSession } from '@reapit/connect-session-server'
import reapitConnectSession from '../connect-session'

describe('reapitConnectSession', () => {
  it('should return an instance of ReapitConnectServerSession', () => {
    expect(reapitConnectSession instanceof ReapitConnectServerSession).toBe(true)
  })
})
