import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styles from '@/styles/blocks/developer-app-modal.scss?mod'
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
  DeleteWebhookParams,
} from '@/actions/webhook-edit-modal'
import { WebhookModal, CustomerItem, TopicItem } from '@/reducers/webhook-edit-modal'
import { selectTopics, selectWebhookData, selectLoading, selectCustomers } from '@/selector/webhook-edit'
import { isValidHttpsUrl } from '@/utils/validate'
import linkStyles from '@/styles/elements/link.scss?mod'

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
  deleteWebhook: (data: DeleteWebhookParams) => void
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
  const customerOptions: SelectOption[] = [
    {
      value: 'SBOX',
      label: 'SBOX',
      description: 'SBOX',
    } as SelectOption,
  ]
  customers.forEach((customer: CustomerItem) => {
    if (customer.status === 'Active') {
      customerOptions.push({
        value: customer.client,
        label: customer.client,
        description: customer.client,
      } as SelectOption)
    }
  })
  return customerOptions
}

export const onCreate = (createWebhook: (data: CreateWebhookParams) => void, appId: string) => (
  values: FormValuesType,
) => {
  const params: CreateWebhookParams = {
    applicationId: appId,
    url: values.url,
    description: '',
    topicIds: values.topicIds,
    customerIds: values.customerIds,
    active: values.active,
  }
  createWebhook(params)
}

export const onEdit = (editWebhook: (data: EditWebhookParams) => void, webhookId: string, appId: string) => (
  values: FormValuesType,
) => {
  const params: EditWebhookParams = {
    applicationId: appId,
    webhookId,
    url: values.url,
    description: '',
    topicIds: values.topicIds,
    customerIds: values.customerIds,
    active: values.active,
  }
  editWebhook(params)
}

export const validateURL = (value: string): string | null => {
  return isValidHttpsUrl(value) ? null : 'The value must be a valid and secure URI'
}

export type WebhookModalInnerProps = WebhookModalInnerMappedAction &
  StateProps & {
    isUpdate?: boolean
    webhookId?: string
    appId: string
    closeModal?: () => void
  }

export type FormValuesType = {
  url: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
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

  const initFormValues: FormValuesType = {
    url: webhookData?.url,
    topicIds: webhookData?.topicIds,
    customerIds: webhookData?.customerIds,
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
  const onDelete = () => props.deleteWebhook({ webhookId, applicationId: appId })
  if (loading) return <Loader />
  return (
    <Formik initialValues={initFormValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <>
            <ModalHeader title={modalConfig.title} />
            <ModalBody
              body={
                <Form>
                  <Content>
                    <p>
                      Webhooks are configured here to allow your application to receive real-time notifications about
                      the topics you choose to subscribe it to. A single webhook subscription can receive notifications
                      for multiple topics so long as your application has been granted the required permissions.
                    </p>
                    <p>
                      Webhooks subscriptions can be set up for any customer who has installed your application.
                      Additionally, you can choose ‘SBOX’ to listen for sandbox environment notifications.
                    </p>
                    <p>
                      For more information about Webhooks, please see our{' '}
                      <a
                        className={linkStyles.link}
                        href="https://foundations-documentation.reapit.cloud/api/api-documentation#webhooks"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        webhooks documentation
                      </a>
                    </p>
                  </Content>
                  <Input
                    id="url"
                    type="text"
                    placeholder="Enter a secure URL (https://)"
                    name="url"
                    labelText="Webhook URL"
                    required
                    validate={validateURL}
                  />
                  <DropdownSelect
                    id="topicIds"
                    placeholder="Please select"
                    name="topicIds"
                    labelText="Subscription Topics"
                    options={topicOptions}
                    dropdownStyle={{ zIndex: 41 }}
                    required
                  />
                  <DropdownSelect
                    id="customerIds"
                    placeholder="All Customers who have installed your application (default)"
                    name="customerIds"
                    labelText="Subscription Customers"
                    options={customerOptions}
                    dropdownStyle={{ zIndex: 41 }}
                  />
                  <Checkbox id="active" name="active" labelText="Active" />
                </Form>
              }
            />
            <ModalFooter
              footerItems={
                <Level className={styles.footer}>
                  <LevelLeft>
                    {isUpdate && (
                      <Button className="mr-2" variant="secondary" type="button" onClick={onDelete}>
                        Delete
                      </Button>
                    )}
                  </LevelLeft>
                  <LevelRight className="mt-0">
                    <Button className="mr-2" variant="secondary" type="button" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      {modalConfig.submit}
                    </Button>
                  </LevelRight>
                </Level>
              }
            />
          </>
        )
      }}
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

export const mapDispatchToProps = (dispatch: Dispatch): WebhookModalInnerMappedAction => {
  return {
    requestWebhookSubcriptionData: (appId: string) => dispatch(requestWebhookSubcriptionData(appId)),
    createWebhook: (data: CreateWebhookParams) => dispatch(createWebhook(data)),
    editWebhook: (data: EditWebhookParams) => dispatch(editWebhook(data)),
    deleteWebhook: (data: DeleteWebhookParams) => dispatch(deleteWebhook(data)),
    requestWebhookData: (webhookId: string) => dispatch(requestWebhookData(webhookId)),
    webhookDataClear: () => dispatch(webhookDataClear()),
  }
}

export const WebhookModalInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(WebhookModalInner)
export default React.memo(WebhookEditModal)
