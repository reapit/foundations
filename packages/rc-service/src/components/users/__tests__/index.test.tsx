import React from 'react'
import { render } from '../../../tests/react-testing'
import UsersPage, { downloadCSV } from '..'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockUserModelPagedResult]),
}))

describe('UsersPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<UsersPage />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('downloadCsv', () => {
    beforeEach(() => {
      // @ts-ignore
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ _embedded: [], totalPageCount: 3 }),
        }),
      )
    })

    afterAll(() => {
      jest.resetAllMocks()
    })

    it('will call setGenerating when called', async () => {
      const setDownloadGenerating = jest.fn()

      await downloadCSV({ setDownloadGenerating, token: 'TOKEN', filters: {} })

      expect(setDownloadGenerating).toHaveBeenCalledTimes(2)
      expect(setDownloadGenerating).toHaveBeenNthCalledWith(1, true)
      expect(setDownloadGenerating).toHaveBeenNthCalledWith(2, false)
    })

    it('Will call all pages', async () => {
      const setDownloadGenerating = jest.fn()

      await downloadCSV({ setDownloadGenerating, token: 'TOKEN', filters: {} })

      expect(fetch).toHaveBeenCalledTimes(3)
    })
  })
})
