import { ReapitConnectServerSession } from '@reapit/connect-session'
import reapitConnectSession from '../connect-session'

describe('reapitConnectSession', () => {
  it('should return an instance of ReapitConnectServerSession', () => {
    expect(reapitConnectSession instanceof ReapitConnectServerSession).toBe(true)
  })
})
