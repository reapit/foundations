import { getPropertyProjectorConfig, savePropertyProjectorConfig } from '../property-projector-config'
import { mockBrowserSession } from '@/platform-api/__mocks__/session'
import { PropertyProjectorConfig } from '@/types/global'
import mockPropertyProjectorConfig from '../__mocks__/config'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock

const defaultPropertyProjectorConfig: PropertyProjectorConfig = {
  logo: '',
  primaryColour: '#006580',
  secondaryColour: '#FFFFFF',
  headerTextColour: '#FFFFFF',
  interval: 5,
  propertyLimit: 25,
  marketingMode: ['selling', 'letting'],
  sellingStatuses: ['forSale', 'underOffer'],
  lettingStatuses: ['toLet', 'underOffer'],
  minPrice: 0,
  maxPrice: 0,
  minRent: 0,
  maxRent: 0,
  showAddress: true,
  sortBy: 'created',
  departments: {},
  offices: [],
}

describe('getPropertyProjectorConfig', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce(mockPropertyProjectorConfig)
    expect(await getPropertyProjectorConfig(mockBrowserSession, 'RPT')).toEqual(mockPropertyProjectorConfig)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should return the default config', async () => {
    mockedFetch.mockReturnValueOnce(undefined)
    expect(await getPropertyProjectorConfig(mockBrowserSession, 'RPT')).toEqual(defaultPropertyProjectorConfig)
  })

  it('should return with an error', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(new Error())
    await getPropertyProjectorConfig(mockBrowserSession, 'RPT')
    expect(errorSpy).toHaveBeenCalled()
  })
})

describe('savePropertyProjectorConfig', () => {
  it('should return true', async () => {
    mockedFetch.mockClear()
    mockedFetch.mockReturnValueOnce(mockPropertyProjectorConfig)
    expect(await savePropertyProjectorConfig(mockBrowserSession, 'RPT', mockPropertyProjectorConfig)).toEqual(true)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should return with an error', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(new Error())
    await savePropertyProjectorConfig(mockBrowserSession, 'RPT', mockPropertyProjectorConfig)
    expect(errorSpy).toHaveBeenCalled()
  })
})
