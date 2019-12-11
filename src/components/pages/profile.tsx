import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ProfileToggle from '@/components/ui/profile-toggle'
import { H3, Loader, FlexContainerResponsive, Button } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import styles from '@/styles/pages/profile.scss?mod'
import { ReduxState, FormState } from '@/types/core'
import { submitChecks } from '@/actions/submit-checks'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Routes from '@/constants/routes'
import { ContactModel } from '@/types/contact-api-schema'
import ProfileDetail from '@/components/ui/modal/profile'
import AddressInformation from '@/components/ui/modal/address-information'
import AgentCheck from '@/components/ui/modal/agent-check'
import PrimaryIdentification from '@/components/ui/modal/primary-identification'
import SecondaryIdentification from '@/components/ui/modal/secondary-identification'
import { selectCheckListDetailContact, selectCheckListDetailStatus } from '@/selectors/checklist-detail'
import { ChecklistStatus } from '@/reducers/checklist-detail'
import { STEPS } from '@/constants/section'

const generateSection = (status: ChecklistStatus, onClick: (sectionType: string) => () => void) => {
  return [
    {
      title: STEPS.PROFILE,
      complete: status?.profile || false,
      children: <ProfileDetail />,
      onToggle: onClick(STEPS.PROFILE)
    },
    {
      title: STEPS.PRIMARY_IDENTIFICATION,
      complete: status?.primaryId || false,
      children: <PrimaryIdentification />,
      onToggle: onClick(STEPS.PRIMARY_IDENTIFICATION)
    },
    {
      title: STEPS.SECONDARY_IDENTIFICATION,
      complete: status?.secondaryId || false,
      children: <SecondaryIdentification />,
      onToggle: onClick(STEPS.SECONDARY_IDENTIFICATION)
    },
    {
      title: STEPS.ADDRESS_INFORMATION,
      complete: status?.addresses || false,
      children: <AddressInformation />,
      onToggle: onClick(STEPS.ADDRESS_INFORMATION)
    },
    {
      title: STEPS.AGENT_CHECKS,
      complete: status?.agentChecks || false,
      children: <AgentCheck />,
      onToggle: onClick(STEPS.AGENT_CHECKS)
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
  loginMode: LoginMode
}

export type ProfileProps = ProfileMappedActions & ProfileMappedProps

export const Profile = ({ submitChecksFormState, submitChecks, loading, contact, status }: ProfileProps) => {
  const [toggle, setToggle] = React.useState<string>('')

  const handleToggle = React.useCallback(
    (sectionType: string) => () => {
      if (toggle === sectionType) {
        setToggle('')
      } else {
        setToggle(sectionType)
      }
    },
    [toggle]
  )

  const section = React.useMemo(() => generateSection(status, handleToggle), [status, toggle])

  const isSubmitting = submitChecksFormState === 'SUBMITTING'

  if (submitChecksFormState === 'SUCCESS') {
    return <Redirect to={Routes.PROFILE_SUCCESS} />
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

  return (
    <ErrorBoundary>
      <FlexContainerResponsive hasPadding flexColumn hasBackground>
        <div className={styles.header}>
          <H3>{`${title} ${forename} ${surname}`}</H3>
          <div>RPS Reference: {contact.id ? contact.id : ''}</div>
        </div>
        <div>
          {section.map(({ title, complete, children, onToggle }) => (
            <ProfileToggle
              key={title}
              title={title}
              complete={Boolean(complete)}
              isOpen={toggle === title}
              onToggle={onToggle}
            >
              {children}
            </ProfileToggle>
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <Button variant="primary" type="button" loading={isSubmitting} onClick={() => submitChecks(contact.id || '')}>
            Submit Record for Checks
          </Button>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ProfileMappedProps => ({
  submitChecksFormState: state.submitChecks.formState,
  loading: !!state?.checklistDetail?.loading,
  contact: selectCheckListDetailContact(state),
  status: selectCheckListDetailStatus(state),
  loginMode: state?.auth?.refreshSession?.mode || 'WEB'
})

const mapDispatchToProps = (dispatch: Dispatch): ProfileMappedActions => ({
  submitChecks: (id: string) => dispatch(submitChecks(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
