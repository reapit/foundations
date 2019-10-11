import * as React from 'react'
import { connect } from 'react-redux'
import {
  Loader,
  LoginMode,
  FlexContainerResponsive,
  Tile,
  Button,
  FlexContainerBasic,
  LevelRight,
  LevelItem
} from '@reapit/elements'
import { oc } from 'ts-optchain'
import { ReduxState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import Modal from '@/components/ui/modal'
import { Dispatch } from 'redux'
import { checkListDetailHideModal, checkListDetailShowModal } from '@/actions/checklist-detail'
import { authLogout } from '@/actions/auth'
import { ContactModel, CreateIdentityDocumentModel, CommunicationModel } from '@/types/contact-api-schema'
import { STEPS } from '../ui/modal/modal'
import styles from '@/styles/ui/section.scss?mod'
import { TiTick } from 'react-icons/ti'

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
        console.log(item)
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

export const generateSection = (contact: ContactModel, onClick: (modalType: string) => () => void) => {
  return [
    {
      title: 'Personal Details',
      isCompleted: checkCompletePersonalDetail(contact),
      onEdit: onClick(STEPS.PROFILE),
      buttonText: 'Edit'
    },
    {
      title: 'Primary ID',
      isCompleted: checkCompletePrimaryID(contact),
      onEdit: onClick(STEPS.PRIMARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Secondary ID',
      isCompleted: checkCompleteSecondaryID(contact),
      onEdit: onClick(STEPS.SECONDARY_IDENTIFICATION),
      buttonText: 'Edit'
    },
    {
      title: 'Address History',
      isCompleted: checkCompleteAddress(contact),
      onEdit: onClick(STEPS.ADDRESS_INFORMATION),
      buttonText: 'Edit'
    },
    {
      title: 'Declaration and Risk Assessment',
      isCompleted: checkCompleteDeclarationAndRisk(contact),
      onEdit: onClick(STEPS.DECLARATION_RISK_MANAGEMENT),
      buttonText: 'Edit'
    },
    {
      title: 'PEP Search',
      isCompleted: false,
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
  logout,
  contact,
  modalContentType,
  match: {
    params: { id }
  },
  mode
}) => {
  if (loading) {
    return <Loader />
  }

  let title = ''
  let forename = ''
  let surname = ''

  if (Object.keys(contact).length > 0) {
    ;({ title = '', forename = '', surname = '' } = contact as ContactModel)
  }

  const handleLogout = () => {
    if (mode === 'DESKTOP') {
      // TODO implement later
      window.location.href = `desktop://contact/SOME_CONTACT_ID`
    } else {
      logout()
    }
  }

  // TODO: Will replace callback by dispatch to show modald`
  const sections = React.useMemo(() => generateSection(contact, showModal), [contact])
  return (
    <ErrorBoundary>
      <FlexContainerBasic isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <LevelRight>
            <LevelItem>
              <a onClick={handleLogout}>Back to Client/Logout</a>
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
    </ErrorBoundary>
  )
}

export type HomeMappedProps = {
  isModalVisible: boolean
  loading: boolean
  contact: ContactModel | {}
  modalContentType: string
  mode: LoginMode | undefined
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  isModalVisible: oc(state).checklistDetail.isModalVisible(false),
  loading: oc(state).checklistDetail.loading(true),
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  modalContentType: oc(state).checklistDetail.modalContentType('PROFILE'),
  mode: oc(state).auth.refreshSession.mode()
})

export type HomeMappedActions = {
  hideModal: () => void
  showModal: (modalType: string) => () => void
  logout: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): HomeMappedActions => ({
  hideModal: () => dispatch(checkListDetailHideModal()),
  showModal: (modalType: string) => () => dispatch(checkListDetailShowModal(modalType)),
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChecklistDetail)
)
