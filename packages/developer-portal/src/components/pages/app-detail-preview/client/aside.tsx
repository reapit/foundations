import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { DesktopIntegrationTypeModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic } from '@reapit/elements'
import { ContactDeveloperSection } from './contact-developer-section'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { History } from 'history'
import routes from '@/constants/routes'
import { CategorySection, DesktopIntegrationSection, DirectApiSection, BackToAppsSection } from '../common/ui-sections'
import { selectAppDetailState } from '@/selector/app-detail'
import { tagChanged } from '../__styles__/app-detail'

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
  const { category, developer, telephone, supportEmail, homePage, isDirectApi } = appDetailData

  const { isMobile } = useReactResponsive()
  const history = useHistory()

  const appDetailState = useSelector(selectAppDetailState)
  const { data } = appDetailState
  const { category: currentCategory } = data || {}

  return (
    <FlexContainerBasic flexColumn hasPadding hasBackground isFullHeight={!isMobile}>
      <CategorySection
        category={category}
        isSidebar
        className={!!currentCategory && currentCategory?.id !== category?.id ? tagChanged : ''}
      />
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
