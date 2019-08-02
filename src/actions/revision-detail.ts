import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { RevisionDetailItem } from '../reducers/revision-detail'

export interface RevisionDetailRequestParams {
  appId: string
  appRevisionId: string
}

export const revisionDetailRequestData = actionCreator<RevisionDetailRequestParams>(
  ActionTypes.REVISION_DETAIL_REQUEST_DATA
)
export const revisionDetailLoading = actionCreator<boolean>(ActionTypes.REVISION_DETAIL_LOADING)
export const revisionDetailReceiveData = actionCreator<RevisionDetailItem | undefined>(
  ActionTypes.REVISION_DETAIL_RECEIVE_DATA
)
export const revisionDetailFailure = actionCreator<void>(ActionTypes.REVISION_DETAIL_REQUEST_DATA__FAILURE)
export const revisionDetailClearData = actionCreator<null>(ActionTypes.REVISION_DETAIL_CLEAR_DATA)
