import {
  BodyText,
  InputWrap,
  InputAddOn,
  InputGroup,
  Label,
  PersistentNotification,
  Select,
  FormLayout,
  elFadeIn,
  elMb11,
} from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'
import { useWebhooksState } from './state/use-webhooks-state'

interface WebhooksNewAppProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>
}

export const WebhooksNewApp: FC<WebhooksNewAppProps> = ({ register, errors }) => {
  const { webhooksFilterState, webhooksDataState } = useWebhooksState()
  const { apps } = webhooksDataState
  const { applicationId } = webhooksFilterState
  const errorMessage = errors?.applicationId?.message
  return (
    <>
      <div className={elMb11}>
        <BodyText hasGreyText hasNoMargin>
          First select an app to receive your webhook. Webhooks subscriptions can be set up for any customer who has
          installed your application. Additionally, you can choose ‘SBOX’ to listen for sandbox environment
          notifications.
        </BodyText>
      </div>
      <FormLayout className={elFadeIn}>
        <InputWrap>
          {apps?.data && apps.data.length ? (
            <>
              <InputGroup>
                <Select {...register('applicationId')} defaultValue={applicationId}>
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {apps.data.map((app) => (
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
            <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
              No apps found. This is probably because you have not yet created an app from the apps page. When you have
              created your first app, you will be able to add a webhook here.
            </PersistentNotification>
          )}
        </InputWrap>
      </FormLayout>
    </>
  )
}
