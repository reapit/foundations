import { mockLoginSession } from '../../utils/__mocks__/session'

export default {
  dispatch: jest.fn(),
  state: {
    auth: {
      loginSession: mockLoginSession,
      refreshSession: null,
    },
  },
}
