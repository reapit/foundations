import { adminDevManagementRequestDataHandler } from '../admin-dev-management'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { adminDevManagementLoading, adminDevManagementReceiveData } from '@/actions/admin-dev-management'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { PagedResultDeveloperModel_ } from '@/types/marketplace-api-schema'

const fakeResponse = {} as PagedResultDeveloperModel_
const params = {
  data: {
    page: 1,
    queryString: '?name=name&company=company'
  }
}

describe('adminDevManagementRequestDataHandler', () => {
  const gen = cloneableGenerator(adminDevManagementRequestDataHandler)(params)

  expect(gen.next().value).toEqual(put(adminDevManagementLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.developers}?PageNumber=${1}&PageSize=${REVISIONS_PER_PAGE}&Name=${'name'}&Company=${'company'}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(adminDevManagementReceiveData(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })
})
