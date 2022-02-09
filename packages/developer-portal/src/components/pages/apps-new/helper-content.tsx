import { BodyText, Subtitle } from '@reapit/elements'
import React, { FC, useEffect, useRef } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { HelperContentContainer } from './__styles__'

export type HelperContentRef = {
  [key in AppNewStepId]: HTMLDivElement | null
}

export const HelperContent: FC = () => {
  const { appWizardState } = useAppWizard()
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
    console.log('Helper Content current step', currentStep)
    console.log('Helper Content next step', nextStep)
    console.log('Helper Content last step', lastStep)

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
      <Subtitle hasBoldText>About Applications</Subtitle>
      <BodyText hasGreyText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
        voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
        facere.
      </BodyText>
      <BodyText hasGreyText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
        voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
        facere.
      </BodyText>
      <div
        ref={(ref) => {
          helperContentRef.current[AppNewStepId.agencyCloudStep] = ref
        }}
      >
        <BodyText hasBoldText={nextStep === AppNewStepId.agencyCloudStep}>AgencyCloud Functionality</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.agencyCloudStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.agencyCloudStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.externalAppStep}>External Web Applications</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.externalAppStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.externalAppStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.dataFeedStep}>Data Portal and Reporting Feeds</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.dataFeedStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.dataFeedStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.websiteFeedStep}>Website Feeds</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.websiteFeedStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.websiteFeedStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.webServicesStep}>Web Services Migrations</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.webServicesStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.webServicesStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.reapitConnectStep}>
          Using Reapit Connect as an Itentity Provider
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.reapitConnectStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.reapitConnectStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.otherAppStep}>Other App Types</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.otherAppStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.otherAppStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.clientSideStep}>Client Side Apps</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.clientSideStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.clientSideStep}>
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
        <BodyText hasBoldText={nextStep === AppNewStepId.serverSideStep}>Server Side Apps</BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.serverSideStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={nextStep !== AppNewStepId.serverSideStep}>
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
        <BodyText hasBoldText={authFlow === 'authorisationCode' && nextStep === AppNewStepId.permissionsStep}>
          Reapit Connect Redirects
        </BodyText>
        <BodyText hasGreyText={authFlow === 'clientCredentials' || nextStep !== AppNewStepId.permissionsStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={authFlow === 'clientCredentials' || nextStep !== AppNewStepId.permissionsStep}>
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
        <BodyText hasBoldText={currentStep === AppNewStepId.permissionsStep || lastStep}>Permissions</BodyText>
        <BodyText hasGreyText={currentStep !== AppNewStepId.permissionsStep && !lastStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
        <BodyText hasGreyText={currentStep !== AppNewStepId.permissionsStep && !lastStep}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus quasi mollitia ratione iure dolores
          voluptatem adipisci laudantium voluptates ut aliquam soluta deleniti, error ad iste quisquam. Voluptas, eos
          facere.
        </BodyText>
      </div>
    </HelperContentContainer>
  )
}
