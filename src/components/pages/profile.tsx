import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ProfileToggle from '@/components/ui/profile-toggle'
import { Button, H3, Loader, FlexContainerResponsive } from '@reapit/elements'
import styles from '@/styles/pages/profile.scss?mod'
import { ReduxState, FormState } from '@/types/core'
import { submitChecks } from '@/actions/submit-checks'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import { ContactModel } from '@/types/contact-api-schema'
import ProfileDetail from '@/components/ui/modal/profile'
import AddressInformation from '@/components/ui/modal/address-information'
import AgentCheck from '@/components/ui/modal/agent-check'
import PrimaryIdentification from '@/components/ui/modal/primary-identification'
import SecondaryIdentification from '@/components/ui/modal/secondary-identification'
import { selectCheckListDetailContact, selectCheckListDetailStatus } from '@/selectors/checklist-detail'
import { ChecklistStatus } from '@/reducers/checklist-detail'

const generateSection = (status: ChecklistStatus) => {
  return [
    {
      title: 'Personal Details',
      complete: status.profile,
      children: <ProfileDetail />
    },
    {
      title: 'Primary ID',
      complete: status.primaryId,
      children: <PrimaryIdentification />
    },
    {
      title: 'Secondary ID',
      complete: status.secondaryId,
      children: <SecondaryIdentification />
    },
    {
      title: 'Address History',
      complete: status.addresses,
      children: <AddressInformation />
    },
    {
      title: 'Agent checks',
      complete: false,
      children: <AgentCheck />
    }
  ]
}

export interface ProfileMappedActions {
  submitChecks: (id: string) => void
}

export interface ProfileMappedProps {
  submitChecksFormState: FormState
  loading: boolean
  contact: ContactModel | { id: string }
  status: ChecklistStatus
}

export type ProfileProps = ProfileMappedActions & ProfileMappedProps

export const Profile = ({ submitChecksFormState, submitChecks, loading, contact, status }: ProfileProps) => {
  const isSubmitting = submitChecksFormState === 'SUBMITTING'

  if (submitChecksFormState === 'SUCCESS') {
    return <Redirect to={Routes.CHECKLIST_DETAIL_ID_SUCCESS} />
  }
  if (loading) {
    return <Loader />
  }
  let title = ''
  let forename = ''
  let surname = ''

  if (Object.keys(contact).length > 0) {
    ;({ title = '', forename = '', surname = '' } = contact as ContactModel)
  }

  const section = generateSection(status)

  return (
    <ErrorBoundary>
      <FlexContainerResponsive hasPadding flexColumn hasBackground>
        <div className={styles.header}>
          <H3>{`${title} ${forename} ${surname}`}</H3>
          <div>RPS Reference: {contact.id ? contact.id : ''}</div>
        </div>
        <div>
          {section.map(({ title, complete, children }) => (
            <ProfileToggle key={title} title={title} complete={Boolean(complete)}>
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
            onClick={() => submitChecks(contact.id || '')}
          >
            Submit Record for Checks
          </Button>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ProfileMappedProps => ({
  submitChecksFormState: state.submitChecks.formState,
  loading: oc(state).checklistDetail.loading(true),
  contact: selectCheckListDetailContact(state),
  status: selectCheckListDetailStatus(state)
})

const mapDispatchToProps = (dispatch: Dispatch): ProfileMappedActions => ({
  submitChecks: (id: string) => dispatch(submitChecks(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
