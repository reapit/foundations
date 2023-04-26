import React, { FC, StrictMode } from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import ErrorBoundary from '../components/error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

injectSwitchModeToWindow()

const App: FC = () => (
  <ErrorBoundary>
    <StrictMode>
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
    </StrictMode>
  </ErrorBoundary>
)

export default App
