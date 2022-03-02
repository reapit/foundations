import React from 'react'
import { reduxTestState, render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import WebhooksControls from '../webhooks-controls'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'

const routes = [Routes.WEBHOOKS_NEW, Routes.WEBHOOKS_MANAGE, Routes.WEBHOOKS_LOGS, Routes.WEBHOOKS_ABOUT]

describe('WebhooksControls', () => {
  routes.forEach((route) => {
    it(`should match a snapshot for the ${route} page`, () => {
      window.location.pathname = route
      expect(
        render(
          <WebhooksControls
            selectAppIdHandler={jest.fn()}
            webhookQueryParams={{ applicationId: 'SOME_ID', to: '2021-09-01', from: '2021-08-01' }}
            apps={mockAppSummaryModelPagedResult.data as AppSummaryModel[]}
          />,
        ),
      ).toMatchSnapshot()
    })
  })

  reduxTestState.resetState()
})
