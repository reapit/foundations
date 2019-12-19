import { createContext, useContext } from 'react'
import { HelpGuideStepProps } from '.'

export type HelpGuideContextValues = {
  current: string
  goNext: () => void
  goPrev: () => void
  currentIndex: number
  isFirst: boolean
  isLast: boolean
  steps: HelpGuideStepProps[]
  isLoading: boolean
}

// @ts-ignore: ignore fulfill default values
export const HelpGuideContext = createContext<HelpGuideContextValues>({})

export const useHelpGuideContext = (): HelpGuideContextValues => {
  return useContext(HelpGuideContext)
}
