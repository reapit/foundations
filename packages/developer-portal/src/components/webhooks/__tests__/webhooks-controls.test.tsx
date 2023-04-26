import React, { ChangeEvent } from 'react'
import { render } from '../../../tests/react-testing'
import Routes from '../../../constants/routes'
import WebhooksControls, { handleSelectFilters } from '../webhooks-controls'

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
    const navigate = jest.fn()
    const event = {
      target: {
        value: 'SOME_NEW_ID',
        name: 'applicationId',
      },
    } as ChangeEvent<HTMLInputElement>
    const setWebhookQueryParams = jest.fn()
    const curried = handleSelectFilters(setWebhookQueryParams, navigate)
    curried(event)
    expect(navigate).toHaveBeenCalledWith(
      `${window.location.pathname}?applicationId=${event.target.value}&from=2019-10-10&to=2019-10-10`,
    )
  })
})
