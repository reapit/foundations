import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { RejectRevisionModel, AppRevisionModel } from '@reapit/foundations-ts-definitions'
import { Button, TextArea, Modal, ModalProps, ModalFooter, ModalBody, Form, Formik } from '@reapit/elements'
import { requestDeclineRevision } from '@/actions/revision-detail'
import CallToAction from '../call-to-action'
import { selectAppRevisionDetail, selectAppRevisionFormState } from '@/selector/app-revisions'
import { validationSchemaDeclineModal as validationSchema } from './validation-schema'
import { formFieldsDeclineModal as formFields } from './form-fields'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const { rejectionReasonField } = formFields

export type DeclineRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  onDeclineSuccess: () => void
}

export const handleAfterClose =
  ({ isSuccessed, onDeclineSuccess, isLoading, afterClose }) =>
  () => {
    if (isSuccessed) {
      onDeclineSuccess()
    } else if (!isLoading && afterClose) {
      afterClose()
    }
  }

export const handleOnSubmit =
  (
    setRejectionReason: React.Dispatch<React.SetStateAction<string>>,
    dispatch: Dispatch,
    appId?: string,
    appRevisionId?: string,
  ) =>
  (formValues: RejectRevisionModel) => {
    if (appId && appRevisionId) {
      setRejectionReason(formValues.rejectionReason || '')
      dispatch(requestDeclineRevision({ appId, appRevisionId, ...formValues }))
    }
  }

export const onCancelButtonClick = (afterClose?: () => void) => {
  return () => {
    afterClose && afterClose()
  }
}

export const DeclineRevisionModal: React.FunctionComponent<DeclineRevisionModalProps> = ({
  visible,
  afterClose,
  onDeclineSuccess,
}) => {
  const dispatch = useDispatch()
  const revisionDetail = useSelector(selectAppRevisionDetail)
  const session = useReapitConnect(reapitConnectBrowserSession)
  const { email, name } = session?.connectSession?.loginIdentity || {}

  // form state
  const formState = useSelector(selectAppRevisionFormState)

  // extract
  const { appId, id: appRevisionId } = (revisionDetail?.data?.data || {}) as AppRevisionModel
  const [rejectionReason, setRejectionReason] = React.useState('')

  const isLoading = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      renderChildren
      afterClose={handleAfterClose({ isSuccessed, onDeclineSuccess, isLoading, afterClose })}
    >
      <Formik
        initialValues={{ email, name, rejectionReason } as RejectRevisionModel}
        data-test="revision-decline-form"
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit(setRejectionReason, dispatch, appId, appRevisionId)}
      >
        {isSuccessed ? (
          <CallToAction
            title="Rejected!"
            type="danger"
            buttonText="Back to List"
            dataTest="decline-revision-success-message"
            onButtonClick={onDeclineSuccess}
            isCenter
          >
            Revision has been declined successfully.
          </CallToAction>
        ) : (
          <Form>
            <ModalBody
              body={
                <TextArea
                  name={rejectionReasonField.name}
                  id={rejectionReasonField.name}
                  labelText={rejectionReasonField.label as string}
                  dataTest="revision-rejection-reason"
                />
              }
            />
            <ModalFooter
              footerItems={
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mr-2"
                    disabled={isLoading}
                    onClick={onCancelButtonClick(afterClose)}
                    dataTest="revision-decline-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    loading={isLoading}
                    disabled={isLoading}
                    dataTest="revision-decline-submit"
                  >
                    Decline
                  </Button>
                </>
              }
            />
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default DeclineRevisionModal
