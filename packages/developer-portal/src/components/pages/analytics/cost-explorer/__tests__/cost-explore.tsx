import * as React from 'react'
import { shallow } from 'enzyme'
import { CostExplorerTab } from '../cost-explorer'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'

describe('CostExplorerTab', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(<CostExplorerTab apps={mockAppSummaryModelPagedResult.data as AppSummaryModel[]} />),
    ).toMatchSnapshot()
  })
})
