import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'

export const submitRevision = actionCreator<CreateAppRevisionModel & { id: string }>(
  ActionTypes.DEVELOPER_SUBMIT_REVISION
)
export const submitRevisionSetFormState = actionCreator<string>(ActionTypes.DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE)
