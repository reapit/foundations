import { cx } from '@linaria/core'
import {
  BodyText,
  ColSplit,
  elMb11,
  ElToggleItem,
  Grid,
  InputGroup,
  Subtitle,
  Toggle,
  FlexContainer,
  elW6,
  elMr5,
  elMl5,
  elMt1,
} from '@reapit/elements'
import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewStatusProps {
  register: UseFormRegister<CreateWebhookFormSchema>
}

export const WebhooksNewStatus: FC<WebhooksNewStatusProps> = ({ register }) => (
  <Grid>
    <ColSplit>
      <div className={elMb11}>
        <BodyText hasNoMargin hasGreyText>
          Selecting active status will determine whether the webhook will fire when changes are made. This will effect
          your consumption costs so you may wish to disable it periodically. Ignoring when the etag only changes will
          mean the webhoook only fires when customer data changes.
        </BodyText>
      </div>
      <FlexContainer>
        <FlexContainer isFlexColumn className={cx(elW6, elMr5)}>
          <Subtitle>Status</Subtitle>
          <Toggle className={elMt1} id="status-toggle" hasGreyBg isFullWidth {...register('active')}>
            <ElToggleItem>Active</ElToggleItem>
            <ElToggleItem>Inactive</ElToggleItem>
          </Toggle>
        </FlexContainer>
        <div className={cx(elW6, elMl5)}>
          <Subtitle>Notifications</Subtitle>
          <InputGroup
            type="checkbox"
            label="Ignore where only the etag has been modified"
            inputAddOnText="Ignore"
            {...register('ignoreEtagOnlyChanges')}
          />
        </div>
      </FlexContainer>
    </ColSplit>
  </Grid>
)
