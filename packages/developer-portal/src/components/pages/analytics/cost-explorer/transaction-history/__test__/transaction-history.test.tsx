import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { URLS } from '@/services/constants'
import { fetcherWithBlob } from '@reapit/elements'
import { shallow } from 'enzyme'
import TransactionHistory, {
  selectTransactionHistoryState,
  createHandleDownLoadButtonOnClickFn,
  handleLaterClick,
  handleEarlierClick,
} from '../transaction-history'
import { developerIdentity } from '@/sagas/__stubs__/developer-identity'
import { ReduxState } from '@/types/core'
import FileSaver from 'file-saver'
import appState from '@/reducers/__stubs__/app-state'
import { getPlatformHeaders } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../../../../../../core/connect-session'

const mockState: ReduxState = {
  ...appState,
  developer: {
    ...appState.developer,
    myIdentity: developerIdentity,
    loading: false,
  },
}

jest.mock('@reapit/utils')

jest.mock('@reapit/elements', () => ({
  fetcherWithBlob: jest.fn(
    () =>
      new Promise(resolve => {
        resolve(new Blob())
      }),
  ),
  setQueryParams: () => 'applicationId=1&applicationId=2',
}))

describe('TransactionHistory', () => {
  const mockedCreateObjectURL = jest.fn(() => 'mocked url')

  beforeAll(() => {
    ;(window as any).URL = {
      createObjectURL: mockedCreateObjectURL,
    }
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => mockState)
  })

  describe('createHandleDownLoadButtonOnClickFn', () => {
    const mockedLinkElem = { href: '', download: '', click: jest.fn(), remove: jest.fn() }
    const mockedAppendChildFn = jest.fn()
    const spySaveAsFunc = jest.spyOn(FileSaver, 'saveAs')

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

      const fn = await createHandleDownLoadButtonOnClickFn(params)
      await fn(mockEvent)

      expect(fetcherWithBlob).toHaveBeenCalledWith({
        url: `${URLS.trafficEventBilling}/2020-01/download?applicationId=1&applicationId=2`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
      })
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(mockEvent.preventDefault).toHaveBeenCalled()

      expect(spySaveAsFunc).toBeCalledWith(new Blob(), 'reapit-billing-data-2020-01.csv')
    })
  })

  describe('selectTransactionHistoryState', () => {
    it('should return correctly', () => {
      expect(selectTransactionHistoryState(mockState)).toEqual({
        developerAppIds: [],
        developerCreatedDate: '2020-04-30T13:21:20',
        isLoadingDeveloperDetail: false,
      })
    })
  })

  it('should match a snapshot', () => {
    expect(shallow(<TransactionHistory />)).toMatchSnapshot()
  })

  describe('handleLaterClick and handleEarlierClick', () => {
    it('handleLaterClick', () => {
      const setCurrentPage = jest.fn()
      handleLaterClick(setCurrentPage)
      expect(setCurrentPage).toBeCalled()
    })

    it('handleEarlierClick', () => {
      const setCurrentPage = jest.fn()
      handleEarlierClick(setCurrentPage)
      expect(setCurrentPage).toBeCalled()
    })
  })
})
