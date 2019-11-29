import { errorThrownServer } from '@/actions/error'
import { developerDeleteRequestSaga } from '../developer-delete'
import { put } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { developerDeleteRequestFailure } from '@/actions/developer-delete'
import errorMessages from '@/constants/error-messages'

describe('developerDeleteRequestSaga', () => {
  test('throw error when developerId is undefined', () => {
    const gen = cloneableGenerator(developerDeleteRequestSaga)({ data: undefined })

    expect(gen.next().value).toEqual(put(developerDeleteRequestFailure()))
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
