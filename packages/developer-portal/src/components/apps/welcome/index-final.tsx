import {
  BodyText,
  Button,
  ButtonGroup,
  ColResponsive,
  elMb11,
  elMb7,
  elMr5,
  FlexContainer,
  GridResponsive,
  Icon,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router'
import Routes from '../../../constants/routes'
import { ExternalPages, navigateRoute, openNewPage } from '../../../utils/navigation'
import { StepContainer } from '../new/__styles__'
import { ReactComponent as VideoImage } from '../../../assets/images/desktop/video-placeholder.svg'

export const HAS_WATCHED_WELCOME_VIDEO = 'HAS_WATCHED_WELCOME_VIDEO'

export const handleHasWatchedVideo =
  (setHasWatchedVideo: Dispatch<SetStateAction<boolean>>, closeModal: () => void) => () => {
    setHasWatchedVideo(true)
    window.localStorage.setItem(HAS_WATCHED_WELCOME_VIDEO, HAS_WATCHED_WELCOME_VIDEO)
    closeModal()
  }

export const checkHasWatchedVideo = (): boolean => {
  const retrieved = window.localStorage.getItem(HAS_WATCHED_WELCOME_VIDEO)

  return Boolean(retrieved)
}

/**This is the correct prod page but we're still waiting on the video. When it's ready, just replace the current index
 * with this file and add the video to the Modal below
 */

export const AppsWelcomePage: FC = () => {
  const navigate = useNavigate()
  const { Modal, openModal, closeModal } = useModal()
  const [hasWatchedVideo, setHasWatchedVideo] = useState<boolean>(checkHasWatchedVideo())
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
                  <Button
                    disabled={!hasWatchedVideo}
                    intent="primary"
                    onClick={navigateRoute(navigate, Routes.APPS_NEW)}
                  >
                    {hasWatchedVideo ? 'Create App' : 'Watch Video To Start'}
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
        <BodyText hasGreyText>
          Reapit Foundations is a Software as a Service Platform that enables developers to access, update and enhance
          data within the Reapit CRM.
        </BodyText>
        <BodyText hasGreyText>
          There are a number of aspects to Foundations documented within this Developer Portal, specifically, APIs,
          Webhooks, a UI Library and Data Analytics solutions. We also have an AppMarketplace to facilitate the
          publishing and installation of the software you build on top of the Platform.
        </BodyText>
        <BodyText hasGreyText>
          Every developer will have different use cases for Foundations and it is unlikely you will need to use all of
          the APIs and tooling we provide. However, the starting point for all integrations is to create an
          &lsquo;App&rsquo;, which on a basic level is the means to authenticate aginst our services.
        </BodyText>
        <BodyText hasGreyText>
          Before getting started, please watch this short video with some Foundations Basics.
        </BodyText>
        <BodyText onClick={openModal}>
          <VideoImage width="100%" />
        </BodyText>
        <BodyText hasGreyText>
          When you have watched the video, please confirm this and your next step will be to create your first app using
          the wizard on the left hand side of this page. This will allow you to authenticated against our APIs.
        </BodyText>
      </ColResponsive>
      <Modal title="Welcome to Reapit Foundations">
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
          <Button intent="primary" onClick={handleHasWatchedVideo(setHasWatchedVideo, closeModal)}>
            Confirm Watched
          </Button>
        </ButtonGroup>
      </Modal>
    </GridResponsive>
  )
}

export default AppsWelcomePage
