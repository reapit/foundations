import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppRevisionModel } from '../types/marketplace-api-schema'

export const adminLoading = actionCreator<boolean>(ActionTypes.ADMIN_LOADING)
export const adminReceiveRevisions = actionCreator<AppRevisionModel[] | undefined>(ActionTypes.ADMIN_RECEIVE_REVISIONS)
export const adminRequestRevisions = actionCreator<void>(ActionTypes.ADMIN_REQUEST_REVISIONS)
