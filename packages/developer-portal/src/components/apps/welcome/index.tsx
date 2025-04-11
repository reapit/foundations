import {
  BodyText,
  Button,
  ButtonGroup,
  ColResponsive,
  elMb11,
  elMb7,
  elMl6,
  elMr5,
  elMr6,
  elW6,
  FlexContainer,
  GridResponsive,
  Icon,
  Subtitle,
  Title,
  useMediaQuery,
} from '@reapit/elements'
import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import Routes from '../../../constants/routes'
import { ExternalPages, navigateRoute, openNewPage } from '../../../utils/navigation'
import { StepContainer } from '../new/__styles__'
import { HelperGraphic } from './helper-graphic'
import { cx } from '@linaria/core'

/**Temporary index while we don't have a video. Replace this file with index-final when we have welcome video */

export const AppsWelcomePage: FC = () => {
  const navigate = useNavigate()
  const { isMobile, isTablet, isDesktop } = useMediaQuery()
  const isFlexColumn = isMobile || isTablet || isDesktop
  return (
    <GridResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={4}
        spanSuperWideScreen={5}
        span4KScreen={7}
      >
        <Title>Apps</Title>
        <StepContainer>
          <FlexContainer isFlexColumn isFlexJustifyAround>
            <div className={elMb7}>
              <div className={elMb11}>
                <Subtitle hasBoldText hasNoMargin>
                  View Docs
                </Subtitle>
              </div>
              <FlexContainer isFlexColumn className={elMb11}>
                <FlexContainer>
                  <Icon className={elMr5} icon="myAppsInfographic" iconSize="large" />
                  <BodyText hasGreyText>
                    We have invested a considerable amount of time to ensure our documentation is as comprehensive as
                    possible, from detailed references, to our APIs to a glossary of terms and frequently asked
                    questions.
                  </BodyText>
                </FlexContainer>
                <BodyText hasGreyText>
                  Having first watched the video, you may want to have a deep dive into the documentation before
                  creating your first app.
                </BodyText>
                <div className={elMb7}>
                  <BodyText hasGreyText hasNoMargin>
                    If you get stuck at any point when working with Foundations, make the docs your first port of call.
                  </BodyText>
                </div>
                <ButtonGroup alignment="left">
                  <Button onClick={openNewPage(ExternalPages.baseDocs)} intent="default">
                    View Docs
                  </Button>
                </ButtonGroup>
              </FlexContainer>
            </div>
            <div>
              <div className={elMb11}>
                <Subtitle hasBoldText hasNoMargin>
                  Create APP
                </Subtitle>
              </div>
              <FlexContainer isFlexColumn className={elMb11}>
                <FlexContainer>
                  <Icon className={elMr5} icon="welcomeInfographic" iconSize="large" />
                  <BodyText hasGreyText>
                    Creating an app is the starting point for authenticating against the Foundations APIs. Your app
                    might be a web application, possibly rendered inside of the Reapit CRM, or a simple data feed to
                    serve a website.
                  </BodyText>
                </FlexContainer>
                <div className={elMb7}>
                  <BodyText hasGreyText hasNoMargin>
                    In all cases, you will need to use the app creation wizard that will walk you through creating your
                    app, explain key concepts along the way and link out to our documentation where relevant.
                  </BodyText>
                </div>
                <ButtonGroup alignment="left">
                  <Button intent="primary" size={2} onClick={navigateRoute(navigate, Routes.APPS_NEW)}>
                    Create App
                  </Button>
                </ButtonGroup>
              </FlexContainer>
            </div>
          </FlexContainer>
        </StepContainer>
      </ColResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={8}
        spanSuperWideScreen={11}
        span4KScreen={13}
      >
        <Title>About Foundations</Title>
        <FlexContainer isFlexAlignStart={!isFlexColumn} isFlexColumn={isFlexColumn}>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMr6, isFlexColumn && elMb7)}>
            <BodyText hasGreyText>
              Reapit Foundations is a Platform as a Service that enables developers to access, update and enhance data
              within the Reapit CRM.
            </BodyText>
            <HelperGraphic />
          </div>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMl6)}>
            <BodyText hasGreyText>
              There are a number of aspects to The Platform documented within this Developer Portal, specifically, APIs,
              Webhooks, a UI Library and Data Analytics solutions. We also have an AppMarket to facilitate the
              publishing and installation of the software you build on top of the Platform.
            </BodyText>
            <BodyText hasGreyText>
              Every developer will have different use cases for using our Platform and it is unlikely you will need to
              use all of the APIs and tooling we provide. However, the starting point for all integrations is to create
              an &lsquo;App&rsquo;, which on a basic level is the means to authenticate against our services.
            </BodyText>
            <BodyText hasGreyText>
              To get started, create your first app using the wizard on the left of this page. This will allow you to
              authenticate against our APIs.
            </BodyText>
          </div>
        </FlexContainer>
      </ColResponsive>
    </GridResponsive>
  )
}

export default AppsWelcomePage
