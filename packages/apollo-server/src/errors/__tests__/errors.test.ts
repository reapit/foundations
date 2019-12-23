import { generateAuthenticationError, errorMessages, generateUserInputError } from '../errors'
import { AuthenticationError, UserInputError } from 'apollo-server'

describe('generateAuthenticationError', () => {
  it('should return AuthenticationError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.notAuthorized}`
    const result = generateAuthenticationError(traceId)
    expect(result).toEqual(new AuthenticationError(output))
  })

  it('should return AuthenticationError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.notAuthorized}`
    const result = generateAuthenticationError(traceId)
    expect(result).toEqual(new AuthenticationError(output))
  })
})

describe('generateUserInputError', () => {
  it('should return UserInputError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.unprocessableEntity}`
    const result = generateUserInputError(traceId)
    expect(result).toEqual(new UserInputError(output))
  })

  it('should return UserInputError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.unprocessableEntity}`
    const result = generateUserInputError(traceId)
    expect(result).toEqual(new UserInputError(output))
  })
})
