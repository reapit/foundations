import React, { ChangeEvent } from 'react'
import { getTabContent, handleChangeTab, WebhooksWrapper } from '../webhooks'
import { reduxTestState, render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import { History } from 'history'

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

describe('WebhooksWrapper', () => {
  routes.forEach((route) => {
    it(`should match a snapshot for the ${route} page`, () => {
      window.location.pathname = route
      expect(render(<WebhooksWrapper />)).toMatchSnapshot()
    })
  })

  reduxTestState.resetState()
})

describe('getTabContent', () => {
  routes.forEach((route) => {
    it(`should match a snapshot for route ${route}`, () => {
      expect(render(getTabContent(route))).toMatchSnapshot()
    })
  })
})

describe('handleChangeTab', () => {
  it('should correctly change tab', () => {
    const history = {
      push: jest.fn(),
      location: {
        search: '?applicationId=SOME_ID&to=2021-09-21&from=2021-08-21',
      },
    } as unknown as History
    const event = {
      target: {
        value: Routes.WEBHOOKS_MANAGE,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleChangeTab(history)
    curried(event)
    expect(history.push).toHaveBeenCalledWith(`${event.target.value}${history.location.search}`)
  })
})
