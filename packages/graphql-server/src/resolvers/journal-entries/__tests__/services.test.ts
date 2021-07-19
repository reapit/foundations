import { callGetJournalEntriesAPI, callCreateJournalEntryAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateJournalEntryArgs } from '../__stubs__/mock-create-journal-entry'
import { getJournalEntries, createJournalEntry } from '../services'
import { mockJournalEntries } from '../__stubs__/mock-journal-entries'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetJournalEntriesAPI: jest.fn(() => Promise.resolve(mockJournalEntries)),
  callCreateJournalEntryAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getJournalEntries', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 10, pageNumber: 1 }
    const result = await getJournalEntries(args, mockContext)
    expect(callGetJournalEntriesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockJournalEntries)
  })
})

describe('createJournalEntry', () => {
  it('should return correctly', async () => {
    const result = await createJournalEntry(mockCreateJournalEntryArgs, mockContext)
    expect(callCreateJournalEntryAPI).toHaveBeenCalledWith(mockCreateJournalEntryArgs, mockContext)
    expect(result).toEqual(true)
  })
})
