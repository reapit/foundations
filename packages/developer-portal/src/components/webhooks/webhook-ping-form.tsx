import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { PingEndpointModel, WebhookModel } from '../../types/webhooks'
import Routes from '../../constants/routes'
import {
  elP8,
  Subtitle,
  elMl3,
  InputGroup,
  Button,
  Label,
  ColSplit,
  Grid,
  ButtonGroup,
  elMlAuto,
  Select,
  BodyText,
  InputAddOn,
  elMb6,
  useModal,
  PersistentNotification,
  FlexContainer,
} from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Yup, { object, string } from 'yup'
import errorMessages from '../../constants/error-messages'
import { handleCollapseRow } from './webhooks-manage-form'
import { openNewPage } from '../../utils/navigation'
import { ExpandableContentType } from './webhooks-manage'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { useWebhooksState } from './state/use-webhooks-state'

interface WebhooksPingFormProps {
  webhookModel: WebhookModel
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
  setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>
}

export const handlePingWebhook =
  (webhookModel: WebhookModel, pingWebhook: SendFunction<PingEndpointModel, boolean>) =>
  (values: PingWebhookFormSchema) => {
    const { topicId } = values
    const { id: webhookId } = webhookModel
    if (!webhookId || !topicId) return
    const params: PingEndpointModel = {
      topicId,
    }
    pingWebhook(params)
  }

export const handleWebhookPing =
  (
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
    openModal: () => void,
    pingError: string | null,
    pingSuccess?: boolean,
  ) =>
  () => {
    if (pingSuccess) {
      setIndexExpandedRow(null)
      setExpandableContentType(ExpandableContentType.Controls)
    }

    if (pingError) {
      openModal()
    }
  }

export interface PingWebhookFormSchema {
  topicId: string
}

const schema: Yup.SchemaOf<PingWebhookFormSchema> = object().shape({
  topicId: string().trim().required(errorMessages.FIELD_REQUIRED),
})

export const WebhooksPingForm: FC<WebhooksPingFormProps> = ({
  webhookModel,
  setIndexExpandedRow,
  setExpandableContentType,
}) => {
  const { webhooksDataState } = useWebhooksState()
  const { Modal: FailedConnectionModal, openModal, closeModal } = useModal()
  const { topics } = webhooksDataState
  const { topicIds } = webhookModel
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PingWebhookFormSchema>({
    resolver: yupResolver(schema),
  })

  const [, pingingWebhook, pingWebhook, pingSuccess, pingError] = useReapitUpdate<PingEndpointModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.pingWebhook],
    method: 'POST',
    uriParams: {
      subscriptionId: webhookModel.id,
    },
  })

  const topicOptions = topicIds?.map((topicId) => {
    const topic = topics.find((topicItem) => topicItem.id === topicId)
    if (topic) {
      return {
        name: topic.name ?? '',
        value: topic.id ?? '',
      }
    }
  })

  useEffect(handleWebhookPing(setIndexExpandedRow, setExpandableContentType, openModal, pingError, pingSuccess), [
    pingSuccess,
    pingError,
  ])

  return (
    <form className={elP8} onSubmit={handleSubmit(handlePingWebhook(webhookModel, pingWebhook))}>
      <Subtitle className={elMl3}>Test Webhook Subscription</Subtitle>
      <Grid>
        <ColSplit>
          <Label className={elMl3}>Subscription topics</Label>
          <InputGroup>
            <Select {...register('topicId')}>
              <option key="default-option" value="">
                None selected
              </option>
              {topicOptions?.map((topic) => (
                <option key={topic?.value} value={topic?.value}>
                  {topic?.name}
                </option>
              ))}
            </Select>
            {errors.topicId && <InputAddOn intent="danger">{errors.topicId.message}</InputAddOn>}
          </InputGroup>
        </ColSplit>
        <ColSplit>
          <BodyText>
            To test your Webhook subscription, please select a subscription topic and an example payload for that topic
            will be sent to the configured URL. For more information, please{' '}
            <a onClick={openNewPage(`${Routes.API_DOCS}/api/webhooks#testing`)}>click here</a>
          </BodyText>
          <ButtonGroup className={elMlAuto} alignment="right">
            <Button
              intent="primary"
              type="button"
              disabled={pingingWebhook}
              onClick={handleCollapseRow(setIndexExpandedRow, setExpandableContentType)}
            >
              Cancel
            </Button>
            <Button intent="primary" type="submit" disabled={pingingWebhook}>
              Test
            </Button>
          </ButtonGroup>
          <FailedConnectionModal title="Connection Unsuccessful">
            <PersistentNotification className={elMb6} isExpanded isInline isFullWidth intent="danger">
              Unfortunately the connection was unsuccessful, please check to ensure you have entered a valid URL.
            </PersistentNotification>
            <FlexContainer isFlexJustifyCenter>
              <Button intent="danger" onClick={closeModal}>
                OK
              </Button>
            </FlexContainer>
          </FailedConnectionModal>
        </ColSplit>
      </Grid>
    </form>
  )
}
