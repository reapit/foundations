import * as React from 'react'
import { useHistory } from 'react-router'
import classNames from 'classnames'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { selectInstallationAppData } from '@/selector/installations'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { Aside } from './aside'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectInstallAppLoading } from '@/selector/installations'
import { Loader, FormSection, Button } from '@reapit/elements'
import AppHeader from '@/components/ui/developer-app-detail/app-header'
import AppContent from './app-detail/app-content/app-content'
import DeveloperAppDetailButtonGroup from '@/components/ui/developer-app-detail/developer-app-detail-button-group'
import AppInstallations from '@/components/ui/app-installations/app-installations-modal'

import routes from '@/constants/routes'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import AppRevisionModal from '@/components/ui/developer-app-detail/app-revision-modal'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import useReactResponsive from '@/components/hooks/useReactResponsive'

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

export const onBackToAppsButtonClick = (history: History) => {
  return () => {
    history.push(routes.DEVELOPER_MY_APPS)
  }
}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  const history = useHistory()
  const [isInstallationsModalOpen, setIsInstallationsModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)
  const { isMobile } = useReactResponsive()

  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const isLoadingInstallations = useSelector(selectInstallAppLoading)
  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const unfetch = !appDetailState?.data || !installationsData?.data
  const { id = '', name = '' } = appDetailData
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )

  if (isLoadingAppDetail || isLoadingInstallations || unfetch) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <Aside desktopIntegrationTypes={userDesktopIntegrationTypes} appDetailState={appDetailState} />

      <div className={styles.mainContainer}>
        <AppHeader appDetailData={appDetailData} />
        <AppContent appDetailState={appDetailState} />
        {!isMobile && (
          <FormSection className={classNames('is-clearfix', styles.footerContainer)}>
            <Button className="is-pulled-right" onClick={onBackToAppsButtonClick(history)}>
              Back To Apps
            </Button>
          </FormSection>
        )}
      </div>

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
