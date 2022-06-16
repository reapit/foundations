import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockPipelineModelInterface } from '../../../../tests/__stubs__/pipeline'
import {
  handlePipelineEvent,
  handleRunnerEvent,
  PusherEventWrapper,
  PipelinePusherEvent,
} from '../pusher-event-wrapper'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

describe('PusherEventWrapper', () => {
  it('Should match snapshot', () => {
    expect(render(<PusherEventWrapper />)).toMatchSnapshot()
  })
})

describe('handlePipelineEvent', () => {
  it('should handle pipeline event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline, appPipeline.id ?? null)

    curried(mockPipelineModelInterface)

    expect(setPipeline).toHaveBeenCalledWith(mockPipelineModelInterface)
  })

  it('should handle pipeline event where ids do not match', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(
      {
        ...appPipeline,
        id: 'SOME_RANDOM_ID',
      },
      setPipeline,
      appPipeline.id ?? null,
    )

    curried(mockPipelineModelInterface)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no pipeline', () => {
    const appPipeline = null
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline, null)

    curried(mockPipelineModelInterface)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline, appPipeline.id ?? null)

    curried()

    expect(setPipeline).not.toHaveBeenCalled()
  })
})

describe('handleRunnerEvent', () => {
  it('should handle pipeline event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handleRunnerEvent(appPipeline, setPipeline, appPipeline.id ?? null)

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

    expect(setPipeline).toHaveBeenCalledWith(mockPipelineModelInterface)
  })

  it('should handle pipeline event where ids do not match', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handleRunnerEvent(
      {
        ...appPipeline,
        id: 'SOME_RANDOM_ID',
      },
      setPipeline,
      appPipeline.id ?? null,
    )

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no pipeline', () => {
    const appPipeline = null
    const setPipeline = jest.fn()
    const curried = handleRunnerEvent(appPipeline, setPipeline, null)

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handleRunnerEvent(appPipeline, setPipeline, appPipeline.id ?? null)

    curried()

    expect(setPipeline).not.toHaveBeenCalled()
  })
})
