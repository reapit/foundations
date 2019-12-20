import { contactIdentityCheck } from '../__mocks__/contact-identity-check'
import { createContactIdentityCheck } from '../resolvers'
import { mockContext } from '../../../__mocks__/context'
import { CreateContactIdentityCheckArgs } from '../contact-identity-check'
import errors from '../../../errors'

jest.mock('../services', () => ({
  createContactIdentityCheck: jest.fn(() => contactIdentityCheck),
}))

describe('contact-identity-check resolvers', () => {
  describe('createContactIdentityCheck', () => {
    it('should run correctly', () => {
      const mockArgs = {
        ...contactIdentityCheck,
        documents: [
          {
            ...contactIdentityCheck.documents[0],
            fileUrl: 'mockUrl',
          },
        ],
      } as CreateContactIdentityCheckArgs
      const result = createContactIdentityCheck({}, mockArgs, mockContext)
      expect(result).toEqual(contactIdentityCheck)
    })

    it('should run correctly', () => {
      const mockArgs = {
        ...contactIdentityCheck,
        documents: [
          {
            ...contactIdentityCheck.documents[0],
            fileUrl: 'mockUrl',
          },
        ],
      } as CreateContactIdentityCheckArgs
      const result = createContactIdentityCheck({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })
})
