import * as React from 'react'
import { history } from '@/core/router'
import { H3, Section } from '@reapit/elements'
import Routes from '@/constants/routes'
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
    <>
      <Section>
        <H3 className="mb-0">Help</H3>
      </Section>
      <Section>
        <HelpItemList items={helpItems} />
      </Section>
    </>
  )
}

export default ClientHelpPage
