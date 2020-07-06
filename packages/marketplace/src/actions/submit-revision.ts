import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'

export type SubmitRevisionParams = {
  params: CreateAppRevisionModel & { id: string }
  onSuccess: () => void
  onError: () => void
}

export const submitRevision = actionCreator<SubmitRevisionParams>(ActionTypes.DEVELOPER_SUBMIT_REVISION)
export const submitRevisionSetFormState = actionCreator<string>(ActionTypes.DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE)
