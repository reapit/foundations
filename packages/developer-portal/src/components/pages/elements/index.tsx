import {
  BodyText,
  Button,
  elHFull,
  elMb3,
  elMb8,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import { openNewPage, ExternalPages, navigate } from '../../../utils/navigation'
import { iframeWrapper } from './__styles__/index'

export const ElementsPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Docs</Title>
        <SecondaryNav className={elMb8}>
          <SecondaryNavItem onClick={navigate(history, Routes.API_DOCS)} active={pathname === Routes.API_DOCS}>
            API Docs
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.ELEMENTS)} active={pathname === Routes.ELEMENTS}>
            Elements
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon icon="elementsInfographic" iconSize="large" />
        <Subtitle>Reapit Elements</Subtitle>
        <BodyText hasGreyText>
          Elements is a UI toolkit built in React JS, exporting a library of CSS classes to help you build clean,
          interactive user interfaces for the Reapit Foundations ecosystem. It is based on the Reapit Foundations Design
          System, our in house styleguide.
        </BodyText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.elementsDocs)}>
          View Docs
        </Button>
        <Button className={elMb3} intent="critical" onClick={openNewPage(window.reapit.config.elementsUri)}>
          Open New
        </Button>
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
