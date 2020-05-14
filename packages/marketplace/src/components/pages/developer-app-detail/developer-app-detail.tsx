import * as React from 'react'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import { Loader } from '@reapit/elements'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'
import DeveloperAppDetailButtonGroup from '@/components/ui/developer-app-detail/developer-app-detail-button-group'
import AppDelete from '@/components/ui/app-delete'
import AppInstallations from '@/components/ui/app-installations/app-installations-modal'

import routes from '@/constants/routes'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import AppRevisionModal from '@/components/ui/developer-app-detail/app-revision-modal'
import { useHistory } from 'react-router'
import { DeveloperAppDetailState } from '@/reducers/developer'

export type DeveloperAppDetailProps = {}

export const handleOnDeleteAppSuccess = (history: History) => {
  return () => {
    history.replace(routes.DEVELOPER_MY_APPS)
  }
}

export const renderAppHeaderButtonGroup = (
  id: string,
  appDetailState: DeveloperAppDetailState,
  setIsAppRevisionComparisionModalOpen: (isVisible: boolean) => void,
  setIsDeleteModalOpen: (isVisible: boolean) => void,
  setIsInstallationsModalOpen: (isVisible: boolean) => void,
) => {
  return (
    <>
      {id && (
        <DeveloperAppDetailButtonGroup
          appDetailState={appDetailState}
          setIsAppRevisionComparisionModalOpen={setIsAppRevisionComparisionModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsInstallationsModalOpen={setIsInstallationsModalOpen}
        />
      )}
    </>
  )
}

export const closeInstallationsModal = (setIsInstallationsModalOpen: (isVisible: boolean) => void) => {
  return () => {
    setIsInstallationsModalOpen(false)
  }
}

export const closeAppRevisionComparisionModal = (
  setIsAppRevisionComparisionModalOpen: (isVisible: boolean) => void,
) => {
  return () => {
    setIsAppRevisionComparisionModalOpen(false)
  }
}

export const closeDeleteAppModal = (setIsDeleteModalOpen: (isVisible: boolean) => void) => {
  return () => {
    setIsDeleteModalOpen(false)
  }
}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isInstallationsModalOpen, setIsInstallationsModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)

  const history = useHistory()
  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)
  const { id = '', name = '' } = appDetailData

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={renderAppHeaderButtonGroup(
          id,
          appDetailState,
          setIsAppRevisionComparisionModalOpen,
          setIsDeleteModalOpen,
          setIsInstallationsModalOpen,
        )}
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />

      {isDeleteModalOpen && (
        <AppDelete
          appId={id}
          appName={name}
          afterClose={closeDeleteAppModal(setIsDeleteModalOpen)}
          visible={isDeleteModalOpen}
          onDeleteSuccess={handleOnDeleteAppSuccess(history)}
        />
      )}

      {isInstallationsModalOpen && (
        <AppInstallations
          appId={id}
          appName={name}
          visible={isInstallationsModalOpen}
          afterClose={closeInstallationsModal(setIsInstallationsModalOpen)}
          onUninstallSuccess={closeInstallationsModal(setIsInstallationsModalOpen)}
        />
      )}

      {isAppRevisionComparisionModalOpen && (
        <AppRevisionModal
          visible={isAppRevisionComparisionModalOpen}
          appId={id}
          appDetailState={appDetailState}
          afterClose={closeAppRevisionComparisionModal(setIsAppRevisionComparisionModalOpen)}
        />
      )}

      {isLoadingAppDetail && <Loader />}
    </div>
  )
}

export default DeveloperAppDetail
