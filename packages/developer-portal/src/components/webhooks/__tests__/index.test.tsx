import React, { ChangeEvent } from 'react'
import { handleChangeTab, WebhooksWrapper } from '..'
import { render } from '../../../tests/react-testing'
import Routes from '../../../constants/routes'

jest.mock('../state/use-webhooks-state')

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

describe('WebhooksWrapper', () => {
  routes.forEach((route) => {
    it(`should match a snapshot for the ${route} page`, () => {
      window.location.pathname = route
      expect(render(<WebhooksWrapper />)).toMatchSnapshot()
    })
  })
})

describe('handleChangeTab', () => {
  it('should correctly change tab', () => {
    const navigate = jest.fn()
    const event = {
      target: {
        value: Routes.WEBHOOKS_MANAGE,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleChangeTab(navigate)
    curried(event)
    expect(navigate).toHaveBeenCalledWith(`${event.target.value}${window.location.search}`)
  })
})
