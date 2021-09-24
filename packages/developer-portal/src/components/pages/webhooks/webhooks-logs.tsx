import React, { FC, useEffect, useMemo } from 'react'
import { elSpan2, PersistantNotification, RowProps, Table } from '@reapit/elements'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { selectWebhookLogs } from '../../../selector/webhook-logs'
import { fetchWebhookLogs } from '../../../actions/webhook-logs/webhook-logs'
import { saveAs } from 'file-saver'
import { logger } from '../../../../../utils'
import { Loader } from '@reapit/elements'
import { WebhookQueryParams } from './webhooks'
import { TopicModel, WebhookLogModel } from '../../../services/webhooks'
import { selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'

interface WebhooksLogsProps {
  webhookQueryParams: WebhookQueryParams
}

export interface WebhookLogsQuery {
  from: string
  to: string
  applicationId: string
}

export interface WebhookLogsForm {
  from: Date
  to: Date
  applicationId: string
}

export const handleFilterChange = (dispatch: Dispatch, webhookQueryParams: WebhookQueryParams) => () => {
  const { to, from, applicationId } = webhookQueryParams
  if (!applicationId || !to || !from) return
  const formattedFrom = dayjs(from).format('YYYY-MM-DDTHH:mm:ss')
  const formattedTo = dayjs(to).format('YYYY-MM-DDTHH:mm:ss')
  const payload: WebhookLogsQuery = {
    applicationId,
    from: formattedFrom,
    to: formattedTo,
  }
  dispatch(fetchWebhookLogs(payload))
}

export const handleDownloadPayload = (payload: string, timestamp: string) => () => {
  try {
    const dataBlob = new Blob([payload], { type: 'application/json;charset=utf-8;' })
    saveAs(dataBlob, `reapit-webhook-logs-payload-${timestamp}.json`)
  } catch (err) {
    logger(err)
  }
}

export const renderTopicName = (topics: TopicModel[], topicId?: string): string => {
  const subscriptionTopic = topics.find((topic) => topic.id === topicId)
  return subscriptionTopic && subscriptionTopic.name ? subscriptionTopic.name : topicId ?? ''
}

export const handleSortTableData = (logs: WebhookLogModel[], topics: TopicModel[]) => (): RowProps[] =>
  logs.map((log: WebhookLogModel) => ({
    cells: [
      {
        label: 'Timestamp',
        value: log.timeStamp ?? '',
        className: elSpan2,
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'URL',
        value: log.url ?? '',
        cellHasDarkText: true,
        className: elSpan2,
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Topic',
        value: renderTopicName(topics, log.topicId),
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Status',
        value: String(log.statusCode),
        narrowTable: {
          showLabel: true,
        },
      },
    ],
    ctaContent: {
      icon: 'downloadSystem',
      headerContent: 'Download Payload',
      isCallToAction: true,
      onClick: handleDownloadPayload(log.payload, log.timeStamp),
    },
  }))

export const WebhooksLogs: FC<WebhooksLogsProps> = ({ webhookQueryParams }) => {
  const dispatch = useDispatch()
  const webhookLogs = useSelector(selectWebhookLogs)
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const { logs, isLoading } = webhookLogs
  const { applicationId, from, to } = webhookQueryParams

  useEffect(handleFilterChange(dispatch, webhookQueryParams), [webhookQueryParams])
  const rows = useMemo(handleSortTableData(logs, topics), [logs, topics])

  if (!applicationId || !from || !to)
    return (
      <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
        One or more filters not selected from the left hand side menu. Select an app and a date range to get started.
      </PersistantNotification>
    )
  if (isLoading) return <Loader label="loading" />
  if (!logs.length || !rows.length)
    return (
      <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
        No logs found for this application. Select another app, date range or trigger a webhook to see the logs appear
        here.
      </PersistantNotification>
    )

  return <Table rows={rows} numberColumns={7} />
}
