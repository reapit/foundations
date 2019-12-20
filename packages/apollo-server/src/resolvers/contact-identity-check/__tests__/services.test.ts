import { createContactIdentityCheck } from '../services'
import { contactIdentityCheck } from '../__mocks__/contact-identity-check'
import { mockContext } from '../../../__mocks__/context'
import { CreateContactIdentityCheckArgs } from '../contact-identity-check'

jest.mock('../api', () => ({
  callCreateIdentityCheckAPI: jest.fn(() => contactIdentityCheck),
}))

describe('contact-identity-check services', () => {
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
      const output = contactIdentityCheck
      const result = createContactIdentityCheck(mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  })
})
