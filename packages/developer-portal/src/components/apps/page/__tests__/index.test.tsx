import React from 'react'
import { AppsPage } from '../index'
import { render } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { Router } from 'react-router-dom'
import { history } from '../../../../core/router'
import Routes from '../../../../constants/routes'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'

jest.mock('../../state/use-app-state')
jest.mock('../../utils/consents', () => ({
  checkShouldRenderConsents: jest.fn(() => true),
}))
jest.mock('../../../../core/use-global-state')
window.reapit.config.pipelineWhitelist = ['MOCK_APP_ID']

const mockUseAppState = useAppState as jest.Mock

describe('AppsPage', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when I have the full menu', () => {
    window.reapit.config.pipelineWhitelist = [mockDeveloperModel.id as string]
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
