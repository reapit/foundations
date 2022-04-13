import React from 'react'
import Router from './router'
import { css } from '@linaria/core'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'

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
  <SnackProvider>
    <NavStateProvider>
      <MediaStateProvider>
        <Router />
      </MediaStateProvider>
    </NavStateProvider>
  </SnackProvider>
)

export default App
