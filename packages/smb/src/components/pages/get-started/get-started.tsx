import * as React from 'react'
import { FlexContainerResponsive, useHelpGuideContext, HelpGuide, Button } from '@reapit/elements'
import { Container, WrapperStep } from './__styles__/styles'

export const Setting = () => {
  const { goNext } = useHelpGuideContext()
  return (
    <WrapperStep>
      <p className="mb-5">
        Setup your office and additional offices in your company by accessing &lsquo;Offices&rsquo;. Here you can set
        your &lsquo;Global Settings&rsquo;, configure your &lsquo;Areas&rsquo; and third-party software
        &lsquo;Integrations&rsquo;.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </WrapperStep>
  )
}

export const AddingUsers = () => {
  const { goNext, goPrev } = useHelpGuideContext()

  return (
    <WrapperStep>
      <p className="mb-5">
        Add your Negotiators, Property Managers and Admin access through &lsquo;Users&rsquo;. You can add, delete or
        transfer users between Offices. You’ll need to setup at least 1 admin user before installing the software.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </WrapperStep>
  )
}

export const AddingSourcesAndReferrals = () => {
  const { goNext, goPrev } = useHelpGuideContext()
  return (
    <WrapperStep>
      <p className="mb-5">
        Configure your Lead Sources, Advertising Publishers and add third party Referrals from the &lsquo;Sources&rsquo;
        tab. You can come back any time and add new sources when you need to.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </WrapperStep>
  )
}

export const Branding = () => {
  const { goNext, goPrev } = useHelpGuideContext()
  return (
    <WrapperStep>
      <p className="mb-5">
        Personalise your templates & brand your brochures. From the &lsquo;Marketing&rsquo; tab you can set your set
        your company colours, upload your logo and choose which Portals you want to send to.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </WrapperStep>
  )
}

export const LetGetStated = () => {
  const { goPrev } = useHelpGuideContext()
  return (
    <WrapperStep>
      <p className="mb-5">
        You can now start the wizard by clicking on &lsquo;Start Setup&rsquo; below. We will walk you through the steps
        and in no time at all, you&rsquo;ll be ready to install the latest version of Agency Cloud.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button variant="primary" type="button" onClick={handleStartSetup()}>
        Start Setup
      </Button>
    </WrapperStep>
  )
}

export const handleStartSetup = () => () => {}

export const handleChangeSteps = (goTo: () => void) => () => {
  goTo()
  document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })
}

export const GetStated: React.FC = () => {
  return (
    <Container id="get-started">
      <FlexContainerResponsive flexColumn hasBackground hasPadding>
        <HelpGuide>
          <HelpGuide.Step id="step-1" component={Setting} heading="Setting up your Office(s)." />
          <HelpGuide.Step id="step-2" component={AddingUsers} heading="Adding Users." />
          <HelpGuide.Step id="step-3" component={AddingSourcesAndReferrals} heading="Adding Sources and Referrals." />
          <HelpGuide.Step
            id="step-4"
            component={Branding}
            heading="Branding your Templates and selecting your Portals."
          />
          <HelpGuide.Step id="step-5" component={LetGetStated} heading="That’s it! Let’s get started." />
        </HelpGuide>
      </FlexContainerResponsive>
    </Container>
  )
}

export default GetStated
