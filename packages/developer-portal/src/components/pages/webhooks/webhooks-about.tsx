import { BodyText, PersistantNotification } from '@reapit/elements'
import React, { FC } from 'react'

export const WebhooksAbout: FC = () => {
  return (
    <>
      <div>About Webhook</div>
      <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
        Please note that apps and integrations developed using Webhooks for topics other than application
        install/uninstall will only be visible in the Marketplace to customers who have been migrated to AWS.
      </PersistantNotification>
      <BodyText hasGreyText>
        Our webhooks system allows your application to directly subscribe to events happening in our customers data.
        Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
        allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
      </BodyText>
    </>
  )
}
