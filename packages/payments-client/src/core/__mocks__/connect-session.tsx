import { mockBrowserSession } from '../../services/__mocks__/session'
export const reapitConnectBrowserSession = {
  connectSession: jest.fn(() => mockBrowserSession),
}
