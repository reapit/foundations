import '@reapit/elements/dist/index.css'
import React, { StrictMode } from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GithubProvider } from '../components/apps/pipeline/github'

const queryClient = new QueryClient()

injectSwitchModeToWindow()

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <GithubProvider>
              <Router />
            </GithubProvider>
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)

export default App
