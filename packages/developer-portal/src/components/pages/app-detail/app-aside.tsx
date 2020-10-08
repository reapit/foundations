import React from 'react'
import routes from '@/constants/routes'
import { useHistory } from 'react-router'
import { History } from 'history'
import { FlexContainerBasic } from '@reapit/elements'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import AppManageMent from './app-management'
import {
  CategorySection,
  DesktopIntegrationSection,
  PrivateAppSection,
  DirectApiSection,
  BackToAppsSection,
} from './app-sections'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { StatusSection } from './app-status-section'

interface AsideProps {
  appDetailState: AppDetailState
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const onBackToAppsButtonClick = (history: History) => {
  return () => {
    history.push(routes.APPS)
  }
}

export const DeveloperAside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailState }) => {
  const history = useHistory()
  const { isMobile } = useReactResponsive()
  const { data } = appDetailState
  const { isDirectApi, category, pendingRevisions, id = '', limitToClientIds = [] } = data || {}

  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      <CategorySection category={category} isSidebar />
      <DesktopIntegrationSection desktopIntegrationTypes={desktopIntegrationTypes} isSidebar />
      <PrivateAppSection limitToClientIds={limitToClientIds} isSidebar />
      <DirectApiSection isDirectApi={isDirectApi} isSidebar />
      <StatusSection appDetail={data as AppDetailModel} isSidebar />
      <AppManageMent appDetailState={appDetailState} id={id} pendingRevisions={Boolean(pendingRevisions)} />
      {isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
    </FlexContainerBasic>
  )
}
