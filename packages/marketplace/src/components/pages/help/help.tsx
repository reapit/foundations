import * as React from 'react'
import { H3 } from '@reapit/elements'
import liveChatImg from '@/assets/images/help/live-chat.jpg'
import { HelpItem, HelpItemList } from '@/components/pages/help/help-item-list'

export const helpItems: HelpItem[] = [
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
