import React from 'react'
import { OrgGroupsTable } from '../org-groups-table'
import { render } from '../../../tests/react-testing'
import { mockOfficeGroupModelPagedResult } from '../../../tests/__stubs__/office-groups'
import { useReapitGet } from '@reapit/use-reapit-data'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('OrgGroupsTable', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<OrgGroupsTable orgId="MOCK_ID" />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([mockOfficeGroupModelPagedResult, false])
    expect(render(<OrgGroupsTable orgId="MOCK_ID" />)).toMatchSnapshot()
  })

  it('should render component with empty data', () => {
    mockUseReapitGet.mockReturnValue([{ _embedded: [] }, false])
    expect(render(<OrgGroupsTable orgId="MOCK_ID" />)).toMatchSnapshot()
  })
})
