import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { OrgIdStateProvider } from '../utils/use-org-id'

injectSwitchModeToWindow()

const App = () => {
  return (
    <ErrorBoundary>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <OrgIdStateProvider>
              <Router />
            </OrgIdStateProvider>
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
    </ErrorBoundary>
  )
}

export default App
