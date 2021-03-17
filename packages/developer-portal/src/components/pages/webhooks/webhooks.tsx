import React, { ReactElement } from 'react'
import qs from 'query-string'
import { History } from 'history'
import { Loader, Content, SelectBoxOptions, Section } from '@reapit/elements'
import { useSelector, useDispatch } from 'react-redux'
import { SelectBox, H3, LevelRight, Button, Table } from '@reapit/elements'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import { Form, Formik } from 'formik'
import { fetchWebhooksSubscriptions } from '@/actions/webhooks-subscriptions'
import { webhookSetOpenModal } from '@/actions/webhooks-subscriptions'
import { selectSubscriptionsData, selectSubscriptionsLoading } from '@/selector/webhooks-subscriptions'
import { selectWebhookEditModalType } from '@/selector/webhooks-subscriptions'
import { selectTopicsData } from '@/selector/webhooks-topics'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import WebhookEditModal from './webhook-edit-modal'
import { selectDeveloper } from '@/selector/developer'
import WebhookTestModal from './webhook-test-modal'
import { link, hyperlinked } from '@/styles/elements/link'
import Routes from '@/constants/routes'
import { selectAppListState } from '@/selector/apps/app-list'
import { fetchWebhooksTopics } from '@/actions/webhooks-topics'
import { useHistory } from 'react-router-dom'
import { TopicModel, WebhookModel } from '@/services/webhooks'
import { URLS } from '@/services/constants'
import FadeIn from '../../../styles/fade-in'

export type DeveloperWebhooksProps = {}

export type WebhooksFormValues = {
  applicationId: string
}

export const CreatedCell = ({ cell: { value } }): ReactElement[] => {
  return value.map((line, index) => <p key={index}>{line}</p>)
}

export const columns = [
  {
    Header: 'URL',
    accessor: 'url',
  },
  {
    Header: 'Topics',
    accessor: 'topics',
    Cell: CreatedCell,
  },
  {
    Header: 'Customer',
    accessor: 'customer',
    Cell: CreatedCell,
  },
  {
    Header: 'Test Webhook',
    accessor: 'test',
  },
  {
    Header: 'Edit',
    accessor: 'edit',
  },
]

export const MODAL_TYPE = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
  TEST: 'TEST',
}

export const handleSubscriptionChange = (history: History) => (values: WebhooksFormValues): void => {
  const { applicationId } = values
  history.push(`${URLS.webhooks}?applicationId=${applicationId}`)
}

export const openCreateModal = (dispatch: Dispatch) => (): void => {
  dispatch(webhookSetOpenModal(MODAL_TYPE.CREATE))
}

export const openEditModal = (dispatch: Dispatch, setWebhookId: React.Dispatch<string | undefined>) => (
  webhookId: string,
): void => {
  dispatch(webhookSetOpenModal(MODAL_TYPE.EDIT))
  setWebhookId(webhookId)
}

export const openTestModal = (dispatch: Dispatch, setWebhookId: React.Dispatch<string | undefined>) => (
  webhookId: string,
): void => {
  setWebhookId(webhookId)
  dispatch(webhookSetOpenModal(MODAL_TYPE.TEST))
}

export const handleCloseModal = (dispatch: Dispatch) => {
  return () => {
    dispatch(webhookSetOpenModal(''))
  }
}
export const handleAfterClose = (dispatch: Dispatch, setWebhookId: React.Dispatch<string | undefined>) => {
  return () => {
    dispatch(webhookSetOpenModal(''))
    setWebhookId(undefined)
  }
}

export const renderTopicName = (topics: TopicModel[], subscriptionTopicIds: string[]) => {
  const subscriptionTopics = topics.filter((topic) => subscriptionTopicIds.includes(topic.id as string))
  const subscriptionTopicsName = subscriptionTopics.map((topic) => topic.name)
  return subscriptionTopicsName
}

export const renderCustomerName = (subscriptionCustomerIds: string[]) => {
  if (subscriptionCustomerIds.length) {
    return subscriptionCustomerIds
  }
  return ['All Customers (*)']
}

type GetTableTopicsDataParams = {
  subscriptions: WebhookModel[]
  topics: TopicModel[]
  handleOpenEditModal: (webhookId: string) => void
  handleOpenTestModal: (webhookId: string) => void
}

export const getTableTopicsData = ({
  subscriptions,
  topics,
  handleOpenEditModal,
  handleOpenTestModal,
}: GetTableTopicsDataParams) => {
  return subscriptions?.map((subscription: WebhookModel) => ({
    url: subscription.url,
    topics: renderTopicName(topics, subscription.topicIds as string[]),
    customer: renderCustomerName(subscription.customerIds as string[]),
    test: (
      <a className={hyperlinked} onClick={() => handleOpenTestModal(subscription.id as string)}>
        Ping
      </a>
    ),
    edit: (
      <Button
        dataTest="edit-btn"
        variant="primary"
        type="button"
        onClick={() => {
          handleOpenEditModal(subscription.id as string)
        }}
      >
        Edit
      </Button>
    ),
  }))
}

export const mapDeveloperAppsToAppSelectBoxOptions: (developerApps: AppSummaryModel[]) => SelectBoxOptions[] = (
  developerApps,
) =>
  developerApps.map(({ name, id }) => ({
    label: name || '',
    value: id || '',
  }))

export const DeveloperWebhooks = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const queryParams = qs.parse(history.location.search)
  const applicationId = queryParams.applicationId
  const [webhookId, setWebhookId] = React.useState<string | undefined>()
  React.useEffect(() => {
    if (applicationId) {
      dispatch(fetchWebhooksSubscriptions({ applicationId: [applicationId] as string[] }))
      dispatch(fetchWebhooksTopics({ applicationId }))
    }
  }, [dispatch, applicationId])

  const subscriptions = useSelector(selectSubscriptionsData)
  const subscriptionsLoading = useSelector(selectSubscriptionsLoading)
  const topics = useSelector(selectTopicsData)
  const developerState = useSelector(selectDeveloper)
  const { data: apps } = useSelector(selectAppListState)
  const modalType = useSelector(selectWebhookEditModalType)

  const handleOpenCreateModal = openCreateModal(dispatch)
  const handleOpenEditModal = openEditModal(dispatch, setWebhookId)
  const handleOpenTestModal = openTestModal(dispatch, setWebhookId)
  const onCloseModal = React.useCallback(handleCloseModal(dispatch), [dispatch])
  const afterClose = React.useCallback(handleAfterClose(dispatch, setWebhookId), [dispatch])

  const unfetched = !apps
  const loading = developerState.loading
  const isShowDetailModal = modalType === MODAL_TYPE.EDIT || modalType === MODAL_TYPE.CREATE
  const isShowTestModal = modalType === MODAL_TYPE.TEST

  return (
    <>
      <H3>Manage Webhook Subscriptions</H3>
      <FadeIn>
        <Section hasPadding={false}>
          <Content>
            Our webhooks system allows your application to directly subscribe to events happening in our customers data.
            Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
            allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
          </Content>
          <Content>
            This system is designed to flexibly work with how your application is built and deployed. If you wish, you
            can set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up a
            different webhook subscription per topic or per customer. For more information about Webhooks, please see
            our{' '}
            <a className={link} href={`${Routes.API_DOCS}/api/webhooks`} target="_blank" rel="noopener noreferrer">
              webhooks documentation
            </a>
          </Content>
        </Section>
        <Formik
          initialValues={{
            applicationId: applicationId || '',
          }}
          enableReinitialize={true}
          onSubmit={() => {}}
        >
          {() => (
            <Form>
              <SelectBox
                className="pt-2 pb-2"
                name="applicationId"
                options={mapDeveloperAppsToAppSelectBoxOptions(apps || [])}
                labelText="Please select an App from the list below to view the associated Webhooks:"
                id="subscription"
              />
              <FormikAutoSave onSave={handleSubscriptionChange(history)} />
            </Form>
          )}
        </Formik>
        {applicationId && (
          <LevelRight>
            <Button dataTest="logout-btn" variant="primary" type="button" onClick={handleOpenCreateModal}>
              Add New Webhook
            </Button>
          </LevelRight>
        )}
        {unfetched || loading || subscriptionsLoading ? (
          <Loader />
        ) : subscriptions.length ? (
          <Table
            scrollable
            columns={columns}
            data={getTableTopicsData({ subscriptions, handleOpenEditModal, topics, handleOpenTestModal })}
            loading={false}
          />
        ) : null}
      </FadeIn>
      {isShowDetailModal && (
        <WebhookEditModal
          visible={isShowDetailModal}
          isUpdate={modalType === MODAL_TYPE.EDIT}
          appId={applicationId}
          webhookId={webhookId}
          afterClose={afterClose}
          closeModal={onCloseModal}
        />
      )}
      {isShowTestModal && (
        <WebhookTestModal
          visible={isShowTestModal}
          webhookId={webhookId}
          afterClose={afterClose}
          closeModal={onCloseModal}
        />
      )}
    </>
  )
}

export default DeveloperWebhooks
