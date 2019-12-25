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

export const HelpGuideContext = createContext<HelpGuideContextValues>({
  current: '',
  currentIndex: 0,
  goNext: () => null,
  goPrev: () => null,
  isFirst: true,
  isLast: false,
  steps: [],
  isLoading: false
})

export const useHelpGuideContext = (): HelpGuideContextValues => {
  return useContext(HelpGuideContext)
}
