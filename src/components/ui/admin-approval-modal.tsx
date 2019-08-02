import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState, FormState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import Loader from '@/components/ui/loader'
import Alert from '@/components/ui/alert'
import { RevisionDetailState } from '@/reducers/revision-detail'
import DiffViewer from './diff-viewer'
import { AppRevisionModel } from '@/types/marketplace-api-schema'

const diffStringList: { [k in keyof AppRevisionModel]: string } = {
  name: 'Name',
  homePage: 'Home page',
  supportEmail: 'Support Email',
  telephone: 'Telephone',
  summary: 'Summary',
  description: 'Description'
}

export interface AdminApprovalModalMappedProps {
  revisionDetailState: RevisionDetailState
  appDetailState: AppDetailState
}

export interface AdminApprovalModalMappedActions {}

export type AdminApprovalInnerProps = AdminApprovalModalMappedProps & AdminApprovalModalMappedActions & {}
export type AdminApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const AdminApprovalModalInner: React.FunctionComponent<AdminApprovalInnerProps> = ({
  revisionDetailState,
  appDetailState
}) => {
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

  return (
    <>
      <div className="flex justify-between">
        <h3 className={`${bulma.title} ${bulma.is3}`}>Detailed changes</h3>
        <div>
          <button className={`${bulma.button} ${bulma.isPrimary} mr-2`}>Approve</button>
          <button className={`${bulma.button} ${bulma.isDanger}`}>Decline</button>
        </div>
      </div>
      {Object.keys(diffStringList).map(key => {
        return (
          <div className="mb-3" key={key}>
            <h4 className="mb-2">{diffStringList[key]}</h4>
            <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
          </div>
        )
      })}
    </>
  )
}

const mapStateToProps = (state: ReduxState): AdminApprovalModalMappedProps => ({
  revisionDetailState: state.revisionDetail,
  appDetailState: state.appDetail
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
    <Modal visible={visible} afterClose={afterClose}>
      <AdminApprovalInnerWithConnect />
    </Modal>
  )
}

export default AdminApprovalModal
