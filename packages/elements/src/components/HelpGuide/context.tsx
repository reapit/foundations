import * as React from 'react'
import { HelpGuideStepProps } from '.'

function createContext<A>() {
  const ctx = React.createContext<A | undefined>(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (!c) throw new Error('useContext must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

export type HelpGuideContextValues = {
  current: string
  goNext: () => void
  goPrev: () => void
  goTo: (stepIndex: number) => void
  currentIndex: number
  isFirst: boolean
  isLast: boolean
  steps: HelpGuideStepProps[]
  isLoading: boolean
}

export const [useHelpGuideContext, HelpGuideContextProvider] = createContext<HelpGuideContextValues>()
