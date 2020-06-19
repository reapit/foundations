import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { RejectRevisionModel } from '@reapit/foundations-ts-definitions'
import { Button, TextArea, Modal, ModalProps, ModalFooter, ModalBody, Form, Formik } from '@reapit/elements'
import { validate } from '@/utils/form/reject-revision'
import { declineRevision } from '@/actions/revision-detail'
import CallToAction from './call-to-action'
import { selectAppRevisionDetail } from '@/selector/app-revisions'
import { selectLoginIdentity } from '@/selector/auth'

export type DeclineRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  onDeclineSuccess: () => void
}

export const handleAfterClose = ({ isSuccessed, onDeclineSuccess, isLoading, afterClose }) => () => {
  if (isSuccessed) {
    onDeclineSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const handleOnSubmit = (
  setRejectionReason: React.Dispatch<React.SetStateAction<string>>,
  dispatch: Dispatch,
  appId?: string,
  appRevisionId?: string,
) => (formValues: RejectRevisionModel) => {
  if (appId && appRevisionId) {
    setRejectionReason(formValues.rejectionReason || '')
    dispatch(declineRevision({ appId, appRevisionId, ...formValues }))
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
  const { email, name } = useSelector(selectLoginIdentity) || {}

  const { declineFormState } = revisionDetail

  const { appId, id: appRevisionId } = revisionDetail?.revisionDetailData?.data || {}
  const [rejectionReason, setRejectionReason] = React.useState('')

  const isLoading = declineFormState === 'SUBMITTING'
  const isSuccessed = declineFormState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      renderChildren
      afterClose={handleAfterClose({ isSuccessed, onDeclineSuccess, isLoading, afterClose })}
    >
      <Formik
        initialValues={{ email, name, rejectionReason } as RejectRevisionModel}
        data-test="revision-decline-form"
        validate={validate}
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
                  name="rejectionReason"
                  id="rejectionReason"
                  labelText="Rejection reason"
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
