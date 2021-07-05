import {
  elHFull,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import { navigate } from '../../ui/menu'
import { iframeWrapper } from './__styles__/index'

export const ElementsPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <SecondaryNav>
          <SecondaryNavItem onClick={navigate(history, Routes.API_DOCS)} active={pathname === Routes.API_DOCS}>
            API Docs
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.ELEMENTS)} active={pathname === Routes.ELEMENTS}>
            Elements
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Elements</Title>
        <iframe
          className={iframeWrapper}
          src={window.reapit.config.elementsUri}
          frameBorder="0"
          allow="clipboard-write"
        ></iframe>
      </PageContainer>
    </FlexContainer>
  )
}

export default ElementsPage
