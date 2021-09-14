import {
  BodyText,
  ColSplit,
  elMb11,
  Grid,
  InputAddOn,
  InputGroup,
  Loader,
  PersistantNotification,
  Select,
  Subtitle,
} from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectAppListState } from '../../../selector/apps/app-list'
import { CreateWebhookFormSchema } from './webhooks-new'
import { WebhookQueryParams } from './webhooks'

interface WebhooksNewAppProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<CreateWebhookFormSchema, FieldError>
  webhookQueryParams: WebhookQueryParams
}

export const WebhooksNewApp: FC<WebhooksNewAppProps> = ({ register, errors, webhookQueryParams }) => {
  const { data: apps, isLoading } = useSelector(selectAppListState)

  const errorMessage = errors?.applicationId?.message
  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasGreyText hasNoMargin>
            Webhooks subscriptions can be set up for any customer who has installed your application. Additionally, you
            can choose ‘SBOX’ to listen for sandbox environment notifications.
          </BodyText>
        </div>
        {isLoading ? (
          <Loader label="Loading" />
        ) : apps && apps.length ? (
          <>
            <Subtitle>Plese select an app</Subtitle>
            <InputGroup>
              <Select {...register('applicationId')} defaultValue={webhookQueryParams.applicationId ?? ''}>
                <option key="default-option" value="">
                  None selected
                </option>
                {apps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </Select>
              {errorMessage && <InputAddOn intent="danger">{errorMessage}</InputAddOn>}
            </InputGroup>
          </>
        ) : (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No apps found. This is probably because you have not yet created an app from the apps page. When you have
            created your first app, you will be able to add a webhook here.
          </PersistantNotification>
        )}
      </ColSplit>
    </Grid>
  )
}
