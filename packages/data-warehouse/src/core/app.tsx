import React, { StrictMode } from 'react'
import Router from './router'
import ErrorBoundary from '../components/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

injectSwitchModeToWindow()

const App = () => {
  return (
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
}

export default App
