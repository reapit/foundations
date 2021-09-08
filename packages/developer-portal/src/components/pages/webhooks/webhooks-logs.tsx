import React, { FC, useEffect, useMemo } from 'react'
import { elSpan2, Row, Table } from '@reapit/elements'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { selectWebhookLogs } from '../../../selector/webhook-logs'
import { fetchWebhookLogs } from '../../../actions/webhook-logs/webhook-logs'
import { saveAs } from 'file-saver'
import { logger } from '../../../../../utils'
import { Loader } from '@reapit/elements'
import { WebhookQueryParams } from './webhooks'
import { WebhookLogModel } from '../../../services/webhooks'

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

export const handleDownloadPayload = (payload: string) => () => {
  try {
    const dataBlob = new Blob([payload], { type: 'application/json;charset=utf-8;' })
    saveAs(dataBlob, 'webhook-logs-payload.json')
  } catch (err) {
    logger(err)
  }
}

export const handleSortTableData = (logs: WebhookLogModel[]) => (): Row[] =>
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
        value: log.topicId,
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
    expandableContent: {
      cellContent: 'blah',
      headerContent: 'Download Payload',
      isCallToAction: true,
      onClick: () => console.log('hi'),
    },
  }))

export const WebhooksLogs: FC<WebhooksLogsProps> = ({ webhookQueryParams }) => {
  const dispatch = useDispatch()
  const webhookLogs = useSelector(selectWebhookLogs)
  const { logs } = webhookLogs
  useEffect(handleFilterChange(dispatch, webhookQueryParams), [webhookQueryParams])
  const rows = useMemo(handleSortTableData(logs), [logs])

  return (
    <>
      {webhookLogs.logs.length ? <Table rows={rows} numberColumns={7} /> : null}
      {webhookLogs.isLoading && <Loader label="Loading" />}
    </>
  )
}
