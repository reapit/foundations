import React from 'react'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { FlexContainerBasic } from '@reapit/elements'
import { ContactDeveloperSection } from './client-contact-developer-modal'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { History } from 'history'
import routes from '@/constants/routes'
// Commenting out for now until we have the API
import {
  DeveloperSection /*, DeveloperAboutSection */,
  CategorySection,
  DesktopIntegrationSection,
  DirectApiSection,
  BackToAppsSection,
} from '../common/ui-sections'
import { useHistory } from 'react-router'
import { WebComponentConfig } from './client-web-component-config'

interface AsideProps {
  appDetailData: AppDetailDataNotNull
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const onBackToAppsButtonClick = (history: History) => {
  return () => {
    history.push(routes.DEVELOPER_MY_APPS)
  }
}

export const ClientAside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailData }) => {
  const { category, developer, telephone, supportEmail, homePage, isDirectApi, isWebComponent } = appDetailData
  const { isMobile } = useReactResponsive()
  const history = useHistory()

  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      {developer && <DeveloperSection developer={developer} isSidebar />}
      {/** Placeholder for now until we have the API
        <DeveloperAboutSection isSidebar />
       */}

      <CategorySection category={category} isSidebar />
      <DesktopIntegrationSection desktopIntegrationTypes={desktopIntegrationTypes} isSidebar />
      <DirectApiSection isDirectApi={isDirectApi} isSidebar />
      {isWebComponent && <WebComponentConfig />}
      <ContactDeveloperSection
        contact={{
          developer,
          telephone,
          supportEmail,
          homePage,
        }}
      />
      {isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
    </FlexContainerBasic>
  )
}
