import { BodyText, ColSplit, elMb11, Grid, InputGroup, Subtitle } from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewUrlProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<CreateWebhookFormSchema, FieldError>
}

export const WebhooksNewUrl: FC<WebhooksNewUrlProps> = ({ register, errors }) => (
  <Grid>
    <ColSplit>
      <div className={elMb11}>
        <BodyText hasNoMargin hasGreyText>
          Add a url to receive your webhook payload here. The url must be a secure https endpoint.
        </BodyText>
      </div>
      <Subtitle>Webhook URL</Subtitle>
      <InputGroup
        placeholder="Enter secure https:// url"
        {...register('url')}
        inputAddOnText={errors?.url?.message}
        intent="danger"
      />
    </ColSplit>
  </Grid>
)
