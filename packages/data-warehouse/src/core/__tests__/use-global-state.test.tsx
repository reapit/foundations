import React from 'react'
import { render } from '../../tests/react-testing'
import { GlobalProvider } from '../use-global-state'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
}))

describe('GlobalProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <GlobalProvider>
          <div />
        </GlobalProvider>,
      ),
    ).toMatchSnapshot()
  })
})
