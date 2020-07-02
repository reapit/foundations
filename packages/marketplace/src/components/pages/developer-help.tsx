import * as React from 'react'
import { useSelector } from 'react-redux'
import initChatBot from '../../scripts/chat-bot'
import { history } from '@/core/router'
import { H3 } from '@reapit/elements'
import Routes from '@/constants/routes'
import { HelpLinks } from '@/constants/developer-help-links'
import welcomeImg from '@/assets/images/help/welcome-guide.jpg'
import requestEndpointImg from '@/assets/images/help/request-endpoint.jpg'
import reportBugImg from '@/assets/images/help/report-bugs.jpg'
import liveChatImg from '@/assets/images/help/live-chat.jpg'
import roadmapImg from '@/assets/images/help/time-line.jpg'
import whatNewImg from '@/assets/images/help/what-new.png'
import { HelpItem, HelpItemList } from '@/components/ui/help-item-list'

import { LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity } from '@/selector/auth'

export const handleGotoWelcomeGuide = () => {
  history.push(Routes.DEVELOPER_WELCOME)
}

export const handleReportBug = () => {
  window.open(HelpLinks.BUG_REPORT, '_blank')
}

export const handleRequestEndpoint = () => {
  window.open(HelpLinks.API_REQUEST, '_blank')
}

export const handleViewRoadmap = () => {
  window.open(HelpLinks.ROADMAP, '_blank')
}

export const handleWhatsNew = () => {
  window.open(HelpLinks.WHATS_NEW, '_blank')
}

export const handleFaq = (loginIdentity?: LoginIdentity) => {
  initChatBot(loginIdentity)
}

export const helpItems = (loginIdentity?: LoginIdentity): HelpItem[] => [
  {
    imgSrc: welcomeImg,
    header: 'Welcome Guide',
    text: `Need a little help? Have a look through the Welcome Guide, which we’ve put
      together to help you navigate through your Developer portal.`,
    buttonText: 'VIEW',
    buttonOnClick: handleGotoWelcomeGuide,
  },
  {
    imgSrc: requestEndpointImg,
    header: 'Request a Feature',
    text: `Use this form to request a feature in either the Marketplace or Foundations API. Please note, we will
      look at all requests carefully however, we cannot guarantee all will be implemented.`,
    buttonText: 'REQUEST',
    buttonOnClick: handleRequestEndpoint,
  },
  {
    imgSrc: reportBugImg,
    header: 'Report a Bug',
    text:
      'Please report details of any bugs in relation to the Reapit Developer portal or Reapit Foundations API here. ',
    buttonText: 'REPORT',
    buttonOnClick: handleReportBug,
  },
  {
    imgSrc: roadmapImg,
    header: 'Roadmap',
    text: `Want to see what we are building or check on the progress of your feature requests?
      You can see our product roadmap milestones here. `,
    buttonText: 'VIEW',
    buttonOnClick: handleViewRoadmap,
  },
  {
    imgSrc: liveChatImg,
    header: 'Need Help?',
    text:
      'If you need any support, we are here to help. Why not talk to one of our Developers or Product Owners ' +
      'directly. If you have a question that is not covered in the documentation you can ask here. Please note ' +
      'we don’t provide chat support for Agency Cloud Developer Edition.',
    buttonText: 'START CHAT',
    buttonOnClick: () => handleFaq(loginIdentity),
  },
  {
    imgSrc: whatNewImg,
    header: 'What’s New',
    text: `We are constantly working to improve your experience with the Foundations Platform. Have a look to see what
      new features and fixes have been released.`,
    buttonText: 'VIEW',
    buttonOnClick: handleWhatsNew,
  },
]

export type DeveloperHelpPageProps = {}

export const DeveloperHelpPage: React.FC<DeveloperHelpPageProps> = () => {
  const loginIdentity = useSelector(selectLoginIdentity)
  return (
    <>
      <H3 isHeadingSection>Help</H3>
      <HelpItemList items={helpItems(loginIdentity)} />
    </>
  )
}

export default DeveloperHelpPage
