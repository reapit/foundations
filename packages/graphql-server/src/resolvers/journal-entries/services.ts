import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  GetJournalEntriesReturn,
  CreateJournalEntryReturn,
} from './journal-entries'
import { callGetJournalEntriesAPI, callCreateJournalEntryAPI } from './api'

export const getJournalEntries = (args: GetJournalEntriesArgs, context: ServerContext): GetJournalEntriesReturn => {
  const traceId = context.traceId
  logger.info('getJournalEntries', { traceId, args })
  const journalEntries = callGetJournalEntriesAPI(args, context)
  return journalEntries
}

export const createJournalEntry = (args: CreateJournalEntryArgs, context: ServerContext): CreateJournalEntryReturn => {
  const traceId = context.traceId
  logger.info('createJournalEntry', { traceId, args })
  const createResult = callCreateJournalEntryAPI(args, context)
  return createResult
}

const journalEntryServices = {
  getJournalEntries,
  createJournalEntry,
}

export default journalEntryServices
