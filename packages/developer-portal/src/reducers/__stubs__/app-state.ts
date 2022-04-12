import { ReduxState } from '../../types/core'

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
