import * as React from 'react'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { selectInstallationAppData } from '@/selector/installations'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { Aside } from './aside'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectInstallAppLoading } from '@/selector/installations'
import { Loader } from '@reapit/elements'
import AppHeader from './app-detail/app-header'
import AppContent from './app-detail/app-content/app-content'
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
  const isLoadingInstallations = useSelector(selectInstallAppLoading)
  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const unfetch = !appDetailState?.data || !installationsData?.data
  const { id = '', name = '' } = appDetailData

  if (isLoadingAppDetail || isLoadingInstallations || unfetch) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <Aside desktopIntegrationTypes={desktopIntegrationTypes} appDetailState={appDetailState} />
      <div className={styles.mainContainer}>
        <AppHeader appDetailData={appDetailData} />
        <AppContent appDetailData={appDetailData} />
      </div>
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
    </div>
  )
}

export default DeveloperAppDetail
