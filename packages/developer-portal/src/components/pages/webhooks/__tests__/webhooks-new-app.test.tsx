import React from 'react'
import { WebhooksNewApp } from '../webhooks-new-app'
import { reduxTestState, render } from '../../../../tests/react-testing'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'

const webhookQueryParams = {
  applicationId: 'SOME_ID',
  to: 'TO',
  from: 'FROM',
}

describe('WebhooksNewApp', () => {
  it('should match a snapshot where there are apps', () => {
    expect(
      render(
        <WebhooksNewApp
          apps={mockAppSummaryModelPagedResult.data as AppSummaryModel[]}
          webhookQueryParams={webhookQueryParams}
          register={jest.fn()}
          errors={{}}
        />,
      ),
    ).toMatchSnapshot()
    reduxTestState.resetState()
  })

  it('should match a snapshot where there are no apps', () => {
    expect(
      render(
        <WebhooksNewApp
          apps={mockAppSummaryModelPagedResult.data as AppSummaryModel[]}
          webhookQueryParams={webhookQueryParams}
          register={jest.fn()}
          errors={{}}
        />,
      ),
    ).toMatchSnapshot()
  })
})
