import React, { useEffect } from 'react'
import { Modal } from '@reapit/elements'
import { SubmitAppWizard } from './submit-app-wizard'
import { ModalProps } from '@/types/core'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { selectSubmitAppFormState } from '@/selector/submit-app'
import { onFinish } from './steps/step-submit-app-success'
import { useDispatch } from 'react-redux'
import reduxStore from '@/core/store'
import { submitAppSetFormState } from '@/actions/submit-app'

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
    // refetch developer app detail page
    onFinish(dispatch)()
  }

  afterClose()
}

export const handleUseEffect = (dispatch: Dispatch) => () => {
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
