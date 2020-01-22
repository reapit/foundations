import resultSagas, { resultFetch, resultListen } from '../results'
import ActionTypes from '@/constants/action-types'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/results'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { contacts } from '../__stubs__/contacts'
import { identities } from '../__stubs__/identities'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { mapIdentitiesToContacts } from '../../utils/map-identities-to-contacts'
import { fetchContacts, fetchIdentitiesCheck } from '../api'

jest.mock('../../core/store')

jest.mock('../../utils/map-identities-to-contacts', () => ({
  mapIdentitiesToContacts: jest.fn().mockReturnValue('mappedData'),
}))

const mockHeaders = {
  Authorization: '123',
}

const params: Action<ContactsParams> = {
  data: {
    pageNumber: 1,
    name: '1',
  },
  type: 'RESULT_REQUEST_DATA',
}

describe('result fetch data', () => {
  const gen = cloneableGenerator(resultFetch)(params)
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(call(fetchContacts, { headers: mockHeaders, params }))

  it('api call sucessfully', () => {
    const clone = gen.clone()
    const listContactId = contacts._embedded.map(({ id }) => id)
    expect(clone.next(contacts as any).value).toEqual(
      call(fetchIdentitiesCheck, { headers: mockHeaders, listContactId }),
    )
    expect(clone.next(identities).value).toEqual(put(resultReceiveData('mappedData' as any)))
    expect(mapIdentitiesToContacts).toHaveBeenCalledWith(contacts, identities)
    expect(clone.next().done).toEqual(true)
  })

  it('api fail sagas', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(resultRequestDataFailure()))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('appointmentDetailDataListen', () => {
  it('should trigger request data when called', () => {
    const gen = resultListen()
    expect(gen.next().value).toEqual(takeLatest<Action<ContactsParams>>(ActionTypes.RESULT_REQUEST_DATA, resultFetch))
    expect(gen.next().done).toBe(true)
  })
})

describe('appointmentDetailSagas', () => {
  it('should listen data request', () => {
    const gen = resultSagas()

    expect(gen.next().value).toEqual(all([fork(resultListen)]))
    expect(gen.next().done).toBe(true)
  })
})
