import React from 'react'
import { DesktopIntegrationTypeModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic } from '@reapit/elements-legacy'
import { ContactDeveloperSection } from './contact-developer-section'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { History } from 'history'
import routes from '@/constants/routes'
// Commenting out for now until we have the API
import { CategorySection, DesktopIntegrationSection, DirectApiSection, BackToAppsSection } from '../common/ui-sections'
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
  const {
    categories,
    developer,
    telephone,
    supportEmail,
    homePage,
    isDirectApi,
    isWebComponent,
    isFree,
    privacyPolicyUrl,
    pricingUrl,
    termsAndConditionsUrl,
  } = appDetailData

  const { isMobile } = useReactResponsive()
  const history = useHistory()
  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      {categories?.map((category) => (
        <CategorySection key={category.id} category={category} isSidebar />
      ))}
      <DesktopIntegrationSection desktopIntegrationTypes={desktopIntegrationTypes} isSidebar />
      <DirectApiSection isDirectApi={isDirectApi} isSidebar />
      {isWebComponent && <WebComponentConfig />}
      <ContactDeveloperSection
        contact={{
          developer,
          telephone,
          supportEmail,
          homePage,
          isFree,
          privacyPolicyUrl,
          pricingUrl,
          termsAndConditionsUrl,
        }}
      />
      {isMobile && <BackToAppsSection onClick={onBackToAppsButtonClick(history)} />}
    </FlexContainerBasic>
  )
}
