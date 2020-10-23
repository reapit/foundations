import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements'
import { RecoilRoot } from 'recoil'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ErrorBoundary>
  )
}

export default App
