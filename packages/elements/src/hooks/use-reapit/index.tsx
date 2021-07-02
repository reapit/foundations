import React from 'react'
import { NavState, NavStateProvider } from '../use-nav-state'
import { MediaStateProvider, MediaType } from '../use-media-query'
import { SnackProvider, SnackContextProps } from '../use-snack'

export type ReapitElements = NavState & MediaType & SnackContextProps

export const ReapitProvider: React.FC = ({ children }) => (
  <NavStateProvider>
    <MediaStateProvider>
      <SnackProvider>
        {children}
      </SnackProvider>
    </MediaStateProvider>
  </NavStateProvider>
)
