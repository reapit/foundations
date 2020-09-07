import { notification } from '@reapit/elements'
import { developerSetStatusRequestSaga } from '../developer-set-status'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  developerSetStatusRequestFailure,
  developerSetStatusRequestLoading,
  developerSetStatusRequestSuccess,
} from '@/actions/developer-set-status'
import errorMessages from '@/constants/error-messages'
import { developerStub } from '../__stubs__/developer'
import { updateDeveloperById } from '@/services/developers'

jest.mock('@/services/developers')

describe('developerSetStatusRequestSaga', () => {
  const gen = cloneableGenerator(developerSetStatusRequestSaga)({ data: developerStub })

  expect(gen.next().value).toEqual(put(developerSetStatusRequestLoading()))
  expect(gen.next().value).toEqual(call(updateDeveloperById, { ...developerStub, companyName: developerStub.company }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(developerSetStatusRequestSuccess()))
  })

  test('throw error when developerId is undefined', () => {
    const gen = cloneableGenerator(developerSetStatusRequestSaga)({ data: { ...developerStub, id: undefined } })

    expect(gen.next().value).toEqual(put(developerSetStatusRequestFailure()))
    expect(gen.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
      }),
    )
  })
})
