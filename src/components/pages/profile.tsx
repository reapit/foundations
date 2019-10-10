import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ProfileToggle from '@/components/ui/profile-toggle'
import { Button, H3 } from '@reapit/elements'
import styles from '@/styles/pages/profile.scss?mod'
import PersonalDetails from '../ui/personal-details'
import { ReduxState, FormState } from '@/types/core'
import { submitChecks } from '@/actions/submit-checks'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Routes from '@/constants/routes'

const items = [
  {
    title: 'Personal Details',
    complete: true,
    children: <PersonalDetails contact={{}} />
  },
  {
    title: 'Primary ID',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Secondary Id',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Address History',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Agent checks',
    complete: false,
    children: <div>details</div>
  }
]

export interface ProfileMappedActions {
  submitChecks: () => void
}

export interface ProfileMappedProps {
  submitChecksFormState: FormState
}

export type ProfileProps = ProfileMappedActions & ProfileMappedProps

export const Profile = ({ submitChecksFormState, submitChecks }: ProfileProps) => {
  const isSubmitting = submitChecksFormState === 'SUBMITTING'

  if (submitChecksFormState === 'SUCCESS') {
    return <Redirect to={Routes.CHECKLIST_DETAIL_ID_SUCCESS} />
  }

  return (
    <ErrorBoundary>
      <div className="container">
        <div className={styles.header}>
          <H3>Mr Phillips</H3>
          <div>RPS Reference: MX12548</div>
        </div>
        <div>
          {items.map(({ title, complete, children }) => (
            <ProfileToggle key={title} title={title} complete={complete}>
              {children}
            </ProfileToggle>
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <Button
            variant="primary"
            type="button"
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={() => submitChecks()}
          >
            Submit Record for Checks
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ProfileMappedProps => ({
  submitChecksFormState: state.submitChecks.formState
})

const mapDispatchToProps = (dispatch: any): ProfileMappedActions => ({
  submitChecks: () => dispatch(submitChecks())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
