import { BodyText, Subtitle } from '@reapit/elements'
import React, { FC, useEffect, useRef } from 'react'
import { AppNewStepId } from './config'
import { useAppState } from '../state/use-app-state'
import { HelperContentContainer } from './__styles__'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'
import { Link } from 'react-router-dom'
import Routes from '../../../../constants/routes'

export type HelperContentRef = {
  [key in AppNewStepId]: HTMLDivElement | null
}

export const stepIsNotNextStep = (nextStep: AppNewStepId | null, step: AppNewStepId) => {
  return Boolean(nextStep && nextStep !== step)
}

export const HelperContent: FC = () => {
  const { appWizardState } = useAppState()
  const helperContentRef = useRef<HelperContentRef>({
    [AppNewStepId.applicationTypeStep]: null,
    [AppNewStepId.agencyCloudStep]: null,
    [AppNewStepId.webServicesStep]: null,
    [AppNewStepId.reapitConnectStep]: null,
    [AppNewStepId.otherAppStep]: null,
    [AppNewStepId.dataFeedStep]: null,
    [AppNewStepId.serverSideStep]: null,
    [AppNewStepId.clientSideStep]: null,
    [AppNewStepId.websiteFeedStep]: null,
    [AppNewStepId.permissionsStep]: null,
    [AppNewStepId.externalAppStep]: null,
    [AppNewStepId.rcRedirectsStep]: null,
  })
  const { nextStep, currentStep, authFlow, lastStep } = appWizardState

  useEffect(() => {
    if (nextStep && nextStep !== AppNewStepId.permissionsStep) {
      helperContentRef.current[nextStep]?.scrollIntoView({ behavior: 'smooth' })
    }

    if (authFlow === 'authorisationCode' && nextStep === AppNewStepId.permissionsStep && !lastStep) {
      helperContentRef.current[AppNewStepId.rcRedirectsStep]?.scrollIntoView({ behavior: 'smooth' })
    }

    if (lastStep) {
      helperContentRef.current[AppNewStepId.permissionsStep]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [helperContentRef, nextStep, currentStep, authFlow, lastStep])

  return (
    <HelperContentContainer>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.agencyCloudStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          AgencyCloud Functionality
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          For the greatest integration with our AgencyCloud desktop CRM, we support rendering client-side authenticated
          web applications using a Chromium Web View inside the CRM itself. Server side apps cannot be launched from
          within AgencyCloud.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          You can either launch your application from the dedicated Apps menu in the AgencyCloud software, or you can
          launch your app from a series of menus embedded within other pages. Your app can receive contextual entity ids
          as global variables so it can launch with relevant data for your users. For more on our desktop API{' '}
          <a onClick={openNewPage(ExternalPages.desktopDocs)}>see here.</a>
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          To ensure a consistent UI and UX, it is a requirement for AgencyCloud integrated apps to use our Elements UI
          library and Foundations Design System. If you want to familiarise yourself with this before moving on, you can{' '}
          <a onClick={openNewPage(ExternalPages.elementsDocs)}>view the docs here.</a>
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          We do not support rendering of web applications that use a third party UI. You cannot simply link out from
          your integrated app, or render your pre-existing app in an iframe. Your app must be inegrated at an API level.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.externalAppStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          External Web Applications
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          You should select this if you wish to integrate Foundations APIs with a pre-existing or future web application
          that you do not wish to launch from within the AgencyCloud desktop CRM.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          Your application could be authenticated against Foundations either on the client-side or server-side. If you
          choose client-side authentication at the next step however, should you wish to upgrade to a full AgencyCloud
          integration in the future, you can do this. Server side apps cannot be launched from within AgencyCloud.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.dataFeedStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          Data Portal and Reporting Feeds
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          This is a server-side only data feed, using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a> You
          should select this if you have no requirement to render your application inside of the AgencyCloud desktop CRM
          and, you have no requirement for user-centric client side authentication.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          Typically you will be pulling data to serve another application, to perform data processing or some other
          analytics function.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          You should also select this option if you require a permenent connection to our APIs; to pull data on demand
          as opposed to on the fly, when a user logs in to your application.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.websiteFeedStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>Website Feeds</Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>
          When building a public website for a Reapit Customer, you will have no user authentication so your integration
          must be server-side, using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a>
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>
          Your application will be read-only and by selecting this option, we will pre-populate the typical API
          permissions your integration will need for most website development.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.webServicesStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Web Services Migrations
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Select this option if you are migraiting from the legacy Reapit SOAP API, or web services. These services will
          soon be deprecated so it is important to start your migration to the Foundations Platform as soon as possible.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          You will get options at the next steps to decide whether client or server-side authentication best serves your
          application needs however, in most cases web services applications are server-side using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a>
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Please be aware there is not a 1:1 mapping between the SOAP and Foundations REST API. As such, we suggest
          reading the <a onClick={openNewPage(ExternalPages.platformAPIDocs)}>API docs here</a> and looking at the{' '}
          <Link to={Routes.SWAGGER} target="_blank" rel="noopener noreferrer">
            API explorer here{' '}
          </Link>
          to investigate which data sets and permissions you will need before getting started.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.reapitConnectStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          Using Reapit Connect as an Itentity Provider
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          We support using Reapit Connect, our client-side authentication solution, simply as an identity provider for
          your application.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          In this case, your client side authenticated users will not have any data permissions however, you can access
          and validate their identity against your own application. For more on{' '}
          <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect visit here</a> and if you are
          interested in using our Sign In With Reapit button to embed on your own site{' '}
          <a onClick={openNewPage(ExternalPages.loginWithReapitDocs)}>visit here</a>
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.otherAppStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>Other App Types</Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>
          If your use case does not fit into one of the other categories, you should consider a couple of points before
          proceeding.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>
          Firstly, do you need to know about a logged in user for your integration and / or do you intend to fetch your
          data on the fly from our API when a user logs in. In this case, it is likely you need a client-side
          application using <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect.</a>
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>
          If you need a permenant feed, fetching your data on demand and / or you have no requirement for user
          information or a user-centric login flow, it is likely you need a server-side application using our{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a>
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.clientSideStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>Client Side Apps</Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>
          Client Side Apps use our identity provider{' '}
          <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect</a> to authenticate against our API.
          Your application will need to re-direct to Reapit Connect where we will handle user login and in turn,
          re-direct back to your app with a code in the url that you exchange for access and id JWTs, referred to as{' '}
          <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow.</a> You will need to
          provide us with uris to your application at the next step so we know where to return you to on login and on
          completion of this wizard, you will receive a Client Id you need to start the flow.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>
          To make this process easier, we provide you with an authentication module for client-side apps,{' '}
          <a onClick={openNewPage(ExternalPages.connectSessionDocs)}>Connect Session</a>, which comes bundled with our{' '}
          <a onClick={openNewPage(ExternalPages.craDocs)}>Create React App Template</a> for quick start client-side
          development.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.serverSideStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>Server Side Apps</Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>
          Server-side applications authenticate against our API using the{' '}
          <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a> This
          process involves the exchange of a Client Id and Secret for a JWT access token to authenticate against all
          requests.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>
          Unlike Client Side applications, you do not have to re-direct to Reapit Connect, nor do your users have to log
          into your application. Because of this, the flow must only be used on the Server Side to ensure the Client
          Secret you will be issued at the end of this wizard is held in a secure location.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.rcRedirectsStep] = ref
        }}
      >
        <Subtitle
          hasDisabledText={
            authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)
          }
        >
          Reapit Connect Redirects
        </Subtitle>
        <BodyText
          hasDisabledText={
            authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)
          }
        >
          When using the Reapit Connect{' '}
          <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow,</a> you need to register
          both a re-direct uri and a logout uri. The former is the location in your app, you want Reapit Connect to
          re-direct to after a successful user login, the latter, after a succesful logout. Only uris that are
          registered here will be accepted as a location by Reapit Connect although, you can register multiple locations
          with a comma separated list.
        </BodyText>
        <BodyText
          hasDisabledText={
            authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)
          }
        >
          We have pre-populated the urls that you need when using our{' '}
          <a onClick={openNewPage(ExternalPages.craDocs)}>Create React App Template</a> however, any localhost (for
          local development), or https uri is acceptable. Please note, the Uris must match those in your app exactly,
          inclusive of white space and trailing slashes.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.permissionsStep] = ref
        }}
      >
        <Subtitle hasDisabledText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          Permissions
        </Subtitle>
        <BodyText hasDisabledText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          Permissions are registered as scopes against the access token you receive back from one of our Authentication
          Flows. They map 1:1 and on a read/write basis to endpoints in our Foundations REST API. As such, it is worth
          looking at the{' '}
          <Link to={Routes.SWAGGER} target="_blank" rel="noopener noreferrer">
            API explorer here{' '}
          </Link>
          before procceeding, to investigate which permissions you think you will need.
        </BodyText>
        <BodyText hasDisabledText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          For some flows we have pre-populated suggested permissions based on what you have said you wish to acheive
          with Foundations. These can be removed or added as you see fit and all permissions can be edited later if you
          wish to add or remove them before your app goes live.
        </BodyText>
      </div>
    </HelperContentContainer>
  )
}
