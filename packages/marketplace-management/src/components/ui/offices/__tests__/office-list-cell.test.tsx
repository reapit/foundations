import * as React from 'react'
import { shallow } from 'enzyme'
import OfficeListCell, { OfficeName } from '../office-list-cell'

describe('OfficeListCell', () => {
  it('should match a snapshot', () => {
    const cellProps = {
      value: 'ID1, ID2',
    }
    expect(shallow(<OfficeListCell cell={cellProps} />)).toMatchSnapshot()
  })
})

jest.mock('swr', () =>
  jest.fn(() => ({
    data: { name: 'Reapit' },
  })),
)

describe('OfficeName', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficeName id="ID3" isLast={false} />)).toMatchSnapshot()
  })
})

describe('OfficeName lol', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficeName id="ID3" isLast={false} />)).toMatchSnapshot()
  })
})
