import * as React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router'
import ClientAppUninstallConfirmation from '@/components/pages/app-detail/client/client-app-uninstall-confirmation'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading, selectAppDetailError } from '@/selector/client-app-detail'
import { selectLoginType, selectIsAdmin } from '@/selector/auth'
import { canGoBack } from '@/utils/router-helper'
import AppContent from './client-app-content'
import { Loader, Alert, GridItem, FlexContainerResponsive, Grid, FlexContainerBasic } from '@reapit/elements'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import ClientAppInstallConfirmation from '@/components/pages/app-detail/client/client-app-install-confirmation'
import { ClientAside } from './client-aside'
import { clientFetchAppDetail, clientFetchAppDetailFailed } from '@/actions/client'
import { developerApplyAppDetails } from '@/actions/developer'
import { useParams } from 'react-router'
import { Dispatch } from 'redux'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import Routes from '@/constants/routes'
import { LoginType } from '@reapit/cognito-auth'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import AppHeader from '../common/ui-app-header'
import { BackToAppsSection } from '../common/ui-sections'
import { ClientAppDetailButtonGroup } from './client-app-detail-button-group'

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
  history.push(Routes.CLIENT)
}

export const handleApplyAppDetailsFromLocalStorage = (
  dispatch: Dispatch,
  loginType: LoginType,
  appId?: string,
) => () => {
  if (loginType !== 'DEVELOPER' || !appId) return

  if (appId === 'submit-app') {
    try {
      const appDataString = localStorage.getItem('developer-preview-app')
      if (!appDataString) throw 'No preview data'
      const appData = JSON.parse(appDataString)
      if (appData.id) throw 'No preview data'
      dispatch(developerApplyAppDetails(appData))
    } catch (err) {
      dispatch(clientFetchAppDetailFailed(err))
    }
    return
  }

  try {
    const appDataString = localStorage.getItem('developer-preview-app')
    if (!appDataString) throw 'No preview data'
    const appData = JSON.parse(appDataString)
    if (appData.id !== appId) throw 'Preview data not match appId'

    dispatch(developerApplyAppDetails(appData))
  } catch (err) {
    dispatch(clientFetchAppDetail({ id: appId }))
  }
}

export const renderAppHeaderButtonGroup = (
  id: string,
  installedOn: string,
  onInstallConfirmationModal: () => void,
  onUninstallConfirmationModal: () => void,
  isInstallBtnHidden: boolean,
  loginType: LoginType,
) => {
  return id && loginType !== 'DEVELOPER' ? (
    <ClientAppDetailButtonGroup
      installedOn={installedOn}
      onInstallConfirmationModal={onInstallConfirmationModal}
      onUninstallConfirmationModal={onUninstallConfirmationModal}
      isInstallBtnHidden={isInstallBtnHidden}
    />
  ) : null
}

const ClientAppDetail: React.FC<ClientAppDetailProps> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { appId } = useParams()

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
  const loginType = useSelector(selectLoginType)
  const isAdmin = useSelector(selectIsAdmin)
  const error = useSelector(selectAppDetailError)

  const isInstallBtnHidden = loginType === 'CLIENT' && !isAdmin
  // selector selectAppDetailData return {} if not data
  const unfetched = Object.keys(appDetailData).length === 0
  const { id = '', installedOn = '' } = appDetailData

  React.useEffect(handleApplyAppDetailsFromLocalStorage(dispatch, loginType, appId), [dispatch])
  if (error) return <Alert message={error} type="danger"></Alert>

  return (
    <FlexContainerResponsive hasPadding dataTest="client-app-detail-container" className={styles.flexContainer}>
      <Grid className={styles.container}>
        {isLoadingAppDetail || unfetched ? (
          <Loader dataTest="client-app-detail-loader" />
        ) : (
          <>
            <GridItem className="is-one-quarter">
              <ClientAside appDetailData={appDetailData} desktopIntegrationTypes={userDesktopIntegrationTypes} />
            </GridItem>
            <GridItem className="is-three-quarters">
              <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight>
                <AppHeader
                  appDetailData={appDetailData}
                  buttonGroup={renderAppHeaderButtonGroup(
                    id,
                    installedOn,
                    onInstallConfirmationModal,
                    onUninstsallConfirmationModal,
                    isInstallBtnHidden,
                    loginType,
                  )}
                />
                <AppContent appDetailData={appDetailData} />
                {!isMobile && loginType !== 'DEVELOPER' && (
                  <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />
                )}
              </FlexContainerBasic>
            </GridItem>
          </>
        )}
        <ClientAppUninstallConfirmation
          visible={isVisibleUninstallConfirmation}
          appDetailData={appDetailData}
          closeUninstallConfirmationModal={closeUninstallConfirmationModal}
        />

        <ClientAppInstallConfirmation
          visible={isVisibleInstallConfirmation}
          appDetailData={appDetailData}
          closeInstallConfirmationModal={closeInstallConfirmationModal}
        />
      </Grid>
    </FlexContainerResponsive>
  )
}

export default ClientAppDetail
