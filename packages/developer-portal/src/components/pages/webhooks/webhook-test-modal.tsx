import React, { useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Content,
  Formik,
  SelectOption,
  Button,
  ModalFooter,
  SelectBox,
  Alert,
} from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { requestWebhookData } from '@/actions/webhooks-subscriptions'
import { selectWebhookTopicsSubcription, selectTopics, selectLoading } from '@/selector/webhooks-subscriptions'
import { TopicItem } from '@/reducers/webhooks-subscriptions/webhook-edit-modal'
import { PingWebhooksByIdParams } from '@/services/webhooks'
import { developerWebhookPing, developerSetWebhookPingStatus } from '@/actions/developer'
import { selectWebhookTestStatus } from '@/selector'
import { link } from '@/styles/elements/link'
import Routes from '@/constants/routes'
import { Loader } from '@reapit/elements/v3'

export interface GenerateTopicOptions {
  topics: TopicItem[]
  subcriptionTopicIds: string[]
}
export const generateTopicOptions = ({ topics, subcriptionTopicIds }: GenerateTopicOptions): SelectOption[] => {
  return subcriptionTopicIds.map((topicId) => {
    const topicData: TopicItem | undefined = topics.find((topic: TopicItem) => topic.id === topicId)
    return {
      value: topicData?.id,
      label: topicData?.name,
      description: topicData?.name,
    } as SelectOption
  })
}

export const fetchWebhookData = (dispatch: Dispatch, webhookId: string | undefined) => () => {
  webhookId && dispatch(requestWebhookData(webhookId))
}

export interface HandleSubmitForm {
  dispatch: Dispatch
  webhookId: string | undefined
}

export const handleSubmitForm = ({ dispatch, webhookId }: HandleSubmitForm) => (values) => {
  const { topicId } = values
  if (!webhookId || !topicId) return
  const params: PingWebhooksByIdParams = {
    id: webhookId,
    topicId: topicId,
  }
  dispatch(developerWebhookPing(params))
}
export interface WebhookTestModalFooterProps {
  closeModal: (() => void) | undefined
}

export const WebhookTestModalFooter: React.FunctionComponent<WebhookTestModalFooterProps> = ({ closeModal }) => {
  return (
    <ModalFooter
      footerItems={
        <>
          <Button className="mr-2" type="button" onClick={closeModal} variant="danger" fullWidth={true}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit" fullWidth={true}>
            TEST
          </Button>
        </>
      }
    />
  )
}

export interface WebhookTestModalBodyProps {
  topicOptions: SelectOption[]
}

export const WebhookTestModalBody: React.FunctionComponent<WebhookTestModalBodyProps> = ({ topicOptions }) => {
  return (
    <ModalBody
      body={
        <>
          <Content>
            {/* webhook link will be provide later. https://github.com/reapit/foundations/issues/1277 */}
            <p>
              To test your Webhook subscription, please select a subscription topic and an example payload for that
              topic will be sent to the configured URL. For more information, please{' '}
              <a
                className={link}
                href={`${Routes.API_DOCS}/api/webhooks#testing`}
                target="_blank"
                rel="noopener noreferrer"
              >
                click here
              </a>
            </p>
          </Content>
          <SelectBox id="topicId" name="topicId" labelText="Subscription Topics" options={topicOptions} required />
        </>
      }
    />
  )
}

export interface WebhookTestModalProps {
  visible: boolean
  afterClose: () => void
  webhookId?: string
  closeModal?: () => void
}
export const WebhookTestModal: React.FunctionComponent<WebhookTestModalProps> = ({
  visible,
  afterClose,
  webhookId,
  closeModal,
}) => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const topics = useSelector(selectTopics)
  const subcriptionTopicIds = useSelector(selectWebhookTopicsSubcription)
  const onSubmit = handleSubmitForm({ dispatch, webhookId })
  const topicOptions: SelectOption[] = generateTopicOptions({ topics, subcriptionTopicIds })

  useEffect(fetchWebhookData(dispatch, webhookId), [webhookId, dispatch])

  const initFormValues = {
    topicId: '',
  }

  return (
    <Modal visible={visible} renderChildren afterClose={afterClose}>
      {loading ? (
        <Loader label="Loading" />
      ) : (
        <Formik initialValues={initFormValues} onSubmit={onSubmit}>
          <Form>
            <ModalHeader title="Test Webhook Subscription" />
            <WebhookTestModalBody topicOptions={topicOptions} />
            <WebhookTestModalFooter closeModal={closeModal} />
            <WebhookTestResultModal />
          </Form>
        </Formik>
      )}
    </Modal>
  )
}

export const closeResultModal = (dispatch: Dispatch) => () => {
  dispatch(developerSetWebhookPingStatus(null))
}

export const WebhookTestResultModal: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const webhookTestStatus = useSelector(selectWebhookTestStatus)
  const closeModal = closeResultModal(dispatch)

  const visible = Boolean(webhookTestStatus)
  const success = webhookTestStatus === 'SUCCESS'
  const loading = webhookTestStatus === 'LOADING'

  return (
    <Modal visible={visible} renderChildren>
      {loading ? (
        <Loader label="Loading" />
      ) : (
        <>
          <Alert
            message={success ? 'Connection successful' : 'Connection unsuccessful'}
            type={success ? 'success' : 'danger'}
            className="mb-0"
          />
          <ModalBody
            body={
              success ? (
                <p>We have successfully established a connection to the URL provided</p>
              ) : (
                <p>
                  Unfortunately the connection was unsuccessful, please check to ensure you have entered a valid URL
                </p>
              )
            }
          />
          <ModalFooter
            footerItems={
              <Button className="mr-2" type="button" variant="primary" onClick={closeModal}>
                CLOSE
              </Button>
            }
          />
        </>
      )}
    </Modal>
  )
}

export default React.memo(WebhookTestModal)
