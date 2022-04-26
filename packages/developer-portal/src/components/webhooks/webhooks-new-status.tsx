import {
  BodyText,
  ElToggleItem,
  InputGroup,
  Label,
  Toggle,
  elMt1,
  FormLayout,
  InputWrap,
  elFadeIn,
  elMb11,
} from '@reapit/elements'
import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewStatusProps {
  register: UseFormRegister<CreateWebhookFormSchema>
}

export const WebhooksNewStatus: FC<WebhooksNewStatusProps> = ({ register }) => (
  <>
    <div className={elMb11}>
      <BodyText hasNoMargin hasGreyText>
        Selecting active status will determine whether the webhook will fire when changes are made. This will effect
        your consumption costs so you may wish to disable it periodically. Ignoring when the etag only changes will mean
        the webhoook only fires when customer data changes.
      </BodyText>
    </div>
    <FormLayout className={elFadeIn}>
      <InputWrap>
        <InputGroup>
          <Toggle className={elMt1} id="status-toggle" hasGreyBg {...register('active')}>
            <ElToggleItem>Active</ElToggleItem>
            <ElToggleItem>Inactive</ElToggleItem>
          </Toggle>
          <Label>Status</Label>
        </InputGroup>
      </InputWrap>
      <InputWrap>
        <InputGroup
          type="checkbox"
          label="Ignore where only the etag has been modified"
          inputAddOnText="Ignore"
          {...register('ignoreEtagOnlyChanges')}
        />
      </InputWrap>
    </FormLayout>
  </>
)
