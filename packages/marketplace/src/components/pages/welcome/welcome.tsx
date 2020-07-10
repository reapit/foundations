import * as React from 'react'
import { useHelpGuideContext, HelpGuide, Button, Loader } from '@reapit/elements'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import styles from '@/styles/pages/welcome.scss?mod'
import Step1 from '@/assets/images/step-1.png'
import Step2 from '@/assets/images/step-2.png'
import Step3 from '@/assets/images/step-3.png'
import Step4 from '@/assets/images/step-4.png'
import Step5 from '@/assets/images/step-5.png'
import { setCookieString, COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import { useSelector } from 'react-redux'
import { selectIsAdmin, selectLoginSession } from '@/selector/auth'
import { selectDeveloperEditionId } from '@/selector/client'

export interface ClientWelcomeMappedActions {}

export type ClientWelcomeMessageProps = ClientWelcomeMappedActions

export const Welcome = () => {
  const { goNext, goPrev } = useHelpGuideContext()
  return (
    <div className={styles.content}>
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
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Support = () => {
  const { goPrev } = useHelpGuideContext()
  return (
    <div className={styles.content}>
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
      <Button variant="primary" type="button" onClick={handleUserAccept(history)}>
        Get Started
      </Button>
    </div>
  )
}

const WELCOME_GUIDE_USER = [
  {
    id: 'step-1',
    heading: 'Welcome User',
    subHeading: 'What is Lorem Ipsum?',
    image: Step1,
    component: Welcome,
  },
  {
    id: 'step-2',
    heading: 'As a User',
    subHeading: 'What is Lorem Ipsum?',
    image: Step2,
    component: Welcome,
  },
  {
    id: 'step-3',
    heading: 'Installing Apps',
    subHeading: 'What is Lorem Ipsum?',
    image: Step3,
    component: Welcome,
  },
  {
    id: 'step-4',
    heading: 'Uninstalling Apps',
    subHeading: 'What is Lorem Ipsum?',
    image: Step4,
    component: Welcome,
  },
  {
    id: 'step-5',
    heading: 'Support',
    subHeading: 'What is Lorem Ipsum?',
    image: Step5,
    component: Support,
  },
]

const WELCOME_GUIDE_ADMIN = [
  {
    id: 'step-1',
    heading: 'Welcome Admin',
    subHeading: 'What is Lorem Ipsum?',
    image: Step1,
    component: Welcome,
  },
  {
    id: 'step-2',
    heading: 'As a Admin',
    subHeading: 'What is Lorem Ipsum?',
    image: Step2,
    component: Welcome,
  },
  {
    id: 'step-3',
    heading: 'Installing Apps',
    subHeading: 'What is Lorem Ipsum?',
    image: Step3,
    component: Welcome,
  },
  {
    id: 'step-4',
    heading: 'Uninstalling Apps',
    subHeading: 'What is Lorem Ipsum?',
    image: Step4,
    component: Welcome,
  },
  {
    id: 'step-5',
    heading: 'Support',
    subHeading: 'What is Lorem Ipsum?',
    image: Step5,
    component: Support,
  },
]

export const handleUserAccept = history => () => {
  setCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE, new Date(), COOKIE_MAX_AGE_INFINITY)
  history.push(Routes.INSTALLED_APPS)
}

export const handleChangeSteps = (goTo: () => void) => () => {
  goTo()
}

export const ClientWelcomeMessage: React.FC<ClientWelcomeMessageProps> = () => {
  const isDesktopAdmin = useSelector(selectIsAdmin)
  const isDeveloperEdition = Boolean(useSelector(selectDeveloperEditionId))
  const loginSession = useSelector(selectLoginSession)
  const isAdmin = isDesktopAdmin || isDeveloperEdition
  const WELCOME_GIUDE = isAdmin ? WELCOME_GUIDE_ADMIN : WELCOME_GUIDE_USER

  const guideList = WELCOME_GIUDE.map(step => {
    return (
      <HelpGuide.Step
        key={step.id}
        id={step.id}
        component={step.component}
        heading={step.heading}
        subHeading={step.subHeading}
        graphic={<img className={styles.graphic} alt={step.id} src={step.image} />}
      />
    )
  })

  if (!loginSession) return <Loader />
  return <HelpGuide>{guideList}</HelpGuide>
}

export default ClientWelcomeMessage
