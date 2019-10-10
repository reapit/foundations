import * as React from 'react'
import { connect } from 'react-redux'
import {
  Loader,
  Button,
  Tile,
  FlexContainerBasic,
  FlexContainerResponsive,
  LevelRight,
  LevelItem
} from '@reapit/elements'
import { oc } from 'ts-optchain'
import { ReduxState, FormState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import Modal from '@/components/ui/modal'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { Dispatch } from 'redux'
import { checkListDetailHideModal, checkListDetailShowModal } from '@/actions/checklist-detail'
import { ContactModel } from '@/types/contact-api-schema'
import { STEPS } from '../ui/modal/modal'
import { submitChecks } from '@/actions/submit-checks'
import Routes from '@/constants/routes'
import { TiTick } from 'react-icons/ti'

export type CheckListDetailProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ id?: any }>

export type SectionProps = {
  title: string
  isCompleted: boolean
  onEdit: () => void
  buttonText: string
}

export const generateSection = (onClick: (modalType: string) => () => void) => {
  return [
    {
      title: 'Personal Details',
      isCompleted: false,
      onEdit: onClick(STEPS.PROFILE),
      buttonText: 'Edit'
    },
    {
      title: 'Primary ID',
      isCompleted: false,
      onEdit: onClick(STEPS.PRIMARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Secondary ID',
      isCompleted: false,
      onEdit: onClick(STEPS.SECONDARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Address History',
      isCompleted: true,
      onEdit: onClick(STEPS.ADDRESS_INFORMATION),
      buttonText: 'Edit'
    },
    {
      title: 'Declaration and Risk Assessment',
      isCompleted: false,
      onEdit: onClick(STEPS.DECLARATION_RISK_MANAGEMENT),
      buttonText: 'Edit'
    },
    {
      title: 'PEP Search',
      isCompleted: true,
      onEdit: onClick(STEPS.PEP_SEARCH),
      buttonText: 'Edit'
    },
    {
      title: 'Experian ',
      isCompleted: true,
      onEdit: onClick(STEPS.EXPERIAN),
      buttonText: 'Edit'
    },
    {
      title: 'Agent Check',
      isCompleted: false,
      onEdit: onClick(STEPS.AGENT_CHECK),
      buttonText: 'View'
    },
    {
      title: 'Report',
      isCompleted: false,
      onEdit: onClick(STEPS.REPORT),
      buttonText: 'View'
    }
  ]
}

export const renderCompletedCheckMark = (isCompleted: boolean) => {
  if (!isCompleted) {
    return null
  }
  return (
    <div className={styles.statusSection}>
      <span>
        <TiTick className={styles.checkMark} />
      </span>
      <span>Completed</span>
    </div>
  )
}

export const renderSections = (sections: SectionProps[]) => {
  return sections.map((section, index) => {
    return (
      <div className="pb-4">
        <Tile
          key={index}
          heading={section.title}
          menu={
            <Button type="button" variant="primary" onClick={section.onEdit}>
              {section.buttonText}
            </Button>
          }
        >
          {renderCompletedCheckMark(section.isCompleted)}
        </Tile>
      </div>
    )
  })
}

export const ChecklistDetail: React.FC<CheckListDetailProps> = ({
  isModalVisible,
  loading,
  hideModal,
  showModal,
  contact,
  modalContentType,
  submitChecksFormState,
  submitChecks,
  match: {
    params: { id }
  }
}) => {
  if (loading) {
    return <Loader />
  }

  const isSubmitting = submitChecksFormState === 'SUBMITTING'

  if (submitChecksFormState === 'SUCCESS') {
    return <Redirect to={`${Routes.CHECKLIST_DETAIL}/${id}/success`} />
  }

  let title = ''
  let forename = ''
  let surname = ''

  if (Object.keys(contact).length > 0) {
    ;({ title = '', forename = '', surname = '' } = contact as ContactModel)
  }

  // TODO: Will replace callback by dispatch to show modald`
  const sections = generateSection(showModal)
  return (
    <ErrorBoundary>
      <FlexContainerBasic isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <LevelRight>
            <LevelItem>
              <a onClick={() => null}>Back to Client/Logout</a>
            </LevelItem>
            <LevelItem>
              <a>Customise Form</a>
            </LevelItem>
          </LevelRight>
          <AMLProgressBar title={`${title} ${forename} ${surname}`} />
          {renderSections(sections)}
        </FlexContainerResponsive>
      </FlexContainerBasic>
      <Modal id={id} visible={isModalVisible} afterClose={hideModal} modalContentType={modalContentType} />

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
    </ErrorBoundary>
  )
}

export type HomeMappedProps = {
  isModalVisible: boolean
  loading: boolean
  contact: ContactModel | {}
  modalContentType: string
  submitChecksFormState: FormState
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  isModalVisible: oc(state).checklistDetail.isModalVisible(false),
  loading: oc(state).checklistDetail.loading(true),
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  modalContentType: oc(state).checklistDetail.modalContentType('PROFILE'),
  submitChecksFormState: state.submitChecks.formState
})

export type HomeMappedActions = {
  hideModal: () => void
  submitChecks: () => void
  showModal: (modalType: string) => () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): HomeMappedActions => ({
  hideModal: () => dispatch(checkListDetailHideModal()),
  showModal: (modalType: string) => () => dispatch(checkListDetailShowModal(modalType)),
  submitChecks: () => dispatch(submitChecks())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChecklistDetail)
)
