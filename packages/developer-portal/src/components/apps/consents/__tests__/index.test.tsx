import React from 'react'
import { render } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { AppConsentsPage } from '../index'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{ clientSecret: 'MOCK_SECRET' }]),
}))
jest.useFakeTimers()

const mockUseAppState = useAppState as jest.Mock

describe('AppConsentsPage', () => {
  it('should match snapshot', () => {
    expect(render(<AppConsentsPage />)).toMatchSnapshot()
  })

  it('should match snapshot where there are new consents', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsEditState: {
        appConsents: null,
      },
    })
    expect(render(<AppConsentsPage />)).toMatchSnapshot()
  })
})
