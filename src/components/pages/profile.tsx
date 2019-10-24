import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ProfileToggle from '@/components/ui/profile-toggle'
import {
  H3,
  Loader,
  FlexContainerResponsive,
  AcButton,
  EntityType,
  LoginMode,
  DynamicLinkParams
} from '@reapit/elements'
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
import { STEPS } from '@/constants/section'

const generateSection = (status: ChecklistStatus, onClick: (sectionType: string) => () => void) => {
  return [
    {
      title: STEPS.PROFILE,
      complete: oc(status).profile(false),
      children: <ProfileDetail />,
      onToggle: onClick(STEPS.PROFILE)
    },
    {
      title: STEPS.PRIMARY_IDENTIFICATION,
      complete: oc(status).primaryId(false),
      children: <PrimaryIdentification />,
      onToggle: onClick(STEPS.PRIMARY_IDENTIFICATION)
    },
    {
      title: STEPS.SECONDARY_IDENTIFICATION,
      complete: oc(status).secondaryId(false),
      children: <SecondaryIdentification />,
      onToggle: onClick(STEPS.SECONDARY_IDENTIFICATION)
    },
    {
      title: STEPS.ADDRESS_INFORMATION,
      complete: oc(status).addresses(false),
      children: <AddressInformation />,
      onToggle: onClick(STEPS.ADDRESS_INFORMATION)
    },
    {
      title: STEPS.AGENT_CHECKS,
      complete: oc(status).agentChecks(false),
      children: <AgentCheck />,
      onToggle: onClick(STEPS.AGENT_CHECKS)
    }
  ]
}

export interface ProfileMappedActions {
  submitChecks: (id: string, dynamicLinkParams: DynamicLinkParams) => void
}

export interface ProfileMappedProps {
  submitChecksFormState: FormState
  loading: boolean
  contact: ContactModel | { id: string }
  status: ChecklistStatus
  loginMode: LoginMode
}

export type ProfileProps = ProfileMappedActions & ProfileMappedProps

export const Profile = ({ submitChecksFormState, submitChecks, loading, contact, status, loginMode }: ProfileProps) => {
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

  const dynamicLinkParams = {
    entityType: EntityType.CONTACT,
    entityCode: contact.id,
    appMode: loginMode,
    webRoute: Routes.CHECKLIST_DETAIL_ID_SUCCESS
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
          <AcButton
            buttonProps={{
              variant: 'primary',
              type: 'button',
              loading: isSubmitting,
              disabled: isSubmitting,
              onClick: () => submitChecks(contact.id || '', dynamicLinkParams)
            }}
            dynamicLinkParams={dynamicLinkParams}
          >
            Submit Record for Checks
          </AcButton>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ProfileMappedProps => ({
  submitChecksFormState: state.submitChecks.formState,
  loading: oc(state).checklistDetail.loading(true),
  contact: selectCheckListDetailContact(state),
  status: selectCheckListDetailStatus(state),
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})

const mapDispatchToProps = (dispatch: Dispatch): ProfileMappedActions => ({
  submitChecks: (id: string, dynamicLinkParams: DynamicLinkParams) => dispatch(submitChecks({ id, dynamicLinkParams }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
