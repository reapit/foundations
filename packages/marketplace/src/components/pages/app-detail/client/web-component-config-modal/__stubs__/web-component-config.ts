import { ReduxState } from '@/types/core'

export const webComponentStub = {
  client: {
    webComponent: { loading: false, updating: false, data: null, isShowModal: true, negotiators: {} },
  },
} as ReduxState
