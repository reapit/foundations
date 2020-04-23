import { adminDevManagementRequestDataHandler } from '../admin-dev-management'
import { put, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, generateHeader } from '@/constants/api'
import { adminDevManagementLoading, adminDevManagementReceiveData } from '@/actions/admin-dev-management'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

const fakeResponse = {} as PagedResultDeveloperModel_
const params = {
  data: {
    page: 1,
    queryString: '?name=name&company=company&registeredFrom=2020-03-04&registeredTo=2020-04-04"',
  },
}

describe('adminDevManagementRequestDataHandler', () => {
  const gen = cloneableGenerator(adminDevManagementRequestDataHandler)(params)

  expect(gen.next().value).toEqual(put(adminDevManagementLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.developers}?PageNumber=${1}&PageSize=${REVISIONS_PER_PAGE}&Name=${'name'}&Company=${'company'}
      &RegisteredFrom=2020-03-04&RegisteredTo=2020-04-04`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(adminDevManagementReceiveData(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })
})
