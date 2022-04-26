import React from 'react'
import {
  handleDeletePipeline,
  handlePipelineRunnerSuccess,
  handleSaveConfig,
  handleSavePipeline,
  handleUpdatePipelineRunner,
  PipelineControls,
} from '../pipeline-controls'
import { render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { mockPipelineModelInterface } from '../../../../tests/__stubs__/pipeline'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
    },
  })),
}))

const mockUseAppState = useAppState as jest.Mock

describe('PipelineControls', () => {
  beforeEach(() => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)
  })

  const routes = [Routes.APP_PIPELINE, Routes.APP_PIPELINE_CONFIGURE, Routes.APP_PIPELINE_NEW]

  routes.forEach((route) => {
    it(`should match snapshot for route ${route}`, () => {
      window.location.pathname = route
      expect(render(<PipelineControls />)).toMatchSnapshot()
    })
  })

  it('should match snapshot where there is no pipeline', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appPipelineState: {
        appPipeline: null,
      },
    })
    expect(render(<PipelineControls />)).toMatchSnapshot()
  })

  it('should match snapshot where pipeline is provisioning', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appPipelineState: {
        appPipeline: {
          ...mockAppState.appPipelineState.appPipeline,
          buildStatus: 'PROVISIONING',
        },
      },
    })
    expect(render(<PipelineControls />)).toMatchSnapshot()
  })
})

describe('handlePipelineRunnerSuccess', () => {
  it('should handle pipeline runner success', () => {
    const setAppPipelineDeploying = jest.fn()
    const updatePipelineRunnerSuccess = true
    const curried = handlePipelineRunnerSuccess(setAppPipelineDeploying, updatePipelineRunnerSuccess)

    curried()

    expect(setAppPipelineDeploying).toHaveBeenCalledWith(true)
  })
})

describe('handleSaveConfig', () => {
  it('should handle saving config', () => {
    const setAppPipelineSaving = jest.fn()
    const curried = handleSaveConfig(setAppPipelineSaving)

    curried()

    expect(setAppPipelineSaving).toHaveBeenCalledWith(true)
  })
})

describe('handleSavePipeline', () => {
  it('should handle pipeline saving', () => {
    const sendPipelineUpdate = jest.fn()
    const pipelineUpdate = mockPipelineModelInterface
    const curried = handleSavePipeline(sendPipelineUpdate, pipelineUpdate)

    curried()

    expect(sendPipelineUpdate).toHaveBeenCalledWith(pipelineUpdate)
  })
})

describe('handleUpdatePipelineRunner', () => {
  it('should handle updating runner', () => {
    const updatePipelineRunner = jest.fn()
    const curried = handleUpdatePipelineRunner(updatePipelineRunner)

    curried()

    expect(updatePipelineRunner).toHaveBeenCalledTimes(1)
  })
})

describe('handleDeletePipeline', () => {
  it('should handle pipeline deletion', async () => {
    const deletePipeline = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const setAppPipeline = jest.fn()
    const closeModal = jest.fn()
    const curried = handleDeletePipeline(deletePipeline, setAppPipeline, closeModal)

    await curried()

    expect(deletePipeline).toHaveBeenCalledTimes(1)
    expect(setAppPipeline).toHaveBeenCalledWith(null)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
