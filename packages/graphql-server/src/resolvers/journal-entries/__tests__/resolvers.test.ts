import journalEntryServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetJournalEntries, mutationCreateJournalEntry } from '../resolvers'
import { mockCreateJournalEntryArgs } from '../__stubs__/mock-create-journal-entry'
import { mockJournalEntries } from '../__stubs__/mock-journal-entries'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getJournalEntries: jest.fn(() => mockJournalEntries),
  createJournalEntry: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetJournalEntries', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { pageSize: 10 }
    const result = queryGetJournalEntries(null, args, mockContext)
    expect(result).toEqual(journalEntryServices.getJournalEntries(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { pageSize: 10 }
    const result = queryGetJournalEntries(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateJournalEntry', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateJournalEntry(null, mockCreateJournalEntryArgs, mockContext)
    expect(result).toEqual(journalEntryServices.createJournalEntry(mockCreateJournalEntryArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateJournalEntry(null, mockCreateJournalEntryArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
