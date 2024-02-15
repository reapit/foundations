import React, { FC, useMemo } from 'react'
import { elSpan2, PersistentNotification, RowProps, Table, useSnack } from '@reapit/elements'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'
import { logger } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'
import { TopicModel, WebhookLogModel } from '../../types/webhooks'
import { useWebhooksState } from './state/use-webhooks-state'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'

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

export const handleDownloadPayload = (payload: string, timestamp: string) => () => {
  try {
    const dataBlob = new Blob([payload], { type: 'application/json;charset=utf-8;' })
    saveAs(dataBlob, `reapit-webhook-logs-payload-${timestamp}.json`)
  } catch (err) {
    logger(err as Error)
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
        label: 'Entity ID',
        value: log.entityId,
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
      icon: 'fileDownload',
      headerContent: 'Download Payload',
      isCallToAction: true,
      onClick: handleDownloadPayload(log.payload, log.timeStamp),
    },
  }))

export const WebhooksLogs: FC = () => {
  const { webhooksFilterState, webhooksDataState } = useWebhooksState()
  const { error } = useSnack()
  const { applicationId, entityId, eventId, topicId, from, to } = webhooksFilterState
  const { topics } = webhooksDataState

  const baseQuery = {
    applicationId,
    from: dayjs(from).format('YYYY-MM-DDTHH:mm:ss'),
    to: dayjs(to).add(1, 'day').subtract(1, 'second').format('YYYY-MM-DDTHH:mm:ss'),
  }

  const entityIdQuery = entityId ? { entityId } : {}
  const eventIdQuery = eventId ? { eventId } : {}
  const topicIdQuery = topicId ? { topicId } : {}

  const queryParams = { ...baseQuery, ...entityIdQuery, ...eventIdQuery, ...topicIdQuery }

  const [logs, logsLoading] = useReapitGet<WebhookLogModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getWebhookLogs],
    queryParams,
    fetchWhenTrue: [applicationId, from, to],
    onError: (err: string) => {
      console.error(err)
      error('Something went wrong fetching webhook logs. Please adjust your query and try again')
    },
  })

  const rows = useMemo(handleSortTableData(logs ?? [], topics), [logs, topics])

  if (!applicationId || !from || !to)
    return (
      <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
        No app or date range selected. Please use the filters option to get started.
      </PersistentNotification>
    )
  if (logsLoading) return <Loader />
  if (!logs?.length || !rows.length)
    return (
      <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
        No logs found for this application. Select another app, date range or trigger a webhook to see the logs appear
        here.
      </PersistentNotification>
    )

  return <Table rows={rows} numberColumns={8} />
}

export default WebhooksLogs
