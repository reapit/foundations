import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

interface WebhooksNewTopicsProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const WebhooksNewTopics: FC<WebhooksNewTopicsProps> = () => {
  return <div>Select Topics</div>
}
