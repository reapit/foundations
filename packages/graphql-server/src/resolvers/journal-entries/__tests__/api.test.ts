import { mockJournalEntries } from '../__stubs__/mock-journal-entries'
import { mockCreateJournalEntryArgs } from '../__stubs__/mock-create-journal-entry'
import { mockContext } from '../../../__stubs__/mock-context'
import { callGetJournalEntriesAPI, callCreateJournalEntryAPI } from '../api'

jest.mock('../../../logger')

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => {
    return {
      get: jest.fn().mockImplementation(() => {
        return {
          data: mockJournalEntries,
        }
      }),
      post: jest.fn(() => {
        return {
          status: 204,
        }
      }),
    }
  }),
}))

describe('journalEntries api', () => {
  describe('callGetJournalEntriesAPI', () => {
    it('should run correctly', async () => {
      try {
        const args = { pageSize: 10 }
        const result = await callGetJournalEntriesAPI(args, mockContext)
        expect(result).toEqual(mockJournalEntries)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
  describe('callCreateJournalEntryAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callCreateJournalEntryAPI(mockCreateJournalEntryArgs, mockContext)
        expect(result).toEqual(true)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})
