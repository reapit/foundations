/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with  UI providers as a testing convenience
 */

import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export type ViewPortSize = 'mobile' | 'tablet' | 'desktop' | 'widescreen' | 'superWidescreen'

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

const getWidth = (size: ViewPortSize) => {
  switch (size) {
    case 'mobile':
      return 450
    case 'tablet':
      return 850
    case 'desktop':
      return 1100
    case 'widescreen':
      return 1500
    case 'superWidescreen':
    default:
      return 2000
  }
}

export const viewPortOptions: ViewPortSize[] = ['mobile', 'tablet', 'desktop', 'widescreen', 'superWidescreen']

const setViewport = (size: ViewPortSize) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: getWidth(size),
  })

  window.dispatchEvent(new Event('resize'))
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, setViewport }
