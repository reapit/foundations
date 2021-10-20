import React, { ChangeEvent } from 'react'
import { getTabContent, handleChangeTab, WebhooksWrapper, handleSelectAppId } from '../webhooks'
import { reduxTestState, render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import { History } from 'history'
import { appsDataStub } from '../../../../sagas/__stubs__/apps'
import appState from '../../../../reducers/__stubs__/app-state'

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    location: { search: '?applicationId=SOME_ID&to=2021-09-21&from=2021-08-21', pathname: '/webhooks/new' },
    push: () => {},
  }),
}))

describe('WebhooksWrapper', () => {
  reduxTestState.setState({
    apps: {
      ...appState.apps,
      list: {
        ...appState.apps.list,
        ...appsDataStub.data,
      },
    },
  })
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
      const selectAppIdHandler = jest.fn()
      const webhookQueryParams = {
        applicationId: 'SOME_ID',
        to: 'TO',
        from: 'FROM',
      }

      expect(render(getTabContent(route, webhookQueryParams, selectAppIdHandler))).toMatchSnapshot()
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

describe('handleSelectAppId', () => {
  it('should correctly update query', () => {
    const history = {
      push: jest.fn(),
      location: {
        search: '?applicationId=SOME_ID&to=2021-09-21&from=2021-08-21',
        pathname: Routes.WEBHOOKS_MANAGE,
      },
    } as unknown as History
    const event = {
      target: {
        value: 'SOME_NEW_ID',
        name: 'applicationId',
      },
    } as ChangeEvent<HTMLInputElement>
    const setWebhookQueryParams = jest.fn()
    const curried = handleSelectAppId(setWebhookQueryParams, history)
    curried(event)
    expect(history.push).toHaveBeenCalledWith(
      `${history.location.pathname}?applicationId=${event.target.value}&from=2021-08-21&to=2021-09-21`,
    )
  })
})
