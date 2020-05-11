import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppRevisions, selectAppRevisionDetail } from '@/selector/app-revisions'
import { Modal, Button, Loader } from '@reapit/elements'
import AppRevisionComparision from './app-revision-comparision'
import CallToAction from '../call-to-action'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { revisionsRequestData } from '@/actions/revisions'
import { revisionDetailRequestData, declineRevision } from '@/actions/revision-detail'
import { Dispatch } from 'redux'
import { LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity } from '@/selector/auth'
import { selectClientId } from '@/selector/client'
import { developerFetchAppDetail } from '@/actions/developer'

export type AppRevisionModalProps = {
  visible: boolean
  appId: string
  appDetailState: DeveloperAppDetailState
  afterClose: () => void
}

export const handleUseEffectToFetchAppRevisions = (appId: string, visible: boolean, dispatch: Dispatch<any>) => {
  return () => {
    if (appId && visible) {
      dispatch(
        revisionsRequestData({
          appId,
        }),
      )
    }
  }
}

export const handleUseEffectToFetchAppRevisionDetail = (
  appId: string,
  visible: boolean,
  dispatch: Dispatch<any>,
  appRevisionId?: string,
) => {
  return () => {
    if (appId && appRevisionId && visible) {
      dispatch(
        revisionDetailRequestData({
          appId,
          appRevisionId,
        }),
      )
    }
  }
}

export const handleCancelPendingRevisionsButtonClick = (
  appId: string,
  clientId: string,
  dispatch: Dispatch<any>,
  setIsConfirmationModalVisible: (isVisible: boolean) => void,
  appRevisionId?: string,
  loginIdentity?: LoginIdentity,
) => {
  return () => {
    if (!appRevisionId || !loginIdentity) {
      return
    }
    const { name, email } = loginIdentity
    dispatch(
      declineRevision({
        appId,
        appRevisionId,
        name,
        email,
        rejectionReason: 'Developer Cancelled',
        callback: () => {
          dispatch(
            developerFetchAppDetail({
              id: appId,
              clientId,
            }),
          )
          setIsConfirmationModalVisible(false)
        },
      }),
    )
  }
}

const AppRevisionModal: React.FC<AppRevisionModalProps> = ({ appId, visible, appDetailState, afterClose }) => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = React.useState(false)
  const dispatch = useDispatch()
  const revisions = useSelector(selectAppRevisions)
  const appRevisionDetail = useSelector(selectAppRevisionDetail)
  const loginIdentity = useSelector(selectLoginIdentity)
  const clientId = useSelector(selectClientId)

  const revisionsData = revisions?.data
  const latestAppRevisionId = revisionsData && revisionsData[0].id
  const { declineFormState, revisionDetailData } = appRevisionDetail
  const isDeclining = declineFormState === 'SUBMITTING'
  const isDeclinedSuccessfully = declineFormState === 'SUCCESS'
  let hasRevisionDetailData = false
  if (revisionDetailData) {
    hasRevisionDetailData = true
  }

  React.useEffect(handleUseEffectToFetchAppRevisions(appId, visible, dispatch), [appId, visible, dispatch])

  React.useEffect(handleUseEffectToFetchAppRevisionDetail(appId, visible, dispatch, latestAppRevisionId), [
    appId,
    latestAppRevisionId,
    visible,
    dispatch,
  ])

  return (
    <Modal
      visible={visible}
      title="Pending Revisions"
      afterClose={afterClose}
      footerItems={
        <Button
          disabled={!hasRevisionDetailData}
          variant="primary"
          type="button"
          onClick={() => setIsConfirmationModalVisible(true)}
          dataTest="revision-approve-button"
        >
          CANCEL PENDING REVISIONS
        </Button>
      }
    >
      <>
        {!hasRevisionDetailData ? (
          <Loader />
        ) : (
          <AppRevisionComparision appDetailData={appDetailState.data} revisionDetailState={appRevisionDetail} />
        )}
        <Modal
          visible={isConfirmationModalVisible}
          title="Please confirm"
          afterClose={() => setIsConfirmationModalVisible(false)}
          footerItems={
            <>
              <Button
                variant="danger"
                type="button"
                loading={isDeclining}
                onClick={handleCancelPendingRevisionsButtonClick(
                  appId,
                  clientId,
                  dispatch,
                  setIsConfirmationModalVisible,
                  latestAppRevisionId,
                  loginIdentity,
                )}
              >
                YES, PROCEED
              </Button>
              <Button variant="primary" type="button" onClick={() => setIsConfirmationModalVisible(false)}>
                CANCEL
              </Button>
            </>
          }
        >
          <p>Are you sure you wish to cancel any pending revisions for this App?</p>
        </Modal>

        <Modal visible={isDeclinedSuccessfully} afterClose={afterClose}>
          <CallToAction title="SUCCESS" type="success" buttonText="BACK TO APP" isCenter onButtonClick={afterClose}>
            All pending revisions for this app have been cancelled. You can now use the ‘Edit Detail’ option to make any
            additional changes as required.
          </CallToAction>
        </Modal>
      </>
    </Modal>
  )
}

export default AppRevisionModal
