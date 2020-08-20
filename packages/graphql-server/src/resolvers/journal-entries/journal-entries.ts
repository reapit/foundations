import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { PagedResultJournalEntryModel_, CreateJournalEntryModel, JournalEntries } from '../../types'

export type CreateJournalEntryArgs = CreateJournalEntryModel

export type GetJournalEntriesArgs = JournalEntries

// api return type
export type GetJournalEntriesReturn = Promise<PagedResultJournalEntryModel_ | UserInputError>
export type CreateJournalEntryReturn = Promise<Boolean | UserInputError>

// resolver type
export type QueryGetJournalEntriesReturn = AuthenticationError | GetJournalEntriesReturn
export type MutationCreateJournalEntryReturn = AuthenticationError | CreateJournalEntryReturn
