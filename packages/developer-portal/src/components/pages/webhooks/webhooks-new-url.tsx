import { BodyText, ColSplit, elMb11, Grid, InputGroup, Subtitle } from '@reapit/elements'
import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

interface WebhooksNewUrlProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const WebhooksNewUrl: FC<WebhooksNewUrlProps> = ({ register }) => {
  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasNoMargin hasGreyText>
            Add a url to receive your webhook payload here. The url must be a secure https endpoint.
          </BodyText>
        </div>
        <Subtitle>Webhook URL</Subtitle>
        <InputGroup placeholder="Enter secure https:// url" {...register('url')} />
      </ColSplit>
    </Grid>
  )
}
