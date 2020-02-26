import * as React from 'react'
import { connect } from 'react-redux'
import { FlexContainerResponsive, useHelpGuideContext, HelpGuide, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { userAcceptTermAndCondition } from '@/actions/auth'
import styles from '@/styles/pages/developer-welcome.scss?mod'
import Step1 from '@/assets/images/step-1.png'
import Step2 from '@/assets/images/step-2.png'
import Step3 from '@/assets/images/step-3.png'
import Step4 from '@/assets/images/step-4.png'
import Step5 from '@/assets/images/step-5.png'

export interface ClientWelcomeMappedActions {
  userAcceptTermAndCondition: () => void
}

export type ClientWelcomeMessageProps = ClientWelcomeMappedActions

export const Welcome = () => {
  const { goNext } = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Support = ({ onAccept }) => {
  const { goPrev } = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button variant="primary" type="button" onClick={handleUserAccept(onAccept, history)}>
        Get Started
      </Button>
    </div>
  )
}

export const handleUserAccept = (userAcceptTermAndCondition, history) => () => {
  userAcceptTermAndCondition()
  history.push(Routes.INSTALLED_APPS)
}

export const handleChangeSteps = (goTo: () => void) => () => {
  goTo()
  document.getElementById('developer-welcome')?.scrollIntoView({ behavior: 'smooth' })
}

export const ClientWelcomeMessage: React.FC<ClientWelcomeMessageProps> = ({ userAcceptTermAndCondition }) => {
  return (
    <div id="developer-welcome" className={styles.container}>
      <FlexContainerResponsive className="welcome-container" flexColumn hasBackground hasPadding>
        <HelpGuide>
          <HelpGuide.Step
            id="step-1"
            component={Welcome}
            heading="Lorem Ipsum"
            subHeading="What is Lorem Ipsum?"
            graphic={<img className={styles.graphic} alt="step-1" src={Step1} />}
          />
          <HelpGuide.Step
            id="step-2"
            component={Welcome}
            heading="Lorem Ipsum"
            subHeading="What is Lorem Ipsum?"
            graphic={<img className={styles.graphic} alt="step-2" src={Step2} />}
          />
          <HelpGuide.Step
            id="step-3"
            component={Welcome}
            heading="Lorem Ipsum"
            subHeading="What is Lorem Ipsum?"
            graphic={<img className={styles.graphic} alt="step-3" src={Step3} />}
          />
          <HelpGuide.Step
            id="step-4"
            component={Welcome}
            heading="Lorem Ipsum"
            subHeading="What is Lorem Ipsum?"
            graphic={<img className={styles.graphic} alt="step-4" src={Step4} />}
          />
          <HelpGuide.Step
            id="step-5"
            render={<Support onAccept={userAcceptTermAndCondition} />}
            heading="Lorem Ipsum"
            subHeading="What is Lorem Ipsum?"
            graphic={<img className={styles.graphic} alt="step-5" src={Step5} />}
          />
        </HelpGuide>
      </FlexContainerResponsive>
    </div>
  )
}

export const mapDispatchToProps = (dispatch: any): ClientWelcomeMappedActions => ({
  userAcceptTermAndCondition: () => dispatch(userAcceptTermAndCondition()),
})

export default connect(null, mapDispatchToProps)(ClientWelcomeMessage)
