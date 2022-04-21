import { mockPipelineModelInterface } from '../../../../tests/__stubs__/pipeline'
import { handleSetInitialPipeline } from '../handle-pipeline-event'

describe('handleSavePipeline', () => {
  it('should handle pipeline saving', () => {
    const appPipeline = mockPipelineModelInterface
    const setAppPipeline = jest.fn()
    const curried = handleSetInitialPipeline(appPipeline, setAppPipeline)

    curried()

    expect(setAppPipeline).toHaveBeenCalledWith(appPipeline)
  })
})
