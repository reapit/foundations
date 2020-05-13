import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { URLS, generateHeader } from '@/constants/api'
import * as ReapitElements from '@reapit/elements'
import { shallow } from 'enzyme'
import TransactionHistory, {
  selectTransactionHistoryState,
  createHandleDownLoadButtonOnClickFn,
} from '../transaction-history'
import { developerIdentity } from '@/sagas/__stubs__/developer-identity'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'

const mockState = ({
  developer: {
    developerData: appsDataStub,
    myIdentity: developerIdentity,
    loading: false,
  },
} as unknown) as ReduxState

describe('TransactionHistory', () => {
  let spyFetcher
  const mockedBlob = new Blob()
  const mockedCreateObjectURL = jest.fn(() => 'mocked url')

  beforeAll(() => {
    ;(window as any).URL = {
      createObjectURL: mockedCreateObjectURL,
    }
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => mockState)
    spyFetcher = jest.spyOn(ReapitElements, 'fetcherWithBlob').mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(mockedBlob)
        }),
    )
  })

  describe('createHandleDownLoadButtonOnClickFn', () => {
    const mockedLinkElem = { href: '', download: '', click: jest.fn(), remove: jest.fn() }
    const mockedAppendChildFn = jest.fn()

    beforeAll(() => {
      jest.spyOn(document, 'createElement').mockImplementation(() => (mockedLinkElem as unknown) as HTMLAnchorElement)
      document.body.appendChild = mockedAppendChildFn
    })

    it('should run correctly', async () => {
      const params = {
        month: '2020-01',
        developerAppIds: ['1', '2'],
      }

      const mockEvent = {
        preventDefault: jest.fn(),
      }

      const fn = createHandleDownLoadButtonOnClickFn(params)
      await fn(mockEvent)

      expect(spyFetcher).toHaveBeenCalledWith({
        url: `${URLS.trafficEventBilling}/2020-01/download?applicationId=1&applicationId=2`,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      })
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(mockedCreateObjectURL).toHaveBeenCalledWith(mockedBlob)
      expect(mockedAppendChildFn).toHaveBeenCalledWith(mockedLinkElem)
      expect(mockedLinkElem.href).toBe('mocked url')
      expect(mockedLinkElem.download).toBe('reapit-billing-data-2020-01.csv')
      expect(mockedLinkElem.click).toHaveBeenCalled()
      expect(mockedLinkElem.remove).toHaveBeenCalled()
    })
  })

  describe('selectTransactionHistoryState', () => {
    it('should return correctly', () => {
      expect(selectTransactionHistoryState(mockState)).toEqual({
        developerAppIds: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
        developerCreatedDate: '2020-04-30T13:21:20',
        isLoadingDeveloperDetail: false,
      })
    })
  })

  it('should match a snapshot', () => {
    expect(shallow(<TransactionHistory />)).toMatchSnapshot()
  })
})
