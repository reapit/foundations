import React, { FC } from 'react'
import Router from './router'
import ErrorBoundary from '../components/error-boundary'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

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
