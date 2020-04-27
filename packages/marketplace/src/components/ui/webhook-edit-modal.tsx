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
  requestDeveloperWebhookData,
  CreateDeveloperWebhookParams,
  createDeveloperWebhook,
} from '@/actions/webhook-edit-modal'
import { DeveloperWebhookState } from '@/reducers/webhook-edit-modal'

const CREATE_MODAL = {
  title: 'Add New Webhook',
  submit: 'Create',
}

const EDIT_MODAL = {
  title: 'Edit',
  submit: 'Update',
}

export type WebhookModalInnerProps = {
  isUpdate?: boolean
  appId: string
  closeModal?: () => void
}

export type WebhookCreateProps = {
  isUpdate?: boolean
  appId: string
  visible: boolean
  closeModal?: () => void
}
export interface WebhookModalInnerMappedAction {
  requestDeveloperWebhookData: (appId: string) => void
  createDeveloperWebhook: (data: CreateDeveloperWebhookParams) => void
}

export const WebhookCreateModal: React.FunctionComponent<WebhookCreateProps> = ({
  isUpdate = false,
  appId,
  visible,
  closeModal,
}) => {
  return (
    <Modal visible={visible} renderChildren>
      <WebhookModalInnerWithConnect isUpdate={isUpdate} closeModal={closeModal} appId={appId} />
    </Modal>
  )
}

export const WebhookModalInner: React.FunctionComponent<WebhookModalInnerProps &
  WebhookModalInnerMappedAction &
  StateProps> = ({ isUpdate = false, closeModal, developerWebhook, ...props }) => {
  const modalConfig = isUpdate ? EDIT_MODAL : CREATE_MODAL

  const topics = developerWebhook?.subcriptionTopics?._embedded || []
  const customers = developerWebhook?.subcriptionCustomers?.data || []
  const loading = developerWebhook?.loading

  const topicOptions: SelectOption[] = topics.map(topic => ({
    value: topic.id,
    label: topic.name,
    description: topic.description,
  }))
  const customerOptions: SelectOption[] = customers.map(customer => ({
    value: customer.client,
    label: customer.client,
  }))

  useEffect(() => {
    props.requestDeveloperWebhookData(props.appId)
  }, [])

  const onSubmit = values => {
    const params: CreateDeveloperWebhookParams = {
      ApplicationId: props.appId,
      url: values.WebhookURL,
      description: '',
      topicIds: values.SubscriptionTopics,
      customerIds: values.SubscriptionCustomers,
      active: values.active,
    }
    props.createDeveloperWebhook(params)
  }

  if (loading) return <Loader />
  return (
    <Formik
      initialValues={{ WebhookURL: '', SubscriptionTopics: [], SubscriptionCustomers: [], active: false }}
      onSubmit={onSubmit}
    >
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
                required
              />
              <DropdownSelect
                id="SubscriptionCustomers"
                placeholder="All Customers who have installed your application (default)"
                name="SubscriptionCustomers"
                labelText="Subscription Customers"
                options={customerOptions}
                rcSelectProps={{ dropdownStyle: { zIndex: 41 } }}
                required
              />
              <Checkbox id="active" name="active" labelText="Active" />
            </>
          }
        />
        <ModalFooter
          footerItems={
            <>
              <Button
                className="mr-2"
                variant="secondary"
                type="button"
                onClick={closeModal}
                dataTest="revision-approve-button"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" data-test="revision-decline-button">
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
  developerWebhook: DeveloperWebhookState
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  developerWebhook: state.developerWebhook,
})

export const mapDispatchToProps = (dispatch: any): WebhookModalInnerMappedAction => {
  return {
    requestDeveloperWebhookData: (appId: string) => dispatch(requestDeveloperWebhookData(appId)),
    createDeveloperWebhook: (data: CreateDeveloperWebhookParams) => dispatch(createDeveloperWebhook(data)),
  }
}

export const WebhookModalInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(WebhookModalInner)
export default WebhookCreateModal
