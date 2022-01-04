import React from 'react'
import { reduxTestState, render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import { appsDataStub } from '../../../../sagas/__stubs__/apps'
import appState from '../../../../reducers/__stubs__/app-state'
import WebhooksControls from '../webhooks-controls'

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    location: { search: '?applicationId=SOME_ID&to=2021-09-21&from=2021-08-21', pathname: '/webhooks/new' },
    push: () => {},
  }),
}))

describe('WebhooksControls', () => {
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
      expect(
        render(
          <WebhooksControls
            selectAppIdHandler={jest.fn()}
            webhookQueryParams={{ applicationId: 'SOME_ID', to: '2021-09-01', from: '2021-08-01' }}
          />,
        ),
      ).toMatchSnapshot()
    })
  })

  reduxTestState.resetState()
})
