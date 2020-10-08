import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchNegotiatorsParams } from '@/services/negotiators'
import { NegotiatorModelPagedResult } from '@reapit/foundations-ts-definitions'

export const fetchNegotiators = actionCreator<FetchNegotiatorsParams>(ActionTypes.FETCH_NEGOTIATORS)

export const fetchNegotiatorsSuccess = actionCreator<NegotiatorModelPagedResult>(ActionTypes.FETCH_NEGOTIATORS_SUCCESS)

export const fetchNegotiatorsFailed = actionCreator<string>(ActionTypes.FETCH_NEGOTIATORS_FAILED)
