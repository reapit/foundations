import React from 'react'
import { Router } from 'react-router-dom'
import Routes from '../../../../../constants/routes'
import { history } from '../../../../../core/router'
import { render } from '../../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { handleSetAppEditSaving, Helper } from '../helper'

jest.mock('../../state/use-app-state')

const mockUseAppState = useAppState as jest.Mock

describe('Helper', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where isListed', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: true,
        },
      },
      appTabsState: {
        isListed: true,
      },
    })

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where setting isListed', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: false,
        },
      },
      appTabsState: {
        isListed: true,
      },
    })

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsDetail page', () => {
    history.push(`${Routes.APPS}/mock-id`)
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetAppEditSaving', () => {
  it('should handle app saving', () => {
    const setAppEditSaving = jest.fn()
    const curried = handleSetAppEditSaving(setAppEditSaving)

    curried()

    expect(setAppEditSaving).toHaveBeenCalledWith(true)
  })
})
