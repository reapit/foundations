/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with  UI providers as a testing convenience
 */

import React, { FC, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const CombinedProvider: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<>{children}</>} />
              </Routes>
            </MemoryRouter>
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
    </QueryClientProvider>
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
