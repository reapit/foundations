import React, { ReactElement } from 'react'
import { Loader, SelectBoxOptions } from '@reapit/elements'
import { useSelector, useDispatch } from 'react-redux'
import { SelectBox, H3, FormSection, FormSubHeading, LevelRight, Button, Table, Section } from '@reapit/elements'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import { Form, Formik } from 'formik'
import { webhookSubscriptionsRequestData, webhookTopicsRequestData } from '@/actions/webhook-subscriptions'
import { webhookSetOpenModal } from '@/actions/webhook-edit-modal'
import { WebhookModel, TopicModel } from '@/reducers/webhook-subscriptions'
import {
  selectSubscriptionsData,
  selectSubscriptionsLoading,
  selectTopicsData,
  selectApplicationId,
  selectWebhookEditModalType,
} from '@/selector/wehooks'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import WebhookEditModal from './webhook-edit-modal'
import { selectDeveloper } from '@/selector/developer'
import WebhookTestModal from './webhook-test-modal'
import styles from '@/styles/elements/link.scss?mod'
import linkStyles from '@/styles/elements/link.scss?mod'
import Routes from '@/constants/routes'
import { selectAppListState } from '@/selector/apps/app-list'

export type DeveloperWebhooksProps = {}

export type WebhooksFormValues = {
  applicationId: string
}

export const webhooksFormInitialValues: WebhooksFormValues = {
  applicationId: '',
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

export const handleSubscriptionChange = (dispatch: Dispatch) => (values: WebhooksFormValues): void => {
  const { applicationId } = values
  dispatch(webhookSubscriptionsRequestData(applicationId))
  dispatch(webhookTopicsRequestData(applicationId))
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
  const subscriptionTopics = topics.filter(topic => subscriptionTopicIds.includes(topic.id))
  const subscriptionTopicsName = subscriptionTopics.map(topic => topic.name)
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
    topics: renderTopicName(topics, subscription.topicIds),
    customer: renderCustomerName(subscription.customerIds),
    test: (
      <a className={styles.hyperlinked} onClick={() => handleOpenTestModal(subscription.id)}>
        Ping
      </a>
    ),
    edit: (
      <Button
        dataTest="edit-btn"
        variant="primary"
        type="button"
        onClick={() => {
          handleOpenEditModal(subscription.id)
        }}
      >
        Edit
      </Button>
    ),
  }))
}

export const mapDeveloperAppsToAppSelectBoxOptions: (
  developerApps: AppSummaryModel[],
) => SelectBoxOptions[] = developerApps =>
  developerApps.map(({ name, id }) => ({
    label: name || '',
    value: id || '',
  }))

export const DeveloperWebhooks = () => {
  const dispatch = useDispatch()
  const [webhookId, setWebhookId] = React.useState<string | undefined>()

  const subscriptions = useSelector(selectSubscriptionsData)
  const subscriptionsLoading = useSelector(selectSubscriptionsLoading)
  const topics = useSelector(selectTopicsData)
  const applicationId = useSelector(selectApplicationId)
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
      <Section>
        <H3>Manage Webhook Subscriptions</H3>
      </Section>
      <FormSection>
        <FormSubHeading>
          Our webhooks system allows your application to directly subscribe to events happening in our customers data.
          Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
          allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
        </FormSubHeading>
        <FormSubHeading>
          This system is designed to flexibly work with how your application is built and deployed. If you wish, you can
          set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up a
          different webhook subscription per topic or per customer. For more information about Webhooks, please see our
          <a
            className={linkStyles.link}
            href={`${Routes.API_DOCS}/api/webhooks`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            webhooks documentation
          </a>
        </FormSubHeading>
        <Formik initialValues={webhooksFormInitialValues} enableReinitialize={true} onSubmit={() => {}}>
          {() => (
            <Form>
              <SelectBox
                className="pt-2 pb-2"
                helpText="Please select an App from the list below to view the associated Webhooks:"
                name="applicationId"
                options={mapDeveloperAppsToAppSelectBoxOptions(apps || [])}
                labelText="App"
                id="subscription"
              />
              <FormikAutoSave onSave={handleSubscriptionChange(dispatch)} />
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
      </FormSection>

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
