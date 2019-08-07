import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import Loader from '@/components/ui/loader'
import Alert from '@/components/ui/alert'
import { RevisionDetailState } from '@/reducers/revision-detail'
import DiffViewer from './diff-viewer'
import { AppRevisionModel, MediaModel } from '@/types/marketplace-api-schema'
import ApproveRevisionModal from './approve-revision-modal'
import DeclineRevisionModal from './decline-revision-modal'
import DiffMedia from '@/components/ui/diff-media'
import DiffCheckbox from './diff-checkbox'

const diffStringList: { [k in keyof AppRevisionModel]: string } = {
  name: 'Name',
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

export interface AdminApprovalModalMappedActions {}

export type AdminApprovalInnerProps = AdminApprovalModalMappedProps & AdminApprovalModalMappedActions
export type AdminApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & AdminApprovalModalOwnProps

export const AdminApprovalModalInner: React.FunctionComponent<AdminApprovalInnerProps> = ({
  revisionDetailState,
  appDetailState,
  closeParentModal
}) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false)
  if (revisionDetailState.loading || appDetailState.loading) {
    return <Loader />
  }

  if (revisionDetailState.error || appDetailState.error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!revisionDetailState.revisionDetailData || !appDetailState.appDetailData) {
    return null
  }

  const revision = revisionDetailState.revisionDetailData.data
  const app = appDetailState.appDetailData.data

  const changedMediaList: { currentMedia?: string; changedMedia?: string; order: number; type: string }[] = (
    revision.media || []
  ).map((media: MediaModel) => {
    const currentMedia = (app.media || []).filter(({ order }) => order === media.order)[0]
    return {
      changedMedia: media.uri,
      currentMedia: currentMedia ? currentMedia.uri : undefined,
      order: media.order || 0,
      type: media.type || 'media'
    }
  })

  return (
    <>
      <div className="flex justify-between">
        <h3 className={`${bulma.title} ${bulma.is3}`}>Detailed changes</h3>
        <div>
          <button className={`${bulma.button} ${bulma.isPrimary} mr-2`} onClick={() => setIsApproveModalOpen(true)}>
            Approve
          </button>
          <button className={`${bulma.button} ${bulma.isDanger}`} onClick={() => setIsDeclineModalOpen(true)}>
            Decline
          </button>
        </div>
        <ApproveRevisionModal
          visible={isApproveModalOpen}
          afterClose={() => setIsApproveModalOpen(false)}
          onApproveSuccess={() => {
            closeParentModal && closeParentModal()
            setIsApproveModalOpen(false)
          }}
        />
        <DeclineRevisionModal
          visible={isDeclineModalOpen}
          afterClose={() => setIsDeclineModalOpen(false)}
          onDeclineSuccess={() => {
            closeParentModal && closeParentModal()
            setIsDeclineModalOpen(false)
          }}
        />
      </div>
      {Object.keys(diffStringList).map(key => {
        return (
          <div className="mb-3" key={key}>
            <h4 className="mb-2">{diffStringList[key]}</h4>
            <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
          </div>
        )
      })}

      <div className="mb-3">
        <h4 className="mb-2">Is listed</h4>
        <DiffCheckbox currentChecked={Boolean(app.isListed)} changedChecked={Boolean(revision.isListed)} />
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

const mapDispatchToProps = (dispatch: any): AdminApprovalModalMappedActions => ({})

const AdminApprovalInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminApprovalModalInner)

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
