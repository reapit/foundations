import { Loader, PersistantNotification, RowProps, StatusIndicator, Table } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { fetchWebhooksSubscriptions } from '../../../actions/webhooks-subscriptions'
import {
  selectCustomers,
  selectLoading,
  selectSubscriptionsData,
  selectSubscriptionsLoading,
  selectWebhookSubscriptionTopics,
} from '../../../selector/webhooks-subscriptions'
import { TopicModel, WebhookModel } from '../../../services/webhooks'
import { WebhookQueryParams } from './webhooks'
import { WebhooksEditControls } from './webhooks-edit-controls'

export interface WebhooksManageProps {
  webhookQueryParams: WebhookQueryParams
}

export enum ExpandableContentType {
  Controls,
  Manage,
  Ping,
}

export const renderTopicName = (topics: TopicModel[], subscriptionTopicIds?: string[]): string => {
  const subscriptionTopics = topics.filter((topic) => subscriptionTopicIds?.includes(topic.id as string))
  return subscriptionTopics
    .map((topic) => topic.name)
    .filter(Boolean)
    .join(' ')
}

export const renderCustomerName = (customers: InstallationModel[], customerIds?: string[]): string => {
  if (customerIds && customerIds.length) {
    const uniqueIds = [...new Set(customerIds)]
    return uniqueIds
      .map((id) => {
        const foundCustomer = customers.find((customer) => customer.customerId === id)
        if (foundCustomer) return foundCustomer.customerName
      })
      .filter(Boolean)
      .join(', ')
  }
  return 'All Customers'
}

export const handleSortTableData =
  (
    setExpandableContentType: Dispatch<SetStateAction<ExpandableContentType>>,
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    expandableContentType: ExpandableContentType,
    subscriptions: WebhookModel[],
    topics: TopicModel[],
    customers: InstallationModel[],
  ) =>
  (): RowProps[] => {
    return subscriptions.map((subscription: WebhookModel) => ({
      cells: [
        {
          label: 'URL',
          value: subscription.url ?? '',
          cellHasDarkText: true,
        },
        {
          label: 'Topics',
          value: renderTopicName(topics, subscription.topicIds),
        },
        {
          label: 'Customer',
          value: renderCustomerName(customers, subscription.customerIds),
        },
        {
          label: 'Status',
          value: subscription.active ? 'Active' : 'Inactive',
          children: (
            <>
              <StatusIndicator intent={subscription.active ? 'success' : 'neutral'} />{' '}
              {subscription.active ? 'Active' : 'Inactive'}
            </>
          ),
        },
      ],
      expandableContent: {
        content: (
          <WebhooksEditControls
            setIndexExpandedRow={setIndexExpandedRow}
            expandableContentType={expandableContentType}
            setExpandableContentType={setExpandableContentType}
            webhookModel={subscription}
          />
        ),
      },
    }))
  }

export const WebhooksManage: FC<WebhooksManageProps> = ({ webhookQueryParams }) => {
  const dispatch = useDispatch()
  const [pageNumber] = useState<number>(1)
  const [expandableContentType, setExpandableContentType] = useState<ExpandableContentType>(
    ExpandableContentType.Controls,
  )
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const subscriptionsData = useSelector(selectSubscriptionsData)
  const subscriptionsLoading = useSelector(selectSubscriptionsLoading)
  const customers = useSelector(selectCustomers)
  const customersLoading = useSelector(selectLoading)
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const { applicationId } = webhookQueryParams

  const rows = useMemo(
    handleSortTableData(
      setExpandableContentType,
      setIndexExpandedRow,
      expandableContentType,
      subscriptionsData?._embedded ?? [],
      topics,
      customers,
    ),
    [subscriptionsData, topics, customers, expandableContentType],
  )

  useEffect(() => {
    if (applicationId) {
      dispatch(fetchWebhooksSubscriptions({ applicationId: [applicationId] as string[], pageNumber }))
    }
  }, [applicationId, pageNumber])

  if (!webhookQueryParams.applicationId)
    return (
      <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
        No app selected from the left hand side menu. Select an app to get started.
      </PersistantNotification>
    )
  if (subscriptionsLoading || customersLoading) return <Loader label="loading" />
  if (!rows.length)
    return (
      <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
        No webhooks found for your application. You can create one from the New Webhook wizard.
      </PersistantNotification>
    )
  return <Table indexExpandedRow={indexExpandedRow} setIndexExpandedRow={setIndexExpandedRow} rows={rows} />
}
