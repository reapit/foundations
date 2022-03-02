import React from 'react'
import { AppsPage } from '../index'
import { render } from '../../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { Router } from 'react-router-dom'
import { history } from '../../../../../core/router'
import Routes from '../../../../../constants/routes'

jest.mock('../../state/use-app-state')

const mockUseAppState = useAppState as jest.Mock

describe('AppsPage', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when I have the full menu', () => {
    history.push(`${Routes.APPS}/mock-id`)
    expect(
      render(
        <Router history={history}>
          <AppsPage />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when apps are loading', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appsLoading: true,
      },
    })

    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when no apps are created', () => {
    mockUseAppState.mockReturnValueOnce({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        apps: {
          totalCount: 0,
        },
      },
    })

    expect(render(<AppsPage />)).toMatchSnapshot()
  })
})
