import * as React from 'react'
import { connect } from 'react-redux'
import {
  FlexContainerBasic,
  Content,
  FlexContainerResponsive,
  useHelpGuideContext,
  HelpGuide,
  Button,
  LevelRight
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { userAcceptTermAndCondition } from '@/actions/auth'
import styles from '@/styles/pages/developer-welcome.scss?mod'
import Step1 from '@/assets/images/Step-1.jpg'
import Step2 from '@/assets/images/Step-2.jpg'
import Step3 from '@/assets/images/Step-3.jpg'
import Step4 from '@/assets/images/Step-4.jpg'
import Step5 from '@/assets/images/Step-5.jpg'

export interface DevelopeWelcomeMappedActions {
  userAcceptTermAndCondition: () => void
}

export type DeveloperWelcomeMessageProps = DevelopeWelcomeMappedActions

export const Welcome = () => {
  const context = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        Thank you for registering as a Reapit Foundations Developer. Within this portal, you will have access to
        detailed documentation on all our API’s, full access to Reapit elements and Sandbox data. All available to
        assist you in building and listing your apps on the Marketplace.
      </p>
      <p className="mb-5">
        We understand how important it is to have the right tools to enable you to produce the best applications for
        your customers. With that in mind, let us show you what’s available to help you to get started.
      </p>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

export const Documentation = () => {
  const context = useHelpGuideContext()

  return (
    <div>
      <p className="mb-5">
        As Developers, we know detailed documentation and support is paramount when building any application. Therefore,
        we have created various sections to provide additional help and support. Each section can be accessed from the
        navigation bar. For example:
      </p>
      <p className="mb-5">
        <p>
          <strong>APIs</strong>
        </p>
        Our interactive documentation allows you to easily experiment with our API’s with a 'Try it now' function to
        quickly build requests and inspect responses. To try it yourself and to see what data is available, click here.
      </p>
      <p className="mb-5">
        <p>
          <strong>Elements</strong>
        </p>
        Also included within your account are Reapit 'Elements'. Providing a host of components which have been tested
        to work with a mobile or desktop application and allows you to build your Apps in compliance with our Reapit
        Brand Guidelines.
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

export const Submitting = () => {
  const context = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        Once you are ready to go, you’ll need to submit your App. Using the 'Submit App' option on the left, you will
        need to tell us about your Application, such as what permissions it requires, the type of authentication,
        description & screenshots and support contact details.
      </p>
      <p className="mb-5">
        It is important to be as detailed as you can in order to make it clear to the users what type of application you
        are marketing. Each section on the ‘Submit App’ form will explain what is required and what you need to provide.
      </p>
      <p className="mb-5">
        Once you have submitted your App and you are ready for it to be published on the Marketplace, you will need
        change the status to 'Listed'. This can be done by editing your App from the 'Apps' page. Any changes, including
        'Listing' your application will need to be approved by our Admin team.
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

export const Managing = () => {
  const context = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        If you need to make a change to your App, such as update a screenshot, edit text, or request additional
        permissions, you can do so by clicking 'Edit App' from the 'Apps' page. Any change will need to be approved by
        our Admin Team and whilst it is in the reviewal stage, it will be marked as 'Pending Revision'.
      </p>
      <p className="mb-5">
        From the 'Apps' page you will also be able to handle any client installations by opening your 'App' and clicking
        'Installations'.
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

export const Support = () => {
  const context = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        You are currently logged into our alpha release of Reapit Foundations and we are continuing to update, add
        additional features and any address issues that may appear. In the meantime, if you you would like to request a
        feature or report a bug, this can be done from the ‘Help’ section on the left.
      </p>
      <p className="mb-5">
        We are excited to be working with and hope to see your application in the Marketplace soon.
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
    </div>
  )
}

export const handleUserAccept = (userAcceptTermAndCondition, history) => () => {
  userAcceptTermAndCondition()
  history.push(Routes.DEVELOPER_MY_APPS)
}

export const DeveloperWelcomeMessage: React.FC<DeveloperWelcomeMessageProps> = ({ userAcceptTermAndCondition }) => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <HelpGuide>
            <HelpGuide.Step
              id="step-1"
              component={Welcome}
              heading="Welcome to Reapit Foundations"
              subHeading="Let’s get started."
              graphic={<img className={styles.graphic} alt="step-1" src={Step1} />}
            />
            <HelpGuide.Step
              id="step-2"
              component={Documentation}
              heading="Documentation"
              subHeading="We’ve got you covered."
              graphic={<img className={styles.graphic} alt="step-2" src={Step2} />}
            />
            <HelpGuide.Step
              id="step-3"
              component={Submitting}
              heading="Submitting an App"
              subHeading="Nearly there."
              graphic={<img className={styles.graphic} alt="step-3" src={Step3} />}
            />
            <HelpGuide.Step
              id="step-4"
              component={Managing}
              heading="Managing your App"
              subHeading="Installations and changes."
              graphic={<img className={styles.graphic} alt="step-4" src={Step4} />}
            />
            <HelpGuide.Step
              id="step-5"
              component={Support}
              heading="On going support"
              subHeading="We’re here to help."
              graphic={<img className={styles.graphic} alt="step-5" src={Step5} />}
            />
          </HelpGuide>
          <LevelRight>
            <Button variant="primary" type="button" onClick={handleUserAccept(userAcceptTermAndCondition, history)}>
              Get Started
            </Button>
          </LevelRight>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export const mapDispatchToProps = (dispatch: any): DevelopeWelcomeMappedActions => ({
  userAcceptTermAndCondition: () => dispatch(userAcceptTermAndCondition())
})

export default connect(null, mapDispatchToProps)(DeveloperWelcomeMessage)
