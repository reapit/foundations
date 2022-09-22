import React from 'react'
import { render } from '../../../tests/react-testing'
import { Traffic, handleDownloadTrafficPeriod } from '..'
import * as trafficServices from '../../../services/traffic'

const mockTrafficServices = jest
  .spyOn(trafficServices, 'fetchTrafficPeriod')
  .mockImplementation(() => Promise.resolve(new Blob()))

describe('Traffic', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Traffic />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleDownloadTrafficPeriod', () => {
  it('should correctly download traffic', async () => {
    const period = '2020-02'
    const setBillingFile = jest.fn()

    const curried = handleDownloadTrafficPeriod(setBillingFile, period)
    curried()

    await Promise.resolve()

    expect(mockTrafficServices).toHaveBeenCalledWith(period)
  })
})
