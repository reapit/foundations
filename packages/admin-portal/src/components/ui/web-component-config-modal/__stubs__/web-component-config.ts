import { ReduxState } from '@/types/core'

export const webComponentStub = {
  client: {
    webComponent: { loading: false, updating: false, data: null, isShowModal: true, negotiators: {} },
  },
  auth: {
    loginSession: {
      loginIdentity: {
        clientId: 'DXX',
      },
    },
  },
} as ReduxState
