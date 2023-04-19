/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

const CombinedProvider: FC<PropsWithChildren> = ({ children }) => {
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

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
