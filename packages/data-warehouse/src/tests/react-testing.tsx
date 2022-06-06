/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with  UI providers as a testing convenience
 */

import React, { FC, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { MessageProvider } from '../context/message-context'

const CombinedProvider: FC = ({ children }) => {
  const history: History<any> = createBrowserHistory()
  return (
    <Router history={history}>
      <MessageProvider>
        <SnackProvider>
          <NavStateProvider>
            <MediaStateProvider>{children}</MediaStateProvider>
          </NavStateProvider>
        </SnackProvider>
      </MessageProvider>
    </Router>
  )
}

const customRender = (ui: ReactElement, options?: RenderOptions<typeof queries, HTMLElement>) =>
  render(<CombinedProvider>{ui}</CombinedProvider>, { ...options })

const setViewport = (size: 'Mobile' | 'Desktop') => {
  const width = size === 'Mobile' ? 450 : 1440
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })

  window.dispatchEvent(new Event('resize'))
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, setViewport }
