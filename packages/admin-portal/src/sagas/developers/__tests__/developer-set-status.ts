import { setRequestDeveloperStatusFormStateSaga, DEVELOPER_ID_NOT_EXIST } from '../developer-set-status'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  setRequestDeveloperStatusFormStateFailed,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateSuccess,
} from '@/actions/developer-set-status'

import { developerStub } from '../__stubs__/developer'
import { updateDeveloperById } from '@/services/developers'
import { errorMessages } from '@reapit/utils'
import { notification } from '@reapit/elements'

jest.mock('@/services/developers')

describe('setRequestDeveloperStatusFormStateSaga', () => {
  const gen = cloneableGenerator(setRequestDeveloperStatusFormStateSaga)({ data: developerStub })

  expect(gen.next().value).toEqual(put(setRequestDeveloperStatusFormStateLoading()))
  expect(gen.next().value).toEqual(call(updateDeveloperById, { ...developerStub, companyName: developerStub.company }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setRequestDeveloperStatusFormStateSuccess()))
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
      expect(clone.next().value).toEqual(put(setRequestDeveloperStatusFormStateFailed()))
      expect(clone.next().done).toBe(true)
    }
  })

  test('throw error when developerId is undefined', () => {
    const gen = cloneableGenerator(setRequestDeveloperStatusFormStateSaga)({
      data: { ...developerStub, id: undefined },
    })

    expect(gen.next().value).toEqual(
      call(notification.error, {
        message: DEVELOPER_ID_NOT_EXIST,
        placement: 'bottomRight',
      }),
    )
    expect(gen.next().value).toEqual(put(setRequestDeveloperStatusFormStateFailed()))
  })
})
