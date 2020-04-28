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
} from '@reapit/elements'
import { ReduxState } from '@/types/core'
import {
  requestWebhookSubcriptionData,
  CreateWebhookParams,
  EditWebhookParams,
  createWebhook,
  editWebhook,
  requestWebhookData,
} from '@/actions/webhook-edit-modal'
import { WebhookEditState } from '@/reducers/webhook-edit-modal'

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
}

export const WebhookCreateModal: React.FunctionComponent<WebhookEditProps> = ({
  isUpdate = false,
  appId,
  visible,
  webhookId,
  closeModal,
  afterClose,
}) => {
  return (
    <Modal visible={visible} renderChildren afterClose={afterClose}>
      <WebhookModalInnerWithConnect isUpdate={isUpdate} closeModal={closeModal} appId={appId} webhookId={webhookId} />
    </Modal>
  )
}

export const generateTopicOptions = topics => {
  return topics.map(topic => ({
    value: topic.id,
    label: topic.name,
    description: topic.description,
  }))
}

export const generateCustomerOptions = customers => {
  return customers.map(customer => ({
    value: customer.client,
    label: customer.client,
  }))
}

export const onCreate = (createWebhook, appId) => values => {
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

export const onEdit = (editWebhook, webhookId) => values => {
  const params: EditWebhookParams = {
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
  webhookEdit,
  webhookId,
  ...props
}) => {
  const modalConfig = isUpdate ? EDIT_MODAL : CREATE_MODAL

  const topics = webhookEdit?.subcriptionTopics?._embedded || []
  const customers = webhookEdit?.subcriptionCustomers?.data || []
  const loading = webhookEdit?.loading
  const webhookData = webhookEdit?.webhookData

  const initFormValues = {
    WebhookURL: webhookData?.url,
    SubscriptionTopics: webhookData?.id,
    SubscriptionCustomers: webhookData?.customerIds,
    active: webhookData?.active,
  }

  const topicOptions: SelectOption[] = generateTopicOptions(topics)
  const customerOptions: SelectOption[] = generateCustomerOptions(customers)

  useEffect(() => {
    props.requestWebhookSubcriptionData(props.appId)
    webhookId && props.requestWebhookData(webhookId)
  }, [])

  const onSubmit = isUpdate ? onEdit(props.editWebhook, webhookId) : onCreate(props.createWebhook, props.appId)

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
                rcSelectProps={{ dropdownStyle: { zIndex: 41 } }}
                // required
              />
              <DropdownSelect
                id="SubscriptionCustomers"
                placeholder="All Customers who have installed your application (default)"
                name="SubscriptionCustomers"
                labelText="Subscription Customers"
                options={customerOptions}
                rcSelectProps={{ dropdownStyle: { zIndex: 41 } }}
                // required
              />
              <Checkbox id="active" name="active" labelText="Active" />
            </>
          }
        />
        <ModalFooter
          footerItems={
            <>
              <Button className="mr-2" variant="secondary" type="button" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {modalConfig.submit}
              </Button>
            </>
          }
        />
      </Form>
    </Formik>
  )
}

export type StateProps = {
  webhookEdit: WebhookEditState
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  webhookEdit: state.webhookEdit,
})

export const mapDispatchToProps = (dispatch: any): WebhookModalInnerMappedAction => {
  return {
    requestWebhookSubcriptionData: (appId: string) => dispatch(requestWebhookSubcriptionData(appId)),
    createWebhook: (data: CreateWebhookParams) => dispatch(createWebhook(data)),
    editWebhook: (data: EditWebhookParams) => dispatch(editWebhook(data)),
    requestWebhookData: (webhookId: string) => dispatch(requestWebhookData(webhookId)),
  }
}

export const WebhookModalInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(WebhookModalInner)
export default WebhookCreateModal
