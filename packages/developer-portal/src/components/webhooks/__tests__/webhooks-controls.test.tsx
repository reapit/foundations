import React, { ChangeEvent } from 'react'
import { render } from '../../../tests/react-testing'
import Routes from '../../../constants/routes'
import WebhooksControls, { handleSelectFilters } from '../webhooks-controls'
import { History } from 'history'

jest.mock('../state/use-webhooks-state')

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

describe('WebhooksControls', () => {
  routes.forEach((route) => {
    it(`should match a snapshot for the ${route} page`, () => {
      window.location.pathname = route
      expect(render(<WebhooksControls />)).toMatchSnapshot()
    })
  })
})

describe('handleSelectFilters', () => {
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
    const curried = handleSelectFilters(setWebhookQueryParams, history)
    curried(event)
    expect(history.push).toHaveBeenCalledWith(
      `${history.location.pathname}?applicationId=${event.target.value}&from=2021-08-21&to=2021-09-21`,
    )
  })
})
