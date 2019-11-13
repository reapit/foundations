import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ApproveModel } from '@/types/marketplace-api-schema'
import { Button, Modal, ModalProps, ModalBody, SubTitleH6, ModalFooter } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { approveRevision, RevisionApproveRequestParams } from '@/actions/revision-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import CallToAction from './call-to-action'

interface ApproveRevisionModalWithConnectOwnProps {
  closeModal?: () => void
  onApproveSuccess: () => void
}

export interface ApproveRevisionModalMappedProps extends ApproveRevisionModalWithConnectOwnProps {
  revisionDetail: RevisionDetailState
  name: string
  email: string
}

export interface ApproveRevisionModalMappedActions {
  submitApproveRevision: (params: RevisionApproveRequestParams) => void
}

const mapStateToProps = (
  state: ReduxState,
  ownProps: ApproveRevisionModalWithConnectOwnProps
): ApproveRevisionModalMappedProps => ({
  revisionDetail: state.revisionDetail,
  email: state?.auth?.loginSession?.loginIdentity?.email || '',
  name: state?.auth?.loginSession?.loginIdentity?.name || '',
  closeModal: ownProps.closeModal,
  onApproveSuccess: ownProps.onApproveSuccess
})

const mapDispatchToProps = (dispatch: any): ApproveRevisionModalMappedActions => ({
  submitApproveRevision: params => dispatch(approveRevision(params))
})

export type ApproveRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> &
  ApproveRevisionModalMappedProps &
  ApproveRevisionModalMappedActions

export const handleAfterClose = ({ isSuccessed, onApproveSuccess, isLoading, afterClose }) => () => {
  if (isSuccessed) {
    onApproveSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const handleOnSubmit = ({ appId, appRevisionId, submitApproveRevision }) => formValues => {
  if (appId && appRevisionId) {
    submitApproveRevision({ appId, appRevisionId, ...formValues })
  }
}

export const ApproveRevisionModal: React.FunctionComponent<ApproveRevisionModalProps> = ({
  visible = true,
  afterClose,
  revisionDetail,
  submitApproveRevision,
  onApproveSuccess,
  name,
  email
}) => {
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
        onSubmit={handleOnSubmit({ appRevisionId, submitApproveRevision, appId })}
        data-test="revision-approve-form"
        render={() => {
          return isSuccessed ? (
            <ModalBody
              body={
                <CallToAction
                  title="Approved!"
                  buttonText="Back to List"
                  dataTest="approve-revision-success-message"
                  buttonDataTest="approve-revision-success-button"
                  onButtonClick={() => {
                    onApproveSuccess()
                  }}
                  isCenter
                >
                  Revision has been approved successfully.
                </CallToAction>
              }
            />
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
                      disabled={Boolean(isLoading)}
                      onClick={() => afterClose && afterClose()}
                      dataTest="revision-approve-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={Boolean(isLoading)}
                      disabled={Boolean(isLoading)}
                      dataTest="revision-approve-submit"
                    >
                      Approve
                    </Button>
                  </>
                }
              />
            </Form>
          )
        }}
      />
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRevisionModal)
