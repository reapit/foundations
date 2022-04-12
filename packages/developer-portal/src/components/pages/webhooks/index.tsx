import React, { FC } from 'react'
import { WebhooksProvider } from './state/use-webhooks-state'
import WebhooksPage from './webhooks'

export const Webhooks: FC = () => (
  <WebhooksProvider>
    <WebhooksPage />
  </WebhooksProvider>
)

export default Webhooks
