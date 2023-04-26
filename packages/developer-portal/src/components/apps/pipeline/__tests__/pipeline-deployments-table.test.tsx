import React from 'react'
import { render } from '../../../../tests/react-testing'
import {
  handleNewRunner,
  handlePipelineRunnerRefresh,
  PipelineDeploymentTable,
  PipelineRunnerEvent,
} from '../pipeline-deployments-table'
import { mockPipelineModelInterface, mockPipelineRunnerResponse } from '../../../../tests/__stubs__/pipeline'
import { useReapitGet } from '@reapit/use-reapit-data'

jest.mock('../../state/use-app-state')

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockPipelineRunnerResponse, false, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('PipelineDeploymentTable', () => {
  it('should match snapshot', () => {
    expect(render(<PipelineDeploymentTable />)).toMatchSnapshot()
  })

  it('should match snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true, undefined, jest.fn()])
    expect(render(<PipelineDeploymentTable />)).toMatchSnapshot()
  })
})

describe('handlePipelineRunnerRefresh', () => {
  it('should handle pipeline runner refresh', () => {
    const setAppPipelineDeploying = jest.fn()
    const refreshPipelineRunners = jest.fn()
    const appPipelineDeploying = true
    const curried = handlePipelineRunnerRefresh(setAppPipelineDeploying, refreshPipelineRunners, appPipelineDeploying)

    curried()

    expect(setAppPipelineDeploying).toHaveBeenCalledWith(false)
    expect(refreshPipelineRunners).toHaveBeenCalledTimes(1)
  })
})

describe('handleNewRunner', () => {
  it('should handle pipeline runner refresh where there are current items', () => {
    const appPipeline = mockPipelineModelInterface
    const pipelineDeploymentsItems = mockPipelineRunnerResponse.items
    const setPipelineDeploymentItems = jest.fn()
    const curried = handleNewRunner(
      appPipeline,
      pipelineDeploymentsItems,
      setPipelineDeploymentItems,
      appPipeline.id ?? null,
    )

    curried({ pipeline: mockPipelineModelInterface } as PipelineRunnerEvent)

    expect(setPipelineDeploymentItems).toHaveBeenCalledWith(
      pipelineDeploymentsItems.map((item) => {
        return item.id === mockPipelineModelInterface.id ? event : item
      }),
    )
  })

  it('should handle pipeline runner refresh where no current items', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipelineDeploymentItems = jest.fn()
    const curried = handleNewRunner(appPipeline, [], setPipelineDeploymentItems, appPipeline.id ?? null)

    curried({ pipeline: mockPipelineModelInterface } as PipelineRunnerEvent)

    expect(setPipelineDeploymentItems).toHaveBeenCalledWith([{ pipeline: mockPipelineModelInterface }])
  })

  it('should handle pipeline runner refresh where there is no event pipeline', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipelineDeploymentItems = jest.fn()
    const curried = handleNewRunner(appPipeline, [], setPipelineDeploymentItems, appPipeline.id ?? null)

    curried({} as PipelineRunnerEvent)

    expect(setPipelineDeploymentItems).not.toHaveBeenCalled()
  })

  it('should handle pipeline runner refresh with no event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipelineDeploymentItems = jest.fn()
    const curried = handleNewRunner(appPipeline, [], setPipelineDeploymentItems, appPipeline.id ?? null)

    curried()

    expect(setPipelineDeploymentItems).not.toHaveBeenCalled()
  })
})
