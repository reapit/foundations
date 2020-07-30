import { selectLoginIdentity, selectIsAdmin, selectClientId, selectDeveloperId } from '../auth'
import { auth } from '../__mocks__/auth'

describe('auth selectors', () => {
  test('selectLoginIdentity', () => {
    expect(selectLoginIdentity(auth)).toEqual(auth.loginIdentity)
  })
  test('selectDeveloperId', () => {
    expect(selectDeveloperId(auth)).toEqual(auth.loginIdentity.developerId)
  })
  test('selectClientId', () => {
    expect(selectClientId(auth)).toEqual(auth.loginIdentity.clientId)
  })
  test('selectLoginIdentity', () => {
    expect(selectIsAdmin(auth)).toBeTruthy()
    expect(selectIsAdmin({ ...auth, loginIdentity: { ...auth.loginIdentity, adminId: '' } })).toBeFalsy()
  })
})
