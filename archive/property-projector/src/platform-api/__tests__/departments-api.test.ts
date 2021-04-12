import { getDepartments } from '../departments-api'
import { PagedResultDepartmentModel_ } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationDepartments = [
  {
    _embedded: [
      {
        id: 'SOME_ID',
        created: 'SOME_CREATED',
        modified: 'SOME_MODIFIED',
        name: 'SOME_NAME',
        typeOptions: ['SOME_OPTION', 'SOME_OPTION'],
        styleOptions: ['SOME_OPTION', 'SOME_OPTION'],
        situationOptions: ['SOME_OPTION', 'SOME_OPTION'],
        parkingOptions: ['SOME_OPTION', 'SOME_OPTION'],
        ageOptions: ['SOME_OPTION', 'SOME_OPTION'],
        localityOptions: ['SOME_OPTION', 'SOME_OPTION'],
        _eTag: 'SOME_ETAG',
      },
    ],
    pageNumber: 1,
    pageSize: 25,
    pageCount: 25,
    totalCount: 1000,
  },
] as PagedResultDepartmentModel_[]

describe('getDepartments', () => {
  it('should return a response from the departments service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationDepartments)
    expect(await getDepartments(mockBrowserSession)).toEqual(mockConfigurationDepartments)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from departments service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getDepartments(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('Error fetching Departments', 'No response returned by API')
  })
})
