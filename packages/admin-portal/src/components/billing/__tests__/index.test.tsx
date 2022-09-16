import * as React from 'react'
import { render } from '../../../tests/react-testing'
import AdminBilling, { handleDownloadBillingPeriod, handleSaveFile } from '..'
import * as developerServices from '../../../services/developers'
import FileSaver from 'file-saver'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

const mockBillingServices = jest
  .spyOn(developerServices, 'fetchDeveloperBillingPeriod')
  .mockImplementation(() => Promise.resolve(new Blob()))

describe('AdminBilling', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<AdminBilling />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleDownloadBillingPeriod', () => {
  it('should run correctly', async () => {
    const period = '2020-02'
    const setBillingFile = jest.fn()

    const fn = handleDownloadBillingPeriod(period, setBillingFile)
    await fn()
    expect(mockBillingServices).toBeCalledWith({ period })
  })
})

describe('handleSaveFile', () => {
  const spySaveAsFunc = jest.spyOn(FileSaver, 'saveAs')
  it('should run correctly', () => {
    const blob = new Blob([JSON.stringify({}, null, 2)], { type: 'application/json' })
    const fn = handleSaveFile(blob, 'test')
    fn()
    expect(spySaveAsFunc).toBeCalledWith(blob, 'test')
  })
})
