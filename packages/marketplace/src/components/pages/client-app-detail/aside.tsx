import React from 'react'
import { AboutDeveloperSection, ContactDeveloperSection, DeveloperImageSection } from './reuse'
import developerAppDetailStyles from '@/styles/pages/developer-app-detail.scss?mod'
import { renderCategory, renderDesktopIntegrationTypes } from '../client-app-detail/app-content'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'

interface AsideProps {
  appDetailData: AppDetailDataNotNull
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const Aside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailData }) => {
  const { category } = appDetailData

  return (
    <div className={developerAppDetailStyles.asideContainer}>
      <DeveloperImageSection />
      <AboutDeveloperSection />
      <ContactDeveloperSection />
      <div className={developerAppDetailStyles.headerWithoutMargin}>{renderCategory(category)}</div>
      <div className={developerAppDetailStyles.headerWithoutMargin}>
        {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
      </div>
    </div>
  )
}
