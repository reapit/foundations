import React from 'react'
import { render, setViewport } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { AppsDetailHeader } from '../apps-detail-header'

describe('AppsDetailHeader', () => {
  it('should match a snapshot for mobile', () => {
    setViewport('mobile')
    expect(render(<AppsDetailHeader app={mockAppDetailModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot for desktop', () => {
    setViewport('desktop')
    expect(render(<AppsDetailHeader app={mockAppDetailModel} />)).toMatchSnapshot()
  })
})
