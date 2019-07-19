import 'isomorphic-fetch'
import { LoginSession } from '../utils/cognito'

jest.setTimeout(20000)

let storedRefreshToken = ''

describe('integration tests', () => {
  describe('Login integration tests', () => {
    it('should return a positive 200 response if I log in with valid credentials', async () => {
      const body = JSON.stringify({
        userName: 'wmcvay@reapit.com',
        password: 'NewPassword123'
      })

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      } as RequestInit)

      const jsonResponse: LoginSession = await response.json()
      const { accessToken, accessTokenExpiry, idToken, idTokenExpiry, refreshToken } = jsonResponse
      expect(response.status).toEqual(200)
      expect(typeof accessToken).toEqual('string')
      expect(typeof accessTokenExpiry).toEqual('number')
      expect(typeof idToken).toEqual('string')
      expect(typeof idTokenExpiry).toEqual('number')
      expect(typeof refreshToken).toEqual('string')
      storedRefreshToken = refreshToken
    })

    it('should return a 400 response if my login credentials are not valid', async () => {
      const body = JSON.stringify({
        userName: 'INVALID_USERNAME',
        password: 'INVALID_PASSWORD'
      })

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      } as RequestInit)

      const jsonResponse = await response.json()
      expect(response.status).toEqual(400)
      expect(jsonResponse.error.message).toContain('Bad request')
    })
  })

  describe('refresh integration tests', () => {
    it('should return a positive 200 response if I log in with valid credentials', async () => {
      const body = JSON.stringify({
        userName: 'wmcvay@reapit.com',
        refreshToken: storedRefreshToken
      })

      const response = await fetch('http://localhost:3000/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      } as RequestInit)

      const jsonResponse: LoginSession = await response.json()
      const { accessToken, accessTokenExpiry, idToken, idTokenExpiry, refreshToken } = jsonResponse
      expect(response.status).toEqual(200)
      expect(typeof accessToken).toEqual('string')
      expect(typeof accessTokenExpiry).toEqual('number')
      expect(typeof idToken).toEqual('string')
      expect(typeof idTokenExpiry).toEqual('number')
      expect(typeof refreshToken).toEqual('string')
      storedRefreshToken = refreshToken
    })

    it('should return a 400 response if my refresh credentials are not valid', async () => {
      const body = JSON.stringify({
        userName: 'INVALID_USERNAME',
        refreshTokem: 'INVALID_TOKEN'
      })

      const response = await fetch('http://localhost:3000/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      } as RequestInit)

      const jsonResponse = await response.json()
      expect(response.status).toEqual(400)
      expect(jsonResponse.error.message).toContain('Bad request')
    })
  })
})
