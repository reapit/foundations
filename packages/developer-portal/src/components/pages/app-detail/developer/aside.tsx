import React from 'react'
import routes from '@/constants/routes'
import { useHistory } from 'react-router'
import { History } from 'history'
import { FlexContainerBasic } from '@reapit/elements'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import DeveloperManageApp from './manage-app'
import {
  CategorySection,
  DesktopIntegrationSection,
  PrivateAppSection,
  DirectApiSection,
  StatusSection,
  BackToAppsSection,
} from '../common/ui-sections'

interface AsideProps {
  appDetailState: DeveloperAppDetailState
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
  const { isDirectApi, category, isListed, pendingRevisions, id = '', limitToClientIds = [] } = data as AppDetailModel

  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      <CategorySection category={category} isSidebar />
      <DesktopIntegrationSection desktopIntegrationTypes={desktopIntegrationTypes} isSidebar />
      <PrivateAppSection limitToClientIds={limitToClientIds} isSidebar />
      <DirectApiSection isDirectApi={isDirectApi} isSidebar />
      <StatusSection isListed={isListed} isSidebar />
      <DeveloperManageApp appDetailState={appDetailState} id={id} pendingRevisions={Boolean(pendingRevisions)} />
      {isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
    </FlexContainerBasic>
  )
}
