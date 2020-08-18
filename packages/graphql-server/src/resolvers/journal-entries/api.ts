import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  CreateJournalEntryArgs,
  GetJournalEntriesArgs,
  GetJournalEntriesReturn,
  CreateJournalEntryReturn,
} from './journal-entries'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetJournalEntriesAPI = async (
  args: GetJournalEntriesArgs,
  context: ServerContext,
): GetJournalEntriesReturn => {
  const traceId = context.traceId
  logger.info('callGetJournalEntriesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetJournalEntriesReturn>(
      `${URLS.journalEntries}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetJournalEntriesAPI' })
    return handleErrorResult
  }
}

export const callCreateJournalEntryAPI = async (
  args: CreateJournalEntryArgs,
  context: ServerContext,
): CreateJournalEntryReturn => {
  const traceId = context.traceId
  logger.info('callCreateJournalEntryAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateJournalEntryReturn>(URLS.journalEntries, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    if (response.status === 204) {
      return true
    }
    return false
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateJournalEntryAPI' })
    return handleErrorResult
  }
}
