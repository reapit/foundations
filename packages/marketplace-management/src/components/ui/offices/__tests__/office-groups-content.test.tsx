import React from 'react'
import { mergeOfficesGroups, OfficeGroupsContent, getOfficeQueryFromGroups } from '../office-groups-content'
import { shallow } from 'enzyme'
import { data as officeGroupsStub } from '../__stubs__/office-groups'
import { data as officesStub } from '../__stubs__/offices'
import { OfficeGroupModel } from '../../../../types/organisations-schema'
import { OfficeModel } from '@reapit/foundations-ts-definitions'

const columns = [
  { Header: 'Group Name', accessor: 'name' },
  { Header: 'Office List', accessor: 'offices' },
  { Header: 'Last Updated', accessor: 'description' },
  { Header: 'Edit' },
]

describe('OfficeGroupsContent', () => {
  it('should match a snapshot', () => {
    const onPageChange = jest.fn()
    expect(
      shallow(<OfficeGroupsContent officeGroups={officeGroupsStub} columns={columns} onPageChange={onPageChange} />),
    ).toMatchSnapshot()
  })
})

describe('mergeOfficesGroups', () => {
  it('should merge office groups with offices', () => {
    const officeGroupModels = (officeGroupsStub._embedded ?? []) as OfficeGroupModel[]
    const result = mergeOfficesGroups(officesStub._embedded as OfficeModel[], officeGroupModels)
    const expected = [
      {
        ...officeGroupModels[0],
        offices: officesStub._embedded,
      },
    ]
    expect(result).toEqual(expected)
  })
})

describe('getOfficeQueryFromGroups', () => {
  it('should get an office query from office groups', () => {
    const result = getOfficeQueryFromGroups(officeGroupsStub._embedded)
    const expected = '?id=SOME_ID&id=ANOTHER_ID'
    expect(result).toEqual(expected)
  })
})
