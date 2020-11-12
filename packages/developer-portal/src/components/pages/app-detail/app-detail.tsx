import * as React from 'react'
import { useHistory } from 'react-router'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { selectInstallationsListData } from '@/selector/installations'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { DeveloperAside } from './app-aside'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectInstallationsListLoading } from '@/selector/installations'
import { Loader, Grid, GridItem, Section } from '@reapit/elements'
import AppHeader from '@/components/pages/app-detail/app-header'
import routes from '@/constants/routes'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { BackToAppsSection } from './app-sections'
import AppContent from './app-content'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/app-detail'
import { container } from './__styles__/app-detail'
import FadeIn from '../../../styles/fade-in'

export type AppDetailProps = {}

export const handleOnDeleteAppSuccess = (history: History) => () => {
  history.replace(routes.APPS)
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
  history.push(routes.APPS)
}

const AppDetail: React.FC<AppDetailProps> = () => {
  const history = useHistory()
  const { isMobile } = useReactResponsive()

  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const isLoadingInstallations = useSelector(selectInstallationsListLoading)
  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const installationsData = useSelector(selectInstallationsListData)
  const unfetch = !appDetailState?.data || !installationsData
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )

  if (isLoadingAppDetail || isLoadingInstallations || unfetch) {
    return <Loader />
  }

  return (
    <Grid className={container}>
      <GridItem className="is-one-quarter">
        <FadeIn>
          <DeveloperAside desktopIntegrationTypes={userDesktopIntegrationTypes} appDetailState={appDetailState} />
        </FadeIn>
      </GridItem>
      <GridItem className="is-three-quarters">
        <Section isFlex isFlexColumn hasBackground isFullHeight>
          <FadeIn>
            <AppHeader appDetailData={appDetailData} />
          </FadeIn>
          <FadeIn>
            <AppContent appDetailState={appDetailState} />
          </FadeIn>
          {!isMobile && (
            <FadeIn>
              <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />
            </FadeIn>
          )}
        </Section>
      </GridItem>
    </Grid>
  )
}

export default AppDetail
