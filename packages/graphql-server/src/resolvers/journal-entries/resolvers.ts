import journalEntryServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  QueryGetJournalEntriesReturn,
  MutationCreateJournalEntryReturn,
} from './journal-entries'

export const queryGetJournalEntries = resolverHandler<GetJournalEntriesArgs, QueryGetJournalEntriesReturn>(
  (_: any, args: GetJournalEntriesArgs, context: ServerContext): QueryGetJournalEntriesReturn => {
    return journalEntryServices.getJournalEntries(args, context)
  },
)

export const mutationCreateJournalEntry = resolverHandler<CreateJournalEntryArgs, MutationCreateJournalEntryReturn>(
  (_: any, args: CreateJournalEntryArgs, context: ServerContext): MutationCreateJournalEntryReturn => {
    return journalEntryServices.createJournalEntry(args, context)
  },
)

export default {
  Query: {
    GetJournalEntries: queryGetJournalEntries,
  },
  Mutation: {
    CreateJournalEntry: mutationCreateJournalEntry,
  },
}
