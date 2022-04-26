import { BodyText, elFadeIn, elMb11, FormLayout, InputGroup, InputWrapMed } from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewUrlProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>
}

export const WebhooksNewUrl: FC<WebhooksNewUrlProps> = ({ register, errors }) => (
  <>
    <div className={elMb11}>
      <BodyText hasNoMargin hasGreyText>
        Add a url to receive your webhook payload here. The url must be a secure https endpoint.
      </BodyText>
    </div>
    <FormLayout className={elFadeIn}>
      <InputWrapMed>
        <InputGroup
          label="Webhook Url"
          placeholder="Enter secure https:// url"
          {...register('url')}
          inputAddOnText={errors?.url?.message}
          intent="danger"
        />
      </InputWrapMed>
    </FormLayout>
  </>
)
