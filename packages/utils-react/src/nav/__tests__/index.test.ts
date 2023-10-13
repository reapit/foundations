import { getAvatarInitials } from '../index'
import { ReapitConnectSession } from '@reapit/connect-session'

describe('getAvatarInitials', () => {
  it('returns empty string when session is null', () => {
    const session: ReapitConnectSession | null = null
    const result = getAvatarInitials(session)
    expect(result).toEqual('')
  })

  it('returns empty string when loginIdentity is null', () => {
    const session = {} as ReapitConnectSession
    const result = getAvatarInitials(session)
    expect(result).toEqual('')
  })

  it('returns initials when name is a single word', () => {
    const session = { loginIdentity: { name: 'John' } } as ReapitConnectSession
    const result = getAvatarInitials(session)
    expect(result).toEqual('JJ')
  })

  it('returns initials when name is two words', () => {
    const session = { loginIdentity: { name: 'John Doe' } } as ReapitConnectSession
    const result = getAvatarInitials(session)
    expect(result).toEqual('JD')
  })

  it('returns initials when name is three words', () => {
    const session = { loginIdentity: { name: 'John William Doe' } } as ReapitConnectSession
    const result = getAvatarInitials(session)
    expect(result).toEqual('JD')
  })

  it('returns initials when name is four words', () => {
    const session = { loginIdentity: { name: 'John William Smith Doe' } } as ReapitConnectSession
    const result = getAvatarInitials(session)
    expect(result).toEqual('JD')
  })
})
