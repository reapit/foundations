import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { CreateSubscriptionsButton, CreateSubscriptionsButtonProps } from '../create-subscriptions'

const props: CreateSubscriptionsButtonProps = {
  subscriptionType: 'applicationListing',
  developerId: 'DEVELOPER_ID',
  appId: 'APP_ID',
}

describe('CreateSubscriptionsButton', () => {
  it('should match a snapshot', () => {
    expect(render(<CreateSubscriptionsButton {...props} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
