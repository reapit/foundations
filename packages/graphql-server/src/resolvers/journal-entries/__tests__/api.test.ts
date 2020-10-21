import { journalEntriesMock } from '../__stubs__/journal-entries'
import { createJournalEntryArgsMock } from '../__stubs__/create-journal-entry'
import { mockContext } from '../../../__stubs__/context'
import { callGetJournalEntriesAPI, callCreateJournalEntryAPI } from '../api'

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
          data: journalEntriesMock,
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
        expect(result).toEqual(journalEntriesMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
  describe('callCreateJournalEntryAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callCreateJournalEntryAPI(createJournalEntryArgsMock, mockContext)
        expect(result).toEqual(true)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})
