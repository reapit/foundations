import React, { useEffect } from 'react'
import qs from 'query-string'
import { Modal } from '@reapit/elements'
import { SubmitAppWizard } from './submit-app-wizard'
import { ModalProps } from '@/types/core'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { fetchAppList } from '@/actions/apps'
import { selectSubmitAppFormState } from '@/selector/submit-app'
import { useDispatch } from 'react-redux'
import reduxStore from '@/core/store'
import { submitAppSetFormState } from '@/actions/submit-app'
import { fetchScopeList } from '@/actions/scopes'
import { fetchCategoryList } from '@/actions/categories'

export type OnCloseSubmitAppModalParams = {
  getReduxState: () => ReduxState
  dispatch: Dispatch
  selectSubmitAppFormState
} & Pick<ModalProps, 'afterClose'>

export const customAfterClose = ({
  dispatch,
  afterClose,
  getReduxState,
  selectSubmitAppFormState,
}: OnCloseSubmitAppModalParams) => () => {
  // This will be passed to <Modal/>
  // for Modal uses: dismiss when click outside, click "x"
  // Has to access redux state of formState manually because it will lead to <Modal/> and result many weird bugs
  // E.g: Formik state reset, wizzard step state reset
  const submitAppFormState = selectSubmitAppFormState(getReduxState())

  if (submitAppFormState === 'SUCCESS') {
    const page = qs.parse(location.search)?.page || 1
    dispatch(fetchAppList({ page }))
  }

  afterClose()
}

export const handleUseEffect = (dispatch: Dispatch) => () => {
  dispatch(fetchScopeList())
  dispatch(fetchCategoryList())
  dispatch(submitAppSetFormState('PENDING'))
}

export const SubmitAppWizardModal: React.FC<ModalProps> = ({ visible, afterClose }) => {
  const dispatch = useDispatch()
  useEffect(handleUseEffect(dispatch), [])

  return (
    <Modal
      afterClose={customAfterClose({
        dispatch,
        getReduxState: reduxStore.reduxStore.getState,
        afterClose,
        selectSubmitAppFormState,
      })}
      deps={[]}
      renderChildren
      visible={visible}
    >
      <SubmitAppWizard
        afterClose={customAfterClose({
          dispatch,
          getReduxState: reduxStore.reduxStore.getState,
          afterClose,
          selectSubmitAppFormState,
        })}
      />
    </Modal>
  )
}
