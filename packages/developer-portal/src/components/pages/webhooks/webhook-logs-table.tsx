import React from 'react'
import {
  DatePicker,
  Form,
  Formik,
  GridFourCol,
  GridFourColItem,
  H5,
  SelectBox,
  SelectBoxOptions,
  Table,
} from '@reapit/elements'
import FormikAutoSave from '../../../components/hocs/formik-auto-save'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { selectWebhookLogs } from '../../../selector/webhook-logs'
import { fetchWebhookLogs } from '../../../actions/webhook-logs/webhook-logs'
import { saveAs } from 'file-saver'
import { logger } from '../../../../../utils'
import { Loader } from '@reapit/elements/v3'

interface WebhooksLogsTableProps {
  applicationOptions: SelectBoxOptions[]
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

const intitialFormValues: WebhookLogsForm = {
  from: dayjs().subtract(1, 'week').toDate(),
  to: dayjs().toDate(),
  applicationId: '',
}

export const handleFilterChange = (dispatch: Dispatch) => (values: WebhookLogsForm) => {
  if (!values.applicationId) return
  const from = values.from ? dayjs(values.from).format('YYYY-MM-DDTHH:mm:ss') : ''
  const to = values.to ? dayjs(values.to).format('YYYY-MM-DDTHH:mm:ss') : ''
  const payload: WebhookLogsQuery = {
    ...values,
    from,
    to,
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

export const WebhooksLogsTable: React.FC<WebhooksLogsTableProps> = ({ applicationOptions }) => {
  const dispatch = useDispatch()
  const webhookLogs = useSelector(selectWebhookLogs)

  return (
    <>
      <H5>Transaction Logs</H5>
      <Formik initialValues={intitialFormValues} enableReinitialize={true} onSubmit={() => {}}>
        {() => (
          <Form>
            <GridFourCol>
              <GridFourColItem>
                <DatePicker
                  name="from"
                  labelText="From"
                  id="from"
                  reactDatePickerProps={{
                    maxDate: dayjs().subtract(1, 'day').toDate(),
                  }}
                />
              </GridFourColItem>
              <GridFourColItem>
                <DatePicker
                  name="to"
                  labelText="To"
                  id="to"
                  reactDatePickerProps={{
                    maxDate: dayjs().toDate(),
                  }}
                />
              </GridFourColItem>
              <GridFourColItem>
                <SelectBox name="applicationId" options={applicationOptions} labelText="App" id="subscription" />
              </GridFourColItem>
              <GridFourColItem />
              <FormikAutoSave onSave={handleFilterChange(dispatch)} />
            </GridFourCol>
          </Form>
        )}
      </Formik>
      {webhookLogs.logs.length ? (
        <Table
          columns={[
            {
              Header: 'Timestamp',
              accessor: 'timeStamp',
              Cell: ({ value }) => dayjs(value).format('DD-MM-YYYY HH:mm:ss'),
            },
            {
              Header: 'Url',
              accessor: 'url',
            },
            {
              Header: 'Topic',
              accessor: 'topicId',
              Cell: ({ value }) => webhookLogs.topics.find((topic) => topic.id === value)?.name ?? value,
            },
            {
              Header: 'Status',
              accessor: 'statusCode',
            },
            {
              Header: 'Payload',
              accessor: 'payload',
              Cell: ({ value }) => <a onClick={handleDownloadPayload(value)}>Download</a>,
            },
          ]}
          data={webhookLogs.logs}
          scrollable
        />
      ) : null}
      {webhookLogs.isLoading && <Loader label="Loading" />}
    </>
  )
}
