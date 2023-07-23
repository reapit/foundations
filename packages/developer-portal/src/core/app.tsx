import React, { StrictMode } from 'react'
import Router from './router'
import { css } from '@linaria/core'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const globals = css`
  :global() {
    body {
      background: #fff;
    }

    #root {
      height: 100%;
    }
  }
`

injectSwitchModeToWindow()

const App = () => (
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
)

export default App
