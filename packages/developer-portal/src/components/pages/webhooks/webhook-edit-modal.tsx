import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
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
import {
  requestWebhookSubcriptionData,
  CreateWebhookParams,
  EditWebhookParams,
  createWebhook,
  editWebhook,
  requestWebhookData,
  webhookDataClear,
  deleteWebhook,
} from '@/actions/webhooks-subscriptions'
import { TopicItem } from '@/reducers/webhooks-subscriptions/webhook-edit-modal'
import { selectTopics, selectWebhookData, selectLoading, selectCustomers } from '@/selector/webhooks-subscriptions'
import { validationSchema } from './form-schema/validation-schema'
import { formFields } from './form-schema/form-fields'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { SANDBOX_CLIENT } from '@/constants/api'

const { activeField, topicIdsField, webhookUrlField, customerIdsField } = formFields

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

export const generateCustomerOptions = (customers: InstallationModel[]) => {
  const customerOptions: SelectOption[] = []
  customers.unshift(SANDBOX_CLIENT)
  customers.forEach((customer: InstallationModel) => {
    const existed = customerOptions.find(option => option.value === customer.customerId)
    if (customer.status === 'Active' && !existed) {
      customerOptions.push({
        value: customer.customerId,
        label: customer.customerName,
        description: customer.customerName,
      } as SelectOption)
    }
  })
  return customerOptions
}

export const onCreate = (dispatch: Dispatch, appId: string) => (values: FormValuesType) => {
  const params: CreateWebhookParams = {
    applicationId: appId,
    url: values.url,
    description: '',
    topicIds: values.topicIds,
    customerIds: values.customerIds,
    active: values.active,
  }
  dispatch(createWebhook(params))
}

export const onEdit = (dispatch: Dispatch, webhookId: string, appId: string) => (values: FormValuesType) => {
  const params: EditWebhookParams = {
    applicationId: appId,
    webhookId,
    url: values.url,
    description: '',
    topicIds: values.topicIds,
    customerIds: values.customerIds,
    active: values.active,
  }
  dispatch(editWebhook(params))
}

export const WebhookEditModal: React.FunctionComponent<WebhookEditProps> = ({
  isUpdate = false,
  appId,
  visible,
  webhookId = '',
  closeModal,
  afterClose,
}) => {
  const dispatch = useDispatch()
  const topics = useSelector(selectTopics)
  const customers = useSelector(selectCustomers)
  const loading = useSelector(selectLoading)
  const webhookData = useSelector(selectWebhookData)

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
      dispatch(requestWebhookData(webhookId))
    } else {
      dispatch(requestWebhookSubcriptionData(appId))
    }
    return () => {
      dispatch(webhookDataClear())
    }
  }, [])

  const onSubmit = isUpdate ? onEdit(dispatch, webhookId, appId) : onCreate(dispatch, appId)
  const onDelete = () => dispatch(deleteWebhook({ webhookId, applicationId: appId }))

  if (!visible) {
    return null
  }

  return (
    <Modal visible={visible} renderChildren afterClose={afterClose}>
      {loading ? (
        <Loader />
      ) : (
        <Formik initialValues={initFormValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ handleSubmit }) => {
            return (
              <>
                <ModalHeader title={modalConfig.title} />
                <ModalBody
                  body={
                    <Form>
                      <Content>
                        <p>
                          Webhooks are configured here to allow your application to receive real-time notifications
                          about the topics you choose to subscribe it to. A single webhook subscription can receive
                          notifications for multiple topics so long as your application has been granted the required
                          permissions.
                        </p>
                        <p>
                          Webhooks subscriptions can be set up for any customer who has installed your application.
                          Additionally, you can choose ‘SBOX’ to listen for sandbox environment notifications.
                        </p>
                      </Content>
                      <Input
                        id={webhookUrlField.name}
                        type="text"
                        placeholder={webhookUrlField.placeHolder}
                        name={webhookUrlField.name}
                        labelText={webhookUrlField.label as string}
                        required
                      />
                      <DropdownSelect
                        id={topicIdsField.name}
                        placeholder={topicIdsField.placeHolder}
                        name={topicIdsField.name}
                        labelText={topicIdsField.label as string}
                        options={topicOptions}
                        dropdownStyle={{ zIndex: 41 }}
                        required
                      />
                      <DropdownSelect
                        id={customerIdsField.name}
                        placeholder={customerIdsField.placeHolder}
                        name={customerIdsField.name}
                        labelText={customerIdsField.label as string}
                        options={customerOptions}
                        dropdownStyle={{ zIndex: 41 }}
                      />
                      <Checkbox id={activeField.name} name={activeField.name} labelText={activeField.label as string} />
                    </Form>
                  }
                />
                <ModalFooter
                  footerItems={
                    <Level className="w-100">
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
      )}
    </Modal>
  )
}

export type FormValuesType = {
  url: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}

export default React.memo(WebhookEditModal)
