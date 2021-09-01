import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

interface WebhooksNewStatusProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const WebhooksNewStatus: FC<WebhooksNewStatusProps> = () => {
  return <div>Select status</div>
}
