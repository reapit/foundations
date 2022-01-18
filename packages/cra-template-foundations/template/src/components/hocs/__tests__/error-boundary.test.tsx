import React, { FC } from 'react'
import { render } from '@testing-library/react'
import { ErrorBoundary } from '../error-boundary'

const Component: FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

describe('ErrorBoundary', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>,
      ),
    ).toMatchSnapshot()
  })
})
