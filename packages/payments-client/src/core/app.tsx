import '@reapit/elements/dist/index.css'
import React, { FC } from 'react'
import Router from './router'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from '../components/error-boundary'

const queryClient = new QueryClient()

injectSwitchModeToWindow()

const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <Router />
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
