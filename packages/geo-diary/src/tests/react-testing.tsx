/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with  UI providers as a testing convenience
 */

import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/client'
import { MemoryRouter, Route, Routes } from 'react-router'

const CombinedProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackProvider>
      <NavStateProvider>
        <MediaStateProvider>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<ApolloProvider client={client}> {children}</ApolloProvider>} />
            </Routes>
          </MemoryRouter>
        </MediaStateProvider>
      </NavStateProvider>
    </SnackProvider>
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
