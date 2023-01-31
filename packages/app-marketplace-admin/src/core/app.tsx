import React, { FC } from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import ErrorBoundary from './error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <NavStateProvider>
        <MediaStateProvider>
          <SnackProvider>
            <Router />
          </SnackProvider>
        </MediaStateProvider>
      </NavStateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
