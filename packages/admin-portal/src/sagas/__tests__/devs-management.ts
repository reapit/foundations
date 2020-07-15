import { devsManagementRequestDataHandler } from '../devs-management'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { devsManagementLoading, devsManagementReceiveData } from '@/actions/devs-management'
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

describe('devsManagementRequestDataHandler', () => {
  const gen = cloneableGenerator(devsManagementRequestDataHandler)(params)

  expect(gen.next().value).toEqual(put(devsManagementLoading(true)))
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

    expect(clone.next(fakeResponse).value).toEqual(put(devsManagementReceiveData(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })
})
