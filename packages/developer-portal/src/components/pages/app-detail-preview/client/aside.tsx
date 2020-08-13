import React from 'react'
import { DesktopIntegrationTypeModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic } from '@reapit/elements'
import { ContactDeveloperSection } from './contact-developer-modal'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { History } from 'history'
import routes from '@/constants/routes'
import {
  DeveloperSection,
  CategorySection,
  DesktopIntegrationSection,
  DirectApiSection,
  BackToAppsSection,
} from '../common/ui-sections'

import { useHistory } from 'react-router'
import { DeveloperAboutSection } from '../../app-detail/app-sections'

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
  const { category, developer, telephone, supportEmail, homePage, isDirectApi, developerAbout } = appDetailData
  console.log({ developerAbout })

  const { isMobile } = useReactResponsive()
  const history = useHistory()

  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      {developer && <DeveloperSection developer={developer} isSidebar />}
      {}
      {developerAbout && <DeveloperAboutSection isSidebar>{developerAbout}</DeveloperAboutSection>}
      <CategorySection category={category} isSidebar />
      <DesktopIntegrationSection desktopIntegrationTypes={desktopIntegrationTypes} isSidebar />
      <DirectApiSection isDirectApi={isDirectApi} isSidebar />
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
