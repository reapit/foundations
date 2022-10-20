import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'
import { render } from '../../../../tests/react-testing'
import { DownloadInstallationsCSV, downloadInstallationAction } from '../download-installations-csv'
import Papa from 'papaparse'
import FileSaver from 'file-saver'

jest.mock('../../state/use-app-state')
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

describe('DownloadInstallationsCSV', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValueOnce([{ ...mockInstallationModelPagedResult }])

    expect(render(<DownloadInstallationsCSV />)).toMatchSnapshot()
  })

  it('Can create CSV file', () => {
    downloadInstallationAction(
      {
        data: [],
      },
      'test',
    )

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
  })
})
