import {
  BodyText,
  elFadeIn,
  Subtitle,
  FlexContainer,
  useMediaQuery,
  elW6,
  elMr6,
  elMl6,
  elMb7,
  useModal,
  ButtonGroup,
  Button,
} from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { AppWizardState, useAppState } from '../state/use-app-state'
import { HelperContentContainer, stepIsHidden } from './__styles__'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { Link } from 'react-router-dom'
import Routes from '../../../constants/routes'
import { cx } from '@linaria/core'
import { ReactComponent as VideoImage } from '../../../assets/images/desktop/video-placeholder.svg'

export type HelperContentRef = {
  [key in AppNewStepId]: HTMLDivElement | null
}

// TODO - refactor. This is extremely inelegant and fragile however, I can't get my head around a better way to
// show and hide the correct helpers at each current / next step. There it gets reall complex because steps are
// shared by parent steps, there aren't a set number of steps so can't use indexes and there are a number of variables
// that define whether I want to see a helper like auth flow. This at least works and is explicit.= with the logic in
// one place.

export const checkHasHelpers =
  (appWizardState: AppWizardState) =>
  (step: AppNewStepId): boolean => {
    const { nextStep, currentStep, authFlow } = appWizardState
    const isClientSide = authFlow === 'authorisationCode'

    if (isClientSide && nextStep === AppNewStepId.permissionsStep) {
      return step === AppNewStepId.rcRedirectsStep
    }

    if (nextStep) {
      return step === nextStep
    }

    if (
      currentStep === AppNewStepId.permissionsStep ||
      currentStep === AppNewStepId.serverSideStep ||
      currentStep === AppNewStepId.dataFeedStep ||
      currentStep === AppNewStepId.websiteFeedStep
    ) {
      return step === AppNewStepId.permissionsStep
    }

    if (
      currentStep === AppNewStepId.externalAppStep ||
      currentStep === AppNewStepId.webServicesStep ||
      currentStep === AppNewStepId.applicationTypeStep
    ) {
      return step === currentStep
    }

    return false
  }

export const HelperContent: FC = () => {
  const { appWizardState } = useAppState()
  const { isMobile, isTablet, isDesktop } = useMediaQuery()
  const { Modal: ModalServerSide, openModal: openModalServerSide, closeModal: closeModalServerSide } = useModal()
  const { Modal: ModalDesktop, openModal: openModalDesktop, closeModal: closeModalDesktop } = useModal()
  const { Modal: ModalWebsite, openModal: openModalWebsite, closeModal: closeModalWebsite } = useModal()
  const { Modal: ModalApps, openModal: openModalApps, closeModal: closeModalApps } = useModal()
  const shouldShowStep = checkHasHelpers(appWizardState)
  const isFlexColumn = isMobile || isTablet || isDesktop

  return (
    <HelperContentContainer>
      <div className={cx(shouldShowStep(AppNewStepId.applicationTypeStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>About Apps</Subtitle>
        <FlexContainer isFlexAlignStart={!isFlexColumn} isFlexColumn={isFlexColumn}>
          <div
            className={cx(!isFlexColumn && elW6, !isFlexColumn && elMr6, isFlexColumn && elMb7)}
            onClick={openModalApps}
          >
            <BodyText hasGreyText>
              Every developer will have different use cases for our Platform and it is unlikely you will need to use all
              of the APIs and tooling we provide. However, the starting point for all integrations is to create an
              &lsquo;App&rsquo;,
            </BodyText>
            <VideoImage width="100%" height="100%" />
          </div>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMl6)}>
            <BodyText hasGreyText>
              On a basic level an app is the means to authenticate against our services. To create an app, you should
              follow the steps in the wizard on the left of this page.
            </BodyText>
            <BodyText hasGreyText>
              When you have completed this wizard, you will land on a dedicated page for your App, that will give you
              the Client Id, and in the case of server-side apps, a Client Secret, that will enable you to authenticate
              against out APIs. From here you can get started with development against our developer sandbox data.
            </BodyText>
            <BodyText hasGreyText>
              When you are ready to go live with a customer, you will need to complete some additional information and
              submit your app for review by one of our team. On approval of your app, it will be listed in the AppMarket
              for your customers to install, this will then grant access to their production data.
            </BodyText>
          </div>
        </FlexContainer>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.agencyCloudStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>AgencyCloud Functionality</Subtitle>
        <FlexContainer isFlexAlignStart={!isFlexColumn} isFlexColumn={isFlexColumn}>
          <div
            className={cx(!isFlexColumn && elW6, !isFlexColumn && elMr6, isFlexColumn && elMb7)}
            onClick={openModalDesktop}
          >
            <BodyText hasGreyText>
              For the greatest integration with our Reapit CRM, we support the ability to load client-side apps using an
              internal web browser, inside of the CRM.
            </BodyText>
            <VideoImage width="100%" height="100%" />
          </div>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMl6)}>
            <BodyText hasGreyText>
              You can either launch your app from a dedicated menu, for example from a property or a contact, or even
              replace certain screens. Using our Desktop API your app can receive contextual information based on the
              screen or location the app is launched from. Providing relevant data for your users. For more information
              on our Desktop API please <a onClick={openNewPage(ExternalPages.desktopDocs)}>see here.</a>
            </BodyText>
            <BodyText hasGreyText>
              To ensure a consistent UI and UX, it is a requirement that apps that integrate with Reapit CRM use our
              Elements UI library and our Design System. If you want to familiarise yourself with this before moving on,
              you can <a onClick={openNewPage(ExternalPages.elementsDocs)}>view the docs here.</a>
            </BodyText>
            <BodyText hasGreyText>
              Please be aware that we do not support rendering of web applications that use a third-party UI. You cannot
              simply link out from your integrated app or render a pre-existing app in an iframe. For more information
              on the requirements, <a onClick={openNewPage(ExternalPages.acLaunchableDocs)}>please click here.</a>
            </BodyText>
            <BodyText hasGreyText>
              When registering an app that uses the authorisation code authentication flow, it is important to
              understand refresh token behaviour. For more information about refresh tokens,{' '}
              <a onClick={openNewPage(ExternalPages.refreshTokenDocs)}>please click here.</a>
            </BodyText>
          </div>
        </FlexContainer>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.externalAppStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>External Web Applications</Subtitle>
        <BodyText hasGreyText>
          You should select this if you wish to integrate our Platform APIs with a pre-existing or future web
          application that you do not wish to launch from within the Reapit CRM.
        </BodyText>
        <BodyText hasGreyText>
          Your application can be authenticated against our Platform either on the client-side or server-side. If you
          choose client-side authentication at the next step but later wish to upgrade to a full Reapit CRM integration
          in the future, you can do this. However, it is important to note, server-side integrations cannot be launched
          from within Reapit CRM.
        </BodyText>
        <BodyText hasGreyText>
          When registering an app that uses the authorisation code authentication flow, it is important to understand
          refresh token behaviour. For more information about refresh tokens,{' '}
          <a onClick={openNewPage(ExternalPages.refreshTokenDocs)}>please click here.</a>
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.dataFeedStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Data Portal and Reporting Feeds</Subtitle>
        <BodyText hasGreyText>
          This is a server-side only data feed, using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a> You
          should select this if you have no requirement to render your application inside of the Reapit CRM and, you
          have no requirement for user-centric client-side authentication.
        </BodyText>
        <BodyText hasGreyText>
          Typically, you will be pulling data to serve another application, to perform data processing or some other
          analytics function.
        </BodyText>
        <BodyText hasGreyText>
          You should also select this option if you require a permanent connection to our APIs; to pull data on demand
          as opposed to on the fly, when a user logs in to your application.
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.websiteFeedStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Website Feeds</Subtitle>
        <FlexContainer isFlexAlignStart={!isFlexColumn} isFlexColumn={isFlexColumn}>
          <div
            className={cx(!isFlexColumn && elW6, !isFlexColumn && elMr6, isFlexColumn && elMb7)}
            onClick={openModalWebsite}
          >
            <BodyText hasGreyText>
              It is possible to get up and running with a website feed from the Platform API. You will want to optimise
              this flow, implementing webhooks and caching however, the below video is our quick start guide.
            </BodyText>
            <VideoImage width="100%" height="100%" />
          </div>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMl6)}>
            <BodyText hasGreyText>
              When building a public website for a Reapit Customer, you will have no user authentication so your
              integration must be server-side, using our{' '}
              <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a>
            </BodyText>
            <BodyText hasGreyText>
              Your application will be read-only and by selecting this option, we will pre-populate the typical API
              permissions your integration will need for most website development.
            </BodyText>
          </div>
        </FlexContainer>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.webServicesStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Web Services to Platform</Subtitle>
        <BodyText hasGreyText>
          Select this option if you are migrating from the legacy Reapit SOAP API, or web services. These services will
          soon be deprecated so it is important to start your migration to the Foundations Platform as soon as possible.
        </BodyText>
        <BodyText hasGreyText>
          You will get options at the next steps to decide whether client or server-side authentication best serves your
          application needs however, in most cases web services applications are server-side using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a>
        </BodyText>
        <BodyText hasGreyText>
          Please be aware there is not a 1:1 mapping between the SOAP and our Platform REST API. As such, we suggest
          reading the <a onClick={openNewPage(ExternalPages.platformAPIDocs)}>API docs here</a> and looking at the{' '}
          <Link to={Routes.SWAGGER} target="_blank" rel="noopener noreferrer">
            API explorer here{' '}
          </Link>
          to investigate which data sets and permissions you will need before getting started.
        </BodyText>
        <BodyText hasGreyText>
          When registering an app that uses the authorisation code authentication flow, it is important to understand
          refresh token behaviour. For more information about refresh tokens,{' '}
          <a onClick={openNewPage(ExternalPages.refreshTokenDocs)}>please click here.</a>
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.reapitConnectStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Using Reapit Connect as an Identity Provider</Subtitle>
        <BodyText hasGreyText>
          We support using Reapit Connect, our client-side authentication solution, simply as an identity provider for
          your application.
        </BodyText>
        <BodyText hasGreyText>
          In this case, your client-side authenticated users will not have any data permissions however, you can access
          and validate their identity against your own application. For more on{' '}
          <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect visit here</a> and if you are
          interested in using our Sign In With Reapit button to embed on your own site{' '}
          <a onClick={openNewPage(ExternalPages.loginWithReapitDocs)}>visit here</a>
        </BodyText>
        <BodyText hasGreyText>
          When registering an app that uses the authorisation code authentication flow, it is important to understand
          refresh token behaviour. For more information about refresh tokens,{' '}
          <a onClick={openNewPage(ExternalPages.refreshTokenDocs)}>please click here.</a>
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.clientSideStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Client Side Apps</Subtitle>
        <BodyText hasGreyText>
          Client-side Apps use our identity provider{' '}
          <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect</a> to authenticate against our API.
          Your application will need to re-direct to Reapit Connect where we will handle user login and in turn,
          re-direct back to your app with a code in the URL that you exchange for access and id JWTs, referred to as{' '}
          <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow.</a> You will need to
          provide us with URIs to your application at the next step so we know where to return you to on login and on
          completion of this wizard, you will receive a Client ID you will need to get started.
        </BodyText>
        <BodyText hasGreyText>
          To make this process easier, we provide you with an authentication module for client-side apps,{' '}
          <a onClick={openNewPage(ExternalPages.connectSessionDocs)}>Connect Session</a>, which comes bundled with our{' '}
          <a onClick={openNewPage(ExternalPages.craDocs)}>Create React App Template</a> for quick start client-side
          development.
        </BodyText>
        <BodyText hasGreyText>
          When registering an app that uses the authorisation code authentication flow, it is important to understand
          refresh token behaviour. For more information about refresh tokens,{' '}
          <a onClick={openNewPage(ExternalPages.refreshTokenDocs)}>please click here.</a>
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.serverSideStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Server Side Apps</Subtitle>
        <FlexContainer isFlexAlignStart={!isFlexColumn} isFlexColumn={isFlexColumn}>
          <div
            className={cx(!isFlexColumn && elW6, !isFlexColumn && elMr6, isFlexColumn && elMb7)}
            onClick={openModalServerSide}
          >
            <VideoImage width="100%" height="100%" />
          </div>
          <div className={cx(!isFlexColumn && elW6, !isFlexColumn && elMl6)}>
            <BodyText hasGreyText>
              Server-side applications authenticate against our API using the{' '}
              <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a> This
              process involves the exchange of a Client Id and Secret for a JWT access token to authenticate against all
              requests.
            </BodyText>
            <BodyText hasGreyText>
              Unlike client-side applications, you do not have to re-direct to Reapit Connect, nor do your users have to
              log into your application. Because of this, the flow must only be used on the Server Side to ensure the
              Client Secret you will be issued at the end of this wizard is held in a secure location.
            </BodyText>
          </div>
        </FlexContainer>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.rcRedirectsStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Reapit Connect Redirects</Subtitle>
        <BodyText hasGreyText>
          When using the Reapit Connect{' '}
          <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow,</a> you need to register
          both a re-direct URI and a logout URI. The former is the location in your app, you want Reapit Connect to
          re-direct to after a successful user login, the latter, after a succesful logout. Only URIs that are
          registered here will be accepted as a location by Reapit Connect although, you can register multiple locations
          with a comma separated list.
        </BodyText>
        <BodyText hasGreyText>
          We have pre-populated the URIs that you need when using our{' '}
          <a onClick={openNewPage(ExternalPages.craDocs)}>Create React App Template</a> however, any localhost or
          dev.reapit (for local development), or https URI is acceptable. Please note, the URIs must match those in your
          app exactly, inclusive of white space and trailing slashes.
        </BodyText>
      </div>
      <div className={cx(shouldShowStep(AppNewStepId.permissionsStep) ? elFadeIn : stepIsHidden)}>
        <Subtitle hasBoldText>Permissions</Subtitle>
        <BodyText hasGreyText>
          Permissions are registered as scopes against the access token you receive back from one of our Authentication
          Flows. They map 1:1 and on a read/write basis to endpoints in our our Platform REST API. As such, it is worth
          looking at the{' '}
          <Link to={Routes.SWAGGER} target="_blank" rel="noopener noreferrer">
            API explorer here{' '}
          </Link>
          before procceeding, to investigate which permissions you think you will need.
        </BodyText>
        <BodyText hasGreyText>
          For some flows we have pre-populated suggested permissions based on what you have said you wish to acheive
          with our Platform. These can be removed or added as you see fit and all permissions can be edited later if you
          wish to add or remove them before your app goes live.
        </BodyText>
      </div>
      <ModalServerSide title="Server Side Apps">
        <iframe
          className={elMb7}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/s2OEO9RSZ8M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModalServerSide}>
            Close
          </Button>
        </ButtonGroup>
      </ModalServerSide>
      <ModalDesktop title="Desktop API">
        <iframe
          className={elMb7}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/E1df4fThSdw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModalDesktop}>
            Close
          </Button>
        </ButtonGroup>
      </ModalDesktop>
      <ModalWebsite title="Website Feeds">
        <iframe
          className={elMb7}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/EJWB5u1ja_U"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModalWebsite}>
            Close
          </Button>
        </ButtonGroup>
      </ModalWebsite>
      <ModalApps title="About Apps">
        <iframe
          className={elMb7}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/sjXvs72ZWB8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModalApps}>
            Close
          </Button>
        </ButtonGroup>
      </ModalApps>
    </HelperContentContainer>
  )
}
