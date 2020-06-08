import React from 'react'
import { AboutDeveloperSection, DeveloperImageSection } from './reuse'
import { ContactDeveloperSection } from './contact-developer-section'
import standAloneAppDetailStyles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { renderCategory, renderDesktopIntegrationTypes, renderDirectAPI } from '../client-app-detail/app-content'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { Button, H5 } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentOpen } from '@/selector/client'
import { clientCloseWebComponentConfig, clientOpenWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/ui/web-component-config-modal'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'

interface AsideProps {
  appDetailData: AppDetailDataNotNull
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const Aside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailData }) => {
  const { category, developer, telephone, supportEmail, homePage, isDirectApi } = appDetailData

  return (
    <div className={standAloneAppDetailStyles.asideContainer}>
      <div>
        <DeveloperImageSection />
        <AboutDeveloperSection />
        <ContactDeveloperSection
          contact={{
            developer,
            telephone,
            supportEmail,
            homePage,
          }}
        />
        <div className={standAloneAppDetailStyles.headerWithoutMargin}>{renderCategory(category)}</div>
        <div className={standAloneAppDetailStyles.headerWithoutMargin}>
          {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
        </div>
        <div className={standAloneAppDetailStyles.headerWithoutMargin}>{renderDirectAPI(isDirectApi)}</div>
        {/* {isWebComponent && (
          <div className={standAloneAppDetailStyles.headerWithoutMargin}>
            <WebComponentConfig />
          </div>
        )} */}
      </div>
    </div>
  )
}

export const toggleWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientOpenWebComponentConfig())
}

export const closeWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientCloseWebComponentConfig())
}

export const WebComponentConfig = () => {
  const dispatch = useDispatch()
  const isWebComponentOpen = useSelector(selectIsWebComponentOpen)
  const handleToggleWebComponentModal = toggleWebComponentModal(dispatch)
  const handleCloseWebComponentModal = closeWebComponentModal(dispatch)
  return (
    <div className={clientAppDetailStyles.gutter}>
      <H5>Settings</H5>
      <Button type="button" variant="primary" fullWidth onClick={handleToggleWebComponentModal}>
        Configuration
      </Button>
      {isWebComponentOpen && (
        <WebComponentModal
          type="BOOK_VIEWING"
          afterClose={handleCloseWebComponentModal}
          closeModal={handleCloseWebComponentModal}
        />
      )}
    </div>
  )
}
