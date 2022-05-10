import React from 'react'
import { render, setViewport } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { PipelinePage } from '../pipeline-page'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
  })),
}))

const mockUseAppState = useAppState as jest.Mock

describe('PipelinePage', () => {
  it('should match snapshot', () => {
    expect(render(<PipelinePage />)).toMatchSnapshot()
  })

  it('should match snapshot where loading', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appPipelineState: {
        appPipelineLoading: true,
      },
    })
    expect(render(<PipelinePage />)).toMatchSnapshot()
  })

  it('should match snapshot where no pipeline', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appPipelineState: {
        appPipeline: null,
      },
    })
    expect(render(<PipelinePage />)).toMatchSnapshot()
  })

  it('should match snapshot where no pipeline or app', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appPipelineState: {
        appPipeline: null,
      },
      appsDataState: {
        appDetail: null,
      },
    })
    expect(render(<PipelinePage />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<PipelinePage />)).toMatchSnapshot()
  })
})
