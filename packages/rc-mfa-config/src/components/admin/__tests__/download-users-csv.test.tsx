import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { render } from '../../../tests/react-testing'
import { DownloadUsersCSV, handleDownloadUsers, handleSetDownloading } from '../download-users-csv'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import Papa from 'papaparse'
import FileSaver from 'file-saver'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{ data: [] }]),
}))

jest.mock('file-saver', () => ({
  __esModule: true,
  default: {
    saveAs: jest.fn(),
  },
}))

jest.mock('papaparse', () => ({
  __esModule: true,
  default: {
    unparse: jest.fn(),
  },
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('DownloadUsersCSV', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValueOnce([{ ...mockUserModelPagedResult }])

    expect(render(<DownloadUsersCSV queryParams={{}} />)).toMatchSnapshot()
  })

  it('should create CSV file', () => {
    const isDownloading = true
    const setIsDownloading = jest.fn()
    const curried = handleDownloadUsers(mockUserModelPagedResult, isDownloading, setIsDownloading)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
    expect(setIsDownloading).toHaveBeenCalledWith(false)
  })

  it('should set downloading', () => {
    const setIsDownloading = jest.fn()
    const curried = handleSetDownloading(setIsDownloading)

    curried()

    expect(setIsDownloading).toHaveBeenCalledWith(true)
  })
})
