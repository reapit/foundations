import { errorThrownServer } from '@/actions/error'
import { developerSetStatusRequestSaga } from '../developer-set-status'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  developerSetStatusRequestFailure,
  developerSetStatusRequestLoading,
  developerSetStatusRequestSuccess
} from '@/actions/developer-set-status'
import errorMessages from '@/constants/error-messages'
import { developerStub } from '../__stubs__/developer'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'

describe('developerSetStatusRequestSaga', () => {
  const gen = cloneableGenerator(developerSetStatusRequestSaga)({ data: developerStub })

  expect(gen.next().value).toEqual(put(developerSetStatusRequestLoading()))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.developers}/${developerStub.id}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      body: { ...developerStub, companyName: developerStub.company },
      method: 'PUT',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(developerSetStatusRequestSuccess()))
  })

  test('throw error when developerId is undefined', () => {
    const gen = cloneableGenerator(developerSetStatusRequestSaga)({ data: { ...developerStub, id: undefined } })

    expect(gen.next().value).toEqual(put(developerSetStatusRequestFailure()))
    expect(gen.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
  })
})
