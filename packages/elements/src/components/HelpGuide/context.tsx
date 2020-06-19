import * as React from 'react'

function createContext<A>() {
  const ctx = React.createContext<A | undefined>(undefined)
  const useCtx = () => {
    const c = React.useContext(ctx)
    if (!c) throw new Error('useContext must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

export type HelpGuideContextValues = {
  current: number
  goNext: () => void
  goPrev: () => void
  isFirst: boolean
  isLast: boolean
  isLoading: boolean
}

export const [useHelpGuideContext, HelpGuideContextProvider] = createContext<HelpGuideContextValues>()
