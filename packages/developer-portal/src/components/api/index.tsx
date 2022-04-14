import React, { FC } from 'react'
import { WebhooksProvider } from '../webhooks/state/use-webhooks-state'
import ApiPage from './api-page'

export const Api: FC = () => (
  <WebhooksProvider>
    <ApiPage />
  </WebhooksProvider>
)

export default Api
