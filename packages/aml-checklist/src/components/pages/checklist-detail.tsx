import * as React from 'react'
import { connect } from 'react-redux'
import { Loader, Tile, Button, Section, FadeIn } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import Modal from '@/components/ui/modal'
import { Dispatch } from 'redux'
import { checklistDetailHideModal, checklistDetailShowModal } from '@/actions/checklist-detail'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { STEPS } from '../ui/modal/modal'
import styles from '@/styles/ui/section.scss?mod'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { defaultStatus } from '@/constants/section-status'
import { FaCheck, FaTimes } from 'react-icons/fa'

export type CheckListDetailProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ id?: any }>

export type SectionProps = {
  title: string
  isCompleted: boolean
  onEdit: () => void
  buttonText: string
}

export const generateSection = (status: SectionsStatus, onClick: (modalType: string) => () => void) => {
  return [
    {
      title: STEPS.PROFILE,
      isCompleted: status.profile,
      onEdit: onClick(STEPS.PROFILE),
      buttonText: 'Edit',
    },
    {
      title: STEPS.PRIMARY_IDENTIFICATION,
      isCompleted: status.primaryId,
      onEdit: onClick(STEPS.PRIMARY_IDENTIFICATION),
      buttonText: 'Edit',
    },
    {
      title: STEPS.SECONDARY_IDENTIFICATION,
      isCompleted: status.secondaryId,
      onEdit: onClick(STEPS.SECONDARY_IDENTIFICATION),
      buttonText: 'Edit',
    },
    {
      title: STEPS.ADDRESS_INFORMATION,
      isCompleted: status.addresses,
      onEdit: onClick(STEPS.ADDRESS_INFORMATION),
      buttonText: 'Edit',
    },
    {
      title: STEPS.DECLARATION_RISK_MANAGEMENT,
      isCompleted: status.declarationRisk,
      onEdit: onClick(STEPS.DECLARATION_RISK_MANAGEMENT),
      buttonText: 'Edit',
    },
    // {
    //   title: STEPS.PEP_SEARCH,
    //   isCompleted: status.pepSearch,
    //   onEdit: onClick(STEPS.PEP_SEARCH),
    //   buttonText: 'Edit'
    // },
    // {
    //   title: STEPS.EXPERIAN,
    //   isCompleted: status.experian,
    //   onEdit: onClick(STEPS.EXPERIAN),
    //   buttonText: 'Edit'
    // },
    {
      title: STEPS.REPORT,
      isCompleted: false,
      onEdit: onClick(STEPS.REPORT),
      buttonText: 'View',
    },
  ]
}

export const renderCheckMark = (isCompleted: boolean, isOnMobile: boolean) => {
  return (
    <div className={`${styles.statusSection} ${isOnMobile ? styles.showOnMobile : styles.hideOnMobile}`}>
      {isCompleted ? <FaCheck className={styles.checkCompleted} /> : <FaTimes className={styles.checkIncomplete} />}
      <span className={styles.statusText}>{isCompleted ? 'Completed' : 'Incomplete'}</span>
    </div>
  )
}

export const renderSections = (sections: SectionProps[]) => {
  return sections.map((section, index) => {
    return (
      <FadeIn key={index}>
        <Section hasPadding={false}>
          <Tile
            heading={section.title}
            menu={
              <div className={styles.statusSectionWrap}>
                {section.title !== STEPS.REPORT && renderCheckMark(section.isCompleted, false)}
                <Button type="button" variant="primary" onClick={section.onEdit}>
                  {section.buttonText}
                </Button>
              </div>
            }
          >
            {section.title !== STEPS.REPORT && renderCheckMark(section.isCompleted, true)}
          </Tile>
        </Section>
      </FadeIn>
    )
  })
}

export const ChecklistDetail: React.FC<CheckListDetailProps> = ({
  isModalVisible,
  loading,
  hideModal,
  showModal,
  status,
  modalContentType,
  match: {
    params: { id },
  },
}) => {
  if (loading) {
    return <Loader />
  }

  // TODO: Will replace callback by dispatch to show modald`
  const sections = React.useMemo(() => generateSection(status, showModal), [status])
  return (
    <ErrorBoundary>
      <Section hasPadding={false} hasBackground={false}>
        <AMLProgressBar />
        {renderSections(sections)}
      </Section>
      <Modal id={id} visible={isModalVisible} afterClose={hideModal} modalContentType={modalContentType} />
    </ErrorBoundary>
  )
}

export type HomeMappedProps = {
  isModalVisible: boolean
  loading: boolean
  contact: ContactModel | {}
  status: SectionsStatus
  modalContentType: string
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  isModalVisible: state?.checklistDetail?.isModalVisible || false,
  loading: state?.checklistDetail?.loading || false,
  contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  status: state?.checklistDetail?.status || defaultStatus,
  modalContentType: state?.checklistDetail?.modalContentType || 'PROFILE',
})

export type HomeMappedActions = {
  hideModal: () => void
  showModal: (modalType: string) => () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): HomeMappedActions => ({
  hideModal: () => dispatch(checklistDetailHideModal()),
  showModal: (modalType: string) => () => dispatch(checklistDetailShowModal(modalType)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChecklistDetail))
