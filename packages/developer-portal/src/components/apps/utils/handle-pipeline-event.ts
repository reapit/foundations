import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { Dispatch, SetStateAction } from 'react'

export const handleSetInitialPipeline =
  (
    appPipeline: (PipelineModelInterface & { runtime: string }) | null,
    setAppPipeline: Dispatch<SetStateAction<(PipelineModelInterface & { runtime: string }) | null>>,
  ) =>
  () => {
    setAppPipeline(appPipeline)
  }
