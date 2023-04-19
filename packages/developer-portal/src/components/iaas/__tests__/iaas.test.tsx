import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { useAppState } from '../../apps/state/use-app-state'
import { mockAppState } from '../../apps/state/__mocks__/use-app-state'
import { IaaS } from '../index'

jest.mock('../../apps/state/use-app-state')
jest.mock('../../../core/use-global-state')

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [
    {
      items: [],
      meta: {},
    },
    false,
    undefined,
    () => {},
  ]),
  useReapitUpdate: jest.fn(() => []),
  UpdateReturnTypeEnum: {
    RESPONSE: 'RESPONSE',
  },
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
    connectInternalRedirect: '',
  }),
}))

jest.mock('@harelpls/use-pusher', () => ({
  PusherProvider: () => <div></div>,
}))

describe('IaaS', () => {
  const mockUseAppState = useAppState as jest.Mock
  const mockUseReapitGet = useReapitGet as jest.Mock

  it('should match snapshot', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: null,
        appDetailLoading: false,
      },
    })
    mockUseReapitGet.mockReturnValue([null, true, undefined, () => {}])

    expect(render(<IaaS />)).toMatchSnapshot()
  })
})
