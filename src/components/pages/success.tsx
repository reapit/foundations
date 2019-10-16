import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Button, FlexContainerResponsive, H3 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import styles from '@/styles/pages/success.scss?mod'
import { ReduxState, FormState } from '@/types/core'
import { connect } from 'react-redux'
import { submitComplete, submitCompleteSetFormState } from '@/actions/success'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import Routes from '@/constants/routes'
import { ContactModel } from '@/types/contact-api-schema'
import { oc } from 'ts-optchain'

export interface SuccessMappedActions {
  submitComplete: () => void
  resetSubmitCompleteFormState: () => void
}

export interface SuccessMappedProps {
  submitCompleteFormState: FormState
  contact: ContactModel
}

export type SuccessProps = SuccessMappedActions & SuccessMappedProps & RouteComponentProps<{ id?: any }>

export const SuccessPage = ({
  submitComplete,
  submitCompleteFormState,
  resetSubmitCompleteFormState,
  contact,
  match: {
    params: { id }
  }
}: SuccessProps) => {
  const isRPS = true

  React.useEffect(() => {
    resetSubmitCompleteFormState()
  }, [])

  if ((submitCompleteFormState === 'SUCCESS' && isRPS) || id === undefined || id !== contact.id) {
    return <Redirect to={Routes.RESULTS} />
  }

  if (submitCompleteFormState === 'SUCCESS' && !isRPS) {
    // code to redirect to "Contact Record" in RPS
  }

  const { title = '', forename = '', surname = '' } = contact
  const { buildingNumber, buildingName, line1, line2, line3 } = oc(contact).addresses[0]({})

  return (
    <ErrorBoundary>
      <FlexContainerResponsive hasPadding flexColumn>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <H3>
              {title} {forename} {surname}
            </H3>
          </div>
          <div className={styles.headerRight}>
            <h4 className={styles.refCode}>RPS Reference: {contact.id}</h4>
          </div>
        </div>

        <div className="flex">
          <div className={styles.leftBlock}>
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>
                <FaCheck />
              </span>
              <p>
                Thank you for submitting this information, we are in the process of checking the details and will come
                back to you shortly. Please click on the following button to complete this submission.
              </p>
            </div>
            <Button
              variant="primary"
              type="button"
              loading={submitCompleteFormState === 'SUBMITTING'}
              onClick={() => submitComplete()}
            >
              Complete Submission
            </Button>
          </div>
          <div className={styles.rightBlock}>
            <ul>
              <li>
                Name: {title} {forename}
              </li>
              <li>
                Address: {buildingNumber} {buildingName}, {line1}, {line2}, {line3}
              </li>
              <li>ID: Passport & Driving Licence</li>
              <li>Address Information: 3 years 4 months</li>
              <li>Agent Complete: completed</li>
            </ul>
          </div>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): SuccessMappedProps => ({
  submitCompleteFormState: state.success.submitCompleteFormState,
  contact: oc(state).checklistDetail.checklistDetailData.contact({})
})

const mapDispatchToProps = (dispatch: any): SuccessMappedActions => ({
  submitComplete: () => dispatch(submitComplete()),
  resetSubmitCompleteFormState: () => dispatch(submitCompleteSetFormState('PENDING'))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SuccessPage)
)
