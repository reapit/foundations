import React from 'react'
import { render } from '../../../tests/react-testing'
import { DownloadUsersCSV, DownloadUsersCSVFunction } from '../download-users-csv'

jest
  .spyOn(global, 'fetch')
  .mockImplementation(
    jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ _embedded: [{}], totalPageCount: 1 }), { status: 200 })),
    ),
  )

jest.mock('file-saver', () => ({
  __esModule: true,
  default: {
    saveAs: jest.fn(),
  },
}))

describe('DownloadUsersCSV', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    expect(render(<DownloadUsersCSV queryParams={{}} />)).toMatchSnapshot()
  })

  it('should create CSV file', () => {
    const setIsDownloading = jest.fn()
    DownloadUsersCSVFunction({
      token: '',
      filters: {},
      setIsDownloading,
    })

    expect(setIsDownloading).toHaveBeenNthCalledWith(1, true)
    expect(global.fetch).toHaveBeenCalled()
  })

  it('should set downloading', () => {
    const setIsDownloading = jest.fn()
    DownloadUsersCSVFunction({
      token: '',
      filters: {},
      setIsDownloading,
    })

    expect(setIsDownloading).toHaveBeenCalledWith(true)
    expect(global.fetch).toHaveBeenCalled()
  })
})
