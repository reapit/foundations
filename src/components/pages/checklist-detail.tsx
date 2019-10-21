import * as React from 'react'
import { connect } from 'react-redux'
import { Loader, FlexContainerResponsive, Tile, Button, FlexContainerBasic } from '@reapit/elements'
import { oc } from 'ts-optchain'
import { ReduxState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import Modal from '@/components/ui/modal'
import { Dispatch } from 'redux'
import { checklistDetailHideModal, checklistDetailShowModal } from '@/actions/checklist-detail'
import { authLogout } from '@/actions/auth'
import { ContactModel, CreateIdentityDocumentModel, CommunicationModel } from '@/types/contact-api-schema'
import { STEPS } from '../ui/modal/modal'
import styles from '@/styles/ui/section.scss?mod'
import { TiTick } from 'react-icons/ti'
import { SectionsStatus, defaultStatus } from '@/reducers/checklist-detail'

export type CheckListDetailProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ id?: any }>

export type SectionProps = {
  title: string
  isCompleted: boolean
  onEdit: () => void
  buttonText: string
}

export const checkCompletePersonalDetail = (contact: ContactModel) => {
  const { title, surname, forename, dateOfBirth, communications } = contact
  if (title && surname && forename && dateOfBirth && communications) {
    return communications.some((item: CommunicationModel) => item.label === 'Mobile' || item.label === 'Home')
  }
  return false
}

export const checkCompletePrimaryID = (contact: ContactModel) => {
  const primaryId = oc(contact).metadata.primaryId(undefined)
  let flag: boolean = false
  if (primaryId) {
    flag = true
    primaryId.forEach(idList => {
      idList.documents.forEach((item: CreateIdentityDocumentModel) => {
        if (!item.typeId || !item.details || !item.expiry || !item.fileUrl) {
          flag = false
        }
      })
    })
  }
  return flag
}

export const checkCompleteSecondaryID = (contact: ContactModel) => {
  const secondaryId = oc(contact).metadata.secondaryId(undefined)
  let flag: boolean = false
  if (secondaryId) {
    flag = true
    secondaryId.forEach(idList => {
      idList.documents.forEach((item: CreateIdentityDocumentModel) => {
        if (!item.typeId || !item.details || !item.expiry || !item.fileUrl) {
          flag = false
        }
      })
    })
  }
  return flag
}

export const checkCompleteAddress = (contact: ContactModel) => {
  const { addresses, metadata } = contact
  if (addresses && metadata && metadata.addresses) {
    return (
      addresses.some(item => item.line1 && item.line3 && item.postcode) &&
      metadata.addresses.some(item => item.year && item.month && item.documentImage)
    )
  }
  return false
}

export const checkCompleteDeclarationAndRisk = (contact: ContactModel) => {
  const { metadata } = contact
  if (metadata && metadata.declarationAndRisk) {
    const { reason, type, declarationForm, riskAssessmentForm } = metadata.declarationAndRisk
    return reason && type && (declarationForm || riskAssessmentForm)
  }
  return false
}

export const generateSection = (status: SectionsStatus, onClick: (modalType: string) => () => void) => {
  return [
    {
      title: 'Personal Details',
      isCompleted: status.profile,
      onEdit: onClick(STEPS.PROFILE),
      buttonText: 'Edit'
    },
    {
      title: 'Primary ID',
      isCompleted: status.primaryId,
      onEdit: onClick(STEPS.PRIMARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Secondary ID',
      isCompleted: status.secondaryId,
      onEdit: onClick(STEPS.SECONDARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Address History',
      isCompleted: status.addresses,
      onEdit: onClick(STEPS.ADDRESS_INFORMATION),
      buttonText: 'Edit'
    },
    {
      title: 'Declaration and Risk Assessment',
      isCompleted: status.declarationRisk,
      onEdit: onClick(STEPS.DECLARATION_RISK_MANAGEMENT),
      buttonText: 'Edit'
    },
    {
      title: 'PEP Search',
      isCompleted: status.pepSearch,
      onEdit: onClick(STEPS.PEP_SEARCH),
      buttonText: 'Edit'
    },
    {
      title: 'Experian ',
      isCompleted: status.experian,
      onEdit: onClick(STEPS.EXPERIAN),
      buttonText: 'Edit'
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
      <div className="pb-4" key={index}>
        <Tile
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
  status,
  modalContentType,
  match: {
    params: { id }
  }
}) => {
  if (loading) {
    return <Loader />
  }

  // TODO: Will replace callback by dispatch to show modald`
  const sections = React.useMemo(() => generateSection(status, showModal), [status])
  return (
    <ErrorBoundary>
      <FlexContainerBasic isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <AMLProgressBar />
          {renderSections(sections)}
        </FlexContainerResponsive>
      </FlexContainerBasic>
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
  isModalVisible: oc(state).checklistDetail.isModalVisible(false),
  loading: oc(state).checklistDetail.loading(true),
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  status: oc(state).checklistDetail.status(defaultStatus),
  modalContentType: oc(state).checklistDetail.modalContentType('PROFILE')
})

export type HomeMappedActions = {
  hideModal: () => void
  showModal: (modalType: string) => () => void
  logout: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): HomeMappedActions => ({
  hideModal: () => dispatch(checklistDetailHideModal()),
  showModal: (modalType: string) => () => dispatch(checklistDetailShowModal(modalType)),
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChecklistDetail)
)
