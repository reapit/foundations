import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

interface WebhooksNewCustomersProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const WebhooksNewCustomers: FC<WebhooksNewCustomersProps> = () => {
  return <div>Select Customers</div>
}
