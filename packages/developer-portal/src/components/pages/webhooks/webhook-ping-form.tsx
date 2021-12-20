import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { updateWebhookCreateEditState } from '../../../actions/webhooks-subscriptions'
import { selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'
import { PingWebhooksByIdParams, WebhookModel } from '../../../services/webhooks'
import { developerSetWebhookPingStatus, developerWebhookPing } from '../../../actions/developer'
import Routes from '../../../constants/routes'
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
  useSnack,
  InputAddOn,
  elMb6,
  useModal,
  PersistantNotification,
  FlexContainer,
} from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Yup, { object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { handleCollapseRow } from './webhooks-manage-form'
import { WebhookCreateEditState } from '../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { link } from '../../../styles/elements/link'
import { openNewPage } from '../../../utils/navigation'
import { selectWebhookTestStatus } from '../../../selector'
import { WebhookPingTestStatus } from '../../../reducers/developer'
import { ExpandableContentType } from './webhooks-manage'

interface WebhooksPingFormProps {
  webhookModel: WebhookModel
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
  setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>
}

export const handlePingWebhook =
  (webhookModel: WebhookModel, dispatch: ReduxDispatch, setWebhookPingId: Dispatch<SetStateAction<string | null>>) =>
  (values: PingWebhookFormSchema) => {
    const { topicId } = values
    const { id: webhookId } = webhookModel
    if (!webhookId || !topicId) return
    const params: PingWebhooksByIdParams = {
      id: webhookId,
      topicId: topicId,
    }
    setWebhookPingId(webhookId)
    dispatch(developerWebhookPing(params))
  }

export const handleWebhookPing =
  (
    success: (text: string, timeout?: number | undefined) => void,
    dispatch: ReduxDispatch,
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
    setWebhookPingId: Dispatch<SetStateAction<string | null>>,
    openModal: () => void,
    webhookPingTestStatus: WebhookPingTestStatus,
    webhookPingId: string | null,
  ) =>
  () => {
    if (webhookPingTestStatus === 'SUCCESS') {
      success('Webhook was successfully pinged')
      dispatch(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
      setIndexExpandedRow(null)
      setExpandableContentType(ExpandableContentType.Controls)
      setWebhookPingId(null)
      dispatch(developerSetWebhookPingStatus(null))
    }

    if (webhookPingTestStatus === 'FAILED' && webhookPingId) {
      dispatch(developerSetWebhookPingStatus(null))
      setWebhookPingId(null)
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
  const dispatch = useDispatch()
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const { success } = useSnack()
  const [webhookPingId, setWebhookPingId] = useState<string | null>(null)
  const webhookPingTestStatus = useSelector(selectWebhookTestStatus)
  const { Modal: FailedConnectionModal, openModal, closeModal } = useModal()
  const { topicIds } = webhookModel
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PingWebhookFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      topicId: '',
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

  useEffect(
    handleWebhookPing(
      success,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentType,
      setWebhookPingId,
      openModal,
      webhookPingTestStatus,
      webhookPingId,
    ),
    [webhookPingTestStatus, webhookPingId],
  )

  return (
    <form className={elP8} onSubmit={handleSubmit(handlePingWebhook(webhookModel, dispatch, setWebhookPingId))}>
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
            <a className={link} onClick={openNewPage(`${Routes.API_DOCS}/api/webhooks#testing`)}>
              click here
            </a>
          </BodyText>
          <ButtonGroup className={elMlAuto}>
            <Button
              intent="secondary"
              type="button"
              disabled={webhookPingTestStatus === 'LOADING'}
              onClick={handleCollapseRow(setIndexExpandedRow, setExpandableContentType)}
            >
              Cancel
            </Button>
            <Button intent="primary" chevronRight type="submit" disabled={webhookPingTestStatus === 'LOADING'}>
              Test
            </Button>
          </ButtonGroup>
          <FailedConnectionModal title="Connection Unsuccessful">
            <PersistantNotification className={elMb6} isExpanded isInline isFullWidth intent="danger">
              Unfortunately the connection was unsuccessful, please check to ensure you have entered a valid URL.
            </PersistantNotification>
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
