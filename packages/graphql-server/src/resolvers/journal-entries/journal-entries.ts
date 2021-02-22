import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  JournalEntryModelPagedResult,
  CreateJournalEntryModel,
  JournalEntries,
} from '@reapit/foundations-ts-definitions'

export type CreateJournalEntryArgs = CreateJournalEntryModel

export type GetJournalEntriesArgs = JournalEntries

// api return type
export type GetJournalEntriesReturn = Promise<JournalEntryModelPagedResult | UserInputError>
export type CreateJournalEntryReturn = Promise<Boolean | UserInputError>

// resolver type
export type QueryGetJournalEntriesReturn = AuthenticationError | GetJournalEntriesReturn
export type MutationCreateJournalEntryReturn = AuthenticationError | CreateJournalEntryReturn
