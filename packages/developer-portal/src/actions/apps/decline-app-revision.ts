import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { RejectAppRevisionByIdParams } from '@/services/apps'

export const declineAppRevision = actionCreator<RejectAppRevisionByIdParams>(ActionTypes.DECLINE_APP_REVISION)
export const declineAppRevisionSuccess = actionCreator<void>(ActionTypes.DECLINE_APP_REVISION_SUCCESS)
export const declineAppRevisionFailed = actionCreator<void>(ActionTypes.DECLINE_APP_REVISION_FAILED)
