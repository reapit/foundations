import * as React from 'react'
import { Modal, ModalProps, Loader, Button, ModalHeader, ModalFooter, ModalBody, Alert } from '@reapit/elements'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import DiffViewer from './diff-viewer'
import { AppRevisionModel, MediaModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import ApproveRevisionModal from './approve-revision-modal'
import DeclineRevisionModal from './decline-revision-modal'
import DiffMedia from '@/components/ui/diff-media'
import DiffCheckbox from './diff-checkbox'
import { compose } from 'redux'

const diffStringList: { [k in keyof AppRevisionModel]: string } = {
  name: 'Name',
  category: 'Category',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  supportEmail: 'Support Email',
  telephone: 'Telephone',
  summary: 'Summary',
  description: 'Description'
}

type DiffMediaModel = {
  currentMedia?: string
  changedMedia?: string
  order: number
  type: string
}

export const isAppearInScope = (nameNeedToFind: string | undefined, scopes: ScopeModel[] = []): boolean => {
  if (!nameNeedToFind || scopes.length === 0) {
    return false
  }
  const result = scopes.find((item: ScopeModel) => {
    return item.name === nameNeedToFind
  })
  return !!result
}

export const renderCheckboxesDiff = ({
  scopes,
  appScopes,
  revisionScopes
}: {
  scopes: ScopeModel[]
  appScopes: ScopeModel[] | undefined
  revisionScopes: ScopeModel[] | undefined
}) => {
  return scopes.map((scope: ScopeModel) => {
    const isCheckedInAppDetail = isAppearInScope(scope.name, appScopes)
    const isCheckedInRevision = isAppearInScope(scope.name, revisionScopes)
    return (
      <div className="mb-3" key={scope.name}>
        <h4 className="mb-2">{scope.description}</h4>
        <DiffCheckbox currentChecked={isCheckedInAppDetail} changedChecked={isCheckedInRevision} />
      </div>
    )
  })
}

export const getChangedMediaList = ({ app, revision }): DiffMediaModel[] => {
  // Check the longest array to compare
  const isNewMediaMoreItemThanOldOne = revision?.media?.length >= app?.media?.length
  if (isNewMediaMoreItemThanOldOne) {
    return revision.media.map((revisionMedia: MediaModel, index: number) => ({
      changedMedia: revisionMedia?.uri,
      currentMedia: app.media?.[index]?.uri,
      order: revisionMedia?.order || 0,
      type: revisionMedia?.type || ''
    }))
  }

  return app.media.map((currentMedia: MediaModel, index: number) => ({
    changedMedia: revision.media?.[index]?.uri,
    currentMedia: currentMedia?.uri,
    order: currentMedia?.order || 0,
    type: currentMedia?.type || 'media'
  }))
}

export type AdminApprovalModalInnerProps = StateProps
export const AdminApprovalModalInner: React.FunctionComponent<AdminApprovalModalInnerProps> = ({
  revisionDetailState,
  appDetailState,
  closeParentModal,
  onApprovalClick,
  onDeclineClick
}) => {
  if (revisionDetailState.loading || appDetailState.loading) {
    return <ModalBody body={<Loader />} />
  }

  if (revisionDetailState.error || appDetailState.error) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
  }

  if (!revisionDetailState.revisionDetailData || !appDetailState.appDetailData) {
    return null
  }

  const { data: revision, scopes } = revisionDetailState.revisionDetailData
  const app = appDetailState.appDetailData.data

  return (
    <React.Fragment>
      <ModalHeader
        title={`Confirm ${app.name} revision`}
        afterClose={closeParentModal as () => void}
        data-test="revision-detail-modal"
      />
      <ModalBody
        body={
          <>
            {Object.keys(diffStringList).map(key => {
              if (key === 'category') {
                return (
                  <div className="mb-3" key={key}>
                    <h4 className="mb-2">{diffStringList[key]}</h4>
                    <DiffViewer
                      currentString={app.category?.name || ''}
                      changedString={revision.category?.name || ''}
                      type="words"
                    />
                  </div>
                )
              } else {
                return (
                  <div className="mb-3" key={key}>
                    <h4 className="mb-2">{diffStringList[key]}</h4>
                    <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
                  </div>
                )
              }
            })}
            {renderCheckboxesDiff({ scopes, appScopes: app.scopes, revisionScopes: revision.scopes })}
            <div className="mb-3">
              <h4 data-test="chkIsListed" className="mb-2">
                Is listed
              </h4>
              <DiffCheckbox
                currentChecked={Boolean(app.isListed)}
                changedChecked={Boolean(revision.isListed)}
                dataTest="revision-diff-isListed"
              />
            </div>
            <div className="mb-3">
              <h4 data-test="chkIsDirectApi" className="mb-2">
                Is Direct API
              </h4>
              <DiffCheckbox
                currentChecked={Boolean(app.isDirectApi)}
                changedChecked={Boolean(revision.isDirectApi)}
                dataTest="revision-diff-isDirectApi"
              />
            </div>
            {getChangedMediaList({ app, revision }).map(media => (
              <div className="mb-3" key={media.order}>
                <h4 className="mb-2 capitalize">
                  {media.type} {media.order > 0 && <span>{media.order}</span>}
                </h4>
                <DiffMedia changedMedia={media.changedMedia} currentMedia={media.currentMedia} type={media.type} />
              </div>
            ))}
          </>
        }
      />

      <ModalFooter
        footerItems={
          <React.Fragment>
            <Button
              className="mr-2"
              variant="primary"
              type="button"
              onClick={onApprovalClick}
              dataTest="revision-approve-button"
            >
              Approve
            </Button>
            <Button variant="danger" type="button" onClick={onDeclineClick} data-test="revision-decline-button">
              Decline
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

export type StateProps = {
  revisionDetailState: RevisionDetailState
  appDetailState: AppDetailState
  closeParentModal?: () => void
  onApprovalClick: () => void
  onDeclineClick: () => void
}

export const mapStateToProps = (state: ReduxState, ownProps: AdminApprovalInnerWithConnectProps): StateProps => ({
  revisionDetailState: state.revisionDetail,
  appDetailState: state.appDetail,
  closeParentModal: ownProps.closeParentModal,
  onApprovalClick: ownProps.onApprovalClick,
  onDeclineClick: ownProps.onDeclineClick
})

export const withRedux = connect(mapStateToProps, null)

export type AdminApprovalInnerWithConnectProps = {
  onApprovalClick: () => void
  onDeclineClick: () => void
  closeParentModal?: () => void
}

const AdminApprovalInnerWithConnect = compose<React.FC<AdminApprovalInnerWithConnectProps>>(withRedux)(
  AdminApprovalModalInner
)

export const handleOnApproveSuccess = (setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsApproveModalOpen(false)
}

export const handleOnDeclineSuccess = (setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsDeclineModalOpen(false)
}

export type HandleSetIsApproveModalParams = {
  setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isApproveModalOpen: boolean
  afterClose?: () => void
}

export const handleSetIsApproveModal = ({
  setIsApproveModalOpen,
  isApproveModalOpen,
  afterClose
}: HandleSetIsApproveModalParams) => () => {
  afterClose && afterClose()
  setIsApproveModalOpen(isApproveModalOpen)
}

export type HandleSetIsDeclineModalParams = {
  setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDeclineModalOpen: boolean
  afterClose?: () => void
}

export const handleSetIsDeclineModal = ({
  setIsDeclineModalOpen,
  isDeclineModalOpen,
  afterClose
}: HandleSetIsDeclineModalParams) => () => {
  afterClose && afterClose()
  setIsDeclineModalOpen(isDeclineModalOpen)
}

export type AdminApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'>

export const AdminApprovalModal: React.FunctionComponent<AdminApprovalModalProps> = ({
  visible = true,
  afterClose
}) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Modal visible={visible} afterClose={afterClose} deps={[]}>
        <AdminApprovalInnerWithConnect
          onApprovalClick={handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true, afterClose })}
          onDeclineClick={handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true, afterClose })}
          closeParentModal={afterClose}
        />
      </Modal>
      <ApproveRevisionModal
        visible={isApproveModalOpen}
        afterClose={handleSetIsApproveModal({
          setIsApproveModalOpen,
          isApproveModalOpen: false
        })}
        onApproveSuccess={handleOnApproveSuccess(setIsApproveModalOpen)}
      />
      <DeclineRevisionModal
        visible={isDeclineModalOpen}
        afterClose={handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: false })}
        onDeclineSuccess={handleOnDeclineSuccess(setIsDeclineModalOpen)}
      />
    </React.Fragment>
  )
}

export default AdminApprovalModal
