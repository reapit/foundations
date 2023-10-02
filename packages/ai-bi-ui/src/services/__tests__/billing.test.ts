import { defaultAnalyticsFilterState } from '../../components/analytics/state/defaults'
import { fetcher, fetcherWithBlob } from '@reapit/utils-common'
import { batchFetchBillingService, billingTransactionDownloadService } from '../billing'

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}))
jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock
const mockedFetchBlob = fetcherWithBlob as jest.Mock

describe('billing services', () => {
  describe('batchFetchBillingService', () => {
    it('should return a response from the billing service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await batchFetchBillingService(['2022-04'], 'developerId=MOCK_DEVELOPER_ID')).toEqual([stub])
    })
  })

  describe('billingTransactionDownloadService', () => {
    it('should return a response from the billing service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetchBlob.mockReturnValueOnce(stub)
      expect(
        await billingTransactionDownloadService(defaultAnalyticsFilterState, 'Apr 2022', 'MOCK_DEVELOPER_ID'),
      ).toEqual(true)
    })
  })
})
