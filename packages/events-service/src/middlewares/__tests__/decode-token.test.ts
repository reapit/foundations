import jwt_decode from 'jwt-decode'
import decodeToken from '../decode-token'

jest.mock('jwt-decode', () =>
  jest.fn(() => ({
    jwt_decode: () => {
      return {
        sub: 'sub',
        'custom:reapit:clientCode': 'SOME_CODE',
        'custom:reapit:userCode': 'SOME_CODE',
        name: 'User name',
        email: 'user@email,com',
      }
    },
  })),
)

describe('decode-token middleware', () => {
  it('should set req.user and call next', () => {
    const req: any = {
      headers: {
        authorization: 'authToken',
      },
    }
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    }
    const next = jest.fn()

    decodeToken(req, res, next)

    expect(jwt_decode).toHaveBeenCalledWith('authToken')
    expect(next).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
