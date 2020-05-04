import React from 'react'
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
import { webhookSubscriptionsRequestData, setApplicationId } from '@/actions/webhook-subscriptions'
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

export const columns = [
  {
    Header: 'URL',
    accessor: 'url',
  },
  {
    Header: 'Topics',
    accessor: 'topics',
  },
  {
    Header: 'Customer',
    accessor: 'customer',
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

const MODAL_TYPE = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
}

export const handleSubscriptionChange = fetchTopics => values => {
  fetchTopics(values.applicationId)
}

export const openCreateModal = setModalOpen => () => {
  setModalOpen(MODAL_TYPE.CREATE)
}
export const openEditModal = (setModalOpen, setWebhookId) => (webhookId: string) => {
  setModalOpen(MODAL_TYPE.EDIT)
  setWebhookId(webhookId)
}

export const renderTopicName = (topics: TopicModel[], subscriptionTopicId) => {
  const webhookTopics = topics?.filter((topic: TopicModel) => topic.id === subscriptionTopicId)
  const webhookTopicNames = webhookTopics?.map((topic: TopicModel) => topic.name)
  return webhookTopicNames.join('\n')
}

export const getTableTopicsData = (subscriptions: WebhookModel[], topics: TopicModel[], onOpenEditModal) => {
  return subscriptions?.map((subscription: WebhookModel) => ({
    url: subscription.url,
    topics: renderTopicName(topics, subscription.topicIds),
    customer: 'All Customers (*)',
    test: 'Ping',
    edit: (
      <Button
        dataTest="edit-btn"
        variant="primary"
        type="button"
        onClick={() => {
          onOpenEditModal(subscription.id)
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
  subscriptions,
  subscriptionsLoading,
  topics,
  applicationId,
  // applications,
  developerState,
}: DeveloperWebhooksProps) => {
  const [modalType, setModalType] = React.useState<string | undefined>()
  const [webhookId, setWebhookId] = React.useState<string | undefined>()

  const onOpenCreateModal = openCreateModal(setModalType)
  const onOpenEditModal = openEditModal(setModalType, setWebhookId)
  const onCloseModal = React.useCallback(() => setModalType(undefined), [])
  const afterClose = React.useCallback((): void => {
    setModalType(undefined)
    setWebhookId(undefined)
  }, [])

  // const selectBoxOptions: SelectBoxOptions[] = applications?.map((application: AppSummaryModel) => ({
  //   label: application.name || '',
  //   value: application.id || '',
  // }))

  const apps = developerState?.developerData?.data?.data || []
  const unfetched = !developerState.developerData
  const loading = developerState.loading

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
                <FormikAutoSave onSave={handleSubscriptionChange(fetchTopics)} />
              </Form>
            )}
          </Formik>
          <Section>
            <LevelRight>
              <Button dataTest="logout-btn" variant="primary" type="button" onClick={onOpenCreateModal}>
                Add New Webhook
              </Button>
            </LevelRight>
          </Section>
          {unfetched || loading || subscriptionsLoading ? (
            <Loader />
          ) : (
            <Table
              scrollable
              columns={columns}
              data={getTableTopicsData(subscriptions, topics, onOpenEditModal)}
              loading={false}
            />
          )}
        </FormSection>
      </FlexContainerResponsive>
      <WebhookEditModal
        visible={!!modalType}
        isUpdate={modalType === MODAL_TYPE.EDIT}
        appId={applicationId}
        webhookId={webhookId}
        afterClose={afterClose}
        closeModal={onCloseModal}
      />
    </FlexContainerBasic>
  )
}

export type DispatchProps = {
  fetchTopics: (applicationId: string) => void
  setApplicationId: (applicationId: string) => void
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  subscriptions: selectSubscriptionsData(state),
  subscriptionsLoading: selectSubscriptionsLoading(state),
  topics: selectTopicsData(state),
  applicationId: selectApplicationId(state),
  applications: selectDeveloperApps(state),
  developerState: state.developer,
})

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchTopics: (applicationId: string) => dispatch(webhookSubscriptionsRequestData(applicationId)),
    setApplicationId: (applicationId: string) => dispatch(setApplicationId(applicationId)),
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const EnhanceSettingPage = compose<React.FC<DeveloperWebhooksProps>>(withRedux)(DeveloperWebhooks)
EnhanceSettingPage.displayName = 'EnhanceSettingPage'

export default EnhanceSettingPage as React.LazyExoticComponent<any>
