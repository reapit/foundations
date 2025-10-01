import React from 'react'
import { render } from '../../../tests/react-testing'
import { DownloadUsersCSV, DownloadUsersCSVFunction } from '../download-users-csv'

jest.mock('file-saver', () => ({
  __esModule: true,
  default: {
    saveAs: jest.fn(),
  },
}))

jest
  .spyOn(global, 'fetch')
  .mockImplementation(
    jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ _embedded: [{}], totalPageCount: 1 }), { status: 200 })),
    ),
  )

describe('DownloadUsersCSV', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    expect(render(<DownloadUsersCSV queryParams={{}} />)).toMatchSnapshot()
  })

  it('should create CSV file', async () => {
    const setIsDownloading = jest.fn()
    await DownloadUsersCSVFunction({
      token: '',
      filters: {},
      setIsDownloading,
    })

    expect(setIsDownloading).toHaveBeenNthCalledWith(1, true)
    expect(setIsDownloading).toHaveBeenNthCalledWith(2, false)
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('pageNumber=1'),
      expect.objectContaining({
        headers: {
          'api-version': 'latest',
          Authorization: expect.stringContaining('Bearer'),
        },
      }),
    )
  })

  it('should set downloading', async () => {
    const setIsDownloading = jest.fn()
    await DownloadUsersCSVFunction({
      token: '',
      filters: {},
      setIsDownloading,
    })

    expect(setIsDownloading).toHaveBeenNthCalledWith(1, true)
    expect(setIsDownloading).toHaveBeenNthCalledWith(2, false)
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('pageNumber=1'),
      expect.objectContaining({
        headers: {
          'api-version': 'latest',
          Authorization: expect.stringContaining('Bearer'),
        },
      }),
    )
  })
})
