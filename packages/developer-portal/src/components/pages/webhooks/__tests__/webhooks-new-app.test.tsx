import React from 'react'
import { WebhooksNewApp } from '../webhooks-new-app'
import { reduxTestState, render } from '../../../../tests/react-testing'
import { appsDataStub } from '../../../../sagas/__stubs__/apps'
import appState from '../../../../reducers/__stubs__/app-state'

const webhookQueryParams = {
  applicationId: 'SOME_ID',
  to: 'TO',
  from: 'FROM',
}

describe('WebhooksNewApp', () => {
  it('should match a snapshot where there are apps', () => {
    reduxTestState.setState({
      apps: {
        ...appState.apps,
        list: {
          ...appState.apps.list,
          ...appsDataStub.data,
        },
      },
    })

    expect(
      render(<WebhooksNewApp webhookQueryParams={webhookQueryParams} register={jest.fn()} errors={{}} />),
    ).toMatchSnapshot()
    reduxTestState.resetState()
  })

  it('should match a snapshot where there are no apps', () => {
    expect(
      render(<WebhooksNewApp webhookQueryParams={webhookQueryParams} register={jest.fn()} errors={{}} />),
    ).toMatchSnapshot()
  })
})
