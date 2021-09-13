import {
  ColSplit,
  elMb7,
  elMl3,
  elMt1,
  elToggleItem,
  FlexContainer,
  Grid,
  InputGroup,
  Label,
  MultiSelectInput,
  Subtitle,
  Toggle,
  elP8,
  elMb11,
  ButtonGroup,
  Button,
  elMlAuto,
  useSnack,
  ExpandableContentSize,
  useModal,
  BodyText,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils'
import { useForm, UseFormGetValues } from 'react-hook-form'
import { Dispatch as ReduxDispatch } from 'redux'
import {
  deleteWebhook,
  editWebhook,
  EditWebhookParams,
  updateWebhookCreateEditState,
} from '../../../actions/webhooks-subscriptions'
import { WebhookCreateEditState } from '../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { useDispatch, useSelector } from 'react-redux'
import { TopicModel, WebhookModel } from '../../../services/webhooks'
import { searchMinWidth } from './__styles__'
import {
  selectCustomers,
  selectWebhookCreateEditState,
  selectWebhookSubscriptionTopics,
} from '../../../selector/webhooks-subscriptions'
import { handleCustomersToOptions } from './webhooks-new-customers'
import { cx } from '@linaria/core'

interface WebhooksManageFormProps {
  webhookModel: WebhookModel
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
  setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>
}

export interface EditWebhookFormSchema {
  url: string
  topicIds: string
  customerIds: string
  ignoreEtagOnlyChanges: boolean
  active: boolean
}

const schema = object().shape<EditWebhookFormSchema>({
  url: string().trim().required(errorMessages.FIELD_REQUIRED).matches(httpsUrlRegex, 'Should be a secure https url'),
  topicIds: string(),
  customerIds: string(),
  ignoreEtagOnlyChanges: boolean(),
  active: boolean(),
})

export const handleSearchTopics =
  (
    topics: TopicModel[],
    getValues: UseFormGetValues<EditWebhookFormSchema>,
    setFilteredTopics: Dispatch<SetStateAction<TopicModel[]>>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    const selectedTopics = getValues().topicIds?.split(',')
    const filteredTopics = search
      ? topics.filter(
          (topic) =>
            (topic.name?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
            selectedTopics?.includes(topic.id ?? ''),
        )
      : topics.filter((topic) => selectedTopics?.includes(topic.id ?? ''))
    setFilteredTopics(filteredTopics)
  }

export const getInitialTopics = (topics: TopicModel[], topicIds?: string[]) => {
  return topics.filter((topic) => topicIds?.includes(topic.id ?? ''))
}

export const handleSubmitWebhook =
  (dispatch: ReduxDispatch, webhookModel: WebhookModel) => (values: EditWebhookFormSchema) => {
    const { id: webhookId, applicationId } = webhookModel
    const { url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = values

    if (!webhookId || !applicationId) return

    const editWebhookParams: EditWebhookParams = {
      webhookId,
      applicationId,
      url,
      topicIds: topicIds.split(','),
      customerIds: customerIds.split(','),
      ignoreEtagOnlyChanges,
      active,
    }
    dispatch(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
    dispatch(editWebhook(editWebhookParams))
  }

export const handleWebhookEditing =
  (
    success: (text: string, timeout?: number | undefined) => void,
    error: (text: string, timeout?: number | undefined) => void,
    webhookCreateEditState: WebhookCreateEditState,
    dispatch: ReduxDispatch,
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>,
  ) =>
  () => {
    if (webhookCreateEditState === WebhookCreateEditState.SUCCESS) {
      success('Webhook was successfully updated')
      dispatch(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
      setIndexExpandedRow(null)
      setExpandableContentSize('small')
    }

    if (webhookCreateEditState === WebhookCreateEditState.ERROR) {
      error('Webhook failed to update, check the details supplied and try again')
      dispatch(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
    }
  }

export const handleWebhookDelete =
  (dispatch: ReduxDispatch, webhookModel: WebhookModel, closeModal: () => void) => () => {
    const { id: webhookId, applicationId } = webhookModel
    if (!webhookId || !applicationId) return
    dispatch(deleteWebhook({ webhookId, applicationId }))
    closeModal()
  }

export const handleCollapseRow =
  (
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentSize: Dispatch<SetStateAction<ExpandableContentSize>>,
  ) =>
  () => {
    setIndexExpandedRow(null)
    setExpandableContentSize('small')
  }

export const WebhooksManageForm: FC<WebhooksManageFormProps> = ({
  webhookModel,
  setIndexExpandedRow,
  setExpandableContentSize,
}) => {
  const dispatch = useDispatch()
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const customers = useSelector(selectCustomers)
  const webhookCreateEditState = useSelector(selectWebhookCreateEditState)
  const { success, error } = useSnack()
  const { id, url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = webhookModel
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>(getInitialTopics(topics, topicIds))
  const { Modal: DeleteConfirmModal, openModal, closeModal } = useModal()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<EditWebhookFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      url,
      topicIds: [...new Set(topicIds)].toString(),
      customerIds: [...new Set(customerIds)].toString(),
      ignoreEtagOnlyChanges,
      active,
    },
  })

  const customerOptions = useMemo(handleCustomersToOptions(customers), [customers])
  const topicOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))

  useEffect(
    handleWebhookEditing(
      success,
      error,
      webhookCreateEditState,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentSize,
    ),
    [webhookCreateEditState],
  )

  return (
    <form className={elP8} onSubmit={handleSubmit(handleSubmitWebhook(dispatch, webhookModel))}>
      <Subtitle className={elMl3}>Edit Webhook</Subtitle>
      <InputGroup
        className={elMb11}
        placeholder="Enter secure https:// url"
        label="Webhook URL"
        {...register('url')}
        inputAddOnText={errors?.url?.message}
        intent="danger"
      />
      <Grid>
        <ColSplit>
          <FlexContainer className={elMb7} isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
            <Label className={elMl3}>Subscription topics</Label>
            <InputGroup
              className={searchMinWidth}
              onChange={handleSearchTopics(topics, getValues, setFilteredTopics)}
              icon="searchSystem"
              placeholder="Search"
            />
          </FlexContainer>
          <MultiSelectInput
            className={elMb7}
            id={`topic-edit-ids-${id}`}
            hasGreyChips
            defaultValues={[...new Set(topicIds)]}
            options={topicOptions}
            {...register('topicIds')}
          />
          <Label className={elMl3}>Subscription customers</Label>
          <MultiSelectInput
            className={elMb7}
            id={`customer-edit-ids-${id}`}
            hasGreyChips
            defaultValues={[...new Set(customerIds)]}
            options={customerOptions}
            {...register('customerIds')}
          />
        </ColSplit>
        <ColSplit>
          <Grid>
            <ColSplit>
              <Label>Status</Label>
              <Toggle
                className={cx(elMt1, elMb11)}
                id={`status-edit-toggle-${id}`}
                hasGreyBg
                isFullWidth
                {...register('active')}
              >
                <span className={elToggleItem}>Active</span>
                <span className={elToggleItem}>Inactive</span>
              </Toggle>
            </ColSplit>
          </Grid>
          <InputGroup
            className={elMb11}
            type="checkbox"
            label="Ignore where only the etag has been modified"
            inputAddOnText="Ignore"
            {...register('ignoreEtagOnlyChanges')}
          />
          <ButtonGroup className={elMlAuto}>
            <Button
              intent="danger"
              type="button"
              disabled={webhookCreateEditState === WebhookCreateEditState.LOADING}
              onClick={openModal}
            >
              Delete
            </Button>
            <Button
              intent="secondary"
              type="button"
              disabled={webhookCreateEditState === WebhookCreateEditState.LOADING}
              onClick={handleCollapseRow(setIndexExpandedRow, setExpandableContentSize)}
            >
              Cancel
            </Button>
            <Button
              intent="primary"
              chevronRight
              type="submit"
              disabled={webhookCreateEditState === WebhookCreateEditState.LOADING}
            >
              Update
            </Button>
          </ButtonGroup>
          <DeleteConfirmModal title="Delete Webhook">
            <BodyText hasGreyText>Are you sure you want to delete this webhook?</BodyText>
            <BodyText>{url}</BodyText>
            <BodyText hasGreyText>
              By clicking ‘Delete’ it will remove the webhook and all its data Please click ‘Delete’ to continue with
              deletion.
            </BodyText>
            <FlexContainer isFlexJustifyCenter>
              <ButtonGroup>
                <Button intent="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button intent="danger" onClick={handleWebhookDelete(dispatch, webhookModel, closeModal)}>
                  Confirm
                </Button>
              </ButtonGroup>
            </FlexContainer>
          </DeleteConfirmModal>
        </ColSplit>
      </Grid>
    </form>
  )
}
