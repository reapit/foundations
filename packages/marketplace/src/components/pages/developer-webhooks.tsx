import React, { ReactElement } from 'react'
import { Loader, SelectBoxOptions } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { DeveloperState } from '@/reducers/developer'
import { connect } from 'react-redux'
import {
  SelectBox,
  H3,
  FlexContainerBasic,
  FormSection,
  FormSubHeading,
  FlexContainerResponsive,
  LevelRight,
  Button,
  Table,
  Section,
} from '@reapit/elements'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { compose, Dispatch } from 'redux'
import { Form, Formik } from 'formik'
import {
  webhookSubscriptionsRequestData,
  setApplicationId,
  webhookTopicsRequestData,
} from '@/actions/webhook-subscriptions'
import { webhookSetOpenModal } from '@/actions/webhook-edit-modal'
import { WebhookModel, TopicModel } from '@/reducers/webhook-subscriptions'
import {
  selectSubscriptionsData,
  selectSubscriptionsLoading,
  selectTopicsData,
  selectApplicationId,
} from '@/selector/wehooks'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import WebhookEditModal from '../ui/webhook-edit-modal'
import { selectDeveloperApps } from '@/selector/developer'
import WebhookTestModal from '../ui/webhook-test-modal'
import styles from '@/styles/elements/link.scss?mod'

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

export const handleSubscriptionChange = ({ fetchTopics, fetchSubscriptions }) => (values): void => {
  fetchSubscriptions(values.applicationId)
  fetchTopics(values.applicationId)
}

export const openCreateModal = (webhookSetOpenModal: (type: string) => void) => (): void => {
  webhookSetOpenModal(MODAL_TYPE.CREATE)
}

export type OpenEditModalParams = {
  webhookSetOpenModal: (type: string) => void
  setWebhookId: React.Dispatch<string | undefined>
}
export const openEditModal = ({ webhookSetOpenModal, setWebhookId }: OpenEditModalParams) => (
  webhookId: string,
): void => {
  webhookSetOpenModal(MODAL_TYPE.EDIT)
  setWebhookId(webhookId)
}

export const openTestModal = ({ webhookSetOpenModal, setWebhookId }: OpenEditModalParams) => (
  webhookId: string,
): void => {
  setWebhookId(webhookId)
  webhookSetOpenModal(MODAL_TYPE.TEST)
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

export type StateProps = {
  subscriptions: WebhookModel[]
  subscriptionsLoading: boolean
  topics: TopicModel[]
  applicationId: string
  applications: AppSummaryModel[]
  developerState: DeveloperState
  modalType: string
}

export type DeveloperWebhooksProps = StateProps & DispatchProps

export const mapDeveloperAppsToAppSelectBoxOptions: (
  developerApps: AppSummaryModel[],
) => SelectBoxOptions[] = developerApps =>
  developerApps.map(({ name, id }) => ({
    label: name || '',
    value: id || '',
  }))

export const DeveloperWebhooks = ({
  fetchTopics,
  fetchSubscriptions,
  subscriptions,
  subscriptionsLoading,
  topics,
  applicationId,
  developerState,
  webhookSetOpenModal,
  modalType,
}: DeveloperWebhooksProps) => {
  const [webhookId, setWebhookId] = React.useState<string | undefined>()

  const handleOpenCreateModal = openCreateModal(webhookSetOpenModal)
  const handleOpenEditModal = openEditModal({ webhookSetOpenModal, setWebhookId })
  const handleOpenTestModal = openTestModal({ webhookSetOpenModal, setWebhookId })
  const handleCloseModal = React.useCallback(() => webhookSetOpenModal(''), [])
  const afterClose = React.useCallback((): void => {
    webhookSetOpenModal('')
    setWebhookId(undefined)
  }, [])

  const apps = developerState?.developerData?.data?.data || []
  const unfetched = !developerState.developerData
  const loading = developerState.loading
  const isShowDetailModal = modalType === MODAL_TYPE.EDIT || modalType === MODAL_TYPE.CREATE
  const isShowTestModal = modalType === MODAL_TYPE.TEST

  return (
    <FlexContainerBasic hasPadding>
      <FlexContainerResponsive flexColumn hasBackground hasPadding>
        <H3>Manage Webhook Subscriptions</H3>
        <FormSection>
          <FormSubHeading>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi aliquam dolor, dolore placeat
            molestias illum quod quasi nihil. Modi consectetur praesentium sint quod qui quos soluta repellat porro
            minus.
          </FormSubHeading>
          <Formik initialValues={{ applicationId: '' }} enableReinitialize={true} onSubmit={() => {}}>
            {() => (
              <Form>
                <SelectBox
                  className="pt-2 pb-2"
                  helpText="Please select an App from the list below to view the associated Webhooks:"
                  name="applicationId"
                  options={mapDeveloperAppsToAppSelectBoxOptions(apps)}
                  labelText="App"
                  id="subscription"
                />
                <FormikAutoSave onSave={handleSubscriptionChange({ fetchTopics, fetchSubscriptions })} />
              </Form>
            )}
          </Formik>
          <Section>
            <LevelRight>
              {applicationId && (
                <Button dataTest="logout-btn" variant="primary" type="button" onClick={handleOpenCreateModal}>
                  Add New Webhook
                </Button>
              )}
            </LevelRight>
          </Section>
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
      </FlexContainerResponsive>
      {isShowDetailModal && (
        <WebhookEditModal
          visible={isShowDetailModal}
          isUpdate={modalType === MODAL_TYPE.EDIT}
          appId={applicationId}
          webhookId={webhookId}
          afterClose={afterClose}
          closeModal={handleCloseModal}
        />
      )}
      {isShowTestModal && (
        <WebhookTestModal
          visible={isShowTestModal}
          webhookId={webhookId}
          afterClose={afterClose}
          closeModal={handleCloseModal}
        />
      )}
    </FlexContainerBasic>
  )
}

export type DispatchProps = {
  fetchSubscriptions: (applicationId: string) => void
  fetchTopics: (applicationId: string) => void
  setApplicationId: (applicationId: string) => void
  webhookSetOpenModal: (type: string) => void
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  subscriptions: selectSubscriptionsData(state),
  subscriptionsLoading: selectSubscriptionsLoading(state),
  topics: selectTopicsData(state),
  applicationId: selectApplicationId(state),
  applications: selectDeveloperApps(state),
  developerState: state.developer,
  modalType: state.webhookEdit.modalType,
})

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchSubscriptions: (applicationId: string) => dispatch(webhookSubscriptionsRequestData(applicationId)),
    fetchTopics: (applicationId: string) => dispatch(webhookTopicsRequestData(applicationId)),
    setApplicationId: (applicationId: string) => dispatch(setApplicationId(applicationId)),
    webhookSetOpenModal: (type: string) => dispatch(webhookSetOpenModal(type)),
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const EnhanceSettingPage = compose<React.FC<DeveloperWebhooksProps>>(withRedux)(DeveloperWebhooks)
EnhanceSettingPage.displayName = 'EnhanceSettingPage'

export default EnhanceSettingPage as React.LazyExoticComponent<any>
