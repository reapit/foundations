import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApproveModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, ModalBody, SubTitleH6, ModalFooter, Form, Formik } from '@reapit/elements'
import { approveRevision } from '@/actions/revision-detail'
import CallToAction from '../call-to-action'
import { selectAppRevisionDetail } from '@/selector/app-revisions'
import { selectLoginIdentity } from '@/selector/auth'
import { Dispatch } from 'redux'

export type ApproveRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  onApproveSuccess: () => void
}

export const handleAfterClose = ({ isSuccessed, onApproveSuccess, isLoading, afterClose }) => () => {
  if (isSuccessed) {
    onApproveSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const handleOnSubmit = (dispatch: Dispatch, appId?: string, appRevisionId?: string) => formValues => {
  if (appId && appRevisionId) {
    dispatch(approveRevision({ appId, appRevisionId, ...formValues }))
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
  const { email, name } = useSelector(selectLoginIdentity) || {}

  const { approveFormState } = revisionDetail

  const { appId, id: appRevisionId } = revisionDetail?.revisionDetailData?.data || {}

  const isLoading = approveFormState === 'SUBMITTING'
  const isSuccessed = approveFormState === 'SUCCESS'

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
