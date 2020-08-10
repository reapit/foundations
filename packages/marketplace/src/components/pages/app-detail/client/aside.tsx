import React from 'react'
import { DesktopIntegrationTypeModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic } from '@reapit/elements'
import { ContactDeveloperSection } from './contact-developer-modal'
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
  DeveloperAboutSection,
} from '../common/ui-sections'
import { useHistory } from 'react-router'
import WebComponentConfig from './web-component-config-modal'

interface AsideProps {
  appDetailData: AppDetailModel
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const onBackToAppsButtonClick = (history: History) => {
  return () => {
    history.push(routes.APPS)
  }
}

export const Aside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailData }) => {
  /*
   * TODOME(renderDeveloperAbout)
   * get developer abouts
   */

  console.log({ appDetailData })

  const { category, developer, telephone, supportEmail, homePage, isDirectApi, isWebComponent } = appDetailData
  const { isMobile } = useReactResponsive()
  const history = useHistory()
  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      {developer && <DeveloperSection developer={developer} isSidebar />}
      {/*
       * TODOME(renderDeveloperAbout)
       *render inside children
       */}
      <DeveloperAboutSection isSidebar />
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
