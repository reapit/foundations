import * as React from 'react'
import { css } from 'linaria'
import { PortalProvider } from '@reapit/elements'
import Router from './router'
import UploadProvider from '@/components/providers/upload-provider'

export const globals = css`
  :global() {
    td.hidden-cell {
      display: none;
    }
  }
`

const App = () => {
  return (
    <PortalProvider>
      <UploadProvider>
        <Router />
      </UploadProvider>
    </PortalProvider>
  )
}

export default App
