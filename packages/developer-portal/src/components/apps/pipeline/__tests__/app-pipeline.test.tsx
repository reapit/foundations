import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AppPipeline } from '../app-pipeline'
import { useReapitGet } from '@reapit/utils-react'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'

jest.mock('../../state/use-app-state')

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{}]),
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

const mockUseReapitGet = useReapitGet as jest.Mock
const mockUseAppState = useAppState as jest.Mock

describe('AppPipeline', () => {
  it('should match snapshot', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: null,
        appDetailLoading: false,
      },
    })
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })

  it('should match snapshot where loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: null,
        appDetailLoading: false,
      },
    })
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })

  it('should match snapshot where no pipleline', () => {
    mockUseReapitGet.mockReturnValue([null, false])
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })

  it('should match snapshot where no appId', () => {
    mockUseReapitGet.mockReturnValue([null, false])
    mockUseAppState.mockReturnValue({ appId: null })
    mockUseAppState.mockReturnValue({
      appsDataState: {},
    })
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })
})
