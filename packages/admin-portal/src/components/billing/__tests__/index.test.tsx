import React from 'react'
import { render } from '../../../tests/react-testing'
import AdminBilling, { handleDownloadBillingPeriod } from '..'
import * as developerServices from '../../../services/developers'

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
  it('should correctly download billing', async () => {
    const period = '2020-02'
    const setBillingFile = jest.fn()

    const curried = handleDownloadBillingPeriod(setBillingFile, period)

    curried()

    await Promise.resolve()

    expect(mockBillingServices).toBeCalledWith({ period })
  })
})
