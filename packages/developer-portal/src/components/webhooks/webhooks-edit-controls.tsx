import { Button, ButtonGroup, FlexContainer } from '@reapit/elements'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { WebhookModel, WebhookPublicKeyResponse } from '../../types/webhooks'
import { WebhooksPingForm } from './webhook-ping-form'
import { ExpandableContentType } from './webhooks-manage'
import { WebhooksManageForm } from './webhooks-manage-form'

interface WebhooksEditControlsProps {
  webhookModel: WebhookModel
  expandableContentType: ExpandableContentType
  setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
  refreshSubscriptions: () => void
}

export const handleSetContentType =
  (
    expandableContentType: ExpandableContentType,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
  ) =>
  () => {
    setExpandableContentType(expandableContentType)
  }

export const handleCopyPublicKey = (setCopyState: Dispatch<SetStateAction<boolean>>) => () => {
  setCopyState(true)

  setTimeout(() => {
    setCopyState(false)
  }, 5000)
}

export const handleFetchKey = (setFetchKey: Dispatch<SetStateAction<boolean>>) => () => {
  setFetchKey(true)
}

export const WebhooksEditControls: FC<WebhooksEditControlsProps> = ({
  webhookModel,
  expandableContentType,
  setExpandableContentType,
  setIndexExpandedRow,
  refreshSubscriptions,
}) => {
  const [copyState, setCopyState] = useState<boolean>(false)
  const [fetchKey, setFetchKey] = useState<boolean>(false)

  const [publicKeyResponse, fetchingPublicKey] = useReapitGet<WebhookPublicKeyResponse>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPublicWebhookKey],
    queryParams: {
      applicationId: webhookModel.applicationId,
    },
    fetchWhenTrue: [webhookModel.applicationId, fetchKey],
  })

  return (
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
            <Button
              intent="primary"
              onClick={handleSetContentType(ExpandableContentType.Ping, setExpandableContentType)}
            >
              Ping
            </Button>
            {publicKeyResponse && publicKeyResponse.keys ? (
              <CopyToClipboard
                text={JSON.stringify(publicKeyResponse.keys[0])}
                onCopy={handleCopyPublicKey(setCopyState)}
              >
                <Button intent="neutral">{copyState ? 'Public Key Copied' : 'Copy Public Key'}</Button>
              </CopyToClipboard>
            ) : (
              <Button
                intent="primary"
                loading={fetchingPublicKey}
                disabled={fetchingPublicKey}
                onClick={handleFetchKey(setFetchKey)}
              >
                Fetch Public Key
              </Button>
            )}
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
          refreshSubscriptions={refreshSubscriptions}
        />
      )}
    </>
  )
}
