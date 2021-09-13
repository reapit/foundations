import { BodyText, ColSplit, Grid, PersistantNotification, elMb11, elMb10, Button, Subtitle } from '@reapit/elements'
import React, { FC } from 'react'
import { useHistory } from 'react-router'
import Routes from '../../../constants/routes'
import { ExternalPages, navigate, openNewPage } from '../../../utils/navigation'
import { IconContainer } from './__styles__/index'
import webhookDocsImage from '../../../assets/images/webhook-docs.svg'
import webhookNewImage from '../../../assets/images/webhook-new.svg'

export const WebhooksAbout: FC = () => {
  const history = useHistory()

  return (
    <>
      <PersistantNotification className={elMb11} isFullWidth isExpanded intent="secondary" isInline>
        Please note that apps and integrations developed using Webhooks for topics other than application
        install/uninstall will only be visible in the Marketplace to customers who have been migrated to AWS.
      </PersistantNotification>
      <Grid>
        <ColSplit>
          <IconContainer className={elMb10}>
            <object type="image/svg+xml" data={webhookNewImage}>
              svg-animation
            </object>
          </IconContainer>
          <Subtitle>Manage Webhooks Subscriptions</Subtitle>
          <BodyText hasGreyText>
            Our webhooks system allows your application to directly subscribe to events happening in our customers data.
            Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
            allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
          </BodyText>
          <Button chevronRight intent="critical" onClick={navigate(history, Routes.WEBHOOKS_NEW)}>
            Add new webhook
          </Button>
        </ColSplit>
        <ColSplit>
          <IconContainer className={elMb10}>
            <object type="image/svg+xml" data={webhookDocsImage}>
              svg-animation
            </object>
          </IconContainer>
          <Subtitle>Webhooks Documentation</Subtitle>
          <BodyText hasGreyText>
            This system is designed to flexibly work with how your application is built and deployed. If you wish, you
            can set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up a
            different webhook subscription per topic or per customer. For more information about Webhooks, please see
            our{' '}
            <a href={ExternalPages.webhooksDocs} target="_blank" rel="noreferrer">
              webhooks documentation.
            </a>
          </BodyText>
          <Button intent="low" onClick={openNewPage(ExternalPages.webhooksDocs)}>
            View Docs
          </Button>
        </ColSplit>
      </Grid>
    </>
  )
}
