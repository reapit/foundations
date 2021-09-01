import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

interface WebhooksNewUrlProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const WebhooksNewUrl: FC<WebhooksNewUrlProps> = () => {
  return <div>Select Url</div>
}
