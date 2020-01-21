import * as React from 'react'
import initChatBot from '../../scripts/chat-bot'
import { history } from '@/core/router'
import { H3, Button, GridFiveCol, GridFourColItem, H4, Content, FlexContainerBasic } from '@reapit/elements'
import Routes from '@/constants/routes'
import { HelpLinks } from '@/constants/help-links'
import styles from '@/styles/pages/help.scss?mod'
import welcomeImg from '@/assets/images/help/welcome-guide.jpg'
import requestEndpointImg from '@/assets/images/help/request-endpoint.jpg'
import reportBugImg from '@/assets/images/help/report-bugs.jpg'
import liveChat from '@/assets/images/help/live-chat.jpg'

export const handleGotoWelcomeGuide = () => {
  history.push(Routes.DEVELOPER_WELCOME)
}

export const handleReportBug = () => {
  window.open(HelpLinks.BUG_REPORT, '_blank')
}

export const handleRequestEndpoint = () => {
  window.open(HelpLinks.API_REQUEST, '_blank')
}

export const handleFaq = () => {
  initChatBot()
}

export interface HelpItem {
  imgSrc: string
  header: string
  text: string
  buttonText: string
  buttonOnClick: () => void
}

export const helpItems: HelpItem[] = [
  {
    imgSrc: welcomeImg,
    header: 'Welcome Guide',
    text:
      'Need a little help? Have a look through the Welcome Guide, which we’ve put together to help you navigate through your Developer portal.',
    buttonText: 'VIEW',
    buttonOnClick: handleGotoWelcomeGuide
  },
  {
    imgSrc: requestEndpointImg,
    header: 'Request a Feature',
    text:
      'Use this form to request a feature in either the Marketplace or Foundations API. Please note, we will look at all requests carefully however, we cannot guarantee all will be implemented.',
    buttonText: 'REQUEST',
    buttonOnClick: handleRequestEndpoint
  },
  {
    imgSrc: reportBugImg,
    header: 'Report a Bug',
    text:
      'Please report details of any bugs in relation to the Reapit Developer portal or Reapit Foundations API here. ',
    buttonText: 'REPORT',
    buttonOnClick: handleReportBug
  },
  {
    imgSrc: liveChat,
    header: 'Need Help?',
    text:
      'If you need any support, we are here to help. Why not talk to one of our Developers or Product Owners directly.',
    buttonText: 'START CHAT',
    buttonOnClick: handleFaq
  }
]

export const renderHelpItems = (items: HelpItem[]): React.ReactNode => (
  <GridFiveCol className={styles.wrapListItems}>
    {items.map(({ imgSrc, header, text, buttonText, buttonOnClick }) => (
      <GridFourColItem className={styles.item} key={header}>
        <FlexContainerBasic className={styles.wrapBoxContent} flexColumn centerContent hasPadding>
          <div className={styles.wrapImage}>
            <img className={styles.image} src={imgSrc} alt={header} />
          </div>
          <H4 isCentered>{header}</H4>
          <p className={styles.text}>{text}</p>
          <p className={styles.wrapButton}>
            <Button
              className={styles.button}
              type="button"
              variant="primary"
              onClick={buttonOnClick}
              disabled={false}
              loading={false}
              fullWidth={false}
            >
              {buttonText}
            </Button>
          </p>
        </FlexContainerBasic>
      </GridFourColItem>
    ))}
  </GridFiveCol>
)

export const HelpPage: React.FC = () => {
  return (
    <div className={styles.wrapHelp}>
      <H3>Help</H3>
      {renderHelpItems(helpItems)}
    </div>
  )
}

export default HelpPage
