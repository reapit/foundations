import { errorThrownServer } from '@/actions/error'
import { setRequestDeveloperStatusFormStateSaga } from '../developer-set-status'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  setRequestDeveloperStatusFormStateFailed,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateSuccess,
} from '@/actions/developer-set-status'
import errorMessages from '@/constants/error-messages'
import { developerStub } from '../__stubs__/developer'
import { updateDeveloperById } from '@/services/developers'

jest.mock('@/services/developers')

describe('setRequestDeveloperStatusFormStateSaga', () => {
  const gen = cloneableGenerator(setRequestDeveloperStatusFormStateSaga)({ data: developerStub })

  expect(gen.next().value).toEqual(put(setRequestDeveloperStatusFormStateLoading()))
  expect(gen.next().value).toEqual(call(updateDeveloperById, { ...developerStub, companyName: developerStub.company }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setRequestDeveloperStatusFormStateSuccess()))
  })

  test('throw error when developerId is undefined', () => {
    const gen = cloneableGenerator(setRequestDeveloperStatusFormStateSaga)({
      data: { ...developerStub, id: undefined },
    })

    expect(gen.next().value).toEqual(put(setRequestDeveloperStatusFormStateFailed()))
    expect(gen.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })
})
