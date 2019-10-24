import { createContext } from 'react'
import { SearchStore } from './hooks/search-store'
import { Theme } from './theme'

export const context = createContext<SearchStore & { theme: Theme } | null>(
  null
)
