import '@reapit/elements/dist/index.css'
import * as React from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { OrgIdStateProvider } from '../utils/use-org-id'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from '../components/error-boundary'
import { StrictMode } from 'react'

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
                <OrgIdStateProvider>
                  <Router />
                </OrgIdStateProvider>
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
