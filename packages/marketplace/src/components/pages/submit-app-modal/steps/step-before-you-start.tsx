import React from 'react'
import { Modal, H3, ModalProps, Button } from '@reapit/elements'
import { useHistory } from 'react-router'
import DOCS_LINKS from '@/constants/docs-links'
import { submitAppWizzardChangeStep } from '@/actions/submit-app'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

export const onViewDocs = history => () => history.push(DOCS_LINKS.DEVELOPER_PORTAL)
export const onCreateNewApp = (dispatch: Dispatch) => () =>
  dispatch(submitAppWizzardChangeStep({ formStep: 'INPUT_APP_NAME' }))

export const StepBeforeYouStart: React.FC<ModalProps> = ({ visible, afterClose }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Modal
      visible={visible}
      afterClose={afterClose}
      title="Before you start"
      footerItems={
        <>
          <Button onClick={onViewDocs(history)}>View Docs</Button>
          <Button onClick={onCreateNewApp(dispatch)}>Create New App</Button>
        </>
      }
    >
      <div>
        <H3>Have you had a look at the documentation?</H3>
        <p>
          Before continuing with registering your app, we strongly advise that you read the &quot;Step-by-step&quot;
          guide on how best to complete the following form.
        </p>
      </div>
    </Modal>
  )
}
