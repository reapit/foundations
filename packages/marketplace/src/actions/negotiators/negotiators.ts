import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchNegotiatorsParams } from '@/services/negotiators'
import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'

export const fetchNegotiators = actionCreator<FetchNegotiatorsParams>(ActionTypes.FETCH_NEGOTIATORS)

export const fetchNegotiatorsSuccess = actionCreator<PagedResultNegotiatorModel_>(ActionTypes.FETCH_NEGOTIATORS_SUCESS)

export const fetchNegotiatorsFailure = actionCreator<string>(ActionTypes.FETCH_NEGOTIATORS_FAILURE)
