import React from 'react'
import { shallow } from 'enzyme'
import {
  AWSStatus,
  CheckAWSButton,
  checkIsAws,
  handleSetAwsStatus,
  handleSetWebHooksLoading,
} from '../check-aws-button'
import { fetchWebookSubscriptions } from '../../../../services/webhooks'

jest.mock('../../../../services/webhooks', () => ({
  fetchWebookSubscriptions: jest.fn(() => true),
}))

const mockedFetchSubs = fetchWebookSubscriptions as jest.Mock

describe('CheckAWSButton', () => {
  it('should match a snapshot where the AWS status is unfetched', () => {
    expect(shallow(<CheckAWSButton appId="SOME_ID" status={AWSStatus.Unfetched} />)).toMatchSnapshot()
  })

  it('should match a snapshot where the AWS status is AllUsers', () => {
    expect(shallow(<CheckAWSButton appId="SOME_ID" status={AWSStatus.AllUsers} />)).toMatchSnapshot()
  })

  it('should match a snapshot where the AWS status is AWSOnly', () => {
    expect(shallow(<CheckAWSButton appId="SOME_ID" status={AWSStatus.AWSOnly} />)).toMatchSnapshot()
  })
})

describe('checkIsAws', () => {
  it('should return true when has data topics with real customers and active webhook', () => {
    const subs = [
      {
        topicIds: ['applicants.update'],
        customerIds: ['RES'],
        active: true,
      },
    ]

    expect(checkIsAws(subs)).toBe(true)
  })

  it('should return false when has data topics with real customers and inactive webhook', () => {
    const subs = [
      {
        topicIds: ['applicants.create'],
        customerIds: ['RES'],
        active: false,
      },
    ]

    expect(checkIsAws(subs)).toBe(false)
  })

  it('should return false when has only an install topic with real customers and active webhook', () => {
    const subs = [
      {
        topicIds: ['application.install'],
        customerIds: ['RES'],
        active: true,
      },
    ]

    expect(checkIsAws(subs)).toBe(false)
  })

  it('should return false when has data topics with sandbox data and active webhook', () => {
    const subs = [
      {
        topicIds: ['applicants.update'],
        customerIds: ['SBOX'],
        active: true,
      },
    ]

    expect(checkIsAws(subs)).toBe(false)
  })
})

describe('handleSetWebHooksLoading', () => {
  it('should set webhooks loading', () => {
    const mockSetAwsStatus = jest.fn()
    const curried = handleSetWebHooksLoading(mockSetAwsStatus)
    curried()
    expect(mockSetAwsStatus).toHaveBeenCalledWith(AWSStatus.Fetching)
  })
})

describe('handleSetAwsStatus', () => {
  it('should set an AWS status if the subscriptions endpoint returns', async () => {
    const mockSetAwsStatus = jest.fn()
    const curried = handleSetAwsStatus(mockSetAwsStatus, AWSStatus.Fetching, 'SOME_ID')

    await curried()

    expect(mockSetAwsStatus).toHaveBeenCalledWith(AWSStatus.AllUsers)
  })

  it('should set AWS status to unfetched if the subscriptions endpoint does not return', async () => {
    mockedFetchSubs.mockReturnValue(undefined)

    const mockSetAwsStatus = jest.fn()
    const curried = handleSetAwsStatus(mockSetAwsStatus, AWSStatus.Fetching, 'SOME_ID')

    await curried()

    expect(mockSetAwsStatus).toHaveBeenCalledWith(AWSStatus.Unfetched)
  })
})
