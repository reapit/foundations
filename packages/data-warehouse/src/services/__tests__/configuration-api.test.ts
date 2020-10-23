import { configurationAppointmentsApiService } from '../configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationAppointments = [
  {
    id: 'some_id',
    value: 'some_value',
  },
] as ListItemModel[]

describe('configurationAppointmentsApiService', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationAppointments)
    expect(await configurationAppointmentsApiService(mockBrowserSession)).toEqual(mockConfigurationAppointments)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from config service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await configurationAppointmentsApiService(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching Configuration Appointment Types',
      'No response returned by API',
    )
  })
})
