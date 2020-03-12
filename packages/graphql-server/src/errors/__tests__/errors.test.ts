import {
  generateAuthenticationError,
  errorMessages,
  generateUserInputError,
  generateValidationError,
  generateForbiddenError,
  generateInternalServerError,
  generateNotFoundError,
} from '../errors'
import { AuthenticationError, UserInputError, ApolloError, ForbiddenError, ValidationError } from 'apollo-server'

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
    const output = `${traceId} - ${errorMessages.badRequest}`
    const result = generateUserInputError(traceId)
    expect(result).toEqual(new UserInputError(output))
  })

  it('should return UserInputError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.badRequest}`
    const result = generateUserInputError(traceId)
    expect(result).toEqual(new UserInputError(output))
  })
})

describe('generateValidationError', () => {
  it('should return ValidationError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.badRequest}`
    const result = generateValidationError(traceId)
    expect(result).toEqual(new ValidationError(output))
  })

  it('should return ValidationError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.badRequest}`
    const result = generateValidationError(traceId)
    expect(result).toEqual(new ValidationError(output))
  })
})

describe('generateForbiddenError', () => {
  it('should return ForbiddenError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.forbidden}`
    const result = generateForbiddenError(traceId)
    expect(result).toEqual(new ForbiddenError(output))
  })

  it('should return ForbiddenError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.forbidden}`
    const result = generateForbiddenError(traceId)
    expect(result).toEqual(new ForbiddenError(output))
  })
})

describe('generateInternalServerError', () => {
  it('should return ApolloError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.internalServer}`
    const result = generateInternalServerError(traceId)
    expect(result).toEqual(new ApolloError(output))
  })

  it('should return ApolloError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.internalServer}`
    const result = generateInternalServerError(traceId)
    expect(result).toEqual(new ApolloError(output))
  })
})

describe('generateNotFoundError', () => {
  it('should return ApolloError', () => {
    const traceId = 'traceId'
    const output = `${traceId} - ${errorMessages.notFound}`
    const result = generateNotFoundError(traceId)
    expect(result).toEqual(new ApolloError(output))
  })

  it('should return ApolloError', () => {
    const traceId = undefined
    const output = ` - ${errorMessages.notFound}`
    const result = generateNotFoundError(traceId)
    expect(result).toEqual(new ApolloError(output))
  })
})
