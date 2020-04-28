import React from 'react'
import {
  SelectBox,
  SelectBoxOptions,
  H3,
  FlexContainerBasic,
  FormSection,
  FormSubHeading,
  FlexContainerResponsive,
  LevelRight,
  Button,
  Table,
  Loader,
  Section,
} from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Form, Formik } from 'formik'
import { webhookTopicsRequestData } from '@/actions/webhook-subscriptions'
import { WebhookModel, TopicModel } from '@/reducers/webhook-subscriptions'
import {
  selectSubscriptionsData,
  selectSubscriptionsLoading,
  selectTopicsData,
  selectTopicsLoading,
  selectApplicationId,
} from '@/selector/wehooks'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import WebhookEditModal from '../ui/webhook-edit-modal'

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
  fetchTopics(values.subscriptions)
}

export const openCreateModal = setModalOpen => () => {
  setModalOpen(MODAL_TYPE.CREATE)
}
export const openEditModal = (setModalOpen, setWebhookId) => (webhookId: string) => {
  setModalOpen(MODAL_TYPE.EDIT)
  setWebhookId(webhookId)
}

export const getTableTopicsData = (topics, onOpenEditModal) => {
  return topics.map((topic: TopicModel) => ({
    url: topic.url,
    topics: topic.associatedScope,
    customer: 'All Customers (*)',
    test: 'Ping',
    edit: (
      <Button
        dataTest="edit-btn"
        variant="primary"
        type="button"
        onClick={() => {
          onOpenEditModal(topic.id)
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
  topicsLoading: boolean
  applicationId: string
}

export type DeveloperWebhooksProps = StateProps & DispatchProps

export const DeveloperWebhooks = ({
  fetchTopics,
  subscriptions,
  subscriptionsLoading,
  topics,
  topicsLoading,
  applicationId,
}: DeveloperWebhooksProps) => {
  if (subscriptionsLoading) {
    return <Loader />
  }
  console.log(subscriptions, subscriptionsLoading, topics, topicsLoading)
  const [modalOpen, setModalOpen] = React.useState<string | undefined>()
  const [webhookId, setWebhookId] = React.useState<string | undefined>()

  const onOpenCreateModal = openCreateModal(setModalOpen)
  const onOpenEditModal = openEditModal(setModalOpen, setWebhookId)
  const onCloseModal = () => setModalOpen(undefined)

  const afterClose = (): void => {
    setModalOpen(undefined)
    setWebhookId(undefined)
  }

  const selectBoxOptions: SelectBoxOptions[] = subscriptions.map((subscription: WebhookModel) => ({
    label: subscription.applicationId,
    value: subscription.applicationId,
  }))

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
          <Formik initialValues={{ subscriptions: '' }} enableReinitialize={true} onSubmit={() => {}}>
            {() => (
              <Form>
                <SelectBox
                  // helpText="Please select an App from the list below to view the associated Webhooks:"
                  name="subscriptions"
                  options={selectBoxOptions}
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
          {topicsLoading ? (
            <Loader />
          ) : (
            <Table scrollable columns={columns} data={getTableTopicsData(topics, onOpenEditModal)} loading={false} />
          )}
        </FormSection>
      </FlexContainerResponsive>
      <WebhookEditModal
        visible={!!modalOpen}
        isUpdate={modalOpen === MODAL_TYPE.EDIT}
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
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  subscriptions: selectSubscriptionsData(state),
  subscriptionsLoading: selectSubscriptionsLoading(state),
  topics: selectTopicsData(state),
  topicsLoading: selectTopicsLoading(state),
  applicationId: selectApplicationId(state),
})

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchTopics: (applicationId: string) => dispatch(webhookTopicsRequestData(applicationId)),
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const EnhanceSettingPage = compose<React.FC<DeveloperWebhooksProps>>(withRedux)(DeveloperWebhooks)
EnhanceSettingPage.displayName = 'EnhanceSettingPage'

export default EnhanceSettingPage as React.LazyExoticComponent<any>
