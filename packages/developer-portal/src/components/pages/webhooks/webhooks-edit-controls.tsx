import { Button, ButtonGroup, ExpandableContentSize, FlexContainer } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { WebhookModel } from '../../../services/webhooks'
import { WebhooksPingForm } from './webhook-ping-form'
import { WebhooksManageForm } from './webhooks-manage-form'

interface WebhooksEditControlsProps {
  webhookModel: WebhookModel
  expandableContentSize: ExpandableContentSize
  setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
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
  setIndexExpandedRow,
}) => (
  <>
    {expandableContentSize === 'small' && (
      <FlexContainer isFlexJustifyCenter>
        <ButtonGroup>
          <Button intent="primary" onClick={handleSetContentType('large', setExpandableContentSize)}>
            Edit
          </Button>
          <Button intent="primary" onClick={handleSetContentType('medium', setExpandableContentSize)}>
            Ping
          </Button>
        </ButtonGroup>
      </FlexContainer>
    )}
    {expandableContentSize === 'medium' && (
      <WebhooksPingForm
        webhookModel={webhookModel}
        setIndexExpandedRow={setIndexExpandedRow}
        setExpandableContentSize={setExpandableContentSize}
      />
    )}
    {expandableContentSize === 'large' && (
      <WebhooksManageForm
        webhookModel={webhookModel}
        setIndexExpandedRow={setIndexExpandedRow}
        setExpandableContentSize={setExpandableContentSize}
      />
    )}
  </>
)
