import React from 'react'
import { AboutDeveloperSection, ContactDeveloperSection, DeveloperImageSection } from './reuse'
import standAloneAppDetailStyles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { renderCategory, renderDesktopIntegrationTypes } from '../client-app-detail/app-content'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { GridItem, Button, H6 } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentOpen } from '@/selector/client'
import { clientCloseWebComponentConfig, clientOpenWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/ui/web-component-config-modal'

interface AsideProps {
  appDetailData: AppDetailDataNotNull
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const Aside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailData }) => {
  const { category, isWebComponent } = appDetailData

  return (
    <div className={standAloneAppDetailStyles.asideContainer}>
      <div>
        <DeveloperImageSection />
        <AboutDeveloperSection />
        <ContactDeveloperSection />
        <div className={standAloneAppDetailStyles.headerWithoutMargin}>{renderCategory(category)}</div>
        <div className={standAloneAppDetailStyles.headerWithoutMargin}>
          {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
        </div>
      </div>
      {isWebComponent && <WebComponentConfig />}
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
    <>
      <GridItem>
        <H6>Settings</H6>
        <Button type="button" variant="primary" fullWidth onClick={handleToggleWebComponentModal}>
          Configuration
        </Button>
      </GridItem>
      {isWebComponentOpen && (
        <WebComponentModal
          type="BOOK_VIEWING"
          afterClose={handleCloseWebComponentModal}
          closeModal={handleCloseWebComponentModal}
        />
      )}
    </>
  )
}
