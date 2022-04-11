import { ReduxState } from '../../types/core'
import { mockWebhookLogs, subscriptions } from '../../sagas/__stubs__/webhooks'
import { WebhookCreateEditState } from '../webhooks-subscriptions/webhook-edit-modal'
import { webhookDataStub, webhookItemDataStub } from '../../sagas/__stubs__/webhook-edit'

export const appState: ReduxState = {
  error: {
    componentError: null,
    serverError: null,
  },
  developerSetStatus: {
    formState: 'PENDING',
  },
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  webhooksSubscriptions: {
    list: {
      isLoading: false,
      errorMessage: '',
      ...subscriptions,
    },
    edit: {
      loading: false,
      modalType: '',
      webhookCreateEditState: WebhookCreateEditState.INITIAL,
      subcriptionCustomers: webhookDataStub.subcriptionCustomers,
      subcriptionTopics: webhookDataStub.subcriptionTopics,
      webhookData: webhookItemDataStub,
    },
  },
  webhooksTopics: {
    list: {
      isLoading: false,
      errorMessage: '',
      _embedded: [],
    },
  },
  webhookLogs: {
    list: {
      isLoading: false,
      errorMessage: '',
      logs: mockWebhookLogs,
    },
  },
  developers: {
    members: {
      isLoading: false,
      data: [],
      inviteMember: {
        isLoading: false,
      },
      disableMember: {
        isLoading: false,
      },
      setAsAdmin: {
        isLoading: false,
      },
    },
    developerDetails: {
      isLoading: false,
      data: {},
    },
    memberDetails: {
      isLoading: false,
      data: {},
      inviteStatus: 'PENDING',
    },
  },
  currentMember: {
    isLoading: false,
    data: {
      id: '5d092fe0-daff-11ea-9712-0649ba4a135a',
      created: '2020-07-31T21:30:31',
      modified: '2020-08-12T09:15:20',
      email: 'cbryan@reapit.com',
      name: 'Craig Lorem',
      jobTitle: 'Head of Platform',
      status: 'active',
      role: 'admin',
      developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
      agencyCloudAccess: true,
      useCustomerData: false,
      sandboxId: 'GBR',
    },
    update: {
      state: 'UNKNOWN',
      isLoading: false,
    },
  },
}

export default appState
