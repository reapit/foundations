/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

import React, { FC, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const CombinedProvider: FC = ({ children }) => {
  const history: History<any> = createBrowserHistory()
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <SnackProvider>
          <NavStateProvider>
            <MediaStateProvider>{children}</MediaStateProvider>
          </NavStateProvider>
        </SnackProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options?: RenderOptions<typeof queries, HTMLElement>) =>
  render(<CombinedProvider>{ui}</CombinedProvider>, { ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
