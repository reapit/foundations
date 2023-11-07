import React, { StrictMode } from 'react'
import Router from './router'
import { css } from '@linaria/core'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@reapit/elements/dist/index.css' // can't get this to resolve with vite. Second app where I've had this issue. Must be something I'm missing?

const queryClient = new QueryClient()

export const globals = css`
  :global() {
    body {
      background: #262f69;
    }

    #root {
      height: 100%;
      background: #f2f2f2;
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
