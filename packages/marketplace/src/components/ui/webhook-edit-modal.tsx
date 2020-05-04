import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  DropdownSelect,
  Input,
  Formik,
  Form,
  Content,
  Checkbox,
  SelectOption,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Loader,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
} from '@reapit/elements'
import { ReduxState } from '@/types/core'
import {
  requestWebhookSubcriptionData,
  CreateWebhookParams,
  EditWebhookParams,
  createWebhook,
  editWebhook,
  requestWebhookData,
  webhookDataClear,
  deleteWebhook,
} from '@/actions/webhook-edit-modal'
import { WebhookModal, CustomerItem, TopicItem } from '@/reducers/webhook-edit-modal'
import { selectTopics, selectWebhookData, selectLoading, selectCustomers } from '@/selector/webhook-edit'

const CREATE_MODAL = {
  title: 'Add New Webhook',
  submit: 'Create',
}

const EDIT_MODAL = {
  title: 'Edit',
  submit: 'Update',
}

export type WebhookEditProps = {
  isUpdate?: boolean
  appId: string
  webhookId?: string
  visible: boolean
  closeModal?: () => void
  afterClose?: () => void
}
export interface WebhookModalInnerMappedAction {
  requestWebhookSubcriptionData: (appId: string) => void
  requestWebhookData: (webhookId: string) => void
  createWebhook: (data: CreateWebhookParams) => void
  editWebhook: (data: EditWebhookParams) => void
  webhookDataClear: () => void
  deleteWebhook: (webhookId: string) => void
}

export const WebhookEditModal: React.FunctionComponent<WebhookEditProps> = ({
  isUpdate = false,
  appId,
  visible,
  webhookId,
  closeModal,
  afterClose,
}) => {
  if (!visible) return null
  return (
    <Modal visible={visible} renderChildren afterClose={afterClose}>
      <WebhookModalInnerWithConnect isUpdate={isUpdate} closeModal={closeModal} appId={appId} webhookId={webhookId} />
    </Modal>
  )
}

export const generateTopicOptions = (topics: TopicItem[]) => {
  return topics.map(
    topic =>
      ({
        value: topic.id,
        label: topic.name,
        description: topic.description,
      } as SelectOption),
  )
}

export const generateCustomerOptions = (customers: CustomerItem[]) => {
  return customers.map(
    customer =>
      ({
        value: customer.client,
        label: customer.client,
        description: customer.client,
      } as SelectOption),
  )
}

export const onCreate = (createWebhook: (data: CreateWebhookParams) => void, appId: string) => values => {
  const params: CreateWebhookParams = {
    ApplicationId: appId,
    url: values.WebhookURL,
    description: '',
    topicIds: values.SubscriptionTopics,
    customerIds: values.SubscriptionCustomers,
    active: values.active,
  }
  createWebhook(params)
}

export const onEdit = (editWebhook: (data: EditWebhookParams) => void, webhookId: string, appId: string) => values => {
  const params: EditWebhookParams = {
    ApplicationId: appId,
    webhookId,
    url: values.WebhookURL,
    description: '',
    topicIds: values.SubscriptionTopics,
    customerIds: values.SubscriptionCustomers,
    active: values.active,
  }
  editWebhook(params)
}

export type WebhookModalInnerProps = WebhookModalInnerMappedAction &
  StateProps & {
    isUpdate?: boolean
    webhookId?: string
    appId: string
    closeModal?: () => void
  }

export const WebhookModalInner: React.FunctionComponent<WebhookModalInnerProps> = ({
  isUpdate = false,
  closeModal,
  topics,
  customers,
  loading,
  webhookData,
  webhookId = '',
  appId = '',
  ...props
}) => {
  const modalConfig = isUpdate ? EDIT_MODAL : CREATE_MODAL

  const initFormValues = {
    WebhookURL: webhookData?.url,
    SubscriptionTopics: webhookData?.topicIds,
    SubscriptionCustomers: webhookData?.customerIds,
    active: webhookData?.active,
  }

  const topicOptions: SelectOption[] = generateTopicOptions(topics)
  const customerOptions: SelectOption[] = generateCustomerOptions(customers)

  useEffect(() => {
    if (isUpdate) {
      props.requestWebhookData(webhookId)
    } else {
      props.requestWebhookSubcriptionData(appId)
    }
    return props.webhookDataClear
  }, [])

  const onSubmit = isUpdate ? onEdit(props.editWebhook, webhookId, appId) : onCreate(props.createWebhook, appId)
  const onDelete = () => props.deleteWebhook(webhookId)
  if (loading) return <Loader />
  return (
    <Formik initialValues={initFormValues} onSubmit={onSubmit}>
      <Form>
        <ModalHeader title={modalConfig.title} />
        <ModalBody
          body={
            <>
              <Content>
                <p>
                  You can create a Webhook to receive notifications from the topics that you choose to subscribe it to.
                  You can receive notifications for any customer that has installed your application. For more
                  information about Webhooks, please see our{' '}
                  <a
                    href="https://foundations-documentation.reapit.cloud/api/api-documentation#webhooks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    webhooks documentation
                  </a>
                </p>
              </Content>
              <Input
                id="WebhookURL"
                type="text"
                placeholder="Enter URL here"
                name="WebhookURL"
                labelText="Webhook URL"
                required
              />
              <DropdownSelect
                id="SubscriptionTopics"
                placeholder="Please select"
                name="SubscriptionTopics"
                labelText="Subscription Topics"
                options={topicOptions}
                dropdownStyle={{ zIndex: 41 }}
                required
              />
              <DropdownSelect
                id="SubscriptionCustomers"
                placeholder="All Customers who have installed your application (default)"
                name="SubscriptionCustomers"
                labelText="Subscription Customers"
                options={customerOptions}
                dropdownStyle={{ zIndex: 41 }}
                required
              />
              <Checkbox id="active" name="active" labelText="Active" />
            </>
          }
        />
        <ModalFooter
          footerItems={
            <Level className="container-flex">
              <LevelLeft>
                <LevelItem>
                  {isUpdate && (
                    <Button className="mr-2" variant="secondary" type="button" onClick={onDelete}>
                      Delete
                    </Button>
                  )}
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <Button className="mr-2" variant="secondary" type="button" onClick={closeModal}>
                    Cancel
                  </Button>
                </LevelItem>
                <LevelItem>
                  <Button variant="primary" type="submit">
                    {modalConfig.submit}
                  </Button>
                </LevelItem>
              </LevelRight>
            </Level>
          }
        />
      </Form>
    </Formik>
  )
}

export type StateProps = {
  topics: TopicItem[]
  customers: CustomerItem[]
  loading: boolean
  webhookData: WebhookModal
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  topics: selectTopics(state),
  customers: selectCustomers(state),
  loading: selectLoading(state),
  webhookData: selectWebhookData(state),
})

export const mapDispatchToProps = (dispatch: any): WebhookModalInnerMappedAction => {
  return {
    requestWebhookSubcriptionData: (appId: string) => dispatch(requestWebhookSubcriptionData(appId)),
    createWebhook: (data: CreateWebhookParams) => dispatch(createWebhook(data)),
    editWebhook: (data: EditWebhookParams) => dispatch(editWebhook(data)),
    deleteWebhook: (webhookId: string) => dispatch(deleteWebhook(webhookId)),
    requestWebhookData: (webhookId: string) => dispatch(requestWebhookData(webhookId)),
    webhookDataClear: () => dispatch(webhookDataClear()),
  }
}

export const WebhookModalInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(WebhookModalInner)
export default React.memo(WebhookEditModal)
