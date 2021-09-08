import { Row, StatusIndicator, Table } from '@reapit/elements'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { fetchWebhooksSubscriptions } from '../../../actions/webhooks-subscriptions'
import { fetchWebhooksTopics } from '../../../actions/webhooks-topics'
import { selectCustomers, selectSubscriptionsData } from '../../../selector/webhooks-subscriptions'
import { selectTopicsData } from '../../../selector/webhooks-topics'
import { TopicModel, WebhookModel } from '../../../services/webhooks'
import { WebhookQueryParams } from './webhooks'

export interface WebhooksManageProps {
  webhookQueryParams: WebhookQueryParams
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
  (subscriptions: WebhookModel[], topics: TopicModel[], customers: InstallationModel[]) => (): Row[] => {
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
        content: 'Some Content here',
      },
    }))
  }

export const WebhooksManage: FC<WebhooksManageProps> = ({ webhookQueryParams }) => {
  const dispatch = useDispatch()
  const [pageNumber] = useState<number>(1)
  const subscriptionsData = useSelector(selectSubscriptionsData)
  const customers = useSelector(selectCustomers)
  const topics = useSelector(selectTopicsData)
  const { applicationId } = webhookQueryParams

  const rows = useMemo(handleSortTableData(subscriptionsData?._embedded ?? [], topics, customers), [
    subscriptionsData,
    topics,
    customers,
  ])
  console.log(rows)
  useEffect(() => {
    if (applicationId) {
      dispatch(fetchWebhooksSubscriptions({ applicationId: [applicationId] as string[], pageNumber }))
      dispatch(fetchWebhooksTopics({ applicationId, pageNumber }))
    }
  }, [applicationId, pageNumber])

  return <Table rows={rows} expandableContentSize="large" />
}
