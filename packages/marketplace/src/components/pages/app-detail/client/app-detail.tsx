// The UI of this page should be the same as the App Detail Preview page in Developer portal
// Make sure to always update the UI in both places if needed
import * as React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import AppUninstallConfirmation from '@/components/pages/app-detail/client/app-uninstall-confirmation'
import { selectDesktopIntegrationTypes } from '@/selector/desktop-integration-types'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/apps'
import { selectIsAdmin } from '@/selector/auth'
import { canGoBack } from '@/utils/router-helper'
import AppContent from './app-content'
import { Loader, GridItem, Grid, Section } from '@reapit/elements'
import * as styles from '../__styles__/standalone-app-detail'
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
import { selectDeveloperEditionId } from '@/selector/auth'
import { NonAdminInstallModal, NonAdminUninstallModal } from './non-admin-modal'

export type ClientAppDetailProps = {}

export const handleCloseInstallConfirmationModal = (
  setIsVisibleInstallConfirmation: (isVisible: boolean) => void,
) => () => {
  setIsVisibleInstallConfirmation(false)
}
export const handleCloseUnInstallConfirmationModal = (
  setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void,
) => () => {
  setIsVisibleUnInstallConfirmation(false)
}

export const handleInstallAppButtonClick = (
  setIsVisibleInstallConfirmation: (isVisible: boolean) => void,
  setNonAdminModalType: React.Dispatch<NonAdminModalType>,
  isAdmin: boolean,
) => () => {
  if (!isAdmin) {
    setNonAdminModalType('INSTALL')
    return
  }
  setIsVisibleInstallConfirmation(true)
}

export const handleUnInstallAppButtonClick = (
  setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void,
  setNonAdminModalType: React.Dispatch<NonAdminModalType>,
  isAdmin: boolean,
) => () => {
  if (!isAdmin) {
    setNonAdminModalType('UNINSTALL')
    return
  }
  setIsVisibleUnInstallConfirmation(true)
}

export const onBackToAppsButtonClick = (history: History) => () => {
  if (canGoBack(history)) {
    history.goBack()
  }
  history.push(Routes.APPS)
}

export const handleCloseNonAdminModal = (setNonAdminModalType: React.Dispatch<NonAdminModalType>) => () => {
  setNonAdminModalType(null)
}
export type NonAdminModalType = 'INSTALL' | 'UNINSTALL' | null

const AppDetail: React.FC = () => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const isDesktopAdmin = selectIsAdmin(connectSession)
  const isDeveloperEdition = Boolean(selectDeveloperEditionId(connectSession))
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const [isVisibleUninstallConfirmation, setIsVisibleUninstallConfirmation] = React.useState(false)
  const [nonAdminModalType, setNonAdminModalType] = React.useState<NonAdminModalType>(null)

  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )
  const closeUninstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleUninstallConfirmation),
    [],
  )

  const onInstallConfirmationModal = React.useCallback(
    handleInstallAppButtonClick(setIsVisibleInstallConfirmation, setNonAdminModalType, isAdmin),
    [isAdmin],
  )
  const onUninstsallConfirmationModal = React.useCallback(
    handleUnInstallAppButtonClick(setIsVisibleUninstallConfirmation, setNonAdminModalType, isAdmin),
    [isAdmin],
  )
  const onCloseNonAdminModal = React.useCallback(handleCloseNonAdminModal(setNonAdminModalType), [])

  const desktopIntegrationTypes = useSelector(selectDesktopIntegrationTypes) as DesktopIntegrationTypeModel[]
  const appDetailData = useSelector(selectAppDetailData)
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )
  const { isMobile } = useReactResponsive()

  const isLoadingAppDetail = useSelector(selectAppDetailLoading)

  // selector selectAppDetailData return {} if not data

  const unfetched = Object.keys(appDetailData).length === 0
  const { installedOn = '', name = '' } = appDetailData

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
      <NonAdminInstallModal title={name} visible={nonAdminModalType === 'INSTALL'} onClose={onCloseNonAdminModal} />
      <NonAdminUninstallModal title={name} visible={nonAdminModalType === 'UNINSTALL'} onClose={onCloseNonAdminModal} />
    </Grid>
  )
}

export default AppDetail
