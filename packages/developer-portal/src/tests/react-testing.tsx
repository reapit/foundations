/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with  UI providers as a testing convenience
 */

import React, { FC, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const CombinedProvider: FC = ({ children }) => {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>{children}</MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
    </Router>
  )
}

const customRender = (ui: ReactElement, options?: RenderOptions<typeof queries, HTMLElement>) =>
  render(<CombinedProvider>{ui}</CombinedProvider>, { ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
