import {
  BodyText,
  InputWrap,
  elMb11,
  InputWrapFull,
  InputAddOn,
  InputGroup,
  Label,
  Loader,
  PersistantNotification,
  Select,
  FormLayout,
  elFadeIn,
} from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectAppListState } from '../../../selector/apps/app-list'
import { CreateWebhookFormSchema } from './webhooks-new'
import { WebhookQueryParams } from './webhooks'
import { cx } from '@linaria/core'

interface WebhooksNewAppProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<CreateWebhookFormSchema, FieldError>
  webhookQueryParams: WebhookQueryParams
}

export const WebhooksNewApp: FC<WebhooksNewAppProps> = ({ register, errors, webhookQueryParams }) => {
  const { data: apps, isLoading } = useSelector(selectAppListState)

  const errorMessage = errors?.applicationId?.message
  return (
    <FormLayout className={cx(elFadeIn, elMb11)}>
      <InputWrapFull>
        <BodyText hasGreyText hasNoMargin>
          Webhooks subscriptions can be set up for any customer who has installed your application. Additionally, you
          can choose ‘SBOX’ to listen for sandbox environment notifications.
        </BodyText>
      </InputWrapFull>
      <InputWrap>
        {isLoading ? (
          <Loader label="Loading" />
        ) : apps && apps.length ? (
          <>
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
              <Label>Please select an app</Label>
              {errorMessage && <InputAddOn intent="danger">{errorMessage}</InputAddOn>}
            </InputGroup>
          </>
        ) : (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No apps found. This is probably because you have not yet created an app from the apps page. When you have
            created your first app, you will be able to add a webhook here.
          </PersistantNotification>
        )}
      </InputWrap>
    </FormLayout>
  )
}
