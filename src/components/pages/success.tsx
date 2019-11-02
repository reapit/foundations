import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Button,
  FlexContainerResponsive,
  H3,
  AcButton,
  EntityType,
  LoginMode,
  DynamicLinkParams
} from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import styles from '@/styles/pages/success.scss?mod'
import { ReduxState, FormState } from '@/types/core'
import { connect } from 'react-redux'
import { submitComplete, submitCompleteSetFormState } from '@/actions/success'
import { RouteComponentProps, withRouter } from 'react-router'
import Routes from '@/constants/routes'
import { ContactModel } from '@/types/contact-api-schema'
import { oc } from 'ts-optchain'

export interface SuccessMappedActions {
  submitComplete: (id: string, dynamicLinkParams: DynamicLinkParams) => void
  resetSubmitCompleteFormState: () => void
}

export interface SuccessMappedProps {
  submitCompleteFormState: FormState
  contact: ContactModel
  loginMode: LoginMode
}

export type SuccessProps = SuccessMappedActions & SuccessMappedProps & RouteComponentProps<{ id?: any }>

export const SuccessPage = ({
  submitComplete,
  submitCompleteFormState,
  resetSubmitCompleteFormState,
  contact,
  loginMode,
  match: {
    params: { id }
  }
}: SuccessProps) => {
  React.useEffect(() => {
    resetSubmitCompleteFormState()
  }, [])

  const dynamicLinkParams = {
    entityType: EntityType.CONTACT,
    entityCode: contact.id,
    appMode: loginMode,
    webRoute: Routes.HOME
  }

  return (
    <ErrorBoundary>
      <FlexContainerResponsive flexColumn className={styles.successWrapper}>
        <H3>
          Referral Complete
          <span className={styles.successIcon}>
            <FaCheck />
          </span>
        </H3>
        <div className={styles.successContent}>
          <p>
            Thank you for your referral. Our dedicated team will now process the information you have submitted, and we
            will be in contact with you in due course.
          </p>
          <p className="my-5">Please ‘Complete Submission’ in order to continue.</p>
          <p>Should you have any queries in the meantime, please do not hesitate to contact our team.</p>
        </div>
        <div className={styles.successButton}>
          <AcButton
            buttonProps={{
              variant: 'primary',
              type: 'button',
              loading: submitCompleteFormState === 'SUBMITTING',
              disabled: submitCompleteFormState === 'SUBMITTING',
              onClick: () => submitComplete(id, dynamicLinkParams)
            }}
            dynamicLinkParams={dynamicLinkParams}
          >
            Complete Submission
          </AcButton>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): SuccessMappedProps => ({
  submitCompleteFormState: state.success.submitCompleteFormState,
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})

const mapDispatchToProps = (dispatch: any): SuccessMappedActions => ({
  submitComplete: (id: string, dynamicLinkParams: DynamicLinkParams) =>
    dispatch(submitComplete({ id, dynamicLinkParams })),
  resetSubmitCompleteFormState: () => dispatch(submitCompleteSetFormState('PENDING'))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SuccessPage)
)
