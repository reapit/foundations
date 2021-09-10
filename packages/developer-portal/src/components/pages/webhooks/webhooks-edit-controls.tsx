import { Button, ButtonGroup, ExpandableContentSize, FlexContainer } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { WebhookModel } from '../../../services/webhooks'
import { WebhooksManageForm } from './webhooks-manage-form'

interface WebhooksEditControlsProps {
  webhookModel: WebhookModel
  expandableContentSize: ExpandableContentSize
  setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>
}

export const handleSetContentType =
  (
    expandableContentSize: ExpandableContentSize,
    setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>,
  ) =>
  () => {
    setExpandableContentSize(expandableContentSize)
  }

export const WebhooksEditControls: FC<WebhooksEditControlsProps> = ({
  webhookModel,
  expandableContentSize,
  setExpandableContentSize,
}) => (
  <>
    {expandableContentSize === 'small' && (
      <FlexContainer isFlexJustifyCenter>
        <ButtonGroup>
          <Button intent="primary" onClick={handleSetContentType('large', setExpandableContentSize)}>
            Edit
          </Button>
          <Button intent="primary">Ping</Button>
        </ButtonGroup>
      </FlexContainer>
    )}
    {expandableContentSize === 'large' && <WebhooksManageForm webhookModel={webhookModel} />}
  </>
)
