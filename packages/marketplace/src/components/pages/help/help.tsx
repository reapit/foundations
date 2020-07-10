import * as React from 'react'
import { history } from '@/core/router'
import { H3 } from '@reapit/elements'
import Routes from '@/constants/routes'
import welcomeImg from '@/assets/images/help/welcome-guide.jpg'
import liveChatImg from '@/assets/images/help/live-chat.jpg'
import { HelpItem, HelpItemList } from '@/components/pages/help/help-item-list'

export const handleGotoWelcomeGuide = () => {
  history.push(Routes.WELCOME)
}

export const helpItems: HelpItem[] = [
  {
    imgSrc: welcomeImg,
    header: 'Welcome Guide',
    text: 'Lorem ipsum dolor. Sit illum optio suscipit quas pariatur illo reprehenderit assumenda.',
    buttonText: 'VIEW',
    buttonOnClick: handleGotoWelcomeGuide,
  },
  {
    imgSrc: liveChatImg,
    header: 'Need Help?',
    text: 'Lorem ipsum dolor. Sit illum optio suscipit quas pariatur illo reprehenderit assumenda.',
    buttonText: 'SUPPORT',
    buttonOnClick: () => {
      /** TBC */
    },
  },
]

export const Help: React.FC = () => {
  return (
    <>
      <H3 isHeadingSection>Help</H3>
      <HelpItemList items={helpItems} />
    </>
  )
}

export default Help
