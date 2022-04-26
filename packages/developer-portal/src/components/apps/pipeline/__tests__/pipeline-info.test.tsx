import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockPipelineModelInterface } from '../../../../tests/__stubs__/pipeline'
import { handlePipelineEvent, PipelineInfo, PipelinePusherEvent } from '../pipeline-info'

jest.mock('../../state/use-app-state')

describe('Pipelineinfo', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineInfo />)).toMatchSnapshot()
  })
})

describe('handlePipelineEvent', () => {
  it('should handle pipeline event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline)

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

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
    )

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no pipeline', () => {
    const appPipeline = null
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline)

    curried({ pipeline: mockPipelineModelInterface } as PipelinePusherEvent)

    expect(setPipeline).not.toHaveBeenCalled()
  })

  it('should handle pipeline where no event', () => {
    const appPipeline = mockPipelineModelInterface
    const setPipeline = jest.fn()
    const curried = handlePipelineEvent(appPipeline, setPipeline)

    curried()

    expect(setPipeline).not.toHaveBeenCalled()
  })
})
