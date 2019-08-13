import * as React from 'react'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ApproveModel } from '@/types/marketplace-api-schema'
import Button from '../form/button'
import { Form, Formik } from 'formik'
import { approveRevision, RevisionApproveRequestParams } from '@/actions/revision-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { oc } from 'ts-optchain'
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
  email: state.auth.loginSession!.loginIdentity.email,
  name: state.auth.loginSession!.loginIdentity.name,
  closeModal: ownProps.closeModal,
  onApproveSuccess: ownProps.onApproveSuccess
})

const mapDispatchToProps = (dispatch: any): ApproveRevisionModalMappedActions => ({
  submitApproveRevision: params => dispatch(approveRevision(params))
})

export type ApproveRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> &
  ApproveRevisionModalMappedProps &
  ApproveRevisionModalMappedActions

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

  const { appId, id: appRevisionId } = oc<RevisionDetailState>(revisionDetail).revisionDetailData.data({})

  const isLoading = approveFormState === 'SUBMITTING'
  const isSuccessed = approveFormState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      afterClose={() => {
        if (isSuccessed) {
          onApproveSuccess()
        } else if (!isLoading && afterClose) {
          afterClose()
        }
      }}
      size="small"
    >
      <Formik
        initialValues={{ email, name } as ApproveModel}
        onSubmit={formValues => {
          if (appId && appRevisionId) {
            submitApproveRevision({ appId, appRevisionId, ...formValues })
          }
        }}
        data-test="revision-approve-form"
        render={() => {
          return isSuccessed ? (
            <CallToAction
              title="Approved!"
              buttonText="Back to List"
              dataTest="approve-revision-success-message"
              onButtonClick={() => {
                onApproveSuccess()
              }}
              isCenter
            >
              Revision has been approved successfully.
            </CallToAction>
          ) : (
            <Form>
              <p className="mb-4">Do you want to approve this revision?</p>
              <div className="flex justify-end">
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
              </div>
            </Form>
          )
        }}
      />
    </Modal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveRevisionModal)
