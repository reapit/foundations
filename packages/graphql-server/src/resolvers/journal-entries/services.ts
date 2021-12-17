import { ServerContext } from '../../utils'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  GetJournalEntriesReturn,
  CreateJournalEntryReturn,
} from './journal-entries'
import { callGetJournalEntriesAPI, callCreateJournalEntryAPI } from './api'

export const getJournalEntries = (args: GetJournalEntriesArgs, context: ServerContext): GetJournalEntriesReturn => {
  const journalEntries = callGetJournalEntriesAPI(args, context)
  return journalEntries
}

export const createJournalEntry = (args: CreateJournalEntryArgs, context: ServerContext): CreateJournalEntryReturn => {
  const createResult = callCreateJournalEntryAPI(args, context)
  return createResult
}

const journalEntryServices = {
  getJournalEntries,
  createJournalEntry,
}

export default journalEntryServices
