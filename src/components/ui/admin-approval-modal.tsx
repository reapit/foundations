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

export interface AdminApprovalModalMappedProps {
  revisionDetailState: RevisionDetailState
  appDetailState: AppDetailState
  closeParentModal?: () => void
}

interface DiffMediaModel {
  currentMedia?: string
  changedMedia?: string
  order: number
  type: string
}

export interface AdminApprovalModalMappedActions {}

export type AdminApprovalInnerProps = AdminApprovalModalMappedProps & AdminApprovalModalMappedActions
export type AdminApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & AdminApprovalModalOwnProps

export const isAppearInScope = (nameNeedToFind: string | undefined, scopes: ScopeModel[] = []): boolean => {
  if (!nameNeedToFind || scopes.length === 0) {
    return false
  }
  const result = scopes.find((item: ScopeModel) => {
    return item.name === nameNeedToFind
  })
  return !!result
}

export const handleOnApproveSuccess = ({ closeParentModal, setIsApproveModalOpen }) => () => {
  closeParentModal && closeParentModal()
  setIsApproveModalOpen(false)
}

export const handleOnDeclineSuccess = ({ closeParentModal, setIsDeclineModalOpen }) => () => {
  closeParentModal && closeParentModal()
  setIsDeclineModalOpen(false)
}

export const handleSetIsApproveModal = (setIsApproveModalOpen, value) => () => setIsApproveModalOpen(value)

export const handleSetIsDeclineModal = (setIsDeclineModalOpen, value) => () => setIsDeclineModalOpen(value)

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

export const AdminApprovalModalInner: React.FunctionComponent<AdminApprovalInnerProps> = ({
  revisionDetailState,
  appDetailState,
  closeParentModal
}) => {
  const isShowApproveModal = revisionDetailState.approveFormState === 'SUCCESS'
  const isShowDeclineModal = revisionDetailState.declineFormState === 'SUCCESS'
  const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(isShowApproveModal || false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(isShowDeclineModal || false)
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

  const changedMediaList: DiffMediaModel[] = (revision.media || [])
      .map((media: MediaModel) => {
        const currentMedia = (app.media || []).filter(({ order }) => order === media.order)[0]
        return {
          changedMedia: media.uri,
          currentMedia: currentMedia ? currentMedia.uri : undefined,
          order: media.order || 0,
          type: media.type || 'media'
        }
      })
      .filter(({ changedMedia, currentMedia }) => changedMedia !== currentMedia)

    // verify which image has been removed
  ;(app.media || []).forEach((media: MediaModel) => {
    const nonExist =
      (revision.media || []).findIndex(({ order }: MediaModel) => {
        return order === media.order
      }) === -1
    if (nonExist) {
      changedMediaList.push({
        changedMedia: '',
        currentMedia: media.uri,
        order: media.order || 0,
        type: media.type || 'media'
      })
    }
  })

  changedMediaList.sort((a, b) => a.order - b.order)

  return (
    <>
      <ModalHeader
        title={`Confirm ${app.name} revision`}
        afterClose={closeParentModal as () => void}
        data-test="revision-detail-modal"
      />
      <ApproveRevisionModal
        visible={isApproveModalOpen}
        afterClose={handleSetIsApproveModal(setIsApproveModalOpen, false)}
        onApproveSuccess={handleOnApproveSuccess({ closeParentModal, setIsApproveModalOpen })}
      />
      <DeclineRevisionModal
        visible={isDeclineModalOpen}
        afterClose={handleSetIsDeclineModal(setIsDeclineModalOpen, false)}
        onDeclineSuccess={handleOnDeclineSuccess({ closeParentModal, setIsDeclineModalOpen })}
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
            {changedMediaList.map(media => (
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
          <>
            <Button
              className="mr-2"
              variant="primary"
              type="button"
              onClick={handleSetIsApproveModal(setIsApproveModalOpen, true)}
              dataTest="revision-approve-button"
            >
              Approve
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={handleSetIsDeclineModal(setIsDeclineModalOpen, true)}
              data-test="revision-decline-button"
            >
              Decline
            </Button>
          </>
        }
      />
    </>
  )
}

interface AdminApprovalModalOwnProps {
  closeParentModal?: () => void
}
const mapStateToProps = (state: ReduxState, ownState: AdminApprovalModalOwnProps): AdminApprovalModalMappedProps => ({
  revisionDetailState: state.revisionDetail,
  appDetailState: state.appDetail,
  closeParentModal: ownState.closeParentModal
})

export const withRedux = connect(mapStateToProps, null)

const AdminApprovalInnerWithConnect = compose<React.FC<AdminApprovalModalOwnProps>>(withRedux)(AdminApprovalModalInner)

export const AdminApprovalModal: React.FunctionComponent<AdminApprovalModalProps> = ({
  visible = true,
  afterClose
}) => {
  return (
    <Modal visible={visible} afterClose={afterClose} deps={[]}>
      <AdminApprovalInnerWithConnect closeParentModal={afterClose} />
    </Modal>
  )
}

export default AdminApprovalModal
