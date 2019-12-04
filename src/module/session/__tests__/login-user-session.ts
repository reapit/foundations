import { Request } from 'express'
import { loginUserSession } from '../login-user-session'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { loginUserSessionService } from '../../../services/session/login-user-session'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'
import { LoginParams } from '../../../core/types'

jest.mock('../../../services/session/login-user-session')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedSessionService = loginUserSessionService as jest.Mock

describe('loginUserSession', () => {
  it('should call the success handler correctly on success', async () => {
    const params = { userName: 'will@mail.com', password: 'password' } as LoginParams

    mockedSessionService.mockImplementation(() => 'SUCCESS')
    expect(await loginUserSession(params)).toEqual('SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    console.error = jest.fn()
    const params = { userName: '', password: '' } as LoginParams
    const error = new Error(errorStrings.USERNAME_PASSWORD_REQUIRED)
    mockedSessionService.mockImplementation(() => 'SUCCESS')
    await loginUserSession(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.AUTHENTICATION_FAILED}, ${error}`)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    console.error = jest.fn()
    const params = { userName: 'will@mail.com', password: 'password' } as LoginParams

    const error = new Error('API FAILED')
    mockedSessionService.mockImplementation(() => {
      throw error
    })
    await loginUserSession(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.AUTHENTICATION_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
