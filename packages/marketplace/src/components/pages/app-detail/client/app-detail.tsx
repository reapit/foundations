// The UI of this page should be the same as the App Detail Preview page in Developer portal
// Make sure to always update the UI in both places if needed
import * as React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router'
import AppUninstallConfirmation from '@/components/pages/app-detail/client/app-uninstall-confirmation'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/client-app-detail'
import { selectClientId, selectIsAdmin } from '@/selector/auth'
import { canGoBack } from '@/utils/router-helper'
import AppContent from './app-content'
import { Loader, GridItem, Grid, Section } from '@reapit/elements'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import AppInstallConfirmation from '@/components/pages/app-detail/client/app-install-confirmation'
import { Aside } from './aside'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import Routes from '@/constants/routes'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import AppHeader from '../common/ui-app-header'
import { BackToAppsSection } from '../common/ui-sections'
import { AppDetailButtonGroup } from './app-detail-button-group'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectDeveloperEditionId } from '@/selector/client'

export type ClientAppDetailProps = {}

export const handleCloseInstallConfirmationModal = (
  setIsVisibleInstallConfirmation: (isVisible: boolean) => void,
) => () => {
  setIsVisibleInstallConfirmation(false)
}

export const handleInstallAppButtonClick = (setIsVisibleInstallConfirmation: (isVisible: boolean) => void) => () => {
  setIsVisibleInstallConfirmation(true)
}

export const handleCloseUnInstallConfirmationModal = (
  setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void,
) => () => {
  setIsVisibleUnInstallConfirmation(false)
}

export const handleUnInstallAppButtonClick = (
  setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void,
) => () => {
  setIsVisibleUnInstallConfirmation(true)
}

export const onBackToAppsButtonClick = (history: History) => () => {
  if (canGoBack(history)) {
    history.goBack()
  }
  history.push(Routes.APPS)
}

const AppDetail: React.FC = () => {
  const history = useHistory()

  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const [isVisibleUninstallConfirmation, setIsVisibleUninstallConfirmation] = React.useState(false)
  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )

  const onInstallConfirmationModal = React.useCallback(handleInstallAppButtonClick(setIsVisibleInstallConfirmation), [])
  const onUninstsallConfirmationModal = React.useCallback(
    handleUnInstallAppButtonClick(setIsVisibleUninstallConfirmation),
    [],
  )
  const closeUninstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleUninstallConfirmation),
    [],
  )

  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const appDetailData = useSelector(selectAppDetailData) as AppDetailDataNotNull
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )
  const { isMobile } = useReactResponsive()

  const isLoadingAppDetail = useSelector(selectAppDetailLoading)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const isDesktopAdmin = selectIsAdmin(connectSession)
  const isClient = Boolean(selectClientId(connectSession))
  const isDeveloperEdition = Boolean(selectDeveloperEditionId(connectSession))

  const isAdmin = isDesktopAdmin || isDeveloperEdition
  const isInstallBtnHidden = isClient && !isAdmin

  // selector selectAppDetailData return {} if not data

  const unfetched = Object.keys(appDetailData).length === 0
  const { installedOn = '' } = appDetailData

  return (
    <Grid className={styles.container} dataTest="client-app-detail-container">
      {isLoadingAppDetail || unfetched ? (
        <Loader dataTest="client-app-detail-loader" />
      ) : (
        <>
          <GridItem className="is-one-quarter">
            <Aside appDetailData={appDetailData} desktopIntegrationTypes={userDesktopIntegrationTypes} />
          </GridItem>
          <GridItem className="is-three-quarters">
            <Section isFlex isFlexColumn isFullHeight>
              <AppHeader
                appDetailData={appDetailData}
                buttonGroup={
                  <AppDetailButtonGroup
                    installedOn={installedOn}
                    onInstallConfirmationModal={onInstallConfirmationModal}
                    onUninstallConfirmationModal={onUninstsallConfirmationModal}
                    isInstallBtnHidden={isInstallBtnHidden}
                  />
                }
              />
              <AppContent appDetailData={appDetailData} />
              {!isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
            </Section>
          </GridItem>
        </>
      )}
      <AppUninstallConfirmation
        visible={isVisibleUninstallConfirmation}
        appDetailData={appDetailData}
        closeUninstallConfirmationModal={closeUninstallConfirmationModal}
      />

      <AppInstallConfirmation
        visible={isVisibleInstallConfirmation}
        appDetailData={appDetailData}
        closeInstallConfirmationModal={closeInstallConfirmationModal}
      />
    </Grid>
  )
}

export default AppDetail
