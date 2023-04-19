import { elMb11, Loader, Pagination, PersistentNotification, RowProps, StatusIndicator, Table } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { TopicModel, WebhookModel, WebhookModelPagedResult } from '../../types/webhooks'
import { WebhooksEditControls } from './webhooks-edit-controls'
import { useWebhooksState } from './state/use-webhooks-state'
import { useReapitGet } from '@reapit/use-reapit-data'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

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

export const renderCustomerName = (installations: InstallationModel[], customerIds?: string[]): string => {
  if (customerIds && customerIds.length) {
    const uniqueIds = [...new Set(customerIds)]
    return uniqueIds
      .map((id) => {
        if (id === 'SBOX') return 'Sandbox Estates (SBOX)'
        const foundCustomer = installations.find((installation) => installation.customerId === id)
        if (foundCustomer) return `${foundCustomer.customerName} (${foundCustomer.customerId})`
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
    refreshSubscriptions: () => void,
    expandableContentType: ExpandableContentType,
    subscriptions: WebhookModel[],
    topics: TopicModel[],
    installations: InstallationModel[],
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
          value: renderCustomerName(installations, subscription.customerIds),
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
            refreshSubscriptions={refreshSubscriptions}
          />
        ),
      },
    }))
  }

export const WebhooksManage: FC = () => {
  const { webhooksFilterState, webhooksDataState } = useWebhooksState()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [expandableContentType, setExpandableContentType] = useState<ExpandableContentType>(
    ExpandableContentType.Controls,
  )
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { installations, topics } = webhooksDataState
  const { applicationId } = webhooksFilterState

  const [subscriptions, subscriptionsLoading, , refreshSubscriptions] = useReapitGet<WebhookModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getWebhookSubscriptions],
    queryParams: { applicationId, pageSize: 12, pageNumber },
    fetchWhenTrue: [applicationId],
  })

  const rows = useMemo(
    handleSortTableData(
      setExpandableContentType,
      setIndexExpandedRow,
      refreshSubscriptions,
      expandableContentType,
      subscriptions?._embedded ?? [],
      topics,
      installations?.data ?? [],
    ),
    [subscriptions, topics, installations, expandableContentType],
  )

  if (!applicationId)
    return (
      <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
        No app selected. Please use the filter option to select an app.
      </PersistentNotification>
    )
  if (subscriptionsLoading) return <Loader />
  if (!rows.length)
    return (
      <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
        No webhooks found for your application. You can create one from the New Webhook wizard.
      </PersistentNotification>
    )
  return (
    <>
      <Table
        className={elMb11}
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={rows}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((subscriptions?.totalCount ?? 1) / (subscriptions?.pageSize ?? 1))}
      />
    </>
  )
}

export default WebhooksManage
