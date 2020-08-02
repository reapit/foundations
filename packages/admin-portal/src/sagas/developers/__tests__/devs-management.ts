import { fetchDeveloperListHandler } from '../devs-management'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchDeveloperListSuccess } from '@/actions/devs-management'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'
import { fetchDevelopersList } from '@/services/developers'

jest.mock('@/services/developers')

const fakeResponse = {} as PagedResultDeveloperModel_
const params = {
  data: {
    page: 1,
    queryString: '?name=name&company=company&registeredFrom=2020-03-04&registeredTo=2020-04-04"',
  },
}

describe('fetchDeveloperListHandler', () => {
  const gen = cloneableGenerator(fetchDeveloperListHandler)(params)

  expect(gen.next().value).toEqual(
    call(fetchDevelopersList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: 1,
      name: 'name',
      company: 'company',
      registeredFrom: '2020-03-04',
      registeredTo: '2020-04-04',
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(fetchDeveloperListSuccess(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })
})
