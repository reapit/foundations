import { BodyText, Subtitle } from '@reapit/elements'
import React, { FC, useEffect, useRef } from 'react'
import { AppNewStepId } from './config'
import { useAppState } from '../state/use-app-state'
import { HelperContentContainer } from './__styles__'

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
      <Subtitle hasGreyText={Boolean(nextStep)}>About Applications</Subtitle>
      <BodyText hasGreyText={Boolean(nextStep)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
        voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
        facere.
      </BodyText>
      <BodyText hasGreyText={Boolean(nextStep)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
        voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
        facere.
      </BodyText>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.agencyCloudStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          AgencyCloud Functionality
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.agencyCloudStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.externalAppStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          External Web Applications
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.externalAppStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.dataFeedStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          Data Portal and Reporting Feeds
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.dataFeedStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.websiteFeedStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>Website Feeds</Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.websiteFeedStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.webServicesStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Web Services Migrations
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.webServicesStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.reapitConnectStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          Using Reapit Connect as an Itentity Provider
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.reapitConnectStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.otherAppStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>Other App Types</Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.otherAppStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.clientSideStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>Client Side Apps</Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.clientSideStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.serverSideStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>Server Side Apps</Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(nextStep, AppNewStepId.serverSideStep)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.rcRedirectsStep] = ref
        }}
      >
        <Subtitle
          hasGreyText={authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)}
        >
          Reapit Connect Redirects
        </Subtitle>
        <BodyText
          hasGreyText={authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText
          hasGreyText={authFlow === 'clientCredentials' || stepIsNotNextStep(nextStep, AppNewStepId.permissionsStep)}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.permissionsStep] = ref
        }}
      >
        <Subtitle hasGreyText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          Permissions
        </Subtitle>
        <BodyText hasGreyText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={stepIsNotNextStep(currentStep, AppNewStepId.permissionsStep) && !lastStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
    </HelperContentContainer>
  )
}
