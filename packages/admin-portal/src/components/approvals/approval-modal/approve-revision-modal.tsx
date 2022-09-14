import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApproveModel, AppRevisionModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, ModalBody, SubTitleH6, ModalFooter, Form, Formik } from '@reapit/elements'
import { requestApproveRevision } from '@/actions/revision-detail'
import CallToAction from '../call-to-action'
import { Dispatch } from 'redux'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectAppRevisionDetail, selectAppRevisionFormState } from '@/selector/app-revisions'

export type ApproveRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  onApproveSuccess: () => void
}

export const handleAfterClose =
  ({ isSuccessed, onApproveSuccess, isLoading, afterClose }) =>
  () => {
    if (isSuccessed) {
      onApproveSuccess()
    } else if (!isLoading && afterClose) {
      afterClose()
    }
  }

export const handleOnSubmit = (dispatch: Dispatch, appId?: string, appRevisionId?: string) => (formValues) => {
  if (appId && appRevisionId) {
    dispatch(requestApproveRevision({ appId, appRevisionId, ...formValues }))
  }
}

export const onCancelButtonClick = (afterClose?: () => void) => {
  return () => {
    afterClose && afterClose()
  }
}

export const ApproveRevisionModal: React.FunctionComponent<ApproveRevisionModalProps> = ({
  visible = true,
  afterClose,
  onApproveSuccess,
}) => {
  const dispatch = useDispatch()
  const revisionDetail = useSelector(selectAppRevisionDetail)
  const session = useReapitConnect(reapitConnectBrowserSession)
  const { email, name } = session?.connectSession?.loginIdentity || {}
  const formState = useSelector(selectAppRevisionFormState)
  const { appId, id: appRevisionId } = (revisionDetail?.data?.data || {}) as AppRevisionModel

  const isLoading = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      renderChildren
      afterClose={handleAfterClose({ isSuccessed, onApproveSuccess, isLoading, afterClose })}
    >
      <Formik
        initialValues={{ email, name } as ApproveModel}
        onSubmit={handleOnSubmit(dispatch, appId, appRevisionId)}
        data-test="revision-approve-form"
      >
        {isSuccessed ? (
          <CallToAction
            title="Success"
            buttonText="Back to List"
            dataTest="approve-revision-success-message"
            buttonDataTest="approve-revision-success-button"
            onButtonClick={onApproveSuccess}
            isCenter
          >
            Revision has been approved successfully.
          </CallToAction>
        ) : (
          <Form>
            <ModalBody body={<SubTitleH6 isCentered>Do you want to approve this revision?</SubTitleH6>} />
            <ModalFooter
              footerItems={
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mr-2"
                    disabled={isLoading}
                    onClick={onCancelButtonClick(afterClose)}
                    dataTest="revision-approve-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={isLoading}
                    dataTest="revision-approve-submit"
                  >
                    Approve
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

export default ApproveRevisionModal
