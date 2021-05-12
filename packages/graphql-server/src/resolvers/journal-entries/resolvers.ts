import journalEntryServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  QueryGetJournalEntriesReturn,
  MutationCreateJournalEntryReturn,
} from './journal-entries'

export const queryGetJournalEntries = (
  _: any,
  args: GetJournalEntriesArgs,
  context: ServerContext,
): QueryGetJournalEntriesReturn => {
  const traceId = context.traceId
  logger.info('queryGetJournalEntries', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return journalEntryServices.getJournalEntries(args, context)
}

export const mutationCreateJournalEntry = (
  _: any,
  args: CreateJournalEntryArgs,
  context: ServerContext,
): MutationCreateJournalEntryReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateJournalEntry', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return journalEntryServices.createJournalEntry(args, context)
}

export default {
  Query: {
    GetJournalEntries: queryGetJournalEntries,
  },
  Mutation: {
    CreateJournalEntry: mutationCreateJournalEntry,
  },
}
