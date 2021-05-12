import journalEntryServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  QueryGetJournalEntriesReturn,
  MutationCreateJournalEntryReturn,
} from './journal-entries'

export const queryGetJournalEntries = resolverHandler<GetJournalEntriesArgs, QueryGetJournalEntriesReturn>((
  _: any,
  args: GetJournalEntriesArgs,
  context: ServerContext,
): QueryGetJournalEntriesReturn => {
  const traceId = context.traceId
  logger.info('queryGetJournalEntries', { traceId, args })
  return journalEntryServices.getJournalEntries(args, context)
})

export const mutationCreateJournalEntry = resolverHandler<CreateJournalEntryArgs, MutationCreateJournalEntryReturn>((
  _: any,
  args: CreateJournalEntryArgs,
  context: ServerContext,
): MutationCreateJournalEntryReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateJournalEntry', { traceId, args })
  return journalEntryServices.createJournalEntry(args, context)
})

export default {
  Query: {
    GetJournalEntries: queryGetJournalEntries,
  },
  Mutation: {
    CreateJournalEntry: mutationCreateJournalEntry,
  },
}
