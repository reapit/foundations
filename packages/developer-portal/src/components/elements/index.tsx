import {
  SmallText,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  BodyText,
  Title,
} from '@reapit/elements'
import React, { FC } from 'react'
import { openNewPage, ExternalPages } from '../../utils/navigation'
import { iframeWrapper } from './__styles__/index'

export const ElementsPage: FC = () => {
  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Icon className={elMb5} icon="elementsInfographic" iconSize="large" />
        <BodyText>Reapit Elements</BodyText>
        <SmallText tag="div" hasGreyText>
          Elements is a UI toolkit built in React JS, exporting a library of CSS classes to help you build clean,
          interactive user interfaces for the Reapit Foundations ecosystem. It is based on the Reapit Foundations Design
          System, our in house styleguide.
        </SmallText>
        <Button className={elMb5} intent="default" onClick={openNewPage(ExternalPages.elementsDocs)}>
          View Docs
        </Button>
        <Button className={elMb5} intent="primary" onClick={openNewPage(process.env.elementsUri)}>
          Storybook
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Elements</Title>
        <iframe
          className={iframeWrapper}
          src={process.env.elementsUri}
          frameBorder="0"
          allow="clipboard-write"
        ></iframe>
      </PageContainer>
    </FlexContainer>
  )
}

export default ElementsPage
