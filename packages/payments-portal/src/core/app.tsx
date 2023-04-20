import React, { FC } from 'react'
import Router from './router'
import { SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from '../components/error-boundary'

const queryClient = new QueryClient()

const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SnackProvider>
        <Router />
      </SnackProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
