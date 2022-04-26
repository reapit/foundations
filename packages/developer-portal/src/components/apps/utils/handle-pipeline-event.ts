import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { Dispatch, SetStateAction } from 'react'

export const handleSetInitialPipeline =
  (
    appPipeline: PipelineModelInterface | null,
    setAppPipeline: Dispatch<SetStateAction<PipelineModelInterface | null>>,
  ) =>
  () => {
    setAppPipeline(appPipeline)
  }
