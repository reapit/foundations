import * as React from 'react'
import { useHistory } from 'react-router'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { selectInstallationAppData } from '@/selector/installations'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { DeveloperAside } from './developer-aside'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectInstallAppLoading } from '@/selector/installations'
import { Loader, FlexContainerBasic, Grid, GridItem, FlexContainerResponsive } from '@reapit/elements'
import AppHeader from '@/components/pages/app-detail/common/ui-app-header'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import routes from '@/constants/routes'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { BackToAppsSection } from '../common/ui-sections'
import AppContent from './developer-app-content'

export type DeveloperAppDetailProps = {}

export const handleOnDeleteAppSuccess = (history: History) => () => {
  history.replace(routes.DEVELOPER_MY_APPS)
}

export const closeInstallationsModal = (setIsInstallationsModalOpen: (isVisible: boolean) => void) => () => {
  setIsInstallationsModalOpen(false)
}

export const closeAppRevisionComparisonModal = (
  setIsAppRevisionComparisonModalOpen: (isVisible: boolean) => void,
) => () => {
  setIsAppRevisionComparisonModalOpen(false)
}

export const closeDeleteAppModal = (setIsDeleteModalOpen: (isVisible: boolean) => void) => () => {
  setIsDeleteModalOpen(false)
}

export const onBackToAppsButtonClick = (history: History) => () => {
  history.push(routes.DEVELOPER_MY_APPS)
}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  const history = useHistory()
  const { isMobile } = useReactResponsive()

  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const isLoadingInstallations = useSelector(selectInstallAppLoading)
  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const unfetch = !appDetailState?.data || !installationsData?.data
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )

  if (isLoadingAppDetail || isLoadingInstallations || unfetch) {
    return <Loader />
  }

  return (
    <FlexContainerResponsive hasPadding className={styles.flexContainer}>
      <Grid className={styles.container}>
        <GridItem className="is-one-quarter">
          <DeveloperAside desktopIntegrationTypes={userDesktopIntegrationTypes} appDetailState={appDetailState} />
        </GridItem>
        <GridItem className="is-three-quarters">
          <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight>
            <AppHeader appDetailData={appDetailData} />
            <AppContent appDetailState={appDetailState} />
            {!isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
          </FlexContainerBasic>
        </GridItem>
      </Grid>
    </FlexContainerResponsive>
  )
}

export default DeveloperAppDetail
