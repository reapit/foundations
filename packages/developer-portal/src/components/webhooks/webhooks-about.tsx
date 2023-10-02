import { BodyText, ColSplit, Grid, PersistentNotification, elMb11, elMb10, Button, Subtitle } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router'
import Routes from '../../constants/routes'
import { ExternalPages, navigateRoute, openNewPage } from '../../utils/navigation'
import { IconContainer } from './__styles__/index'
import { WebhooksAnimatedDocsIcon } from './webhooks-animated-docs-icon'
import { WebhooksAnimatedNewIcon } from './webhooks-animated-new-icon'

export const handleNewMouseOver = (setNewIsAnimated: Dispatch<SetStateAction<boolean>>, isAnimated: boolean) => () => {
  setNewIsAnimated(isAnimated)
}

export const handleDocsMouseOver =
  (setDocsIsAnimated: Dispatch<SetStateAction<boolean>>, isAnimated: boolean) => () => {
    setDocsIsAnimated(isAnimated)
  }

export const WebhooksAbout: FC = () => {
  const navigate = useNavigate()
  const [newIsAnimated, setNewIsAnimated] = useState<boolean>(false)
  const [docsIsAnimated, setDocsIsAnimated] = useState<boolean>(false)

  return (
    <>
      <PersistentNotification className={elMb11} isFullWidth isExpanded intent="primary" isInline>
        Please note that apps and integrations developed using Webhooks for topics other than application
        install/uninstall will only be visible in the Marketplace to customers who have been migrated to AWS.
      </PersistentNotification>
      <Grid>
        <ColSplit>
          <IconContainer className={elMb10}>
            <WebhooksAnimatedNewIcon isAnimated={newIsAnimated} />
          </IconContainer>
          <Subtitle>Manage Webhooks Subscriptions</Subtitle>
          <BodyText hasGreyText>
            Our webhooks system allows your application to directly subscribe to events happening in our customers data.
            Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
            allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
          </BodyText>
          <Button
            onMouseEnter={handleNewMouseOver(setNewIsAnimated, true)}
            onMouseLeave={handleNewMouseOver(setNewIsAnimated, false)}
            chevronRight
            intent="primary"
            onClick={navigateRoute(navigate, Routes.WEBHOOKS_NEW)}
          >
            Add new webhook
          </Button>
        </ColSplit>
        <ColSplit>
          <IconContainer className={elMb10}>
            <WebhooksAnimatedDocsIcon isAnimated={docsIsAnimated} />
          </IconContainer>
          <Subtitle>Webhooks Documentation</Subtitle>
          <BodyText hasGreyText>
            This system is designed to work flexibly with your application. If you wish, you can set up a single
            endpoint to catch all topics for all customers. Alternatively, you may wish to set up a different webhook
            subscription per topic or per customer. For more information about Webhooks, please see our{' '}
            <a href={ExternalPages.webhooksDocs} target="_blank" rel="noreferrer">
              webhooks documentation.
            </a>
          </BodyText>
          <Button
            onMouseEnter={handleDocsMouseOver(setDocsIsAnimated, true)}
            onMouseLeave={handleDocsMouseOver(setDocsIsAnimated, false)}
            intent="default"
            onClick={openNewPage(ExternalPages.webhooksDocs)}
          >
            View Docs
          </Button>
        </ColSplit>
      </Grid>
    </>
  )
}

export default WebhooksAbout
