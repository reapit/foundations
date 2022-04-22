import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockAppDetailModel } from '../../../../tests/__stubs__/apps'
import { mockTopicModelPagedResult } from '../../../../tests/__stubs__/webhooks'
import { handleSetTopics, WebhooksProvider } from '../use-webhooks-state'

describe('WebhooksProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksProvider>
          <div />
        </WebhooksProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetTopics', () => {
  it('should filter topics', () => {
    const setTopics = jest.fn()
    const curried = handleSetTopics(mockAppDetailModel, mockTopicModelPagedResult, setTopics)

    curried()
    expect(setTopics).toHaveBeenCalledWith(mockTopicModelPagedResult._embedded)
  })
})
