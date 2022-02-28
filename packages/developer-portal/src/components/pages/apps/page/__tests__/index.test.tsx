import React from 'react'
import { AppsPage } from '../index'
import { render } from '../../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'

jest.mock('../../state/use-app-state')

const mockUseAppState = useAppState as jest.Mock

describe('AppsPage', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when apps are loading', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState,
        appsLoading: true,
      },
    })

    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when no apps are created', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState,
        apps: {
          totalCount: 0,
        },
      },
    })

    expect(render(<AppsPage />)).toMatchSnapshot()
  })
})
