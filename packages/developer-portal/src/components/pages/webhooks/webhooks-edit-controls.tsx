import { Button, ButtonGroup, FlexContainer } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { WebhookModel } from '../../../services/webhooks'
import { WebhooksPingForm } from './webhook-ping-form'
import { ExpandableContentType } from './webhooks-manage'
import { WebhooksManageForm } from './webhooks-manage-form'

interface WebhooksEditControlsProps {
  webhookModel: WebhookModel
  expandableContentType: ExpandableContentType
  setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
}

export const handleSetContentType =
  (
    expandableContentType: ExpandableContentType,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
  ) =>
  () => {
    setExpandableContentType(expandableContentType)
  }

export const WebhooksEditControls: FC<WebhooksEditControlsProps> = ({
  webhookModel,
  expandableContentType,
  setExpandableContentType,
  setIndexExpandedRow,
}) => (
  <>
    {expandableContentType === ExpandableContentType.Controls && (
      <FlexContainer isFlexJustifyCenter>
        <ButtonGroup>
          <Button
            intent="primary"
            onClick={handleSetContentType(ExpandableContentType.Manage, setExpandableContentType)}
          >
            Edit
          </Button>
          <Button intent="primary" onClick={handleSetContentType(ExpandableContentType.Ping, setExpandableContentType)}>
            Ping
          </Button>
        </ButtonGroup>
      </FlexContainer>
    )}
    {expandableContentType === ExpandableContentType.Ping && (
      <WebhooksPingForm
        webhookModel={webhookModel}
        setIndexExpandedRow={setIndexExpandedRow}
        setExpandableContentType={setExpandableContentType}
      />
    )}
    {expandableContentType === ExpandableContentType.Manage && (
      <WebhooksManageForm
        webhookModel={webhookModel}
        setIndexExpandedRow={setIndexExpandedRow}
        setExpandableContentType={setExpandableContentType}
      />
    )}
  </>
)
