import {
  elMl3,
  ElToggleItem,
  FlexContainer,
  InputGroup,
  Label,
  MultiSelectInput,
  Subtitle,
  Toggle,
  elP8,
  ButtonGroup,
  Button,
  useModal,
  BodyText,
  PersistentNotification,
  elMb6,
  FormLayout,
  InputWrapFull,
  InputWrap,
  elMb5,
  elMb11,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup, { boolean, object, string } from 'yup'
import errorMessages from '../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils-common'
import { useForm, UseFormGetValues } from 'react-hook-form'
import { TopicModel, UpdateWebhookModel, WebhookModel } from '../../types/webhooks'
import { searchMinWidth } from './__styles__'
import { handleInstallationsToOptions } from './webhooks-new-customers'
import { cx } from '@linaria/core'
import { ExpandableContentType } from './webhooks-manage'
import { useWebhooksState } from './state/use-webhooks-state'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { FreeformMultiSelectInput } from '../freeform-multi-select'

interface WebhooksManageFormProps {
  webhookModel: WebhookModel
  setIndexExpandedRow: Dispatch<SetStateAction<number | null>>
  setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>
  refreshSubscriptions: () => void
}

export interface EditWebhookFormSchema {
  url: string
  topicIds: string
  customerIds?: string
  ignoreEtagOnlyChanges?: boolean
  active?: boolean
  extraFields?: string
}

const schema: Yup.SchemaOf<EditWebhookFormSchema> = object().shape({
  url: string().trim().required(errorMessages.FIELD_REQUIRED).matches(httpsUrlRegex, 'Should be a secure https url'),
  topicIds: string().trim().required('At least one topic is required'),
  customerIds: string(),
  extraFields: string().trim(),
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
  (updateWebhook: SendFunction<UpdateWebhookModel, boolean>, webhookModel: WebhookModel) =>
  (values: EditWebhookFormSchema) => {
    const { id, applicationId } = webhookModel
    const { url, topicIds, customerIds, ignoreEtagOnlyChanges, active, extraFields } = values

    if (!id || !applicationId) return

    const splitCustomerIds = (customerIds || '').split(',').filter(Boolean)
    const customers = (customerIds || '').includes('ALL') ? [] : splitCustomerIds
    const topics = topicIds.split(',').filter(Boolean)

    const editWebhookParams: UpdateWebhookModel = {
      url,
      topicIds: topics,
      customerIds: customers,
      extraFields: extraFields?.split(','),
      ignoreEtagOnlyChanges,
      active,
    }

    updateWebhook(editWebhookParams)
  }

export const handleWebhookEditing =
  (
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
    refreshSubscriptions: () => void,
    updateWebhookSuccess?: boolean,
    deleteWebhookSuccess?: boolean,
  ) =>
  () => {
    if (updateWebhookSuccess || deleteWebhookSuccess) {
      setIndexExpandedRow(null)
      setExpandableContentType(ExpandableContentType.Controls)
      refreshSubscriptions()
    }
  }

export const handleWebhookDelete = (deleteWebhook: SendFunction<undefined, boolean>, closeModal: () => void) => () => {
  deleteWebhook(undefined)
  closeModal()
}

export const handleCollapseRow =
  (
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
  ) =>
  () => {
    setIndexExpandedRow(null)
    setExpandableContentType(ExpandableContentType.Controls)
  }

export const WebhooksManageForm: FC<WebhooksManageFormProps> = ({
  webhookModel,
  setIndexExpandedRow,
  setExpandableContentType,
  refreshSubscriptions,
}) => {
  const { webhooksDataState } = useWebhooksState()
  const { installations, topics } = webhooksDataState
  const { id, url, topicIds, customerIds, ignoreEtagOnlyChanges, extraFields, active } = webhookModel
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
      extraFields: [...new Set(extraFields)].toString(),
      active,
    },
  })

  const [, webhookUpdating, updateWebhook, updateWebhookSuccess] = useReapitUpdate<UpdateWebhookModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateWebhook],
    method: 'PUT',
    uriParams: { webhookId: webhookModel.id },
  })

  const [, webhookDeleting, deleteWebhook, deleteWebhookSuccess] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteWebhook],
    method: 'DELETE',
    uriParams: { webhookId: webhookModel.id },
  })

  const customerOptions = useMemo(handleInstallationsToOptions(installations?.data ?? []), [installations])
  const topicOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))
  const isLoading = webhookDeleting || webhookUpdating

  useEffect(
    handleWebhookEditing(
      setIndexExpandedRow,
      setExpandableContentType,
      refreshSubscriptions,
      updateWebhookSuccess,
      deleteWebhookSuccess,
    ),
    [updateWebhookSuccess, deleteWebhookSuccess],
  )

  return (
    <form className={elP8} onSubmit={handleSubmit(handleSubmitWebhook(updateWebhook, webhookModel))}>
      <FlexContainer className={elMb11} isFlexAlignCenter isFlexJustifyBetween>
        <Subtitle hasBoldText>Edit Webhook</Subtitle>
        <ButtonGroup alignment="right">
          <Button intent="neutral" type="button" disabled={isLoading} loading={isLoading} onClick={openModal}>
            Delete
          </Button>
          <Button
            intent="primary"
            type="button"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleCollapseRow(setIndexExpandedRow, setExpandableContentType)}
          >
            Cancel
          </Button>
          <Button intent="primary" chevronRight type="submit" disabled={isLoading} loading={isLoading}>
            Update
          </Button>
        </ButtonGroup>
      </FlexContainer>
      <FormLayout>
        <InputWrapFull>
          <InputGroup
            placeholder="Enter secure https:// url"
            label="Webhook URL"
            {...register('url')}
            inputAddOnText={errors.url?.message}
            intent="danger"
          />
        </InputWrapFull>
        <InputWrapFull>
          <FlexContainer className={elMb5} isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
            <InputGroup
              label="Subscription topics"
              className={searchMinWidth}
              onChange={handleSearchTopics(topics, getValues, setFilteredTopics)}
              icon="searchSystem"
              placeholder="Search topics to get started"
            />
          </FlexContainer>
          <MultiSelectInput
            id={`topic-edit-ids-${id}`}
            defaultValues={[...new Set(topicIds)]}
            options={topicOptions}
            {...register('topicIds')}
          />
          {errors.topicIds && (
            <PersistentNotification className={elMb6} isFullWidth isExpanded intent="danger" isInline>
              {errors.topicIds.message}
            </PersistentNotification>
          )}
        </InputWrapFull>
        <InputWrapFull>
          <Label className={cx(elMl3, elMb5)}>Subscription customers</Label>
          <MultiSelectInput
            id={`customer-edit-ids-${id}`}
            defaultValues={customerIds?.length ? [...new Set(customerIds)] : ['ALL']}
            options={customerOptions}
            {...register('customerIds')}
          />
        </InputWrapFull>

        <InputWrapFull>
          <FreeformMultiSelectInput
            id={`semi-structured-fields-${id}`}
            defaultValues={[...new Set(extraFields)]}
            {...register('extraFields')}
          />
          {errors.extraFields && (
            <PersistentNotification className={elMb6} isFullWidth isExpanded intent="danger" isInline>
              {errors.extraFields.message}
            </PersistentNotification>
          )}
        </InputWrapFull>
        <InputWrap>
          <Label>Status</Label>
          <Toggle id={`status-edit-toggle-${id}`} hasGreyBg {...register('active')}>
            <ElToggleItem>Active</ElToggleItem>
            <ElToggleItem>Inactive</ElToggleItem>
          </Toggle>
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
      <DeleteConfirmModal title="Delete Webhook">
        <BodyText hasGreyText>Are you sure you want to delete this webhook?</BodyText>
        <BodyText>{url}</BodyText>
        <BodyText hasGreyText>
          By clicking ‘Confirm’ the system will remove this webhook and any stored configurations. Please click
          ‘Confirm’ to continue with deletion.
        </BodyText>
        <FlexContainer isFlexJustifyCenter>
          <ButtonGroup>
            <Button intent="primary" onClick={closeModal}>
              Cancel
            </Button>
            <Button intent="danger" onClick={handleWebhookDelete(deleteWebhook, closeModal)}>
              Confirm
            </Button>
          </ButtonGroup>
        </FlexContainer>
      </DeleteConfirmModal>
    </form>
  )
}
