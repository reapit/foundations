import * as React from 'react'
import { history } from '@/core/router'
import { H3 } from '@reapit/elements'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/help.scss?mod'
import welcomeImg from '@/assets/images/help/welcome-guide.jpg'
import liveChatImg from '@/assets/images/help/live-chat.jpg'
import { HelpItem, HelpItemList } from '@/components/ui/help-item-list'

export const handleGotoWelcomeGuide = () => {
  history.push(Routes.CLIENT_WELCOME)
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

export const ClientHelpPage: React.FC = () => {
  return (
    <div className={styles.wrapHelp}>
      <H3>Help</H3>
      <HelpItemList items={helpItems} />
    </div>
  )
}

export default ClientHelpPage
